"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger step, in ms, applied as a transition-delay. */
  delay?: number
}

/**
 * Fades and lifts content into place the first time it enters the viewport.
 *
 * The hidden state is applied imperatively after mount rather than rendered, so
 * content is never stranded invisible when JS, IntersectionObserver or CSS
 * transitions are unavailable — it simply renders in its final position.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    node.style.opacity = "0"
    node.style.transform = "translateY(16px)"
    node.style.transition = `opacity .6s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform .6s cubic-bezier(.2,.8,.2,1) ${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          node.style.opacity = "1"
          node.style.transform = "none"
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
