import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';

const page = seoPages['bom-sourcing-pcb-assembly'];
const pathname = '/bom-sourcing-pcb-assembly';
const pageImage = {
  url: '/factory/bom-risk-sourcing.jpg',
  width: 1280,
  height: 853,
  alt: 'BOM sourcing risk review with component reels, BOM list, and electronic parts',
};

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: {
    canonical: absoluteUrl(pathname),
    languages: getLanguageAlternates(pathname),
  },
  openGraph: {
    images: [pageImage],
    title: page.seoTitle,
    description: page.metaDescription,
    url: absoluteUrl(pathname),
  },
  twitter: {
    card: 'summary_large_image',
    title: page.seoTitle,
    description: page.metaDescription,
    images: [pageImage],
  },
};

export default function BomSourcingPcbAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
