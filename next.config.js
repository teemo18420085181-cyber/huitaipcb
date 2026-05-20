/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.huitaipcb.com' }],
        destination: 'https://huitaipcb.com/:path*',
        statusCode: 301,
      },
    ];
  },
  serverExternalPackages: [],
};

module.exports = nextConfig;
