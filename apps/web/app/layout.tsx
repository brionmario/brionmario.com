import type { Metadata } from "next"
import { Geist_Mono, Noto_Sans, Space_Grotesk } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/nav/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { cn } from "@workspace/ui/lib/utils"

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
        spaceGrotesk.variable
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
