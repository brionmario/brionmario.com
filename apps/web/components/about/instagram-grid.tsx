import { Play } from "lucide-react"
import Image from "next/image"

import type { InstagramPost } from "@/lib/data/instagram"

interface InstagramGridProps {
  posts: InstagramPost[]
  /** Account the posts belong to, used for the group label. */
  handle: string
}

/**
 * The profile grid, rebuilt locally.
 *
 * This replaced a pair of Instagram reel iframes. Meta's embed is ~400KB a
 * piece, sets cookies, refuses to go dark and crops reels to 4:5, so two of
 * them cost more than the rest of the page put together and still looked like
 * someone else's UI. Static thumbnails linking out cost nothing and tile the
 * way Instagram's own grid does: squares, cropped, newest first.
 */
export function InstagramGrid({ posts, handle }: InstagramGridProps) {
  return (
    <ul
      aria-label={`Recent posts from ${handle}`}
      className="m-0 grid list-none grid-cols-3 gap-1.5 p-0"
    >
      {posts.map((post) => (
        <li key={post.code} className="m-0">
          <a
            href={`https://www.instagram.com/${post.type === "reel" ? "reel" : "p"}/${post.code}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/tile relative block aspect-square overflow-hidden bg-background"
          >
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(min-width: 1240px) 190px, (min-width: 640px) 16vw, 30vw"
              className="object-cover transition-transform duration-300 group-hover/tile:scale-[1.06]"
            />
            {/* The tint only shows on hover, so the thumbnails stay honest at
                rest and still carry the accent on the way out to Instagram. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-[var(--bm-accent)] opacity-0 mix-blend-multiply transition-opacity duration-200 group-hover/tile:opacity-25"
            />
            {post.type === "reel" ? (
              <Play
                aria-hidden
                className="absolute top-2 right-2 size-3.5 fill-white text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              />
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  )
}
