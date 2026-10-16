/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "brionmario.com" },
      { protocol: "https", hostname: "miro.medium.com" },
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async redirects() {
    // The section was renamed Publications -> Research; keep old links alive.
    return [
      { source: "/publications", destination: "/research", permanent: true },
      { source: "/publications/:id", destination: "/research/:id", permanent: true },
    ]
  },
}

export default nextConfig
