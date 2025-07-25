/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
}

module.exports = nextConfig 