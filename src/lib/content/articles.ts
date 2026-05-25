import { createServiceClient } from '@/lib/supabase/server';
import { getKnowledgeArticle, knowledgeArticles, type KnowledgeArticle } from '@/lib/content/knowledge';
import { slugifyTitle, type CmsArticle } from '@/lib/content/article-utils';

export { slugifyTitle };
export type { CmsArticle };

export type KnowledgeDisplayArticle = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  readTime: string;
  category: string;
  categoryColor: string;
  content: string;
  author: string;
  publishedAt: string | null;
  source: 'cms' | 'static';
};

const DEFAULT_IMAGE = '/factory/flow-01.png';
const DEFAULT_IMAGE_ALT = 'PCBA engineer reviewing BOM files and assembled circuit boards';
const DEFAULT_CATEGORY_COLOR = 'bg-brand-primary/8 text-brand-primary border-brand-primary/15';

const ARTICLE_VISUALS: Record<string, { image: string; alt: string }> = {
  'how-much-does-pcba-assembly-cost': {
    image: '/factory/flow-01.png',
    alt: 'Engineer reviewing BOM files, PCBA samples, and quotation documents for cost estimation',
  },
  'what-determines-pcb-assembly-quote-china': {
    image: '/factory/engineer.png',
    alt: 'PCBA engineer inspecting assembled circuit boards during China PCB assembly quotation review',
  },
  'how-we-review-pcba-project-before-quotation': {
    image: '/factory/board-1.png',
    alt: 'Close-up PCBA board inspection used during engineering review before quotation',
  },
  'bom-best-practices': {
    image: '/factory/flow-02.png',
    alt: 'Component reels and BOM sourcing review for PCB assembly quotation',
  },
  'bom-alternatives-pcba-sourcing': {
    image: '/factory/real-reels.jpg',
    alt: 'Electronic component reels used for PCBA sourcing and approved BOM alternatives',
  },
  'pcba-testing-before-shipment': {
    image: '/factory/testing.png',
    alt: 'Functional testing probes checking an assembled PCBA board before shipment',
  },
  'how-to-choose-pcba-manufacturer-china': {
    image: '/factory/real-smt-1.jpg',
    alt: 'China SMT assembly workshop for evaluating a PCBA manufacturing supplier',
  },
  'what-files-required-pcba-quote': {
    image: '/factory/flow-01.png',
    alt: 'Gerber files, BOM list, and PCBA samples prepared for PCB assembly quotation',
  },
  'pcb-assembly-file-preparation-guide': {
    image: '/factory/flow-03.png',
    alt: 'PCB fabrication panel representing Gerber file preparation for PCBA manufacturing',
  },
  'pcba-quotation-checklist': {
    image: '/factory/flow-08.png',
    alt: 'Finished PCBA boards, test report, and packing documents for quotation checklist review',
  },
  'what-is-turnkey-pcba': {
    image: '/factory/flow-04.png',
    alt: 'SMT assembly process showing turnkey PCBA manufacturing workflow',
  },
  'prototype-vs-batch-pcb-assembly': {
    image: '/factory/flow-07.png',
    alt: 'Prototype PCBA board being assembled before low-volume or batch production',
  },
};

function getArticleVisual(slug: string, customCover?: string | null) {
  const mapped = ARTICLE_VISUALS[slug] || {
    image: DEFAULT_IMAGE,
    alt: DEFAULT_IMAGE_ALT,
  };
  const cover = customCover?.trim();

  return {
    image: cover && cover !== DEFAULT_IMAGE ? cover : mapped.image,
    alt: mapped.alt,
  };
}

export function staticArticleToMarkdown(article: KnowledgeArticle) {
  return article.sections
    .map((section) => {
      const body = section.body.join('\n\n');
      return `## ${section.heading}\n\n${body}`;
    })
    .join('\n\n');
}

export function mapStaticArticle(article: KnowledgeArticle): KnowledgeDisplayArticle {
  const visual = getArticleVisual(article.slug);

  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    metaDescription: article.metaDescription,
    image: visual.image,
    imageAlt: visual.alt,
    readTime: article.readTime,
    category: article.category,
    categoryColor: article.categoryColor,
    content: staticArticleToMarkdown(article),
    author: 'Huitai Engineering Team',
    publishedAt: null,
    source: 'static',
  };
}

export function mapCmsArticle(article: CmsArticle): KnowledgeDisplayArticle {
  const description = article.description || article.content?.slice(0, 150) || article.title;
  const visual = getArticleVisual(article.slug, article.cover_image);

  return {
    slug: article.slug,
    title: article.title,
    excerpt: description,
    metaDescription: description,
    image: visual.image,
    imageAlt: visual.alt,
    readTime: `${article.read_time || 5} min read`,
    category: 'Knowledge Base',
    categoryColor: DEFAULT_CATEGORY_COLOR,
    content: article.content || '',
    author: article.author || 'Huitai Engineering Team',
    publishedAt: article.published_at,
    source: 'cms',
  };
}

function getServiceClient() {
  try {
    return createServiceClient();
  } catch {
    return null;
  }
}

export async function getPublishedCmsArticles() {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data || []) as CmsArticle[];
}

export async function getKnowledgeIndexArticles() {
  const cmsArticles = await getPublishedCmsArticles();
  const cmsSlugs = new Set(cmsArticles.map((article) => article.slug));
  const cms = cmsArticles.map(mapCmsArticle);
  const fallback = knowledgeArticles
    .filter((article) => !cmsSlugs.has(article.slug))
    .map(mapStaticArticle);

  return [...cms, ...fallback];
}

export async function getKnowledgeDisplayArticle(slug: string) {
  const supabase = getServiceClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (!error && data) return mapCmsArticle(data as CmsArticle);
  }

  const fallback = getKnowledgeArticle(slug);
  return fallback ? mapStaticArticle(fallback) : null;
}

export async function getSitemapArticleEntries() {
  const cmsArticles = await getPublishedCmsArticles();
  const entries = new Map<string, string | null>();

  for (const article of knowledgeArticles) {
    entries.set(article.slug, null);
  }
  for (const article of cmsArticles) {
    entries.set(article.slug, article.published_at || article.updated_at || article.created_at);
  }

  return Array.from(entries.entries()).map(([slug, lastModified]) => ({
    slug,
    lastModified,
  }));
}
