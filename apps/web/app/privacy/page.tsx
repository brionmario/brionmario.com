import type { Metadata } from "next"
import Link from "next/link"

import {
  LegalDocument,
  type LegalSection,
} from "@/components/layout/legal-document"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What brionmario.com collects, what it doesn't, and the third parties involved in serving the site.",
}

const EMAIL = "brionbmp@gmail.com"

const sections: LegalSection[] = [
  {
    heading: "The short version",
    body: [
      "This is a personal website. It has no accounts, no sign-up, no newsletter, no comment box and no advertising. It does not run analytics, tracking pixels or fingerprinting scripts, and it does not sell or share anything about you, because there is nothing to sell or share.",
      "The only data that exists is what any web server unavoidably sees when it hands you a page, plus one preference your own browser remembers for you.",
    ],
  },
  {
    heading: "What the site stores on your device",
    body: [
      "The light/dark theme switch saves your choice in your browser's local storage so the site opens the way you left it. That value never leaves your device and is not readable by me. Clearing your browser's site data for brionmario.com removes it.",
      "No cookies are set for tracking or measurement. Embedded third-party players may set their own storage once you choose to play them — see below.",
    ],
  },
  {
    heading: "What the hosting provider sees",
    body: [
      "The site is served by a hosting provider and a content delivery network. Like every web host, they process the technical request data needed to deliver a page and to keep the service secure and available:",
    ],
    bullets: [
      "IP address and approximate region derived from it",
      "The page requested, the referring page and the timestamp",
      "Browser and operating system as reported in the user-agent string",
    ],
  },
  {
    heading: "Third-party embeds",
    body: [
      "A few pages embed media that loads from other companies: Instagram reels on the About page, video players on the Community page, and images from Medium's CDN and GitHub's avatar service on the blog.",
      "Where a video is involved, the thumbnail is shown first and nothing loads from the provider until you press play. Once you do, that provider receives your request and applies its own privacy policy and storage, which I neither control nor receive data from.",
    ],
  },
  {
    heading: "Email",
    body: [
      "If you email me using the address in the footer, I receive your message and whatever you put in it, held in my mail provider's inbox. I use it to reply to you and nothing else. I don't add you to any list, because there isn't one.",
    ],
  },
  {
    heading: "Children",
    body: [
      "The site is not directed at children and knowingly collects nothing from anyone, of any age.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to ask what personal data is held about you, to have it corrected or erased, or to object to its processing. Since I hold no database of visitors, in practice the answer is usually that there is nothing to retrieve — but you are welcome to ask, and anything in my inbox I can delete on request.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If the site gains anything that changes this picture — analytics, a contact form, a comment system — this page will be updated before or at the same time, and the date above will change with it.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal / Privacy"
      title="Privacy"
      lede="A personal site with no accounts, no analytics and no advertising. Here is the full account of what that leaves."
      updated="22 October 2026"
      sections={sections}
      footnote={
        <>
          Questions about any of this? Write to{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {EMAIL}
          </a>
          . The companion document is the{" "}
          <Link
            href="/terms"
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>
          .
        </>
      }
    />
  )
}
