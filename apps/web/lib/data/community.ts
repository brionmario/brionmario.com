export type EngagementType = "Meetup" | "Workshop" | "Conference" | "Judge"

export interface EngagementPhoto {
  url: string
  alt: string
  /**
   * Width / height, for photos that must not be cropped to the gallery's
   * default slots — screen-share frames, panoramas, anything where the content
   * runs to the edges. Photos carrying one get their own full-width row.
   */
  aspect?: number
}

export interface CommunityEngagement {
  id: string
  type: EngagementType
  /** Display period, e.g. "2025". */
  monthYear: string
  talk: string
  description: string
  /** Long-form paragraphs shown on the detail page. */
  body: string[]
  event: string
  location: string
  url: string
  linkLabel: string
  slides?: string
  /** Cover photo for the card on the community index. */
  image?: string
  /** Photos from the day, shown as a gallery on the detail page. */
  gallery?: EngagementPhoto[]
  videoId?: string
  /** Deep-link offset into the recording, in seconds. */
  videoStart?: number
}

export const communityEngagements: CommunityEngagement[] = [
  {
    id: "react-chennai-2025",
    type: "Meetup",
    monthYear: "2025",
    talk: "Securing React Apps with Modern Auth",
    description:
      "Spoke at the React Chennai community meetup on modern authentication patterns in React applications.",
    body: [
      'The session walked through what "modern auth" actually means for a React codebase — where tokens live, why the browser is a hostile storage environment, and how much of the problem an SDK should be solving for you.',
      "We finished with a live integration: an unauthenticated app to a working login flow, using Asgardeo's JavaScript SDK.",
    ],
    event: "Chennai React Meetup #10",
    location: "Chennai, IN",
    url: "https://youtu.be/2Ss3K2UjVUo?t=5999",
    linkLabel: "Watch on YouTube",
    slides:
      "https://brionmario.github.io/me/workshops/mastering-secure-login-react-apps/",
    videoId: "2Ss3K2UjVUo",
    videoStart: 5999,
  },
  {
    id: "react-bangalore-2025",
    type: "Meetup",
    monthYear: "2025",
    talk: "Mastering Secure Login in React Apps",
    description:
      "Identity and access management patterns for React applications, with the Bangalore React community.",
    body: [
      "A deeper cut on IAM for frontend engineers: the difference between authentication and authorization in a SPA, handling sessions across tabs, and what to do when the token expires mid-request.",
    ],
    event: "React Bangalore Meetup #87",
    location: "Bangalore, IN",
    url: "https://www.meetup.com/reactjs-bangalore/events/306454095/",
    linkLabel: "Event on Meetup",
    image: "/images/community/react-bangalore-2025-02-talk.jpg",
    gallery: [
      {
        url: "/images/community/react-bangalore-2025-01-room.jpg",
        alt: "A full room at the React Bangalore meetup, seen from the back",
      },
      {
        url: "/images/community/react-bangalore-2025-02-talk.jpg",
        alt: "Brion Mario presenting, mic in hand, beside a slide reading \u201cWho does this?\u201d",
      },
      {
        url: "/images/community/react-bangalore-2025-03-slide.jpg",
        alt: "A slide titled \u201cNot just dangerouslySetInnerHTML\u201d listing other ways to bypass React\u2019s escaping",
      },
      {
        url: "/images/community/react-bangalore-2025-04-demo.jpg",
        alt: "The live demo: the Asgardeo console on the projector while Brion Mario types at a laptop",
      },
    ],
  },
  {
    id: "react-delhi-2025",
    type: "Meetup",
    monthYear: "2025",
    talk: "Mastering Secure Login in React Apps",
    description:
      "Web security and secure login practices for React applications, at React Delhi.",
    body: [
      "XSS, CSRF, clickjacking and dependency risk — the vulnerabilities that still land in React apps, and the handful of defaults that prevent most of them.",
    ],
    event: "React Delhi Meetup #9",
    location: "Delhi, IN",
    url: "https://www.linkedin.com/posts/react-delhi_reactdelhi-reactjs-websecurity-activity-7314396322839556096-xquQ/",
    linkLabel: "Post on LinkedIn",
    slides:
      "https://brionmario.github.io/me/workshops/mastering-secure-login-react-apps/",
    image: "/images/community/react-delhi-2025-02-talk.jpg",
    gallery: [
      {
        url: "/images/community/react-delhi-2025-01-room.jpg",
        alt: "A packed room at React Delhi, seen from the back, with the talk running at the front",
      },
      {
        url: "/images/community/react-delhi-2025-02-talk.jpg",
        alt: "Brion Mario speaking into a handheld mic in the venue's open office space",
      },
      {
        url: "/images/community/react-delhi-2025-03-hands.jpg",
        alt: "Hands going up across the audience as Brion Mario raises his own at the front",
      },
    ],
  },
  {
    id: "javascript-colombo-1",
    type: "Meetup",
    monthYear: "2024",
    talk: "Design Systems for the Enterprise",
    description:
      "Building and maintaining a design system at enterprise scale — the first JavaScript Colombo meetup.",
    body: [
      "What it takes to keep one design language consistent across dozens of products and teams: governance, versioning, and the unglamorous release plumbing that makes adoption possible.",
    ],
    event: "JavaScript Colombo #1",
    location: "Colombo, LK",
    url: "https://x.com/javascriptcmb/status/1853418829885653020",
    linkLabel: "Post on X",
    slides:
      "https://brionmario.github.io/me/workshops/building-enterprise-design-system-2024/",
    image: "/images/community/javascript-colombo-1-03-wso2.jpg",
    gallery: [
      {
        url: "/images/community/javascript-colombo-1-01-room.jpg",
        alt: "A full room at the first JavaScript Colombo meetup, with a slide reading \u201cDesign System?\u201d",
      },
      {
        url: "/images/community/javascript-colombo-1-02-title.jpg",
        alt: "The title slide, \u201cBuilding an Enterprise Design System for 2024\u201d, with Brion Mario beside the screen",
      },
      {
        url: "/images/community/javascript-colombo-1-03-wso2.jpg",
        alt: "A slide titled \u201cHow WSO2 Built a Scalable Design System \u2014 the story of Oxygen UI\u201d",
      },
      {
        url: "/images/community/javascript-colombo-1-04-oxygen.jpg",
        alt: "The Oxygen UI documentation site on the projector during the walkthrough",
      },
      {
        url: "/images/community/javascript-colombo-1-05-qa.jpg",
        alt: "The Q&A slide with a feedback QR code, Brion Mario taking questions from the floor",
      },
      {
        url: "/images/community/javascript-colombo-1-06-audience.jpg",
        alt: "The audience watching from the seats, the talk running at the far end of the room",
      },
      {
        url: "/images/community/javascript-colombo-1-07-standing.jpg",
        alt: "Latecomers standing along the back wall of the room",
      },
    ],
  },
  {
    id: "sliit-cssc-intern-ready-3",
    type: "Workshop",
    monthYear: "2026",
    talk: "Cracking the Technical Interview",
    description:
      "A hands-on session for students preparing for their first technical interviews, at SLIIT CSSC Intern Ready 3.",
    body: [
      "What interviewers are actually assessing, how to reason out loud, and how to recover when you don't know the answer — run as a workshop rather than a talk.",
    ],
    event: "SLIIT CSSC Intern Ready 3",
    location: "Malabe, LK",
    url: "https://brionmario.github.io/me/workshops/sliit-cssc-intern-ready-3/",
    linkLabel: "Grab the slides",
    slides:
      "https://brionmario.github.io/me/workshops/sliit-cssc-intern-ready-3/",
    image: "/images/community/sliit-cssc-intern-ready-3-02-talk.jpg",
    gallery: [
      {
        url: "/images/community/sliit-cssc-intern-ready-3-01-group.jpg",
        alt: "The full cohort lined up for a group photo at the end of the workshop",
      },
      {
        url: "/images/community/sliit-cssc-intern-ready-3-02-talk.jpg",
        alt: "Brion Mario presenting beside a slide reading \u201cDo some recon\u201d",
      },
      {
        url: "/images/community/sliit-cssc-intern-ready-3-03-audience.jpg",
        alt: "Students following the session from the lecture hall seats",
      },
    ],
  },
  {
    id: "idealize-2023",
    type: "Workshop",
    monthYear: "2023",
    talk: "Node.js / Firebase Session",
    description:
      "A practical build session on Node.js and Firebase for the IDEALIZE hackathon participants.",
    body: [
      "From an empty folder to a deployed backend — the shortest useful path for teams who need something working before the hackathon clock runs out.",
    ],
    event: "IDEALIZE",
    location: "Moratuwa, LK",
    url: "https://brionmario.github.io/me/workshops/idealize-2023-nodejs-firebase/",
    linkLabel: "Grab the slides",
    slides:
      "https://brionmario.github.io/me/workshops/idealize-2023-nodejs-firebase/",
    image: "/images/community/idealize-2023-02-http-methods.jpg",
    gallery: [
      {
        url: "/images/community/idealize-2023-01-speakers.jpg",
        alt: "Brion Mario and Dimal Vindula on the IDEALIZE 2023 speaker backdrop during the online session",
        aspect: 3.556,
      },
      {
        url: "/images/community/idealize-2023-02-http-methods.jpg",
        alt: "A slide mapping CRUD operations to HTTP methods: create to POST, read to GET, update to PUT, delete to DELETE",
        aspect: 1.791,
      },
      {
        url: "/images/community/idealize-2023-03-code.jpg",
        alt: "VS Code showing the package.json for a Node.js and Firebase REST API, with express installing in the terminal",
        aspect: 1.863,
      },
    ],
  },
  {
    id: "codesprint-7-ux",
    type: "Workshop",
    monthYear: "2023",
    talk: "UX Workshop — DesignSprint",
    description:
      "Ran the UX workshop at the DesignSprint stage of CodeSprint 7.0, IEEE Committee of IIT.",
    body: [
      "A design-sprint format for engineers: framing the problem, sketching fast, and getting to something testable before falling in love with a solution.",
    ],
    event: "CodeSprint 7.0",
    location: "Colombo, LK",
    url: "https://brionmario.github.io/me/workshops/codesprint-7-ux-workshop/",
    linkLabel: "Grab the slides",
    slides:
      "https://brionmario.github.io/me/workshops/codesprint-7-ux-workshop/",
    image: "/images/community/codesprint-7-ux-02-design-slide.jpg",
    gallery: [
      {
        // 3:2 and full width, so the photographer's credit bar along the
        // bottom of every frame survives instead of being cropped away.
        url: "/images/community/codesprint-7-ux-01-room.jpg",
        alt: "Brion Mario pointing at a slide in front of a full room at CodeSprint 7.0 Workshop 3",
        aspect: 1.5,
      },
      {
        url: "/images/community/codesprint-7-ux-02-design-slide.jpg",
        alt: "Brion Mario presenting beside a slide reading \u201cDesign\u201d, next to a WSO2 careers banner",
      },
      {
        url: "/images/community/codesprint-7-ux-03-audience.jpg",
        alt: "Students watching from the seats, two WSO2 engineers in the front row",
      },
      {
        url: "/images/community/codesprint-7-ux-04-whiteboard.jpg",
        alt: "A participant sketching on the whiteboard during the design sprint exercise",
      },
      {
        url: "/images/community/codesprint-7-ux-05-floor.jpg",
        alt: "Brion Mario talking with participants on the floor between sessions",
      },
      {
        url: "/images/community/codesprint-7-ux-06-floor-2.jpg",
        alt: "More questions on the floor after the workshop wrapped up",
      },
    ],
  },
  {
    id: "i2ct-2019",
    type: "Conference",
    monthYear: "2019",
    talk: "Early Prediction of Cybersickness in VR, AR & MR Applications",
    description:
      "Presented the paper at the 5th International Conference for Convergence in Technology (I2CT).",
    body: [
      "The conference presentation of the review paper — what the literature says about predicting cybersickness before a user feels it, and where the open problems still sit.",
    ],
    event: "I2CT 2019",
    location: "Pune, IN",
    url: "https://ieeexplore.ieee.org/document/9033650/",
    linkLabel: "Paper on IEEE",
  },
  {
    id: "cutting-edge-2020",
    type: "Judge",
    monthYear: "2020",
    talk: "Cutting Edge — Judging Panel",
    description:
      "Sat on the judging panel for Cutting Edge at the Informatics Institute of Technology.",
    body: [
      "Four years after competing in it, back on the other side of the table judging final-year project pitches.",
    ],
    event: "Cutting Edge",
    location: "Colombo, LK",
    url: "https://www.iit.ac.lk/",
    linkLabel: "About IIT",
  },
]

/** The talk that headlines the Community page. */
export const featuredEngagement = communityEngagements[0]!

export const engagementGroups = (
  [
    ["Meetup", "Meetups"],
    ["Workshop", "Workshops"],
    ["Conference", "Conferences"],
    ["Judge", "Judging"],
  ] as const
)
  .map(([type, label]) => ({
    label,
    // The featured talk already has the spotlight above the grid.
    items: communityEngagements.filter(
      (engagement) =>
        engagement.type === type && engagement.id !== featuredEngagement.id
    ),
  }))
  .filter((group) => group.items.length > 0)

export function embedUrl(
  engagement: CommunityEngagement,
  autoplay = false
): string | null {
  if (!engagement.videoId) return null

  const params = new URLSearchParams()
  if (engagement.videoStart) params.set("start", String(engagement.videoStart))
  if (autoplay) params.set("autoplay", "1")

  return `https://www.youtube.com/embed/${engagement.videoId}?${params.toString()}`
}

export function thumbnailUrl(engagement: CommunityEngagement): string | null {
  if (!engagement.videoId) return null
  return `https://img.youtube.com/vi/${engagement.videoId}/maxresdefault.jpg`
}
