import Link from "next/link"
import { MapPin, ExternalLink, Play } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { CommunityEngagement } from "@/lib/data/community"

function parseDateParts(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.getUTCDate(),
    month: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase(),
    year: d.getUTCFullYear(),
  }
}

function getYouTubeEmbedUrl(url: string): string | null {
  // youtu.be/ID?t=seconds
  const shortMatch = url.match(/youtu\.be\/([^?&#/]+)(?:[?&]t=(\d+))?/)
  if (shortMatch) {
    const [, id, start] = shortMatch
    return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`
  }
  // youtube.com/watch?v=ID&t=seconds
  const standardMatch = url.match(/[?&]v=([^&]+)/)
  const tMatch = url.match(/[?&]t=(\d+)/)
  if (standardMatch) {
    const id = standardMatch[1]
    const start = tMatch?.[1]
    return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`
  }
  return null
}

interface CommunityFeaturedCardProps {
  engagement: CommunityEngagement
  className?: string
}

export function CommunityFeaturedCard({ engagement, className }: CommunityFeaturedCardProps) {
  const { day, month, year } = parseDateParts(engagement.date)
  const embedUrl = engagement.videoUrl ? getYouTubeEmbedUrl(engagement.videoUrl) : null

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-primary/30 bg-card",
        className
      )}
    >
      {/* Subtle gradient accent — flows from right where content lives on desktop */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-bl from-primary/5 via-transparent to-transparent" />

      <div className={cn(
        "relative grid gap-0",
        embedUrl ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      )}>
        {/* Content — right column on desktop */}
        <div className="flex flex-col justify-between gap-6 p-7 md:p-10 order-first md:order-last">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                Featured
              </span>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground capitalize">
                {engagement.type}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-5xl font-bold leading-none text-primary">
                {day}
              </span>
              <div className="flex flex-col">
                <span className="font-medium text-xs tracking-[0.2em] text-muted-foreground">
                  {month}
                </span>
                <span className="font-medium text-xs tracking-[0.15em] text-muted-foreground">
                  {year}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {engagement.event}
              </h3>
              {engagement.talk && (
                <p className="text-sm font-medium text-primary">
                  &ldquo;{engagement.talk}&rdquo;
                </p>
              )}
            </div>

            {engagement.description && (
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {engagement.description}
              </p>
            )}

            <div className="flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              <MapPin className="size-3.5 shrink-0" />
              {engagement.location}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {engagement.videoUrl && (
              <Link
                href={engagement.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Play className="size-3.5" />
                Watch talk
              </Link>
            )}
            <Link
              href={`/community/${engagement.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <ExternalLink className="size-3.5" />
              View event
            </Link>
          </div>
        </div>

        {/* Embedded video */}
        {embedUrl && (
          <div className="relative flex items-center justify-center bg-black border-b md:border-b-0 md:border-r border-border/60 min-h-56 md:min-h-0 order-last md:order-first">
            <iframe
              src={embedUrl}
              title={engagement.talk ?? engagement.event}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}
