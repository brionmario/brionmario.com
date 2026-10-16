"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { navLinks } from "./site-header"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="border-t border-border bg-background md:hidden">
      <nav className="mx-auto flex max-w-[1240px] flex-col px-6 py-2 sm:px-7">
        {navLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`)

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(
                "eyebrow border-b border-border py-4 transition-colors last:border-b-0",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
