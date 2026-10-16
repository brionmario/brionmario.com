"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface HeroPhoto {
  src: string
  /** Describes the frame for the group label; never rendered as an img alt. */
  caption: string
}

const PHOTOS: HeroPhoto[] = [
  {
    src: "/images/people/hero-01-speaking.jpg",
    caption: "speaking at a meetup",
  },
  {
    src: "/images/people/hero-02-ella.jpg",
    caption: "with my wife above the Ella valley",
  },
  {
    src: "/images/people/hero-03-aydan.jpg",
    caption: "throwing my son in the air at dusk",
  },
  {
    src: "/images/people/hero-04-family.jpg",
    caption: "the three of us, dressed up",
  },
]

const INTERVAL_MS = 5000

/**
 * Two masks intersected, rather than one radial.
 *
 * The horizontal pass dissolves the image leftwards over most of its width, so
 * it has gone by the time it reaches the paragraph, and takes a short fade off
 * the right edge too. The right fade matters because how far the image bleeds
 * past the layout depends on the viewport: on a narrow window it runs off
 * screen, while on a wide one the bleed is capped and that edge is visible.
 * The vertical pass softens top and bottom.
 */
const FADE_X =
  "linear-gradient(to left, transparent 0%, rgba(0,0,0,0.55) 5%, #000 13%, #000 30%, rgba(0,0,0,0.66) 46%, rgba(0,0,0,0.28) 62%, rgba(0,0,0,0.07) 76%, transparent 88%)"
const FADE_Y =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 9%, #000 26%, #000 64%, rgba(0,0,0,0.55) 85%, transparent 100%)"

const MASK: React.CSSProperties = {
  maskImage: `${FADE_X}, ${FADE_Y}`,
  maskComposite: "intersect",
  WebkitMaskImage: `${FADE_X}, ${FADE_Y}`,
  WebkitMaskComposite: "source-in",
}

/**
 * The About hero image: the photos cross-fade in place, masked so they dissolve
 * into the page rather than sitting in a hard rectangle.
 *
 * It fills whatever box the caller gives it, because on /about it sits behind
 * the intro paragraph as an absolutely-positioned backdrop. The mask is
 * weighted to the right so the image has already dissolved by the time it
 * reaches the text on the left.
 *
 * `className` MUST include a position utility — the frames are `fill` images
 * and need a positioned ancestor. It is not set here because a base `relative`
 * would fight the caller's `absolute` (same CSS layer, so class order in the
 * attribute doesn't decide the winner) and collapse the box to zero height.
 *
 * All frames stay mounted and are stacked, so the fade is a plain opacity
 * transition with nothing loading mid-swap. The images carry empty alts and the
 * container does the describing — four alts narrating the same slot would just
 * be noise to a screen reader.
 */
export function HeroPhotos({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Someone who asked the OS to reduce motion gets the first frame, still.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduced.matches) return

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % PHOTOS.length)
    }, INTERVAL_MS)

    return () => clearInterval(id)
  }, [])

  return (
    <div
      role="img"
      aria-label={`Photos of Brion Mario: ${PHOTOS.map((p) => p.caption).join("; ")}.`}
      className={`overflow-hidden ${className}`}
      style={MASK}
    >
      {PHOTOS.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={i === 0}
          className={`object-cover contrast-[1.08] grayscale transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  )
}
