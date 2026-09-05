import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createServiceClient } = vi.hoisted(() => ({ createServiceClient: vi.fn() }));

vi.mock('@/lib/supabase/server', () => ({ createServiceClient }));

import { getKnowledgeDisplayArticle, getKnowledgeIndexArticles, type CmsArticle } from '@/lib/content/articles';
import { getKnowledgeArticle } from '@/lib/content/knowledge';

const reviewSlug = 'how-we-review-pcba-project-before-quotation';

function cmsArticle(slug: string): CmsArticle {
  return {
    id: `fixture-${slug}`,
    slug,
    title: 'CMS article fixture',
    description: 'Existing CMS description',
    content: 'Existing CMS body',
    cover_image: null,
    author: 'Huitai PCB',
    read_time: 5,
    status: 'published',
    created_at: '2026-05-21T00:00:00Z',
    updated_at: '2026-05-25T00:00:00Z',
    published_at: '2026-05-21T00:00:00Z',
  };
}

beforeEach(() => createServiceClient.mockReset());

describe('pre-quotation article source selection', () => {
  it('serves the reviewed static version of the existing URL without querying the CMS', async () => {
    const article = await getKnowledgeDisplayArticle(reviewSlug);

    expect(article).toMatchObject({
      slug: reviewSlug,
      source: 'static',
      title: getKnowledgeArticle(reviewSlug)?.title,
    });
    expect(createServiceClient).not.toHaveBeenCalled();
  });

  it('keeps unrelated published URLs on the existing CMS path', async () => {
    const record = cmsArticle('unrelated-review-fixture');
    const maybeSingle = vi.fn().mockResolvedValue({ data: record, error: null });
    const eq = vi.fn();
    eq.mockReturnValue({ eq, maybeSingle });
    createServiceClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select: vi.fn().mockReturnValue({ eq }) }),
    });

    expect(await getKnowledgeDisplayArticle(record.slug)).toMatchObject({
      slug: record.slug,
      title: record.title,
      content: record.content,
      source: 'cms',
    });
    expect(maybeSingle).toHaveBeenCalledOnce();
  });

  it('lists the existing review URL once while preserving other CMS articles', async () => {
    const records = [cmsArticle(reviewSlug), cmsArticle('unrelated-index-fixture')];
    const finalOrder = vi.fn().mockResolvedValue({ data: records, error: null });
    createServiceClient.mockReturnValue({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({ order: vi.fn().mockReturnValue({ order: finalOrder }) }),
        }),
      }),
    });

    const articles = await getKnowledgeIndexArticles();
    const reviewEntries = articles.filter((article) => article.slug === reviewSlug);

    expect(reviewEntries).toHaveLength(1);
    expect(reviewEntries[0].source).toBe('static');
    expect(articles.find((article) => article.slug === records[1].slug)).toMatchObject({
      source: 'cms',
      title: records[1].title,
    });
  });
});
