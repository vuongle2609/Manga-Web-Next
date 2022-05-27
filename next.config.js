/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/discover',
        permanent: true,
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: '/mangaapi',
        destination: "https://api.mangadex.org/manga",
      },
      {
        source: '/mangacover',
        destination: "https://api.mangadex.org/cover",
      },
    ];
  }
}

module.exports = nextConfig
