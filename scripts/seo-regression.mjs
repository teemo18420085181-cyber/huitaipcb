import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const hero = read('src/components/Hero.tsx');
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
  [hero.includes("From Gerber{' '}"), 'Homepage H1 must preserve the space before “to”.'],
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
