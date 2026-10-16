"use client"

import { useId, useState, type ReactNode } from "react"

interface DisclosureProps {
  /** Prose that the trigger is appended to, inline. */
  lead: ReactNode
  openLabel: string
  closedLabel: string
  children: ReactNode
}

/**
 * A paragraph that ends in an inline link revealing a detail table below it —
 * the pattern the About page uses for the timeline and the awards list.
 */
export function Disclosure({ lead, openLabel, closedLabel, children }: DisclosureProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <>
      <p className="mt-7 text-[17px] leading-[1.75] text-muted-foreground text-pretty">
        {lead}{" "}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline border-0 border-b-2 border-primary bg-transparent p-0 pb-0.5 font-[inherit] text-[inherit] text-foreground transition-colors hover:text-primary"
        >
          {open ? openLabel : closedLabel}
        </button>
      </p>

      {open && (
        <div id={panelId} className="mt-7 border-t border-border-strong">
          {children}
        </div>
      )}
    </>
  )
}
