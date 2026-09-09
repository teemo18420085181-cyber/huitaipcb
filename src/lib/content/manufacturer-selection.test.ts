import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import KnowledgeComparisonTable from '@/components/KnowledgeComparisonTable';

// Isolate the external CMS; exercise real article mapping, index and FAQ consumers.
vi.mock('@/lib/supabase/server', () => ({ createServiceClient: () => { throw new Error('CMS unavailable in fixture'); } }));
import { getKnowledgeDisplayArticle, getKnowledgeIndexArticles, mapStaticArticle } from '@/lib/content/articles';
import { knowledgeArticles } from '@/lib/content/knowledge';
import { extractFaqItemsFromMarkdown } from '@/lib/content/faq';

const slug = 'how-to-choose-pcba-manufacturer-china';

describe('manufacturer selection guide ownership and rendering', () => {
  it('retains the existing URL, publication history and engineering author in static fallback', async () => {
    expect(await getKnowledgeDisplayArticle(slug)).toMatchObject({
      slug, source: 'static', title: 'How to Choose a PCBA Manufacturer in China',
      author: 'Huitai Engineering Team', publishedAt: '2026-05-25T06:21:12.119+00:00',
      updatedAt: '2026-09-09', reviewedBy: 'Huitai Engineering Team',
      image: '/factory/knowledge-covers/choose-pcba-manufacturer-china-cover.webp',
      mobileTableLayout: 'stacked',
    });
  });

  it('keeps default static authors unchanged while honoring an explicit author', () => {
    const original = knowledgeArticles.find(a => a.slug === 'turnkey-vs-consigned-pcb-assembly')!;
    expect(mapStaticArticle(original).author).toBe('Huitai PCB');
    expect(mapStaticArticle({ ...original, author: 'Huitai Engineering Team' }).author).toBe('Huitai Engineering Team');
  });

  it('keeps the guide discoverable once alongside specialist owners', async () => {
    const index = await getKnowledgeIndexArticles();
    for (const owner of [slug, 'top-low-volume-turnkey-pcba-suppliers-china', 'jlcpcb-alternatives-turnkey-pcba',
      'what-determines-pcb-assembly-quote-china', 'how-we-review-pcba-project-before-quotation',
      'turnkey-vs-consigned-pcb-assembly']) {
      expect(index.filter(a => a.slug === owner)).toHaveLength(1);
    }
  });

  it('renders decision modules without a second body H1 and preserves relevant destinations', async () => {
    const article = await getKnowledgeDisplayArticle(slug);
    expect(article).not.toBeNull();
    const html = renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm],
      components: { table: ({ children }) => createElement(KnowledgeComparisonTable, null, children) },
    }, article!.content));
    expect(html).not.toContain('<h1');
    for (const section of ['China PCBA Supplier Verification Matrix', 'PCBA Manufacturer Buyer Scorecard',
      'How to Shortlist a PCBA Manufacturer in China', 'Practical Supplier Checklist',
      'How Can You Verify Manufacturing Capability?', 'When Huitai May Be a Fit']) {
      expect(html).toContain(`<h2>${section}</h2>`);
    }
    expect(html).toContain('<dt');
    for (const href of ['/china-pcba-manufacturer', '/turnkey-pcb-assembly', '/low-volume-pcba-assembly',
      '/prototype-pcb-assembly', '/bom-sourcing-pcb-assembly', '/pcba-testing-quality-control',
      '/knowledge/how-we-review-pcba-project-before-quotation', '/knowledge/what-determines-pcb-assembly-quote-china',
      '/knowledge/prototype-vs-batch-pcb-assembly', '/knowledge/turnkey-vs-consigned-pcb-assembly',
      '/knowledge/top-low-volume-turnkey-pcba-suppliers-china', '/knowledge/jlcpcb-alternatives-turnkey-pcba']) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(article!.cta?.primary.href).toBe('/contact#project-files');
    expect(article!.cta?.secondary.href).toBe('/china-pcba-manufacturer');
  });

  it('extracts nine complete buyer FAQs without separator or following CTA contamination', async () => {
    const article = await getKnowledgeDisplayArticle(slug);
    expect(article).not.toBeNull();
    const faq = extractFaqItemsFromMarkdown(article!.content);
    expect(faq).toHaveLength(9);
    expect(new Set(faq.map(x => x.question)).size).toBe(9);
    expect(faq.every(x => x.answer.length > 60 && !x.answer.includes('---') && !x.answer.includes('Send Your Files for Review'))).toBe(true);
    expect(faq[8].question).toBe('What is the difference between a factory and an online PCBA platform?');
  });
});
