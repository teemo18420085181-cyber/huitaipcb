import type { Metadata } from 'next';
import './globals.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import JsonLd from '../components/JsonLd';
import Analytics from '@/components/Analytics';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL('https://huitaipcb.com'),
  title: {
    default: 'PCB Assembly Services & Turnkey PCBA Manufacturing in China | Huitai Electronics',
    template: '%s',
  },
  description:
    'Huitai Electronics provides PCB assembly services and turnkey PCBA manufacturing in China, including PCB fabrication, component sourcing, SMT assembly, DIP assembly, functional testing, final assembly, and global delivery.',
  keywords: [
    'PCB assembly',
    'PCBA',
    'turnkey PCB',
    'SMT assembly',
    'PCB manufacturing',
    'Shenzhen PCB',
    'BOM sourcing',
    'Huitai Electronics',
    'huitaipcb',
  ],
  authors: [{ name: 'Huitai Electronics', url: 'https://huitaipcb.com' }],
  creator: 'Huitai Electronics',
  publisher: 'Huitai Electronics',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://huitaipcb.com',
    siteName: 'Huitai Electronics',
    title: 'Huitai Electronics | Turnkey PCB Assembly & Manufacturing',
    description:
      'Turnkey PCBA manufacturing support from Shenzhen, China, including PCB fabrication coordination, BOM sourcing, SMT assembly, DIP assembly, inspection, testing, and delivery.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Huitai Electronics - Turnkey PCB & PCBA Manufacturing in Shenzhen, China',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huitai Electronics | Turnkey PCB Assembly & Manufacturing',
    description:
      'Turnkey PCBA manufacturing support from Shenzhen, China.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://huitaipcb.com/',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
    <body>
  <Analytics />
  <JsonLd />
  {children}
  <FloatingWhatsApp />
</body>
    </html>
  );
}
