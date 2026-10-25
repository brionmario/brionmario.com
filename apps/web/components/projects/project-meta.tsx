import { GitFork, Star } from "lucide-react"

import { projectTech, type Project } from "@/lib/data/projects"
import { TechIcon } from "@/components/icons/tech-icon"

/**
 * The right-hand meta stack on the projects index: what the repo is written
 * in, then whichever social proof it actually has.
 */
export function ProjectMeta({ project }: { project: Project }) {
  const tech = projectTech(project)

  return (
    <div className="flex flex-col items-end gap-2">
      <span className="inline-flex items-center gap-2 whitespace-nowrap">
        <TechIcon name={tech} className="size-4 shrink-0" />
        {tech}
      </span>

      {(project.stars || project.forks) && (
        <span className="inline-flex items-center gap-4 whitespace-nowrap">
          {project.stars ? (
            <span className="inline-flex items-center gap-1.5">
              <Star
                className="size-3.5 shrink-0 fill-current text-[#E3B341]"
                aria-hidden
              />
              {project.stars}
            </span>
          ) : null}
          {project.forks ? (
            <span className="inline-flex items-center gap-1.5">
              <GitFork className="size-3.5 shrink-0 text-faint" aria-hidden />
              {project.forks}
            </span>
          ) : null}
        </span>
      )}
    </div>
  )
}
