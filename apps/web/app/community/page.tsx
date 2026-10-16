import type { Metadata } from "next"
import Link from "next/link"

import {
  communityEngagements,
  engagementGroups,
  featuredEngagement,
  thumbnailUrl,
  type CommunityEngagement,
} from "@/lib/data/community"
import { LiftCard } from "@/components/cards/lift-card"
import { TalkPlayer } from "@/components/community/talk-player"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Community",
  description:
    "Talks, workshops and judging panels — mostly on identity, security and frontend engineering.",
}

/**
 * Card cover: an explicit photo if the engagement has one, otherwise the talk's
 * video still. Engagements with neither simply render without a cover.
 */
function cover(engagement: CommunityEngagement): string | null {
  return engagement.image ?? thumbnailUrl(engagement)
}

export default function CommunityPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="headline m-0 text-[clamp(3rem,11vw,8rem)] leading-[0.84] tracking-[-0.05em]">
            On stage
          </h1>
          <p className="eyebrow max-w-[340px] tracking-[0.2em] text-muted-foreground">
            {communityEngagements.length} talks, workshops and panels across
            four countries
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pt-10 sm:px-7">
        <Reveal>
          <div className="grid grid-cols-1 border border-border md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="relative aspect-video bg-black">
              <TalkPlayer engagement={featuredEngagement} />
            </div>
            <div className="flex flex-col justify-between gap-7 p-9">
              <div>
                <p className="eyebrow mb-4 tracking-[0.26em] text-primary">
                  Featured talk
                </p>
                <h2 className="headline m-0 text-[clamp(1.6rem,3.4vw,2.6rem)] tracking-[-0.035em] text-pretty">
                  {featuredEngagement.talk}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.65] text-pretty text-muted-foreground">
                  {featuredEngagement.description}
                </p>
              </div>
              <div className="eyebrow flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
                <span>
                  {featuredEngagement.event} · {featuredEngagement.location}
                </span>
                <Link
                  href={`/community/${featuredEngagement.id}`}
                  className="text-foreground transition-colors hover:text-primary"
                >
                  Event details →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pt-16 pb-28 sm:px-7">
        {engagementGroups.map((group) => (
          <div key={group.label} className="pb-11">
            <div className="mb-6 flex items-baseline gap-4 border-b border-border pb-3">
              <h2 className="eyebrow m-0 text-muted-foreground">
                {group.label}
              </h2>
              <span className="eyebrow-sm text-faint">
                {group.items.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((engagement, index) => (
                <Reveal key={engagement.id} delay={Math.min(index, 6) * 55}>
                  <LiftCard
                    href={`/community/${engagement.id}`}
                    className="h-full"
                  >
                    {/* Column wrapper so the body grows into what the cover
                        leaves over. Without it the body's h-full resolves to
                        the full card height and the card overflows by exactly
                        the cover's height. */}
                    <div className="flex h-full flex-col">
                      {cover(engagement) && (
                        <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cover(engagement)!}
                            alt=""
                            loading="lazy"
                            className="size-full object-cover contrast-[1.05] grayscale"
                          />
                        </div>
                      )}
                      <div className="flex min-h-[280px] flex-1 flex-col justify-between gap-5 p-6">
                        <div className="eyebrow flex items-start justify-between gap-4 border-b border-dashed border-border pb-3.5 tracking-[0.18em]">
                          <span>{engagement.type}</span>
                          <span className="normal-case">
                            {engagement.monthYear}
                          </span>
                        </div>
                        <div>
                          <h3 className="headline m-0 text-2xl text-pretty">
                            {engagement.talk}
                          </h3>
                          <p className="mt-3 text-sm leading-[1.6] text-pretty text-muted-foreground">
                            {engagement.description}
                          </p>
                        </div>
                        <div className="eyebrow-sm flex items-center justify-between gap-3 text-muted-foreground">
                          <span>
                            {engagement.event} · {engagement.location}
                          </span>
                          <span aria-hidden className="text-primary">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </LiftCard>
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-5 border border-border p-7">
          <div>
            <p className="eyebrow-sm mb-2 text-primary">Organiser</p>
            <h3 className="headline m-0 text-[26px]">JavaScript Colombo</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">
              Running the community meetup for JavaScript engineers in Colombo.
            </p>
          </div>
          <a
            href="https://www.javascriptcolombo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow border border-border-strong px-6 py-3.5 tracking-[0.16em] transition-colors hover:border-primary hover:text-foreground"
          >
            javascriptcolombo.com ↗
          </a>
        </div>
      </section>
    </>
  )
}
