import Image from "next/image"
import Link from "next/link"

import { cn } from "@workspace/ui/lib/utils"
import type { LocalBlogPost } from "@/lib/blog-local"

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

interface BentoBlogCardProps {
  post: LocalBlogPost
  span?: number
  className?: string
}

export function BentoBlogCard({ post, span = 1, className }: BentoBlogCardProps) {
  const isWide = span >= 2
  const isFull = span >= 4

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-xl bg-muted",
        className
      )}
    >
      {/* Image */}
      {post.bannerImage && (
        <Image
          src={post.bannerImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5">
        {post.tags[0] && (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
            {post.tags[0]}
          </span>
        )}
        <h3
          className={cn(
            "font-heading font-bold leading-snug text-white mt-1 group-hover:text-white/90 transition-colors",
            isFull ? "text-2xl sm:text-3xl" : isWide ? "text-lg sm:text-xl" : "text-sm sm:text-base"
          )}
        >
          {post.title}
        </h3>
        {isWide && post.description && (
          <p className="mt-1.5 text-sm text-white/60 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="mt-2 text-[11px] text-white/40">
          {formatDate(post.date)}
          {post.readingTime && <span> · {post.readingTime}</span>}
        </div>
      </div>
    </Link>
  )
}
