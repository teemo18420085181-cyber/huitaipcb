import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createServiceClient } = vi.hoisted(() => ({ createServiceClient: vi.fn() }));

vi.mock('@/lib/supabase/server', () => ({ createServiceClient }));

import sitemap from '@/app/sitemap';
import { getSitemapArticleEntries, type CmsArticle } from '@/lib/content/articles';
import { getKnowledgeArticle, knowledgeArticles } from '@/lib/content/knowledge';

const reviewSlug = 'how-we-review-pcba-project-before-quotation';
const normalCmsSlug = 'what-is-turnkey-pcba';

function cmsArticle(slug: string, dates: Partial<CmsArticle> = {}): CmsArticle {
  return {
    id: `sitemap-fixture-${slug}`,
    slug,
    title: 'Published article fixture',
    description: null,
    content: 'CMS article content',
    cover_image: null,
    author: 'Huitai PCB',
    read_time: 5,
    status: 'published',
    published_at: '2026-05-21T01:12:10.970Z',
    updated_at: '2026-05-25T06:21:12.119Z',
    created_at: '2026-05-20T00:00:00.000Z',
    ...dates,
  };
}

function mockCmsArticles(records: CmsArticle[]) {
  const finalOrder = vi.fn().mockResolvedValue({ data: records, error: null });
  createServiceClient.mockReturnValue({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({ order: vi.fn().mockReturnValue({ order: finalOrder }) }),
      }),
    }),
  });
}

beforeEach(() => createServiceClient.mockReset());

describe('sitemap content ownership and approved lastmod dates', () => {
  it('uses GROW-04 static ownership over CMS dates without refreshing other URLs', async () => {
    const slug = 'how-to-choose-pcba-manufacturer-china';
    mockCmsArticles([cmsArticle(slug), cmsArticle(normalCmsSlug)]);
    const entries = await sitemap();
    expect(entries.filter(x => x.url.endsWith(`/knowledge/${slug}`))).toHaveLength(1);
    expect(entries.find(x => x.url.endsWith(`/knowledge/${slug}`))?.lastModified)
      .toEqual(new Date('2026-09-09T00:00:00.000Z'));
    expect(entries.find(x => x.url.endsWith(`/knowledge/${normalCmsSlug}`))?.lastModified)
      .toEqual(new Date('2026-05-21T01:12:10.970Z'));
    expect(entries.find(x => x.url.endsWith(`/knowledge/${reviewSlug}`))?.lastModified)
      .toEqual(new Date('2026-09-05T00:00:00.000Z'));
  });
  it.each(['2026-05-21T01:12:10.970Z', '2026-10-01T00:00:00.000Z'])(
    'uses the target static update even when the hidden CMS date is %s',
    async (cmsDate) => {
      mockCmsArticles([cmsArticle(reviewSlug, { published_at: cmsDate, updated_at: cmsDate })]);

      const entry = (await sitemap()).find((item) => item.url.endsWith(`/knowledge/${reviewSlug}`));

      expect(getKnowledgeArticle(reviewSlug)?.updatedAt).toBe('2026-09-05');
      expect(entry?.lastModified).toEqual(new Date('2026-09-05T00:00:00.000Z'));
    },
  );

  it('applies the same rule to another static override with an approved update', async () => {
    const slug = 'prototype-vs-batch-pcb-assembly';
    mockCmsArticles([cmsArticle(slug)]);

    expect((await getSitemapArticleEntries()).find((entry) => entry.slug === slug)?.lastModified)
      .toBe(getKnowledgeArticle(slug)?.updatedAt);
  });

  it('uses a static publication date when no separate update was recorded', async () => {
    const slug = 'edge-ai-device-pcba-manufacturing';
    mockCmsArticles([cmsArticle(slug)]);

    expect((await getSitemapArticleEntries()).find((entry) => entry.slug === slug)?.lastModified)
      .toBe(getKnowledgeArticle(slug)?.publishedAt);
  });

  it.each([
    [{}, '2026-05-21T01:12:10.970Z'],
    [{ published_at: null }, '2026-05-25T06:21:12.119Z'],
    [{ published_at: null, updated_at: '' }, '2026-05-20T00:00:00.000Z'],
  ] satisfies [Partial<CmsArticle>, string][])(
    'preserves the normal CMS date fallback for %j',
    async (dates, expected) => {
      mockCmsArticles([cmsArticle(normalCmsSlug, dates)]);

      expect((await getSitemapArticleEntries()).find((entry) => entry.slug === normalCmsSlug)?.lastModified)
        .toBe(expected);
    },
  );

  it('preserves CMS dates for an override without approved static dates', async () => {
    const slug = 'bom-best-practices';
    const record = cmsArticle(slug);
    mockCmsArticles([record]);

    expect((await getSitemapArticleEntries()).find((entry) => entry.slug === slug)?.lastModified)
      .toBe(record.published_at);
  });

  it('keeps the full URL inventory unique and leaves undated pages undated', async () => {
    const records = knowledgeArticles.map((article) => cmsArticle(article.slug));
    records.push(cmsArticle(normalCmsSlug), cmsArticle(reviewSlug));
    mockCmsArticles(records);

    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(59);
    expect(new Set(urls).size).toBe(59);
    expect(urls.filter((url) => url.endsWith(`/knowledge/${reviewSlug}`))).toHaveLength(1);
    expect(entries.filter((entry) => !entry.url.includes('/knowledge/'))
      .every((entry) => entry.lastModified === undefined)).toBe(true);

    mockCmsArticles([]);
    const undated = (await getSitemapArticleEntries()).find((entry) => entry.slug === 'bom-best-practices');
    expect(undated?.lastModified).toBeNull();
  });

  it('adds GROW-03 once with its approved date without refreshing other dates', async () => {
    const slug = 'turnkey-vs-consigned-pcb-assembly';
    mockCmsArticles([cmsArticle(slug), cmsArticle(normalCmsSlug)]);
    const entries = await sitemap();
    const guide = entries.filter((entry) => entry.url.endsWith(`/knowledge/${slug}`));
    expect(guide).toHaveLength(1);
    expect(guide[0].lastModified).toEqual(new Date('2026-09-05T00:00:00.000Z'));
    expect(entries.find((entry) => entry.url.endsWith(`/knowledge/${normalCmsSlug}`))?.lastModified)
      .toEqual(new Date('2026-05-21T01:12:10.970Z'));
    expect(entries.find((entry) => entry.url.endsWith('/knowledge/prototype-vs-batch-pcb-assembly'))?.lastModified)
      .toEqual(new Date('2026-09-04T00:00:00.000Z'));
  });
});
