import Link from "next/link"
import { MapPin, Play } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { CommunityEngagement } from "@/lib/data/community"

function parseDateParts(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.getUTCDate(),
    month: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase(),
  }
}

interface CommunityAgendaItemProps {
  engagement: CommunityEngagement
  className?: string
}

export function CommunityAgendaItem({ engagement, className }: CommunityAgendaItemProps) {
  const { day, month } = parseDateParts(engagement.date)

  return (
    <Link
      href={`/community/${engagement.id}`}
      className={cn(
        "group grid grid-cols-[4rem_1px_1fr_auto] items-center gap-6 py-7 border-b border-border/60 last:border-0 transition-colors",
        className
      )}
    >
      {/* Date stamp */}
      <div className="text-center shrink-0">
        <div className="font-heading text-4xl font-bold leading-none text-primary">
          {day}
        </div>
        <div className="mt-1 font-medium text-[10px] tracking-[0.2em] text-muted-foreground">
          {month}
        </div>
      </div>

      {/* Vertical rule */}
      <div className="self-stretch w-px bg-border/60" />

      {/* Content */}
      <div className="min-w-0">
        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {engagement.event}
        </h3>
        {engagement.talk && (
          <p className="mt-0.5 text-sm text-muted-foreground truncate">
            &ldquo;{engagement.talk}&rdquo;
          </p>
        )}
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
          <MapPin className="size-3 shrink-0" />
          {engagement.location}
        </div>
      </div>

      {/* Trailing icon */}
      <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
        {engagement.videoUrl
          ? <Play className="size-4" />
          : <span className="text-lg leading-none opacity-30 group-hover:opacity-100 transition-opacity">→</span>
        }
      </div>
    </Link>
  )
}
