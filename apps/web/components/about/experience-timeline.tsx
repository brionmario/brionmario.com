"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import type { ExperienceEntry } from "@/lib/data/about"

interface ExperienceTimelineProps {
  experience: ExperienceEntry[]
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Gradient vertical spine */}
      <div
        className="absolute left-5 top-5 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent"
        style={{ bottom: "2rem" }}
      />

      <div className="space-y-10">
        {experience.map((entry, entryIndex) => (
          <div key={entry.id} className="relative flex gap-6">
            {/* Node — company logo in a ring */}
            <div
              className={cn(
                "relative z-10 size-10 shrink-0 overflow-hidden rounded-full border-2 bg-background shadow-sm",
                entryIndex === 0 ? "border-primary" : "border-border"
              )}
            >
              <Image
                src={entry.logoUrl}
                alt={`${entry.company} logo`}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>

            {/* Card */}
            <div
              className={cn(
                "flex-1 rounded-xl border bg-card p-5 transition-shadow hover:shadow-md",
                entryIndex === 0 ? "border-primary/30" : "border-border"
              )}
            >
              {/* Company header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="font-heading text-base font-bold text-foreground">
                  {entry.company}
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                  <MapPin className="size-3 shrink-0" />
                  {entry.location}
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-2.5">
                {entry.roles.map((role, roleIndex) => (
                  <div
                    key={role.title}
                    className={cn(
                      "flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5",
                      roleIndex < entry.roles.length - 1 &&
                        "pb-2.5 border-b border-dashed border-border/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {role.isCurrent ? (
                        <span className="relative flex size-2 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                        </span>
                      ) : (
                        <span className="size-2 shrink-0 rounded-full bg-muted-foreground/30" />
                      )}
                      <span className="text-sm font-medium text-foreground">
                        {role.title}
                      </span>
                      {role.isCurrent && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Now
                        </span>
                      )}
                    </div>
                    <span className="ml-4 text-[11px] font-medium text-muted-foreground tabular-nums shrink-0">
                      {role.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
