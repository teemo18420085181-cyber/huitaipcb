import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const readOptional = (path) => (exists(path) ? read(path) : '');
const readEnglishRoute = (path) =>
  readOptional(`src/app/(en)/${path}`) || read(`src/app/${path}`);

const hero = read('src/components/Hero.tsx');
const homeFaq = read('src/components/HomeFaq.tsx');
const homePage = readEnglishRoute('page.tsx');
const inquiryForm = read('src/components/InquiryForm.tsx');
const brandLogo = read('src/components/BrandLogo.tsx');
const nav = read('src/components/Nav.tsx');
const footer = read('src/components/Footer.tsx');
const contactPage = readEnglishRoute('contact/page.tsx');
const homeApplications = read('src/components/HomeApplications.tsx');
const factoryGrid = read('src/components/FactoryGrid.tsx');
const qualityTesting = read('src/components/QualityTesting.tsx');
const floatingWhatsApp = read('src/components/FloatingWhatsApp.tsx');
const standardLogo = readOptional('public/logo.svg');
const darkLogo = readOptional('public/logo-dark.svg');
const layout = readOptional('src/app/(en)/layout.tsx') || read('src/app/layout.tsx');
const germanLayout = readOptional('src/app/de/layout.tsx');
const robots = read('src/app/robots.ts');
const sitemap = read('src/app/sitemap.ts');
const knowledgeArticlePage = readEnglishRoute('knowledge/[slug]/page.tsx');
const knowledgeIndexPage = readEnglishRoute('knowledge/page.tsx');
const siteConfig = readOptional('src/lib/site.ts');
const entityJsonLd = readOptional('src/components/JsonLd.tsx');
const serviceLandingPage = read('src/components/SeoLandingPage.tsx');
const aboutPage = readOptional('src/app/(en)/about/page.tsx') || readOptional('src/app/about/page.tsx');
const faqPage = readOptional('src/app/(en)/faq/page.tsx') || readOptional('src/app/faq/page.tsx');
const caseStudyPage =
  readOptional('src/app/(en)/case-study/page.tsx') || readOptional('src/app/case-study/page.tsx');
const articleMapper = read('src/lib/content/articles.ts');
const seoPages = read('src/lib/content/seoPages.ts');
const knowledge = read('src/lib/content/knowledge.ts');
const articles = read('src/lib/content/articles.ts');
const edgeAiSources = read(
  'public/images/knowledge/edge-ai-device-pcba-manufacturing/SOURCES.md',
);

const between = (source, start, end) => {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not isolate content between ${start} and ${end}`);
  }

  return source.slice(startIndex, endIndex);
};

const prototypePage = between(seoPages, "'prototype-pcb-assembly': {", "'turnkey-pcb-assembly': {");
const pcbAssemblyCompanyPage = between(
  seoPages,
  "'pcb-assembly-company': {",
  "'prototype-pcb-assembly': {",
);
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
      hero.includes('Get PCBA Manufacturing Quote') &&
      hero.includes('Need Engineering Support?') &&
      hero.includes('href="/contact#project-files"') &&
      hero.includes('Send Gerber &amp; BOM'),
    'Homepage must lead with the manufacturing quote CTA, keep engineering support secondary, and preserve the Gerber/BOM path.',
  ],
  [
    homeFaq.includes('Prepare Your PCBA RFQ') &&
      homeFaq.includes('href="/contact#project-files"') &&
      ['Gerber', 'BOM', 'pick-and-place', 'assembly drawing', 'quantity'].every((term) =>
        homeFaq.toLowerCase().includes(term.toLowerCase()),
      ) &&
      !homeFaq.includes('Ask about your project'),
    'Homepage FAQ must route buyers to a manufacturing RFQ built around the required production files and quantity.',
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
    footer.includes('Get a PCBA Manufacturing Quote') &&
      contactPage.includes('Request a PCBA Manufacturing Quote') &&
      inquiryForm.includes("submit: 'Get PCBA Manufacturing Quote'") &&
      floatingWhatsApp.includes("I'd like a PCBA manufacturing quote."),
    'Shared RFQ entry points must use manufacturing-first quote wording.',
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
    homePage.includes("title: 'Custom PCBA Manufacturer in China | Huitai PCB'") &&
      homePage.includes('prototype and small-batch production'),
    'Homepage metadata must use the approved Huitai PCB title and manufacturing description.',
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
      !layout.includes('<JsonLd />') &&
      homePage.includes('<JsonLd />') &&
      inquiryForm.includes("trackEvent('contact_form_submit'"),
    'Analytics and form tracking must remain wired while entity schema moves from the global layout to the homepage.',
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
    pcbAssemblyCompanyPage.includes("heading: 'PCB Assembly Manufacturer Evaluation Checklist'") &&
      pcbAssemblyCompanyPage.includes('A PCB assembly manufacturer should review'),
    'The most relevant service page must cover PCB Assembly Manufacturer naturally in an H2 and supporting copy.',
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
  [
    knowledge.includes("slug: 'pcba-component-shortage-2026'") &&
      knowledge.includes("title: '2026 Electronic Component Shortage: What PCBA Buyers Should Know'") &&
      knowledge.includes("publishedAt: '2026-07-30'") &&
      knowledge.includes(
        "metaDescription: 'How 2026 electronic component shortages affect PCBA BOM sourcing, lead times and pricing, and what buyers can do about unavailable or long-lead parts.'",
      ),
    'The 2026 PCBA component-shortage guide must preserve its approved URL, H1, publication date, and description.',
  ],
  [
    knowledge.includes("heading: 'What is happening to electronic component supply in 2026?'") &&
      knowledge.includes("heading: 'How Huitai handles BOM sourcing risk'") &&
      knowledge.includes('### Is there an electronic component shortage in 2026?') &&
      knowledge.includes('### When should components be purchased for a PCBA project?') &&
      knowledge.includes('](/knowledge/bom-alternatives-pcba-sourcing)') &&
      knowledge.includes('](/knowledge/bom-risk-alternative-component-sourcing)') &&
      knowledge.includes('](/contact#project-files)'),
    'The 2026 shortage guide must keep its buyer-focused sections, GEO FAQ, topic-cluster links, and file-review CTA.',
  ],
  [
    articles.includes(
      "'pcba-component-shortage-2026': '2026 PCBA Component Shortage: Lead Times, Supply & BOM Risk'",
    ) &&
      knowledge.includes('PCBA component shortage conditions in 2026') &&
      articles.includes("'pcba-component-shortage-2026',") &&
      articles.includes('publishedAt: article.publishedAt || null') &&
      articles.includes('entries.set(article.slug, article.updatedAt || article.publishedAt || null)'),
    'The 2026 shortage guide must preserve its distinct shortage intent, static-content override, Article date, and sitemap last-modified date.',
  ],
  [
    knowledgeArticlePage.includes('twitter: {') &&
      knowledgeArticlePage.includes("'@type': 'Article'") &&
      knowledgeArticlePage.includes("'@type': 'FAQPage'") &&
      knowledgeArticlePage.includes('datePublished: article.publishedAt || undefined') &&
      knowledgeArticlePage.includes('dateModified: article.updatedAt || undefined') &&
      knowledgeArticlePage.includes('Published') &&
      knowledgeArticlePage.includes('Updated'),
    'Knowledge articles must expose metadata, visible-content schema, and independent real publication/update dates.',
  ],
  [
    knowledge.includes("slug: 'edge-ai-device-pcba-manufacturing'") &&
      knowledge.includes(
        "title: 'Edge AI PCB Assembly: A Prototype-to-Low-Volume Manufacturing Checklist'",
      ) &&
      knowledge.includes("publishedAt: '2026-08-04'") &&
      knowledge.includes(
        "metaDescription:\n      'A practical edge AI PCB assembly checklist covering BOM risk, power design, thermal management, BGA assembly, programming, testing, and low-volume production.'",
      ),
    'The edge AI guide must preserve its approved slug, H1, publication date, and meta description.',
  ],
  [
    [
      '/images/knowledge/edge-ai-device-pcba-manufacturing/edge-ai-pcb-assembly-manufacturing.webp',
      '/images/knowledge/edge-ai-device-pcba-manufacturing/development-board-to-custom-pcba.webp',
      '/images/knowledge/edge-ai-device-pcba-manufacturing/edge-ai-pcba-bom-component-sourcing.webp',
      '/images/knowledge/edge-ai-device-pcba-manufacturing/bga-xray-inspection.webp',
      '/images/knowledge/edge-ai-device-pcba-manufacturing/edge-ai-pcba-power-thermal-management.webp',
      '/images/knowledge/edge-ai-device-pcba-manufacturing/edge-ai-pcba-programming-functional-testing.webp',
      '/images/knowledge/edge-ai-device-pcba-manufacturing/prototype-to-low-volume-pcba.webp',
    ].every((path) => exists(`public${path}`) && (knowledge.includes(path) || articles.includes(path))) &&
      edgeAiSources.includes('All seven AI-generated files require their illustrative captions when used.'),
    'The edge AI article must reference all seven reviewed illustrations and retain the internal source guardrails.',
  ],
  [
    articles.includes(
      "'edge-ai-device-pcba-manufacturing': 'Edge AI PCB Assembly: Prototype Manufacturing Checklist'",
    ) &&
      articles.includes("'edge-ai-device-pcba-manufacturing',") &&
      knowledgeArticlePage.includes('priority={priority}') &&
      knowledgeArticlePage.includes('width={1600}') &&
      knowledgeArticlePage.includes('article.cta.primary.label'),
    'The edge AI guide must use the approved SEO title, static override, responsive images, priority cover, and article CTA.',
  ],
  [
    !knowledgeIndexPage.includes('Surface finish comparison: HASL vs ENIG vs OSP'),
    'Published surface-finish content must not remain in the Knowledge Base coming-soon list.',
  ],
  [
    siteConfig.includes("brandName: 'Huitai PCB'") &&
      siteConfig.includes("shortName: 'Huitai'") &&
      siteConfig.includes("legalName: 'Shenzhen Huitai Electronics Technology Co., Ltd.'") &&
      siteConfig.includes("organizationId: 'https://huitaipcb.com/#organization'"),
    'Brand, legal name, and canonical organization ID must come from one site entity configuration.',
  ],
  [
    entityJsonLd.includes("'@type': 'Organization'") &&
      entityJsonLd.includes("'@type': 'WebSite'") &&
      !entityJsonLd.includes("'@type': 'LocalBusiness'") &&
      !entityJsonLd.includes("serviceSchema"),
    'Homepage entity schema must contain only the verified Organization and WebSite entities.',
  ],
  [
    serviceLandingPage.includes("provider: { '@id': SITE.organizationId }") &&
      !serviceLandingPage.includes("provider: {\n      '@type': 'Organization'"),
    'Service schema must reference the single organization ID instead of redefining the company entity.',
  ],
  [
    aboutPage.includes('About Huitai PCB') &&
      aboutPage.includes('{SITE.legalName}') &&
      aboutPage.includes('PCB Assembly') &&
      aboutPage.includes('SMT Assembly') &&
      aboutPage.includes('BOM Sourcing') &&
      aboutPage.includes('aria-label="About Huitai PCB trust navigation"') &&
      aboutPage.includes("href: '/how-we-work'") &&
      aboutPage.includes("href: '/quality'") &&
      aboutPage.includes("href: '/contact'") &&
      !aboutPage.includes('ISO 9001') &&
      !aboutPage.includes('founded in'),
    'About must provide manufacturing trust navigation without unsupported certifications or founding claims.',
  ],
  [
    faqPage.includes("'@type': 'FAQPage'") &&
      faqPage.includes('Gerber files') &&
      faqPage.includes('BOM') &&
      faqPage.includes('pick-and-place') &&
      faqPage.includes('assembly drawing') &&
      faqPage.includes('sample') &&
      !faqPage.includes('Tell us your idea'),
    'Procurement FAQ must qualify projects through manufacturing files and samples, not idea-led product development.',
  ],
  [
    caseStudyPage.includes('PCBA Manufacturing Case Studies') &&
      caseStudyPage.includes('Verified manufacturing cases will be added progressively.') &&
      caseStudyPage.includes('Project Overview') &&
      caseStudyPage.includes('Manufacturing Process') &&
      !caseStudyPage.includes('Smart Pill Bottle'),
    'Case Study must use the manufacturing-case positioning while publishing no unconfirmed customer project.',
  ],
  [
    articleMapper.includes('updatedAt: string | null') &&
      articleMapper.includes('updatedAt: getVerifiedUpdatedAt(article.published_at, article.updated_at)') &&
      articleMapper.includes("authorUrl: '/about#engineering-support'") &&
      articleMapper.includes("reviewedBy: 'Huitai Engineering Team'"),
    'Knowledge mapping must preserve CMS update timestamps and expose accountable author/reviewer links.',
  ],
  [
    germanLayout.includes('<html') &&
      germanLayout.includes('lang="de"') &&
      germanLayout.includes('<Footer') === false,
    'German routes must render from a true German root document with lang="de".',
  ],
  [
    sitemap.includes("'/about'") && sitemap.includes("'/faq'") && sitemap.includes("'/case-study'") &&
      footer.includes("href: '/about'") && footer.includes("href: '/faq'") && footer.includes("href: '/case-study'"),
    'About, FAQ, and Case Study hubs must be discoverable through the sitemap and footer.',
  ],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  console.error(`SEO regression checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO regression checks passed (${checks.length}).`);
