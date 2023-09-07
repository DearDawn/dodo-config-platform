/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'dodo-config-platform-v0'
  },
  pageExtensions: ['page.ts', 'page.tsx'],
  env: {
    // Inject process.env.BUILD_ID which is then added to the <body>
    BUILD_ID: 'dodo-config-platform-v0',
  },
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
}

module.exports = nextConfig
