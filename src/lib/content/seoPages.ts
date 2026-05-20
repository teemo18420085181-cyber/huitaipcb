export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoLandingPage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  primaryKeyword: string;
  sections: { heading: string; body: string }[];
  bullets: string[];
  faq: FaqItem[];
};

const sharedFaq: FaqItem[] = [
  {
    question: 'What files are required for a PCB assembly quote?',
    answer: 'Gerber files, BOM list, PCB specifications, assembly drawings, sample photos, and testing requirements are helpful for an accurate PCB assembly quote.',
  },
  {
    question: 'Do you provide turnkey PCB assembly services?',
    answer: 'Yes. We can coordinate PCB fabrication, component sourcing, SMT assembly, DIP assembly, functional testing, final assembly, and delivery.',
  },
  {
    question: 'Can you source electronic components?',
    answer: 'Yes. We can help review the BOM, source components, check alternatives, and coordinate purchasing before assembly.',
  },
  {
    question: 'Do you ship assembled PCBA boards overseas?',
    answer: 'Yes. We can prepare tested PCBA boards for international delivery according to project requirements.',
  },
];

export const seoPages: Record<string, SeoLandingPage> = {
  'pcb-assembly-services': {
    slug: 'pcb-assembly-services',
    title: 'PCB Assembly Services in China',
    seoTitle: 'PCB Assembly Services in China | Huitai Electronics',
    metaDescription: 'PCB assembly services in China for overseas B2B customers, including PCB fabrication, BOM review, component sourcing, SMT assembly, DIP assembly, testing, and delivery.',
    eyebrow: 'PCB ASSEMBLY SERVICES',
    primaryKeyword: 'PCB Assembly Services',
    intro: 'Huitai Electronics supports PCB assembly services for overseas hardware teams that need engineering review, component sourcing, SMT assembly, functional testing, and coordinated delivery from China.',
    sections: [
      {
        heading: 'From files to finished PCBA',
        body: 'Send Gerber files, BOM lists, drawings, sample photos, or project requirements. Our team reviews the available information before quotation so sourcing, assembly, testing, and delivery scope are clear.',
      },
      {
        heading: 'Built for practical B2B projects',
        body: 'We support prototype, low-volume, and batch PCBA projects where engineering review, sourcing feedback, and production coordination matter more than automated black-box pricing.',
      },
    ],
    bullets: ['PCB fabrication coordination', 'BOM review and component sourcing', 'SMT assembly and DIP assembly', 'Functional testing and final assembly', 'Packaging and global delivery'],
    faq: sharedFaq,
  },
  'china-pcb-assembly': {
    slug: 'china-pcb-assembly',
    title: 'China PCB Assembly Services',
    seoTitle: 'China PCB Assembly Services | Huitai Electronics',
    metaDescription: 'China PCB assembly services for overseas B2B customers, including turnkey PCBA manufacturing, component sourcing, SMT assembly, testing, and delivery.',
    eyebrow: 'CHINA PCB ASSEMBLY',
    primaryKeyword: 'China PCB Assembly',
    intro: 'Work with a China-based PCB assembly supply chain for PCB fabrication coordination, component sourcing, SMT assembly, DIP assembly, functional testing, and finished PCBA delivery.',
    sections: [
      {
        heading: 'China-based sourcing and assembly coordination',
        body: 'Our workflow helps overseas customers coordinate PCB fabrication, BOM review, component purchasing, assembly partners, inspection, and logistics through one project process.',
      },
      {
        heading: 'Useful for overseas engineering teams',
        body: 'If your team needs a China PCB assembly partner for prototype or low-volume builds, we can review your files, flag missing information, and confirm what is needed before quotation.',
      },
    ],
    bullets: ['China-based turnkey PCB assembly process', 'Component sourcing support', 'Prototype and low-volume PCBA support', 'Functional testing based on project needs', 'International delivery preparation'],
    faq: sharedFaq,
  },
  'pcb-assembly-company': {
    slug: 'pcb-assembly-company',
    title: 'PCB Assembly Company in China',
    seoTitle: 'PCB Assembly Company in China | Huitai Electronics',
    metaDescription: 'Huitai Electronics is a PCB assembly company in China supporting engineering review, BOM sourcing, SMT assembly, DIP assembly, testing, and delivery.',
    eyebrow: 'PCB ASSEMBLY COMPANY',
    primaryKeyword: 'PCB Assembly Company',
    intro: 'Huitai Electronics works with overseas B2B customers that need a PCB assembly company in China for project review, sourcing coordination, assembly management, testing, and delivery.',
    sections: [
      {
        heading: 'Engineering review before quotation',
        body: 'We review Gerber files, BOM lists, assembly drawings, sample photos, and testing needs before quotation. This helps reduce unclear scope and repeated follow-up.',
      },
      {
        heading: 'Managed PCBA workflow',
        body: 'Rather than only offering one process step, we help coordinate PCB fabrication, component sourcing, SMT assembly, DIP assembly, testing, final assembly, and shipment preparation.',
      },
    ],
    bullets: ['English RFQ communication', 'BOM and sourcing checks', 'Managed PCB assembly supply chain', 'Testing and inspection planning', 'Quote support for overseas buyers'],
    faq: sharedFaq,
  },
  'prototype-pcb-assembly': {
    slug: 'prototype-pcb-assembly',
    title: 'Prototype PCB Assembly Service',
    seoTitle: 'Prototype PCB Assembly Service | Huitai Electronics',
    metaDescription: 'Prototype PCB assembly service for engineers, startups, and product developers needing Gerber review, BOM sourcing, SMT assembly, testing, and delivery.',
    eyebrow: 'PROTOTYPE PCB ASSEMBLY',
    primaryKeyword: 'Prototype PCB Assembly',
    intro: 'Prototype PCB assembly helps hardware teams validate designs before batch production. Huitai Electronics can review files, source components, assemble boards, and support testing requirements.',
    sections: [
      {
        heading: 'Prototype builds need careful review',
        body: 'Small PCBA batches often reveal design, sourcing, or testing questions. We review the information you have and confirm missing files, risky components, or testing details before quote finalization.',
      },
      {
        heading: 'A path from prototype to batch',
        body: 'Once a prototype is validated, the same file package, BOM decisions, and test plan can be refined for low-volume or batch PCB assembly.',
      },
    ],
    bullets: ['Prototype and low-volume PCBA support', 'Gerber and BOM review', 'Small-batch component sourcing', 'SMT and DIP assembly', 'Functional testing based on your instructions'],
    faq: [
      ...sharedFaq,
      {
        question: 'Can you support prototype PCB assembly?',
        answer: 'Yes. We support prototype and low-volume PCB assembly projects for engineers, startups, and product developers.',
      },
    ],
  },
  'turnkey-pcb-assembly': {
    slug: 'turnkey-pcb-assembly',
    title: 'Turnkey PCB Assembly Service',
    seoTitle: 'Turnkey PCB Assembly Service in China | Huitai Electronics',
    metaDescription: 'Turnkey PCB assembly service in China, including PCB fabrication, BOM review, component sourcing, SMT assembly, DIP assembly, functional testing, and delivery.',
    eyebrow: 'TURNKEY PCB ASSEMBLY',
    primaryKeyword: 'Turnkey PCB Assembly',
    intro: 'Turnkey PCB assembly means the supplier coordinates the main production steps from PCB fabrication and component sourcing to SMT assembly, DIP assembly, testing, and delivery.',
    sections: [
      {
        heading: 'One coordinated project workflow',
        body: 'Customers can send Gerber files, BOM lists, drawings, sample photos, or product requirements. We review the scope and coordinate each production step needed for finished PCBA boards.',
      },
      {
        heading: 'Turnkey PCBA manufacturing for overseas customers',
        body: 'This model reduces vendor handoffs and helps customers get sourcing feedback, assembly review, testing planning, and delivery preparation through one managed process.',
      },
    ],
    bullets: ['PCB fabrication coordination', 'BOM review and component sourcing', 'SMT assembly and DIP assembly', 'Functional testing', 'Final assembly and global delivery'],
    faq: [
      ...sharedFaq,
      {
        question: 'What is turnkey PCB assembly?',
        answer: 'Turnkey PCB assembly means the supplier coordinates PCB fabrication, component sourcing, SMT assembly, DIP assembly, testing, and delivery instead of only providing one production step.',
      },
      {
        question: 'What is the difference between PCB assembly and PCBA?',
        answer: 'PCB assembly is the process of mounting and soldering components onto a bare PCB. The finished assembled board is commonly called a PCBA.',
      },
    ],
  },
};
