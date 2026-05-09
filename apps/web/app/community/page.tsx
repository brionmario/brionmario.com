import type { Metadata } from "next"

import { communityEngagements } from "@/lib/data/community"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { CommunityFeaturedCard } from "@/components/cards/community-featured-card"
import { CommunityAgendaItem } from "@/components/cards/community-agenda-item"

export const metadata: Metadata = {
  title: "Community",
  description:
    "Speaking engagements, meetups, conferences, and workshops across the tech community.",
}

const TYPE_ORDER = ["conference", "meetup", "workshop"] as const
const TYPE_LABELS: Record<string, string> = {
  conference: "Conferences",
  meetup: "Meetups",
  workshop: "Workshops",
}

export default function CommunityPage() {
  const withVideo = communityEngagements.filter((e) => e.videoUrl)
  const featured = withVideo[0] ?? communityEngagements[0]
  const rest = communityEngagements.filter((e) => e.id !== featured?.id)

  const grouped = TYPE_ORDER.reduce<Record<string, typeof rest>>((acc, type) => {
    const items = rest.filter((e) => e.type === type)
    if (items.length > 0) acc[type] = items
    return acc
  }, {})

  return (
    <SectionWrapper>
      <SectionHeading
        label="Community"
        title="Engagements"
        subtitle="Speaking at meetups, conferences, and workshops — sharing what I learn with the broader tech community."
      />

      <div className="flex flex-col gap-10">
        {featured && <CommunityFeaturedCard engagement={featured} />}

        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
              {TYPE_LABELS[type]}
            </h3>
            <div className="divide-y divide-border/60 rounded-xl border border-border/60 bg-card px-6">
              {items.map((engagement) => (
                <CommunityAgendaItem key={engagement.id} engagement={engagement} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
