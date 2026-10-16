import { socialLinks } from "@/lib/data/socials"

const EMAIL = "brionbmp@gmail.com"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border px-6 pb-7 pt-9 sm:px-7">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-baseline justify-between gap-x-8 gap-y-5">
        <a
          href={`mailto:${EMAIL}`}
          className="border-b-2 border-primary pb-1 text-[22px] font-extrabold tracking-[-0.02em] transition-colors hover:text-primary"
        >
          {EMAIL}
        </a>
        <div className="eyebrow flex flex-wrap gap-x-[18px] gap-y-2 tracking-[0.18em] text-muted-foreground">
          {socialLinks
            .filter((social) => social.show)
            .map((social) => (
              <a
                key={social.key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {social.label}
              </a>
            ))}
        </div>
      </div>

      <div className="eyebrow mx-auto mt-6 flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-[18px] tracking-[0.16em] text-faint">
        <span>© {new Date().getFullYear()} Brion Mario</span>
        <span>Colombo, Sri Lanka</span>
      </div>
    </footer>
  )
}
