"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { Wordmark } from "@/components/icons/wordmark"
import { MobileMenu } from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"

export const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/community", label: "Community" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // The immersive home hero runs straight off the header with no seam; the
  // content pages use a rule to separate the sticky bar from the page.
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/80 backdrop-blur-[14px]",
        !isHome && "border-b border-border"
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-6 px-6 sm:px-7">
        <Link
          href="/"
          className="shrink-0 text-foreground transition-opacity hover:opacity-80"
          aria-label="Brion Mario — home"
        >
          <Wordmark className="h-[26px] w-[130px] sm:h-[30px] sm:w-[150px]" />
        </Link>

        {/* Nav and the toggle share the right-hand group so the nav stays
            flush right, as in the design, rather than centring itself. */}
        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "eyebrow group relative px-3.5 py-2.5 tracking-[0.14em] transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 bottom-1 h-0.5 origin-left bg-primary transition-transform duration-200",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
