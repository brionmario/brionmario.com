import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
      month: "short",
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
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      {post.bannerImage && (
        <div
          className="relative aspect-video overflow-hidden bg-muted"
          style={{
            maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
        >
          <Image
            src={post.bannerImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {post.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}
