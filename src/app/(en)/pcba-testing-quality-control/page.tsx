import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';
import { OG_IMAGES } from '@/lib/seo/og';

const page = seoPages['pcba-testing-quality-control'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/pcba-testing-quality-control' },
  openGraph: {
    images: OG_IMAGES,
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/pcba-testing-quality-control',
  },
};

export default function PcbaTestingQualityControlPage() {
  return <SeoLandingPage page={page} />;
}
