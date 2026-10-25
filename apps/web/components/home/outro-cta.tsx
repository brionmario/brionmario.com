import { ActionLink } from "@/components/ui/action-link"

export function OutroCta() {
  return (
    <section className="flex min-h-[92vh] flex-col justify-center px-6 pt-24 pb-20 sm:px-7">
      <div className="mx-auto w-full max-w-[1240px]">
        <h2 className="brush m-0 text-center text-[clamp(3rem,11vw,8.5rem)]">
          Let&rsquo;s build
          <br />
          something great
        </h2>

        <div className="mt-14 flex flex-wrap justify-center gap-3.5">
          <ActionLink href="/blog" variant="solid" className="min-w-[190px]">
            Read the blog
          </ActionLink>
          <ActionLink href="/projects" className="min-w-[190px]">
            See projects
          </ActionLink>
        </div>
      </div>
    </section>
  )
}
