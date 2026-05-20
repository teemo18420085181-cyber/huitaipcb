import { MetadataRoute } from 'next';
import { getSitemapArticleEntries } from '@/lib/content/articles';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://huitaipcb.com';
  const pages = [
    '',
    '/services',
    '/capabilities',
    '/quality',
    '/industries',
    '/knowledge',
    '/contact',
    '/privacy',
    '/terms',
    '/pcb-assembly-services',
    '/china-pcb-assembly',
    '/pcb-assembly-company',
    '/prototype-pcb-assembly',
    '/turnkey-pcb-assembly',
  ];

  const staticPages = pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const articleEntries = await getSitemapArticleEntries();
  const articlePages = articleEntries.map((article) => ({
    url: `${baseUrl}/knowledge/${article.slug}`,
    lastModified: article.lastModified ? new Date(article.lastModified) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
