import { ghProjects } from "./autogen/gh-projects"

export interface Project {
  id: string
  name: string
  org: string
  description: string
  githubUrl: string
  homepage?: string
  tags: string[]
  stars?: number
  forks?: number
  language?: string | null
  featured?: boolean
  /** True when the repo is a fork of someone else's work. */
  fork?: boolean
  /** Where a fork came from — the root of the chain, not the immediate parent. */
  upstream?: { repo: string; url: string }
}

/**
 * The projects index, straight from GitHub.
 *
 * Membership is the `featured-project` topic and nothing else: tag a repo on
 * GitHub, run `pnpm dataseed`, and it shows up here — untag it and it leaves.
 * Names and blurbs are the repo's own, so a project reads on the site exactly
 * as well as its GitHub description reads. There is deliberately no curated
 * list to keep in sync; the repo is the single source of truth.
 */
export const projects: Project[] = ghProjects as Project[]

/** What the repo is written in: the language GitHub reports, else its first tag. */
export function projectTech(project: Project): string {
  return project.language ?? project.tags[0] ?? ""
}
