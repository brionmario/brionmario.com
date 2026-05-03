"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { MobileMenu } from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/community", label: "Community" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Brion Mario
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
