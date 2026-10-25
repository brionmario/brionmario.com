import { ArrowRight, Calendar, MapPin } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { publications } from "@/lib/data/publications"
import { PageHeader } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { MetaChip, MetaItem, MetaRow } from "@/components/ui/meta-row"

export const metadata: Metadata = {
  title: "Research",
  description: "Peer-reviewed research in XR and IoT medical systems.",
}

export default function ResearchPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-16 pb-12 sm:px-7 sm:pt-[72px]">
        <PageHeader eyebrow="Index / Peer reviewed" title="Research" />
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-28 sm:px-7">
        {publications.map((publication, index) => (
          <Reveal key={publication.id} delay={index * 55}>
            <Link
              href={`/research/${publication.id}`}
              className="grid gap-[18px] py-10 transition-colors hover:text-foreground"
            >
              <MetaRow>
                <MetaChip>{publication.publisher}</MetaChip>
                <MetaItem icon={Calendar}>{publication.year}</MetaItem>
                {publication.location && (
                  <MetaItem icon={MapPin}>{publication.location}</MetaItem>
                )}
              </MetaRow>
              <h2 className="m-0 max-w-[960px] text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.12] font-extrabold tracking-[-0.03em] text-pretty">
                {publication.title}
              </h2>
              <p className="m-0 max-w-[760px] text-[15px] leading-[1.7] text-pretty text-muted-foreground">
                {publication.abstract}
              </p>
              <span className="eyebrow inline-flex items-center gap-2">
                Open the paper
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  )
}
