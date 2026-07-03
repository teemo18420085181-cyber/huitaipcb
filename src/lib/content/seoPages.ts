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
  whoThisIsFor?: string[];
  productionChecks?: string[];
  workflow?: string[];
  filesNeeded?: string[];
  answerLinks?: RelatedLink[];
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
    metaDescription: 'PCB assembly services in China for overseas teams — engineer-reviewed Gerber & BOM, component sourcing, SMT & DIP assembly, testing support, and delivery preparation.',
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
    quickAnswer: 'Huitai Electronics is a Shenzhen-based turnkey PCBA supplier for overseas hardware teams comparing PCB assembly in China. Buyers can send Gerber files, BOM, pick-and-place data, assembly drawings, quantity, and test requirements for engineering review before quotation. The scope connects PCB fabrication, component sourcing, SMT/DIP assembly, inspection, functional testing support, packaging, and delivery.',
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
        heading: 'For Overseas PCB Assembly Buyers',
        body: 'For overseas buyers comparing a PCB assembly service in China, Huitai focuses on engineering review, BOM confirmation, SMT/DIP assembly, testing requirements, and delivery preparation. This page is for engineers, hardware teams, and purchasing teams that want one China-based PCBA supplier to coordinate prototype or low-volume PCBA projects.',
      },
    ],
    bullets: ['PCB fabrication coordinated as part of PCBA delivery', 'BOM sourcing and customer-approved alternatives', 'SMT assembly and through-hole (DIP) assembly', 'Inspection and functional testing based on confirmed requirements', 'Prototype and low-volume project review', 'Packaging and delivery preparation'],
    whoThisIsFor: [
      'Overseas buyers comparing PCB assembly suppliers in China',
      'Hardware engineers that need Gerber, BOM, assembly, sourcing, and testing reviewed together',
      'Prototype teams preparing for low-volume PCBA production',
      'Purchasing teams that want a Shenzhen-based turnkey PCBA supplier instead of separate PCB and SMT vendors',
    ],
    productionChecks: [
      'Gerber readiness, PCB specifications, drill data, and assembly notes',
      'BOM completeness, MPN clarity, package fit, and sourcing risk',
      'Pick-and-place data, polarity, orientation, and through-hole assembly requirements',
      'Inspection points, functional test method, packaging needs, and delivery scope',
    ],
    workflow: ['Submit Gerber, BOM, quantity, drawings, and testing requirements', 'Engineering review checks files, BOM risk, and assembly notes', 'Quote scope confirms PCB fabrication, sourcing, SMT/DIP, inspection/testing support, and delivery', 'Customer approves sourcing and testing assumptions before purchasing or production', 'Packaging and delivery are prepared after assembly and agreed checks'],
    filesNeeded: commonFiles,
    answerLinks: [
      { label: 'Review a one-stop turnkey PCBA scope', href: '/turnkey-pcb-assembly' },
      { label: 'Prepare prototype PCB assembly files', href: '/prototype-pcb-assembly' },
      { label: 'Plan low-volume PCBA after validation', href: '/low-volume-pcba-assembly' },
      { label: 'Check BOM sourcing risk before assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Upload Gerber and BOM for review', href: '/contact#project-files' },
    ],
    relatedLinks: [
      { label: 'Turnkey PCBA service in China', href: '/turnkey-pcb-assembly' },
      { label: 'BOM sourcing for PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Prototype PCB assembly review', href: '/prototype-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
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
        question: 'Do you support both PCB fabrication and assembly?',
        answer: 'Yes. Huitai coordinates PCB fabrication and PCB assembly as one turnkey PCBA workflow, including component sourcing, SMT/DIP assembly, inspection/testing support, packaging, and delivery preparation.',
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
      {
        question: 'What should overseas buyers check before choosing a PCBA supplier?',
        answer: 'When choosing a PCB assembly supplier in China, check whether the supplier reviews Gerber and BOM files together, confirms sourcing risk, explains SMT/DIP and testing scope, requires customer approval for alternatives, and can support the project from prototype to low-volume delivery.',
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
    quickAnswer: 'Prototype PCB assembly helps early-stage hardware teams validate design files, BOM readiness, component sourcing, SMT/DIP assembly feasibility, and testing requirements before low-volume production. Huitai reviews Gerber, BOM, CPL or pick-and-place data, drawings, quantity, sample board photos, revision notes, and test inputs before quoting a small prototype build.',
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
    whoThisIsFor: [
      'Hardware startups and engineers validating an early PCBA design',
      'Industrial device teams that need a small prototype build before low-volume production',
      'Buyers with Gerber and BOM files that still need DFM/DFA and sourcing review',
      'Projects where a sample board, revision notes, or test method should be checked before SMT assembly',
    ],
    productionChecks: [
      'Gerber, drill, CPL, polarity, orientation, and assembly drawing consistency',
      'BOM risk, missing MPNs, obsolete parts, package compatibility, and no-substitute lines',
      'SMT/DIP assembly feasibility, special handling notes, and first-build review points',
      'Functional test method, firmware, fixtures, acceptance criteria, and low-volume transition notes',
    ],
    workflow: ['Submit prototype files, quantity, revision notes, and testing inputs', 'Review missing files, BOM risks, and assembly feasibility', 'Confirm sourcing alternatives only after customer approval', 'Coordinate prototype SMT/DIP assembly, inspection, and agreed testing support', 'Use prototype feedback to prepare low-volume PCBA scope'],
    filesNeeded: commonFiles,
    answerLinks: [
      { label: 'Plan low-volume PCBA after prototype validation', href: '/low-volume-pcba-assembly' },
      { label: 'Compare China PCB assembly quote scope', href: '/china-pcb-assembly' },
      { label: 'Upload prototype files for engineering review', href: '/contact#project-files' },
    ],
    relatedLinks: [
      { label: 'BOM sourcing risk review', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'Turnkey PCBA service in China', href: '/turnkey-pcb-assembly' },
      { label: 'China PCB assembly quote review', href: '/china-pcb-assembly' },
      { label: 'Upload prototype files for review', href: '/contact#project-files' },
    ],
    ctaHeading: 'Upload Prototype Files for Review',
    ctaBody: 'Send Gerber, BOM, CPL/pick-and-place data, drawings, quantity, sample photos, revision notes, and testing requirements. We will review prototype PCBA scope, BOM sourcing risk, assembly details, and testing needs before quotation.',
    primaryCtaLabel: 'Upload Prototype Files for Review',
    faq: [
      {
        question: 'What quantity is suitable for prototype PCB assembly?',
        answer: 'Prototype PCB assembly is usually used for small quantities that help validate design, BOM, assembly notes, and test requirements before a low-volume build. Huitai can review the target quantity with the project files before quotation.',
      },
      {
        question: 'Can you quote from Gerber and BOM only?',
        answer: 'Gerber and BOM files can start the review. CPL or pick-and-place data, drawings, sample photos, quantity, revision notes, and testing requirements help make the quote and build scope clearer.',
      },
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
        question: 'Can you review a sample board before production?',
        answer: 'Yes. Sample board photos or a physical reference can help clarify orientation, connectors, workmanship expectations, or testing points, but production still needs controlled Gerber, BOM, and assembly data.',
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
    metaDescription: 'Supplier support in China for turnkey PCB assembly: PCB fabrication, BOM sourcing, SMT/DIP assembly, testing support, and delivery for overseas buyers.',
    eyebrow: 'TURNKEY PCBA MANUFACTURING',
    primaryKeyword: 'Turnkey PCB Assembly Service in China',
    serviceName: 'Turnkey PCB Assembly Service in China',
    serviceType: 'Turnkey PCB assembly service',
    quickAnswer: 'Turnkey PCB assembly means one supplier manages PCB fabrication, component sourcing, SMT/DIP assembly, inspection, functional testing support, packaging, and delivery. Huitai reviews Gerber, BOM, pick-and-place data, drawings, quantity, sourcing risk, DFM/DFA questions, and test requirements before production so engineers and hardware startups avoid fragmented supplier communication.',
    intro: 'Upload Gerber and BOM for engineering review before quotation. Huitai is a turnkey PCB assembly supplier in China for overseas buyers who need PCB fabrication, BOM sourcing, SMT/DIP assembly, testing support, and finished PCBA delivery in one coordinated workflow.',
    sections: [
      {
        heading: 'Turnkey PCB Assembly Supplier in China',
        body: 'Huitai works as a turnkey PCBA supplier in China for projects that need PCB fabrication, BOM sourcing, component procurement, SMT/DIP assembly, testing, and delivery. This one-stop PCB assembly support in China keeps the main production steps connected before quotation and build planning.',
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
    whoThisIsFor: [
      'Engineers and hardware startups that want one supplier to manage PCB, components, assembly, testing, and delivery',
      'Overseas teams that want fewer handoffs between separate PCB, sourcing, and SMT suppliers',
      'Prototype and low-volume projects that need BOM review, DFM/DFA discussion, and testing scope confirmed early',
      'Industrial electronics projects where purchasing and engineering decisions need a clear approval path',
    ],
    productionChecks: [
      'PCB fabrication specifications, Gerber readiness, stack-up notes, and drill data',
      'BOM availability, lifecycle risk, package compatibility, and customer-approved alternatives',
      'DFM/DFA questions, SMT/DIP process needs, polarity, orientation, and special handling',
      'AOI, visual inspection, functional test method, packaging requirements, and delivery scope',
    ],
    workflow: ['Upload Gerber, BOM, quantity, and testing requirements', 'Review files, quote factors, BOM risks, and missing information', 'Confirm PCB fabrication, sourcing, alternatives, SMT/DIP assembly, and testing scope', 'Purchase approved components and coordinate assembly after scope confirmation', 'Inspect, test by agreed scope, package, and prepare delivery'],
    filesNeeded: commonFiles,
    answerLinks: [
      { label: 'Review BOM sourcing risk before purchasing', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Prepare prototype PCB assembly files', href: '/prototype-pcb-assembly' },
      { label: 'Discuss PCBA inspection and testing scope', href: '/quality' },
      { label: 'Upload Gerber and BOM for engineering review', href: '/contact#project-files' },
    ],
    relatedLinks: [
      { label: 'BOM sourcing and PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'China PCB assembly quote review', href: '/china-pcb-assembly' },
      { label: 'Prototype PCB assembly review', href: '/prototype-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'PCBA inspection and testing process', href: '/quality' },
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
        question: 'Can Huitai help source components?',
        answer: 'Yes. Component sourcing can be included in the turnkey PCBA scope. Huitai reviews BOM clarity, availability, lifecycle risk, and possible alternatives before customer-approved purchasing.',
      },
      {
        question: 'How do you check BOM risk before assembly?',
        answer: 'The BOM is reviewed for missing MPNs, obsolete or unavailable parts, long-lead items, package compatibility, no-substitute notes, and alternatives that need customer approval before purchasing.',
      },
      {
        question: 'Can an incomplete BOM be reviewed, and how are alternatives approved?',
        answer: 'Yes. Huitai can review missing MPNs, obsolete or unavailable parts, unclear packages, and possible alternatives. Alternatives are discussed with the customer and approved before purchasing or assembly.',
      },
      {
        question: 'Is turnkey PCBA better than using separate PCB and SMT suppliers?',
        answer: 'For many overseas projects, turnkey PCBA reduces communication risk because PCB fabrication, sourcing, assembly, inspection, testing scope, packaging, and delivery are reviewed as one connected workflow.',
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
    metaDescription: 'For 5 to 1,000 pcs type PCBA projects, Huitai reviews Gerber, BOM, quantity, testing needs, and sourcing risks before prototype-to-low-volume production.',
    eyebrow: 'LOW-VOLUME PCBA',
    primaryKeyword: 'Low-Volume PCBA Assembly in China',
    serviceName: 'Low-Volume PCBA Assembly in China',
    serviceType: 'Low-volume PCBA assembly service',
    quickAnswer: 'Low-volume PCBA assembly is used after prototype validation for small batch projects such as 50, 100, 500, or 1,000 pcs, while very small 5 pcs builds can also be reviewed when suitable. Huitai supports sourcing, SMT/DIP assembly, inspection, functional testing support, packaging, and delivery for industrial electronics, IoT, test equipment, and custom hardware.',
    intro: 'For 5 to 1,000 pcs type PCBA projects, send Gerber, BOM, quantity, testing needs, and sourcing notes for engineering review before quotation. Huitai supports low-volume PCB assembly in China and prototype-to-small-batch PCBA with sourcing, assembly, testing support, packaging, and delivery.',
    sections: [
      {
        heading: 'What Low-Volume PCBA Is Suitable For',
        body: 'Low-volume PCBA is useful for 5, 10, 50, 100, 500, or 1,000 pcs pilot runs, engineering validation, market testing, pre-production builds, and small industrial product batches where process control and sourcing clarity matter.',
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
    whoThisIsFor: [
      'Industrial electronics, IoT, test equipment, and custom hardware teams moving beyond prototype',
      'Projects that need 50, 100, 500, or 1,000 pcs type production after validation',
      'Buyers that want the same PCBA supplier to coordinate sourcing, assembly, testing support, packaging, and delivery',
      'Teams that need BOM risk and process stability reviewed before small batch production',
    ],
    productionChecks: [
      'Prototype feedback, latest revision files, quantity target, and production purpose',
      'BOM availability, approved alternatives, long-lead parts, and package compatibility',
      'SMT/DIP setup, stencil needs, first-article review points, and inspection plan',
      'Functional test requirements, packaging method, delivery scope, and change-control notes',
    ],
    workflow: ['Review quantity and production purpose', 'Check BOM risks and alternative options', 'Coordinate assembly route and inspection plan', 'Confirm testing and delivery requirements'],
    filesNeeded: commonFiles,
    answerLinks: [
      { label: 'Validate files with prototype PCB assembly first', href: '/prototype-pcb-assembly' },
      { label: 'Review PCBA inspection and testing scope', href: '/quality' },
      { label: 'Send low-volume PCBA files for review', href: '/contact#project-files' },
    ],
    relatedLinks: [
      { label: 'Prototype PCB assembly service', href: '/prototype-pcb-assembly' },
      { label: 'PCBA inspection and testing process', href: '/quality' },
      { label: 'Prototype vs batch PCB assembly', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'Is there a minimum order quantity?', href: '/knowledge/pcb-assembly-minimum-order-quantity' },
      { label: 'Turnkey PCBA manufacturing', href: '/turnkey-pcb-assembly' },
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
        answer: 'Low-volume PCBA usually refers to small production runs such as 50, 100, 500, or 1,000 pcs after prototype validation. Very small 5 or 10 pcs builds can also be reviewed when the project fits a turnkey PCBA workflow.',
      },
      {
        question: 'Is small batch PCB assembly in China supported?',
        answer: 'Yes. Huitai can review small batch PCBA projects such as prototype follow-up builds, pilot runs, and low-volume production. The review depends on Gerber, BOM, pick-and-place data, assembly requirements, testing scope, and quantity.',
      },
      {
        question: 'When should a project move from prototype to low-volume production?',
        answer: 'A project is usually ready to move when the prototype revision is stable, BOM choices are approved, assembly notes are clear, and the inspection or functional test method is defined for the small batch.',
      },
      {
        question: 'Can the same supplier handle prototype and low-volume production?',
        answer: 'Yes. Keeping prototype and low-volume PCBA with the same turnkey supplier can preserve file history, BOM decisions, assembly notes, inspection points, and test scope across revisions.',
      },
      {
        question: 'How do you reduce risk before small batch production?',
        answer: 'Risk is reduced by reviewing the latest Gerber and BOM, confirming approved alternatives, checking assembly notes, defining inspection and test scope, and clarifying packaging and delivery requirements before production.',
      },
      {
        question: 'What files should I prepare for a small-batch PCBA quote?',
        answer: 'Please send Gerber files, BOM, quantity target, drawings, pick-and-place data if available, testing notes, and any no-substitute component requirements.',
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
    quickAnswer: 'BOM sourcing for PCB assembly means checking whether each component is clear, available, compatible with the PCB footprint, and suitable for customer-approved purchasing before SMT starts. Huitai reviews obsolete, hard-to-find, long-lead-time, package-risk, and lifecycle issues, then discusses alternatives without replacing any part before customer confirmation.',
    intro: 'Send your BOM for sourcing risk review before PCB assembly quotation. Huitai provides PCBA BOM sourcing review and component sourcing for PCB assembly by checking BOM completeness, MPN clarity, obsolete or unavailable parts, package compatibility, sourcing alternatives, and customer approval requirements together with Gerber and assembly files when available.',
    sections: [
      {
        heading: 'PCBA BOM Sourcing and MPN Clarity',
        body: 'A sourcing review starts by checking whether each BOM line has a clear manufacturer part number, designator, quantity, package, value, and any no-substitute notes. For PCB assembly projects with component sourcing needs, missing or unclear MPNs are flagged before quotation is finalized.',
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
    whoThisIsFor: [
      'PCBA projects where the BOM has obsolete, hard-to-find, long-lead-time, or single-source parts',
      'Engineers that need MPN, package, footprint, lifecycle, and availability reviewed before SMT assembly',
      'Overseas buyers that want BOM sourcing handled as part of turnkey PCB assembly, not standalone component distribution',
      'Teams that need alternative parts discussed and approved before purchasing',
    ],
    productionChecks: [
      'MPN clarity, designators, quantities, package, value, and no-substitute notes',
      'Lifecycle status, availability, long-lead-time risk, obsolete items, and sourcing stability',
      'Package and footprint compatibility against Gerber, CPL, and assembly drawings when available',
      'Customer approval status for alternatives before purchasing or SMT assembly',
    ],
    workflow: ['BOM received with MPNs, designators, quantities, packages, and notes', 'Missing MPNs, obsolete parts, unavailable items, and package risks are flagged', 'Gerber, CPL, drawings, quantity, and testing notes are reviewed together when available', 'Alternatives are discussed and approved by the customer before purchasing', 'Sourcing scope is confirmed as part of the PCB assembly quotation'],
    filesNeeded: commonFiles,
    answerLinks: [
      { label: 'Connect sourcing review with turnkey PCBA', href: '/turnkey-pcb-assembly' },
      { label: 'Send BOM and Gerber files for review', href: '/contact#project-files' },
    ],
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
        question: 'Is component sourcing included in PCB assembly?',
        answer: 'For turnkey PCBA projects, Huitai can review the BOM, check MPN clarity, identify obsolete or unavailable parts, and discuss alternative components before PCB assembly purchasing. Alternatives are not used without customer approval.',
      },
      {
        question: 'Can you help source components for PCBA?',
        answer: 'Yes. Huitai can review and source components as part of a turnkey PCBA project, including PCB fabrication, BOM sourcing, SMT/DIP assembly, inspection/testing support, packaging, and delivery.',
      },
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
      {
        question: 'How does BOM sourcing affect PCB assembly lead time?',
        answer: 'BOM sourcing can affect timing when parts are obsolete, long-lead, single-source, or missing clear MPNs. Reviewing those risks before SMT assembly helps clarify what can be purchased now and what needs customer approval.',
      },
    ],
  },
  'pcba-testing-quality-control': {
    slug: 'pcba-testing-quality-control',
    title: 'PCBA Testing and Quality Control',
    seoTitle: 'PCBA Testing and Quality Control | Huitai Electronics',
    metaDescription: 'PCBA testing and quality control: visual inspection, AOI, functional testing to your spec, fixture discussion, and pre-shipment checks with documentation by agreed scope.',
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
