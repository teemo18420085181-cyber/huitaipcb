import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const readOptional = (path) => (exists(path) ? read(path) : '');

const hero = read('src/components/Hero.tsx');
const homePage = read('src/app/page.tsx');
const inquiryForm = read('src/components/InquiryForm.tsx');
const brandLogo = read('src/components/BrandLogo.tsx');
const nav = read('src/components/Nav.tsx');
const footer = read('src/components/Footer.tsx');
const contactPage = read('src/app/contact/page.tsx');
const homeApplications = read('src/components/HomeApplications.tsx');
const factoryGrid = read('src/components/FactoryGrid.tsx');
const qualityTesting = read('src/components/QualityTesting.tsx');
const floatingWhatsApp = read('src/components/FloatingWhatsApp.tsx');
const standardLogo = readOptional('public/logo.svg');
const darkLogo = readOptional('public/logo-dark.svg');
const layout = read('src/app/layout.tsx');
const robots = read('src/app/robots.ts');
const sitemap = read('src/app/sitemap.ts');
const seoPages = read('src/lib/content/seoPages.ts');
const knowledge = read('src/lib/content/knowledge.ts');
const articles = read('src/lib/content/articles.ts');

const between = (source, start, end) => {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not isolate content between ${start} and ${end}`);
  }

  return source.slice(startIndex, endIndex);
};

const prototypePage = between(seoPages, "'prototype-pcb-assembly': {", "'turnkey-pcb-assembly': {");
const turnkeyPage = between(seoPages, "'turnkey-pcb-assembly': {", "'pcb-fabrication-and-assembly': {");
const jlcpcbArticle = between(
  knowledge,
  "slug: 'jlcpcb-alternatives-turnkey-pcba'",
  "slug: 'china-pcb-assembly-online-quote-accuracy'",
);

const checks = [
  [
    /<h1[^>]*>\s*Turnkey PCBA Manufacturer in Shenzhen, China\s*<\/h1>/.test(hero),
    'Homepage H1 must state the Shenzhen turnkey PCBA manufacturer positioning.',
  ],
  [
    hero.includes(
      'PCB fabrication, BOM sourcing, SMT and through-hole assembly, testing and',
    ) && hero.includes('finished PCBA delivery—from prototype to production.'),
    'Homepage hero must describe the complete prototype-to-production service range.',
  ],
  [
    hero.includes('Prototype orders from 5 sets'),
    'Homepage hero must state the confirmed 5-set prototype starting quantity.',
  ],
  [
    hero.includes('href="/contact#quote-form"') &&
      hero.includes('Request a PCBA Quote') &&
      hero.includes('href="/contact#project-files"') &&
      hero.includes('Send Gerber &amp; BOM') &&
      hero.includes('href="/capabilities"'),
    'Homepage CTAs must keep real quote, file, and capabilities destinations.',
  ],
  [
    nav.includes("import BrandLogo from '@/components/BrandLogo'") &&
      footer.includes("import BrandLogo from '@/components/BrandLogo'") &&
      nav.includes('<BrandLogo') &&
      footer.includes('<BrandLogo') &&
      brandLogo.includes('src="/logo-dark.svg"') &&
      standardLogo.includes('fill="#27215b"') &&
      darkLogo.includes('fill="#f4efe6"') &&
      !standardLogo.includes('class="background"') &&
      !darkLogo.includes('class="background"') &&
      !footer.includes('>\n                HT\n              <'),
    'Header and footer must share the transparent dark-background logo while the standard logo remains suitable for structured data.',
  ],
  [
    footer.includes('Request a Turnkey PCBA Quote') &&
      contactPage.includes('Request a Turnkey PCBA Quote') &&
      inquiryForm.includes("submit: 'Request a Turnkey PCBA Quote'") &&
      floatingWhatsApp.includes("I'd like a turnkey PCBA quote."),
    'Shared full-scope RFQ entry points must use turnkey PCBA quote wording.',
  ],
  [
    [
      '/images/homepage/applications/industrial-control.webp',
      '/images/homepage/applications/iot-connected-devices.webp',
      '/images/homepage/applications/power-electronics.webp',
      '/images/homepage/applications/consumer-electronics.webp',
      '/images/homepage/applications/medical-monitoring.webp',
      '/images/homepage/applications/test-measurement.webp',
    ].every((path) => homeApplications.includes(path) && exists(`public${path}`)) &&
      homeApplications.includes('sm:grid-cols-2 xl:grid-cols-3'),
    'Homepage application cards must use the reviewed images and the 1/2/3-column responsive layout.',
  ],
  [
    [
      '/images/homepage/manufacturing/smt-assembly-line.webp',
      '/images/homepage/manufacturing/manual-through-hole-assembly.webp',
      '/images/homepage/manufacturing/aoi-inspection-review.webp',
      '/images/homepage/manufacturing/x-ray-pcba-inspection.webp',
      '/images/homepage/manufacturing/finished-pcba-batch.webp',
      '/images/homepage/manufacturing/anti-static-packing.webp',
    ].every((path) => factoryGrid.includes(path) && exists(`public${path}`)) &&
      hero.includes('/images/homepage/manufacturing/hero-inspection-line.webp') &&
      exists('public/images/homepage/manufacturing/hero-inspection-line.webp') &&
      qualityTesting.includes('/images/homepage/manufacturing/microscope-pcba-inspection.webp') &&
      exists('public/images/homepage/manufacturing/microscope-pcba-inspection.webp'),
    'Homepage production imagery must cover the reviewed one-stop PCBA manufacturing scope without repeats.',
  ],
  [
    homePage.includes("title: 'Turnkey PCBA Manufacturer in China | HuitaiPCB'"),
    'Homepage metadata title must match the approved turnkey PCBA positioning.',
  ],
  [
    !homePage.includes('<FeedbackBoard />'),
    'Homepage must not load the interactive feedback board in the conversion path.',
  ],
  [
    inquiryForm.includes("email: 'Work Email *'") &&
      inquiryForm.includes("projectType: 'Project Stage'") &&
      inquiryForm.includes('name="email"') &&
      inquiryForm.includes('name="company"') &&
      inquiryForm.includes('name="quantity"') &&
      inquiryForm.includes('name="project_type"') &&
      inquiryForm.includes('name="message"') &&
      inquiryForm.includes('type="file"') &&
      inquiryForm.includes("formData.append('files', f)"),
    'RFQ form must surface work email and project stage fields.',
  ],
  [
    homePage.includes("canonical: absoluteUrl('/')") &&
      homePage.includes("languages: getLanguageAlternates('/')"),
    'Homepage must preserve canonical and language alternates.',
  ],
  [
    layout.includes('<Analytics />') &&
      layout.includes('<JsonLd />') &&
      inquiryForm.includes("trackEvent('contact_form_submit'"),
    'Analytics, structured data, and successful form tracking must remain wired.',
  ],
  [
    robots.includes("sitemap: 'https://huitaipcb.com/sitemap.xml'") &&
      sitemap.includes("'/contact'") &&
      sitemap.includes("'/turnkey-pcb-assembly'"),
    'Robots and sitemap infrastructure must preserve important public routes.',
  ],
  [
    prototypePage.includes("seoTitle: 'Prototype PCB Assembly China | 5-Piece Builds & BOM Review'"),
    'Prototype SEO title must lead with the 5-piece differentiator.',
  ],
  [
    prototypePage.includes('starting from 5 assembled boards'),
    'Prototype copy must state the factual starting quantity.',
  ],
  [
    prototypePage.includes("href: '/knowledge/jlcpcb-alternatives-turnkey-pcba'"),
    'Prototype page must link to the comparison guide.',
  ],
  [
    turnkeyPage.includes("seoTitle: 'Turnkey PCB Assembly China | Gerber, BOM, SMT & Testing'"),
    'Turnkey SEO title must describe the full workflow.',
  ],
  [
    turnkeyPage.includes("heading: 'One Accountable Workflow from RFQ to Delivery'"),
    'Turnkey page must explain its distinct end-to-end intent.',
  ],
  [
    !turnkeyPage.includes("href: '/china-pcb-assembly'") &&
      !turnkeyPage.includes("href: '/china-pcba-manufacturer'"),
    'Turnkey page must not point users to overlapping generic China-PCBA landing pages.',
  ],
  [
    jlcpcbArticle.includes("title: 'JLCPCB Alternatives for Custom BOM & Low-Volume PCBA (2026)'"),
    'JLCPCB article title must match custom-BOM and low-volume intent.',
  ],
  [
    jlcpcbArticle.includes("heading: 'Decision checklist for custom BOM projects'"),
    'JLCPCB article must include the decision checklist.',
  ],
  [
    jlcpcbArticle.includes('](/contact#project-files)'),
    'JLCPCB article CTA must open the project-file section.',
  ],
  [
    articles.includes("'jlcpcb-alternatives-turnkey-pcba',"),
    'Optimized JLCPCB static content must override any stale CMS copy.',
  ],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  console.error(`SEO regression checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO regression checks passed (${checks.length}).`);
