import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import V3Home from '@/components/v2/V3Home';

export const metadata: Metadata = { title: 'PCBA Manufacturing — Huitai PCB V3 Preview' };

export default function HomepagePreview() {
  // Keep the leaf guarded: a layout 404 can still serialize child Flight data.
  if (process.env.NODE_ENV !== 'development') notFound();
  return <V3Home preview />;
}
