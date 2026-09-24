import V3Home, { homeFaqs } from '@/components/v2/V3Home';
import WebsiteFrame from '@/components/v2/WebsiteFrame';
import JsonLd from '@/components/JsonLd';
import { OG_IMAGES } from '@/lib/seo/og';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';

export const metadata = {
  title: 'Custom PCBA Manufacturer | Prototype to Production | Huitai PCB',
  description:
    'Huitai PCB provides custom PCBA manufacturing for hardware teams, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and repeat production.',
  alternates: {
    canonical: absoluteUrl('/'),
    languages: getLanguageAlternates('/'),
  },
  openGraph: {
    title: 'Custom PCBA Manufacturer | Prototype to Production | Huitai PCB',
    description:
      'Huitai PCB provides custom PCBA manufacturing for hardware teams, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and repeat production.',
    url: absoluteUrl('/'),
    siteName: 'Huitai PCB',
    images: OG_IMAGES,
  },
};

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  return (
    <>
      <JsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WebsiteFrame preview={false}><V3Home /></WebsiteFrame>
    </>
  );
}
