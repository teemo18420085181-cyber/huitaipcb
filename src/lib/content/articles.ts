import { createServiceClient } from '@/lib/supabase/server';
import { getKnowledgeArticle, knowledgeArticles, type KnowledgeArticle } from '@/lib/content/knowledge';
import { slugifyTitle, type CmsArticle } from '@/lib/content/article-utils';

export { slugifyTitle };
export type { CmsArticle };

export type KnowledgeDisplayArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  imageCaption: string | null;
  readTime: string;
  category: string;
  categoryColor: string;
  content: string;
  author: string;
  authorUrl: string;
  publishedAt: string | null;
  updatedAt: string | null;
  reviewedBy: string;
  reviewerUrl: string;
  cta: KnowledgeArticle['cta'] | null;
  source: 'cms' | 'static';
};

const DEFAULT_IMAGE = '/factory/flow-01.png';
const DEFAULT_IMAGE_ALT = 'PCBA engineer reviewing BOM files and assembled circuit boards';
const DEFAULT_CATEGORY_COLOR = 'bg-cc-copper/10 text-cc-ink border-cc-copper/30';

const ARTICLE_SEO_TITLES: Record<string, string> = {
  'bom-alternatives-pcba-sourcing': 'How to Approve Alternative Components for PCBA | Huitai PCB',
  'bom-best-practices': 'PCBA BOM Best Practices | Quote & Production Preparation',
  'bom-risk-alternative-component-sourcing': 'BOM Risk and Component Availability in PCBA Manufacturing',
  'edge-ai-device-pcba-manufacturing': 'Edge AI PCB Assembly: Prototype Manufacturing Checklist',
  'how-much-does-pcba-assembly-cost': 'How Much Does PCBA Assembly Cost? | Cost Factors',
  'pcba-component-shortage-2026': '2026 PCBA Component Shortage: Lead Times, Supply & BOM Risk',
  'pcba-testing-before-shipment': 'PCBA Testing Before Shipment | Turnkey PCBA Guide',
  'pcba-quotation-checklist': 'PCBA Quotation Checklist | RFQ Readiness',
  'prototype-pcb-assembly-china-buyer-checklist': 'Prototype PCB Assembly China | Huitai PCB',
  'what-is-turnkey-pcba': 'What Is Turnkey PCBA? | PCB Assembly Guide',
  'what-determines-pcb-assembly-quote-china': 'PCB Assembly Quote in China | Required RFQ Information',
};

const ARTICLE_VISUALS: Record<string, { image: string; alt: string }> = {
  'edge-ai-device-pcba-manufacturing': {
    image: '/images/knowledge/edge-ai-device-pcba-manufacturing/edge-ai-pcb-assembly-manufacturing.webp',
    alt: 'Edge AI PCB assembly with a camera module, embedded compute board, memory, power circuits, and high-speed connectors',
  },
  'pcba-component-shortage-2026': {
    image: '/factory/bom-risk-sourcing.jpg',
    alt: 'PCBA component sourcing review with a BOM, electronic parts, and an assembled circuit board',
  },
  'how-much-does-pcba-assembly-cost': {
    image: '/factory/knowledge-covers/pcba-assembly-cost-cover.webp',
    alt: 'PCBA assembly cost review with BOM, components, testing tools, and assembled boards',
  },
  'what-determines-pcb-assembly-quote-china': {
    image: '/factory/knowledge-covers/pcb-assembly-quote-factors-china-cover.webp',
    alt: 'PCBA quotation review with BOM, components, sample boards, and testing requirements',
  },
  'how-we-review-pcba-project-before-quotation': {
    image: '/factory/knowledge-covers/pcba-project-review-before-quote-cover.webp',
    alt: 'Engineer reviewing PCBA samples and project files before quotation',
  },
  'bom-best-practices': {
    image: '/factory/knowledge-covers/bom-best-practices-pcba-cover.webp',
    alt: 'Component reels and BOM documents prepared for PCBA sourcing review',
  },
  'bom-alternatives-pcba-sourcing': {
    image: '/factory/knowledge-covers/bom-alternatives-pcba-sourcing-cover.webp',
    alt: 'Component reels and PCBA board used for BOM alternatives and sourcing review',
  },
  'pcba-testing-before-shipment': {
    image: '/factory/knowledge-covers/pcba-testing-before-shipment-cover.webp',
    alt: 'Functional testing probes checking an assembled PCBA board before shipment',
  },
  'how-to-choose-pcba-manufacturer-china': {
    image: '/factory/knowledge-covers/choose-pcba-manufacturer-china-cover.webp',
    alt: 'Engineer inspecting PCBA boards in a China SMT assembly workshop',
  },
  'what-files-required-pcba-quote': {
    image: '/factory/knowledge-covers/pcba-quote-required-files-cover.webp',
    alt: 'Engineer reviewing Gerber files, BOM list, and PCBA samples for quotation',
  },
  'pcb-assembly-file-preparation-guide': {
    image: '/factory/knowledge-covers/pcb-assembly-file-preparation-cover.webp',
    alt: 'Gerber files, BOM list, pick and place data, and PCBA sample prepared for assembly',
  },
  'pcba-quotation-checklist': {
    image: '/factory/knowledge-covers/pcba-quotation-checklist-cover.webp',
    alt: 'PCBA quotation checklist with Gerber files, BOM, sample board, and testing requirements',
  },
  'what-is-turnkey-pcba': {
    image: '/factory/knowledge-covers/turnkey-pcba-workflow-cover.webp',
    alt: 'Turnkey PCBA workflow from assembly to testing and finished board delivery',
  },
  'prototype-vs-batch-pcb-assembly': {
    image: '/factory/knowledge-covers/prototype-vs-batch-pcba-cover.webp',
    alt: 'Prototype PCBA samples compared with low-volume batch assembly trays',
  },
  'prototype-pcb-assembly-china-buyer-checklist': {
    image: '/factory/knowledge-covers/prototype-vs-batch-pcba-cover.webp',
    alt: 'Prototype PCB assembly file review for overseas buyers',
  },
  'pcba-from-sample-board-what-files-are-needed': {
    image: '/factory/knowledge-covers/pcba-project-review-before-quote-cover.webp',
    alt: 'PCBA sample board photos and project files prepared for engineering review',
  },
};

const STATIC_CONTENT_OVERRIDE_SLUGS = new Set([
  'bom-best-practices',
  'bom-alternatives-pcba-sourcing',
  'edge-ai-device-pcba-manufacturing',
  'how-much-does-pcba-assembly-cost',
  'pcba-component-shortage-2026',
  'pcba-quotation-checklist',
  'what-files-required-pcba-quote',
  'what-determines-pcb-assembly-quote-china',
  'pcb-assembly-file-preparation-guide',
  'bom-risk-alternative-component-sourcing',
  'prototype-vs-batch-pcb-assembly',
  'pcba-testing-before-shipment',
  'prototype-pcb-assembly-china-buyer-checklist',
  'pcba-from-sample-board-what-files-are-needed',
  'jlcpcb-alternatives-turnkey-pcba',
]);

function getArticleVisual(slug: string, customCover?: string | null) {
  const mapped = ARTICLE_VISUALS[slug];
  if (mapped) return mapped;

  const cover = customCover?.trim();

  return {
    image: cover && cover !== DEFAULT_IMAGE ? cover : DEFAULT_IMAGE,
    alt: DEFAULT_IMAGE_ALT,
  };
}

function getArticleSeoTitle(slug: string, title: string) {
  return ARTICLE_SEO_TITLES[slug] || title;
}

function getVerifiedUpdatedAt(publishedAt: string | null, updatedAt: string | null) {
  if (!updatedAt) return null;
  if (!publishedAt) return updatedAt;

  const publishedTime = Date.parse(publishedAt);
  const updatedTime = Date.parse(updatedAt);

  if (Number.isNaN(updatedTime)) return null;
  if (Number.isNaN(publishedTime)) return updatedAt;
  return updatedTime > publishedTime ? updatedAt : null;
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
  const visual = getArticleVisual(article.slug, article.image);

  return {
    slug: article.slug,
    title: article.title,
    seoTitle: getArticleSeoTitle(article.slug, article.title),
    excerpt: article.excerpt,
    metaDescription: article.metaDescription,
    image: visual.image,
    imageAlt: visual.alt,
    imageCaption: article.imageCaption || null,
    readTime: article.readTime,
    category: article.category,
    categoryColor: article.categoryColor,
    content: staticArticleToMarkdown(article),
    author: 'Huitai PCB',
    authorUrl: '/about#engineering-support',
    publishedAt: article.publishedAt || null,
    updatedAt: article.updatedAt || null,
    reviewedBy: 'Huitai Engineering Team',
    reviewerUrl: '/about#engineering-support',
    cta: article.cta || null,
    source: 'static',
  };
}

export function mapCmsArticle(article: CmsArticle): KnowledgeDisplayArticle {
  const description = article.description || article.content?.slice(0, 150) || article.title;
  const visual = getArticleVisual(article.slug, article.cover_image);

  return {
    slug: article.slug,
    title: article.title,
    seoTitle: getArticleSeoTitle(article.slug, article.title),
    excerpt: description,
    metaDescription: description,
    image: visual.image,
    imageAlt: visual.alt,
    imageCaption: null,
    readTime: `${article.read_time || 5} min read`,
    category: 'Knowledge Base',
    categoryColor: DEFAULT_CATEGORY_COLOR,
    content: article.content || '',
    author: article.author || 'Huitai PCB',
    authorUrl: '/about#engineering-support',
    publishedAt: article.published_at,
    updatedAt: getVerifiedUpdatedAt(article.published_at, article.updated_at),
    reviewedBy: 'Huitai Engineering Team',
    reviewerUrl: '/about#engineering-support',
    cta: null,
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
  const cmsSlugs = new Set(
    cmsArticles
      .map((article) => article.slug)
      .filter((slug) => !STATIC_CONTENT_OVERRIDE_SLUGS.has(slug))
  );
  const cms = cmsArticles
    .filter((article) => !STATIC_CONTENT_OVERRIDE_SLUGS.has(article.slug))
    .map(mapCmsArticle);
  const fallback = knowledgeArticles
    .filter((article) => !cmsSlugs.has(article.slug))
    .map(mapStaticArticle);

  return [...cms, ...fallback];
}

export async function getKnowledgeDisplayArticle(slug: string) {
  if (STATIC_CONTENT_OVERRIDE_SLUGS.has(slug)) {
    const staticArticle = getKnowledgeArticle(slug);
    if (staticArticle) return mapStaticArticle(staticArticle);
  }

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
    entries.set(article.slug, article.updatedAt || article.publishedAt || null);
  }
  for (const article of cmsArticles) {
    entries.set(article.slug, article.published_at || article.updated_at || article.created_at);
  }

  return Array.from(entries.entries()).map(([slug, lastModified]) => ({
    slug,
    lastModified,
  }));
}
