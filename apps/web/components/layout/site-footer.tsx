import Link from "next/link"

import { SocialIcon } from "@/components/icons/social-icon"
import { socialLinks } from "@/lib/data/socials"

const EMAIL = "brionbmp@gmail.com"
const SOURCE_URL = "https://github.com/brionmario/brionmario.com"

export function SiteFooter() {
  return (
    <footer className="mt-20 px-6 pt-9 pb-7 sm:px-7">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-5">
        <a
          href={`mailto:${EMAIL}`}
          className="border-b-2 border-primary pb-1 text-[22px] font-extrabold tracking-[-0.02em] transition-colors hover:text-primary"
        >
          {EMAIL}
        </a>
        {/* Icon-only links: the label moves to aria-label, and the 44px box
            keeps the tap target honest even though the glyph is 20px. */}
        <div className="-mr-2.5 flex flex-wrap items-center text-muted-foreground">
          {socialLinks
            .filter((social) => social.show)
            .map((social) => (
              <a
                key={social.key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex size-11 items-center justify-center transition-colors hover:text-primary"
              >
                <SocialIcon name={social.key} className="size-5" />
              </a>
            ))}
        </div>
      </div>

      <div className="eyebrow mx-auto mt-9 flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-2 text-faint">
        <span>© {new Date().getFullYear()} Brion Mario</span>
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2">
          <Link
            href="/privacy"
            className="transition-colors hover:text-primary"
          >
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-primary">
            Terms
          </Link>
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            Source
          </a>
        </div>
        <span>Colombo, Sri Lanka</span>
      </div>
    </footer>
  )
}
