export interface SocialLink {
  key: string
  label: string
  url: string
  show: boolean
}

export const socialLinks: SocialLink[] = [
  { key: "github",      label: "GitHub",      url: "https://github.com/brionmario",                       show: true },
  { key: "linkedin",    label: "LinkedIn",     url: "https://www.linkedin.com/in/brionmario",              show: true },
  { key: "x",          label: "X / Twitter",  url: "https://x.com/brion_mario",                          show: true },
  { key: "medium",     label: "Medium",       url: "https://medium.com/@brionmario",                      show: true },
  { key: "researchgate", label: "ResearchGate", url: "https://www.researchgate.net/profile/Brion-Mario", show: true },
]

/** Convenience URL lookup — used by components that only need the raw URL */
export const socials = Object.fromEntries(
  socialLinks.map((s) => [s.key, s.url])
) as Record<string, string>

export type SocialKey = (typeof socialLinks)[number]["key"]
