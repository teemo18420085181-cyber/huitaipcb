import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.huitaipcb.com'),
  title: {
    default: 'HuiTai Electronics | Turnkey PCB Assembly & Manufacturing - Shenzhen',
    template: '%s | HuiTai PCB',
  },
  description: 'HuiTai Electronics provides turnkey PCB assembly, SMT, DIP, BOM sourcing and PCB manufacturing from Shenzhen, China. Fast turnaround, competitive pricing, ISO quality.',
  keywords: ['PCB assembly', 'PCBA', 'turnkey PCB', 'SMT assembly', 'PCB manufacturing', 'Shenzhen PCB', 'BOM sourcing', 'HuiTai Electronics', 'huitaipcb'],
  authors: [{ name: 'HuiTai Electronics', url: 'https://www.huitaipcb.com' }],
  creator: 'HuiTai Electronics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.huitaipcb.com',
    siteName: 'HuiTai PCB',
    title: 'HuiTai Electronics | Turnkey PCB Assembly & Manufacturing',
    description: 'Professional turnkey PCB assembly services from Shenzhen, China. SMT, DIP, BOM sourcing and full PCB manufacturing with fast turnaround.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.huitaipcb.com' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
