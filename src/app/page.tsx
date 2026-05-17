import Splash from '@/components/Splash';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import ProcessGrid from '@/components/ProcessGrid';
import FlowCards3D from '@/components/FlowCards3D';
import FlowShowcase from '@/components/FlowShowcase';
import Comparison from '@/components/Comparison';
import FactoryGrid from '@/components/FactoryGrid';
import Testimonials from '@/components/Testimonials';
import FeedbackBoard from '@/components/FeedbackBoard';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Splash />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <ProcessGrid />
        <FlowCards3D />
        <FlowShowcase />
        <Comparison />
        <FactoryGrid />
        <Testimonials />
        <FeedbackBoard />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
