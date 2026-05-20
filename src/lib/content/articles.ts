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
  readTime: string;
  category: string;
  categoryColor: string;
  content: string;
  author: string;
  publishedAt: string | null;
  source: 'cms' | 'static';
};

const DEFAULT_IMAGE = '/factory/flow-01.png';
const DEFAULT_CATEGORY_COLOR = 'bg-brand-primary/8 text-brand-primary border-brand-primary/15';

export function staticArticleToMarkdown(article: KnowledgeArticle) {
  return article.sections
    .map((section) => {
      const body = section.body.join('\n\n');
      return `## ${section.heading}\n\n${body}`;
    })
    .join('\n\n');
}

export function mapStaticArticle(article: KnowledgeArticle): KnowledgeDisplayArticle {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    metaDescription: article.metaDescription,
    image: article.image,
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

  return {
    slug: article.slug,
    title: article.title,
    excerpt: description,
    metaDescription: description,
    image: article.cover_image || DEFAULT_IMAGE,
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
