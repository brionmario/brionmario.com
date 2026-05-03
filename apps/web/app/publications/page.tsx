import type { Metadata } from "next"

import { publications } from "@/lib/data/publications"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { SectionHeading } from "@/components/layout/section-heading"
import { PublicationCard } from "@/components/cards/publication-card"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"
import { FadeInWhenVisible } from "@/components/animations/fade-in-when-visible"

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Peer-reviewed research on cybersickness in XR applications and IoT medical wearables.",
}

export default function PublicationsPage() {
  return (
    <SectionWrapper>
      <SectionHeading
        label="Research"
        title="Publications"
        subtitle="Peer-reviewed research in extended reality and IoT medical systems."
      />

      <FadeInWhenVisible>
        <div className="mb-12 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            My research spans two domains: the human experience in emerging XR
            technologies and the application of IoT in critical healthcare
            scenarios. Both papers explore how technology can improve human
            outcomes — one through better UX in virtual environments, the other
            through connected medical monitoring.
          </p>
        </div>
      </FadeInWhenVisible>

      <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {publications.map((pub) => (
          <StaggerItem key={pub.id}>
            <PublicationCard publication={pub} className="h-full" />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  )
}
