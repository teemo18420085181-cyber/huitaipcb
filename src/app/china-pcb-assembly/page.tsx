import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['china-pcb-assembly'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/china-pcb-assembly' },
  openGraph: {
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/china-pcb-assembly',
  },
};

export default function ChinaPcbAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
