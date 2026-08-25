import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import Analytics from '@/components/Analytics';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { SITE } from '@/lib/site';

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hanken-grotesk',
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-bricolage-grotesque',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://huitaipcb.com'),
  title: {
    default: 'PCB Assembly Services & PCBA Manufacturing in China | Huitai PCB',
    template: '%s',
  },
  description:
    'Huitai PCB provides PCBA manufacturing in China, including PCB fabrication, BOM sourcing, SMT and DIP assembly, programming, testing, and prototype-to-production delivery.',
  keywords: [
    'PCB assembly',
    'PCBA',
    'turnkey PCB',
    'SMT assembly',
    'PCB manufacturing',
    'Shenzhen PCB',
    'BOM sourcing',
    'Huitai PCB',
    'huitaipcb',
  ],
  authors: [{ name: SITE.brandName, url: SITE.url }],
  creator: SITE.brandName,
  publisher: SITE.brandName,
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
    siteName: SITE.brandName,
    title: 'Huitai PCB | PCB Assembly & PCBA Manufacturing',
    description:
      'Turnkey PCBA manufacturing support from Shenzhen, China, including PCB fabrication coordination, BOM sourcing, SMT assembly, DIP assembly, inspection, testing, and delivery.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Huitai PCB - PCB assembly and PCBA manufacturing in Shenzhen, China',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huitai PCB | PCB Assembly & PCBA Manufacturing',
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
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${bricolageGrotesque.variable} ${jetBrainsMono.variable} scroll-smooth`}
    >
    <body>
  <Analytics />
  {children}
  <FloatingWhatsApp />
</body>
    </html>
  );
}
