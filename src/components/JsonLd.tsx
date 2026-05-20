export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://huitaipcb.com/#organization',
    name: 'HuiTai Electronics',
    alternateName: 'OneStopPCBA',
    url: 'https://huitaipcb.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://huitaipcb.com/logo.svg',
      width: 800,
      height: 800,
    },
    description:
      'HuiTai Electronics is a turnkey PCB and PCBA manufacturer in Shenzhen, China, providing PCB fabrication, SMT assembly, BOM sourcing, and box build services with fast turnaround and ISO quality.',
    foundingDate: '2010',
    email: 'teemo18420085181@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building D, 4F, Zhaochang Industrial Park, Gonghe Industrial Road, Shajing',
      addressLocality: "Bao'an District",
      addressRegion: 'Shenzhen',
      addressCountry: 'CN',
    },
    sameAs: [
      'https://huitaipcb.com',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://huitaipcb.com/#website',
    url: 'https://huitaipcb.com',
    name: 'HuiTai PCB',
    description: 'Turnkey PCB Assembly & Manufacturing from Shenzhen, China',
    publisher: {
      '@id': 'https://huitaipcb.com/#organization',
    },
    inLanguage: 'en-US',
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://huitaipcb.com/#localbusiness',
    name: 'HuiTai Electronics',
    image: 'https://huitaipcb.com/logo.svg',
    url: 'https://huitaipcb.com',
    email: 'teemo18420085181@gmail.com',
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
    name: 'Turnkey PCB Assembly',
    provider: {
      '@id': 'https://huitaipcb.com/#organization',
    },
    areaServed: 'Worldwide',
    serviceType: 'PCB Manufacturing',
    description:
      'Full turnkey PCB and PCBA manufacturing including PCB fabrication, SMT assembly, DIP through-hole assembly, BOM sourcing, and box build services.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PCB & PCBA Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PCB Fabrication',
            description: '1-30 layer PCB manufacturing with FR4, Rogers, HDI, Rigid-flex, Aluminum MCPCB',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SMT Assembly',
            description: 'Surface-mount technology assembly with high precision pick-and-place machines',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'BOM Sourcing',
            description: 'Component sourcing review with alternatives checks and incoming component inspection options',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Box Build Assembly',
            description: 'Full product assembly including PCBA, enclosures, cables, and final testing',
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
