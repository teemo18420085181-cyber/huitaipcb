import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';
import { OG_IMAGES } from '@/lib/seo/og';

const page = seoPages['turnkey-pcb-assembly'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/turnkey-pcb-assembly' },
  openGraph: {
    images: OG_IMAGES,
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/turnkey-pcb-assembly',
  },
};

export default function TurnkeyPcbAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
