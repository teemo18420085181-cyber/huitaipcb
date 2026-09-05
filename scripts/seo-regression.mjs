import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const readOptional = (path) => (exists(path) ? read(path) : '');
const readEnglishRoute = (path) =>
  readOptional(`src/app/(en)/${path}`) || read(`src/app/${path}`);

const hero = read('src/components/Hero.tsx');
const homeAnswer = readOptional('src/components/HomeAnswer.tsx');
const trustStrip = read('src/components/TrustStrip.tsx');
const comparison = read('src/components/Comparison.tsx');
const processGrid = read('src/components/ProcessGrid.tsx');
const quoteFiles = readOptional('src/components/QuoteFiles.tsx');
const homeFaq = read('src/components/HomeFaq.tsx');
const homePage = readEnglishRoute('page.tsx');
const pcbAssemblyRoute = readEnglishRoute('pcb-assembly-services/page.tsx');
const prototypeRoute = readEnglishRoute('prototype-pcb-assembly/page.tsx');
const lowVolumeRoute = readEnglishRoute('low-volume-pcba-assembly/page.tsx');
const inquiryForm = read('src/components/InquiryForm.tsx');
const analytics = read('src/components/Analytics.tsx');
const inquiryRoute = read('src/app/api/inquiry/route.ts');
const serverAnalytics = read('src/lib/analytics/server.ts');
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

const compact = (source) => source.replace(/\s+/g, ' ');
const knowledgeArticle = (slug) => {
  const marker = `slug: '${slug}'`;
  const startIndex = knowledge.indexOf(marker);
  if (startIndex === -1) return '';

  const nextIndex = knowledge.indexOf("slug: '", startIndex + marker.length);
  return knowledge.slice(startIndex, nextIndex === -1 ? knowledge.length : nextIndex);
};

const prototypePage = between(seoPages, "'prototype-pcb-assembly': {", "'turnkey-pcb-assembly': {");
const pcbAssemblyServicesPage = between(
  seoPages,
  "'pcb-assembly-services': {",
  "'china-pcb-assembly': {",
);
const pcbAssemblyCompanyPage = between(
  seoPages,
  "'pcb-assembly-company': {",
  "'prototype-pcb-assembly': {",
);
const turnkeyPage = between(seoPages, "'turnkey-pcb-assembly': {", "'pcb-fabrication-and-assembly': {");
const lowVolumePage = between(
  seoPages,
  "'low-volume-pcba-assembly': {",
  "'bom-sourcing-pcb-assembly': {",
);
const jlcpcbArticle = between(
  knowledge,
  "slug: 'jlcpcb-alternatives-turnkey-pcba'",
  "slug: 'china-pcb-assembly-online-quote-accuracy'",
);
const bomBestPracticesArticle = knowledgeArticle('bom-best-practices');
const bomRiskArticle = knowledgeArticle('bom-risk-alternative-component-sourcing');
const bomAlternativesArticle = knowledgeArticle('bom-alternatives-pcba-sourcing');
const pcbaCostArticle = knowledgeArticle('how-much-does-pcba-assembly-cost');
const pcbAssemblyQuoteArticle = knowledgeArticle('what-determines-pcb-assembly-quote-china');
const pcbaQuotationChecklistArticle = knowledgeArticle('pcba-quotation-checklist');
const prototypeVsBatchArticle = knowledgeArticle('prototype-vs-batch-pcb-assembly');

const checks = [
  [
    /<h1[^>]*>[\s\S]*Custom PCBA Manufacturing for Prototype and Production[\s\S]*<\/h1>/.test(hero),
    'Homepage H1 must own the approved custom PCBA manufacturing intent.',
  ],
  [
    compact(hero).includes(
      'From PCB fabrication and BOM sourcing to SMT/DIP assembly, inspection, testing and',
    ) && compact(hero).includes('finished PCBA delivery, Huitai PCB supports custom electronics projects from first builds to repeat production.'),
    'Homepage hero must use the approved custom PCBA manufacturing description.',
  ],
  [
    hero.includes('Prototype builds from 5 assembled boards'),
    'Homepage hero must state the confirmed 5-set prototype starting quantity.',
  ],
  [
    hero.includes('href="/contact#quote-form"') &&
      hero.includes('Get PCBA Manufacturing Quote') &&
      hero.includes('href="/contact#project-files"') &&
      hero.includes('Send Gerber &amp; BOM'),
    'Homepage must preserve the manufacturing quote and Gerber/BOM conversion paths.',
  ],
  [
    compact(homeAnswer).includes('What Does Huitai PCB Provide?') &&
      compact(homeAnswer).includes('custom PCBA manufacturer') &&
      ['PCB fabrication', 'BOM sourcing', 'SMT', 'through-hole assembly', 'programming', 'AOI', 'X-ray', 'functional testing', 'repeat-production'].every((term) =>
        compact(homeAnswer).includes(term),
      ),
    'Homepage must provide an early answer-first entity and capability definition.',
  ],
  [
    trustStrip.includes('Custom PCBA Manufacturing Capabilities') &&
      [
        '/pcb-fabrication-and-assembly',
        '/bom-sourcing-pcb-assembly',
        '/pcb-assembly-services',
        '/pcba-testing-quality-control',
        '/turnkey-pcb-assembly',
      ].every((href) => trustStrip.includes(`href: '${href}'`)),
    'Homepage capabilities must act as a descriptive internal-link hub.',
  ],
  [
    comparison.includes('Choose the Right PCBA Manufacturing Path') &&
      comparison.includes('Prototype PCB Assembly') &&
      comparison.includes('Low-Volume PCBA Assembly') &&
      comparison.includes('Turnkey PCB Assembly') &&
      ['/prototype-pcb-assembly', '/low-volume-pcba-assembly', '/turnkey-pcb-assembly'].every(
        (href) => comparison.includes(`href: '${href}'`),
      ),
    'Homepage must offer distinct prototype, low-volume, and turnkey project paths.',
  ],
  [
    homePage.indexOf('<Comparison />') < homePage.indexOf('<ProcessGrid />'),
    'Homepage must present the project-path decision before the manufacturing workflow.',
  ],
  [
    processGrid.includes('How a Custom PCBA Project Moves From Files to Production') &&
      ['Review Gerber & BOM', 'Confirm Build Scope', 'Fabricate PCB', 'Assemble SMT & DIP', 'Inspect & Test', 'Pack & Deliver'].every(
        (step) => processGrid.includes(step),
      ),
    'Homepage workflow must use the approved six-stage custom PCBA language.',
  ],
  [
    factoryGrid.includes('Inside Our PCBA Manufacturing Process'),
    'Homepage manufacturing proof must use the approved evidence-led heading.',
  ],
  [
    quoteFiles.includes('What Files Do You Need for a PCBA Quote?') &&
      ['Gerber', 'BOM + MPN', 'CPL', 'Assembly Drawing', 'Quantity', 'Testing Requirements'].every((item) =>
        quoteFiles.includes(item),
      ) &&
      quoteFiles.includes('href="/pcba-quote-file-checklist"'),
    'Homepage must provide a responsive quote-file reference with the approved six inputs.',
  ],
  [
    homeFaq.includes('What does a PCBA manufacturer do?') &&
      homeFaq.includes('What files are needed for a PCBA quote?') &&
      homeFaq.includes('Prepare Your PCBA RFQ') &&
      homeFaq.includes('href="/contact#project-files"') &&
      ['Gerber', 'BOM', 'pick-and-place', 'assembly drawing', 'quantity'].every((term) =>
        homeFaq.toLowerCase().includes(term.toLowerCase()),
      ) &&
      !homeFaq.includes('Ask about your project'),
    'Homepage FAQ must route buyers to a manufacturing RFQ built around the required production files and quantity.',
  ],
  [
    homeFaq.includes("'@type': 'FAQPage'") && homeFaq.includes("'@type': 'Question'"),
    'Homepage visible FAQ must emit matching FAQPage structured data.',
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
    homePage.includes("title: 'Custom PCBA Manufacturer | Prototype to Production | Huitai PCB'") &&
      homePage.includes(
        'Huitai PCB provides custom PCBA manufacturing for hardware teams, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and repeat production.',
      ),
    'Homepage metadata must use the approved custom PCBA title and description.',
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
      analytics.includes('getOrCaptureAttribution(') &&
      inquiryForm.includes("trackEvent('rfq_form_start'") &&
      inquiryRoute.includes('processInquiry(') &&
      serverAnalytics.includes("name: 'generate_lead'") &&
      !['contact_form_submit', 'rfq_submit_success', 'generate_lead'].some((eventName) =>
        inquiryForm.includes(`trackEvent('${eventName}'`),
      ),
    'Analytics must capture attribution, retain RFQ diagnostics, and emit the only lead-success event from the server-confirmed inquiry path.',
  ],
  [
    robots.includes("sitemap: 'https://huitaipcb.com/sitemap.xml'") &&
      sitemap.includes("'/contact'") &&
      sitemap.includes("'/turnkey-pcb-assembly'"),
    'Robots and sitemap infrastructure must preserve important public routes.',
  ],
  [
    pcbAssemblyServicesPage.includes("title: 'PCB Assembly Services for SMT and Through-Hole Production'") &&
      pcbAssemblyServicesPage.includes("seoTitle: 'PCB Assembly Services China | SMT & DIP | Huitai PCB'") &&
      pcbAssemblyServicesPage.includes("serviceName: 'PCB Assembly Services'") &&
      pcbAssemblyServicesPage.includes("serviceType: 'PCB Assembly'") &&
      pcbAssemblyServicesPage.includes('What Is PCB Assembly?') &&
      pcbAssemblyServicesPage.includes('PCB Assembly vs Turnkey PCB Assembly'),
    'PCB Assembly Services must own SMT/DIP assembly intent and its approved schema identity.',
  ],
  [
    prototypePage.includes("title: 'Prototype PCB Assembly in China from 5 Boards'") &&
      prototypePage.includes("seoTitle: 'Prototype PCB Assembly China | 5-Piece Builds | Huitai PCB'") &&
      prototypePage.includes("serviceName: 'Prototype PCB Assembly'") &&
      prototypePage.includes("serviceType: 'Prototype PCB Assembly'") &&
      prototypePage.includes('What Happens After Prototype Testing?') &&
      prototypePage.includes("href: '/knowledge/prototype-vs-batch-pcb-assembly'"),
    'Prototype service must own five-board first-build validation intent and the comparison path.',
  ],
  [
    lowVolumePage.includes("title: 'Low-Volume PCB Assembly for Small-Batch Production'") &&
      lowVolumePage.includes("seoTitle: 'Low-Volume PCB Assembly China | Small-Batch PCBA | Huitai PCB'") &&
      lowVolumePage.includes("serviceName: 'Low-Volume PCB Assembly'") &&
      lowVolumePage.includes("serviceType: 'Low-Volume PCBA Manufacturing'") &&
      lowVolumePage.includes('When Is a PCB Design Ready for Low-Volume Production?') &&
      lowVolumePage.includes('BOM Continuity and Component Availability') &&
      lowVolumePage.includes('Revision and Change Control') &&
      !lowVolumePage.includes('For 5 to 1,000 pcs') &&
      !lowVolumePage.includes('5, 10, 50, 100, 500, or 1,000'),
    'Low-volume service must own validated 50–1,000-piece production intent.',
  ],
  [
    pcbAssemblyRoute.includes('absoluteUrl(pathname)') &&
      pcbAssemblyRoute.includes('getLanguageAlternates(pathname)') &&
      prototypeRoute.includes('absoluteUrl(pathname)') &&
      prototypeRoute.includes('getLanguageAlternates(pathname)') &&
      lowVolumeRoute.includes('absoluteUrl(pathname)') &&
      lowVolumeRoute.includes('getLanguageAlternates(pathname)'),
    'All three target service pages must preserve self-canonical URLs and language alternates.',
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
  [
    compact(bomBestPracticesArticle).includes(
      "title: 'How to Prepare a BOM for PCBA Quotation and Production'",
    ) &&
      compact(bomBestPracticesArticle).includes(
        "metaDescription: 'Prepare a PCBA BOM with exact MPNs, designators, quantities, packages, DNP/DNI notes, approved alternatives and customer-supplied part details.'",
      ) &&
      ['Manufacturer Part Number', 'Designator', 'DNP / DNI', 'Customer-supplied parts'].every((term) =>
        bomBestPracticesArticle.includes(term),
      ) &&
      bomBestPracticesArticle.includes('](/knowledge/bom-risk-alternative-component-sourcing)') &&
      bomBestPracticesArticle.includes('](/knowledge/bom-alternatives-pcba-sourcing)'),
    'BOM Best Practices must own BOM preparation and route risk and substitution questions to their dedicated guides.',
  ],
  [
    compact(bomRiskArticle).includes(
      "title: 'BOM Risk and Component Availability in PCBA Manufacturing'",
    ) &&
      ['suffix', 'obsolete', 'long lead', 'MOQ', 'allocation', 'single-source', 'no-substitute', 'BOM freeze'].every(
        (term) => compact(bomRiskArticle).toLowerCase().includes(term.toLowerCase()),
      ) &&
      bomRiskArticle.includes('](/knowledge/bom-alternatives-pcba-sourcing)') &&
      bomRiskArticle.includes('](/bom-sourcing-pcb-assembly)') &&
      bomRiskArticle.includes('](/low-volume-pcba-assembly)') &&
      bomRiskArticle.includes('](/pcba-quote-file-checklist)') &&
      !bomRiskArticle.includes('Protocol / interface'),
    'BOM Risk must own supply continuity without duplicating the technical alternative-approval matrix.',
  ],
  [
    compact(bomAlternativesArticle).includes(
      "title: 'How to Approve Alternative Components for PCBA'",
    ) &&
      compact(bomAlternativesArticle).includes(
        'A component should not be substituted only because the package or appearance is similar.',
      ) &&
      ['Manufacturer Part Number and suffix', 'Package, footprint, and pinout', 'Voltage and current ratings', 'Protocol / interface', 'Firmware dependency', 'Customer approval'].every(
        (term) => bomAlternativesArticle.includes(term),
      ) &&
      bomAlternativesArticle.includes('](/knowledge/bom-risk-alternative-component-sourcing)') &&
      bomAlternativesArticle.includes('](/bom-sourcing-pcb-assembly)'),
    'Alternative Component Approval must own compatibility review and explicit customer authorization.',
  ],
  [
    compact(pcbaCostArticle).includes("title: 'How Much Does PCBA Assembly Cost?'") &&
      ['Setup cost', 'Stencil', 'Placement count', 'DIP and manual soldering', 'AOI and X-ray', 'Programming', 'Functional testing', 'Fixture cost', 'Quantity effect'].every(
        (term) => pcbaCostArticle.includes(term),
      ) &&
      ['/prototype-pcb-assembly', '/low-volume-pcba-assembly', '/turnkey-pcb-assembly', '/pcba-quote-file-checklist'].every(
        (href) => pcbaCostArticle.includes(`](${href})`),
      ) &&
      !pcbaCostArticle.includes('fixed Huitai price'),
    'The PCBA cost guide must explain manufacturing cost drivers and route buyers to the correct production path.',
  ],
  [
    compact(pcbAssemblyQuoteArticle).includes(
      "title: 'What Determines a PCB Assembly Quote in China?'",
    ) &&
      ['Gerber', 'BOM', 'CPL / Pick-and-Place', 'Assembly Drawing', 'PCB specification', 'Quantity', 'Firmware / programming', 'Testing requirements', 'Customer-supplied components', 'Approved alternatives', 'Delivery destination', 'Requested lead time', 'Revision status'].every(
        (term) => pcbAssemblyQuoteArticle.includes(term),
      ) &&
      ['/pcba-quote-file-checklist', '/pcb-assembly-services', '/turnkey-pcb-assembly', '/bom-sourcing-pcb-assembly', '/contact#project-files'].every(
        (href) => pcbAssemblyQuoteArticle.includes(`](${href})`),
      ),
    'The PCB assembly quote guide must own accurate-RFQ inputs and route buyers to services and file submission.',
  ],
  [
    compact(pcbaQuotationChecklistArticle).includes(
      "title: 'PCBA Quotation Checklist Before Supplier Review'",
    ) &&
      pcbaQuotationChecklistArticle.includes('heading: \'60-Second RFQ Readiness Check\'') &&
      ['/knowledge/what-determines-pcb-assembly-quote-china', '/pcba-quote-file-checklist', '/contact#project-files'].every(
        (href) => pcbaQuotationChecklistArticle.includes(`](${href})`),
      ) &&
      pcbaQuotationChecklistArticle.length < pcbAssemblyQuoteArticle.length,
    'The quotation checklist must be shorter than the explanatory quote guide and lead to the commercial checklist and RFQ.',
  ],
  [
    compact(prototypeVsBatchArticle).includes(
      "title: 'Prototype PCB Assembly vs Low-Volume PCBA Production'",
    ) &&
      prototypeVsBatchArticle.includes("category: 'Decision Guide'") &&
      prototypeVsBatchArticle.includes('Quantity alone does not determine') &&
      prototypeVsBatchArticle.includes("heading: 'Prototype vs Low-Volume Decision Matrix'") &&
      prototypeVsBatchArticle.includes(
        "heading: 'How Production Priorities Change at 50, 100 and 500 Pieces'",
      ) &&
      prototypeVsBatchArticle.includes("heading: 'Is Your PCB Ready for Low-Volume Production?'") &&
      prototypeVsBatchArticle.includes("heading: 'Prototype to Low-Volume Transition Workflow'") &&
      [
        '/prototype-pcb-assembly',
        '/low-volume-pcba-assembly',
        '/knowledge/bom-risk-alternative-component-sourcing',
        '/knowledge/bom-alternatives-pcba-sourcing',
        '/knowledge/how-much-does-pcba-assembly-cost',
        '/pcba-testing-quality-control',
        '/contact#project-files',
      ].every((href) => prototypeVsBatchArticle.includes(`](${href})`) || prototypeVsBatchArticle.includes(`href: '${href}'`)),
    'The prototype-vs-low-volume guide must own transition decisions, reject quantity-only thresholds, and route adjacent intents to their canonical owners.',
  ],
  [
    [
      "'bom-best-practices': 'PCBA BOM Best Practices | Quote & Production Preparation'",
      "'bom-risk-alternative-component-sourcing': 'BOM Risk and Component Availability in PCBA Manufacturing'",
      "'bom-alternatives-pcba-sourcing': 'How to Approve Alternative Components for PCBA | Huitai PCB'",
      "'how-much-does-pcba-assembly-cost': 'How Much Does PCBA Assembly Cost? | Cost Factors'",
      "'what-determines-pcb-assembly-quote-china': 'PCB Assembly Quote in China | Required RFQ Information'",
      "'pcba-quotation-checklist': 'PCBA Quotation Checklist | RFQ Readiness'",
    ].every((mapping) => articles.includes(mapping)) &&
      [
        "'bom-best-practices',",
        "'bom-risk-alternative-component-sourcing',",
        "'bom-alternatives-pcba-sourcing',",
        "'how-much-does-pcba-assembly-cost',",
        "'what-determines-pcb-assembly-quote-china',",
        "'pcba-quotation-checklist',",
      ].every((slug) => articles.includes(slug)),
    'P0-4 metadata mappings and CMS-backed static ownership overrides must be registered.',
  ],
  [
    knowledgeArticlePage.includes('alternates: { canonical: `https://huitaipcb.com/knowledge/${article.slug}` }') &&
      knowledgeArticlePage.includes("'@type': 'Article'") &&
      knowledgeArticlePage.includes("'@type': 'BreadcrumbList'") &&
      knowledgeArticlePage.includes("'@type': 'FAQPage'") &&
      knowledgeArticlePage.includes('faqItems.length > 0') &&
      knowledgeArticlePage.includes("publisher: { '@id': SITE.organizationId }") &&
      knowledgeArticlePage.includes("reviewedBy: { '@id': SITE.organizationId }"),
    'Knowledge ownership pages must retain self-canonical Article, Breadcrumb, visible FAQ, and Organization-reference schema behavior.',
  ],
  [
    knowledgeArticlePage.includes('<div className="overflow-hidden rounded-xl border border-cc-line">') &&
      knowledgeArticlePage.includes('table-fixed') &&
      knowledgeArticlePage.includes('[overflow-wrap:anywhere]'),
    'Knowledge article tables must fit the mobile content column and wrap long MPN strings without hidden horizontal columns.',
  ],
  [
    floatingWhatsApp.includes('bottom-4 right-0') &&
      floatingWhatsApp.includes('h-12 w-12') &&
      floatingWhatsApp.includes('sm:bottom-5 sm:right-5 sm:h-14 sm:w-14'),
    'The floating WhatsApp control must stay outside the mobile knowledge content column while retaining its desktop size.',
  ],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  console.error(`SEO regression checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO regression checks passed (${checks.length}).`);

const sitemapTests = spawnSync(process.execPath, [
  fileURLToPath(new URL('../node_modules/vitest/vitest.mjs', import.meta.url)),
  'run',
  'src/lib/content/sitemap-lastmod.test.ts',
], { cwd: fileURLToPath(new URL('../', import.meta.url)), stdio: 'inherit' });

if (sitemapTests.error) console.error(sitemapTests.error.message);
if (sitemapTests.status !== 0) process.exit(sitemapTests.status ?? 1);
