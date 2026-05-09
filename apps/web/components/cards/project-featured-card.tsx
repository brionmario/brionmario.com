import Link from "next/link"
import { ArrowRight, Star, GitFork } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { SiGithub } from "@icons-pack/react-simple-icons"
import type { Project } from "@/lib/data/projects"

interface ProjectFeaturedCardProps {
  project: Project
  className?: string
}

export function ProjectFeaturedCard({ project, className }: ProjectFeaturedCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group relative flex flex-col md:flex-row gap-0 overflow-hidden rounded-xl border border-primary/30 bg-card transition-all duration-200 hover:shadow-xl hover:border-primary/60",
        className
      )}
    >
      {/* Subtle gradient accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-between gap-6 p-7 md:p-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {project.org}
            </span>
            <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Featured
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors sm:text-3xl">
            {project.name}
          </h3>

          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
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

          <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
            View project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="relative flex shrink-0 flex-col items-center justify-center gap-6 bg-muted/30 p-8 md:w-56 border-t md:border-t-0 md:border-l border-border/60">
        <SiGithub color="currentColor" className="size-12 text-muted-foreground/40 group-hover:text-primary/50 transition-colors" />

        {(project.stars !== undefined || project.forks !== undefined) && (
          <div className="flex gap-5 text-sm text-muted-foreground">
            {project.stars !== undefined && (
              <span className="flex items-center gap-1.5">
                <Star className="size-4" />
                {project.stars.toLocaleString()}
              </span>
            )}
            {project.forks !== undefined && (
              <span className="flex items-center gap-1.5">
                <GitFork className="size-4" />
                {project.forks.toLocaleString()}
              </span>
            )}
          </div>
        )}

        {project.language && (
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            {project.language}
          </span>
        )}
      </div>
    </Link>
  )
}
