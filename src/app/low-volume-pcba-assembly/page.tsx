import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['low-volume-pcba-assembly'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/low-volume-pcba-assembly' },
  openGraph: {
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/low-volume-pcba-assembly',
  },
};

export default function LowVolumePcbaAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
