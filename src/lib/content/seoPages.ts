import type { FaqItem } from '@/lib/content/faq';

export type RelatedLink = {
  label: string;
  href: string;
};

export type SeoLandingPage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  primaryKeyword: string;
  quickAnswer: string;
  serviceName: string;
  serviceType: string;
  sections: { heading: string; body: string }[];
  bullets: string[];
  workflow?: string[];
  filesNeeded?: string[];
  relatedLinks: RelatedLink[];
  ctaHeading?: string;
  ctaBody?: string;
  faq: FaqItem[];
};

const commonFiles = [
  'Gerber files and drill files',
  'BOM list with MPNs, quantities, designators, and approved alternates',
  'PCB specifications and stack-up notes if available',
  'Pick and place file or centroid data when available',
  'Assembly drawing, sample photos, or orientation notes',
  'Quantity, testing requirements, expected lead time, and shipping destination',
];

const sharedFaq: FaqItem[] = [
  {
    question: 'What files are required for a PCB assembly quote?',
    answer: 'Gerber files, a BOM list, PCB specifications, assembly drawings, sample photos, and testing requirements are helpful for an accurate PCB assembly quote.',
  },
  {
    question: 'Do you provide turnkey PCB assembly services?',
    answer: 'Yes. Huitai can coordinate PCB fabrication, component sourcing, SMT assembly, DIP assembly, inspection, functional testing based on project requirements, final assembly, and delivery.',
  },
  {
    question: 'Can you source electronic components?',
    answer: 'Yes. We can review the BOM, check sourcing options, discuss approved alternatives, and coordinate purchasing before assembly after customer confirmation.',
  },
  {
    question: 'Do you ship assembled PCBA boards overseas?',
    answer: 'Yes. We can prepare assembled and tested PCBA boards for international delivery according to the confirmed project requirements.',
  },
];

export const seoPages: Record<string, SeoLandingPage> = {
  'pcb-assembly-services': {
    slug: 'pcb-assembly-services',
    title: 'PCB Assembly Services in China',
    seoTitle: 'PCB Assembly Services in China | Huitai Electronics',
    metaDescription: 'PCB assembly services in China for overseas teams — engineer-reviewed Gerber & BOM, component sourcing, SMT & DIP assembly, testing, and global delivery. Reply within 24h.',
    eyebrow: 'PCB ASSEMBLY SERVICES',
    primaryKeyword: 'PCB Assembly Services',
    serviceName: 'PCB Assembly Services in China',
    serviceType: 'PCB assembly services',
    quickAnswer: 'PCB assembly services turn bare PCB files and component lists into assembled PCBA boards. Huitai focuses on complete PCBA delivery, including PCB fabrication coordination, BOM review, component sourcing, SMT assembly, optional DIP assembly, inspection, testing, and shipment preparation.',
    intro: 'Huitai Electronics supports PCB assembly services for overseas hardware teams that need engineering review, component sourcing, SMT assembly, functional testing, and coordinated delivery from China.',
    sections: [
      {
        heading: 'From Files to Finished PCBA',
        body: 'Send Gerber files, BOM lists, drawings, sample photos, or project requirements. Our team reviews the available information before quotation so sourcing, assembly, testing, and delivery scope are clear.',
      },
      {
        heading: 'Built for Practical B2B Projects',
        body: 'We support prototype, low-volume, and batch PCBA projects where engineering review, sourcing feedback, and production coordination matter more than automated black-box pricing.',
      },
    ],
    bullets: ['PCB fabrication coordination', 'BOM review and component sourcing', 'SMT assembly and optional DIP assembly', 'Functional testing based on project needs', 'Packaging and global delivery preparation'],
    workflow: ['Review Gerber, BOM, quantity, and test requirements', 'Confirm PCB fabrication and component sourcing scope', 'Coordinate SMT assembly and optional DIP assembly', 'Inspect, test based on customer instructions, and prepare shipment'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'PCB fabrication and assembly', href: '/pcb-fabrication-and-assembly' },
      { label: 'Request a PCBA quote', href: '/contact' },
    ],
    faq: sharedFaq,
  },
  'china-pcb-assembly': {
    slug: 'china-pcb-assembly',
    title: 'China PCBA Assembly Service',
    seoTitle: 'China PCBA Assembly Service | Huitai Electronics',
    metaDescription: 'China PCB & PCBA assembly for overseas B2B buyers — engineer-reviewed files, low-volume friendly, SMT/DIP, inspection, testing, and worldwide delivery. Reply within 24h.',
    eyebrow: 'CHINA PCBA ASSEMBLY SERVICE',
    primaryKeyword: 'China PCBA Assembly Service',
    serviceName: 'China PCBA Assembly Service',
    serviceType: 'China PCBA assembly and turnkey delivery service',
    quickAnswer: 'A China PCBA assembly service should help overseas buyers coordinate PCB fabrication, BOM sourcing, SMT assembly, optional DIP assembly, inspection, testing, and finished board delivery. Huitai focuses on complete PCBA delivery rather than standalone bare PCB orders.',
    intro: 'Huitai Electronics supports overseas B2B customers that need a China-based PCBA assembly workflow from Gerber and BOM review to component sourcing, SMT assembly, optional DIP assembly, inspection, testing, and finished board shipment.',
    sections: [
      {
        heading: 'China-Based PCBA Supply Chain Coordination',
        body: 'China PCBA assembly projects often involve several linked decisions: board fabrication route, component purchasing, SMT assembly plan, DIP requirements, testing scope, packaging, and shipment. Huitai coordinates these steps as one managed workflow for overseas customers.',
      },
      {
        heading: 'Complete PCBA Delivery, Not Standalone Bare PCB Orders',
        body: 'This page is focused on assembled PCBA delivery. PCB fabrication is coordinated as part of turnkey PCBA projects rather than positioned as a separate low-cost bare board service.',
      },
      {
        heading: 'What Overseas Buyers Should Prepare',
        body: 'For a practical quote, send Gerber files, BOM list with MPNs, quantity, PCB specifications, assembly drawings or photos, testing requirements, and shipping destination. Missing BOM or testing details can affect quote accuracy and lead time.',
      },
      {
        heading: 'How We Reduce Sourcing and Assembly Risk',
        body: 'Before quotation, we review BOM completeness, component availability, possible alternatives, assembly notes, and inspection requirements. This helps clarify scope before purchasing parts or starting assembly.',
      },
    ],
    bullets: ['PCB fabrication coordination as part of PCBA delivery', 'BOM sourcing and customer-approved alternatives', 'SMT assembly and optional DIP assembly', 'Inspection and functional testing based on project needs', 'International delivery preparation'],
    workflow: ['Review Gerber, BOM, quantity, and testing requirements', 'Confirm PCB fabrication specifications and sourcing scope', 'Coordinate SMT/DIP assembly and inspection', 'Prepare finished PCBA boards for shipment'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing in China', href: '/turnkey-pcb-assembly' },
      { label: 'PCB fabrication and assembly service', href: '/pcb-fabrication-and-assembly' },
      { label: 'BOM sourcing and PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'PCBA testing and quality control', href: '/pcba-testing-quality-control' },
      { label: 'Upload Gerber and BOM for review', href: '/contact' },
    ],
    faq: [
      {
        question: 'Do you provide China PCBA assembly for overseas customers?',
        answer: 'Yes. Huitai supports overseas B2B customers that need PCB fabrication coordination, component sourcing, SMT assembly, optional DIP assembly, inspection, testing, and finished PCBA delivery from China.',
      },
      {
        question: 'Is this a standalone bare PCB service?',
        answer: 'No. Huitai focuses on complete PCBA delivery. PCB fabrication is normally coordinated as part of turnkey PCBA assembly projects rather than sold as a standalone bare board service.',
      },
      {
        question: 'Can you source components in China for my BOM?',
        answer: 'Yes. We can review MPNs, check availability, discuss sourcing options, and confirm customer-approved alternatives before purchasing.',
      },
      {
        question: 'Can you arrange functional testing before shipment?',
        answer: 'Functional testing can be coordinated when test instructions, firmware, fixtures, or acceptance criteria are provided and confirmed in the project scope.',
      },
      {
        question: 'What should I send for a China PCBA quote?',
        answer: 'Please send Gerber files, BOM list, quantity, PCB specifications, pick and place data if available, assembly drawings, testing requirements, and shipping destination.',
      },
    ],
  },
  'pcb-assembly-company': {
    slug: 'pcb-assembly-company',
    title: 'PCB Assembly Company in China',
    seoTitle: 'PCB Assembly Company in China | Huitai Electronics',
    metaDescription: 'Huitai Electronics is a PCB assembly company in China for overseas B2B customers, supporting engineering review, BOM sourcing, quality control, assembly communication, testing, and PCBA delivery.',
    eyebrow: 'PCB ASSEMBLY COMPANY',
    primaryKeyword: 'PCB Assembly Company in China',
    serviceName: 'PCB Assembly Company in China',
    serviceType: 'Managed PCBA manufacturing and assembly service',
    quickAnswer: 'A PCB assembly company in China should help overseas buyers evaluate engineering files, confirm BOM sourcing, coordinate assembly, plan inspection and testing, and communicate delivery risks clearly. Huitai is positioned for B2B PCBA projects that need managed review and delivery rather than only a low-price quote.',
    intro: 'Huitai Electronics works with overseas engineers, startups, purchasing teams, and industrial product companies that need a PCB assembly company in China for engineering review, sourcing coordination, quality control, project communication, testing, and finished PCBA delivery.',
    sections: [
      {
        heading: 'Engineering Review Before Quotation',
        body: 'We review Gerber files, BOM lists, assembly drawings, sample photos, and testing needs before quotation. This helps reduce unclear scope and repeated follow-up.',
      },
      {
        heading: 'How to Evaluate a PCB Assembly Company',
        body: 'Buyers should check whether a supplier can review design files, question incomplete BOM lines, discuss component alternatives, define testing scope, communicate in English, and coordinate finished PCBA delivery instead of only quoting one production step.',
      },
      {
        heading: 'Why Overseas B2B Customers Work With Huitai',
        body: 'Huitai focuses on practical project communication: file review before quotation, sourcing confirmation, assembly route planning, inspection and testing discussion, and delivery follow-up for overseas customers.',
      },
      {
        heading: 'Quality and Delivery Communication',
        body: 'Quality planning starts before production. We clarify inspection requirements, customer test methods, packaging needs, shipment documents, and delivery expectations so there are fewer surprises after assembly.',
      },
    ],
    bullets: ['Engineering review before quotation', 'BOM and sourcing checks', 'Managed PCBA assembly supply chain', 'Quality and testing scope planning', 'English RFQ support for overseas buyers'],
    workflow: ['Review customer files and missing information', 'Confirm sourcing and assembly route', 'Coordinate inspection and testing plan', 'Support shipment preparation and project communication'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'Quality control process', href: '/quality' },
      { label: 'PCBA capabilities overview', href: '/capabilities' },
      { label: 'What files are needed for a PCBA quote?', href: '/knowledge/what-files-required-pcba-quote' },
      { label: 'Send RFQ to Huitai', href: '/contact' },
    ],
    faq: [
      {
        question: 'What should I check when choosing a PCB assembly company in China?',
        answer: 'Check whether the company reviews Gerber and BOM files carefully, communicates sourcing risks, defines testing scope, supports overseas communication, and can coordinate finished PCBA delivery.',
      },
      {
        question: 'Does Huitai only provide a quick online price?',
        answer: 'No. Huitai reviews the project information before quotation so BOM risks, missing files, testing requirements, and delivery scope can be clarified.',
      },
      {
        question: 'Can Huitai help with BOM sourcing and alternatives?',
        answer: 'Yes. We can review MPNs, availability, sourcing options, and possible customer-approved alternatives before purchasing.',
      },
      {
        question: 'How does Huitai handle quality control?',
        answer: 'Quality control can include file review, incoming material checks, assembly inspection, AOI where applicable, and functional testing based on confirmed project requirements.',
      },
      {
        question: 'Is Huitai suitable for overseas B2B PCBA projects?',
        answer: 'Yes. The service is designed for overseas engineers, startups, hardware teams, purchasing managers, and industrial product companies that need managed PCBA delivery from China.',
      },
    ],
  },
  'prototype-pcb-assembly': {
    slug: 'prototype-pcb-assembly',
    title: 'Prototype PCBA Manufacturing',
    seoTitle: 'Prototype PCBA Manufacturing in China | Huitai Electronics',
    metaDescription: 'Prototype PCBA manufacturing in China for engineers & startups — fast Gerber/BOM review, component sourcing, SMT assembly, and testing. Low-volume friendly, reply within 24h.',
    eyebrow: 'PROTOTYPE PCBA MANUFACTURING',
    primaryKeyword: 'Prototype PCBA Manufacturing',
    serviceName: 'Prototype PCBA Manufacturing',
    serviceType: 'Prototype PCBA manufacturing service',
    quickAnswer: 'Prototype PCBA manufacturing helps engineers validate a design before low-volume or batch production. Huitai reviews Gerber and BOM files, checks component availability and alternatives, coordinates SMT assembly, and confirms inspection or testing requirements before shipment.',
    intro: 'Huitai supports prototype PCBA manufacturing for engineers, startups, and product developers that need design validation, Gerber and BOM review, sourcing confirmation, SMT assembly, optional DIP work, inspection, testing scope confirmation, and a practical path toward low-volume production.',
    sections: [
      {
        heading: 'Prototype Builds Need Careful Engineering Review',
        body: 'Prototype PCBA builds often reveal design, footprint, BOM, orientation, and testing questions. We review the available files and identify missing information before quote finalization.',
      },
      {
        heading: 'Gerber and BOM Review Before Assembly',
        body: 'Gerber files define the PCB, while the BOM controls component sourcing. Incomplete MPNs, unclear designators, or no-substitute parts can affect both cost and lead time, especially in small prototype runs.',
      },
      {
        heading: 'BOM Alternatives and Availability Confirmation',
        body: 'When prototype parts are short, obsolete, or expensive in small quantities, we can review sourcing options and discuss customer-approved alternatives before purchasing.',
      },
      {
        heading: 'Testing Requirements for Prototype Boards',
        body: 'Prototype functional testing should be based on customer-provided firmware, test instructions, fixtures, or acceptance criteria. Without a test method, inspection can still be planned, but full functional validation may not be possible.',
      },
      {
        heading: 'A Path From Prototype to Low Volume',
        body: 'Once prototype boards are validated, the same file package, BOM decisions, and test plan can be refined for low-volume PCBA assembly or later batch production.',
      },
    ],
    bullets: ['Prototype PCBA review and build planning', 'Gerber and BOM risk checks', 'Small-batch component sourcing and alternatives review', 'SMT assembly and optional DIP work', 'Functional testing based on confirmed instructions'],
    workflow: ['Review prototype files and missing information', 'Check BOM availability and approved alternatives', 'Coordinate prototype SMT/DIP assembly', 'Inspect and test according to confirmed requirements', 'Prepare feedback for low-volume transition'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'Prototype vs batch PCB assembly', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'What files are needed for a PCBA quote?', href: '/knowledge/what-files-required-pcba-quote' },
      { label: 'Upload prototype files for review', href: '/contact' },
    ],
    faq: [
      {
        question: 'Can Huitai support prototype PCBA manufacturing?',
        answer: 'Yes. Huitai supports prototype PCBA projects for engineers, startups, and product developers that need file review, sourcing support, assembly, inspection, and delivery.',
      },
      {
        question: 'What files are needed for prototype PCBA?',
        answer: 'Gerber files, BOM list, quantity, pick and place data if available, assembly drawings, sample photos, and testing requirements are helpful for prototype PCBA quotation.',
      },
      {
        question: 'Can you help if my BOM has unavailable parts?',
        answer: 'Yes. We can review sourcing options and possible alternatives, but substitutions should be confirmed by the customer before purchasing and assembly.',
      },
      {
        question: 'Can prototype boards include functional testing?',
        answer: 'Yes, when test instructions, firmware, fixtures, or acceptance criteria are provided and confirmed in the project scope.',
      },
      {
        question: 'Can a prototype project move to low-volume PCBA later?',
        answer: 'Yes. After prototype validation, the same files, BOM decisions, and testing plan can be refined for low-volume PCBA assembly.',
      },
    ],
  },
  'turnkey-pcb-assembly': {
    slug: 'turnkey-pcb-assembly',
    title: 'Turnkey PCBA Manufacturing in China',
    seoTitle: 'Turnkey PCBA Manufacturing in China | Huitai Electronics',
    metaDescription: 'Turnkey PCBA manufacturing in China — one partner for PCB fabrication, BOM sourcing, SMT/DIP assembly, testing, and finished-board delivery. Engineer-reviewed quotes, reply in 24h.',
    eyebrow: 'TURNKEY PCBA MANUFACTURING',
    primaryKeyword: 'Turnkey PCBA Manufacturing in China',
    serviceName: 'Turnkey PCBA Manufacturing in China',
    serviceType: 'Turnkey PCBA manufacturing service',
    quickAnswer: 'Turnkey PCBA manufacturing means one supplier coordinates PCB fabrication, component sourcing, SMT assembly, DIP assembly, inspection, testing, and finished board delivery. Huitai Electronics helps overseas customers manage the complete PCBA workflow from engineering review to shipment.',
    intro: 'Huitai Electronics helps overseas engineers, startups, hardware teams, industrial product companies, and purchasing managers coordinate turnkey PCBA manufacturing in China from Gerber and BOM review to finished PCBA delivery.',
    sections: [
      {
        heading: 'What Is Turnkey PCBA Manufacturing?',
        body: 'Turnkey PCBA manufacturing coordinates the main production steps needed to deliver assembled boards: PCB fabrication, BOM sourcing, component purchasing, SMT assembly, optional DIP assembly, inspection, functional testing when requirements are provided, packaging, and delivery.',
      },
      {
        heading: 'What Huitai Can Coordinate',
        body: 'Huitai focuses on complete PCBA delivery for overseas B2B customers. We review project files, check BOM availability, coordinate fabrication and assembly resources, discuss component alternatives, and keep quotation scope clear before production starts.',
      },
      {
        heading: 'Our PCBA Manufacturing Workflow',
        body: 'The workflow starts with engineering review, then moves through PCB fabrication planning, BOM sourcing review, SMT assembly, optional DIP assembly, inspection, functional testing based on customer instructions, packaging, and international delivery preparation.',
      },
      {
        heading: 'Files Needed for a PCBA Quote',
        body: 'For an accurate quote, send Gerber files, BOM list, quantity, PCB specifications, pick and place data if available, sample photos or drawings, testing requirements, expected lead time, and shipping destination.',
      },
      {
        heading: 'Who This Service Is Suitable For',
        body: 'This service is suitable for overseas engineers, startups, hardware teams, purchasing managers, industrial product companies, and small-batch buyers that need one managed workflow from files to finished PCBA boards.',
      },
      {
        heading: 'Prototype and Low-Volume PCBA Support',
        body: 'Prototype and low-volume projects often need sourcing flexibility, test planning, and design feedback before scaling. Huitai can help review the package, confirm sourcing routes, and prepare a path from prototype to small batch.',
      },
      {
        heading: 'BOM Sourcing and Component Alternatives',
        body: 'A complete BOM with manufacturer part numbers helps reduce quotation risk. When parts are short, obsolete, or unclear, we can review sourcing options and discuss customer-approved alternatives before purchasing.',
      },
      {
        heading: 'PCBA Testing and Quality Control',
        body: 'Inspection and testing scope depends on the project. Visual inspection, AOI, and shipment checks can be coordinated, while functional testing should be based on customer-provided test instructions, firmware, test fixtures, or acceptance criteria.',
      },
      {
        heading: 'Why Work With a China PCBA Manufacturer',
        body: 'A China-based PCBA workflow can combine fabrication resources, component sourcing, SMT assembly, inspection, and shipment preparation. The key is not only price, but clear engineering review, BOM control, and confirmed production scope.',
      },
    ],
    bullets: ['PCB fabrication coordination', 'BOM sourcing and component purchasing', 'SMT assembly and optional DIP assembly', 'Inspection and functional testing based on requirements', 'Finished PCBA packaging and global delivery'],
    workflow: ['Engineering review before quotation', 'PCB fabrication and BOM sourcing coordination', 'SMT assembly and optional DIP assembly', 'Inspection, testing by agreed scope, and finished PCBA delivery'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'What files are needed for a PCBA quote?', href: '/knowledge/what-files-required-pcba-quote' },
      { label: 'What is turnkey PCBA?', href: '/knowledge/what-is-turnkey-pcba' },
      { label: 'BOM best practices', href: '/knowledge/bom-best-practices' },
      { label: 'Prototype vs batch PCB assembly', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'PCB fabrication and assembly', href: '/pcb-fabrication-and-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'BOM sourcing and PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'PCBA testing and quality control', href: '/pcba-testing-quality-control' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Quality control', href: '/quality' },
      { label: 'Send Gerber and BOM', href: '/contact' },
    ],
    ctaHeading: 'Send Your Gerber and BOM for Review',
    ctaBody: 'Need a PCBA quote? Send your Gerber files, BOM list, quantity, and testing requirements. Huitai will review your project before quotation.',
    faq: [
      {
        question: 'What files are needed for a PCBA quote?',
        answer: 'Gerber files, BOM list, PCB specifications, quantity, assembly drawings, pick and place data, sample photos, and testing requirements help us review the project before quotation.',
      },
      {
        question: 'Can Huitai source electronic components?',
        answer: 'Yes. We can review the BOM, check sourcing options, discuss approved alternatives, and coordinate purchasing after the sourcing plan is confirmed.',
      },
      {
        question: 'Do you provide only PCB or only SMT service?',
        answer: 'Huitai focuses on complete PCBA delivery. PCB fabrication and SMT assembly are normally coordinated as part of turnkey PCBA projects, not promoted as standalone bare PCB or placement-only services.',
      },
      {
        question: 'Can you support prototype and low-volume PCBA?',
        answer: 'Yes. We support prototype and low-volume PCBA projects where engineering review, BOM sourcing, and test planning are important before scaling.',
      },
      {
        question: 'Can you test PCBA boards before shipment?',
        answer: 'Testing can be coordinated based on project requirements. Functional testing usually needs customer-provided test instructions, firmware, fixtures, or acceptance criteria.',
      },
      {
        question: 'Do you ship assembled PCBA boards overseas?',
        answer: 'Yes. We can prepare finished PCBA boards for international delivery after inspection, agreed testing, packaging, and shipment confirmation.',
      },
      {
        question: 'What is the difference between PCB assembly and PCBA?',
        answer: 'PCB assembly is the process of mounting and soldering components onto a bare PCB. The finished assembled board is commonly called a PCBA.',
      },
      {
        question: 'How long does turnkey PCBA manufacturing take?',
        answer: 'Lead time depends on board specifications, component availability, quantity, and testing scope. We review these factors before confirming the schedule.',
      },
    ],
  },
  'pcb-fabrication-and-assembly': {
    slug: 'pcb-fabrication-and-assembly',
    title: 'PCB Fabrication and Assembly Service',
    seoTitle: 'PCB Fabrication and Assembly Service in China | Huitai Electronics',
    metaDescription: 'PCB fabrication and assembly service in China for complete PCBA delivery, including board fabrication coordination, component sourcing, SMT/DIP assembly, inspection, testing, and shipment.',
    eyebrow: 'FABRICATION + ASSEMBLY',
    primaryKeyword: 'PCB Fabrication and Assembly Service in China',
    serviceName: 'PCB Fabrication and Assembly Service in China',
    serviceType: 'PCB fabrication and assembly service',
    quickAnswer: 'PCB fabrication and assembly service combines board production, component sourcing, SMT or DIP assembly, inspection, and testing into one PCBA delivery workflow. Huitai coordinates PCB fabrication as part of turnkey PCBA projects, not as standalone bare PCB orders.',
    intro: 'For buyers who need finished boards instead of separate vendors, Huitai coordinates PCB fabrication, component sourcing, SMT/DIP assembly, inspection, testing, and delivery from Gerber and BOM review to finished PCBA shipment.',
    sections: [
      {
        heading: 'What We Can Coordinate',
        body: 'We can coordinate PCB fabrication, BOM review, component sourcing, SMT assembly, optional DIP assembly, inspection, functional testing based on project requirements, packaging, and delivery preparation.',
      },
      {
        heading: 'Focused on Complete PCBA Delivery',
        body: 'This service is not positioned as a standalone bare PCB service. It is designed for customers who need fabrication and assembly connected in one managed PCBA workflow.',
      },
    ],
    bullets: ['PCB fabrication coordination', 'Component sourcing and purchasing review', 'SMT and optional DIP assembly', 'Inspection and testing scope planning', 'Finished PCBA delivery preparation'],
    workflow: ['Review Gerber, BOM, quantity, and assembly notes', 'Confirm fabrication specifications and sourcing plan', 'Coordinate assembly and inspection', 'Prepare boards for testing and shipment'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'What files are required for a PCBA quote?', href: '/knowledge/what-files-required-pcba-quote' },
      { label: 'Request a PCB assembly quote', href: '/contact' },
    ],
    faq: [
      ...sharedFaq,
      {
        question: 'Do you accept standalone bare PCB orders?',
        answer: 'Our focus is complete PCBA delivery. PCB fabrication is usually coordinated as part of turnkey PCB assembly projects rather than standalone bare board orders.',
      },
    ],
  },
  'low-volume-pcba-assembly': {
    slug: 'low-volume-pcba-assembly',
    title: 'Low Volume PCBA Assembly in China',
    seoTitle: 'Low Volume PCBA Assembly in China | Huitai Electronics',
    metaDescription: 'Low volume PCBA assembly in China for prototype validation, trial production, and small batch builds with BOM sourcing, alternatives review, assembly, testing, and delivery.',
    eyebrow: 'LOW-VOLUME PCBA',
    primaryKeyword: 'Low Volume PCBA Assembly in China',
    serviceName: 'Low Volume PCBA Assembly in China',
    serviceType: 'Low-volume PCBA assembly service',
    quickAnswer: 'Low-volume PCBA assembly is used for validation, trial production, and small batch builds before larger production. Huitai helps review files, check BOM availability, coordinate assembly, and plan testing without promising lowest price or fixed lead time for every project.',
    intro: 'Huitai supports low-volume PCBA assembly for overseas teams that need controlled small-batch production, sourcing review, alternative part confirmation, testing requirements, and delivery planning.',
    sections: [
      {
        heading: 'What Low-Volume PCBA Is Suitable For',
        body: 'Low-volume PCBA is useful for pilot runs, engineering validation, market testing, pre-production builds, and small industrial product batches where process control and sourcing clarity matter.',
      },
      {
        heading: 'Common Cost Factors',
        body: 'Small-batch cost is affected by setup time, component availability, SMT programming, stencil requirements, testing scope, packaging, and whether alternatives need approval before purchasing.',
      },
    ],
    bullets: ['Prototype-to-small-batch transition', 'BOM sourcing and alternatives review', 'SMT assembly and optional DIP assembly', 'Testing requirements planning', 'Lead time and shipment coordination'],
    workflow: ['Review quantity and production purpose', 'Check BOM risks and alternative options', 'Coordinate assembly route and inspection plan', 'Confirm testing and delivery requirements'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'Prototype PCB assembly service', href: '/prototype-pcb-assembly' },
      { label: 'Prototype vs batch PCB assembly', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'Send low-volume RFQ', href: '/contact' },
    ],
    faq: [
      {
        question: 'What is considered low-volume PCBA assembly?',
        answer: 'Low-volume PCBA usually refers to small production runs used for validation, trial production, or early batch supply before scaling.',
      },
      {
        question: 'Is low-volume PCBA always cheaper?',
        answer: 'Not always. Setup, sourcing, stencil, inspection, and testing costs can have a larger impact on small quantities, so we review the full project before quotation.',
      },
      {
        question: 'Can you help with component alternatives?',
        answer: 'Yes. We can review sourcing options and discuss approved alternatives, but substitutions should be confirmed by the customer before purchasing.',
      },
      {
        question: 'Can low-volume builds include functional testing?',
        answer: 'Yes, when testing instructions, firmware, fixtures, or acceptance criteria are provided and confirmed in the project scope.',
      },
    ],
  },
  'bom-sourcing-pcb-assembly': {
    slug: 'bom-sourcing-pcb-assembly',
    title: 'BOM Sourcing and PCB Assembly',
    seoTitle: 'BOM Sourcing and PCB Assembly Service | Huitai Electronics',
    metaDescription: 'BOM sourcing and PCB assembly service for overseas PCBA projects, including BOM review, MPN checks, component availability review, alternatives confirmation, purchasing, assembly, and delivery.',
    eyebrow: 'BOM SOURCING + ASSEMBLY',
    primaryKeyword: 'BOM Sourcing and PCB Assembly',
    serviceName: 'BOM Sourcing and PCB Assembly Service',
    serviceType: 'BOM sourcing and PCBA assembly service',
    quickAnswer: 'BOM sourcing and PCB assembly connects component purchasing review with PCBA production. Huitai checks MPNs, quantities, availability, lifecycle risks, and possible alternatives, then coordinates purchasing and assembly after the sourcing plan is confirmed.',
    intro: 'For turnkey PCBA projects, component sourcing can affect quote accuracy, lead time, and production risk. Huitai reviews BOM information, checks availability, discusses alternatives, and coordinates purchasing with assembly planning.',
    sections: [
      {
        heading: 'What BOM Information We Need',
        body: 'A useful BOM should include reference designators, quantity, manufacturer part numbers, manufacturer name, package, value, ratings, approved alternates, and notes for no-substitute or customer-supplied parts.',
      },
      {
        heading: 'Component Availability Review',
        body: 'We review component availability before quotation when possible. Shortages, obsolete parts, MOQ, and unstable pricing can change both project cost and schedule.',
      },
      {
        heading: 'Alternative Parts Confirmation',
        body: 'When a part is hard to source, Huitai can suggest sourcing options or possible alternatives, but customers should confirm approved substitutions before purchasing and assembly.',
      },
    ],
    bullets: ['BOM review and MPN checking', 'Availability and lifecycle risk review', 'Approved alternatives discussion', 'Purchasing coordination', 'Assembly planning with sourcing status'],
    workflow: ['Review BOM completeness and MPN clarity', 'Check availability, lead time, and sourcing risks', 'Discuss approved alternatives if needed', 'Coordinate purchasing with PCB assembly schedule'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'BOM best practices', href: '/knowledge/bom-best-practices' },
      { label: 'What files are required for a PCBA quote?', href: '/knowledge/what-files-required-pcba-quote' },
      { label: 'Send BOM for review', href: '/contact' },
    ],
    faq: [
      {
        question: 'Can Huitai source all components in my BOM?',
        answer: 'We can review sourcing options and availability, but some parts may be obsolete, restricted, or require approved alternatives before purchasing.',
      },
      {
        question: 'What BOM columns are most important?',
        answer: 'Reference designator, quantity, manufacturer part number, manufacturer name, package, value, rating, and approved alternatives are especially important.',
      },
      {
        question: 'Will you replace parts without approval?',
        answer: 'No. Alternative parts should be reviewed and confirmed by the customer before purchasing and assembly.',
      },
      {
        question: 'Can BOM sourcing be combined with assembly?',
        answer: 'Yes. Huitai focuses on turnkey PCBA projects where BOM sourcing, PCB fabrication, SMT assembly, testing, and delivery are coordinated together.',
      },
    ],
  },
  'pcba-testing-quality-control': {
    slug: 'pcba-testing-quality-control',
    title: 'PCBA Testing and Quality Control',
    seoTitle: 'PCBA Testing and Quality Control | Huitai Electronics',
    metaDescription: 'PCBA testing and quality control service for PCB assembly projects, including visual inspection, AOI, functional testing based on customer instructions, test fixture planning, shipment inspection, and documentation.',
    eyebrow: 'PCBA TESTING + QC',
    primaryKeyword: 'PCBA Testing and Quality Control',
    serviceName: 'PCBA Testing and Quality Control',
    serviceType: 'PCBA testing and quality control service',
    quickAnswer: 'PCBA testing and quality control can include visual inspection, AOI, shipment inspection, and functional testing based on customer instructions. Functional testing scope depends on the test method, firmware, fixtures, and acceptance criteria provided or confirmed for the project.',
    intro: 'Huitai coordinates inspection and testing steps for PCBA projects according to confirmed requirements. The goal is to reduce assembly risk and prepare finished boards for delivery with practical quality checks.',
    sections: [
      {
        heading: 'Inspection and Testing Options',
        body: 'Depending on the project, inspection may include visual checks, solder joint review, AOI, sample inspection, functional testing, packaging checks, and shipment preparation.',
      },
      {
        heading: 'What Customers Need to Provide',
        body: 'Functional testing usually requires test instructions, firmware, fixture requirements, pass/fail criteria, sample photos, or communication protocols so the scope can be confirmed before quotation.',
      },
      {
        heading: 'Functional Testing Scope',
        body: 'Functional testing is based on project requirements. We do not assume every project includes full functional testing unless the test method and required conditions are confirmed.',
      },
    ],
    bullets: ['Visual inspection and assembly checks', 'AOI where applicable', 'Functional testing based on instructions', 'Test fixture discussion if required', 'Shipment inspection and delivery preparation'],
    workflow: ['Review quality and testing requirements', 'Confirm inspection and functional test scope', 'Coordinate testing according to agreed conditions', 'Prepare shipment after checks and documentation as required'],
    filesNeeded: [...commonFiles, 'Functional test instructions, firmware, fixture notes, or pass/fail criteria when testing is required'],
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'Quality control overview', href: '/quality' },
      { label: 'Request testing review', href: '/contact' },
    ],
    faq: [
      {
        question: 'Do all PCBA projects include functional testing?',
        answer: 'No. Functional testing depends on project requirements and usually needs customer-provided test instructions, firmware, fixtures, or acceptance criteria.',
      },
      {
        question: 'Can you provide AOI inspection?',
        answer: 'AOI can be coordinated for suitable SMT assembly projects as part of the confirmed inspection scope.',
      },
      {
        question: 'Can you build a test fixture?',
        answer: 'A test fixture can be discussed when the project requires it, but fixture scope, cost, and lead time should be confirmed before production.',
      },
      {
        question: 'Can you provide a test report?',
        answer: 'A test report can be provided based on project requirements and the agreed testing scope.',
      },
    ],
  },
};
