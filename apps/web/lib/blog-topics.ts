import type { LocalBlogPost } from "./blog-local"

/**
 * The design groups writing into five topics. The posts carry free-form Medium
 * tags, so each post is bucketed by the first rule that matches its tags,
 * title or slug — order matters, most specific first.
 */
export const TOPICS = ["Identity", "Frontend", "Tooling", "Design systems", "Craft"] as const

export type Topic = (typeof TOPICS)[number]

export const ALL_TOPICS = ["All", ...TOPICS] as const

const RULES: Array<{ topic: Topic; match: RegExp }> = [
  { topic: "Design systems", match: /design-system|branding|design system|ui-library|storybook/ },
  {
    topic: "Identity",
    match:
      /asgardeo|idaas|ciam|identity|oauth|oidc|saml|auth|login|security|cors|user-portal|wso2|dapp|blockchain/,
  },
  {
    topic: "Tooling",
    match:
      /eslint|stylelint|lint|husky|commit|pnpm|changesets|monorepo|testing|jest|cypress|babel|tooling|ci|gatsby-config/,
  },
  {
    topic: "Frontend",
    match:
      /react|typescript|javascript|gatsby|next|frontend|front-end|jsx|css|web-development|architecture/,
  },
  { topic: "Craft", match: /portfolio|wordpress|career|journey|blog|writing|personal/ },
]

export function topicFor(post: Pick<LocalBlogPost, "slug" | "title" | "tags">): Topic {
  const haystack = [post.slug, post.title, ...post.tags].join(" ").toLowerCase()

  for (const rule of RULES) {
    if (rule.match.test(haystack)) return rule.topic
  }

  return "Craft"
}

export interface TopicPost extends LocalBlogPost {
  topic: Topic
  /** "Jul 6" — the short form used in the index gutters. */
  day: string
  year: string
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function withTopic(post: LocalBlogPost): TopicPost {
  const date = new Date(post.date)
  const valid = !Number.isNaN(date.getTime())

  return {
    ...post,
    topic: topicFor(post),
    day: valid ? `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}` : "",
    year: valid ? String(date.getUTCFullYear()) : "",
  }
}
