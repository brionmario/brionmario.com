import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { SiGithub, SiX, SiMedium, SiResearchgate } from "@icons-pack/react-simple-icons"

import {
  bio,
  currently,
  education,
  experience,
  honors,
  visitedCountries,
  travelStats,
} from "@/lib/data/about"
import { socialLinks } from "@/lib/data/socials"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { CurrentlySection } from "@/components/about/currently-section"
import { ExperienceTimeline } from "@/components/about/experience-timeline"
import { EducationSection } from "@/components/about/education-section"
import { HonorsSection } from "@/components/about/honors-section"
import { TravelSection } from "@/components/about/travel-section"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"

const SOCIAL_CONFIG: Record<string, {
  icon: React.ReactNode
  handle: string
  hoverCard: string
  hoverIcon: string
  hoverGlow: string
}> = {
  github: {
    icon: <SiGithub color="currentColor" className="size-8" />,
    handle: "@brionmario",
    hoverCard: "hover:border-zinc-500/50 hover:bg-zinc-900/6 dark:hover:border-zinc-400/50 dark:hover:bg-zinc-100/6",
    hoverIcon: "group-hover:text-zinc-800 dark:group-hover:text-zinc-200",
    hoverGlow: "hover:shadow-zinc-900/12 dark:hover:shadow-zinc-100/12",
  },
  linkedin: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-8" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    handle: "in/brionmario",
    hoverCard: "hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/6",
    hoverIcon: "group-hover:text-[#0A66C2]",
    hoverGlow: "hover:shadow-[#0A66C2]/15",
  },
  x: {
    icon: <SiX color="currentColor" className="size-8" />,
    handle: "@brion_mario",
    hoverCard: "hover:border-zinc-500/50 hover:bg-zinc-900/6 dark:hover:border-zinc-400/50 dark:hover:bg-zinc-100/6",
    hoverIcon: "group-hover:text-zinc-900 dark:group-hover:text-zinc-100",
    hoverGlow: "hover:shadow-zinc-900/12 dark:hover:shadow-zinc-100/12",
  },
  medium: {
    icon: <SiMedium color="currentColor" className="size-8" />,
    handle: "@brionmario",
    hoverCard: "hover:border-zinc-500/50 hover:bg-zinc-900/6 dark:hover:border-zinc-400/50 dark:hover:bg-zinc-100/6",
    hoverIcon: "group-hover:text-zinc-900 dark:group-hover:text-zinc-100",
    hoverGlow: "hover:shadow-zinc-900/12 dark:hover:shadow-zinc-100/12",
  },
  researchgate: {
    icon: <SiResearchgate color="currentColor" className="size-8" />,
    handle: "Brion Mario",
    hoverCard: "hover:border-[#00CCBB]/50 hover:bg-[#00CCBB]/6",
    hoverIcon: "group-hover:text-[#00CCBB]",
    hoverGlow: "hover:shadow-[#00CCBB]/15",
  },
}

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
        {/* Headshot + bio */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: transparent headshot */}
          <FadeInWhenVisible direction="right">
            <div className="relative flex justify-center lg:justify-start">
              {/* Soft glow blob behind the image */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
              <div
                className="relative h-105 w-full sm:h-125 lg:h-135 dark:mix-blend-lighten"
                style={{
                  maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                }}
              >
                <Image
                  src="/assets/images/people/brion-headshot-transparent-001.png"
                  alt="Brion Mario"
                  fill
                  priority
                  className="object-contain object-bottom"
                  sizes="(max-width: 1024px) 90vw, 500px"
                />
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right: bio */}
          <FadeInWhenVisible direction="left" delay={0.1}>
            <div className="flex flex-col gap-6">
              <div>
                <SectionHeading
                  label="About me"
                  title="Brion Mario"
                  className="mb-0"
                />
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  Technical Lead · Open Source · Full-stack
                </p>
              </div>
              <div className="space-y-4">
                {bio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Socials — full-width row below */}
        <FadeInWhenVisible delay={0.15}>
          <div className="mt-14 border-t border-border/40 pt-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Find me on
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {socialLinks.filter((s) => s.show).map((link) => {
                const cfg = SOCIAL_CONFIG[link.key]
                return (
                  <a
                    key={link.key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card px-5 py-7 text-center transition-all duration-300 hover:shadow-xl",
                      cfg?.hoverCard,
                      cfg?.hoverGlow,
                    )}
                  >
                    {/* Subtle top-edge highlight */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

                    {/* Arrow chip — top right */}
                    <ArrowUpRight className="absolute right-3.5 top-3.5 size-3.5 text-muted-foreground/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground/60" />

                    {/* Icon — no background, tints to brand color on hover */}
                    <span
                      className={cn(
                        "flex size-14 items-center justify-center text-muted-foreground/50 transition-all duration-300 group-hover:scale-110",
                        cfg?.hoverIcon
                      )}
                    >
                      {cfg?.icon}
                    </span>

                    {/* Platform name + handle */}
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-bold leading-snug text-foreground">
                        {link.label}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {cfg?.handle}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </FadeInWhenVisible>
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
          <ExperienceTimeline experience={experience} />
        </SectionWrapper>
      </div>

      {/* Education */}
      <EducationSection entries={education} />

      {/* Honors & Awards */}
      <HonorsSection honors={honors} />
    </>
  )
}
