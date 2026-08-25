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
  metadataBase: new URL(SITE.url),
  title: { default: 'PCBA-Fertigung in China | Huitai PCB', template: '%s' },
  description:
    'PCBA-Fertigung in China mit PCB-Herstellung, BOM-Beschaffung, SMT-/DIP-Bestückung, Prüfung und Lieferung für internationale B2B-Projekte.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  authors: [{ name: SITE.brandName, url: SITE.url }],
  creator: SITE.brandName,
  publisher: SITE.brandName,
  openGraph: { type: 'website', locale: 'de_DE', siteName: SITE.brandName },
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
  formatDetection: { telephone: false, email: false, address: false },
};

export default function GermanRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
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
