import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://huitaipcb.com'),
  title: {
    default: 'Huitai Electronics | Turnkey PCB Assembly & Manufacturing - Shenzhen',
    template: '%s | Huitai Electronics',
  },
  description: 'Huitai Electronics provides turnkey PCB assembly, SMT, DIP, BOM sourcing and PCB manufacturing from Shenzhen, China. Fast turnaround, competitive pricing, ISO quality.',
  keywords: ['PCB assembly', 'PCBA', 'turnkey PCB', 'SMT assembly', 'PCB manufacturing', 'Shenzhen PCB', 'BOM sourcing', 'Huitai Electronics'],
  authors: [{ name: 'Huitai Electronics', url: 'https://huitaipcb.com' }],
  creator: 'Huitai Electronics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://huitaipcb.com',
    siteName: 'Huitai Electronics',
    title: 'Huitai Electronics | Turnkey PCB Assembly & Manufacturing',
    description: 'Professional turnkey PCB assembly services from Shenzhen, China.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Huitai Electronics - Turnkey PCB Assembly' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huitai Electronics | Turnkey PCB Assembly',
    description: 'Professional PCB assembly services from Shenzhen China',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://huitaipcb.com/' },
};
