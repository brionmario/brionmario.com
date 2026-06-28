import type { Metadata } from "next"
import localFont from "next/font/local"
import { Geist_Mono, Noto_Sans, Space_Grotesk } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/nav/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { cn } from "@workspace/ui/lib/utils"

const goodBrush = localFont({
  src: "../fonts/good-brush.woff",
  variable: "--font-brush",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Brion Mario",
    template: "%s | Brion Mario",
  },
  description:
    "Fullstack Engineer with 6+ years of experience building scalable, secure software. Open source contributor, speaker, and security researcher.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brionmario.com",
    siteName: "Brion Mario",
    title: "Brion Mario",
    description:
      "Fullstack Engineer. Open Source. Security Research.",
    images: [
      {
        url: "https://avatars.githubusercontent.com/brionmario?v=4&s=1200",
        width: 1200,
        height: 630,
        alt: "Brion Mario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brion Mario",
    description: "Fullstack Engineer. Open Source. Security Research.",
    creator: "@brion_mario",
  },
  icons: {
    icon: [
      { url: "/images/favicon-light/favicon-16x16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-light/favicon-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-dark/favicon-16x16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/images/favicon-dark/favicon-32x32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/images/favicon-light/apple-touch-icon.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-dark/apple-touch-icon.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  manifest: "/images/favicon-light/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geistMono.variable,
        notoSans.variable,
        spaceGrotesk.variable,
        goodBrush.variable
      )}
    >
      <body className="font-sans">
        <ThemeProvider>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
