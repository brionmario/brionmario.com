import Image from "next/image"

export function HeroImmersive() {
  return (
    <section className="relative flex min-h-[calc(100vh-76px)] flex-col items-center px-6 pt-14">
      <h1 className="brush m-0 text-center text-[clamp(3.5rem,14vw,9rem)]">
        Frontend
        <br />
        Engineer
      </h1>

      {/* leading-[normal] rather than text-lg's paired 28px, matching the design. */}
      <p className="mt-[26px] text-center text-[18px] leading-[normal] text-muted-foreground">
        Currently at{" "}
        <a
          href="https://wso2.com"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-primary font-bold text-foreground"
        >
          WSO2
        </a>{" "}
        — building interfaces that matter.
      </p>

      {/* Grayscale portrait blended into the canvas and faded out at the bottom. */}
      <div className="relative mt-10 w-[400px] max-w-[86vw] [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] grayscale mix-blend-multiply dark:mix-blend-lighten">
        <Image
          src="/images/people/brion-headshot.png"
          alt="Brion Mario"
          width={542}
          height={586}
          priority
          className="block h-auto w-full"
        />
      </div>

      <div className="eyebrow-sm absolute inset-x-0 bottom-[26px] flex animate-[bm-scrollhint_2.2s_ease-in-out_infinite] flex-col items-center gap-2 tracking-[0.3em] text-faint motion-reduce:animate-none">
        <span>Scroll</span>
        <span aria-hidden className="text-sm">
          ↓
        </span>
      </div>
    </section>
  )
}
