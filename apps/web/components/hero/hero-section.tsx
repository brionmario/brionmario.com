import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center overflow-hidden px-6 pt-12 pb-0 md:pt-20 lg:pt-36">
      <StaggerChildren className="flex flex-col items-center" staggerDelay={0.15}>
        <StaggerItem>
          <h1 className="font-brush text-[clamp(3.5rem,14vw,9rem)] leading-none tracking-tight text-foreground text-center">
            Frontend<br />Engineer
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-7 text-center text-muted-foreground text-lg">
            Currently at{" "}
            <Link
              href="https://wso2.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              WSO2
            </Link>
            {" "}- building interfaces that matter.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-40 bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              )}
            >
              Read the blog
            </Link>
            <Link
              href="/projects"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-40")}
            >
              See projects
            </Link>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="relative mt-12 dark:mix-blend-lighten"
            style={{
              maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              filter: "grayscale(1)",
            }}
          >
            <Image
              alt="Brion Mario"
              src="/assets/images/people/brion-headshot-transparent-001.png"
              width={400}
              height={600}
              priority
            />
          </div>
        </StaggerItem>
      </StaggerChildren>
    </section>
  )
}
