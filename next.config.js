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
        source: '/auth/login',
        destination: "https://api.mangadex.org/auth/login",
      },
      {
        source: '/user/me',
        destination: "https://api.mangadex.org/user/me",
      },
      {
        source: '/auth/refresh',
        destination: "https://api.mangadex.org/auth/refresh",
      },
      {
        source: '/auth/check',
        destination: "https://api.mangadex.org/auth/check",
      },
      {
        source: '/auth/logout',
        destination: "https://api.mangadex.org/auth/logout",
      },
      {
        source: '/manga/tag',
        destination: "https://api.mangadex.org/auth/logout",
      },
      {
        source: '/mangacover',
        destination: "https://api.mangadex.org/cover",
      },
      {
        source: '/image/:option/:mangaid/:filename',
        destination: "https://uploads.mangadex.org/:option/:mangaid/:filename",
      },
    ];
  }
}

module.exports = nextConfig
