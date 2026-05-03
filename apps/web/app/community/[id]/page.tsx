import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CalendarDays, MapPin, ExternalLink } from "lucide-react"

import { communityEngagements } from "@/lib/data/community"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface Props {
  params: Promise<{ id: string }>
}

function getYouTubeEmbedUrl(url: string): string | null {
  const idMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/)
  if (!idMatch) return null
  const startMatch = url.match(/[?&]t=(\d+)/)
  const start = startMatch ? `?start=${startMatch[1]}` : ""
  return `https://www.youtube.com/embed/${idMatch[1]}${start}`
}

export async function generateStaticParams() {
  return communityEngagements.map((e) => ({ id: e.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const engagement = communityEngagements.find((e) => e.id === id)
  if (!engagement) return {}
  return {
    title: engagement.event,
    description: engagement.description,
  }
}

const typeColors: Record<string, string> = {
  conference: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  meetup: "bg-primary/10 text-primary",
  workshop: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

const typeLabels: Record<string, string> = {
  conference: "Conference",
  meetup: "Meetup",
  workshop: "Workshop",
}

export default async function CommunityDetailPage({ params }: Props) {
  const { id } = await params
  const engagement = communityEngagements.find((e) => e.id === id)
  if (!engagement) notFound()

  const embedUrl = engagement.videoUrl ? getYouTubeEmbedUrl(engagement.videoUrl) : null
  const formattedDate = new Date(engagement.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return (
    <SectionWrapper as="div" className="max-w-3xl">
      <Link
        href="/community"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back to community
      </Link>

      <span
        className={cn(
          "mb-4 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
          typeColors[engagement.type]
        )}
      >
        {typeLabels[engagement.type]}
      </span>

      <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
        {engagement.event}
      </h1>

      {engagement.talk && (
        <p className="mt-3 text-lg font-medium text-primary">
          &ldquo;{engagement.talk}&rdquo;
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {engagement.location}
        </span>
      </div>

      {engagement.description && (
        <p className="mt-6 text-base text-muted-foreground leading-relaxed">
          {engagement.description}
        </p>
      )}

      {embedUrl && (
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">Recording</h2>
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
            <iframe
              src={embedUrl}
              title={`${engagement.event} recording`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={engagement.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
        >
          View event page
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </SectionWrapper>
  )
}
