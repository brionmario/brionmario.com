import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getAllBlogPosts } from "@/lib/blog-local"
import { projects } from "@/lib/data/projects"
import { communityEngagements } from "@/lib/data/community"
import { publications } from "@/lib/data/publications"

import { HeroSection } from "@/components/hero/hero-section"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { BlogCard } from "@/components/cards/blog-card"
import { ProjectCard } from "@/components/cards/project-card"
import { CommunityCard } from "@/components/cards/community-card"
import { PublicationCard } from "@/components/cards/publication-card"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"

export const revalidate = 3600

export default async function HomePage() {
  const posts = getAllBlogPosts().slice(0, 3)

  return (
    <>
      <HeroSection />

      {posts.length > 0 && (
        <SectionWrapper>
          <div className="flex items-end justify-between">
            <SectionHeading
              label="Writing"
              title="From the blog"
              subtitle="Thoughts on engineering, identity, and open source."
            />
            <Link
              href="/blog"
              className="mb-12 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 shrink-0"
            >
              See all posts
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </SectionWrapper>
      )}

      <SectionWrapper>
        <div className="flex items-end justify-between">
          <SectionHeading
            label="Open Source"
            title="Projects I work on"
            subtitle="Contributing to identity, security, and developer tooling."
          />
          <Link
            href="/projects"
            className="mb-12 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 shrink-0"
          >
            See all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex items-end justify-between">
          <SectionHeading
            label="Community"
            title="Speaking & Events"
            subtitle="Sharing knowledge at meetups and conferences."
          />
          <Link
            href="/community"
            className="mb-12 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 shrink-0"
          >
            See all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {communityEngagements.map((engagement) => (
            <StaggerItem key={engagement.id}>
              <CommunityCard engagement={engagement} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionWrapper>

      <SectionWrapper>
        <FadeInWhenVisible>
          <SectionHeading
            label="Research"
            title="Publications"
            subtitle="Peer-reviewed research in XR and IoT Medical Systems."
          />
        </FadeInWhenVisible>
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {publications.map((pub) => (
            <StaggerItem key={pub.id}>
              <PublicationCard publication={pub} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionWrapper>
    </>
  )
}
