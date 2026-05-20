import { MetadataRoute } from 'next';
import { knowledgeArticles } from '@/lib/content/knowledge';

export default function sitemap(): MetadataRoute.Sitemap {
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
  const knowledgePaths = knowledgeArticles.map((article) => `/knowledge/${article.slug}`);
  return [...pages, ...knowledgePaths].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
