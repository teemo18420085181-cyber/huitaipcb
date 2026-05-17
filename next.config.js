/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: false,
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;