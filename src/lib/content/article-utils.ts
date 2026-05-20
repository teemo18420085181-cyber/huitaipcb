export type ArticleStatus = 'draft' | 'published';

export type CmsArticle = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  cover_image: string | null;
  author: string | null;
  read_time: number | null;
  status: ArticleStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export function slugifyTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}
