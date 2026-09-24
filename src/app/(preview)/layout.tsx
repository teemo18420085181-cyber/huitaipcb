import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../globals.css';

const bodyFont = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--font-hanken-grotesk' });
const displayFont = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--font-bricolage-grotesque' });
const monoFont = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'Huitai V3 — Local Design System Preview',
  robots: { index: false, follow: false },
};

// Separate root layout: no analytics, inquiry form, or floating production contacts.
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
