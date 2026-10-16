import { cn } from "@workspace/ui/lib/utils"

interface SectionHeadingProps {
  /** Two-digit section counter, e.g. "01". */
  index?: string
  title: string
  className?: string
  /** Kept for the odd place that still wants a heavier rule. */
  rule?: "heavy" | "hairline"
}

/** The numbered, rule-underlined section heading used across the site. */
export function SectionHeading({
  index,
  title,
  className,
  rule = "hairline",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-4 pb-3",
        rule === "heavy"
          ? "border-b-2 border-border-strong"
          : "border-b border-border",
        className
      )}
    >
      {index && <span className="eyebrow text-primary">{index}</span>}
      <h2 className="headline m-0 text-[clamp(1.6rem,4vw,2.6rem)] tracking-[-0.035em]">
        {title}
      </h2>
    </div>
  )
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  lede?: string
  aside?: string
  className?: string
}

/** The oversized page title block that opens Projects / Writing / Research. */
export function PageHeader({ eyebrow, title, lede, aside, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-4 tracking-[0.3em] text-primary">{eyebrow}</p>}
        <h1 className="headline m-0 text-[clamp(3rem,10vw,7.5rem)] leading-[0.88] tracking-[-0.045em]">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.6] text-muted-foreground text-pretty">
            {lede}
          </p>
        )}
      </div>
      {aside && (
        <p className="eyebrow max-w-[340px] tracking-[0.2em] text-muted-foreground">{aside}</p>
      )}
    </div>
  )
}
