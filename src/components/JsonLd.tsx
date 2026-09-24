import { PCBA_SERVICES, SITE } from '@/lib/site';

export default function JsonLd() {
  const organizationSchema = {
    '@type': 'Organization',
    '@id': SITE.organizationId,
    name: SITE.brandName,
    alternateName: SITE.shortName,
    url: `${SITE.url}/`,
    logo: {
      '@type': 'ImageObject',
      url: SITE.logoUrl,
      width: 512,
      height: 512,
    },
    description:
      'Huitai PCB provides one-stop PCBA manufacturing in Shenzhen, with direct manufacturing review from PCB fabrication and BOM sourcing through assembly and project-defined testing.',
    email: SITE.email,
    knowsAbout: PCBA_SERVICES,
  };

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': SITE.websiteId,
    url: `${SITE.url}/`,
    name: SITE.brandName,
    alternateName: SITE.shortName,
    description: 'PCBA manufacturing in China for overseas B2B buyers, from PCB fabrication and BOM sourcing through assembly, testing, and production delivery.',
    publisher: {
      '@id': SITE.organizationId,
    },
    inLanguage: 'en-US',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
