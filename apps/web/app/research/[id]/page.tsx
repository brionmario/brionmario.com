import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { publications } from "@/lib/data/publications"
import { CompactRow } from "@/components/cards/index-row"
import { CitationBlock } from "@/components/research/citation-block"

interface Props {
  params: Promise<{ id: string }>
}

/** Shown wherever the PDF can't be displayed inline. */
function PdfLinkCard({ href }: { href: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-background px-8 py-14 text-center">
      <p className="eyebrow m-0 tracking-[0.2em] text-faint">Full text</p>
      <p className="m-0 max-w-[420px] text-[15px] leading-[1.6] text-muted-foreground">
        Open the paper as a PDF — it opens in your device&rsquo;s own reader.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow mt-2 border border-primary px-6 py-3.5 tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Open the PDF ↗
      </a>
    </div>
  )
}

export async function generateStaticParams() {
  return publications.map((publication) => ({ id: publication.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const publication = publications.find((candidate) => candidate.id === id)
  if (!publication) return {}

  return { title: publication.title, description: publication.abstract }
}

export default async function PaperPage({ params }: Props) {
  const { id } = await params
  const publication = publications.find((candidate) => candidate.id === id)
  if (!publication) notFound()

  const others = publications.filter((candidate) => candidate.id !== id)

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-14 sm:px-7">
        <Link
          href="/research"
          className="eyebrow inline-block tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          ← All research
        </Link>
      </section>

      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-11 px-6 pt-9 sm:px-7 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="eyebrow flex flex-wrap gap-x-6 gap-y-2.5 tracking-[0.2em] text-muted-foreground">
            <span className="whitespace-nowrap text-primary">{publication.publisher}</span>
            <span className="whitespace-nowrap">{publication.year}</span>
            {publication.location && (
              <span className="whitespace-nowrap">{publication.location}</span>
            )}
          </div>

          <h1 className="mt-5 text-[clamp(1.9rem,4.4vw,3.4rem)] font-black leading-[1.06] tracking-[-0.035em] text-balance">
            {publication.title}
          </h1>

          <p className="mt-6 text-[15px] leading-[1.7] text-muted-foreground">
            {publication.conference}
          </p>

          <div className="mt-9 border border-border bg-card">
            <div className="eyebrow flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 text-muted-foreground">
              <span>
                Paper · {publication.publisher} {publication.year}
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {publication.pdf && (
                  <a href={publication.pdf} download className="text-foreground hover:text-primary">
                    Download PDF ↓
                  </a>
                )}
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  Read on {publication.publisher} ↗
                </a>
              </div>
            </div>

            {publication.pdf ? (
              <>
                {/*
                 * Inline viewer, desktop only. An <object> only falls back when the
                 * fetch fails — not when the browser lacks a PDF viewer — so mobile
                 * would get a blank box. Below md we skip the embed entirely and
                 * offer the link, which is what those browsers do with a PDF anyway.
                 */}
                <object
                  data={`${publication.pdf}#view=FitH`}
                  type="application/pdf"
                  aria-label={`${publication.title} (PDF)`}
                  className="hidden h-[min(78vh,780px)] w-full bg-background md:block"
                >
                  <PdfLinkCard href={publication.pdf} />
                </object>
                <div className="md:hidden">
                  <PdfLinkCard href={publication.pdf} />
                </div>
              </>
            ) : (
              /* No hosted copy — frame the hand-off to the publisher instead. */
              <div className="flex flex-col items-center justify-center gap-4 bg-background px-10 py-16 text-center">
                <p className="eyebrow m-0 tracking-[0.2em] text-faint">Full text off-site</p>
                <p className="m-0 max-w-[420px] text-[15px] leading-[1.6] text-muted-foreground">
                  This paper is hosted by the publisher. The abstract and citation are here; the
                  complete text opens on {publication.publisher}.
                </p>
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow mt-2 border border-primary px-6 py-3.5 tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Open the paper ↗
                </a>
              </div>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-8 lg:sticky lg:top-24">
          <div>
            <p className="eyebrow-sm mb-3 text-primary">Abstract</p>
            <p className="m-0 text-[15px] leading-[1.75] text-muted-foreground text-pretty">
              {publication.abstract}
            </p>
          </div>

          <div>
            <p className="eyebrow-sm mb-3 text-primary">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {publication.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="eyebrow-sm border border-border-strong px-3 py-1.5 tracking-[0.14em] text-muted-foreground"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow-sm mb-3 text-primary">Cite</p>
            <CitationBlock citation={publication.citation} />
          </div>
        </aside>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-6 pb-28 pt-16 sm:px-7">
          <p className="eyebrow mb-1.5 tracking-[0.26em] text-faint">Other papers</p>
          {others.map((other) => (
            <CompactRow
              key={other.id}
              lead={`${other.publisher} ${other.year}`}
              title={other.title}
              trail="→"
              href={`/research/${other.id}`}
              leadWidth="md"
            />
          ))}
        </section>
      )}
    </>
  )
}
