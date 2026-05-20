import type { Metadata } from 'next';
import './globals.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import JsonLd from '../components/JsonLd';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://huitaipcb.com'),
  title: {
    default: 'PCB Assembly Services & Turnkey PCBA Manufacturing in China | Huitai Electronics',
    template: '%s | HuiTai PCB',
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
    'HuiTai Electronics',
    'huitaipcb',
  ],
  authors: [{ name: 'HuiTai Electronics', url: 'https://huitaipcb.com' }],
  creator: 'HuiTai Electronics',
  publisher: 'HuiTai Electronics',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://huitaipcb.com',
    siteName: 'HuiTai PCB',
    title: 'HuiTai Electronics | Turnkey PCB Assembly & Manufacturing',
    description:
      'Professional turnkey PCB assembly services from Shenzhen, China. SMT, DIP, BOM sourcing and full PCB manufacturing with fast turnaround.',
    images: [
      {
        url: '/logo.svg',
        width: 800,
        height: 800,
        alt: 'HuiTai Electronics - PCB & PCBA Manufacturing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HuiTai Electronics | Turnkey PCB Assembly & Manufacturing',
    description:
      'Professional turnkey PCB assembly services from Shenzhen, China.',
    images: ['/logo.svg'],
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
</body>
    </html>
  );
}
