import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { LocalBlogPost } from "@/lib/blog-local"

interface BlogCardProps {
  post: LocalBlogPost
  className?: string
}

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

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30",
        className
      )}
    >
      {post.bannerImage ? (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={post.bannerImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
      ) : (
        <div className="aspect-video bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <span className="font-heading text-4xl font-bold text-primary/20">BM</span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                <Tag className="size-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {post.description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3" />
            {formatDate(post.date)}
          </span>
          {post.readingTime && (
            <span className="text-xs text-muted-foreground">{post.readingTime}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
