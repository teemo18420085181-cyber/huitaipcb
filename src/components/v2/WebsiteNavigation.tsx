'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function WebsiteNavigation({ preview = true }: { preview?: boolean }) {
  const pathname = usePathname();
  const homeHref = preview ? '/v3' : '/';
  const workflowHref = preview ? '/v3/how-we-work' : '/how-we-work';
  const aboutHref = preview ? '/v3/about' : '/about';
  const companyHref = preview ? '/v3/company' : '/company-verification';
  return (
    <Navigation homeHref={homeHref} quoteHref="/contact#quote-form" uploadHref="/contact#project-files" trackClicks={!preview} mobileMenuQuote={!preview}
      languages={preview ? [] : [{ label: 'EN', href: '/', lang: 'en', active: true }, { label: 'DE', href: '/de', lang: 'de' }]}
      items={[
        { label: 'Manufacturing', href: `${homeHref}#manufacturing` },
        { label: 'How we work', href: workflowHref, active: pathname === workflowHref },
        { label: 'Quality', href: `${homeHref}#quality` },
        { label: 'About', href: aboutHref, active: pathname === aboutHref },
        { label: 'Company', href: companyHref, active: pathname === companyHref },
      ]} />
  );
}
