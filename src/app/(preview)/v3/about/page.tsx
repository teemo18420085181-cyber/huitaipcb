import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import V3About from '@/components/v2/V3About';

export const metadata: Metadata = { title: 'About Huitai PCB — V3 Preview' };

export default function AboutPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <V3About preview />;
}
