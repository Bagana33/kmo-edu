import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({ title, subtitle, className, align = "center" }: SectionHeadingProps) {
  return (
    <div
      className={cn("mb-6 sm:mb-8 md:mb-10 space-y-1.5 sm:space-y-2", align === "center" && "text-center", className)}
    >
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">{title}</h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground text-pretty">{subtitle}</p>
      )}
    </div>
  )
}
