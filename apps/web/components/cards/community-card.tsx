import Link from "next/link"
import { CalendarDays, MapPin, Play } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { CommunityEngagement, EngagementType } from "@/lib/data/community"

const typeLabels: Record<EngagementType, string> = {
  conference: "Conference",
  meetup: "Meetup",
  workshop: "Workshop",
}

const typeColors: Record<EngagementType, string> = {
  conference: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  meetup: "bg-primary/10 text-primary",
  workshop: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

function formatEventDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  } catch {
    return dateStr
  }
}

interface CommunityCardProps {
  engagement: CommunityEngagement
  className?: string
}

export function CommunityCard({ engagement, className }: CommunityCardProps) {
  return (
    <Link
      href={`/community/${engagement.id}`}
      className={cn(
        "group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
            typeColors[engagement.type]
          )}
        >
          {typeLabels[engagement.type]}
        </span>
        {engagement.videoUrl && (
          <Play className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>

      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {engagement.event}
        </h3>
        {engagement.talk && (
          <p className="mt-1 text-sm font-medium text-primary/80">
            &ldquo;{engagement.talk}&rdquo;
          </p>
        )}
      </div>

      {engagement.description && (
        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
          {engagement.description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {formatEventDate(engagement.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {engagement.location}
        </span>
      </div>
    </Link>
  )
}
