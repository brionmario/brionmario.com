import type { Metadata } from "next"
import Link from "next/link"

import { publications } from "@/lib/data/publications"
import { PageHeader } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Research",
  description: "Peer-reviewed research in XR and IoT medical systems.",
}

export default function ResearchPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pb-12 pt-16 sm:px-7 sm:pt-[72px]">
        <PageHeader eyebrow="Index / Peer reviewed" title="Research" />
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-28 sm:px-7">
        {publications.map((publication, index) => (
          <Reveal key={publication.id} delay={index * 55}>
            <Link
              href={`/research/${publication.id}`}
              className="grid gap-[18px] border-t border-border py-10 transition-colors hover:text-foreground"
            >
              <div className="eyebrow flex flex-wrap gap-x-6 gap-y-2.5 tracking-[0.18em] text-muted-foreground">
                <span className="text-primary">{publication.publisher}</span>
                <span>{publication.year}</span>
                {publication.location && <span>{publication.location}</span>}
              </div>
              <h2 className="m-0 max-w-[960px] text-[clamp(1.5rem,3.6vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-pretty">
                {publication.title}
              </h2>
              <p className="m-0 max-w-[760px] text-[15px] leading-[1.7] text-muted-foreground text-pretty">
                {publication.abstract}
              </p>
              <span className="eyebrow tracking-[0.18em]">Open the paper →</span>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  )
}
