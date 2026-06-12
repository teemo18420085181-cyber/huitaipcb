import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';
import { OG_IMAGES } from '@/lib/seo/og';

const page = seoPages['pcb-assembly-services'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/pcb-assembly-services' },
  openGraph: {
    images: OG_IMAGES,
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/pcb-assembly-services',
  },
};

export default function PcbAssemblyServicesPage() {
  return <SeoLandingPage page={page} />;
}
