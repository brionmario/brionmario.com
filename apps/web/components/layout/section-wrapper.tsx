import { cn } from "@workspace/ui/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: "section" | "div"
}

export function SectionWrapper({
  children,
  className,
  id,
  as: Tag = "section",
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-20 sm:py-28 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl",
        className
      )}
    >
      {children}
    </Tag>
  )
}
