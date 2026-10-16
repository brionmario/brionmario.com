import type { Metadata } from "next"

import { projectMeta, projects } from "@/lib/data/projects"
import { IndexRow } from "@/components/cards/index-row"
import { PageHeader } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Identity, security and developer tooling. Mostly the unglamorous plumbing that other people's logins depend on.",
}

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pb-10 pt-16 sm:px-7 sm:pt-[72px]">
        <PageHeader
          eyebrow="Index / Open source"
          title="Projects"
          lede="Identity, security and developer tooling. Mostly the unglamorous plumbing that other people's logins depend on."
        />
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-28 pt-6 sm:px-7">
        <div className="border-t border-border">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index, 6) * 55}>
              <IndexRow
                num={String(index + 1).padStart(2, "0")}
                title={project.name}
                description={project.description}
                org={project.org}
                meta={projectMeta(project)}
                href={project.githubUrl}
                external
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
