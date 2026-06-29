export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://huitaipcb.com/#organization',
    name: 'Huitai Electronics',
    alternateName: 'Huitai PCBA',
    legalName: 'Shenzhen Huitai Electronics Technology Co., Ltd.',
    url: 'https://huitaipcb.com/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://huitaipcb.com/icon.png',
      width: 512,
      height: 512,
    },
    description:
      'Huitai Electronics is a China-based turnkey PCBA manufacturer supporting PCB fabrication, BOM sourcing, SMT and through-hole (DIP) assembly, testing support, and finished PCBA delivery.',
    email: 'sales@huitaipcb.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building D, 4F, Zhaochang Industrial Park, Gonghe Industrial Road, Shajing',
      addressLocality: "Bao'an District",
      addressRegion: 'Shenzhen',
      addressCountry: 'CN',
    },
    sameAs: [
      'https://www.crunchbase.com/organization/huitai-electronics',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://huitaipcb.com/#website',
    url: 'https://huitaipcb.com/',
    name: 'Huitai Electronics',
    alternateName: [
      'Huitai PCBA',
      'Huitai Electronics PCBA',
    ],
    description: 'China-based turnkey PCBA manufacturer supporting PCB fabrication, BOM sourcing, SMT and through-hole (DIP) assembly, testing support, and finished PCBA delivery.',
    publisher: {
      '@id': 'https://huitaipcb.com/#organization',
    },
    inLanguage: 'en-US',
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://huitaipcb.com/#localbusiness',
    name: 'Huitai Electronics',
    alternateName: 'Huitai PCBA',
    legalName: 'Shenzhen Huitai Electronics Technology Co., Ltd.',
    image: 'https://huitaipcb.com/icon.png',
    url: 'https://huitaipcb.com/',
    email: 'sales@huitaipcb.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building D, 4F, Zhaochang Industrial Park, Gonghe Industrial Road, Shajing',
      addressLocality: "Bao'an District",
      addressRegion: 'Shenzhen',
      addressCountry: 'CN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: 'Worldwide',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Turnkey PCBA Manufacturing',
    provider: {
      '@id': 'https://huitaipcb.com/#organization',
    },
    areaServed: 'Worldwide',
    serviceType: 'Turnkey PCBA manufacturing service',
    description:
      'China-based turnkey PCBA manufacturing support including PCB fabrication, BOM sourcing, SMT and through-hole (DIP) assembly, testing support, and finished PCBA delivery.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PCB & PCBA Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PCB Fabrication',
            description: 'PCB fabrication support coordinated according to project materials, stack-up, and technical requirements',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SMT Assembly',
            description: 'SMT assembly coordinated according to the confirmed component, placement, and process requirements',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'BOM Sourcing',
            description: 'BOM review, sourcing coordination, and customer-approved alternative component options',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Testing Support and Finished PCBA Delivery',
            description: 'Inspection, testing support, documentation, packaging, and finished PCBA delivery according to the agreed project scope',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
