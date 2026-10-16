"use client"

import { useEffect, useState } from "react"

export function CitationBlock({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(citation)
      setCopied(true)
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the BibTeX
      // is on screen and selectable, so leave the label alone.
      setCopied(false)
    }
  }

  return (
    <div>
      <pre className="m-0 overflow-x-auto border border-border bg-card p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {citation}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="eyebrow mt-2.5 border border-border-strong px-4 py-2.5 tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
      >
        {copied ? "Copied" : "Copy BibTeX"}
      </button>
    </div>
  )
}
