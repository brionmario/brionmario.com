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
import { BlogFeaturedCard } from "@/components/cards/blog-featured-card"
import { ProjectCard } from "@/components/cards/project-card"
import { ProjectFeaturedCard } from "@/components/cards/project-featured-card"
import { CommunityAgendaItem } from "@/components/cards/community-agenda-item"
import { CommunityFeaturedCard } from "@/components/cards/community-featured-card"
import { PublicationCard } from "@/components/cards/publication-card"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"

export const revalidate = 3600

function pickHomeProjects(count = 4) {
  const shuffled = [...projects].sort(() => Math.random() - 0.5)
  // Put featured ones first, then fill with others
  const featured = shuffled.filter((p) => p.featured)
  const rest = shuffled.filter((p) => !p.featured)
  const ordered = [...featured, ...rest]
  const highlight = ordered[0]
  const others = ordered.slice(1, count)
  return { highlight, others }
}

function pickHomeEvents(count = 3) {
  // Prefer events with video as the featured one
  const withVideo = communityEngagements.filter((e) => e.videoUrl)
  const withoutVideo = communityEngagements.filter((e) => !e.videoUrl)
  const highlight = withVideo[0] ?? communityEngagements[0]
  const rest = [...withVideo.slice(1), ...withoutVideo]
    .filter((e) => e.id !== highlight.id)
    .slice(0, count - 1)
  return { highlight, rest }
}

export default async function HomePage() {
  const posts = getAllBlogPosts().slice(0, 3)
  const { highlight: featuredProject, others: otherProjects } = pickHomeProjects(4)
  const { highlight: featuredEvent, rest: otherEvents } = pickHomeEvents(3)

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
          <div className="flex flex-col gap-6">
            {posts[0] && <BlogFeaturedCard post={posts[0]} />}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {posts.slice(1).map((post) => (
                  <BlogCard key={post.slug} post={post} className="h-full" />
                ))}
              </div>
            )}
          </div>
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
        <div className="flex flex-col gap-6">
          {featuredProject && <ProjectFeaturedCard project={featuredProject} />}
          {otherProjects.length > 0 && (
            <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {otherProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard project={project} className="h-full" />
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </div>
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
        <div className="flex flex-col gap-6">
          {featuredEvent && <CommunityFeaturedCard engagement={featuredEvent} />}
          {otherEvents.length > 0 && (
            <div className="divide-y divide-border/60">
              {otherEvents.map((engagement) => (
                <CommunityAgendaItem key={engagement.id} engagement={engagement} />
              ))}
            </div>
          )}
        </div>
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
