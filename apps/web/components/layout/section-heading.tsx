import { cn } from "@workspace/ui/lib/utils"

interface SectionHeadingProps {
  /** Two-digit section counter, e.g. "01". */
  index?: string
  title: string
  className?: string
}

/** The numbered section heading used across the site. */
export function SectionHeading({
  index,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-baseline gap-4", className)}>
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
export function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-6",
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-4 text-primary">{eyebrow}</p>}
        <h1 className="headline m-0 text-[clamp(3rem,10vw,7.5rem)] leading-[0.88] tracking-[-0.045em]">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.6] text-pretty text-muted-foreground">
            {lede}
          </p>
        )}
      </div>
      {aside && (
        <p className="eyebrow max-w-[340px] text-muted-foreground">{aside}</p>
      )}
    </div>
  )
}
