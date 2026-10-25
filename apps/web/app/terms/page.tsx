import type { Metadata } from "next"
import Link from "next/link"

import {
  LegalDocument,
  type LegalSection,
} from "@/components/layout/legal-document"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to browsing brionmario.com, and how the writing, code and research on it may be used.",
}

const EMAIL = "brionbmp@gmail.com"

const sections: LegalSection[] = [
  {
    heading: "Agreement",
    body: [
      "brionmario.com is the personal website of Brion Mario. By browsing it you accept the terms below. If you don't, please don't use the site.",
      "Nothing here creates a client relationship, an employment relationship or any obligation on my part to provide the site or keep it available.",
    ],
  },
  {
    heading: "What this site is",
    body: [
      "A personal portfolio: writing, open-source projects, conference talks and peer-reviewed research. Everything on it is published in a personal capacity and reflects my own views — not those of my employer, any client, or any organisation I contribute to or have contributed to.",
    ],
  },
  {
    heading: "Use of the content",
    body: [
      "The writing, page designs, images and layout are mine and are protected by copyright. You may read, link to and quote short excerpts with attribution and a link back. Republishing a whole post, or using the content to train or fine-tune a model, needs my written permission first.",
      "Source code is the exception: anything published in my public repositories is governed by the licence in that repository, not by this page. Where the two differ, the repository licence wins for that code.",
    ],
  },
  {
    heading: "Research papers",
    body: [
      "The papers listed under Research are published by third parties — IEEE and others — and their copyright belongs to those publishers. Copies hosted here are provided for personal, non-commercial reading under the publishers' author rights. Any reuse beyond that goes through the publisher.",
    ],
  },
  {
    heading: "Third-party names and marks",
    body: [
      "Company names, product names and logos appearing on the site belong to their respective owners and are used only to identify the project, employer, event or technology being described. Their appearance implies no endorsement in either direction.",
    ],
  },
  {
    heading: "No warranty",
    body: [
      "The site and everything on it is provided as is, without warranty of any kind. Technical posts go stale, code samples carry bugs, and links rot. Nothing here is professional, security or legal advice; test anything you take from this site before you rely on it, especially in production.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent the law allows, I am not liable for any loss or damage arising from your use of the site or of anything you found on it — including lost data, lost profits or broken builds.",
    ],
  },
  {
    heading: "External links",
    body: [
      "The site links out to GitHub, Medium, Instagram, video platforms, publishers and other places. I don't control them and I'm not responsible for their content or their handling of your data. Once you follow a link, that site's own terms apply.",
    ],
  },
  {
    heading: "Acceptable use",
    body: ["Please don't:"],
    bullets: [
      "Scrape the site in a way that degrades it for other visitors",
      "Attempt to gain unauthorised access to the site or its infrastructure",
      "Mirror or republish the site, in whole or in substantial part, as your own",
      "Use the content to imply that I endorse a product, person or position",
    ],
  },
  {
    heading: "Security reports",
    body: [
      "If you find a vulnerability in this site or in one of my projects, please report it privately by email rather than filing it publicly, and give me a reasonable window to fix it. Good-faith reports are always welcome.",
    ],
  },
  {
    heading: "Changes and governing law",
    body: [
      "These terms may change; the current version is always the one on this page, with the date shown above. They are governed by the laws of Sri Lanka, without regard to conflict-of-law rules.",
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal / Terms"
      title="Terms"
      lede="The terms that apply to browsing this site, and how the writing, code and research on it may be used."
      updated="22 October 2026"
      sections={sections}
      footnote={
        <>
          Anything unclear, or a permission to ask for? Write to{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {EMAIL}
          </a>
          . The companion document is the{" "}
          <Link
            href="/privacy"
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </>
      }
    />
  )
}
