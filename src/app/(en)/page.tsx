import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import HomeAnswer from '@/components/HomeAnswer';
import TrustStrip from '@/components/TrustStrip';
import ProcessGrid from '@/components/ProcessGrid';
import Comparison from '@/components/Comparison';
import FactoryGrid from '@/components/FactoryGrid';
import QualityTesting from '@/components/QualityTesting';
import QuoteFiles from '@/components/QuoteFiles';
import HomeApplications from '@/components/HomeApplications';
import HomeFaq from '@/components/HomeFaq';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { OG_IMAGES } from '@/lib/seo/og';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';

export const metadata = {
  title: 'Custom PCBA Manufacturer | Prototype to Production | Huitai PCB',
  description:
    'Huitai PCB provides custom PCBA manufacturing for hardware teams, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and repeat production.',
  alternates: {
    canonical: absoluteUrl('/'),
    languages: getLanguageAlternates('/'),
  },
  openGraph: {
    title: 'Custom PCBA Manufacturer | Prototype to Production | Huitai PCB',
    description:
      'Huitai PCB provides custom PCBA manufacturing for hardware teams, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and repeat production.',
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
        <HomeAnswer />
        <TrustStrip />
        <Comparison />
        <ProcessGrid />
        <FactoryGrid />
        <QualityTesting />
        <QuoteFiles />
        <HomeApplications />
        <HomeFaq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
