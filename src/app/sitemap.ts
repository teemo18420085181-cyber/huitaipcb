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
    '/pcb-fabrication-and-assembly',
    '/china-pcb-assembly',
    '/pcb-assembly-company',
    '/prototype-pcb-assembly',
    '/low-volume-pcba-assembly',
    '/bom-sourcing-pcb-assembly',
    '/pcba-testing-quality-control',
    '/turnkey-pcb-assembly',
    '/pcba-quote-file-checklist',
    '/de',
    '/de/turnkey-pcb-assembly',
    '/de/china-pcb-assembly',
    '/de/bom-sourcing-pcb-assembly',
    '/de/prototype-pcb-assembly',
    '/de/contact',
  ];

  const staticPages = pages.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const articleEntries = await getSitemapArticleEntries();
  const articlePages = articleEntries.map((article) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${baseUrl}/knowledge/${article.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    };

    if (article.lastModified) {
      entry.lastModified = new Date(article.lastModified);
    }

    return entry;
  });

  return [...staticPages, ...articlePages];
}
