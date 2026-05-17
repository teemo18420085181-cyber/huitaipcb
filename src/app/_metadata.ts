import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://www.huitaipcb.com'),
  title: {
    default: 'HuiTai Electronics | Turnkey PCB Assembly & Manufacturing - Shenzhen',
    template: '%s | HuiTai PCB',
  },
  description: 'HuiTai Electronics provides turnkey PCB assembly, SMT, DIP, BOM sourcing and PCB manufacturing from Shenzhen, China. Fast turnaround, competitive pricing, ISO quality.',
  keywords: ['PCB assembly', 'PCBA', 'turnkey PCB', 'SMT assembly', 'PCB manufacturing', 'Shenzhen PCB', 'BOM sourcing', 'HuiTai Electronics'],
  authors: [{ name: 'HuiTai Electronics', url: 'https://www.huitaipcb.com' }],
  creator: 'HuiTai Electronics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.huitaipcb.com',
    siteName: 'HuiTai PCB',
    title: 'HuiTai Electronics | Turnkey PCB Assembly & Manufacturing',
    description: 'Professional turnkey PCB assembly services from Shenzhen, China.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HuiTai Electronics - Turnkey PCB Assembly' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HuiTai Electronics | Turnkey PCB Assembly',
    description: 'Professional PCB assembly services from Shenzhen China',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.huitaipcb.com' },
};
