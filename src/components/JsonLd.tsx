import { PCBA_SERVICES, SITE } from '@/lib/site';

export default function JsonLd() {
  const organizationSchema = {
    '@type': 'Organization',
    '@id': SITE.organizationId,
    name: SITE.brandName,
    alternateName: SITE.shortName,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    logo: {
      '@type': 'ImageObject',
      url: SITE.logoUrl,
      width: 512,
      height: 512,
    },
    description:
      'Huitai PCB is a China-based PCBA manufacturing supplier for PCB assembly, BOM sourcing, SMT and through-hole assembly, programming, testing, and prototype-to-production delivery.',
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      ...SITE.address,
    },
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
