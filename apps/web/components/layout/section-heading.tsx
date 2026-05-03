import { cn } from "@workspace/ui/lib/utils"

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
