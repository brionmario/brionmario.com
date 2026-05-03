"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface FadeInWhenVisibleProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function FadeInWhenVisible({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInWhenVisibleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const initial = {
    opacity: 0,
    y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
    x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
