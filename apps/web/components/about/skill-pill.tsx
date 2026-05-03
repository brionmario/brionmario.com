import { cn } from "@workspace/ui/lib/utils"

interface SkillPillProps {
  skill: string
  className?: string
}

export function SkillPill({ skill, className }: SkillPillProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20",
        className
      )}
    >
      {skill}
    </span>
  )
}
