/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      enabled: false
    }
  },
  reactStrictMode: true
}

module.exports = nextConfig