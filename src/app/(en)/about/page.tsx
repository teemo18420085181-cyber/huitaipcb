import type { Metadata } from 'next';
import V3About from '@/components/v2/V3About';
import WebsiteFrame from '@/components/v2/WebsiteFrame';
import { PCBA_SERVICES, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Huitai PCB | PCBA Manufacturing Supplier in China',
  description:
    'Learn how Huitai PCB supports overseas B2B teams with PCB assembly, SMT, BOM sourcing, testing, programming, and prototype-to-production PCBA manufacturing.',
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: 'About Huitai PCB | PCBA Manufacturing Supplier in China',
    description:
      'PCBA manufacturing support for existing electronics designs, from file review and sourcing through assembly, testing, and production delivery.',
    url: `${SITE.url}/about`,
    siteName: SITE.brandName,
  },
};

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE.organizationId,
    name: SITE.brandName,
    alternateName: SITE.shortName,
    url: `${SITE.url}/`,
    logo: SITE.logoUrl,
    email: SITE.email,
    description:
      'A China-based PCBA manufacturing supplier supporting PCB assembly, SMT and DIP assembly, BOM sourcing, programming, testing, and prototype-to-production delivery.',
    knowsAbout: PCBA_SERVICES,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'About Huitai PCB', item: `${SITE.url}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WebsiteFrame preview={false}><V3About /></WebsiteFrame>
    </>
  );
}
