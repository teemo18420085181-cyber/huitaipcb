import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['bom-sourcing-pcb-assembly'];
const pageImage = {
  url: '/factory/bom-risk-sourcing.jpg',
  width: 1280,
  height: 853,
  alt: 'BOM sourcing risk review with component reels, BOM list, and electronic parts',
};

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/bom-sourcing-pcb-assembly' },
  openGraph: {
    images: [pageImage],
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/bom-sourcing-pcb-assembly',
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
