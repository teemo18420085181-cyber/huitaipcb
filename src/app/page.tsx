import Splash from '@/components/Splash';
import Link from 'next/link';
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

const HOME_SERVICE_LINKS = [
  { label: 'Turnkey PCBA Manufacturing', href: '/turnkey-pcb-assembly' },
  { label: 'China PCB Assembly Service', href: '/china-pcb-assembly' },
  { label: 'PCB Assembly Company in China', href: '/pcb-assembly-company' },
  { label: 'Prototype PCB Assembly', href: '/prototype-pcb-assembly' },
  { label: 'Get PCB Assembly Quote', href: '/contact' },
];

export const metadata = {
  title: 'PCB Assembly Services & Turnkey PCBA Manufacturing in China | Huitai Electronics',
  description: 'Huitai Electronics provides PCB assembly services and turnkey PCBA manufacturing in China, including PCB fabrication, component sourcing, SMT assembly, DIP assembly, functional testing, final assembly, and global delivery.',
  alternates: { canonical: 'https://huitaipcb.com/' },
  openGraph: { url: 'https://huitaipcb.com/' },
};

export default function HomePage() {
  return (
    <>
      <Splash />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <section className="border-y border-line bg-white px-[5vw] py-6">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-brand-primary">
              KEY PCBA PAGES
            </span>
            {HOME_SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-line px-3.5 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
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
