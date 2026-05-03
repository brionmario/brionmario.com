import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface LocalBlogPost {
  slug: string
  title: string
  date: string
  description: string
  bannerImage?: string
  tags: string[]
  readingTime?: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), "content/blog")

function getBlogDir(): string[] {
  try {
    return fs.readdirSync(BLOG_DIR).filter((name) =>
      fs.statSync(path.join(BLOG_DIR, name)).isDirectory()
    )
  } catch {
    return []
  }
}

export function getBlogPost(slug: string): LocalBlogPost | null {
  const filePath = path.join(BLOG_DIR, slug, "index.md")
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    bannerImage: data.bannerImage ?? data.ogImage ?? undefined,
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: data.readingTime ?? undefined,
    content,
  }
}

export function getAllBlogPosts(): LocalBlogPost[] {
  return getBlogDir()
    .map(getBlogPost)
    .filter((p): p is LocalBlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllBlogSlugs(): string[] {
  return getBlogDir()
}
