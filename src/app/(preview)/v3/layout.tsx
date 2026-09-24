import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WebsiteFrame from '@/components/v2/WebsiteFrame';

export const metadata: Metadata = {
  title: 'Huitai PCB V3 — Website Preview',
  robots: { index: false, follow: false },
};

export default function PreviewWebsiteLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <WebsiteFrame>{children}</WebsiteFrame>;
}
