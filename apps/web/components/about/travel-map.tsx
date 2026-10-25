"use client"

import { geoGraticule10, geoMercator, geoPath } from "d3-geo"
import { select } from "d3-selection"
import { zoom, zoomIdentity, type D3ZoomEvent } from "d3-zoom"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { feature, mesh } from "topojson-client"
import type { FeatureCollection, Geometry, MultiLineString } from "geojson"
import type { GeometryCollection, Topology } from "topojson-specification"

import { visitedCountries } from "@/lib/data/about"

/** Shape of world-atlas' countries-110m.json. */
type WorldTopology = Topology<{ countries: GeometryCollection }>

const ACCENT = "#FF5C35"
const HOME = {
  iso: "144",
  name: "Sri Lanka",
  label: "Colombo",
  lat: 6.93,
  lng: 79.86,
}

interface Place {
  /** Numeric ISO 3166-1 code, matching the ids in countries-110m.json. */
  iso: string
  /** Alpha-2 code, used to pull the photos off `visitedCountries`. */
  alpha2: string
  name: string
  /** Text printed beside the dot — a city, or the country where that reads better. */
  label: string
  lat: number
  lng: number
  years: string
  note: string
}

const PLACES: Place[] = [
  {
    iso: "826",
    alpha2: "GB",
    name: "United Kingdom",
    label: "London",
    lat: 51.5,
    lng: -0.13,
    years: "2013–15",
    note: "Where the adventure started",
  },
  {
    iso: "356",
    alpha2: "IN",
    name: "India",
    label: "India",
    lat: 13.08,
    lng: 80.27,
    years: "2019 · 2025",
    note: "Culture, chaos, the best chai",
  },
  {
    iso: "158",
    alpha2: "TW",
    name: "Taiwan",
    label: "Taipei",
    lat: 25.03,
    lng: 121.57,
    years: "2017",
    note: "Night markets and bubble tea",
  },
  {
    iso: "458",
    alpha2: "MY",
    name: "Malaysia",
    label: "Kuala Lumpur",
    lat: 3.14,
    lng: 101.69,
    years: "2025",
    note: "Rainforests and nasi lemak",
  },
  {
    iso: "784",
    alpha2: "AE",
    name: "UAE",
    label: "Dubai",
    lat: 25.2,
    lng: 55.27,
    years: "2022",
    note: "Dunes meet skylines",
  },
]

const VISITED = new Set(PLACES.map((place) => place.iso))

/** Photos live on the shared `visitedCountries` data, keyed by alpha-2 code. */
const PHOTOS = new Map(
  visitedCountries.map((country) => [country.isoCode, country.images ?? []])
)

interface Tooltip {
  x: number
  y: number
  place: Place
}

/**
 * Mercator world map with the visited countries filled, great-circle routes
 * drawn out of Colombo, and scroll-to-zoom / drag-to-pan.
 *
 * The topology is fetched once from /data rather than imported, to keep ~100KB
 * of TopoJSON out of the JS bundle.
 */
export function TravelMap() {
  const hostRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    const svgNode = svgRef.current
    if (!host || !svgNode) return

    let disposed = false
    const controller = new AbortController()

    const svg = select(svgNode)
    const root = svg.append("g")

    const defs = svg.append("defs")
    const glow = defs
      .append("filter")
      .attr("id", "bm-map-glow")
      .attr("x", "-60%")
      .attr("y", "-60%")
      .attr("width", "220%")
      .attr("height", "220%")
    glow
      .append("feGaussianBlur")
      .attr("stdDeviation", "3.2")
      .attr("result", "b")
    const merge = glow.append("feMerge")
    merge.append("feMergeNode").attr("in", "b")
    merge.append("feMergeNode").attr("in", "SourceGraphic")

    let render: (() => void) | null = null
    const onResize = () => render?.()

    fetch("/data/countries-110m.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Map data responded ${response.status}`)
        return response.json() as Promise<WorldTopology>
      })
      .then((topology) => {
        if (disposed) return

        const countries = (
          feature(
            topology,
            topology.objects.countries
          ) as unknown as FeatureCollection<Geometry>
        ).features
        const borders = mesh(
          topology,
          topology.objects.countries,
          (a, b) => a !== b
        ) as MultiLineString
        const graticule = geoGraticule10()

        const focus = {
          type: "MultiPoint" as const,
          coordinates: [...PLACES, HOME].map((place) => [place.lng, place.lat]),
        }

        const projection = geoMercator()
        const path = geoPath(projection)
        const project = (place: { lng: number; lat: number }) =>
          projection([place.lng, place.lat]) ?? [0, 0]

        render = () => {
          const width = host.clientWidth
          const height = host.clientHeight
          if (!width || !height) return

          svg.attr("viewBox", `0 0 ${width} ${height}`)
          projection.fitExtent(
            [
              [Math.min(90, width * 0.1), 60],
              [width - Math.min(90, width * 0.1), height - 80],
            ],
            focus
          )

          root.selectAll("*").remove()

          root
            .append("path")
            .datum(graticule)
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", "var(--map-graticule)")
            .attr("stroke-width", 0.7)

          root
            .selectAll("path.country")
            .data(countries)
            .join("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", (d) =>
              String(d.id) === HOME.iso
                ? "var(--map-home)"
                : VISITED.has(String(d.id))
                  ? ACCENT
                  : "var(--map-land)"
            )
            .attr("fill-opacity", (d) => (VISITED.has(String(d.id)) ? 0.92 : 1))

          root
            .append("path")
            .datum(borders)
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", "var(--map-border)")
            .attr("stroke-width", 0.55)

          const arcs = root
            .append("g")
            .attr("fill", "none")
            .attr("stroke", ACCENT)
            .attr("stroke-width", 1.1)
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "3 5")
            .style("animation", "bm-dash 24s linear infinite")

          for (const place of PLACES) {
            arcs.append("path").attr(
              "d",
              path({
                type: "LineString",
                coordinates: [
                  [HOME.lng, HOME.lat],
                  [place.lng, place.lat],
                ],
              }) ?? ""
            )
          }

          // Sri Lanka is filled in the home colour above; the dot only has to
          // mark Colombo on it, so it stays small enough not to swallow the
          // island at the default zoom.
          const home = project(HOME)
          root
            .append("circle")
            .attr("cx", home[0]!)
            .attr("cy", home[1]!)
            .attr("r", 3.2)
            .attr("fill", "var(--map-home)")
            .attr("filter", "url(#bm-map-glow)")

          const nodes = root
            .selectAll("g.place")
            .data(PLACES)
            .join("g")
            .attr("class", "place")
            .attr("transform", (d) => {
              const point = project(d)
              return `translate(${point[0]},${point[1]})`
            })
            .style("cursor", "crosshair")

          // Generous invisible hit area — the visible dot is only 4.5px.
          nodes
            .append("circle")
            .attr("class", "hit")
            .attr("r", 13)
            .attr("fill", "transparent")
          nodes
            .append("circle")
            .attr("class", "dot")
            .attr("r", 4.5)
            .attr("fill", "var(--map-home)")
            .attr("stroke", "var(--map-dot-ring)")
            .attr("stroke-width", 1.4)
          nodes
            .append("text")
            .text((d) => d.label.toUpperCase())
            .attr("x", 11)
            .attr("y", 4)
            .attr("fill", "var(--map-home)")
            .attr("font-size", 9.5)
            .attr("letter-spacing", 1.6)
            .attr("paint-order", "stroke")
            .attr("stroke", "var(--map-dot-ring)")
            .attr("stroke-width", 3.5)

          nodes
            .on("mousemove", (event: MouseEvent, d) => {
              setTooltip({ x: event.clientX, y: event.clientY, place: d })
            })
            .on("mouseleave", () => setTooltip(null))
        }

        render()
        window.addEventListener("resize", onResize)

        svg.call(
          zoom<SVGSVGElement, unknown>()
            .scaleExtent([1, 8])
            .on("zoom", (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
              const k = event.transform.k
              root.attr("transform", event.transform.toString())
              // Counter-scale the annotations so labels and dots keep their size.
              root
                .selectAll<SVGTextElement, unknown>("text")
                .attr("font-size", 9.5 / k)
                .attr("x", 11 / k)
                .attr("y", 4 / k)
                .attr("stroke-width", 3.5 / k)
              root
                .selectAll<SVGCircleElement, unknown>("g.place circle.hit")
                .attr("r", 13 / k)
              root
                .selectAll<SVGCircleElement, unknown>("g.place circle.dot")
                .attr("r", 4.5 / k)
                .attr("stroke-width", 1.4 / k)
            })
        )
        svg.call(zoom<SVGSVGElement, unknown>().transform, zoomIdentity)
      })
      .catch((error: unknown) => {
        if (disposed || (error instanceof Error && error.name === "AbortError"))
          return
        setFailed(true)
      })

    return () => {
      disposed = true
      controller.abort()
      window.removeEventListener("resize", onResize)
      svg.on(".zoom", null)
      svg.selectAll("*").remove()
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className="relative h-[min(72vh,660px)] w-full bg-background [--map-border:rgba(20,22,26,0.16)] [--map-dot-ring:var(--bm-paper-100)] [--map-graticule:rgba(20,22,26,0.07)] [--map-home:var(--bm-ink-900)] [--map-land:var(--bm-paper-200)] dark:[--map-border:rgba(239,234,224,0.14)] dark:[--map-dot-ring:var(--bm-ink-950)] dark:[--map-graticule:rgba(239,234,224,0.055)] dark:[--map-home:var(--bm-paper-100)] dark:[--map-land:#161a20]"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        role="img"
        aria-label="World map highlighting the countries I have visited: United Kingdom, India, Taiwan, Malaysia and the UAE."
        className="block size-full cursor-grab active:cursor-grabbing"
      />

      {failed && (
        <p className="eyebrow absolute inset-0 flex items-center justify-center text-faint">
          Map unavailable
        </p>
      )}

      <div className="eyebrow-sm absolute bottom-4 left-5 flex items-center gap-4 text-faint">
        <span className="flex items-center gap-2">
          <i aria-hidden className="size-2.5" style={{ background: ACCENT }} />
          Visited
        </span>
        <span className="flex items-center gap-2">
          <i aria-hidden className="size-2.5 bg-foreground" />
          Home · Colombo
        </span>
      </div>
      <p className="eyebrow-sm absolute right-5 bottom-4 m-0 hidden text-faint sm:block">
        Scroll to zoom · drag to pan
      </p>

      {tooltip && (
        <div
          className="eyebrow-sm pointer-events-none fixed z-10 -translate-x-1/2 -translate-y-[calc(100%+18px)] bg-foreground px-3 py-2.5 text-background"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="whitespace-nowrap">
            <b className="font-bold">{tooltip.place.name}</b> ·{" "}
            {tooltip.place.years}
            <br />
            {tooltip.place.note}
          </div>

          {(PHOTOS.get(tooltip.place.alpha2)?.length ?? 0) > 0 && (
            <div className="mt-2.5 flex gap-1.5">
              {PHOTOS.get(tooltip.place.alpha2)!
                .slice(0, 3)
                .map((photo) => (
                  <Image
                    key={photo.url}
                    src={photo.url}
                    alt={photo.alt ?? tooltip.place.name}
                    width={128}
                    height={160}
                    sizes="72px"
                    className="h-[72px] w-[58px] object-cover"
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
