import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

const rowClass =
  "group grid grid-cols-[48px_1fr] gap-x-6 px-5 py-9 transition-[background-color,padding-left] duration-[250ms] hover:bg-primary/8 hover:pl-[34px] hover:text-foreground sm:grid-cols-[64px_1fr]"

interface IndexRowProps {
  /** Two-digit counter shown in the gutter. */
  num: string
  title: string
  description?: string
  /** Accent-coloured label on the right, e.g. the owning org. */
  org?: string
  meta?: ReactNode
  href: string
  external?: boolean
}

/** The big numbered list row used for the Projects index. */
export function IndexRow({
  num,
  title,
  description,
  org,
  meta,
  href,
  external = false,
}: IndexRowProps) {
  const body = (
    <>
      <span className="eyebrow pt-2.5 text-faint">{num}</span>
      <div className="flex flex-wrap items-baseline justify-between gap-x-7 gap-y-3">
        <div className="min-w-0 flex-[1_1_420px]">
          <h3 className="m-0 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
            {title}
          </h3>
          {description && (
            <p className="mt-2.5 max-w-[640px] text-[15px] leading-[1.6] text-pretty text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {(org || meta) && (
          <div className="eyebrow flex shrink-0 flex-col items-end gap-2 text-faint">
            {org && <span className="text-primary">{org}</span>}
            {meta}
          </div>
        )}
      </div>
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClass}
      >
        {body}
      </a>
    )
  }

  return (
    <Link href={href} className={rowClass}>
      {body}
    </Link>
  )
}

interface CompactRowProps {
  /** Left gutter label — a date, month/year or publisher. */
  lead: string
  title: string
  /** Right-hand accent marker, usually a topic or an arrow. */
  trail?: ReactNode
  href: string
  external?: boolean
  /** Widen the gutter for longer leads like "Chennai React Meetup". */
  leadWidth?: "sm" | "md" | "lg"
  className?: string
}

const leadWidths = {
  sm: "sm:grid-cols-[74px_minmax(0,1fr)_auto]",
  md: "sm:grid-cols-[110px_minmax(0,1fr)_auto]",
  lg: "sm:grid-cols-[150px_minmax(0,1fr)_auto]",
}

/** The dense index row used for post lists, articles and related links. */
export function CompactRow({
  lead,
  title,
  trail,
  href,
  external = false,
  leadWidth = "sm",
  className,
}: CompactRowProps) {
  const rowClasses = cn(
    "grid grid-cols-1 items-baseline gap-x-[22px] gap-y-2 px-3.5 py-7 transition-[background-color,padding-left] duration-200 hover:bg-primary/10 hover:pl-6 hover:text-foreground",
    leadWidths[leadWidth],
    className
  )

  const body = (
    <>
      <span className="eyebrow text-faint">{lead}</span>
      <h3 className="m-0 text-[clamp(1.05rem,2vw,1.4rem)] leading-[1.3] font-bold tracking-[-0.02em] text-pretty">
        {title}
      </h3>
      {trail && <span className="eyebrow-sm text-primary">{trail}</span>}
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClasses}
      >
        {body}
      </a>
    )
  }

  return (
    <Link href={href} className={rowClasses}>
      {body}
    </Link>
  )
}
