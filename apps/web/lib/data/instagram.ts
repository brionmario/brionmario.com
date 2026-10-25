export interface InstagramPost {
  /** Shortcode from the permalink, e.g. `DeRzI3gS38T`. */
  code: string
  /** Reels and posts sit on different permalink paths and tile differently. */
  type: "reel" | "post"
  /** Thumbnail saved under `public/images/instagram` — see the site-data skill. */
  image: string
  alt: string
}

export interface InstagramAccount {
  handle: string
  url: string
  /** Where "see everything" points — the reels tab for video-led accounts. */
  archiveUrl: string
  archiveLabel: string
  label: string
  note: string
  posts: InstagramPost[]
}

/**
 * The grid behind "Off the clock" on /about.
 *
 * Thumbnails are copies, not hotlinks: Instagram's CDN URLs carry a signed
 * expiry, so anything pointing straight at scontent.cdninstagram.com is a
 * broken image in a few weeks. Each tile links back to the real permalink.
 */
export const instagramAccounts: InstagramAccount[] = [
  {
    handle: "@brionmario",
    url: "https://www.instagram.com/brionmario/",
    archiveUrl: "https://www.instagram.com/brionmario/reels/",
    archiveLabel: "All reels",
    label: "Photography",
    note: "Cameras, street light and the occasional accidental portrait.",
    posts: [
      {
        code: "Dewt65ZS_Yj",
        type: "reel",
        image: "/images/instagram/brionmario-01.jpg",
        alt: "A forest path on the way up to Riverston",
      },
      {
        code: "DeRzI3gS38T",
        type: "reel",
        image: "/images/instagram/brionmario-02.jpg",
        alt: "Sunrise over a misty road in the Knuckles range",
      },
      {
        code: "DeJGB00y0Up",
        type: "reel",
        image: "/images/instagram/brionmario-03.jpg",
        alt: "Walking through tea fields below a mountain ridge",
      },
      {
        code: "DdcBKs7y2m8",
        type: "post",
        image: "/images/instagram/brionmario-04.jpg",
        alt: "A lantern on a table by the water at dusk",
      },
      {
        code: "DdcAj7KyW5d",
        type: "post",
        image: "/images/instagram/brionmario-05.jpg",
        alt: "A campfire burning at dusk",
      },
      {
        code: "Ddb_92Sy-Xn",
        type: "post",
        image: "/images/instagram/brionmario-06.jpg",
        alt: "Two figures on a trail under a dusk sky",
      },
    ],
  },
  {
    handle: "@hungry.dude.dudette",
    url: "https://www.instagram.com/hungry.dude.dudette/",
    archiveUrl: "https://www.instagram.com/hungry.dude.dudette/reels/",
    archiveLabel: "All reels",
    label: "Food diary",
    note: "Two people, a lot of plates. Our running food diary.",
    posts: [
      {
        code: "Ddd82zPutX5",
        type: "reel",
        image: "/images/instagram/hungry-dude-dudette-01.jpg",
        alt: "A roadside stall piled with green pomelo",
      },
      {
        code: "DdMHngtuEAg",
        type: "reel",
        image: "/images/instagram/hungry-dude-dudette-02.jpg",
        alt: "A hand holding a bun beside bottles of milk and tea",
      },
      {
        code: "Dci7ku6uR0K",
        type: "reel",
        image: "/images/instagram/hungry-dude-dudette-03.jpg",
        alt: "An open-air buffet laid out under a timber roof",
      },
      {
        code: "DcG3LUXusL1",
        type: "reel",
        image: "/images/instagram/hungry-dude-dudette-04.jpg",
        alt: "A tray of short eats with a cup of tea",
      },
      {
        code: "Db0vbT0DDb5",
        type: "post",
        image: "/images/instagram/hungry-dude-dudette-05.jpg",
        alt: "Rice and curry piled on a banana leaf",
      },
      {
        code: "Db_EsB6DFUL",
        type: "post",
        image: "/images/instagram/hungry-dude-dudette-06.jpg",
        alt: "Curry and puri served in bowls",
      },
    ],
  },
]
