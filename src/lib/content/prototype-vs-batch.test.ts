import { describe, expect, it } from 'vitest';
import { mapStaticArticle } from '@/lib/content/articles';
import { extractFaqItemsFromMarkdown } from '@/lib/content/faq';
import { getKnowledgeArticle } from '@/lib/content/knowledge';

const slug = 'prototype-vs-batch-pcb-assembly';

function getTransitionGuide() {
  const source = getKnowledgeArticle(slug);
  expect(source).toBeDefined();

  return mapStaticArticle(source!);
}

describe('prototype-to-low-volume transition guide', () => {
  it('keeps buyer-decision ownership and answers that readiness is not determined by quantity alone', () => {
    const article = getTransitionGuide();
    const quickAnswer = article.content.split('## Prototype vs Low-Volume Decision Matrix')[0];

    expect(article.slug).toBe(slug);
    expect(article.category).toBe('Decision Guide');
    expect(article.title).toBe('Prototype PCB Assembly vs Low-Volume PCBA Production');
    expect(article.metaDescription).toContain('production readiness');
    expect(quickAnswer).toContain('Quantity alone does not determine');
    expect(quickAnswer).toContain('A 50-piece build may already require controlled low-volume processes');
    expect(quickAnswer).toContain('still be undergoing engineering validation at the same quantity');
  });

  it('renders the decision matrix, planning scenarios, readiness gate, and controlled transition workflow', () => {
    const article = getTransitionGuide();

    expect(article.content).toContain('## Prototype vs Low-Volume Decision Matrix');
    expect(article.content).toContain('| Design revision | Still being validated | Controlled and substantially stable |');
    expect(article.content).toContain('## How Production Priorities Change at 50, 100 and 500 Pieces');
    expect(article.content).toContain('### 50 pieces: a typical planning scenario');
    expect(article.content).toContain('### 100 pieces: stronger control becomes more important');
    expect(article.content).toContain('### 500 pieces: repeat-batch planning matters');
    expect(article.content).toContain('not fixed industry thresholds');
    expect(article.content).toContain('## Is Your PCB Ready for Low-Volume Production?');
    expect(article.content).toContain('- [ ] PCB revision is controlled');
    expect(article.content).toContain('- [ ] Open prototype issues are closed or explicitly accepted');
    expect(article.content).toContain('## Prototype to Low-Volume Transition Workflow');
    expect(article.content).toContain('Issues found?');
    expect(article.content).toContain('Freeze critical production inputs');
  });

  it('routes readers to the existing service, risk, cost, testing, and RFQ owners without changing analytics', () => {
    const article = getTransitionGuide();
    const faqItems = extractFaqItemsFromMarkdown(article.content);

    for (const href of [
      '/prototype-pcb-assembly',
      '/low-volume-pcba-assembly',
      '/knowledge/bom-risk-alternative-component-sourcing',
      '/knowledge/bom-alternatives-pcba-sourcing',
      '/knowledge/how-much-does-pcba-assembly-cost',
      '/pcba-testing-quality-control',
    ]) {
      expect(article.content).toContain(`](${href})`);
    }

    expect(faqItems.length).toBeGreaterThanOrEqual(5);
    expect(faqItems.map((item) => item.question)).toContain(
      'Does 50, 100, or 500 pieces automatically define the production stage?',
    );
    expect(article.cta).toEqual({
      primary: {
        label: 'Send Gerber & BOM for Manufacturing Review',
        href: '/contact#project-files',
      },
      secondary: {
        label: 'Explore Low-Volume PCB Assembly',
        href: '/low-volume-pcba-assembly',
      },
    });
  });
});
