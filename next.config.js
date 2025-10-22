const nextConfig = {
  experimental: {
    appDir: true,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Service-Worker-Allowed', value: '/' },
      ],
    },
  ],
}

module.exports = nextConfig