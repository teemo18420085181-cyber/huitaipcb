import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import { PCBA_SERVICES, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Huitai PCB | PCBA Manufacturing Supplier in China',
  description:
    'Learn how Huitai PCB supports overseas B2B teams with PCB assembly, SMT, BOM sourcing, testing, programming, and prototype-to-production PCBA manufacturing.',
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: 'About Huitai PCB | PCBA Manufacturing Supplier in China',
    description:
      'PCBA manufacturing support for existing electronics designs, from file review and sourcing through assembly, testing, and production delivery.',
    url: `${SITE.url}/about`,
    siteName: SITE.brandName,
  },
};

const capabilities = [
  {
    title: 'PCB Assembly and SMT Assembly',
    body: 'PCB fabrication coordination, solder paste preparation, SMT placement, reflow, and post-assembly handling are planned around confirmed manufacturing files.',
  },
  {
    title: 'DIP and Manual Assembly',
    body: 'Through-hole components, connectors, and project-specific manual operations can be included when they are defined in the assembly package.',
  },
  {
    title: 'BOM Sourcing',
    body: 'Manufacturer part numbers, packages, availability, lifecycle risk, and customer-approved alternatives are reviewed before purchasing.',
  },
  {
    title: 'Programming and Testing',
    body: 'Programming and functional testing can be coordinated when firmware, fixtures, procedures, power requirements, and acceptance criteria are supplied.',
  },
  {
    title: 'Prototype and Small Batch',
    body: 'Prototype and small-batch builds help confirm files, sourcing, assembly details, and test methods before repeat production.',
  },
  {
    title: 'Repeat and Mass Production',
    body: 'After the build package and acceptance requirements are confirmed, manufacturing can move into repeat or higher-volume production planning.',
  },
];

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE.organizationId,
    name: SITE.brandName,
    alternateName: SITE.shortName,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    logo: SITE.logoUrl,
    email: SITE.email,
    description:
      'A China-based PCBA manufacturing supplier supporting PCB assembly, SMT and DIP assembly, BOM sourcing, programming, testing, and prototype-to-production delivery.',
    address: { '@type': 'PostalAddress', ...SITE.address },
    knowsAbout: PCBA_SERVICES,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'About Huitai PCB', item: `${SITE.url}/about` },
    ],
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-16 text-cc-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <section className="cc-carbon-bg border-b border-cc-line px-[5vw] py-16 md:py-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="font-mono-cc mb-5 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
              PCBA MANUFACTURING SUPPLIER
            </div>
            <h1 className="font-display max-w-[760px] text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              About Huitai PCB
            </h1>
            <p className="mt-6 max-w-[780px] text-base leading-8 text-cc-ink-mute md:text-lg">
              Huitai PCB supports overseas equipment makers, electronics companies, R&amp;D teams,
              and purchasing professionals with PCBA manufacturing in Shenzhen, China. Our focus is
              helping customer-owned, existing electronics designs move into reliable production.
            </p>
            <p className="mt-4 max-w-[780px] text-sm leading-7 text-cc-ink-mute">
              Huitai PCB is the customer-facing brand of {SITE.legalName}.
            </p>
          </div>
        </section>

        <section className="border-b border-cc-line px-[5vw] py-6">
          <nav
            aria-label="About Huitai PCB trust navigation"
            className="mx-auto grid max-w-[1120px] gap-3 sm:grid-cols-3"
          >
            {[
              { label: 'How We Work', href: '/how-we-work' },
              { label: 'Quality & Testing', href: '/quality' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-cc-line bg-cc-carbon-2 px-5 py-4 text-sm font-semibold text-cc-ink transition-colors hover:border-cc-copper/50"
              >
                {item.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </nav>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-8 max-w-[720px]">
              <h2 className="font-display text-3xl font-bold">Manufacturing capabilities</h2>
              <p className="mt-3 text-sm leading-7 text-cc-ink-mute">
                Scope is confirmed from the actual Gerber, BOM, pick-and-place data, assembly
                drawings, quantities, programming files, and test requirements supplied for each project.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item) => (
                <section key={item.title} className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-6">
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-cc-ink-mute">{item.body}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section id="engineering-support" className="scroll-mt-24 border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-16">
          <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="font-mono-cc text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
                ENGINEERING SUPPORT
              </div>
              <h2 className="font-display mt-3 text-3xl font-bold">Engineering support around production</h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-cc-ink-mute">
              <p>
                Engineering support is used to clarify manufacturing inputs: file completeness,
                footprints, polarity, component substitutions, assembly constraints, programming,
                inspection, and functional test requirements.
              </p>
              <p>
                It supports the manufacturing handoff and does not replace the customer&apos;s product
                definition, circuit ownership, system validation, certification, or market decisions.
              </p>
              <Link href="/how-we-work" className="inline-flex font-semibold text-cc-copper-soft underline underline-offset-4">
                See how project review works
              </Link>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto max-w-[900px] rounded-2xl border border-cc-copper/30 bg-cc-carbon-2 p-8 text-center md:p-10">
            <h2 className="font-display text-3xl font-bold">Ready for a PCBA manufacturing review?</h2>
            <p className="mx-auto mt-3 max-w-[650px] text-sm leading-7 text-cc-ink-mute">
              Send your Gerber files, BOM, placement data, drawings, quantity, and testing requirements.
            </p>
            <TrackedLink
              href="/contact#project-files"
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'about_cta', destination: '/contact#project-files' }}
              className="cc-copper-fill mt-6 inline-flex rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Send Gerber &amp; BOM
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
