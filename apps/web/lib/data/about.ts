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
    logoUrl: "/images/companies/wso2.png",
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
    logoUrl: "/images/companies/zone24x7.png",
    location: "Sri Lanka",
    roles: [
      { title: "Trainee Associate Software Engineer", period: "Jul 2017 – Jul 2018" },
    ],
  },
  {
    id: "bp",
    company: "BP",
    logoUrl: "/images/companies/bp.svg",
    location: "Sidcup, London",
    roles: [
      { title: "Customer Service Assistant", period: "Dec 2013 – Dec 2015" },
    ],
  },
  {
    id: "kfc",
    company: "KFC UK & Ireland",
    logoUrl: "/images/companies/kfc.svg",
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
      { url: "/images/travel/uk-01.jpg", alt: "United Kingdom" },
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
    images: [],
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
      { url: "/images/travel/taiwan-01.jpg", alt: "Taiwan" },
      { url: "/images/travel/taiwan-02.jpg", alt: "Taiwan" },
      { url: "/images/travel/taiwan-03.jpg", alt: "Taiwan" },
      { url: "/images/travel/taiwan-04.jpg", alt: "Taiwan" },
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
      { url: "/images/travel/uae-01.jpg", alt: "UAE" },
      { url: "/images/travel/uae-02.jpg", alt: "UAE" },
      { url: "/images/travel/uae-03.jpg", alt: "UAE" },
      { url: "/images/travel/uae-04.jpg", alt: "UAE" },
      { url: "/images/travel/uae-05.jpg", alt: "UAE" },
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
