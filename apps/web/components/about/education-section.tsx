import { GraduationCap, MapPin } from "lucide-react"

import type { EducationEntry } from "@/lib/data/about"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"

interface EducationSectionProps {
  entries: EducationEntry[]
}

export function EducationSection({ entries }: EducationSectionProps) {
  return (
    <div className="border-t border-border/50">
      <SectionWrapper>
        <FadeInWhenVisible>
          <SectionHeading
            label="Education"
            title="Academic Background"
            subtitle="Where the foundations were built."
          />
        </FadeInWhenVisible>

        <StaggerChildren className="flex flex-col gap-5" staggerDelay={0.1}>
          {entries.map((entry) => {
            const isFeatured = !!entry.honor
            return (
              <StaggerItem key={entry.id}>
                <div
                  className={`relative overflow-hidden rounded-2xl border p-6 transition-shadow hover:shadow-md ${
                    isFeatured
                      ? "border-amber-500/25 bg-amber-500/5"
                      : "border-border/70 bg-card"
                  }`}
                >
                  {isFeatured && (
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-500/8 via-transparent to-transparent" />
                  )}

                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    {/* Left */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${
                          isFeatured
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        <GraduationCap className="size-5" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-heading text-base font-bold leading-snug text-foreground">
                          {entry.institution}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">{entry.degree}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="size-3 shrink-0" />
                          {entry.location}
                        </div>
                      </div>
                    </div>

                    {/* Right — period + honour */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground tabular-nums">
                        {entry.period}
                      </span>
                      {entry.honor && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold tracking-wide text-amber-600 dark:text-amber-400">
                          🏅 {entry.honor}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </SectionWrapper>
    </div>
  )
}
