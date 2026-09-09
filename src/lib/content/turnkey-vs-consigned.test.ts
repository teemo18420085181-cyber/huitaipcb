import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import KnowledgeComparisonTable from '@/components/KnowledgeComparisonTable';

// Keep these content-consumer tests isolated from live CMS data and credentials.
vi.mock('@/lib/supabase/server', () => ({ createServiceClient: () => { throw new Error('CMS unavailable in fixture'); } }));

import { getKnowledgeDisplayArticle, getKnowledgeIndexArticles } from '@/lib/content/articles';
import { extractFaqItemsFromMarkdown } from '@/lib/content/faq';
import { knowledgeArticles } from '@/lib/content/knowledge';

const slug = 'turnkey-vs-consigned-pcb-assembly';

describe('turnkey / consigned buyer decision guide', () => {
  it('resolves the new URL as a decision guide with distinct SEO title and H1', async () => {
    expect(await getKnowledgeDisplayArticle(slug)).toMatchObject({
      slug,
      source: 'static',
      category: 'Decision Guide',
      title: 'Turnkey vs Consigned PCB Assembly: Which Model Fits Your Project?',
      seoTitle: 'Turnkey vs Consigned PCB Assembly | Which Is Better?',
      publishedAt: '2026-09-05',
      updatedAt: '2026-09-05',
      mobileTableLayout: 'stacked',
    });
  });

  it('adds one discoverable index entry without replacing existing knowledge owners', async () => {
    const index = await getKnowledgeIndexArticles();
    expect(index.filter((article) => article.slug === slug)).toHaveLength(1);
    for (const owner of [
      'what-is-turnkey-pcba', 'how-we-review-pcba-project-before-quotation',
      'bom-best-practices', 'bom-risk-alternative-component-sourcing',
      'bom-alternatives-pcba-sourcing', 'how-much-does-pcba-assembly-cost',
      'prototype-vs-batch-pcb-assembly',
    ]) {
      expect(index.filter((article) => article.slug === owner)).toHaveLength(1);
      expect((await getKnowledgeDisplayArticle(owner))?.slug).toBe(owner);
      expect((await getKnowledgeDisplayArticle(owner))?.mobileTableLayout).toBeUndefined();
    }
    expect(new Set(index.map((article) => article.slug)).size).toBe(index.length);
  });

  it('preserves specialist destinations and the existing RFQ CTA contract', async () => {
    const article = await getKnowledgeDisplayArticle(slug);
    expect(article).not.toBeNull();
    for (const href of [
      '/turnkey-pcb-assembly', '/pcb-assembly-services', '/bom-sourcing-pcb-assembly',
      '/knowledge/what-is-turnkey-pcba', '/knowledge/prototype-vs-batch-pcb-assembly',
      '/knowledge/bom-risk-alternative-component-sourcing',
      '/knowledge/bom-alternatives-pcba-sourcing', '/knowledge/how-much-does-pcba-assembly-cost',
      '/knowledge/how-we-review-pcba-project-before-quotation', '/contact#project-files',
    ]) expect(article?.content).toContain(`](${href})`);
    expect(article?.cta?.primary.href).toBe('/contact#project-files');
    expect(article?.cta?.secondary.href).toBe('/turnkey-pcb-assembly');
  });

  it('extracts all eight visible FAQ answers without swallowing neighboring sections', async () => {
    const article = await getKnowledgeDisplayArticle(slug);
    expect(article).not.toBeNull();
    const items = extractFaqItemsFromMarkdown(article!.content);
    expect(items).toHaveLength(8);
    expect(new Set(items.map((item) => item.question)).size).toBe(8);
    expect(items[0].question).toBe('What is the difference between turnkey and consigned PCB assembly?');
    expect(items[7].question).toBe('Which model is better for low-volume PCBA?');
    expect(items.every((item) => item.answer.length > 50 && !item.answer.includes('##'))).toBe(true);
    expect(knowledgeArticles.filter((article) => article.slug === slug)).toHaveLength(1);
  });

  it('keeps each comparison value paired with its model in the mobile definition list', () => {
    const html = renderToStaticMarkup(createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm],
      components: { table: ({ children }) => createElement(KnowledgeComparisonTable, null, children) },
    }, '| Task | Turnkey | Consigned | Partial |\n| --- | --- | --- | --- |\n| Parts | Supplier | Buyer | **Split** |'));
    expect(html).toMatch(/<dt[^>]*>Turnkey<\/dt><dd>Supplier<\/dd>/);
    expect(html).toMatch(/<dt[^>]*>Consigned<\/dt><dd>Buyer<\/dd>/);
    expect(html).toMatch(/<dt[^>]*>Partial<\/dt><dd><strong>Split<\/strong><\/dd>/);
    expect(html).toContain('<table');
    expect(html).toContain('hidden sm:block');
    expect(html).toContain('sm:hidden');
  });
});
