import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { getAllBlogSlugs, getBlogPost } from "@/lib/blog-local"
import { SectionWrapper } from "@/components/layout/section-wrapper"

interface Props {
  showExtractedBanner?: boolean
  showExtractedTitle?: boolean
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: post.bannerImage ? { images: [post.bannerImage] } : undefined,
  }
}

export default async function BlogPostPage({ params, showExtractedBanner = false, showExtractedTitle = false }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <SectionWrapper as="div" className="max-w-3xl">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back to blog
      </Link>

      {showExtractedBanner && post.bannerImage && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={post.bannerImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
          >
            <Tag className="size-2.5" />
            {tag}
          </span>
        ))}
      </div>

      {showExtractedTitle && (
        <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3.5" />
          {formattedDate}
        </span>
        {post.readingTime && (
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {post.readingTime}
          </span>
        )}
      </div>

      <div className="mt-10 space-y-5 text-base leading-7 text-foreground">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mt-10 mb-4 font-heading text-3xl font-bold tracking-tight text-foreground">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-8 mb-3 font-heading text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-6 mb-2 font-heading text-xl font-semibold text-foreground">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="my-4 text-base leading-7 text-muted-foreground">{children}</p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="my-4 ml-6 list-disc space-y-1 text-muted-foreground">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-4 ml-6 list-decimal space-y-1 text-muted-foreground">{children}</ol>
            ),
            li: ({ children }) => <li className="leading-7">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="my-4 border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes("language-")
              return isBlock ? (
                <code className="block my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono text-foreground">
                  {children}
                </code>
              ) : (
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
                  {children}
                </code>
              )
            },
            pre: ({ children }) => (
              <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm">{children}</pre>
            ),
            img: ({ src, alt }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt ?? ""} className="my-6 w-full rounded-lg" loading="lazy" />
            ),
            hr: () => <hr className="my-8 border-border" />,
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
            table: ({ children }) => (
              <div className="my-6 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="bg-muted px-4 py-2 text-left font-semibold text-foreground">{children}</th>
            ),
            td: ({ children }) => (
              <td className="border-t border-border px-4 py-2 text-muted-foreground">{children}</td>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </SectionWrapper>
  )
}
