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
import JsonLd from '@/components/JsonLd';
import { OG_IMAGES } from '@/lib/seo/og';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';

export const metadata = {
  title: 'Custom PCBA Manufacturer in China | Huitai PCB',
  description:
    'PCBA manufacturing in China for PCB assembly, SMT, BOM sourcing, prototype and small-batch production, testing, and scalable production delivery.',
  alternates: {
    canonical: absoluteUrl('/'),
    languages: getLanguageAlternates('/'),
  },
  openGraph: {
    title: 'Custom PCBA Manufacturer in China | Huitai PCB',
    description:
      'PCBA manufacturing in China for PCB assembly, SMT, BOM sourcing, prototype and small-batch production, testing, and scalable production delivery.',
    url: absoluteUrl('/'),
    siteName: 'Huitai PCB',
    images: OG_IMAGES,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
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
