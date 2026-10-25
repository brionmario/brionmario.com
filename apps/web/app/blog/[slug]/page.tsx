import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  User,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getAllBlogPosts, getAllBlogSlugs, getBlogPost } from "@/lib/blog-local"
import { withTopic } from "@/lib/blog-topics"
import { CompactRow } from "@/components/cards/index-row"
import { MarkdownBody } from "@/components/blog/markdown-body"
import { MetaChip, MetaItem, MetaRow } from "@/components/ui/meta-row"

interface Props {
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const raw = getBlogPost(slug)
  if (!raw) notFound()

  const post = withTopic(raw)
  const related = getAllBlogPosts()
    .map(withTopic)
    .filter(
      (candidate) =>
        candidate.slug !== post.slug && candidate.topic === post.topic
    )
    .slice(0, 3)

  return (
    <article>
      <section className="mx-auto max-w-[820px] px-6 pt-14 sm:px-7">
        <Link
          href="/blog"
          className="eyebrow inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          All writing
        </Link>

        <MetaRow className="mt-9">
          <MetaChip>{post.topic}</MetaChip>
          <MetaItem icon={Calendar}>
            {post.day}, {post.year}
          </MetaItem>
          <MetaItem icon={User}>Brion Mario</MetaItem>
        </MetaRow>

        <h1 className="mt-5 text-[clamp(2.2rem,5.6vw,4.2rem)] leading-[1.02] font-black tracking-[-0.04em] text-balance">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-6 text-[clamp(1.15rem,2.2vw,1.45rem)] leading-[1.55] text-pretty">
            {post.description}
          </p>
        )}
      </section>

      <div className="mx-auto mt-11 max-w-[820px] px-6 sm:px-7">
        <div className="h-px bg-[linear-gradient(to_right,var(--bm-accent),var(--border))]" />
      </div>

      <section className="mx-auto max-w-[820px] px-6 pt-10 sm:px-7">
        <MarkdownBody>{post.content}</MarkdownBody>

        <div className="eyebrow mt-11 flex flex-wrap items-center justify-between gap-4 pt-6 text-muted-foreground">
          <span>
            {post.topic} · {post.year}
          </span>
          <a
            href="https://medium.com/@brionmario"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
          >
            Read on Medium
            <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[820px] px-6 pt-16 pb-28 sm:px-7">
          <p className="eyebrow mb-4 text-faint">Keep reading</p>
          {related.map((item) => (
            <CompactRow
              key={item.slug}
              lead={item.day}
              title={item.title}
              trail={<ArrowRight className="size-4 shrink-0" aria-hidden />}
              href={`/blog/${item.slug}`}
            />
          ))}
        </section>
      )}
    </article>
  )
}
