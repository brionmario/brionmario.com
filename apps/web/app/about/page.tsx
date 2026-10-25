import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"

import { experience, honors, visitedCountries } from "@/lib/data/about"
import { instagramAccounts } from "@/lib/data/instagram"
import { Disclosure } from "@/components/about/disclosure"
import { HeroPhotos } from "@/components/about/hero-photos"
import { InstagramGrid } from "@/components/about/instagram-grid"
import { TravelMap } from "@/components/about/travel-map"
import { SectionHeading } from "@/components/layout/section-heading"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "About",
  description:
    "Fullstack engineer, 6+ years, most of it in identity and access management. Based in Colombo, Sri Lanka.",
}

export default function AboutPage() {
  const regions = new Set(visitedCountries.map((country) => country.region))

  return (
    <>
      <section className="relative mx-auto max-w-[1240px] px-6 pt-16 sm:px-7">
        {/* The photo is the backdrop: it runs off the right edge and the text
            sits on top of its dissolved left side. pointer-events-none so the
            paragraph stays selectable through it. */}
        <HeroPhotos className="pointer-events-none absolute inset-y-0 right-[max(-7rem,calc(50%-50vw))] w-[min(94vw,560px)] opacity-45 md:w-[min(62%,720px)] md:opacity-80 md:dark:opacity-100" />

        <p className="relative z-10 m-0 max-w-[600px] pt-[clamp(8rem,20vw,14rem)] pb-10 text-[clamp(1.35rem,3vw,2.1rem)] leading-[1.45] text-pretty md:max-w-[660px] md:pb-16 xl:max-w-[720px]">
          I&rsquo;m a fullstack engineer with{" "}
          <strong className="font-extrabold">6+ years</strong> building
          scalable, high-performant and secure software — most of it in identity
          and access management.
        </p>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pt-10 sm:px-7">
        <div className="max-w-[760px]">
          <Disclosure
            openLabel="Hide the timeline"
            closedLabel="See the timeline"
            lead={
              <>
                Today I lead frontend work at WSO2 on Asgardeo and WSO2 Identity
                Server, where security engineering meets developer experience.
                Before that it was Zone24x7, and before that a couple of very
                different jobs in London.
              </>
            }
          >
            {experience.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-1 gap-x-8 gap-y-2.5 py-7 md:grid-cols-[200px_minmax(0,1fr)]"
              >
                <div>
                  <h3 className="m-0 text-lg font-extrabold tracking-[-0.02em]">
                    {entry.company}
                  </h3>
                  <p className="eyebrow-sm mt-1.5 text-faint">
                    {entry.location}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {entry.roles.map((role) => (
                    <div
                      key={role.title}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
                    >
                      <span className="text-[15px]">{role.title}</span>
                      <span
                        className={`eyebrow-sm ${role.isCurrent ? "text-primary" : "text-faint"}`}
                      >
                        {role.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Disclosure>

          <Disclosure
            openLabel="Hide the list"
            closedLabel="See the list"
            lead={
              <>
                Somewhere along the way I picked up a First Class degree from
                Westminster and a small pile of hackathon and award silverware.
              </>
            }
          >
            {honors.map((honor) => (
              <div
                key={honor.id}
                className="grid grid-cols-1 gap-x-7 gap-y-2 py-6 md:grid-cols-[110px_minmax(0,1fr)]"
              >
                <span className="eyebrow-sm pt-1 text-faint">{honor.date}</span>
                <div>
                  <h3 className="m-0 text-[15px] leading-[1.4] font-semibold text-pretty">
                    {honor.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {honor.issuer}
                  </p>
                </div>
              </div>
            ))}
          </Disclosure>

          <p className="mt-7 text-[17px] leading-[1.75] text-pretty text-muted-foreground">
            Away from the keyboard I&rsquo;m a part-time reel creator &mdash;
            usually behind a camera, eating my way through a city with my wife,
            or planning the next trip.
          </p>
        </div>
      </section>

      <section className="mt-10 px-6 pt-10 pb-0 sm:px-7">
        <div className="mx-auto max-w-[1240px]">
          <SectionHeading index="01" title="Off the clock" />

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {instagramAccounts.map((account) => (
              <Reveal key={account.handle}>
                <div className="group flex h-full flex-col bg-card transition-[box-shadow] duration-200 hover:shadow-[10px_10px_0_var(--bm-accent)]">
                  <div className="p-6">
                    <p className="eyebrow-sm mb-2 text-primary">
                      {account.label}
                    </p>
                    <a
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="headline m-0 inline-block text-[clamp(1.05rem,4.6vw,1.375rem)] break-words no-underline transition-colors hover:text-primary"
                    >
                      {account.handle}
                    </a>
                    <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">
                      {account.note}
                    </p>
                  </div>

                  <div className="px-6">
                    <InstagramGrid
                      posts={account.posts}
                      handle={account.handle}
                    />
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 p-6">
                    <a
                      href={account.archiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow-sm inline-flex items-center gap-1.5 text-faint no-underline transition-colors hover:text-primary"
                    >
                      {account.archiveLabel}
                      <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                    </a>
                    <a
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow-sm inline-flex items-center gap-1.5 text-faint no-underline transition-colors hover:text-primary"
                    >
                      Open on Instagram
                      <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal className="sm:col-span-2">
              <div className="bg-card p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p className="eyebrow-sm mb-2 text-primary">Passport</p>
                    <h3 className="headline m-0 text-2xl">
                      {visitedCountries.length} countries · {regions.size}{" "}
                      regions
                    </h3>
                  </div>
                  <p className="m-0 max-w-[320px] text-sm leading-[1.6] text-muted-foreground sm:text-right">
                    Still counting — the map below is the honest version.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visitedCountries.map((country) => (
                    <div
                      key={country.isoCode}
                      className="eyebrow-sm flex items-baseline justify-between gap-3.5 py-1"
                    >
                      <span className="normal-case">
                        <span className="mr-2 text-[15px]">{country.flag}</span>
                        {country.name}
                      </span>
                      <span className="text-faint">
                        {country.visits.join(" · ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-7">
          <SectionHeading index="02" title="Where I've been" className="mb-8" />
        </div>
        <TravelMap />
      </section>
    </>
  )
}
