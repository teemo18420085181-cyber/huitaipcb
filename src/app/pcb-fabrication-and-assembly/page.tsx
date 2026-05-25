import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['pcb-fabrication-and-assembly'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/pcb-fabrication-and-assembly' },
  openGraph: {
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/pcb-fabrication-and-assembly',
  },
};

export default function PcbFabricationAndAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
