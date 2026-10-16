import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

interface LiftCardProps {
  children: ReactNode
  href?: string
  external?: boolean
  className?: string
  /** Depth of the hard offset shadow on hover. */
  lift?: "sm" | "lg"
}

/**
 * A panel raised one step off the canvas by a hairline border, which lifts into
 * a hard accent shadow and an accent border on hover.
 */
export function LiftCard({
  children,
  href,
  external = false,
  className,
  lift = "sm",
}: LiftCardProps) {
  const classes = cn(
    "block border border-border bg-card transition-[transform,box-shadow,border-color] duration-[220ms]",
    href && "hover:-translate-x-1 hover:-translate-y-1 hover:border-primary hover:text-foreground",
    href &&
      (lift === "lg"
        ? "hover:shadow-[12px_12px_0_var(--bm-accent)]"
        : "hover:shadow-[10px_10px_0_var(--bm-accent)]"),
    className
  )

  if (!href) {
    return <div className={classes}>{children}</div>
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
