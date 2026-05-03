export interface Project {
  id: string
  name: string
  org: string
  description: string
  githubUrl: string
  tags: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "thunder",
    name: "Thunder",
    org: "Asgardeo",
    description:
      "A lightweight, high-performance identity server built for modern cloud-native environments. Designed to handle authentication and authorization at scale.",
    githubUrl: "https://github.com/asgardeo/thunder",
    tags: ["Go", "Identity", "Security", "OAuth2", "OIDC"],
    featured: true,
  },
  {
    id: "asgardeo-javascript",
    name: "Asgardeo JavaScript SDK",
    org: "Asgardeo",
    description:
      "Official JavaScript/TypeScript SDK for integrating Asgardeo identity and access management into web applications.",
    githubUrl: "https://github.com/asgardeo/javascript",
    tags: ["TypeScript", "React", "SDK", "Auth", "IAM"],
    featured: true,
  },
  {
    id: "wso2-identity-server",
    name: "WSO2 Identity Server",
    org: "WSO2",
    description:
      "Enterprise-grade open source identity and access management solution. Powers authentication, authorization, and identity federation for millions of users.",
    githubUrl: "https://github.com/wso2/product-is",
    tags: ["Java", "IAM", "Enterprise", "Security", "SAML"],
    featured: true,
  },
]
