import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['prototype-pcb-assembly'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/prototype-pcb-assembly' },
  openGraph: { url: 'https://huitaipcb.com/prototype-pcb-assembly' },
};

export default function PrototypePcbAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
