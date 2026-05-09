import type { Metadata } from "next"
import Image from "next/image"
import {
  GithubIcon,
  LinkedinIcon,
  MediumIcon,
  XTwitterIcon,
} from "@/components/icons/social-icons"

import {
  bio,
  currently,
  education,
  experience,
  honors,
  visitedCountries,
  travelStats,
} from "@/lib/data/about"
import { socials } from "@/lib/data/socials"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { CurrentlySection } from "@/components/about/currently-section"
import { ExperienceTimeline } from "@/components/about/experience-timeline"
import { EducationSection } from "@/components/about/education-section"
import { HonorsSection } from "@/components/about/honors-section"
import { TravelSection } from "@/components/about/travel-section"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"

export const metadata: Metadata = {
  title: "About",
  description:
    "Fullstack Engineer with 6+ years of experience building scalable, secure software solutions.",
}

export default function AboutPage() {
  return (
    <>
      {/* Profile */}
      <SectionWrapper>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInWhenVisible direction="right">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-2xl" />
                <div className="relative size-72 overflow-hidden rounded-[2rem] border border-primary/20 bg-muted ring-2 ring-primary/10 sm:size-80">
                  <Image
                    src="https://avatars.githubusercontent.com/brionmario?v=4&s=400"
                    alt="Brion Mario"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 288px, 320px"
                  />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="left" delay={0.1}>
            <div className="flex flex-col gap-6">
              <SectionHeading
                label="About me"
                title="Brion Mario"
                className="mb-0"
              />

              <div className="space-y-4">
                {bio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <GithubIcon />
                  GitHub
                </a>
                <a
                  href={socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <XTwitterIcon />
                  X / Twitter
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>
                <a
                  href={socials.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <MediumIcon />
                  Medium
                </a>
                <a
                  href={socials.researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <span className="text-xs font-bold">RG</span>
                  ResearchGate
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </SectionWrapper>

      {/* Currently */}
      <CurrentlySection items={currently} />

      {/* Travel */}
      <TravelSection countries={visitedCountries} tagline={travelStats.tagline} />

      {/* Experience */}
      <div className="border-t border-border/50">
        <SectionWrapper>
          <FadeInWhenVisible>
            <SectionHeading label="Experience" title="Career Timeline" />
          </FadeInWhenVisible>
          <div className="max-w-2xl">
            <ExperienceTimeline experience={experience} />
          </div>
        </SectionWrapper>
      </div>

      {/* Education */}
      <EducationSection entries={education} />

      {/* Honors & Awards */}
      <HonorsSection honors={honors} />
    </>
  )
}
