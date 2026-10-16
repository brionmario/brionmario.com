export interface ExternalArticle {
  date: string
  title: string
  source: string
  url: string
}

/** Long-form pieces published on someone else's site. */
export const externalArticles: ExternalArticle[] = [
  {
    date: "Feb 2024",
    title: "Simplify Application Login Flows with Asgardeo's New Visual Editor",
    source: "WSO2",
    url: "https://wso2.com/library/blogs/simplify-application-login-flows-with-asgardeos-new-visual-editor/",
  },
  {
    date: "Jul 2022",
    title: "Introducing Asgardeo's New Organization Branding Feature",
    source: "WSO2",
    url: "https://wso2.com/blogs/thesource/introducing-asgardeos-new-organization-branding-feature/",
  },
]
