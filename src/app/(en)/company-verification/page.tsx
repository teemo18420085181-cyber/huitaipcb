import type { Metadata } from 'next';
import V3Company from '@/components/v2/V3Company';
import WebsiteFrame from '@/components/v2/WebsiteFrame';
import { SITE } from '@/lib/site';

const pageUrl = `${SITE.url}/company-verification`;

export const metadata: Metadata = {
  title: 'Company Verification | Huitai PCB',
  description:
    'See the customer-facing Huitai PCB brand, its current Shenzhen manufacturing entity, commercial entity, and confirmed manufacturing facility.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Company Verification | Huitai PCB',
    description:
      'See the manufacturing and commercial roles behind Huitai PCB and the current Shenzhen manufacturing facility.',
    url: pageUrl,
    siteName: SITE.brandName,
  },
};

export default function CompanyVerificationPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Company Verification', item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WebsiteFrame preview={false}><V3Company /></WebsiteFrame>
    </>
  );
}
