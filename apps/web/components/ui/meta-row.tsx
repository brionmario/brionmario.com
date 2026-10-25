import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

interface MetaRowProps {
  children: ReactNode
  className?: string
}

/**
 * The row of facts that sits above a title. One chip carries the category the
 * item belongs to; everything after it is a fact about this one item, led by
 * its own icon so the row scans without any separators.
 */
export function MetaRow({ children, className }: MetaRowProps) {
  return (
    <div
      className={cn(
        "eyebrow flex flex-wrap items-center gap-x-5 gap-y-3 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

/** The category chip — the only part of the row that reads as a label. */
export function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="bg-primary/10 px-2.5 py-1 font-semibold text-primary">
      {children}
    </span>
  )
}

interface MetaItemProps {
  icon: LucideIcon
  children: ReactNode
}

/** A single fact, led by its icon. */
export function MetaItem({ icon: Icon, children }: MetaItemProps) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <Icon className="size-3.5 shrink-0 text-faint" aria-hidden />
      {children}
    </span>
  )
}
