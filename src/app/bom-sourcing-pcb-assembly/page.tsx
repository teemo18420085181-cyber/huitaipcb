import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['bom-sourcing-pcb-assembly'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/bom-sourcing-pcb-assembly' },
  openGraph: {
    title: page.seoTitle,
    description: page.metaDescription,
    url: 'https://huitaipcb.com/bom-sourcing-pcb-assembly',
  },
};

export default function BomSourcingPcbAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
