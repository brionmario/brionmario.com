import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"
import type { TimelineEntry as TimelineEntryData } from "@/lib/data/about"

interface TimelineEntryProps {
  entry: TimelineEntryData
  index: number
}

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  return (
    <FadeInWhenVisible direction="left" delay={index * 0.1}>
      <div className="relative flex gap-6 pb-10 last:pb-0">
        <div className="flex flex-col items-center">
          <div className="size-3 rounded-full bg-primary ring-4 ring-primary/20 shrink-0 mt-1" />
          <div className="mt-2 w-px flex-1 bg-border last:hidden" />
        </div>
        <div className="flex-1 pb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {entry.year}
          </span>
          <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">
            {entry.role}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">{entry.company}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {entry.description}
          </p>
        </div>
      </div>
    </FadeInWhenVisible>
  )
}
