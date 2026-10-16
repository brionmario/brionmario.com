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
}

/**
 * Curated ordering, names and copy for the projects index.
 *
 * The GitHub seed (`pnpm dataseed`) supplies live stars/forks/language, but its
 * repo names are slugs ("Brionmario.Com") and its descriptions are README
 * blurbs. So the copy is authored here and the seed is merged in for the
 * numbers only, matched on the repo URL.
 */
const curatedProjects: Project[] = [
  {
    id: "thunder",
    name: "Thunder",
    org: "Asgardeo",
    description:
      "A lightweight, high-performance identity server built for modern cloud-native environments. Authentication and authorization at scale.",
    githubUrl: "https://github.com/asgardeo/thunder",
    tags: ["Go", "Identity", "OAuth2"],
    featured: true,
  },
  {
    id: "asgardeo-javascript",
    name: "Asgardeo JavaScript SDK",
    org: "Asgardeo",
    description:
      "Official JavaScript/TypeScript SDK for integrating Asgardeo identity and access management into web applications.",
    githubUrl: "https://github.com/asgardeo/javascript",
    tags: ["TypeScript", "React", "SDK"],
    featured: true,
  },
  {
    id: "wso2-identity-server",
    name: "WSO2 Identity Server",
    org: "WSO2",
    description:
      "Enterprise-grade open source IAM. Powers authentication, authorization and federation for millions of users.",
    githubUrl: "https://github.com/wso2/product-is",
    tags: ["Java", "SAML", "IAM"],
    featured: true,
  },
  {
    id: "brionmario-com",
    name: "brionmario.com",
    org: "Personal",
    description: "Source code for this site — Next.js, Turborepo, MDX content pipeline.",
    githubUrl: "https://github.com/brionmario/brionmario.com",
    tags: ["TypeScript", "Next.js"],
  },
  {
    id: "asgardeo-integrations",
    name: "Asgardeo Integrations",
    org: "Personal",
    description:
      "Sample applications demonstrating login integrations using @asgardeo/auth-react.",
    githubUrl: "https://github.com/brionmario/asgardeo-integrations",
    tags: ["CSS", "Samples"],
  },
  {
    id: "dev-server-ports",
    name: "Dev Server Ports",
    org: "Personal",
    description:
      "Handle dev server ports like a boss — a tiny utility that stops the port-in-use dance.",
    githubUrl: "https://github.com/brionmario/dev-server-ports",
    tags: ["TypeScript", "Tooling"],
  },
  {
    id: "identity-apps",
    name: "Identity Apps",
    org: "Personal",
    description:
      "End-user apps in WSO2 Identity Server — console, my account and the shared UI layer.",
    githubUrl: "https://github.com/brionmario/identity-apps",
    tags: ["TypeScript", "React"],
  },
  {
    id: "ui-configs",
    name: "UI Configs",
    org: "Personal",
    description:
      "Shareable configurations keeping consistency across Brion Mario's UI codebases.",
    githubUrl: "https://github.com/brionmario/ui-configs",
    tags: ["Config", "Tooling"],
  },
]

function normalizeRepoUrl(url: string): string {
  return url.replace(/\/+$/, "").toLowerCase()
}

const seedByUrl = new Map(
  (ghProjects as Project[]).map((project) => [normalizeRepoUrl(project.githubUrl), project])
)

export const projects: Project[] = curatedProjects.map((project) => {
  const seed = seedByUrl.get(normalizeRepoUrl(project.githubUrl))
  if (!seed) return project

  return {
    ...project,
    homepage: project.homepage ?? seed.homepage,
    stars: seed.stars,
    forks: seed.forks,
    language: seed.language,
  }
})

/**
 * The meta line on the projects index: language, then whichever social proof
 * the repo actually has.
 */
export function projectMeta(project: Project): string {
  const parts: string[] = []
  if (project.language) parts.push(project.language)
  else if (project.tags[0]) parts.push(project.tags[0])
  if (project.stars) parts.push(`★ ${project.stars}`)
  if (project.forks) parts.push(`⑂ ${project.forks}`)
  return parts.join(" · ")
}
