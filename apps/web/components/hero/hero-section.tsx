import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"
import { BrionMarioLogo } from "@/components/icons/brion-mario-logo"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center overflow-hidden px-6 pt-12 pb-0 md:pt-20 lg:pt-36">
      <StaggerChildren className="flex flex-col items-center" staggerDelay={0.15}>
        <StaggerItem>
          <p className="flex items-center gap-2 text-muted-foreground text-lg">
            <span className="text-2xl">👋</span>
            Hi there! I&apos;m
          </p>
        </StaggerItem>

        <StaggerItem>
          <h1 className="mt-5">
            <BrionMarioLogo
              width={500}
              height={85}
              className="w-[min(500px,90vw)] h-auto"
              brionColor="currentColor"
              marioColor="#7c6bda"
              aria-label="Brion Mario"
            />
          </h1>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-8 space-y-2 text-center text-muted-foreground text-lg leading-relaxed">
            <p>A front-end enthusiast based in Sri Lanka 🇱🇰</p>
            <p className="flex flex-wrap items-center justify-center gap-1">
              Currently working as a Senior Software Engineer at{" "}
              <Link
                href="https://wso2.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                WSO2
              </Link>
            </p>
          </div>
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
            <a
              href="/resume.pdf"
              download="Brion Mario - Resume.pdf"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-40 gap-2")}
            >
              Download Resume
              <Download className="size-4" />
            </a>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="relative mt-12"
            style={{
              maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              filter: "grayscale(1)",
              mixBlendMode: "lighten",
            }}
          >
            <Image
              alt="Brion Mario"
              src="/images/people/brion-headshot-transparent-001.png"
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
