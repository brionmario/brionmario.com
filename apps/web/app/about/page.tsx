import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
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
  iconBg: string
  hoverBorder: string
  hoverGlow: string
}> = {
  github: {
    icon: <GithubIcon className="size-6" />,
    handle: "@brionmario",
    iconBg: "bg-foreground text-background",
    hoverBorder: "hover:border-zinc-400/60 dark:hover:border-zinc-500/60",
    hoverGlow: "hover:shadow-zinc-900/10 dark:hover:shadow-zinc-100/10",
  },
  linkedin: {
    icon: <LinkedinIcon className="size-6" />,
    handle: "in/brionmario",
    iconBg: "bg-[#0077B5] text-white",
    hoverBorder: "hover:border-blue-400/50",
    hoverGlow: "hover:shadow-blue-500/15",
  },
  x: {
    icon: <XTwitterIcon className="size-6" />,
    handle: "@brion_mario",
    iconBg: "bg-foreground text-background",
    hoverBorder: "hover:border-zinc-400/60 dark:hover:border-zinc-500/60",
    hoverGlow: "hover:shadow-zinc-900/10 dark:hover:shadow-zinc-100/10",
  },
  medium: {
    icon: <MediumIcon className="size-6" />,
    handle: "@brionmario",
    iconBg: "bg-foreground text-background",
    hoverBorder: "hover:border-zinc-400/60 dark:hover:border-zinc-500/60",
    hoverGlow: "hover:shadow-zinc-900/10 dark:hover:shadow-zinc-100/10",
  },
  researchgate: {
    icon: <span className="text-[11px] font-black leading-none">RG</span>,
    handle: "Brion Mario",
    iconBg: "bg-teal-500 text-white",
    hoverBorder: "hover:border-teal-400/50",
    hoverGlow: "hover:shadow-teal-500/15",
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
                className="relative h-105 w-full sm:h-125 lg:h-135"
                style={{
                  maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                  mixBlendMode: "lighten",
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
                      cfg?.hoverBorder,
                      cfg?.hoverGlow,
                    )}
                  >
                    {/* Subtle top-edge highlight */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

                    {/* Arrow chip — top right */}
                    <ArrowUpRight className="absolute right-3.5 top-3.5 size-3.5 text-muted-foreground/25 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground/60" />

                    {/* Brand icon badge */}
                    <span
                      className={cn(
                        "flex size-14 items-center justify-center rounded-2xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                        cfg?.iconBg ?? "bg-muted text-foreground"
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
