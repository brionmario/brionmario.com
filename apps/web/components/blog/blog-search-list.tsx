"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

import type { LocalBlogPost } from "@/lib/blog-local"
import { BlogCard } from "@/components/cards/blog-card"

interface BlogSearchListProps {
  posts: LocalBlogPost[]
}

export function BlogSearchList({ posts }: BlogSearchListProps) {
  const [query, setQuery] = useState("")

  const filtered = query.trim()
    ? posts.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        )
      })
    : posts

  return (
    <div className="mt-10 space-y-8">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} className="h-full" />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted-foreground text-sm">
          No articles found for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  )
}
