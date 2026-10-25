import type { ReactNode } from "react"

import { PageHeader } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"

export interface LegalSection {
  /** Heading shown beside the auto-numbered counter. */
  heading: string
  /** Paragraphs of prose. */
  body?: string[]
  /** Optional bulleted list rendered after the prose. */
  bullets?: string[]
}

interface LegalDocumentProps {
  eyebrow: string
  title: string
  lede: string
  /** Human-readable date, e.g. "22 October 2026". */
  updated: string
  sections: LegalSection[]
  /** Closing note rendered under the last section. */
  footnote?: ReactNode
}

/**
 * The shared frame for the Privacy Policy and Terms of Service.
 *
 * The two documents differ only in their prose, so they share one layout: the
 * oversized page title the other index pages use, then numbered sections on
 * hairline rules, set at a narrower measure than the rest of the site so long
 * legal copy stays readable.
 */
export function LegalDocument({
  eyebrow,
  title,
  lede,
  updated,
  sections,
  footnote,
}: LegalDocumentProps) {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-16 pb-12 sm:px-7 sm:pt-[72px]">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          aside={`Last updated / ${updated}`}
        />
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-28 sm:px-7">
        <div className="max-w-[760px]">
          {sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 45}>
              <article className="grid gap-4 py-9">
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="m-0 text-[clamp(1.15rem,2.4vw,1.5rem)] leading-[1.2] font-extrabold tracking-[-0.025em] text-pretty">
                    {section.heading}
                  </h2>
                </div>

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="m-0 text-[15px] leading-[1.75] text-pretty text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="m-0 grid list-none gap-2.5 p-0">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[14px_minmax(0,1fr)] gap-3 text-[15px] leading-[1.75] text-pretty text-muted-foreground"
                      >
                        <span aria-hidden className="text-primary">
                          —
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}

          {footnote && (
            <p className="m-0 pt-9 text-[15px] leading-[1.75] text-pretty text-muted-foreground">
              {footnote}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
