import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { LocalBlogPost } from "@/lib/blog-local"

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateStr
  }
}

interface BlogFeaturedCardProps {
  post: LocalBlogPost
  className?: string
}

export function BlogFeaturedCard({ post, className }: BlogFeaturedCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col md:flex-row gap-0 overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-xl",
        className
      )}
    >
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-5 p-7 md:p-8">
        <div className="space-y-4">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 0 && <span>·</span>}
            <span>{formatDate(post.date)}</span>
            {post.readingTime && (
              <>
                <span>·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-2xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors sm:text-3xl">
            {post.title}
          </h3>

          {/* Description */}
          {post.description && (
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {post.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
          Read post
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {/* Image */}
      {post.bannerImage && (
        <div className="relative md:w-80 lg:w-96 shrink-0 overflow-hidden bg-muted min-h-48 md:min-h-0">
          <Image
            src={post.bannerImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 384px"
            unoptimized
          />
        </div>
      )}
    </Link>
  )
}
