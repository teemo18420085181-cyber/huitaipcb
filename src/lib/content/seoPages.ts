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
  primaryCtaLabel?: string;
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
    title: 'China PCB Assembly Quote for Turnkey PCBA Projects',
    seoTitle: 'China PCB Assembly Quote | Turnkey PCBA Supplier',
    metaDescription: 'Request a China PCB assembly quote with Gerber, BOM, quantity, drawings, and testing requirements reviewed before turnkey PCBA fabrication, sourcing, assembly, and delivery.',
    eyebrow: 'CHINA PCB ASSEMBLY SUPPLIER',
    primaryKeyword: 'China PCB Assembly Quote',
    serviceName: 'China PCB Assembly Quote Review',
    serviceType: 'China turnkey PCBA assembly service',
    quickAnswer: 'Huitai Electronics is a Shenzhen-based turnkey PCBA supplier for overseas buyers who need a China PCB assembly quote reviewed from project files, not a bare-board-only or SMT-only order. Gerber files, BOM, quantity, drawings, and testing requirements are checked before quotation so PCB fabrication, component sourcing, SMT/DIP assembly, inspection/testing support, packaging, and delivery stay connected.',
    intro: 'Send Gerber files, BOM, quantity, drawings, sample photos, and testing requirements for engineering review before quotation. Huitai reviews the complete turnkey PCBA scope in China, from PCB fabrication and BOM sourcing to SMT/DIP assembly, inspection/testing support, packaging, and delivery.',
    sections: [
      {
        heading: 'Engineering Review Before Quotation',
        body: 'A useful China PCB assembly quote starts with Gerber files, BOM, target quantity, drawings, and testing requirements. Huitai reviews what is complete, what is missing, and which sourcing or testing questions should be clarified before quotation.',
      },
      {
        heading: 'Turnkey Scope Behind the Quote',
        body: 'The review covers PCB fabrication, BOM/component sourcing, SMT assembly, through-hole (DIP) assembly, inspection/testing support, packaging, and delivery preparation. These steps are quoted as a connected PCBA workflow rather than separate bare-board or placement-only services.',
      },
      {
        heading: 'Quote Factors to Confirm Early',
        body: 'Quantity, BOM availability, package compatibility, PCB specifications, assembly notes, testing requirements, packaging needs, and shipping destination can all affect quote scope. Clear information helps separate what can be quoted now from what needs sourcing or engineering confirmation.',
      },
      {
        heading: 'For Turnkey PCBA Buyers',
        body: 'This page is for overseas engineers, hardware teams, and purchasing teams that want one China-based PCBA supplier to coordinate fabrication, sourcing, assembly, inspection/testing support, and delivery for prototype or low-volume projects.',
      },
    ],
    bullets: ['PCB fabrication coordinated as part of PCBA delivery', 'BOM sourcing and customer-approved alternatives', 'SMT assembly and through-hole (DIP) assembly', 'Inspection and functional testing based on confirmed requirements', 'Prototype and low-volume project review', 'Packaging and delivery preparation'],
    workflow: ['Submit Gerber, BOM, quantity, drawings, and testing requirements', 'Engineering review checks files, BOM risk, and assembly notes', 'Quote scope confirms PCB fabrication, sourcing, SMT/DIP, inspection/testing support, and delivery', 'Customer approves sourcing and testing assumptions before purchasing or production', 'Packaging and delivery are prepared after assembly and agreed checks'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA service in China', href: '/turnkey-pcb-assembly' },
      { label: 'BOM sourcing for PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Prototype PCB assembly review', href: '/prototype-pcb-assembly' },
      { label: 'Upload Gerber and BOM for engineering review', href: '/contact#project-files' },
    ],
    ctaHeading: 'Request a China PCB Assembly Quote',
    ctaBody: 'Upload Gerber files, BOM, quantity, drawings, sample photos, and testing requirements. We will review the turnkey PCBA scope before quotation and flag missing files, BOM sourcing risks, component shortage items, or test requirements that need confirmation.',
    primaryCtaLabel: 'Request a China PCB Assembly Quote',
    faq: [
      {
        question: 'What files are needed for a China PCB assembly quote?',
        answer: 'Please send Gerber and drill files, BOM with manufacturer part numbers, target quantity, drawings or pick-and-place data when available, and testing requirements. These files let Huitai review PCB fabrication, sourcing, assembly, inspection/testing support, and delivery scope before quotation.',
      },
      {
        question: 'Can an incomplete BOM be reviewed?',
        answer: 'Yes. A partial BOM can be reviewed to identify missing MPNs, unclear packages, no-substitute lines, or parts that need confirmation. A firm quote may still need additional file or sourcing details.',
      },
      {
        question: 'Is component sourcing included?',
        answer: 'Component sourcing can be included as part of turnkey PCBA. Huitai reviews MPN clarity, availability, shortage risk, and possible customer-approved alternatives before purchasing.',
      },
      {
        question: 'Are prototype and low-volume builds supported?',
        answer: 'Prototype and low-volume PCBA projects can be reviewed when the project needs turnkey fabrication, sourcing, SMT/DIP assembly, inspection/testing support, and delivery. Quantity, BOM risk, and testing requirements are confirmed before quotation.',
      },
      {
        question: 'How are testing requirements agreed?',
        answer: 'Testing scope is agreed from the information you provide, such as test instructions, firmware, fixtures, inspection criteria, or acceptance notes. Functional testing is planned only after the method and responsibility are confirmed.',
      },
    ],
  },
  'pcb-assembly-company': {
    slug: 'pcb-assembly-company',
    title: 'PCB Assembly Company in China for Turnkey PCBA',
    seoTitle: 'PCB Assembly Company China | PCBA Fit Review',
    metaDescription: 'Evaluate a China PCB assembly company for turnkey PCBA. Send Gerber, BOM, drawings, sourcing notes, testing needs, and delivery scope for project fit review.',
    eyebrow: 'PCB ASSEMBLY COMPANY',
    primaryKeyword: 'PCB Assembly Company in China',
    serviceName: 'PCB Assembly Company in China for Turnkey PCBA',
    serviceType: 'Managed PCBA manufacturing and assembly service',
    quickAnswer: 'A suitable PCB assembly company should help buyers confirm project fit before quotation: file readiness, BOM shortage handling, sourcing approval, assembly scope, testing responsibility, communication rhythm, packaging, and delivery scope. Huitai focuses on China-based turnkey PCBA projects rather than standalone bare PCB, SMT-only, or component-distribution work.',
    intro: 'Use this page to evaluate whether Huitai fits your PCBA project. Send Gerber, BOM, drawings, quantity, sourcing notes, testing information, and delivery requirements for a practical project fit review before quotation.',
    sections: [
      {
        heading: 'Supplier Evaluation Checklist',
        body: 'Before choosing a PCB assembly company, confirm whether the supplier reviews Gerber and BOM files together, flags missing information, handles BOM shortage risk, defines customer approval boundaries, and explains assembly, testing, packaging, and delivery scope.',
      },
      {
        heading: 'Project Fit Review Before Quote',
        body: 'Huitai reviews whether the available files and requirements match a turnkey PCBA workflow. The goal is to identify missing files, unclear BOM lines, testing gaps, and delivery assumptions before a quote is treated as final.',
      },
      {
        heading: 'BOM Shortage and Approval Handling',
        body: 'BOM shortages, obsolete parts, unclear MPNs, package mismatches, and possible alternatives should be raised before purchasing. Huitai can suggest sourcing options, but the customer approves alternatives before they are used.',
      },
      {
        heading: 'Testing Responsibility and Communication',
        body: 'Testing scope depends on customer-provided instructions, firmware, fixtures, or acceptance criteria. Clear communication before production helps define what Huitai can inspect or test and what remains the customer responsibility.',
      },
      {
        heading: 'China-Based Turnkey PCBA Scope',
        body: 'The fit is strongest when the buyer needs PCB fabrication, BOM/component sourcing, SMT/DIP assembly, inspection/testing support, packaging, and delivery coordinated as one PCBA project.',
      },
    ],
    bullets: ['File and project fit review before quotation', 'BOM shortage and alternative approval process', 'Turnkey PCB fabrication, sourcing, and assembly scope', 'Testing responsibility confirmed from customer inputs', 'Communication and delivery scope planning'],
    workflow: ['Submit Gerber, BOM, drawings, quantity, and testing notes', 'Review project fit and missing information', 'Clarify BOM shortages, sourcing alternatives, and approval boundaries', 'Confirm assembly, inspection/testing support, packaging, and delivery scope'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'China PCB assembly quote review', href: '/china-pcb-assembly' },
      { label: 'Turnkey PCBA service in China', href: '/turnkey-pcb-assembly' },
      { label: 'BOM sourcing for PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Send your project for PCBA fit review', href: '/contact#project-files' },
    ],
    ctaHeading: 'Send Your Project for PCBA Fit Review',
    ctaBody: 'Upload Gerber, BOM, drawings, quantity, sourcing notes, and testing requirements. Huitai will review project fit, BOM shortage risk, assembly scope, and delivery assumptions before quotation.',
    primaryCtaLabel: 'Send Your Project for PCBA Fit Review',
    faq: [
      {
        question: 'How should a buyer compare PCBA companies?',
        answer: 'Compare how each company reviews Gerber and BOM files, handles BOM shortages, defines approval boundaries, explains testing responsibility, communicates quote assumptions, and coordinates delivery scope. Avoid choosing only by an instant price line.',
      },
      {
        question: 'What should be confirmed before quotation?',
        answer: 'Confirm Gerber readiness, BOM completeness, quantity, drawings, assembly notes, component sourcing scope, testing requirements, packaging needs, and delivery destination before treating the quote as final.',
      },
      {
        question: 'Who handles BOM shortages?',
        answer: 'Huitai can review shortage, obsolete, unavailable, or unclear parts and suggest sourcing options or alternatives. The customer approves any alternative before purchasing or production.',
      },
      {
        question: 'What testing information is needed?',
        answer: 'Testing information may include test instructions, firmware, fixtures, communication protocols, inspection criteria, or pass/fail requirements. The agreed test scope is confirmed before production.',
      },
      {
        question: 'What files can start a review?',
        answer: 'Gerber files, BOM, drawings, quantity, sample photos, pick-and-place data, and testing notes can start the review. If some files are incomplete, Huitai can identify what is missing before quotation.',
      },
    ],
  },
  'prototype-pcb-assembly': {
    slug: 'prototype-pcb-assembly',
    title: 'Prototype PCB Assembly in China with File Review',
    seoTitle: 'Prototype PCB Assembly China | File & BOM Review Before Build',
    metaDescription: 'Upload prototype Gerber, BOM, CPL, drawings, quantity, and notes for review. Huitai checks BOM risk, revisions, testing needs, and low-volume transition scope.',
    eyebrow: 'PROTOTYPE PCBA ASSEMBLY',
    primaryKeyword: 'Prototype PCB Assembly in China',
    serviceName: 'Prototype PCB Assembly in China',
    serviceType: 'Prototype PCBA assembly service',
    quickAnswer: 'Prototype PCB assembly helps engineering teams validate design files, BOM readiness, component sourcing, assembly feasibility, and testing requirements before a low-volume build. Huitai reviews Gerber, BOM, CPL/pick-and-place data, drawings, quantity, revision notes, and testing inputs before quotation.',
    intro: 'Upload prototype Gerber files, BOM, CPL or pick-and-place data, drawings, quantity, sample photos, and project notes for review. Huitai checks file completeness, BOM risk, revision questions, SMT/DIP assembly scope, testing support, and the path from prototype to low-volume production.',
    sections: [
      {
        heading: 'Prototype File Review',
        body: 'Prototype projects often reveal footprint, orientation, BOM, drawing, CPL, and test-method questions. Huitai reviews the available files and identifies missing information before quotation or build planning.',
      },
      {
        heading: 'What to Send Before Build',
        body: 'Useful inputs include Gerber and drill files, BOM with MPNs, CPL/pick-and-place data, assembly drawings, quantity, revision notes, sample photos, test instructions, firmware, fixtures, or acceptance criteria when available.',
      },
      {
        heading: 'BOM Risk Before Prototype Build',
        body: 'Before purchasing, Huitai checks missing MPNs, obsolete or unavailable parts, package compatibility, long-lead components, and no-substitute lines. Alternatives can be discussed, but customer approval is required before use.',
      },
      {
        heading: 'Revision Handling',
        body: 'If the prototype is under revision, send the latest files and mark what changed from the previous build. Revision notes help avoid quoting or sourcing against an outdated BOM, CPL, or drawing package.',
      },
      {
        heading: 'From Prototype Feedback to Low Volume',
        body: 'Prototype feedback can refine the BOM, component approvals, assembly notes, inspection points, and testing scope before low-volume PCBA. The goal is to reduce avoidable surprises when the project moves beyond the first build.',
      },
    ],
    bullets: ['Prototype file readiness review', 'Gerber, BOM, CPL, drawing, quantity, and note check', 'BOM risk and customer-approved alternatives', 'Revision questions before purchasing or assembly', 'Testing support based on confirmed instructions'],
    workflow: ['Submit prototype files, quantity, revision notes, and testing inputs', 'Review missing files, BOM risks, and assembly feasibility', 'Confirm sourcing alternatives only after customer approval', 'Coordinate prototype SMT/DIP assembly, inspection, and agreed testing support', 'Use prototype feedback to prepare low-volume PCBA scope'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'BOM sourcing risk review', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'Turnkey PCBA service in China', href: '/turnkey-pcb-assembly' },
      { label: 'Upload prototype files for review', href: '/contact#project-files' },
    ],
    ctaHeading: 'Upload Prototype Files for Review',
    ctaBody: 'Send Gerber, BOM, CPL/pick-and-place data, drawings, quantity, sample photos, revision notes, and testing requirements. We will review prototype PCBA scope, BOM sourcing risk, assembly details, and testing needs before quotation.',
    primaryCtaLabel: 'Upload Prototype Files for Review',
    faq: [
      {
        question: 'Can incomplete files be reviewed?',
        answer: 'Yes. Send the available Gerber, BOM, drawings, photos, revision notes, or project description. Huitai can identify missing items before quotation or build planning.',
      },
      {
        question: 'What is needed before build?',
        answer: 'Before build, the review should confirm Gerber and drill files, BOM, CPL or pick-and-place data, assembly drawings, quantity, revision notes, and testing or inspection requirements where applicable.',
      },
      {
        question: 'How are BOM risks handled?',
        answer: 'Huitai checks missing MPNs, obsolete or unavailable parts, package compatibility, and possible alternatives. Alternative components are discussed with the customer before purchasing or assembly.',
      },
      {
        question: 'Can revisions be reviewed?',
        answer: 'Yes. Send the latest revision package and mark the changes from the previous version. Revision notes help keep the BOM, CPL, drawings, and quote assumptions aligned.',
      },
      {
        question: 'What testing support can be discussed before low-volume production?',
        answer: 'Testing support can be discussed when you provide instructions, firmware, fixtures, or acceptance criteria. Prototype feedback can then refine inspection points, test scope, and BOM decisions for low-volume PCBA.',
      },
    ],
  },
  'turnkey-pcb-assembly': {
    slug: 'turnkey-pcb-assembly',
    title: 'Turnkey PCB Assembly Service in China',
    seoTitle: 'Turnkey PCB Assembly Service China | Gerber & BOM Review',
    metaDescription: 'Upload Gerber and BOM for turnkey PCBA review in China. Huitai coordinates PCB fabrication, component sourcing, SMT/DIP assembly, inspection/testing support, and delivery.',
    eyebrow: 'TURNKEY PCBA MANUFACTURING',
    primaryKeyword: 'Turnkey PCB Assembly Service in China',
    serviceName: 'Turnkey PCB Assembly Service in China',
    serviceType: 'Turnkey PCB assembly service',
    quickAnswer: 'Turnkey PCB assembly means one PCBA supplier coordinates PCB fabrication, BOM/component sourcing, SMT assembly, DIP assembly, inspection/testing support, packaging, and delivery. Huitai reviews files and quote factors before production so sourcing assumptions, alternatives, testing scope, and delivery requirements are clear.',
    intro: 'Upload Gerber and BOM for engineering review before quotation. Huitai coordinates one-stop turnkey PCBA in China, including PCB fabrication, BOM/component sourcing, SMT/DIP assembly, inspection/testing support, packaging, and delivery for prototype and low-volume projects.',
    sections: [
      {
        heading: 'What Is Turnkey PCB Assembly?',
        body: 'Turnkey PCB assembly coordinates the main steps needed to deliver finished PCBA boards: PCB fabrication, BOM/component sourcing, component purchasing after approval, SMT assembly, optional DIP assembly, inspection/testing support, packaging, and delivery.',
      },
      {
        heading: 'Quote Factors to Confirm',
        body: 'Turnkey quotes depend on PCB specifications, BOM availability, quantity, assembly complexity, special handling notes, approved alternatives, inspection/testing requirements, packaging, and shipping destination. These factors are reviewed before quotation.',
      },
      {
        heading: 'Files That Start the Review',
        body: 'Gerber and drill files, BOM, CPL/pick-and-place data, assembly drawings, quantity, sample photos, testing notes, firmware, fixtures, or acceptance criteria can help define the turnkey PCBA scope before production.',
      },
      {
        heading: 'Incomplete BOM and Alternatives',
        body: 'If a BOM is incomplete, Huitai can review missing MPNs, unclear packages, obsolete or unavailable parts, and possible customer-approved alternatives. Alternatives are discussed before purchasing or assembly.',
      },
      {
        heading: 'Prototype and Low-Volume Review',
        body: 'Turnkey PCBA is suitable when prototype or low-volume buyers need fabrication, sourcing, assembly, testing discussion, and delivery coordinated together instead of managing separate suppliers.',
      },
      {
        heading: 'Testing Scope Needs Confirmation',
        body: 'Inspection and testing scope is not assumed universally. Functional testing usually needs customer-provided instructions, firmware, fixtures, or acceptance criteria so responsibility and method can be agreed before production.',
      },
    ],
    bullets: ['PCB fabrication coordination', 'BOM/component sourcing and purchasing review', 'SMT assembly and optional DIP assembly', 'Inspection/testing support based on confirmed requirements', 'Finished PCBA packaging and delivery preparation'],
    workflow: ['Upload Gerber, BOM, quantity, and testing requirements', 'Review files, quote factors, BOM risks, and missing information', 'Confirm PCB fabrication, sourcing, alternatives, SMT/DIP assembly, and testing scope', 'Purchase approved components and coordinate assembly after scope confirmation', 'Inspect, test by agreed scope, package, and prepare delivery'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'BOM sourcing and PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'China PCB assembly quote review', href: '/china-pcb-assembly' },
      { label: 'Prototype PCB assembly review', href: '/prototype-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'Upload Gerber and BOM for engineering review', href: '/contact#project-files' },
    ],
    ctaHeading: 'Upload Gerber & BOM for Engineering Review',
    ctaBody: 'Send Gerber files, BOM, quantity, CPL/pick-and-place data, drawings, and testing requirements. Huitai will review PCB fabrication, sourcing, assembly, testing scope, packaging, and delivery assumptions before quotation.',
    primaryCtaLabel: 'Upload Gerber & BOM for Engineering Review',
    faq: [
      {
        question: 'What does turnkey PCB assembly include?',
        answer: 'Turnkey PCB assembly can include PCB fabrication, BOM/component sourcing, customer-approved purchasing, SMT assembly, optional DIP assembly, inspection/testing support, packaging, and delivery preparation as one connected PCBA workflow.',
      },
      {
        question: 'What files are needed?',
        answer: 'Gerber and drill files, BOM, quantity, CPL or pick-and-place data, drawings, sample photos, testing notes, firmware, fixtures, or acceptance criteria help define the review and quotation scope.',
      },
      {
        question: 'Can an incomplete BOM be reviewed, and how are alternatives approved?',
        answer: 'Yes. Huitai can review missing MPNs, obsolete or unavailable parts, unclear packages, and possible alternatives. Alternatives are discussed with the customer and approved before purchasing or assembly.',
      },
      {
        question: 'Can prototype and low-volume projects be reviewed?',
        answer: 'Prototype and low-volume turnkey PCBA projects can be reviewed when the buyer needs fabrication, sourcing, SMT/DIP assembly, inspection/testing support, packaging, and delivery coordinated together.',
      },
      {
        question: 'How is testing scope agreed?',
        answer: 'Testing scope is agreed from customer-provided test instructions, firmware, fixtures, acceptance criteria, or inspection notes. Functional testing is not assumed until the method and responsibility are confirmed.',
      },
    ],
  },
  'pcb-fabrication-and-assembly': {
    slug: 'pcb-fabrication-and-assembly',
    title: 'PCB Fabrication and Assembly Service',
    seoTitle: 'PCB Fabrication and Assembly Service in China | Huitai Electronics',
    metaDescription: 'PCB fabrication and assembly in China under one PCBA workflow: board fabrication coordination, component sourcing, SMT/DIP assembly, inspection, testing support, and finished-board delivery.',
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
    title: 'Low-Volume PCBA Assembly in China',
    seoTitle: 'Low-Volume PCBA Assembly in China | Prototype to Small Batch Builds',
    metaDescription: 'For 5-500 pcs PCBA projects, Huitai reviews Gerber, BOM, quantity, testing needs, and sourcing risks before quotation. Suitable for prototype and small-batch turnkey PCBA.',
    eyebrow: 'LOW-VOLUME PCBA',
    primaryKeyword: 'Low-Volume PCBA Assembly in China',
    serviceName: 'Low-Volume PCBA Assembly in China',
    serviceType: 'Low-volume PCBA assembly service',
    quickAnswer: 'Low-volume PCBA assembly is used for validation, trial production, and small batch builds before larger production. Huitai helps review files, check BOM availability, coordinate assembly, and plan testing without promising fixed lead time for every project.',
    intro: 'For 5-500 pcs PCBA projects, send Gerber, BOM, quantity, testing needs, and sourcing notes for engineering review before quotation. Huitai supports prototype-to-small-batch turnkey PCBA in China.',
    sections: [
      {
        heading: 'What Low-Volume PCBA Is Suitable For',
        body: 'Low-volume PCBA is useful for 5, 10, 50, 100, or 500 pcs pilot runs, engineering validation, market testing, pre-production builds, and small industrial product batches where process control and sourcing clarity matter.',
      },
      {
        heading: 'Common Cost Factors',
        body: 'Small-batch cost is affected by setup time, component availability, SMT programming, stencil requirements, testing scope, packaging, and whether alternatives need approval before purchasing.',
      },
      {
        heading: 'Why Unit Price Is Higher at Low Volume',
        body: 'At low volume, the per-board price is usually higher because fixed setup costs are shared across fewer boards. SMT line setup and programming, stencil fabrication, first-article checks, and any test-fixture preparation cost roughly the same for 10 boards as for 1,000, so they weigh much more on each unit. Component minimum order quantities also matter: if a part is sold in reels of 5,000, a small run still pays toward that minimum. This is normal across the industry; a clear BOM, approved alternates, and a sensible test scope are the practical ways to keep low-volume cost reasonable.',
      },
    ],
    bullets: ['Prototype-to-small-batch transition', 'BOM sourcing and alternatives review', 'SMT assembly and optional DIP assembly', 'Testing requirements planning', 'Lead time and shipment coordination'],
    workflow: ['Review quantity and production purpose', 'Check BOM risks and alternative options', 'Coordinate assembly route and inspection plan', 'Confirm testing and delivery requirements'],
    filesNeeded: commonFiles,
    relatedLinks: [
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
      { label: 'Prototype PCB assembly service', href: '/prototype-pcb-assembly' },
      { label: 'Prototype vs batch PCB assembly', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'Is there a minimum order quantity?', href: '/knowledge/pcb-assembly-minimum-order-quantity' },
      { label: 'China PCBA supplier comparison guide', href: '/knowledge/top-low-volume-turnkey-pcba-suppliers-china' },
      { label: 'JLCPCB alternatives for turnkey PCBA', href: '/knowledge/jlcpcb-alternatives-turnkey-pcba' },
      { label: 'Custom keyboard PCB assembly', href: '/knowledge/keyboard-pcb-assembly-china' },
      { label: 'Request a low-volume PCBA review', href: '/contact#project-files' },
    ],
    ctaHeading: 'Request a Low-Volume PCBA Review',
    ctaBody: 'Send Gerber, BOM, target quantity, testing notes, and any component concerns. We will review low-volume PCBA scope, BOM sourcing risk, alternative component needs, and assembly requirements before quotation.',
    primaryCtaLabel: 'Request a Low-Volume PCBA Review',
    faq: [
      {
        question: 'What is considered low-volume PCBA assembly?',
        answer: 'Low-volume PCBA usually refers to small production runs such as 5, 10, 50, 100, or 500 pcs used for validation, trial production, or early batch supply before scaling.',
      },
      {
        question: 'Can you support 5, 10, 50, 100, or 500 pcs?',
        answer: 'Yes. Huitai can review prototype and low-volume PCBA assembly projects in this range. The quote depends on Gerber readiness, BOM availability, assembly complexity, and testing requirements.',
      },
      {
        question: 'Is low-volume PCBA always cheaper?',
        answer: 'Not always. Setup, sourcing, stencil, inspection, and testing costs can have a larger impact on small quantities, so we review the full project before quotation.',
      },
      {
        question: 'What files should I prepare for a small-batch PCBA quote?',
        answer: 'Please send Gerber files, BOM, quantity target, drawings, pick-and-place data if available, testing notes, and any no-substitute component requirements.',
      },
      {
        question: 'Why is my per-board price higher at low volume?',
        answer: 'Fixed costs such as SMT setup and programming, stencil, first-article checks, and any test fixture are shared across fewer boards, so each unit carries more of them. Component minimum order quantities can add to this. A clean BOM with approved alternates and a sensible test scope help keep the per-board price reasonable.',
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
    title: 'BOM Sourcing Review for PCB Assembly',
    seoTitle: 'BOM Sourcing PCB Assembly | MPN, Shortage & Alternative Review',
    metaDescription: 'Send your BOM for PCB assembly sourcing risk review. Huitai checks MPN clarity, obsolete or unavailable parts, package compatibility, alternatives, and Gerber fit before purchasing.',
    eyebrow: 'BOM SOURCING FOR PCB ASSEMBLY',
    primaryKeyword: 'BOM Sourcing for PCB Assembly',
    serviceName: 'BOM Sourcing Review for PCB Assembly',
    serviceType: 'BOM sourcing and PCBA assembly service',
    quickAnswer: 'BOM sourcing for PCB assembly means reviewing whether the component list is clear, available, compatible with the PCB files, and ready for customer-approved purchasing as part of a turnkey PCBA project. Huitai reviews BOM completeness, MPN clarity, obsolete or unavailable parts, package compatibility, sourcing alternatives, and Gerber/BOM fit before quotation and purchasing.',
    intro: 'Send your BOM for sourcing risk review before PCB assembly quotation. Huitai checks BOM completeness, MPN clarity, obsolete or unavailable parts, package compatibility, sourcing alternatives, and customer approval requirements together with Gerber and assembly files when available.',
    sections: [
      {
        heading: 'BOM Completeness and MPN Clarity',
        body: 'A sourcing review starts by checking whether each BOM line has a clear manufacturer part number, designator, quantity, package, value, and any no-substitute notes. Missing or unclear MPNs are flagged before quotation is finalized.',
      },
      {
        heading: 'Obsolete, Unavailable, and Package Risk',
        body: 'Huitai reviews obsolete parts, unavailable components, unstable sourcing items, package mismatches, and parts that may require programming or special handling. These risks are discussed before purchasing or assembly planning.',
      },
      {
        heading: 'Alternatives Need Customer Approval',
        body: 'When a part is difficult to source, Huitai can suggest sourcing options or possible alternatives. Substitutions are not automatic: the customer reviews and approves any alternative before components are purchased or used.',
      },
      {
        heading: 'Gerber and BOM Reviewed Together',
        body: 'A BOM can be reviewed by itself for early sourcing risk, but a firm PCB assembly quote should connect the BOM with Gerber, CPL/pick-and-place data, drawings, quantity, and testing notes so package fit and assembly scope are clear.',
      },
      {
        heading: 'Purchasing Happens After Scope Confirmation',
        body: 'Parts are purchased after the sourcing plan, alternative approvals, project quantity, assembly scope, and quote assumptions are confirmed. This keeps BOM sourcing tied to the PCBA build rather than a separate components-only order.',
      },
    ],
    bullets: ['BOM completeness and MPN clarity review', 'Obsolete, unavailable, and shortage risk checks', 'Package compatibility checked against Gerber/CPL when available', 'Customer approval before alternatives or purchasing', 'Sourcing plan connected with turnkey PCB assembly scope'],
    workflow: ['BOM received with MPNs, designators, quantities, packages, and notes', 'Missing MPNs, obsolete parts, unavailable items, and package risks are flagged', 'Gerber, CPL, drawings, quantity, and testing notes are reviewed together when available', 'Alternatives are discussed and approved by the customer before purchasing', 'Sourcing scope is confirmed as part of the PCB assembly quotation'],
    filesNeeded: commonFiles,
    ctaHeading: 'Send Your BOM for Sourcing Risk Review',
    ctaBody: 'Send your BOM with MPNs, quantities, designators, packages, approved alternates, and no-substitute notes. If Gerber, CPL, drawings, or testing notes are ready, include them too so sourcing risk and assembly scope can be reviewed together before quotation.',
    primaryCtaLabel: 'Send Your BOM for Sourcing Risk Review',
    relatedLinks: [
      { label: 'Turnkey PCBA service in China', href: '/turnkey-pcb-assembly' },
      { label: 'Prototype PCB assembly review', href: '/prototype-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'Prepare files for a PCB assembly quote', href: '/knowledge/pcb-assembly-file-preparation-guide' },
      { label: 'Send your BOM for sourcing risk review', href: '/contact#project-files' },
    ],
    faq: [
      {
        question: 'What if MPNs are missing?',
        answer: 'A BOM with missing MPNs can still be reviewed. Huitai will flag unclear lines, package questions, and parts that need customer confirmation before quotation or purchasing.',
      },
      {
        question: 'How are obsolete or out-of-stock parts handled?',
        answer: 'Obsolete, unavailable, or unstable sourcing items are flagged during BOM review. Huitai may suggest sourcing options or alternatives, but parts are not substituted without customer approval.',
      },
      {
        question: 'Who approves alternatives?',
        answer: 'The customer approves alternatives before purchasing or assembly. Huitai can suggest options and explain package, availability, or sourcing concerns, but substitutions are not automatic.',
      },
      {
        question: 'Are Gerber and BOM reviewed together?',
        answer: 'Yes, when available. Gerber, BOM, CPL/pick-and-place data, drawings, quantity, and testing notes are reviewed together so sourcing risk and assembly scope match the actual PCBA build.',
      },
      {
        question: 'When are parts purchased?',
        answer: 'Parts are purchased after the sourcing plan, customer-approved alternatives, quantity, assembly scope, and quote assumptions are confirmed. Huitai keeps this service tied to the PCBA build, not a separate components-only order.',
      },
    ],
  },
  'pcba-testing-quality-control': {
    slug: 'pcba-testing-quality-control',
    title: 'PCBA Testing and Quality Control',
    seoTitle: 'PCBA Testing and Quality Control | Huitai Electronics',
    metaDescription: 'PCBA testing and quality control — visual inspection, AOI, functional testing to your spec, fixtures, and pre-shipment checks with documentation. Catch issues before shipping. Reply in 24h.',
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
      { label: 'Common PCBA defects and how to prevent them', href: '/knowledge/common-pcba-defects-and-prevention' },
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
