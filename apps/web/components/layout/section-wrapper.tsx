import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  /** Inverts the canvas — paper on dark, ink on light. */
  invert?: boolean
  /** Constrains the inner column. Defaults to the 1240px site grid. */
  width?: "default" | "prose"
}

/** The standard 1240px column with the design's horizontal rhythm. */
export function SectionWrapper({
  children,
  className,
  invert = false,
  width = "default",
}: SectionWrapperProps) {
  const inner = (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-7",
        width === "prose" ? "max-w-[900px]" : "max-w-[1240px]"
      )}
    >
      {children}
    </div>
  )

  if (invert) {
    return <section className={cn("surface-invert py-20 sm:py-24", className)}>{inner}</section>
  }

  return <section className={cn("py-16 sm:py-20", className)}>{inner}</section>
}
