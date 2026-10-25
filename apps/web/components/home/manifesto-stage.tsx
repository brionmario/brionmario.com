"use client"

import { useEffect, useRef } from "react"

import { Reveal } from "@/components/motion/reveal"

/**
 * The full-height statement. A soft accent glow drifts across the section as it
 * scrolls past, driven directly from the scroll position rather than a timeline.
 */
export function ManifestoStage() {
  const stageRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const glow = glowRef.current
    if (!stage || !glow) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    function paint() {
      frame = 0
      if (!stage || !glow) return

      const rect = stage.getBoundingClientRect()
      const progress = Math.max(
        0,
        Math.min(
          1,
          1 - (rect.top + rect.height * 0.2) / (window.innerHeight || 1)
        )
      )

      glow.style.transform = `translate3d(${-6 + progress * 12}vw, ${7 - progress * 14}vh, 0) scale(${0.94 + progress * 0.12})`
    }

    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(paint)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    paint()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section
      ref={stageRef}
      className="relative flex min-h-screen items-center justify-center overflow-clip px-8 py-32"
    >
      {/*
        The ember reads much hotter on the paper canvas than on ink, so the
        stop opacities are roughly halved in light mode.
      */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -inset-[25%] blur-[70px] will-change-transform [--glow-1:0.06] [--glow-2:0.04] [--glow-3:0.02] [--glow-4:0.007] dark:[--glow-1:0.13] dark:[--glow-2:0.085] dark:[--glow-3:0.04] dark:[--glow-4:0.014]"
        style={{
          background:
            "radial-gradient(closest-side ellipse at 50% 45%, rgb(255 92 53 / var(--glow-1)) 0%, rgb(255 92 53 / var(--glow-2)) 26%, rgb(255 92 53 / var(--glow-3)) 48%, rgb(255 92 53 / var(--glow-4)) 68%, rgb(255 92 53 / 0) 84%)",
        }}
      />
      {/* Feathers the glow into the canvas at both edges of the section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_22%,transparent_78%,var(--background)_100%)]"
      />

      <div className="relative max-w-[1100px] text-center">
        <Reveal>
          <p className="eyebrow mb-6 text-primary">What I actually do</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="headline m-0 text-[clamp(2.2rem,6.4vw,5rem)] text-balance">
            I build the part of software
            <br />
            you&rsquo;re supposed to trust.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-7 max-w-[620px] text-[17px] leading-[1.65] text-pretty text-muted-foreground">
            Login screens, tokens, sessions, consent. Boring when it works,
            front-page news when it doesn&rsquo;t.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
