import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'PCBA Services Overview | Huitai Electronics',
  description:
    'Explore Huitai Electronics PCBA service workflow, including engineering review, PCB fabrication coordination, BOM sourcing, SMT assembly, DIP assembly, testing, and finished PCBA delivery.',
  alternates: { canonical: 'https://huitaipcb.com/services' },
  openGraph: {
    title: 'PCBA Services Overview | Huitai Electronics',
    description:
      'Explore Huitai Electronics PCBA service workflow from Gerber and BOM review to finished PCBA delivery.',
    url: 'https://huitaipcb.com/services',
  },
};

const SERVICE_STEPS = [
  {
    n: '01',
    tag: 'Engineering review',
    title: 'Review files before quotation',
    desc: 'We review Gerber files, BOM lists, pick and place data, drawings, sample photos, quantity, and testing requirements so the quote scope is clear.',
  },
  {
    n: '02',
    tag: 'PCB fabrication',
    title: 'Coordinate PCB fabrication as part of PCBA delivery',
    desc: 'Bare board fabrication is coordinated for turnkey PCBA projects. The goal is assembled board delivery, not standalone bare PCB sales.',
  },
  {
    n: '03',
    tag: 'BOM sourcing',
    title: 'Review sourcing options and purchasing plans',
    desc: 'We check MPN clarity, component availability, lifecycle risks, and customer-approved alternatives before purchasing parts for assembly.',
  },
  {
    n: '04',
    tag: 'SMT and DIP assembly',
    title: 'Coordinate SMT assembly and optional DIP work',
    desc: 'SMT assembly, optional through-hole/DIP assembly, connector soldering, and post-assembly handling are planned according to the project requirements.',
  },
  {
    n: '05',
    tag: 'Inspection and testing',
    title: 'Plan inspection and testing scope',
    desc: 'Visual inspection, AOI, shipment checks, and functional testing can be coordinated based on customer instructions, firmware, fixtures, or acceptance criteria.',
  },
  {
    n: '06',
    tag: 'Finished delivery',
    title: 'Prepare assembled PCBA boards for shipment',
    desc: 'After confirmed inspection and testing steps, finished PCBA boards are packaged and prepared for international delivery according to the project plan.',
  },
];

const SERVICE_LINKS = [
  {
    title: 'Turnkey PCBA Manufacturing',
    desc: 'Core pillar page for complete PCB fabrication, sourcing, assembly, testing, and delivery.',
    href: '/turnkey-pcb-assembly',
  },
  {
    title: 'PCB Fabrication and Assembly',
    desc: 'For buyers who need fabricated boards assembled into finished PCBA boards.',
    href: '/pcb-fabrication-and-assembly',
  },
  {
    title: 'Low Volume PCBA Assembly',
    desc: 'Small batch, trial production, and low-volume PCBA support.',
    href: '/low-volume-pcba-assembly',
  },
  {
    title: 'BOM Sourcing and PCB Assembly',
    desc: 'BOM review, component availability checks, alternatives, purchasing, and assembly.',
    href: '/bom-sourcing-pcb-assembly',
  },
  {
    title: 'PCBA Testing and Quality Control',
    desc: 'Inspection and functional testing scope based on confirmed project requirements.',
    href: '/pcba-testing-quality-control',
  },
  {
    title: 'Prototype PCB Assembly',
    desc: 'Prototype PCBA builds for engineers, startups, and product development teams.',
    href: '/prototype-pcb-assembly',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg pt-[64px]">
        <section className="bg-brand-primary px-[5vw] py-16 text-white md:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-brand-yellow">
              PCBA SERVICE OVERVIEW
            </div>
            <h1 className="mb-5 max-w-[760px] text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[52px]">
              PCBA Services Overview
            </h1>
            <p className="max-w-[760px] text-base leading-relaxed text-white/70 md:text-lg">
              Huitai Electronics focuses on complete PCBA delivery for overseas B2B customers:
              engineering review, PCB fabrication coordination, BOM sourcing, SMT assembly, optional
              DIP assembly, inspection, testing, packaging, and finished board shipment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-lg bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-primary transition-all hover:-translate-y-0.5">
                Get PCB Assembly Quote
              </Link>
              <Link href="/contact" className="rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50">
                Upload Gerber &amp; BOM
              </Link>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-8 max-w-[720px]">
              <h2 className="mb-3 text-2xl font-semibold text-brand-primary">How the PCBA workflow is coordinated</h2>
              <p className="text-sm leading-7 text-ink-muted">
                This page is a service overview. For detailed commercial pages, use the service links below so each RFQ topic has a clear destination.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SERVICE_STEPS.map((step) => (
                <div key={step.n} className="rounded-2xl border border-line bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.14em] text-brand-primary">{step.tag}</span>
                    <span className="rounded-full bg-bg-muted px-3 py-1 text-xs font-semibold text-brand-primary">{step.n}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-brand-primary">{step.title}</h3>
                  <p className="text-sm leading-7 text-ink-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5vw] pb-16">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="mb-6 text-2xl font-semibold text-brand-primary">Service pages</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {SERVICE_LINKS.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-semibold text-brand-primary">{service.title}</h3>
                  <p className="text-sm leading-7 text-ink-muted">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="mx-auto max-w-[820px] rounded-2xl bg-brand-primary p-10 text-center text-white">
            <h2 className="mb-3 text-2xl font-semibold md:text-3xl">Ready to send us your project?</h2>
            <p className="mx-auto mb-6 max-w-[560px] text-sm leading-7 text-white/70">
              Upload your Gerber files, BOM list, quantity, and testing requirements. We will review the available information before quotation.
            </p>
            <Link href="/contact" className="inline-flex rounded-lg bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-primary transition-all hover:-translate-y-0.5">
              Upload Gerber &amp; BOM
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
