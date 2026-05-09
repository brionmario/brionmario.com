export const bio = `I'm a Fullstack Engineer with 6+ years of experience building scalable, high-performant, and secure software solutions. I'm deeply passionate about open source, identity & access management, and creating developer-friendly tools that make security accessible.

Currently, I contribute to projects like Asgardeo and WSO2 Identity Server, working at the intersection of security engineering and developer experience. When I'm not writing code, I share what I learn through writing, speaking at meetups, and publishing research.`

export interface ExperienceRole {
  title: string
  period: string
  isCurrent?: boolean
}

export interface ExperienceEntry {
  id: string
  company: string
  logoUrl: string
  location: string
  roles: ExperienceRole[]
}

export const experience: ExperienceEntry[] = [
  {
    id: "wso2",
    company: "WSO2",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/D560BAQEN0FCfQXr0Xg/company-logo_100_100/B56Zy.wK2DH8AQ-/0/1772726825166/wso2_logo?e=1779926400&v=beta&t=CXZRW-535Cn2AwCT7sFSL01AlJwcYq3qhaj7188Verg",
    location: "Sri Lanka",
    roles: [
      { title: "Technical Lead", period: "Feb 2025 – Present", isCurrent: true },
      { title: "Associate Technical Lead", period: "May 2023 – Feb 2025" },
      { title: "Senior Software Engineer", period: "Jun 2021 – May 2023" },
      { title: "Software Engineer", period: "Jul 2019 – Jun 2021" },
    ],
  },
  {
    id: "zone24x7",
    company: "Zone24x7",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/C560BAQHM1ZSOqtkzxg/company-logo_100_100/company-logo_100_100/0/1631367414432?e=1779926400&v=beta&t=k5SDtRrF74bX-eDQoK31BDOcVco7BGWnNuLJViHgnzs",
    location: "Sri Lanka",
    roles: [
      { title: "Trainee Associate Software Engineer", period: "Jul 2017 – Jul 2018" },
    ],
  },
  {
    id: "bp",
    company: "BP",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/D4E0BAQFJIiZN5WCYAA/company-logo_100_100/company-logo_100_100/0/1719826788213/bp_logo?e=1779926400&v=beta&t=btsfBns2KQOZMP59q6jokn-0eY0vVRvIx0sJzj3DeNc",
    location: "Sidcup, London",
    roles: [
      { title: "Customer Service Assistant", period: "Dec 2013 – Dec 2015" },
    ],
  },
  {
    id: "kfc",
    company: "KFC UK & Ireland",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/C560BAQFvWwvzFrq1vA/company-logo_100_100/company-logo_100_100/0/1630582772285/kfc_uki_logo?e=1779926400&v=beta&t=PWuG_d04gEgXZHJcvsuaQwajQTwaGBiL-OxcycRwKqs",
    location: "Penge, London",
    roles: [
      { title: "Customer Service Assistant", period: "Oct 2013 – Aug 2014" },
    ],
  },
]

export interface CountryPhoto {
  url: string
  alt?: string
}

export interface VisitedCountry {
  isoCode: string
  name: string
  flag: string
  region: string
  lat: number
  lng: number
  note?: string
  visits: string[]
  images?: CountryPhoto[]
}

export const visitedCountries: VisitedCountry[] = [
  {
    isoCode: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    lat: 51.5,
    lng: -0.1,
    note: "Where the adventure started — lived in London for years.",
    visits: ["2013–2015"],
    images: [
      {
        url: "https://instagram.fcmb2-2.fna.fbcdn.net/v/t51.82787-15/625877415_18551658571019002_2046465320618352578_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=NjkwMzU1MjY2MzY3OTczOTE1.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuNjQwLnNkci5yZWd1bGFyX3Bob3RvLkMzIn0%3D&_nc_ohc=Iw5WuSASs7QQ7kNvwHsPg_u&_nc_oc=AdpP5XudRR65z9qLZZojoDbivWsw1SzNUZFi0iaaZxt2CJxAZtz4DdF60id4CRwc5qs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcmb2-2.fna&_nc_gid=0MYnqvHX7WJ7LecK0rlKpA&_nc_ss=7a22e&oh=00_Af5WCT9IpW2fzd8NkVV-WKTsICZW02D5TK-aYH64-1qZeA&oe=6A0486E9",
        alt: "United Kingdom",
      },
    ],
  },
  {
    isoCode: "IN",
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    lat: 20.6,
    lng: 78.9,
    note: "Incredible culture, chaotic traffic, and the best chai.",
    visits: ["2019", "2025"],
    images: [
      {
        url: "https://instagram.fcmb2-2.fna.fbcdn.net/v/t51.82787-15/628012466_18387769102154555_2723185272247639600_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MjAwODg3OTg1MjgyMzk3MzYzMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=sgIG2qql3zwQ7kNvwGXbxLj&_nc_oc=Adq-VhHYSSmNWIeUqaOE-_kp-VmeBPrXDMHmLw53Y_Dn_ngqV70ZgEe55uraJKrhBqk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcmb2-2.fna&_nc_gid=2PoCyQ-Jgu5nSeXZUz4yMw&_nc_ss=7a22e&oh=00_Af7tguafj7HCNYtX92fcMAhednznRh_UqE8RPOWDH3hV_Q&oe=6A049781",
        alt: "India",
      },
    ],
  },
  {
    isoCode: "TW",
    name: "Taiwan",
    flag: "🇹🇼",
    region: "East Asia",
    lat: 23.7,
    lng: 121.0,
    note: "Night markets and bubble tea — a perfect combo.",
    visits: ["2017"],
    images: [
      {
        url: "https://instagram.fcmb2-2.fna.fbcdn.net/v/t51.82787-15/654735994_18317076478271967_221289545559083897_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MTkwNjY1NTgwNTU4ODIzMjM0MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=es9C_8heLS8Q7kNvwH7m1et&_nc_oc=AdpSb3zStu9tQ4uViGmsk33is5geytnvpAACtHbp98Zqx6XqC-haRXfll5vlYnwkw_w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcmb2-2.fna&_nc_gid=2PoCyQ-Jgu5nSeXZUz4yMw&_nc_ss=7a22e&oh=00_Af7ployk7vTw_gxbQPPTmZR3dn2xZCkYliDd-bwlsq8hCw&oe=6A048DFF",
        alt: "Taiwan",
      },
    ],
  },
  {
    isoCode: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "Southeast Asia",
    lat: 4.2,
    lng: 101.9,
    note: "Rainforests, Petronas Towers, and nasi lemak at dawn.",
    visits: ["2025"],
    images: [],
  },
  {
    isoCode: "AE",
    name: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    lat: 23.4,
    lng: 53.8,
    note: "Desert dunes meet futuristic skylines.",
    visits: ["2022"],
    images: [
      {
        url: "https://instagram.fcmb2-2.fna.fbcdn.net/v/t51.82787-15/651899206_18067467647300657_6590020923935271594_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MjkxNTU0MTAwNzQ5MTY4NzUzNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=CjOJHjYeECEQ7kNvwFzQB-F&_nc_oc=AdqIB8TRKx-Y-pnPtmZX2j2gg7oA2mdHtPzTIBYXMkPvsaOv1hwNIHo180pQSBOPmRs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcmb2-2.fna&_nc_gid=-zSM-OjuIXIybv2je_H0vA&_nc_ss=7a22e&oh=00_Af4LzoziY7u8H0cgzkOaNuAvOVTmeL_DHOvlMZ5JoNjsYg&oe=6A04B821",
        alt: "UAE",
      },
    ],
  },
]

export const travelStats = {
  tagline: "5 countries · 4 regions · still counting ✈️",
} as const

// ─── Currently ────────────────────────────────────────────────────────────────

export interface CurrentlyItem {
  id: string
  category: string
  icon: string
  title: string
  subtitle: string
  note?: string
}

export const currently: CurrentlyItem[] = [
  {
    id: "building",
    category: "Building",
    icon: "⚡",
    title: "Project Thunder",
    subtitle: "Next-generation open source IAM",
    note: "The thing keeping me up at night (in a good way).",
  },
  {
    id: "reading",
    category: "Reading",
    icon: "📖",
    title: "Cloud Native",
    subtitle: "Architecture, patterns & distributed systems",
    note: "Down the rabbit hole and loving it.",
  },
  {
    id: "listening",
    category: "Listening",
    icon: "🎵",
    title: "Aydan's Picks",
    subtitle: "Whatever my son is vibing to",
    note: "No complaints. The kid has taste.",
  },
]

// ─── Education ────────────────────────────────────────────────────────────────

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  honor?: string
}

export const education: EducationEntry[] = [
  {
    id: "westminster",
    institution: "University of Westminster",
    degree: "B.Eng Software Engineering (Hons)",
    period: "2015 – 2019",
    location: "London, United Kingdom",
    honor: "First Class Honours",
  },
  {
    id: "holy-cross",
    institution: "Holy Cross College",
    degree: "Primary & Secondary Education",
    period: "1999 – 2012",
    location: "Kalutara, Sri Lanka",
  },
]

// ─── Honors & Awards ──────────────────────────────────────────────────────────

export interface HonorEntry {
  id: string
  icon: string
  title: string
  issuer: string
  date: string
  featured?: boolean
}

export const honors: HonorEntry[] = [
  {
    id: "westminster-outstanding",
    icon: "🏆",
    title: "Outstanding Achievements & All Round Performance",
    issuer: "University of Westminster",
    date: "Oct 2019",
    featured: true,
  },
  {
    id: "innoserve-2017",
    icon: "🥈",
    title: "Silver Award — Innoserve Awards 2017",
    issuer: "Industrial Development Bureau, Ministry of Economic Affairs · Taipei, Taiwan",
    date: "Nov 2017",
  },
  {
    id: "hackln-2017",
    icon: "🥈",
    title: "First Runner-up — HackLN 2017",
    issuer: "University of Kelaniya",
    date: "Nov 2017",
  },
  {
    id: "nbqsa-2017",
    icon: "🎖️",
    title: "Merit Award — National Best Quality ICT Awards (NBQSA)",
    issuer: "BCS The Chartered Institute for IT",
    date: "Oct 2017",
  },
  {
    id: "gsea-2017",
    icon: "🌟",
    title: "Semi Finalist — Global Student Entrepreneur Awards",
    issuer: "EO GSEA · Top 8 student entrepreneurs globally",
    date: "Feb 2017",
  },
  {
    id: "cutting-edge-2016",
    icon: "🥉",
    title: "Second Runner-up — Cutting Edge 2016",
    issuer: "Informatics Institute of Technology",
    date: "Jun 2016",
  },
  {
    id: "ihack-2016",
    icon: "💻",
    title: "Semi Finalist — iHack 2.0",
    issuer: "University of Colombo School of Computing",
    date: "Oct 2016",
  },
  {
    id: "creative-writing-2009",
    icon: "✍️",
    title: "District Champion — Creative Writing",
    issuer: "Kalutara Zone",
    date: "Jan 2009",
  },
]
