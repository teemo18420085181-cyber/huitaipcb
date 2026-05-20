import { MetadataRoute } from 'next';
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
  const knowledgePaths = [
    '/knowledge/what-files-required-pcba-quote',
    '/knowledge/what-is-turnkey-pcba',
    '/knowledge/bom-best-practices',
    '/knowledge/prepare-gerber-bom-files-pcb-assembly',
    '/knowledge/prototype-vs-batch-pcb-assembly',
  ];
  return [...pages, ...knowledgePaths].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
