import {
  SiCss,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiOpenjdk,
  SiPhp,
  SiReact,
  SiSass,
  SiTypescript,
} from "@icons-pack/react-simple-icons"
import type { ComponentType, CSSProperties, SVGProps } from "react"

import { cn } from "@workspace/ui/lib/utils"

interface Tech {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** The mark's own brand colour. */
  color: string
  /**
   * Only for marks whose brand colour is black or white, which would vanish
   * against one of the two canvases.
   */
  darkColor?: string
}

/**
 * Keyed by the language GitHub reports, or by the first tag when a repo has no
 * language. Anything not listed simply shows its label with no mark.
 */
const tech: Record<string, Tech> = {
  go: { icon: SiGo, color: "#00ADD8" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  // OpenJDK's own blue, lightened on ink so the mark does not disappear.
  java: { icon: SiOpenjdk, color: "#437291", darkColor: "#7AB0D4" },
  react: { icon: SiReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs, color: "#000000", darkColor: "#FFFFFF" },
  css: { icon: SiCss, color: "#663399", darkColor: "#9B6FD4" },
  scss: { icon: SiSass, color: "#CC6699" },
  html: { icon: SiHtml5, color: "#E34F26" },
  php: { icon: SiPhp, color: "#777BB4" },
}

interface TechIconProps {
  /** A language or tag name, matched case-insensitively. */
  name: string
  className?: string
}

/**
 * The brand mark for a language or framework, in its own colour. Decorative:
 * the label beside it carries the meaning.
 */
export function TechIcon({ name, className }: TechIconProps) {
  const entry = tech[name.toLowerCase()]
  if (!entry) return null

  const { icon: Icon, color, darkColor } = entry

  return (
    <Icon
      className={cn(
        "text-[var(--tech)] dark:text-[var(--tech-dark)]",
        className
      )}
      style={
        {
          "--tech": color,
          "--tech-dark": darkColor ?? color,
        } as CSSProperties
      }
      aria-hidden
      focusable="false"
    />
  )
}
