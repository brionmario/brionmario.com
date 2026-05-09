import type { CurrentlyItem } from "@/lib/data/about"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"

const ACCENT = {
  building: {
    bg: "bg-primary/5",
    border: "border-primary/25",
    label: "bg-primary/10 text-primary",
  },
  reading: {
    bg: "bg-amber-500/5",
    border: "border-amber-500/25",
    label: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  listening: {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/25",
    label: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
} as const

function getAccent(id: string) {
  return id in ACCENT ? ACCENT[id as keyof typeof ACCENT] : ACCENT.building
}

interface CurrentlySectionProps {
  items: CurrentlyItem[]
}

export function CurrentlySection({ items }: CurrentlySectionProps) {
  return (
    <div className="border-t border-border/50">
      <SectionWrapper>
        <FadeInWhenVisible>
          <SectionHeading
            label="Right now"
            title="Currently"
            subtitle="A live snapshot of what's keeping me busy, curious, and entertained."
          />
        </FadeInWhenVisible>

        <StaggerChildren className="grid grid-cols-1 gap-5 sm:grid-cols-3" staggerDelay={0.1}>
          {items.map((item) => {
            const accent = getAccent(item.id)
            return (
              <StaggerItem key={item.id}>
                <div
                  className={`flex h-full flex-col gap-4 rounded-2xl border p-6 ${accent.bg} ${accent.border}`}
                >
                  {/* Category label */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl leading-none">{item.icon}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${accent.label}`}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1">
                    <p className="font-heading text-lg font-bold leading-snug text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  </div>

                  {/* Playful note */}
                  {item.note && (
                    <p className="border-t border-border/40 pt-3 text-xs italic text-muted-foreground">
                      {item.note}
                    </p>
                  )}
                </div>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </SectionWrapper>
    </div>
  )
}
