import type { Metadata } from "next"

import { getAllBlogPosts } from "@/lib/blog-local"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { BlogFeaturedCard } from "@/components/cards/blog-featured-card"
import { BlogSearchList } from "@/components/blog/blog-search-list"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on engineering, identity & access management, open source, and security.",
}

export default function BlogPage() {
  const [featured, ...rest] = getAllBlogPosts()

  return (
    <SectionWrapper>
      <SectionHeading
        label="Writing"
        title="Blog"
        subtitle="Thoughts on engineering, identity & access management, open source, and security."
      />

      {featured && <BlogFeaturedCard post={featured} />}

      <BlogSearchList posts={rest} />
    </SectionWrapper>
  )
}
