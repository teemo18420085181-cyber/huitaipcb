import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import V3HowWeWork from '@/components/v2/V3HowWeWork';

export const metadata: Metadata = { title: 'How We Work With Overseas PCBA Buyers — V3 Preview' };

export default function WorkflowPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <V3HowWeWork preview />;
}
