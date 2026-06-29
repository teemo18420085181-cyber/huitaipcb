import SeoLandingPage from '@/components/SeoLandingPage';
import { seoPages } from '@/lib/content/seoPages';
import { OG_IMAGES } from '@/lib/seo/og';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';

const page = seoPages['turnkey-pcb-assembly'];
const pathname = '/turnkey-pcb-assembly';

export const metadata = {
  title: page.seoTitle,
  description: page.metaDescription,
  alternates: {
    canonical: absoluteUrl(pathname),
    languages: getLanguageAlternates(pathname),
  },
  openGraph: {
    images: OG_IMAGES,
    title: page.seoTitle,
    description: page.metaDescription,
    url: absoluteUrl(pathname),
  },
};

export default function TurnkeyPcbAssemblyPage() {
  return <SeoLandingPage page={page} />;
}
