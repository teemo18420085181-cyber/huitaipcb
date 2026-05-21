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
        source: '/knowledge/prepare-gerber-bom-files-pcb-assembly',
        destination: 'https://huitaipcb.com/knowledge/pcb-assembly-file-preparation-guide',
        statusCode: 301,
      },
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
