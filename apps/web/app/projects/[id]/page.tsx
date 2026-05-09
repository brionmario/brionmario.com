import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

import { projects } from "@/lib/data/projects"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return {}
  return {
    title: project.name,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <SectionWrapper as="div" className="max-w-3xl">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back to projects
      </Link>

      <span className="mb-4 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
        {project.org}
      </span>

      <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
        {project.name}
      </h1>

      <p className="mt-6 text-base text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
        >
          <SiGithub color="currentColor" className="size-4" />
          View on GitHub
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
        <iframe
          src={`https://github-readme-stats.vercel.app/api/pin/?username=${project.githubUrl.split("github.com/")[1]?.split("/")[0]}&repo=${project.githubUrl.split("/").pop()}&theme=dark&bg_color=0d1117&border_color=30363d&title_color=7c6bda&text_color=c9d1d9&icon_color=7c6bda`}
          title={`${project.name} GitHub stats`}
          className="w-full border-0"
          height="140"
          loading="lazy"
        />
      </div>
    </SectionWrapper>
  )
}
