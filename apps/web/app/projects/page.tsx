import { GitFork } from "lucide-react"
import type { Metadata } from "next"

import { projects } from "@/lib/data/projects"
import { IndexRow } from "@/components/cards/index-row"
import { PageHeader } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { ProjectMeta } from "@/components/projects/project-meta"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Identity, security and developer tooling. Mostly the unglamorous plumbing that other people's logins depend on.",
}

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-16 pb-10 sm:px-7 sm:pt-[72px]">
        <PageHeader
          eyebrow="Index / Open source"
          title="Projects"
          lede="Identity, security and developer tooling. Mostly the unglamorous plumbing that other people's logins depend on."
        />
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pt-6 pb-28 sm:px-7">
        <div>
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index, 6) * 55}>
              <IndexRow
                num={String(index + 1).padStart(2, "0")}
                title={project.name}
                description={project.description}
                org={project.org}
                meta={<ProjectMeta project={project} />}
                href={project.githubUrl}
                external
                aside={
                  project.upstream && (
                    <a
                      href={project.upstream.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow-sm inline-flex items-center gap-1.5 text-faint no-underline transition-colors hover:text-primary"
                    >
                      <GitFork className="size-3.5 shrink-0" aria-hidden />
                      Forked from {project.upstream.repo}
                    </a>
                  )
                }
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
