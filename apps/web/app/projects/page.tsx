import type { Metadata } from "next"

import { projects } from "@/lib/data/projects"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { ProjectCard } from "@/components/cards/project-card"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open source projects I contribute to — spanning identity, security, and developer tooling.",
}

export default function ProjectsPage() {
  return (
    <SectionWrapper>
      <SectionHeading
        label="Open Source"
        title="Projects"
        subtitle="Open source projects I contribute to — spanning identity, security, and developer tooling."
      />
      <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} className="h-full" />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  )
}
