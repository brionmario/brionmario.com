import type { Metadata } from "next"

import { getAllBlogPosts } from "@/lib/blog-local"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { BlogCard } from "@/components/cards/blog-card"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on engineering, identity & access management, open source, and security.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <SectionWrapper>
      <SectionHeading
        label="Writing"
        title="Blog"
        subtitle="Thoughts on engineering, identity & access management, open source, and security."
      />
      <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <BlogCard post={post} className="h-full" />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  )
}
