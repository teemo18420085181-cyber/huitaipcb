import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'PCBA Manufacturing Case Studies | Huitai PCB',
  description:
    'Verified Huitai PCB manufacturing cases will be added progressively and published only with approved project evidence, images, scope, and results.',
  alternates: { canonical: `${SITE.url}/case-study` },
  robots: { index: true, follow: true },
};

const templateSections = [
  ['Project Overview', 'Application context, approved project scope, manufacturing stage, and the information permitted for public use.'],
  ['Customer Requirement', 'Required quantity, delivery objective, supplied files, assembly constraints, programming needs, and acceptance criteria.'],
  ['Technical Challenge', 'Verified BOM, assembly, sourcing, testing, or production-control issues that materially affected the build.'],
  ['Our Solution', 'The manufacturing review, controlled decisions, and customer-approved actions taken to address the documented challenge.'],
  ['Hardware Architecture', 'Only publishable components and functional blocks supported by approved project records and images.'],
  ['Manufacturing Process', 'PCB Assembly, SMT, optional DIP, programming, inspection, functional testing, and packaging steps that were actually used.'],
  ['Final Result', 'Verified manufacturing outcome, acceptance evidence, and any approved next-production step without unsupported performance claims.'],
];

export default function CaseStudyPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Huitai PCB PCBA Manufacturing Case Studies',
    url: `${SITE.url}/case-study`,
    description: 'Verified and customer-approved PCBA manufacturing cases added progressively.',
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-16 text-cc-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <section className="cc-carbon-bg border-b border-cc-line px-[5vw] py-16 md:py-24">
          <div className="mx-auto max-w-[980px]">
            <div className="font-mono-cc mb-5 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
              VERIFIED MANUFACTURING CASES
            </div>
            <h1 className="font-display max-w-[760px] text-4xl font-extrabold leading-tight md:text-6xl">
              PCBA Manufacturing Case Studies
            </h1>
            <p className="mt-6 max-w-[760px] text-base leading-8 text-cc-ink-mute">
              Verified manufacturing cases will be added progressively. Each case will be published
              only when project records, PCBA images, results, and the customer-approved public scope
              are available.
            </p>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto max-w-[980px]">
            <div className="mb-8 rounded-2xl border border-cc-copper/30 bg-cc-copper/[0.06] p-6">
              <h2 className="font-display text-2xl font-bold">How Verified Cases Will Be Documented</h2>
              <p className="mt-3 text-sm leading-7 text-cc-ink-mute">
                Each published page must distinguish customer inputs, manufacturing decisions,
                Huitai PCB&apos;s work, and the evidence supporting the final result.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {templateSections.map(([title, body], index) => (
                <section key={title} className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-6">
                  <div className="font-mono-cc text-[10px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h2 className="font-display mt-2 text-xl font-bold">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-cc-ink-mute">{body}</p>
                </section>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/knowledge/how-to-choose-pcba-manufacturer-china" className="rounded-full border border-cc-line px-4 py-2 text-sm text-cc-ink-mute transition-colors hover:border-cc-copper/50 hover:text-cc-ink">
                How to choose a PCBA manufacturer
              </Link>
              <Link href="/knowledge/pcba-testing-before-shipment" className="rounded-full border border-cc-line px-4 py-2 text-sm text-cc-ink-mute transition-colors hover:border-cc-copper/50 hover:text-cc-ink">
                PCBA testing before shipment
              </Link>
            </div>
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="mx-auto max-w-[900px] rounded-2xl border border-cc-copper/30 bg-cc-carbon-2 p-8 text-center">
            <h2 className="font-display text-2xl font-bold">Have a PCBA project ready for review?</h2>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-7 text-cc-ink-mute">
              Start with the manufacturing files and required production scope. Public case-study permission is never required for quotation.
            </p>
            <TrackedLink
              href="/contact#project-files"
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'case_study_cta', destination: '/contact#project-files' }}
              className="cc-copper-fill mt-6 inline-flex rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Get PCBA Manufacturing Quote
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
