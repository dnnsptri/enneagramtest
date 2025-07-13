/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // In productie gebruiken we ingebouwde Next.js API routes in plaats van de Express server
};

module.exports = nextConfig;