import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Users } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { communityEngagements } from "@/lib/data/community"
import { TalkPlayer } from "@/components/community/talk-player"
import { MetaChip, MetaItem, MetaRow } from "@/components/ui/meta-row"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return communityEngagements.map((engagement) => ({ id: engagement.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const engagement = communityEngagements.find(
    (candidate) => candidate.id === id
  )
  if (!engagement) return {}

  return { title: engagement.talk, description: engagement.description }
}

export default async function CommunityDetailPage({ params }: Props) {
  const { id } = await params
  const engagement = communityEngagements.find(
    (candidate) => candidate.id === id
  )
  if (!engagement) notFound()

  const facts = [
    { key: "Format", value: engagement.type },
    { key: "Community", value: engagement.event },
    { key: "Where", value: engagement.location },
    { key: "When", value: engagement.monthYear },
  ]
  // Only worth a second button when it points somewhere the primary link doesn't.
  const showSlides = engagement.slides && engagement.slides !== engagement.url

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-14 sm:px-7">
        <Link
          href="/community"
          className="eyebrow inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          All appearances
        </Link>

        <MetaRow className="mt-9">
          <MetaChip>{engagement.type}</MetaChip>
          <MetaItem icon={Calendar}>{engagement.monthYear}</MetaItem>
          <MetaItem icon={Users}>{engagement.event}</MetaItem>
          <MetaItem icon={MapPin}>{engagement.location}</MetaItem>
        </MetaRow>

        <h1 className="headline mt-5 max-w-[1000px] text-[clamp(2rem,5.2vw,4rem)] text-pretty">
          {engagement.talk}
        </h1>
      </section>

      {engagement.videoId && (
        <section className="mx-auto max-w-[1240px] px-6 pt-10 sm:px-7">
          <div className="relative aspect-video bg-black">
            <TalkPlayer engagement={engagement} />
          </div>
        </section>
      )}

      {engagement.gallery && engagement.gallery.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-6 pt-10 sm:px-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {engagement.gallery.map((photo, i) => {
              // A photo that declares its own aspect is one that cannot be
              // cropped without losing the content, so it gets a full row at
              // exactly that ratio. Everything else falls into the default
              // slots: a 2:1 lead, then 4:3 cells.
              const fullWidth = i === 0 || photo.aspect !== undefined
              return (
                <figure
                  key={photo.url}
                  className={`relative m-0 overflow-hidden ${
                    fullWidth ? "sm:col-span-2" : ""
                  }`}
                  style={{ aspectRatio: photo.aspect ?? (i === 0 ? 2 : 4 / 3) }}
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    sizes={
                      fullWidth
                        ? "(max-width: 640px) 100vw, 1180px"
                        : "(max-width: 640px) 100vw, 580px"
                    }
                    className="object-cover contrast-[1.05] grayscale transition-[filter,transform] duration-500 hover:scale-[1.02] hover:grayscale-0"
                  />
                </figure>
              )
            })}
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-12 px-6 pt-14 sm:px-7 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="m-0 text-[clamp(1.1rem,2.2vw,1.4rem)] leading-[1.6] text-pretty">
            {engagement.description}
          </p>
          {engagement.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-6 text-base leading-[1.8] text-pretty text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="flex flex-col gap-6">
          <dl className="m-0 flex flex-col gap-3">
            {facts.map((fact) => (
              <div
                key={fact.key}
                className="eyebrow flex items-baseline justify-between gap-3.5 py-1"
              >
                <dt className="text-faint">{fact.key}</dt>
                <dd className="m-0 text-right text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={engagement.url}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow flex items-center justify-center gap-2 border border-border-strong px-5 py-3.5 text-center transition-colors hover:border-primary hover:text-foreground"
          >
            {engagement.linkLabel}
            <ArrowUpRight className="size-4 shrink-0" aria-hidden />
          </a>

          {showSlides && (
            <a
              href={engagement.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow flex items-center justify-center gap-2 border border-primary px-5 py-3.5 text-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Grab the slides
              <ArrowUpRight className="size-4 shrink-0" aria-hidden />
            </a>
          )}
        </aside>
      </section>
    </>
  )
}
