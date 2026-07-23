import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import ProcessGrid from '@/components/ProcessGrid';
import Comparison from '@/components/Comparison';
import FactoryGrid from '@/components/FactoryGrid';
import QualityTesting from '@/components/QualityTesting';
import HomeApplications from '@/components/HomeApplications';
import HomeFaq from '@/components/HomeFaq';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { OG_IMAGES } from '@/lib/seo/og';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';

export const metadata = {
  title: 'Turnkey PCBA Manufacturer in China | HuitaiPCB',
  description:
    'Turnkey PCBA manufacturing in Shenzhen, including PCB fabrication, BOM sourcing, SMT and through-hole assembly, testing and prototype-to-production support.',
  alternates: {
    canonical: absoluteUrl('/'),
    languages: getLanguageAlternates('/'),
  },
  openGraph: {
    title: 'Turnkey PCBA Manufacturer in China | HuitaiPCB',
    description:
      'Turnkey PCBA manufacturing in Shenzhen, including PCB fabrication, BOM sourcing, SMT and through-hole assembly, testing and prototype-to-production support.',
    url: absoluteUrl('/'),
    siteName: 'Huitai Electronics',
    images: OG_IMAGES,
  },
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <ProcessGrid />
        <Comparison />
        <FactoryGrid />
        <QualityTesting />
        <HomeApplications />
        <HomeFaq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
