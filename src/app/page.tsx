import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';

const CONTACT_URL = '/contact#quote-form';

const WHO_WE_HELP = [
  {
    title: 'Have Gerber & BOM',
    text: 'Send complete production files for prototype or low-volume PCBA quotation review.',
    href: '/contact',
    linkLabel: 'Send project files',
  },
  {
    title: 'Have Sample Only',
    text: 'Share a sample board for file preparation, BOM review or reverse engineering evaluation.',
    href: '/prototype-pcb-assembly',
    linkLabel: 'Review prototype support',
  },
  {
    title: 'Prototype & Low-volume Production',
    text: 'Move from prototype validation to small batch PCBA with sourcing, assembly and testing support.',
    href: '/low-volume-pcba-assembly',
    linkLabel: 'Plan low-volume PCBA',
  },
];

const CORE_SERVICES = [
  {
    title: 'PCB Fabrication',
    text: 'PCB fabrication is coordinated with the confirmed stack-up, material and production files.',
    href: '/pcb-fabrication-and-assembly',
  },
  {
    title: 'BOM Sourcing',
    text: 'BOM review checks MPN clarity, availability, lifecycle risk and approved alternatives.',
    href: '/bom-sourcing-pcb-assembly',
  },
  {
    title: 'SMT Assembly',
    text: 'SMT assembly follows reviewed placement data, polarity notes and assembly requirements.',
    href: '/turnkey-pcb-assembly',
  },
  {
    title: 'DIP Assembly',
    text: 'Through-hole components are handled according to drawings, notes and project scope.',
    href: '/turnkey-pcb-assembly',
  },
  {
    title: 'Testing Support',
    text: 'AOI, visual inspection and functional testing support are discussed before production.',
    href: '/quality',
  },
  {
    title: 'Packaging',
    text: 'Finished PCBA boards are packed for delivery according to agreed handling needs.',
    href: '/turnkey-pcb-assembly',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Send Files',
    text: 'Share Gerber, BOM, placement data, drawings, test notes or sample board details.',
  },
  {
    title: 'Engineering Review',
    text: 'We check missing data, BOM risk, assembly questions and testing scope before quotation.',
  },
  {
    title: 'PCB + Components',
    text: 'PCB fabrication and component sourcing are coordinated after the scope is confirmed.',
  },
  {
    title: 'Assembly',
    text: 'SMT and DIP assembly follow the approved files, BOM and production notes.',
  },
  {
    title: 'Inspection',
    text: 'AOI, visual inspection and agreed functional testing support are handled by project scope.',
  },
  {
    title: 'Packing & Shipping',
    text: 'Boards are packed and prepared for delivery after final checks are complete.',
  },
];

const TRUST_SIGNALS = [
  'Shenzhen-based supplier',
  'Prototype support',
  'Low-volume production',
  'BOM sourcing',
  'AOI / visual inspection',
  'Functional testing support',
  'ESD-safe packaging',
];

const RFQ_CHECKLIST = [
  'Gerber',
  'BOM',
  'Pick & Place',
  'Assembly Drawing',
  'Testing Requirement',
  'Quantity',
];

export const metadata = {
  title: 'Turnkey PCBA Manufacturing in China | Huitai Electronics',
  description:
    'Huitai Electronics provides turnkey PCBA manufacturing in Shenzhen, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and delivery.',
  alternates: {
    canonical: absoluteUrl('/'),
    languages: getLanguageAlternates('/'),
  },
  openGraph: {
    title: 'Turnkey PCBA Manufacturing in China | Huitai Electronics',
    description:
      'Huitai Electronics provides turnkey PCBA manufacturing in Shenzhen, including PCB fabrication, BOM sourcing, SMT/DIP assembly, testing and delivery.',
    url: absoluteUrl('/'),
    siteName: 'Huitai Electronics',
    images: OG_IMAGES,
  },
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_62%,#f6f7f9_100%)] px-[5vw] pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-amber-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800 shadow-sm">
                Shenzhen turnkey PCBA supplier
              </div>
              <h1 className="max-w-[760px] text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-6xl md:leading-[1.02]">
                Turnkey PCBA Manufacturing in China
              </h1>
              <p className="mt-5 max-w-[620px] text-base leading-8 text-slate-600 md:text-lg">
                PCB fabrication, component sourcing, SMT/DIP assembly, testing and delivery from Shenzhen.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={CONTACT_URL}
                  eventName="quote_cta_click"
                  eventParams={{ location: 'home_hero', destination: CONTACT_URL }}
                  className="inline-flex justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition-transform hover:-translate-y-0.5"
                >
                  Request a Quote
                </TrackedLink>
                <Link
                  href="#process"
                  className="inline-flex justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-500"
                >
                  See Our Process
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-amber-100/50 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-2xl shadow-slate-200">
                <Image
                  src="/factory/svc-inspection-testing.jpg"
                  alt="Turnkey PCBA assembly and inspection process in Shenzhen"
                  width={760}
                  height={520}
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[430px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-[680px]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Who we help</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                Clear entry points for PCBA quotation review
              </h2>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {WHO_WE_HELP.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl hover:shadow-slate-200/70"
                >
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-amber-800 group-hover:text-amber-900">
                    {item.linkLabel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 px-[5vw] py-16 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Core services</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                  One coordinated PCBA workflow
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Huitai focuses on turnkey PCBA projects where fabrication, sourcing, assembly, testing and delivery are reviewed together.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {CORE_SERVICES.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-amber-300"
                  >
                    <h3 className="font-semibold text-slate-950">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{service.text}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 px-[5vw] py-16 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-[680px]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Simple process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                From files to packed PCBA boards
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-[5vw] py-14 text-white md:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Trust signals</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                Practical checks, not inflated claims
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {TRUST_SIGNALS.map((signal) => (
                <span key={signal} className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm text-white/80">
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 md:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">RFQ review</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                Ready for a Quote?
              </h2>
              <p className="mt-4 max-w-[720px] text-sm leading-7 text-slate-600 md:text-base">
                Send your Gerber files, BOM, pick-and-place data, assembly drawing, testing requirements or sample board details for a practical PCBA quotation review.
              </p>
              <TrackedLink
                href={CONTACT_URL}
                eventName="quote_cta_click"
                eventParams={{ location: 'home_rfq_section', destination: CONTACT_URL }}
                className="mt-7 inline-flex rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition-transform hover:-translate-y-0.5"
              >
                Request a Quote
              </TrackedLink>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {RFQ_CHECKLIST.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
