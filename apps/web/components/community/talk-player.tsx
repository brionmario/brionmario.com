"use client"

import { Play } from "lucide-react"
import { useState } from "react"

import {
  embedUrl,
  thumbnailUrl,
  type CommunityEngagement,
} from "@/lib/data/community"

interface TalkPlayerProps {
  engagement: CommunityEngagement
  className?: string
}

/**
 * Click-to-play YouTube facade. Nothing from youtube.com loads until the
 * visitor asks for it — only the still frame.
 */
export function TalkPlayer({ engagement, className }: TalkPlayerProps) {
  const [playing, setPlaying] = useState(false)

  const thumbnail = thumbnailUrl(engagement)
  const src = embedUrl(engagement, true)
  if (!src || !thumbnail) return null

  if (playing) {
    return (
      <iframe
        src={src}
        title={engagement.talk}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className ?? "absolute inset-0 size-full border-0"}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play “${engagement.talk}”`}
      className="group absolute inset-0 flex size-full items-center justify-center border-0 bg-transparent p-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-55 transition-opacity duration-300 group-hover:opacity-70"
      />
      <span className="eyebrow relative flex items-center gap-3 bg-primary px-6 py-3.5 text-primary-foreground transition-transform duration-200 group-hover:scale-105">
        <Play className="size-3.5 shrink-0 fill-current" aria-hidden />
        Play the talk
      </span>
    </button>
  )
}
