import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['pcb-assembly-services'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/pcb-assembly-services' },
};

export default function PcbAssemblyServicesPage() {
  return <SeoLandingPage page={page} />;
}
