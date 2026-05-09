import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { socialLinks as allSocialLinks } from "@/lib/data/socials"

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/community", label: "Community" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
]

const socialLinks = allSocialLinks
  .filter((s) => s.show)
  .map((s) => ({ href: s.url, label: s.label }))

const EMAIL = "brionbmp@gmail.com"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main area */}
        <div className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-2 lg:py-24">
          {/* Left: headline + email */}
          <div className="flex flex-col justify-between gap-10">
            <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Let&apos;s build something great together.
            </h2>

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
          </div>

          {/* Right: nav + socials */}
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

            <nav className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-all hover:text-primary-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:opacity-100" />
                </a>
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
