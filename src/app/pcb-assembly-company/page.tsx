import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['pcb-assembly-company'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/pcb-assembly-company' },
  openGraph: {
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/pcb-assembly-company',
  },
};

export default function PcbAssemblyCompanyPage() {
  return <SeoLandingPage page={page} />;
}
