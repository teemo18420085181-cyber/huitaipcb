import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';

const page = seoPages['turnkey-pcb-assembly'];

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: { canonical: 'https://huitaipcb.com/turnkey-pcb-assembly' },
};

export default function TurnkeyPcbAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
