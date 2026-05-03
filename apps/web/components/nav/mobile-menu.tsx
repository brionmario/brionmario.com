"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@workspace/ui/lib/utils"

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/community", label: "Community" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden border-b border-border bg-background md:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  pathname === link.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
