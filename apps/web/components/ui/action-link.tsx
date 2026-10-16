import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

type Variant = "solid" | "outline" | "accent"

const base =
  "inline-flex min-w-[172px] items-center justify-center px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-[transform,box-shadow,border-color,color] duration-200"

const variants: Record<Variant, string> = {
  // Paper block with a hard accent shadow that deepens as it lifts.
  solid:
    "bg-foreground text-background shadow-[6px_6px_0_var(--bm-accent)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_var(--bm-accent)] hover:text-background",
  outline:
    "border border-border-strong text-foreground hover:-translate-y-[3px] hover:border-primary hover:text-foreground",
  // Accent outline that fills on hover — the design's primary CTA on inner pages.
  accent:
    "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
}

interface ActionLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant
  className?: string
  children: ReactNode
}

/** Internal navigation button. */
export function ActionLink({
  variant = "outline",
  className,
  children,
  ...props
}: ActionLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  )
}

interface ActionAnchorProps extends ComponentProps<"a"> {
  variant?: Variant
}

/** External / mailto variant of the same button. */
export function ActionAnchor({
  variant = "outline",
  className,
  children,
  ...props
}: ActionAnchorProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  )
}
