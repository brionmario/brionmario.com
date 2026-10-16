import type { Metadata } from "next"

import { getAllBlogPosts } from "@/lib/blog-local"
import { withTopic } from "@/lib/blog-topics"
import { externalArticles } from "@/lib/data/articles"
import { BlogIndex } from "@/components/blog/blog-index"
import { CompactRow } from "@/components/cards/index-row"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on engineering, identity & access management, open source, and security.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts().map(withTopic)

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="headline m-0 text-[clamp(3rem,11vw,8rem)] leading-[0.84] tracking-[-0.05em]">
            Writing
          </h1>
          <p className="eyebrow tracking-[0.24em] text-muted-foreground">
            {posts.length} posts
          </p>
        </div>
      </section>

      <BlogIndex posts={posts} />

      {externalArticles.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-6 pb-24 sm:px-7">
          <p className="eyebrow mb-4 tracking-[0.26em] text-faint">Published elsewhere</p>
          {externalArticles.map((article) => (
            <CompactRow
              key={article.url}
              lead={article.date}
              title={article.title}
              trail={article.source}
              href={article.url}
              leadWidth="md"
              external
            />
          ))}
        </section>
      )}
    </>
  )
}
