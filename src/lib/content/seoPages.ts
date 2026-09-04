import type { FaqItem } from '@/lib/content/faq';

export type RelatedLink = {
  label: string;
  href: string;
};

export type SeoRichSection = {
  heading: string;
  body?: string;
  items?: string[];
  note?: string;
  links?: RelatedLink[];
  table?: {
    columns: [string, string];
    rows: { label: string; value: string }[];
  };
  ordered?: boolean;
  tone?: 'default' | 'highlight';
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
  richSections?: SeoRichSection[];
  bullets: string[];
  whoThisIsFor?: string[];
  productionChecks?: string[];
  workflow?: string[];
  filesNeeded?: string[];
  answerLinks?: RelatedLink[];
  heroSecondaryLink?: RelatedLink;
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
    title: 'PCB Assembly Services for SMT and Through-Hole Production',
    seoTitle: 'PCB Assembly Services China | SMT & DIP | Huitai PCB',
    metaDescription: 'Huitai PCB provides SMT and through-hole PCB assembly services in Shenzhen for prototype, low-volume and repeat-production projects. Send Gerber, BOM and CPL for review.',
    eyebrow: 'SMT · DIP · THROUGH-HOLE ASSEMBLY',
    primaryKeyword: 'PCB Assembly Services',
    serviceName: 'PCB Assembly Services',
    serviceType: 'PCB Assembly',
    quickAnswer: 'PCB assembly is the manufacturing process of placing and soldering electronic components onto a printed circuit board to create an assembled PCBA. Depending on the design, the process can include SMT placement, reflow soldering, through-hole assembly, manual soldering, inspection and testing.',
    intro: 'Huitai PCB provides SMT and through-hole PCB assembly services in Shenzhen for prototype, low-volume and repeat-production projects. Send Gerber, BOM, CPL, assembly drawings and testing requirements so the assembly scope can be reviewed before quotation.',
    sections: [],
    richSections: [
      {
        heading: 'What Is PCB Assembly?',
        body: 'PCB assembly converts a bare printed circuit board into an assembled PCBA by placing and soldering the specified components. The manufacturing route depends on the component packages, board design, polarity and orientation requirements, through-hole content, workmanship notes and agreed inspection or test scope.',
        tone: 'highlight',
      },
      {
        heading: 'SMT Assembly',
        body: 'Surface-mount components are placed from the confirmed CPL and BOM data, then soldered through the approved reflow process. Package, polarity, feeder setup, stencil, paste and thermal requirements are reviewed against the actual assembly files.',
        links: [{ label: 'Review PCBA testing and quality control', href: '/pcba-testing-quality-control' }],
      },
      {
        heading: 'Through-Hole / DIP Assembly',
        body: 'Leaded components, connectors, transformers and other through-hole parts may require manual insertion, selective methods, wave soldering or hand soldering according to the board and workmanship requirements. The assembly drawing should identify orientation and any special handling notes.',
      },
      {
        heading: 'Mixed SMT and Through-Hole Assembly',
        body: 'Many industrial boards combine SMT devices with through-hole connectors or power components. The route must coordinate placement, reflow, through-hole insertion, soldering, cleaning and inspection in the correct order instead of treating the two processes as separate builds.',
      },
      {
        heading: 'Manual Soldering and Post-Assembly Work',
        body: 'Post-assembly work can include manual soldering, connector or wire attachment, touch-up, cleaning, programming labels or other confirmed operations. These steps should be identified before quotation because they affect workmanship instructions and inspection points.',
      },
      {
        heading: 'PCB Assembly Inspection',
        body: 'Inspection scope is matched to the board and confirmed requirements. It can include visual review, AOI after SMT, X-ray review where hidden joints require it, polarity and orientation checks, and electrical or functional testing when instructions and acceptance criteria are available.',
      },
      {
        heading: 'What Files Are Needed for PCB Assembly?',
        body: 'Use one controlled file package so placement, sourcing, assembly and test instructions refer to the same revision.',
        table: {
          columns: ['File / Information', 'Assembly purpose'],
          rows: [
            { label: 'Gerber and drill files', value: 'Confirm the bare-board data used for the assembly project.' },
            { label: 'BOM with manufacturer part numbers', value: 'Identify components, packages, quantities and approved sourcing decisions.' },
            { label: 'CPL / pick-and-place data', value: 'Provide SMT coordinates, rotation and reference designators.' },
            { label: 'Assembly drawing', value: 'Show polarity, orientation, mechanical references and special notes.' },
            { label: 'Quantity', value: 'Define the production stage and setup scope.' },
            { label: 'Testing and programming requirements', value: 'Define fixtures, firmware, instructions and acceptance criteria when applicable.' },
          ],
        },
        links: [{ label: 'Use the PCBA quote file checklist', href: '/pcba-quote-file-checklist' }],
      },
      {
        heading: 'Customer-Supplied Components or Component Sourcing?',
        body: 'Assembly can be reviewed with customer-supplied components, Huitai-coordinated sourcing, or a confirmed combination. Ownership of shortages, excess quantities, moisture-sensitive handling, approved alternatives and incoming component information should be clear before materials are released to production.',
        links: [{ label: 'Review BOM Sourcing for PCBA', href: '/bom-sourcing-pcb-assembly' }],
      },
      {
        heading: 'PCB Assembly for Different Production Stages',
        body: 'The same assembly processes may support different project stages, but the review emphasis changes with design maturity and quantity.',
        items: [
          'Prototype assembly for first builds, bring-up and design verification.',
          'Low-volume assembly for validated designs moving into repeatable small batches.',
          'Repeat production with controlled files, component decisions and test instructions.',
        ],
        links: [
          { label: 'Prototype PCB Assembly', href: '/prototype-pcb-assembly' },
          { label: 'Low-Volume PCBA Assembly', href: '/low-volume-pcba-assembly' },
        ],
      },
      {
        heading: 'PCB Assembly Workflow',
        body: 'The assembly route is released only after the available production inputs and open questions have been reviewed.',
        ordered: true,
        items: [
          'Review Gerber, BOM, CPL, drawings, quantity and test requirements.',
          'Confirm component ownership, assembly method and approved alternatives.',
          'Prepare SMT placement, reflow and any through-hole or manual operations.',
          'Inspect the assembled boards and perform the agreed testing or programming steps.',
          'Complete final review, packing and handoff under the confirmed project scope.',
        ],
      },
      {
        heading: 'PCB Assembly vs Turnkey PCB Assembly',
        body: 'PCB assembly mainly refers to mounting and soldering components onto a PCB, while turnkey PCB assembly also coordinates the connected fabrication, sourcing, purchasing and delivery work.',
        table: {
          columns: ['Scope', 'Primary responsibility'],
          rows: [
            { label: 'PCB Assembly Services', value: 'SMT placement, reflow, through-hole assembly, manual work, inspection and agreed testing.' },
            { label: 'Turnkey PCB Assembly', value: 'PCB fabrication, component sourcing and purchasing, assembly, testing, packaging and delivery coordination.' },
          ],
        },
        links: [
          { label: 'Turnkey PCB Assembly', href: '/turnkey-pcb-assembly' },
          { label: 'PCB Fabrication and Assembly', href: '/pcb-fabrication-and-assembly' },
        ],
      },
    ],
    bullets: ['SMT placement and reflow assembly', 'Through-hole and DIP assembly', 'Mixed-technology assembly routing', 'Manual soldering and post-assembly work', 'AOI, X-ray or visual inspection as applicable', 'Electrical or functional testing based on confirmed instructions'],
    heroSecondaryLink: { label: 'Compare Turnkey PCB Assembly', href: '/turnkey-pcb-assembly' },
    answerLinks: [
      { label: 'BOM Sourcing for PCBA', href: '/bom-sourcing-pcb-assembly' },
      { label: 'PCBA Testing & Quality Control', href: '/pcba-testing-quality-control' },
      { label: 'PCB Fabrication and Assembly', href: '/pcb-fabrication-and-assembly' },
      { label: 'Prototype PCB Assembly', href: '/prototype-pcb-assembly' },
      { label: 'Low-Volume PCBA Assembly', href: '/low-volume-pcba-assembly' },
      { label: 'Turnkey PCB Assembly', href: '/turnkey-pcb-assembly' },
    ],
    relatedLinks: [
      { label: 'Turnkey PCB Assembly', href: '/turnkey-pcb-assembly' },
      { label: 'BOM Sourcing for PCBA', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Prototype PCB Assembly', href: '/prototype-pcb-assembly' },
      { label: 'Low-Volume PCBA Assembly', href: '/low-volume-pcba-assembly' },
      { label: 'PCBA Testing & Quality Control', href: '/pcba-testing-quality-control' },
      { label: 'PCB Fabrication and Assembly', href: '/pcb-fabrication-and-assembly' },
    ],
    ctaHeading: 'Start Your PCB Assembly Project',
    ctaBody: 'Send Gerber, BOM, CPL, assembly drawings, quantity, component ownership and testing or programming requirements. Huitai will review the assembly inputs and confirm the SMT, through-hole, inspection and test scope before quotation.',
    primaryCtaLabel: 'Send PCB Assembly Files for Review',
    faq: [
      {
        question: 'What is PCB assembly?',
        answer: 'PCB assembly is the process of placing and soldering electronic components onto a printed circuit board to create an assembled PCBA. The route can include SMT, reflow, through-hole assembly, manual soldering, inspection and testing.',
      },
      {
        question: 'What files are needed for PCB assembly?',
        answer: 'Send Gerber and drill files, a BOM with manufacturer part numbers, CPL or pick-and-place data, an assembly drawing, quantity, and testing or programming requirements when applicable.',
      },
      {
        question: 'Can one board include SMT and through-hole components?',
        answer: 'Yes. Mixed-technology boards can combine SMT placement and reflow with through-hole insertion, DIP or manual soldering. The assembly sequence is reviewed from the actual design and workmanship notes.',
      },
      {
        question: 'Can customers supply their own components?',
        answer: 'Customer-supplied, Huitai-sourced, or mixed component ownership can be reviewed. The project should define shortages, excess quantities, approved alternatives and incoming component information before assembly.',
      },
      {
        question: 'What inspection can be included?',
        answer: 'Inspection may include visual checks, AOI, X-ray where appropriate, polarity and orientation review, and electrical or functional testing based on the confirmed board and project requirements.',
      },
      {
        question: 'How is PCB assembly different from turnkey PCB assembly?',
        answer: 'PCB assembly focuses on mounting and soldering components, while turnkey PCB assembly also coordinates PCB fabrication, component sourcing and purchasing, testing, packaging and delivery.',
      },
    ],
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
    quickAnswer: 'Huitai PCB is a Shenzhen-based PCBA manufacturing supplier for overseas hardware teams comparing PCB assembly in China. Buyers can send Gerber files, BOM, pick-and-place data, assembly drawings, quantity, and test requirements for manufacturing review before quotation. The scope connects PCB fabrication, component sourcing, SMT/DIP assembly, inspection, functional testing support, packaging, and delivery.',
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
        body: 'For overseas buyers, the key point is not only the unit price. A useful China PCB assembly quote should make the scope clear: PCB fabrication, component sourcing, SMT/DIP assembly, inspection, testing requirements, packing, and shipment. This helps both sides confirm what is included before production starts.',
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
      { label: 'China PCBA manufacturer workflow', href: '/china-pcba-manufacturer' },
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
        heading: 'PCB Assembly Manufacturer Evaluation Checklist',
        body: 'A PCB assembly manufacturer should review Gerber and BOM files together, flag missing information, handle BOM shortage risk, define customer approval boundaries, and explain assembly, testing, packaging, and delivery scope before quotation.',
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
    title: 'Prototype PCB Assembly in China from 5 Boards',
    seoTitle: 'Prototype PCB Assembly China | 5-Piece Builds | Huitai PCB',
    metaDescription: 'Prototype PCB assembly in China from 5 boards. Huitai reviews Gerber, BOM, CPL, revisions, component risks and test requirements before the first build.',
    eyebrow: 'FIRST BUILD · ENGINEERING VALIDATION',
    primaryKeyword: 'Prototype PCB Assembly in China',
    serviceName: 'Prototype PCB Assembly',
    serviceType: 'Prototype PCB Assembly',
    quickAnswer: 'Prototype PCB assembly is used to validate a new or revised PCB design before larger production. Huitai supports prototype builds starting from 5 assembled boards and reviews Gerber files, BOM, CPL data, revision information, component risks, assembly details and available test instructions before quotation and production.',
    intro: 'Use a prototype PCBA build for first hardware, bring-up, engineering validation and design verification. Huitai reviews the latest Gerber, BOM, CPL, revision information, assembly notes, firmware inputs and testing requirements before defining the first-build scope.',
    sections: [],
    richSections: [
      {
        heading: 'When Should You Use Prototype PCB Assembly?',
        body: 'Prototype PCB assembly is appropriate when a board is new, has changed revision, or still needs physical verification before a larger production decision. The assembled boards can support bring-up, mechanical fit checks, firmware work, design verification, component validation and testing feedback.',
        tone: 'highlight',
      },
      {
        heading: 'What We Review Before the First Build',
        body: 'The review establishes one controlled first-build package and identifies open risks before purchasing or assembly.',
        items: [
          'Latest Gerber and drill data with the intended PCB revision.',
          'BOM with manufacturer part numbers, suffixes, quantities and designators.',
          'CPL or pick-and-place coordinates, rotations and reference designators.',
          'Assembly drawing, polarity details and special workmanship notes.',
          'Component availability, no-substitute lines and customer-approved alternatives.',
          'Firmware, test instructions, fixtures and available acceptance criteria.',
        ],
      },
      {
        heading: 'Start with 5 Assembled Boards',
        body: 'Huitai can review prototype builds starting from 5 assembled boards. This gives engineering teams real hardware for bring-up, fit checks, firmware work and early test feedback without presenting the build as stable batch production. Feasibility and setup still depend on the design, BOM, assembly process and test scope.',
      },
      {
        heading: 'Gerber, BOM, CPL and Revision Control',
        body: 'Send the latest Gerber and drill files, BOM, CPL or pick-and-place data, assembly drawing, quantity and a short revision note. File names and revision notes should make it clear which PCB, BOM, CPL, firmware and test instructions belong together so an obsolete input does not enter the first build.',
      },
      {
        heading: 'Component Availability and BOM Risk',
        body: 'Before purchasing, the BOM is reviewed for missing MPNs, suffix questions, obsolete or unavailable parts, package compatibility, long-lead items and no-substitute lines. A proposed alternative must be reviewed against the electrical, package, pinout and project requirements and approved by the customer before use.',
      },
      {
        heading: 'Assembly and First-Article Inspection',
        body: 'Prototype assembly uses the controlled files to prepare SMT, through-hole and manual operations. First-article review can focus on placement, polarity, soldering, component fit and the specific areas identified by the customer or engineering review before the remaining prototype units are completed.',
      },
      {
        heading: 'Firmware and Prototype Testing',
        body: 'Share firmware, programming requirements, fixtures, test instructions and pass/fail criteria when available. Prototype testing should generate useful engineering feedback rather than assume a generic test plan. The agreed scope may include programming, electrical checks or functional testing based on the available method.',
        links: [{ label: 'PCBA Testing & Quality Control', href: '/pcba-testing-quality-control' }],
      },
      {
        heading: 'What Happens After Prototype Testing?',
        body: 'Testing and bring-up feedback should lead to an explicit revision decision before the project is treated as ready for a small production batch.',
        ordered: true,
        items: [
          'Current revision approved: the PCB, BOM, assembly instructions and test method are sufficiently stable for the next stage.',
          'Minor changes and another build: limited updates are controlled in a new file package and verified with another prototype run.',
          'Major PCB, BOM or firmware changes and revalidation: the affected design and test assumptions are reviewed again before release.',
        ],
        note: 'A project should move into low-volume production only after the design revision, critical BOM items, assembly requirements and test method are sufficiently stable.',
      },
      {
        heading: 'Prototype PCB Assembly Workflow',
        ordered: true,
        items: [
          'Submit the latest Gerber, BOM, CPL, revision notes, quantity and test inputs.',
          'Review missing files, component risk, assembly details and first-article priorities.',
          'Confirm sourcing decisions and approved alternatives before purchasing.',
          'Assemble the prototype boards and complete agreed inspection, programming and testing.',
          'Record engineering feedback and decide whether to approve, revise or revalidate the design.',
        ],
      },
      {
        heading: 'Prototype vs Low-Volume PCBA',
        body: 'Prototype assembly answers whether a new or revised design works as intended. Low-volume PCBA focuses on repeatable production after the critical design and process inputs are stable.',
        table: {
          columns: ['Build stage', 'Primary purpose'],
          rows: [
            { label: 'Prototype PCB Assembly', value: 'First build, bring-up, engineering validation, design verification and revision feedback.' },
            { label: 'Low-Volume PCBA', value: 'Pilot or small-batch production with controlled revisions, BOM continuity and repeatable inspection or testing.' },
          ],
        },
        links: [
          { label: 'Ready for Small-Batch Production?', href: '/low-volume-pcba-assembly' },
          { label: 'Compare Prototype vs Low-Volume Production', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
        ],
      },
    ],
    bullets: ['Prototype builds starting from 5 assembled boards', 'Gerber, BOM, CPL and revision review', 'Component availability and approved-alternative control', 'First-article inspection priorities', 'Firmware, programming and test-input review', 'Recorded approval, revision or revalidation outcome'],
    heroSecondaryLink: { label: 'Ready for Small-Batch Production?', href: '/low-volume-pcba-assembly' },
    answerLinks: [
      { label: 'Ready for Small-Batch Production?', href: '/low-volume-pcba-assembly' },
      { label: 'Need Full PCB + BOM + Assembly Management?', href: '/turnkey-pcb-assembly' },
      { label: 'Compare Prototype vs Low-Volume Production', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'Compare JLCPCB alternatives for custom BOM projects', href: '/knowledge/jlcpcb-alternatives-turnkey-pcba' },
    ],
    relatedLinks: [
      { label: 'Low-Volume PCBA Assembly', href: '/low-volume-pcba-assembly' },
      { label: 'Turnkey PCB Assembly', href: '/turnkey-pcb-assembly' },
      { label: 'Prototype vs Low-Volume PCBA Guide', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'BOM Sourcing for PCBA', href: '/bom-sourcing-pcb-assembly' },
      { label: 'JLCPCB alternatives for custom BOM projects', href: '/knowledge/jlcpcb-alternatives-turnkey-pcba' },
    ],
    ctaHeading: 'Upload Prototype Files for Review',
    ctaBody: 'Send Gerber, BOM, CPL or pick-and-place data, drawings, target quantity, revision notes, firmware inputs and testing requirements. Huitai will review the first-build scope, component risk, assembly details and available test method before quotation.',
    primaryCtaLabel: 'Upload Prototype Files for Review',
    faq: [
      {
        question: 'What is prototype PCB assembly used for?',
        answer: 'Prototype PCB assembly is used for first builds, bring-up, design verification, component validation, firmware work and testing feedback before a larger production decision.',
      },
      {
        question: 'What is the minimum prototype quantity?',
        answer: 'Huitai can review prototype builds starting from 5 assembled boards. The practical quantity and setup depend on the design, BOM, assembly process and number of units needed for engineering work.',
      },
      {
        question: 'What files are needed for a prototype build?',
        answer: 'Send the latest Gerber and drill files, BOM with manufacturer part numbers, CPL or pick-and-place data, assembly drawing, revision notes, quantity, and available firmware or test instructions.',
      },
      {
        question: 'Can incomplete prototype files be reviewed?',
        answer: 'Yes. Available files can be reviewed to identify missing inputs, but quotation or production release may still require controlled Gerber, BOM, CPL, assembly and testing information.',
      },
      {
        question: 'How are BOM risks handled?',
        answer: 'Huitai reviews missing MPNs, suffixes, obsolete or unavailable parts, package compatibility, long-lead items and no-substitute lines. Alternatives require customer review and approval before use.',
      },
      {
        question: 'What happens after prototype testing?',
        answer: 'The current revision may be approved, receive limited changes followed by another build, or require major PCB, BOM or firmware changes and revalidation. The decision should be reflected in a new controlled file package.',
      },
      {
        question: 'When is a prototype ready for low-volume production?',
        answer: 'Move forward when the design revision, critical BOM items, assembly requirements, firmware state, test method and acceptance criteria are sufficiently stable for repeatable small-batch production.',
      },
    ],
  },
  'turnkey-pcb-assembly': {
    slug: 'turnkey-pcb-assembly',
    title: 'Turnkey PCB Assembly in China from RFQ to Delivery',
    seoTitle: 'Turnkey PCB Assembly China | Gerber, BOM, SMT & Testing',
    metaDescription: 'One turnkey PCB assembly workflow in China for Gerber review, BOM sourcing, PCB fabrication, SMT/DIP assembly, agreed testing, packaging, and delivery.',
    eyebrow: 'TURNKEY PCBA MANUFACTURING',
    primaryKeyword: 'Turnkey PCB Assembly Service in China',
    serviceName: 'Turnkey PCB Assembly Service in China',
    serviceType: 'Turnkey PCB assembly service',
    quickAnswer: 'Turnkey PCB assembly gives one supplier responsibility for the connected workflow: file review, PCB fabrication, component sourcing, SMT/DIP assembly, inspection, agreed testing support, packaging, and delivery. Huitai reviews Gerber, BOM, pick-and-place data, drawings, quantity, sourcing risk, and test requirements before purchasing or production begins.',
    intro: 'Use turnkey PCBA when splitting fabrication, sourcing, assembly, and testing across several vendors would create avoidable handoffs. Huitai coordinates the scope from RFQ to finished-board delivery and keeps component alternatives, engineering questions, and test responsibilities on a documented approval path.',
    sections: [
      {
        heading: 'One Accountable Workflow from RFQ to Delivery',
        body: 'Huitai connects fabrication data, BOM sourcing, SMT/DIP requirements, inspection points, agreed testing, packaging, and delivery preparation under one project scope. Buyers have one place to resolve file questions, component approvals, and production updates instead of reconciling separate suppliers.',
      },
      {
        heading: 'When Turnkey Is the Right Fit',
        body: 'Turnkey is most useful for custom BOMs, prototype-to-low-volume programs, overseas teams with limited local supplier coordination, and builds that need assembly or testing questions resolved before purchasing. A simple catalog-part prototype may still be faster and cheaper on an online platform.',
      },
      {
        heading: 'Quote Scope Before Purchasing',
        body: 'Turnkey quotes depend on PCB specifications, BOM availability, quantity, assembly complexity, special handling, approved alternatives, inspection/testing requirements, packaging, and destination. Gerber, BOM, CPL, drawings, quantity, and test notes let these assumptions be reviewed before purchasing.',
      },
      {
        heading: 'BOM Sourcing and Approval Control',
        body: 'If a BOM is incomplete, Huitai can review missing MPNs, unclear packages, obsolete or unavailable parts, and possible customer-approved alternatives. Alternatives are discussed before purchasing or assembly.',
      },
      {
        heading: 'Assembly, Inspection, and Agreed Testing',
        body: 'The confirmed scope can combine SMT assembly, optional through-hole work, visual inspection, AOI, and project-specific test support. Functional testing requires instructions, firmware, fixtures, communication details, or acceptance criteria so the method and responsibility are clear.',
      },
      {
        heading: 'Delivery and Repeat-Build Continuity',
        body: 'After the agreed inspection and testing scope, finished PCBAs are packed for delivery. For repeat low-volume batches, keeping the approved BOM decisions, assembly notes, and test requirements together reduces the risk of scope changing between orders.',
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
      { label: 'Check whether a turnkey alternative fits your project', href: '/knowledge/jlcpcb-alternatives-turnkey-pcba' },
      { label: 'Upload Gerber and BOM for engineering review', href: '/contact#project-files' },
    ],
    relatedLinks: [
      { label: 'BOM sourcing and PCB assembly', href: '/bom-sourcing-pcb-assembly' },
      { label: 'Prototype PCB assembly review', href: '/prototype-pcb-assembly' },
      { label: 'Low-volume PCBA assembly', href: '/low-volume-pcba-assembly' },
      { label: 'PCBA inspection and testing process', href: '/quality' },
      { label: 'JLCPCB alternatives for custom BOM projects', href: '/knowledge/jlcpcb-alternatives-turnkey-pcba' },
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
    seoTitle: 'PCB Fabrication & Assembly China | Huitai PCB',
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
    title: 'Low-Volume PCB Assembly for Small-Batch Production',
    seoTitle: 'Low-Volume PCB Assembly China | Small-Batch PCBA | Huitai PCB',
    metaDescription: 'Low-volume PCB assembly in China for validated designs and small-batch production. Huitai supports 50–1,000 piece PCBA runs, BOM continuity, SMT/DIP assembly, inspection and testing.',
    eyebrow: 'VALIDATED DESIGNS · SMALL-BATCH PRODUCTION',
    primaryKeyword: 'Low-Volume PCBA Assembly in China',
    serviceName: 'Low-Volume PCB Assembly',
    serviceType: 'Low-Volume PCBA Manufacturing',
    quickAnswer: 'Low-volume PCBA production is used after prototype validation when a hardware project needs repeatable small batches rather than engineering samples or mass production. Typical runs may include 50, 100, 500 or 1,000 boards, with greater emphasis on BOM continuity, stable assembly instructions, repeatable inspection, functional testing and controlled revisions.',
    intro: 'For validated PCB designs moving into pilot or small-batch production, Huitai supports typical low-volume PCBA runs such as 50, 100, 500 or 1,000 pieces with BOM sourcing review, SMT/DIP assembly, inspection and agreed testing requirements.',
    sections: [],
    richSections: [
      {
        heading: 'When Is a PCB Design Ready for Low-Volume Production?',
        body: 'A design is ready when the essential manufacturing inputs no longer change from build to build and the team can define what an acceptable assembled board looks like.',
        items: [
          'PCB revision confirmed and latest Gerber package controlled.',
          'BOM mostly stable with critical manufacturer part numbers confirmed.',
          'Alternatives customer-approved and no-substitute components identified.',
          'CPL, assembly drawing and workmanship notes confirmed.',
          'Firmware sufficiently stable for the agreed production stage.',
          'Test method and acceptance criteria defined.',
        ],
        note: 'If these items are still changing frequently, another prototype build may be more appropriate than low-volume production.',
        tone: 'highlight',
      },
      {
        heading: 'Typical Low-Volume Quantities',
        body: 'The final production route depends on the board, BOM, assembly content and testing scope, but these quantities illustrate the type of validated small-batch projects this service is designed to review.',
        table: {
          columns: ['Typical quantity', 'Common planning purpose'],
          rows: [
            { label: '50 pieces', value: 'Initial pilot batch after prototype validation.' },
            { label: '100 pieces', value: 'Small production release or controlled field evaluation.' },
            { label: '500 pieces', value: 'Repeatable low-volume demand with planned sourcing and test coverage.' },
            { label: '1,000 pieces', value: 'Larger small-batch production requiring stable revisions and BOM continuity.' },
          ],
        },
      },
      {
        heading: 'BOM Continuity and Component Availability',
        body: 'Low-volume production depends on repeatable component decisions. The review covers manufacturer part numbers and suffixes, packages, obsolete or long-lead items, supplier minimum quantities, approved alternatives, no-substitute lines and availability for expected repeat orders.',
        items: [
          'Use complete manufacturer part numbers, including required suffixes.',
          'Identify obsolete, allocation-sensitive or long-lead items before purchasing.',
          'Record approved alternatives and the conditions under which they may be used.',
          'Separate package similarity from electrical and pinout compatibility.',
          'Consider MOQ, excess material and repeat-order availability in the sourcing plan.',
        ],
        note: 'A component should not be substituted only because the package looks similar. Manufacturer part number, suffix, electrical characteristics, package, pinout and project requirements must be reviewed before a replacement is approved.',
        links: [{ label: 'BOM Sourcing for PCBA', href: '/bom-sourcing-pcb-assembly' }],
      },
      {
        heading: 'Repeatable SMT and Through-Hole Assembly',
        body: 'Stable BOM, CPL and assembly instructions allow SMT placement, reflow, through-hole insertion and manual operations to be repeated against the same approved inputs. Open workmanship or component questions should be resolved before the batch is released.',
        links: [{ label: 'PCB Assembly Services', href: '/pcb-assembly-services' }],
      },
      {
        heading: 'First Article and Batch Inspection',
        body: 'A first-article review checks the initial assembled board against placement, polarity, soldering and project-specific inspection points before the remainder of the batch proceeds. Batch inspection then follows the confirmed plan, which may include visual review, AOI or X-ray where appropriate.',
      },
      {
        heading: 'Functional Testing for Small Batches',
        body: 'Functional testing should use a defined method, current firmware, available fixtures or connection instructions, and clear acceptance criteria. The scope is confirmed from the customer requirements rather than assumed from the product category.',
        links: [{ label: 'PCBA Testing & Quality Control', href: '/pcba-testing-quality-control' }],
      },
      {
        heading: 'Revision and Change Control',
        body: 'Each production release should identify the Gerber, BOM, CPL, assembly drawing, firmware and testing-instruction revisions that belong together. A change in one file is reviewed for its effect on sourcing, placement, assembly, programming, inspection and acceptance criteria before the next batch.',
        items: ['Gerber revision', 'BOM revision', 'CPL revision', 'Assembly drawing revision', 'Firmware revision', 'Testing-instruction revision'],
      },
      {
        heading: 'Prototype to Low-Volume Transition',
        body: 'Prototype feedback should be closed into controlled files and decisions before a small batch is released. If the design, critical BOM items, firmware or test method remain uncertain, another engineering prototype is the safer next step.',
        links: [
          { label: 'Design Still Needs Validation?', href: '/prototype-pcb-assembly' },
          { label: 'Prototype vs Low-Volume PCBA Guide', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
        ],
      },
      {
        heading: 'Why Low-Volume Unit Cost Is Higher',
        body: 'SMT setup, programming, stencil preparation, first-article review and test-fixture work are spread across fewer assembled boards in a small batch. Component minimum order quantities and excess materials can also affect the per-board cost. Stable files, approved alternatives and a practical test scope help make the quotation clearer.',
      },
      {
        heading: 'Low-Volume Production Workflow',
        ordered: true,
        items: [
          'Confirm the validated revision, target quantity and production purpose.',
          'Review BOM continuity, critical parts, approved alternatives and purchasing assumptions.',
          'Release controlled Gerber, CPL, assembly, firmware and test instructions.',
          'Complete first-article review before proceeding with the remaining batch.',
          'Perform the agreed inspection and functional testing, then prepare the approved boards for delivery.',
        ],
      },
    ],
    bullets: ['Validated 50, 100, 500 or 1,000 piece production runs', 'BOM continuity and approved-alternative control', 'Repeatable SMT and through-hole assembly', 'First-article and batch inspection', 'Defined functional testing and acceptance criteria', 'Controlled design, firmware and test revisions'],
    heroSecondaryLink: { label: 'Still Validating the Design? Start With Prototype Assembly', href: '/prototype-pcb-assembly' },
    answerLinks: [
      { label: 'Design Still Needs Validation?', href: '/prototype-pcb-assembly' },
      { label: 'Need Complete Turnkey Manufacturing?', href: '/turnkey-pcb-assembly' },
      { label: 'Prototype vs Low-Volume PCBA Guide', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'BOM Sourcing for PCBA', href: '/bom-sourcing-pcb-assembly' },
      { label: 'PCBA Testing & Quality Control', href: '/pcba-testing-quality-control' },
    ],
    relatedLinks: [
      { label: 'Prototype PCB Assembly', href: '/prototype-pcb-assembly' },
      { label: 'Turnkey PCB Assembly', href: '/turnkey-pcb-assembly' },
      { label: 'Prototype vs Low-Volume PCBA Guide', href: '/knowledge/prototype-vs-batch-pcb-assembly' },
      { label: 'BOM Sourcing for PCBA', href: '/bom-sourcing-pcb-assembly' },
      { label: 'PCBA Testing & Quality Control', href: '/pcba-testing-quality-control' },
    ],
    ctaHeading: 'Request a Low-Volume PCBA Review',
    ctaBody: 'Send the confirmed Gerber, BOM, CPL, assembly drawing, target quantity, firmware and testing instructions. Huitai will review production readiness, BOM continuity, assembly inputs, first-article requirements and the agreed test scope before quotation.',
    primaryCtaLabel: 'Request a Low-Volume PCBA Review',
    faq: [
      {
        question: 'What is considered low-volume PCBA assembly?',
        answer: 'Low-volume PCBA refers to repeatable small production runs after prototype validation. Typical projects may include 50, 100, 500 or 1,000 assembled boards, depending on the design, BOM, assembly and testing scope.',
      },
      {
        question: 'When is a design ready for low-volume production?',
        answer: 'The PCB revision, Gerber, BOM, CPL, assembly notes, firmware, test method and acceptance criteria should be sufficiently stable for repeatable production.',
      },
      {
        question: 'Why does BOM continuity matter?',
        answer: 'BOM continuity keeps manufacturer part numbers, suffixes, packages, approved alternatives and no-substitute decisions controlled across a small batch and expected repeat orders.',
      },
      {
        question: 'Can components be substituted in a small batch?',
        answer: 'Only after manufacturer part number, suffix, electrical characteristics, package, pinout and project requirements are reviewed and the customer approves the replacement.',
      },
      {
        question: 'What is checked in a first article?',
        answer: 'The first assembled board can be reviewed for placement, polarity, soldering, component fit and project-specific inspection or test points before the remainder of the batch proceeds.',
      },
      {
        question: 'What files are needed for a low-volume PCBA quote?',
        answer: 'Send the confirmed Gerber, BOM with MPNs, CPL or pick-and-place data, assembly drawing, target quantity, firmware and testing instructions, plus any approved-alternative or no-substitute requirements.',
      },
      {
        question: 'Can low-volume builds include functional testing?',
        answer: 'Yes, when the test method, firmware, fixtures or connection instructions and acceptance criteria are provided and confirmed in the production scope.',
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
    intro: 'Send your BOM for sourcing risk review before PCB assembly quotation. Before components are purchased, the BOM should be checked line by line for MPN accuracy, package match, lifecycle status, stock availability, customer-approved alternatives, and assembly risk. This keeps component sourcing tied to the PCBA build and helps reduce sourcing surprises before SMT and DIP production starts.',
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
    seoTitle: 'PCBA Testing and Quality Control | Huitai PCB',
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
