import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'PCBA Manufacturing Services | Huitai PCB',
  description:
    'Explore Huitai PCB manufacturing services: PCB fabrication, BOM sourcing, SMT and DIP assembly, testing, programming, prototype, small-batch, and repeat production.',
  alternates: { canonical: 'https://huitaipcb.com/services' },
  openGraph: {
    images: OG_IMAGES,
    title: 'PCBA Manufacturing Services | Huitai PCB',
    description:
      'Explore Huitai PCB manufacturing services from confirmed Gerber and BOM data to assembled, tested, and packaged PCBA delivery.',
    url: 'https://huitaipcb.com/services',
  },
};

const SERVICE_STEPS = [
  {
    n: '01',
    tag: 'Manufacturing inputs',
    title: 'Confirm files and production scope',
    desc: 'Gerber files, BOM lists, pick-and-place data, drawings, sample photos, quantity, and testing requirements are reviewed so the manufacturing quote scope is clear.',
    image: '/factory/svc-engineering-review.jpg',
    alt: 'Engineer reviewing Gerber and BOM files for PCB assembly quotation',
  },
  {
    n: '02',
    tag: 'PCB fabrication',
    title: 'Coordinate PCB fabrication as part of PCBA delivery',
    desc: 'Bare board fabrication is coordinated for turnkey PCBA projects. The goal is assembled board delivery, not standalone bare PCB sales.',
    image: '/factory/svc-pcb-fabrication.jpg',
    alt: 'Bare PCB panels on the fabrication line for turnkey PCBA',
  },
  {
    n: '03',
    tag: 'BOM sourcing',
    title: 'Review sourcing options and purchasing plans',
    desc: 'We check MPN clarity, component availability, lifecycle risks, and customer-approved alternatives before purchasing parts for assembly.',
    image: '/factory/svc-bom-sourcing.jpg',
    alt: 'Component reel barcode check during BOM sourcing for PCB assembly',
  },
  {
    n: '04',
    tag: 'SMT and DIP assembly',
    title: 'Coordinate SMT assembly and optional DIP work',
    desc: 'SMT assembly, optional through-hole/DIP assembly, connector soldering, and post-assembly handling are planned according to the project requirements.',
    image: '/factory/svc-smt-assembly.jpg',
    alt: 'SMT assembly line placing components on PCBs for turnkey PCBA manufacturing',
  },
  {
    n: '05',
    tag: 'Inspection and testing',
    title: 'Plan inspection and testing scope',
    desc: 'Visual inspection, AOI, shipment checks, and functional testing can be coordinated based on customer instructions, firmware, fixtures, or acceptance criteria.',
    image: '/factory/svc-inspection-testing.jpg',
    alt: 'AOI inspection and functional testing of assembled PCBA boards',
  },
  {
    n: '06',
    tag: 'Finished delivery',
    title: 'Prepare assembled PCBA boards for shipment',
    desc: 'After confirmed inspection and testing steps, finished PCBA boards are packaged and prepared for international delivery according to the project plan.',
    image: '/factory/svc-finished-delivery.jpg',
    alt: 'Anti-static packaging of finished PCBA boards ready for shipment',
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
    title: 'PCB Assembly Services',
    desc: 'Custom SMT and through-hole assembly coordinated from confirmed production files.',
    href: '/pcb-assembly-services',
  },
  {
    title: 'BOM Sourcing and PCB Assembly',
    desc: 'BOM review, component availability checks, alternatives, purchasing, and assembly.',
    href: '/bom-sourcing-pcb-assembly',
  },
  {
    title: 'Prototype PCB Assembly',
    desc: 'Prototype PCBA builds for design verification and manufacturing handoff.',
    href: '/prototype-pcb-assembly',
  },
  {
    title: 'Low Volume PCBA Assembly',
    desc: 'Small-batch, trial-production, and low-volume PCBA support.',
    href: '/low-volume-pcba-assembly',
  },
  {
    title: 'PCBA Testing and Quality Control',
    desc: 'Inspection, programming, and functional testing based on confirmed project requirements.',
    href: '/pcba-testing-quality-control',
  },
  {
    title: 'Engineering Support for Production',
    desc: 'File, BOM, assembly, programming, and test clarification around an existing customer design.',
    href: '/about#engineering-support',
  },
];

export default function ServicesPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PCBA Manufacturing Services',
    serviceType: 'Custom PCBA manufacturing',
    url: `${SITE.url}/services`,
    description: metadata.description,
    provider: { '@id': SITE.organizationId },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PCBA Manufacturing Scope',
      itemListElement: SERVICE_STEPS.map((step) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: step.title, description: step.desc },
      })),
    },
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-[64px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <section className="bg-cc-carbon-2 px-[5vw] py-16 text-white md:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cc-copper/40 bg-cc-copper/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-cc-copper-soft">
              PCBA SERVICE OVERVIEW
            </div>
            <h1 className="mb-5 max-w-[760px] text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[52px]">
              PCBA Services Overview
            </h1>
            <p className="max-w-[760px] text-base leading-relaxed text-white/70 md:text-lg">
              Huitai PCB is a PCBA manufacturing supplier for overseas B2B customers. The scope
              connects PCB fabrication, BOM sourcing, SMT and optional DIP assembly, programming,
              inspection, testing, packaging, and finished board delivery from prototype to production.
            </p>
            <div className="mt-8 grid max-w-[560px] gap-3 sm:flex sm:flex-wrap">
              <TrackedLink
                href="/contact#project-files"
                eventName="upload_gerber_bom_click"
                eventParams={{ location: 'services_hero', destination: '/contact#project-files' }}
                className="rounded-lg bg-cc-copper px-6 py-3 text-center text-sm font-semibold text-cc-ink transition-all hover:-translate-y-0.5"
              >
                Get PCBA Manufacturing Quote
              </TrackedLink>
              <TrackedLink
                href="/pcba-quote-file-checklist"
                eventName="quote_file_checklist_click"
                eventParams={{ location: 'services_hero', destination: '/pcba-quote-file-checklist' }}
                className="rounded-lg border border-white/25 px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:border-white/50"
              >
                See RFQ File Checklist
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-8 max-w-[720px]">
              <h2 className="mb-3 text-2xl font-semibold text-cc-ink">How the PCBA workflow is coordinated</h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                Start with the stage that matches your project. We can review available files, clarify
                the missing information, and coordinate only the sourcing, assembly, testing, and
                delivery steps your build needs.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SERVICE_STEPS.map((step) => (
                <div
                  key={step.n}
                  className="group overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon-2 transition-all duration-200 hover:-translate-y-1 hover:border-cc-copper/40"
                >
                  <div className="relative h-36 overflow-hidden bg-cc-carbon-3">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cc-carbon-2 via-cc-carbon-2/30 to-transparent" />
                    <span className="cc-copper-fill font-mono-cc absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold">
                      {step.n}
                    </span>
                    <span className="font-mono-cc absolute bottom-3 left-3 text-[10px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                      {step.tag.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-cc-ink">{step.title}</h3>
                    <p className="text-sm leading-7 text-cc-ink-mute">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5vw] pb-16">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="mb-6 text-2xl font-semibold text-cc-ink">Service pages</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {SERVICE_LINKS.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 transition-all hover:-translate-y-0.5 hover:border-cc-copper/30 hover:shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-semibold text-cc-ink">{service.title}</h3>
                  <p className="text-sm leading-7 text-cc-ink-mute">{service.desc}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-cc-copper/25 bg-cc-copper/[0.05] p-6">
              <h3 className="text-lg font-semibold text-cc-ink">How manufacturing evidence will be documented</h3>
              <p className="mt-2 text-sm leading-7 text-cc-ink-mute">
                Review the evidence requirements used before a customer-approved PCBA project is published.
              </p>
              <Link href="/case-study" className="mt-3 inline-flex text-sm font-semibold text-cc-copper-soft underline underline-offset-4">
                View the case study framework
              </Link>
            </div>
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="mx-auto max-w-[820px] rounded-2xl bg-cc-carbon-2 p-10 text-center text-white">
            <h2 className="mb-3 text-2xl font-semibold md:text-3xl">Ready to send us your project?</h2>
            <p className="mx-auto mb-6 max-w-[560px] text-sm leading-7 text-white/70">
              Upload your Gerber files, BOM list, quantity, and testing requirements. We will review the available information before quotation.
            </p>
            <TrackedLink
              href="/contact#project-files"
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'services_bottom_cta', destination: '/contact#project-files' }}
              className="inline-flex rounded-lg bg-cc-copper px-6 py-3 text-sm font-semibold text-cc-ink transition-all hover:-translate-y-0.5"
            >
              Upload Files for Engineering Review
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
