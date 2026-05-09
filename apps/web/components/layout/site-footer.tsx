import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiGithub, SiX, SiMedium, SiResearchgate } from "@icons-pack/react-simple-icons"

import { socialLinks as allSocialLinks } from "@/lib/data/socials"

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/community", label: "Community" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
]

const socialLinks = allSocialLinks.filter((s) => s.show)

const FOOTER_ICONS: Record<string, React.ReactNode> = {
  github: <SiGithub color="currentColor" className="size-4" />,
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: <SiX color="currentColor" className="size-4" />,
  medium: <SiMedium color="currentColor" className="size-4" />,
  researchgate: <SiResearchgate color="currentColor" className="size-4" />,
}

const EMAIL = "brionbmp@gmail.com"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main area */}
        <div className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-2 lg:py-24">
          {/* Left: headline + email + socials */}
          <div className="flex flex-col justify-between gap-10">
            <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Let&apos;s build something great together.
            </h2>

            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm font-medium text-primary-foreground/70 uppercase tracking-widest">
                  Email me
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 font-heading text-2xl font-bold text-primary-foreground transition-opacity hover:opacity-80 sm:text-3xl lg:text-4xl"
                >
                  {EMAIL}
                  <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <nav className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="group flex size-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all duration-200 hover:border-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    {FOOTER_ICONS[link.key]}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right: nav */}
          <div className="flex flex-col gap-10 lg:items-end">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-2 font-heading text-lg font-medium text-primary-foreground/80 transition-all hover:text-primary-foreground"
                >
                  {link.label}
                  <ArrowRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <p className="text-sm text-primary-foreground/50">
            © {year} Brion Mario. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
