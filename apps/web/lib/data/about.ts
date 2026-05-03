export interface TimelineEntry {
  year: string
  role: string
  company: string
  description: string
}

export const bio = `I'm a Fullstack Engineer with 6+ years of experience building scalable, high-performant, and secure software solutions. I'm deeply passionate about open source, identity & access management, and creating developer-friendly tools that make security accessible.

Currently, I contribute to projects like Asgardeo and WSO2 Identity Server, working at the intersection of security engineering and developer experience. When I'm not writing code, I share what I learn through writing, speaking at meetups, and publishing research.`

export const skills: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Go",
  "OAuth2 / OIDC",
  "Identity & Access Management",
  "Docker",
  "Kubernetes",
  "REST APIs",
  "GraphQL",
  "PostgreSQL",
  "Redis",
  "Security Engineering",
  "Open Source",
]

export const timeline: TimelineEntry[] = [
  {
    year: "2022 – Present",
    role: "Senior Software Engineer",
    company: "WSO2 / Asgardeo",
    description:
      "Building open source identity infrastructure. Lead contributor to Asgardeo JavaScript SDKs and WSO2 Identity Server frontend.",
  },
  {
    year: "2020 – 2022",
    role: "Software Engineer",
    company: "WSO2",
    description:
      "Developed and maintained enterprise-grade identity and access management solutions used by organizations worldwide.",
  },
  {
    year: "2018 – 2020",
    role: "Associate Software Engineer",
    company: "WSO2",
    description:
      "Started career building React-based management consoles and developer portals for WSO2 API Manager and Identity Server.",
  },
]
