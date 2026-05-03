import type { Metadata } from "next"

import { communityEngagements } from "@/lib/data/community"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { CommunityCard } from "@/components/cards/community-card"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"

export const metadata: Metadata = {
  title: "Community",
  description:
    "Speaking engagements, meetups, conferences, and workshops across the tech community.",
}

export default function CommunityPage() {
  const meetups = communityEngagements.filter((e) => e.type === "meetup")
  const conferences = communityEngagements.filter((e) => e.type === "conference")
  const workshops = communityEngagements.filter((e) => e.type === "workshop")

  return (
    <SectionWrapper>
      <SectionHeading
        label="Community"
        title="Engagements"
        subtitle="Speaking at meetups, conferences, and workshops — sharing what I learn with the broader tech community."
      />

      {meetups.length > 0 && (
        <div className="mb-16">
          <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">
            Meetups
          </h3>
          <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetups.map((engagement) => (
              <StaggerItem key={engagement.id}>
                <CommunityCard engagement={engagement} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      )}

      {conferences.length > 0 && (
        <div className="mb-16">
          <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">
            Conferences
          </h3>
          <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {conferences.map((engagement) => (
              <StaggerItem key={engagement.id}>
                <CommunityCard engagement={engagement} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      )}

      {workshops.length > 0 && (
        <div>
          <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">
            Workshops
          </h3>
          <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops.map((engagement) => (
              <StaggerItem key={engagement.id}>
                <CommunityCard engagement={engagement} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      )}
    </SectionWrapper>
  )
}
