import { BookOpen, ExternalLink, MapPin } from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import type { Publication, Publisher } from "@/lib/data/publications"

const publisherColors: Record<Publisher, string> = {
  IEEE: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  ResearchGate:
    "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
}

interface PublicationCardProps {
  publication: Publication
  className?: string
}

export function PublicationCard({ publication, className }: PublicationCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold",
            publisherColors[publication.publisher]
          )}
        >
          {publication.publisher}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {publication.year}
        </span>
      </div>

      <div>
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {publication.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <BookOpen className="size-3.5 shrink-0" />
          {publication.conference}
        </p>
        {publication.location && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            {publication.location}
          </p>
        )}
      </div>

      {publication.abstract && (
        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
          {publication.abstract}
        </p>
      )}

      <a
        href={publication.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-auto w-fit")}
      >
        <ExternalLink className="size-3" data-icon="inline-start" />
        Read Paper
      </a>
    </div>
  )
}
