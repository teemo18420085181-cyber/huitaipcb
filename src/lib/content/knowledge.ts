export type KnowledgeArticle = {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  metaDescription: string;
  sections: { heading: string; body: string[] }[];
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: 'what-files-required-pcba-quote',
    category: 'Getting Started',
    categoryColor: 'bg-brand-yellow/15 text-brand-primary border-brand-yellow/30',
    title: 'What files are required for a PCBA quote?',
    excerpt: 'A practical checklist for Gerber files, BOM lists, assembly drawings, sample photos, and testing requirements.',
    image: '/factory/flow-01.png',
    readTime: '5 min read',
    metaDescription: 'Learn which files are required for an accurate PCBA quote, including Gerber files, BOM lists, drawings, sample photos, and testing requirements.',
    sections: [
      {
        heading: 'Core files for quotation',
        body: [
          'Gerber files, drill files, a BOM list, PCB specifications, and assembly drawings are the most useful starting point for a PCB assembly quote.',
          'If you already have sample boards or product photos, include those as references. They help engineers understand connector orientation, mechanical constraints, and final assembly needs.',
        ],
      },
      {
        heading: 'Helpful optional information',
        body: [
          'Quantity, target lead time, testing requirements, firmware flashing needs, packaging requirements, and preferred component brands can all improve quotation accuracy.',
          'If some files are missing, send what you have. An engineering review can identify what is still needed before final pricing.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-turnkey-pcba',
    category: 'Fundamentals',
    categoryColor: 'bg-brand-primary/8 text-brand-primary border-brand-primary/15',
    title: 'What is turnkey PCBA manufacturing?',
    excerpt: 'How turnkey PCBA manufacturing coordinates PCB fabrication, component sourcing, SMT assembly, testing, and delivery.',
    image: '/factory/real-smt-1.jpg',
    readTime: '6 min read',
    metaDescription: 'Understand turnkey PCBA manufacturing and how it covers PCB fabrication, BOM sourcing, SMT assembly, DIP assembly, testing, and delivery.',
    sections: [
      {
        heading: 'Turnkey PCBA in plain terms',
        body: [
          'Turnkey PCBA manufacturing means one supplier coordinates the full assembly workflow instead of asking the customer to manage separate PCB, component, assembly, and testing vendors.',
          'The supplier reviews files, coordinates PCB fabrication, sources components, manages SMT and DIP assembly, performs inspections, and prepares finished boards for delivery.',
        ],
      },
      {
        heading: 'When turnkey is useful',
        body: [
          'Turnkey assembly is especially useful for overseas B2B customers who need fewer handoffs, faster sourcing feedback, and a clear project owner.',
          'It is also helpful when the BOM contains hard-to-source parts or when testing and final assembly need to be coordinated with production.',
        ],
      },
    ],
  },
  {
    slug: 'bom-best-practices',
    category: 'Sourcing',
    categoryColor: 'bg-brand-primary/8 text-brand-primary border-brand-primary/15',
    title: 'BOM best practices for fast sourcing and quoting',
    excerpt: 'How to prepare a BOM list that helps component sourcing, alternatives review, and faster PCB assembly quotation.',
    image: '/factory/flow-02.png',
    readTime: '6 min read',
    metaDescription: 'Prepare a BOM list for fast PCBA sourcing and quoting with manufacturer part numbers, quantities, designators, alternates, and lifecycle notes.',
    sections: [
      {
        heading: 'BOM columns that matter',
        body: [
          'A clear BOM should include reference designators, quantity, manufacturer part number, manufacturer name, package, value, tolerance, voltage or power rating, and approved alternates if available.',
          'Avoid generic descriptions without part numbers when possible. They slow sourcing checks and increase the risk of substitution errors.',
        ],
      },
      {
        heading: 'Speed up sourcing review',
        body: [
          'Mark no-substitute parts, customer-supplied parts, and parts that can accept equivalents. This helps the sourcing team respond quickly when a component is short or obsolete.',
          'For prototype PCB assembly, include acceptable alternatives early so the quote can move forward without repeated BOM clarification cycles.',
        ],
      },
    ],
  },
  {
    slug: 'prototype-vs-batch-pcb-assembly',
    category: 'Decision Guide',
    categoryColor: 'bg-brand-green/10 text-brand-green-dark border-brand-green/20',
    title: 'Prototype PCB assembly vs batch PCB assembly',
    excerpt: 'Understand how prototype and batch PCBA projects differ in review depth, tooling, sourcing, testing, and delivery planning.',
    image: '/factory/real-aoi-op.jpg',
    readTime: '6 min read',
    metaDescription: 'Compare prototype PCB assembly and batch PCB assembly for engineering validation, low-volume builds, sourcing, testing, and production planning.',
    sections: [
      {
        heading: 'Prototype PCB assembly',
        body: [
          'Prototype PCB assembly focuses on engineering validation, early testing, and fast feedback. Quantities are usually small, and engineers expect design changes after testing.',
          'The quote should make clear which processes are prototype-friendly and which tests or fixtures are needed before scaling.',
        ],
      },
      {
        heading: 'Batch PCB assembly',
        body: [
          'Batch assembly focuses on repeatability, yield, component availability, process documentation, packaging, and delivery planning.',
          'Before moving to batch production, confirm the BOM, test plan, inspection standard, and any approved substitutions.',
        ],
      },
    ],
  },
];

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}
