import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import V3Company from '@/components/v2/V3Company';

export const metadata: Metadata = { title: 'Company Verification — Huitai PCB V3 Preview' };

export default function CompanyPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <V3Company preview />;
}
