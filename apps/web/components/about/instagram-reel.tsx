"use client"

import { useEffect, useRef, useState } from "react"

interface InstagramReelProps {
  /** Shortcode from the permalink, e.g. `DeRzI3gS38T`. */
  code: string
  /** Account the reel belongs to, used for the fallback link text. */
  handle: string
}

/**
 * Instagram's official embed iframe for a single reel.
 *
 * The iframe is only mounted once the card is near the viewport — Meta's embed
 * pulls ~400KB and sets cookies, so there is no reason to pay for it on a visit
 * that never scrolls this far. Instagram's embed has a hard 326px minimum
 * width — below that it grows its own horizontal scrollbar — so on the
 * narrowest phones the iframe is pinned at 326px and centred, trimming a pixel
 * or two off each edge rather than letting the embed break.
 */
export function InstagramReel({ code, handle }: InstagramReelProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" }
    )

    observer.observe(host)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={hostRef}
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Two spacers size the window: Instagram's 54px header strip, then the
          reel itself, which the embed always crops to 4:5. Everything below
          that — the like count and comment box, the only part of the embed
          that is hard-wired to white — falls outside and is clipped. */}
      <div aria-hidden className="h-[54px]" />
      <div aria-hidden className="aspect-[4/5] w-full" />

      {visible ? (
        <iframe
          src={`https://www.instagram.com/reel/${code}/embed/`}
          title={`Instagram reel by ${handle}`}
          loading="lazy"
          scrolling="no"
          allow="encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-y-0 left-1/2 h-[1800px] w-full min-w-[326px] -translate-x-1/2 border-0"
        />
      ) : (
        <span className="eyebrow-sm absolute inset-0 flex items-center justify-center text-faint">
          Loading reel…
        </span>
      )}
    </div>
  )
}
