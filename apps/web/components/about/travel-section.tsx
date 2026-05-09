"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { VisitedCountry } from "@/lib/data/about"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"

// ─── Map constants ────────────────────────────────────────────────────────────

const MAP_W = 800
const MAP_H = 400

function project(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * MAP_W,
    y: ((90 - lat) / 180) * MAP_H,
  }
}

const CONTINENTS = {
  northAmerica:
    "M 88,42 L 195,38 L 258,66 L 280,96 L 232,124 L 220,147 L 210,168 L 228,178 L 165,157 L 138,130 L 122,94 L 94,68 Z",
  southAmerica:
    "M 232,178 L 283,190 L 320,212 L 312,234 L 303,252 L 280,277 L 254,324 L 247,324 L 234,302 L 243,241 L 218,212 Z",
  europe:
    "M 382,52 L 408,44 L 458,42 L 470,44 L 472,58 L 454,70 L 430,78 L 406,86 L 388,104 L 392,118 L 438,120 L 464,112 L 484,98 L 484,78 L 496,56 L 490,44 L 470,44",
  africa:
    "M 388,118 L 432,118 L 480,118 L 484,152 L 498,174 L 494,196 L 490,224 L 478,257 L 458,278 L 440,278 L 432,257 L 418,212 L 388,190 L 358,168 Z",
  asia:
    "M 490,44 L 560,46 L 640,42 L 710,44 L 712,78 L 714,112 L 674,146 L 658,158 L 644,178 L 634,200 L 622,204 L 572,184 L 534,152 L 508,134 L 484,118 L 490,106 L 484,78 L 496,56 Z",
  australia:
    "M 654,252 L 672,238 L 706,228 L 710,238 L 744,254 L 730,286 L 712,286 L 658,273 Z",
}

// ─── World Map ────────────────────────────────────────────────────────────────

interface TooltipState {
  isoCode: string | null
  x: number
  y: number
}

function WorldMap({
  countries,
  onSelect,
}: {
  countries: VisitedCountry[]
  onSelect: (country: VisitedCountry) => void
}) {
  const [tooltip, setTooltip] = useState<TooltipState>({ isoCode: null, x: 0, y: 0 })

  const activeCountry = tooltip.isoCode
    ? (countries.find((c) => c.isoCode === tooltip.isoCode) ?? null)
    : null

  function showTooltip(country: VisitedCountry) {
    const { x, y } = project(country.lat, country.lng)
    setTooltip({ isoCode: country.isoCode, x, y })
  }

  function hideTooltip() {
    setTooltip({ isoCode: null, x: 0, y: 0 })
  }

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      className="w-full h-auto"
      aria-label="World map showing visited countries"
      role="img"
    >
      <rect width={MAP_W} height={MAP_H} rx={16} className="fill-muted/40" />

      <g className="fill-muted stroke-border/60" strokeWidth={0.8}>
        {Object.entries(CONTINENTS).map(([name, d]) => (
          <path key={name} d={d} />
        ))}
      </g>

      {countries.map((country, i) => {
        const { x, y } = project(country.lat, country.lng)
        const isHovered = tooltip.isoCode === country.isoCode

        return (
          <g
            key={country.isoCode}
            onMouseEnter={() => showTooltip(country)}
            onMouseLeave={hideTooltip}
            onFocus={() => showTooltip(country)}
            onBlur={hideTooltip}
            onClick={() => onSelect(country)}
            tabIndex={0}
            role="button"
            aria-label={`Open gallery for ${country.name}`}
            className="cursor-pointer outline-none"
          >
            <motion.circle
              cx={x}
              cy={y}
              r={8}
              className="fill-primary/20 stroke-primary/50"
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
              animate={{ r: [7, 13, 7], opacity: [0.7, 0.1, 0.7] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.45,
              }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r={4}
              className="fill-primary"
              animate={{ r: isHovered ? 6 : 4 }}
              transition={{ duration: 0.18 }}
            />
          </g>
        )
      })}

      <AnimatePresence>
        {activeCountry &&
          (() => {
            const { x, y } = project(activeCountry.lat, activeCountry.lng)
            const tipW = 144
            const tipH = 54
            const tipX = Math.min(Math.max(x - tipW / 2, 4), MAP_W - tipW - 4)
            const tipY = y < 80 ? y + 14 : y - tipH - 14

            return (
              <motion.g
                key={activeCountry.isoCode}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.14 }}
                style={{ originX: x, originY: y }}
                className="pointer-events-none"
              >
                <rect
                  x={tipX}
                  y={tipY}
                  width={tipW}
                  height={tipH}
                  rx={8}
                  className="fill-card stroke-border"
                  strokeWidth={0.8}
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}
                />
                <text x={tipX + 10} y={tipY + 20} fontSize={15} dominantBaseline="middle">
                  {activeCountry.flag}
                </text>
                <text
                  x={tipX + 30}
                  y={tipY + 15}
                  fontSize={10}
                  fontWeight={700}
                  className="fill-foreground"
                  fontFamily="inherit"
                >
                  {activeCountry.name}
                </text>
                <text
                  x={tipX + 30}
                  y={tipY + 28}
                  fontSize={8.5}
                  className="fill-muted-foreground"
                  fontFamily="inherit"
                >
                  {activeCountry.region}
                </text>
                <text
                  x={tipX + 10}
                  y={tipY + 44}
                  fontSize={8}
                  className="fill-muted-foreground"
                  fontFamily="inherit"
                >
                  {activeCountry.visits.join(" · ")} · tap to open
                </text>
              </motion.g>
            )
          })()}
      </AnimatePresence>
    </svg>
  )
}

// ─── Gallery Modal ────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
}

function GalleryModal({
  country,
  onClose,
}: {
  country: VisitedCountry
  onClose: () => void
}) {
  const images = country.images ?? []
  const hasImages = images.length > 0
  const [[page, direction], setPage] = useState<[number, number]>([0, 0])
  const imageIndex = hasImages ? ((page % images.length) + images.length) % images.length : 0

  const paginate = useCallback(
    (dir: number) => {
      setPage(([p]) => [p + dir, dir])
    },
    []
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && imageIndex > 0) paginate(-1)
      if (e.key === "ArrowRight" && imageIndex < images.length - 1) paginate(1)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose, paginate, imageIndex, images.length])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {hasImages ? (
            <>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={imageIndex}
                  className="absolute inset-0"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Image
                    src={images[imageIndex].url}
                    alt={images[imageIndex].alt ?? `${country.name} — photo ${imageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 disabled:opacity-30"
                    onClick={() => paginate(-1)}
                    disabled={imageIndex === 0}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 disabled:opacity-30"
                    onClick={() => paginate(1)}
                    disabled={imageIndex === images.length - 1}
                    aria-label="Next photo"
                  >
                    <ChevronRight className="size-4" />
                  </button>

                  <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                        aria-label={`Go to photo ${i + 1}`}
                        className={cn(
                          "h-1.5 rounded-full bg-white transition-all",
                          i === imageIndex ? "w-5 opacity-100" : "w-1.5 opacity-50"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <Camera className="size-12 opacity-25" />
              <p className="text-sm">No photos yet — coming soon</p>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl leading-none">{country.flag}</span>
              <div>
                <h3 className="font-heading text-lg font-bold leading-tight text-foreground">
                  {country.name}
                </h3>
                <p className="text-xs text-muted-foreground">{country.region}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Visited</span>
            {country.visits.map((v) => (
              <span
                key={v}
                className="rounded-full border border-border bg-muted px-3 py-0.5 text-xs font-medium text-foreground"
              >
                {v}
              </span>
            ))}
          </div>

          {country.note && (
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              &ldquo;{country.note}&rdquo;
            </p>
          )}

          {hasImages && images.length > 1 && (
            <p className="text-right text-xs text-muted-foreground">
              {imageIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Stamp card ───────────────────────────────────────────────────────────────

function CountryStampCard({
  country,
  onClick,
}: {
  country: VisitedCountry
  onClick: () => void
}) {
  const photoCount = country.images?.length ?? 0

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/30",
        "bg-card px-4 py-6 text-center overflow-hidden text-left"
      )}
      whileHover={{
        scale: 1.06,
        rotate: [0, -1.5, 1.5, 0],
        boxShadow: "0 16px 40px -8px rgba(0,0,0,0.18)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Inner perforation ring */}
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-primary/15" />

      {/* "VISITED" watermark */}
      <div className="absolute top-3 right-3 rotate-12 rounded border border-primary/25 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest text-primary/35">
        Visited
      </div>

      {/* Photo badge */}
      {photoCount > 0 && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5">
          <Camera className="size-2.5 text-primary" />
          <span className="text-[9px] font-semibold text-primary">{photoCount}</span>
        </div>
      )}

      {/* Flag */}
      <span className="text-5xl leading-none" role="img" aria-label={country.name}>
        {country.flag}
      </span>

      {/* Name + region + visits */}
      <div className="space-y-1.5">
        <p className="font-heading text-sm font-bold leading-tight text-foreground">
          {country.name}
        </p>
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {country.region}
        </span>
        <p className="text-[10px] text-muted-foreground">
          {country.visits.join(" · ")}
        </p>
      </div>

      {country.note && (
        <p className="line-clamp-2 px-1 text-[11px] italic leading-snug text-muted-foreground">
          {country.note}
        </p>
      )}
    </motion.button>
  )
}

// ─── Stats pill ───────────────────────────────────────────────────────────────

function TravelStatsBar({ tagline }: { tagline: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-5 py-2.5 text-sm font-medium text-muted-foreground">
        {tagline}
      </div>
    </div>
  )
}

// ─── Public export ────────────────────────────────────────────────────────────

interface TravelSectionProps {
  countries: VisitedCountry[]
  tagline: string
}

export function TravelSection({ countries, tagline }: TravelSectionProps) {
  const [selected, setSelected] = useState<VisitedCountry | null>(null)

  return (
    <div className="border-t border-border/50">
      <SectionWrapper>
        <FadeInWhenVisible>
          <SectionHeading
            label="Travel"
            title="Places I've Been"
            subtitle="A running log of countries I've called home, visited for work, or simply explored."
          />
        </FadeInWhenVisible>

        <div className="space-y-10">
          <FadeInWhenVisible delay={0.1}>
            <TravelStatsBar tagline={tagline} />
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm">
              <WorldMap countries={countries} onSelect={setSelected} />
            </div>
          </FadeInWhenVisible>

          <StaggerChildren
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
            staggerDelay={0.08}
          >
            {countries.map((country) => (
              <StaggerItem key={country.isoCode}>
                <CountryStampCard
                  country={country}
                  onClick={() => setSelected(country)}
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {selected && (
          <GalleryModal country={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
