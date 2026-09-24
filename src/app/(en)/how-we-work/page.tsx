import type { Metadata } from 'next';
import V3HowWeWork, { workflowFaqs } from '@/components/v2/V3HowWeWork';
import WebsiteFrame from '@/components/v2/WebsiteFrame';
import { OG_IMAGES } from '@/lib/seo/og';
import { SITE } from '@/lib/site';

const pageUrl = `${SITE.url}/how-we-work`;

export const metadata: Metadata = {
  title: 'How We Work With Overseas PCBA Buyers',
  description:
    'Learn how Huitai works with overseas PCBA buyers from RFQ review, BOM checking and production updates to inspection, packing and shipment.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How We Work With Overseas PCBA Buyers',
    description:
      'Learn how Huitai works with overseas PCBA buyers from RFQ review, BOM checking and production updates to inspection, packing and shipment.',
    url: pageUrl,
    images: OG_IMAGES,
  },
};

export default function HowWeWorkPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How We Work With Overseas PCBA Buyers',
    description: metadata.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': SITE.websiteId },
    publisher: { '@id': SITE.organizationId },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: workflowFaqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'How We Work', item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WebsiteFrame preview={false}><V3HowWeWork /></WebsiteFrame>
    </>
  );
}
