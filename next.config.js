/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/discover',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
