"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@workspace/ui/lib/utils"
import type { ExperienceEntry } from "@/lib/data/about"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

const cardVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

interface ExperienceTimelineProps {
  experience: ExperienceEntry[]
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <motion.div
      className="relative"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Spine */}
      <div
        className="absolute left-6 top-6 w-0.5 bg-linear-to-b from-primary via-primary/20 to-transparent"
        style={{ bottom: "3rem" }}
      />

      <div className="space-y-8">
        {experience.map((entry, idx) => (
          <motion.div key={entry.id} variants={cardVariant} className="relative flex gap-7">
            {/* Logo node */}
            <div
              className={cn(
                "relative z-10 size-12 shrink-0 overflow-hidden rounded-full bg-background",
                idx === 0
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg shadow-primary/25"
                  : "ring-1 ring-border"
              )}
            >
              <Image
                src={entry.logoUrl}
                alt={`${entry.company} logo`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            {/* Card */}
            <motion.div
              className={cn(
                "flex-1 overflow-hidden rounded-2xl border transition-colors",
                idx === 0 ? "border-primary/25" : "border-border/70"
              )}
              whileHover={{ y: -3, boxShadow: "0 12px 40px -8px rgba(0,0,0,0.22)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* Card header */}
              <div
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4",
                  idx === 0
                    ? "border-primary/15 bg-linear-to-r from-primary/10 via-primary/5 to-transparent"
                    : "border-border/50 bg-muted/25"
                )}
              >
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  {entry.company}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {entry.location}
                </div>
              </div>

              {/* Roles */}
              <div className="divide-y divide-border/30">
                {entry.roles.map((role, rIdx) => (
                  <div
                    key={role.title}
                    className={cn(
                      "flex items-center justify-between gap-4 py-3.5 pl-5 pr-6 transition-colors",
                      role.isCurrent
                        ? "bg-emerald-500/5 dark:bg-emerald-500/8"
                        : rIdx > 0 && "opacity-80 hover:opacity-100"
                    )}
                  >
                    {/* Left accent bar + role info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={cn(
                          "w-0.5 shrink-0 self-stretch rounded-full",
                          role.isCurrent ? "bg-emerald-500" : "bg-border"
                        )}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "text-sm font-semibold leading-snug",
                              role.isCurrent ? "text-foreground" : "text-foreground/80"
                            )}
                          >
                            {role.title}
                          </span>
                          {role.isCurrent && (
                            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5">
                              <span className="relative flex size-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                Now
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium tabular-nums",
                        role.isCurrent
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {role.period}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
