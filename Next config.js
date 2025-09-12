/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'yourcdn.com'], // Add external domains if using Image component
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000',
  },
};

module.exports = nextConfig;