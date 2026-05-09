import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { SiGithub } from "@icons-pack/react-simple-icons"
import type { Project } from "@/lib/data/projects"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="mb-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {project.org}
          </span>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
        </div>
        <SiGithub color="currentColor" className="size-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>

      <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
        View project
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
