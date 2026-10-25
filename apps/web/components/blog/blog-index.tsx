"use client"

import { ArrowRight, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { CompactRow } from "@/components/cards/index-row"
import { LiftCard } from "@/components/cards/lift-card"
import { Reveal } from "@/components/motion/reveal"
import { MetaChip, MetaItem, MetaRow } from "@/components/ui/meta-row"
import { ALL_TOPICS, type TopicPost } from "@/lib/blog-topics"

interface BlogIndexProps {
  posts: TopicPost[]
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const [topic, setTopic] = useState<string>("All")

  const shown = useMemo(
    () =>
      topic === "All" ? posts : posts.filter((post) => post.topic === topic),
    [posts, topic]
  )

  const featured = shown[0]
  // Everything after the featured post, grouped by year.
  const years = useMemo(() => {
    const groups: Array<{ year: string; posts: TopicPost[] }> = []

    for (const post of shown.slice(1)) {
      let group = groups.find((candidate) => candidate.year === post.year)
      if (!group) {
        group = { year: post.year, posts: [] }
        groups.push(group)
      }
      group.posts.push(post)
    }

    return groups
  }, [shown])

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 sm:px-7">
        <div className="flex flex-wrap gap-2 pt-9 pb-7">
          {ALL_TOPICS.map((name) => {
            const active = name === topic

            return (
              <button
                key={name}
                type="button"
                onClick={() => setTopic(name)}
                aria-pressed={active}
                className={cn(
                  "eyebrow border px-4 py-2.5 transition-colors duration-200",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border-strong text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {name}
              </button>
            )
          })}
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-[1240px] px-6 pt-11 sm:px-7">
          <Reveal>
            <LiftCard href={`/blog/${featured.slug}`} lift="lg">
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                <div className="flex flex-col justify-between gap-8 px-8 py-10 sm:px-10 sm:py-11">
                  <div>
                    <MetaRow className="mb-5">
                      <MetaChip>{topic === "All" ? "Latest" : topic}</MetaChip>
                    </MetaRow>
                    <h2 className="headline m-0 text-[clamp(1.9rem,4.4vw,3.4rem)] tracking-[-0.035em] text-balance">
                      {featured.title}
                    </h2>
                    <p className="mt-5 max-w-[560px] text-base leading-[1.65] text-pretty text-muted-foreground">
                      {featured.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
                    <MetaRow>
                      <MetaItem icon={Calendar}>{featured.day}</MetaItem>
                      {featured.readingTime && (
                        <MetaItem icon={Clock}>{featured.readingTime}</MetaItem>
                      )}
                    </MetaRow>
                    <span className="eyebrow inline-flex items-center gap-2 text-primary">
                      Read post
                      <ArrowRight className="size-4 shrink-0" aria-hidden />
                    </span>
                  </div>
                </div>
                <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden md:min-h-[280px]">
                  {featured.bannerImage ? (
                    <Image
                      src={featured.bannerImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    /* Posts without a banner keep the brush word-mark panel. */
                    <span className="brush p-6 text-center text-[clamp(4rem,9vw,7rem)] leading-[0.95] text-primary opacity-90">
                      {topic === "All" ? "New" : topic}
                    </span>
                  )}
                </div>
              </div>
            </LiftCard>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-[1240px] px-6 pt-16 pb-28 sm:px-7">
        {years.map((group) => (
          <div
            key={group.year}
            className="grid grid-cols-1 gap-x-7 pt-6 md:grid-cols-[170px_minmax(0,1fr)]"
          >
            <div className="self-start pb-6 md:sticky md:top-24 md:pb-10">
              <span
                aria-hidden
                className="block text-[clamp(2.4rem,5vw,4rem)] leading-none font-black tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--border-strong)]"
              >
                {group.year}
              </span>
              <p className="eyebrow mt-1.5 text-faint">
                {group.posts.length}{" "}
                {group.posts.length === 1 ? "post" : "posts"}
              </p>
            </div>
            <div>
              {group.posts.map((post) => (
                <CompactRow
                  key={post.slug}
                  lead={post.day}
                  title={post.title}
                  trail={post.topic}
                  href={`/blog/${post.slug}`}
                />
              ))}
            </div>
          </div>
        ))}

        {shown.length === 0 && (
          <p className="eyebrow py-16 text-center text-muted-foreground">
            Nothing filed under {topic} yet.
          </p>
        )}
      </section>
    </>
  )
}
