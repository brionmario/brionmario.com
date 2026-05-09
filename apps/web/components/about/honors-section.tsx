import type { HonorEntry } from "@/lib/data/about"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"

interface HonorsSectionProps {
  honors: HonorEntry[]
}

export function HonorsSection({ honors }: HonorsSectionProps) {
  const featured = honors.filter((h) => h.featured)
  const rest = honors.filter((h) => !h.featured)

  return (
    <div className="border-t border-border/50">
      <SectionWrapper>
        <FadeInWhenVisible>
          <SectionHeading
            label="Recognition"
            title="Honors & Awards"
            subtitle="A few things I'm proud of — from hackathons to international stages."
          />
        </FadeInWhenVisible>

        <div className="space-y-5">
          {/* Featured award — full width, richer treatment */}
          {featured.map((honor) => (
            <FadeInWhenVisible key={honor.id} direction="up">
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-transparent" />
                <div className="relative flex flex-wrap items-center gap-5">
                  <span className="text-5xl leading-none">{honor.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-lg font-bold text-foreground leading-snug">
                      {honor.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{honor.issuer}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 tabular-nums">
                    {honor.date}
                  </span>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}

          {/* Grid of remaining awards */}
          <StaggerChildren
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            staggerDelay={0.07}
          >
            {rest.map((honor) => (
              <StaggerItem key={honor.id}>
                <div className="flex h-full items-start gap-4 rounded-xl border border-border/70 bg-card p-5 transition-shadow hover:shadow-md">
                  <span className="text-2xl leading-none shrink-0 mt-0.5">{honor.icon}</span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {honor.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">{honor.issuer}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums">
                    {honor.date}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </SectionWrapper>
    </div>
  )
}
