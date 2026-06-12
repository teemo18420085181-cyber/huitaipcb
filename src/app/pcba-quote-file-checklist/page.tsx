import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';

const pageUrl = 'https://huitaipcb.com/pcba-quote-file-checklist';

const checklistItems = [
  {
    item: 'Gerber files',
    status: 'Required',
    why: 'They define PCB layers, copper, solder mask, silkscreen, drill data, and board outline.',
    notes: 'Send the complete zipped Gerber package when available.',
  },
  {
    item: 'BOM list',
    status: 'Required',
    why: 'The BOM drives component sourcing, pricing, availability checks, and substitution review.',
    notes: 'Include MPN, quantity, package, reference designator, and acceptable alternatives.',
  },
  {
    item: 'Pick and Place file',
    status: 'Recommended',
    why: 'Placement data helps SMT programming and reduces manual interpretation of component locations.',
    notes: 'Also called centroid, XY, or placement file.',
  },
  {
    item: 'Assembly drawing',
    status: 'Recommended',
    why: 'Assembly notes clarify polarity, connector direction, mechanical constraints, and special handling.',
    notes: 'Useful when the board has unusual parts or mechanical interfaces.',
  },
  {
    item: 'PCB specifications',
    status: 'Required',
    why: 'Material, layer count, thickness, copper weight, surface finish, and solder mask affect fabrication.',
    notes: 'Add controlled impedance, via type, or special process notes if needed.',
  },
  {
    item: 'Quantity',
    status: 'Required',
    why: 'Quantity affects setup allocation, component purchasing, tooling, and delivery planning.',
    notes: 'Share prototype, pilot, and production quantities separately if possible.',
  },
  {
    item: 'Component alternatives',
    status: 'Optional',
    why: 'Approved alternatives can reduce sourcing delays when primary parts are unavailable.',
    notes: 'Mark which alternatives are approved by engineering.',
  },
  {
    item: 'Testing requirements',
    status: 'Recommended',
    why: 'AOI, functional testing, programming, and fixture needs affect quotation scope and schedule.',
    notes: 'Send test procedures, acceptance criteria, and fixture information if available.',
  },
  {
    item: 'Firmware / programming requirements',
    status: 'Optional',
    why: 'Programming steps may require files, tools, access instructions, and post-programming checks.',
    notes: 'Do not send sensitive credentials through public forms.',
  },
  {
    item: 'Delivery requirements',
    status: 'Required',
    why: 'Delivery address, Incoterms preference, packaging needs, and target date affect logistics planning.',
    notes: 'Share destination country and any special packaging instructions.',
  },
  {
    item: 'Sample board photos',
    status: 'Optional',
    why: 'Photos can clarify assembly direction, connectors, labels, or previous production references.',
    notes: 'Use photos as supporting context, not as a replacement for Gerber and BOM files.',
  },
  {
    item: 'Special process notes',
    status: 'Optional',
    why: 'Conformal coating, selective soldering, underfill, cleaning, or labeling can change the process.',
    notes: 'List any process that is important for function, appearance, or compliance.',
  },
];

const faqs = [
  {
    question: 'What files are needed for a PCBA quote?',
    answer:
      'A useful PCBA quote package usually includes Gerber files, BOM, quantity, PCB specifications, testing requirements, and delivery information. Pick and Place files, assembly drawings, and approved component alternatives can make review more accurate.',
  },
  {
    question: 'Can I get a quote without complete Gerber files?',
    answer:
      'A preliminary discussion may be possible without complete Gerber files, but accurate PCB fabrication and assembly quotation usually needs the Gerber package. Missing fabrication data can create assumptions about layers, drill data, board outline, and surface finish.',
  },
  {
    question: 'Why does the BOM affect PCBA cost?',
    answer:
      'The BOM affects component sourcing, availability, package verification, purchasing quantity, substitution review, and assembly planning. A BOM with MPN, quantity, package, and reference designator data is easier to review and quote.',
  },
  {
    question: 'Do I need to provide Pick and Place files?',
    answer:
      'Pick and Place files are strongly recommended for SMT assembly because they provide component coordinates and rotation data. They help reduce manual interpretation and support SMT programming.',
  },
  {
    question: 'What testing requirements should I prepare?',
    answer:
      'Prepare any required AOI, visual inspection, functional testing, programming, fixture testing, voltage checks, or acceptance criteria. If a test fixture is needed, include fixture files or test procedure notes when available.',
  },
  {
    question: 'Can Huitai help with BOM sourcing?',
    answer:
      'Yes. Huitai Electronics can review BOM data for sourcing coordination, part availability, package clarity, and acceptable alternatives. Do not send confidential credentials or sensitive project information through public channels.',
  },
  {
    question: 'Can Huitai review files before production?',
    answer:
      'Yes. Huitai Electronics can review available Gerber, BOM, assembly, quantity, and testing information before production planning. Engineering review helps identify missing quotation details and manufacturing questions early.',
  },
  {
    question: 'What should I send for turnkey PCBA manufacturing?',
    answer:
      'For turnkey PCBA manufacturing, send Gerber files, BOM, Pick and Place data if available, PCB specifications, quantity, testing requirements, delivery information, and any special assembly notes.',
  },
];

const relatedLinks = [
  { href: '/knowledge/how-much-does-pcba-assembly-cost', label: 'How much does PCBA assembly cost?' },
  { href: '/knowledge/what-files-required-pcba-quote', label: 'What files are required for a PCBA quote?' },
  { href: '/bom-sourcing-pcb-assembly', label: 'BOM sourcing and PCB assembly' },
  { href: '/contact', label: 'Send files for review' },
  { href: '/turnkey-pcb-assembly', label: 'Turnkey PCB assembly' },
];

export const metadata: Metadata = {
  title: 'PCBA Quote File Checklist | Gerber, BOM & Assembly Requirements',
  description:
    'Prepare the right files for a PCBA quote. Learn what Gerber files, BOM, placement data, testing requirements, quantity, and assembly notes are needed for turnkey PCBA manufacturing.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'PCBA Quote File Checklist | Gerber, BOM & Assembly Requirements',
    description:
      'Prepare Gerber files, BOM, placement data, testing requirements, quantity, and assembly notes for turnkey PCBA quotation review.',
    url: pageUrl,
    images: OG_IMAGES,
  },
};

function JsonLdScripts() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'PCBA Quote File Checklist',
    description: metadata.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'Huitai Electronics',
      url: 'https://huitaipcb.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Huitai Electronics',
      url: 'https://huitaipcb.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://huitaipcb.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'PCBA Quote File Checklist',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export default function PcbaQuoteFileChecklistPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-[64px]">
        <JsonLdScripts />

        <section className="bg-cc-carbon-2 px-[5vw] py-16 text-white md:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-6 inline-flex rounded-lg border border-cc-copper/40 bg-cc-copper/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-cc-copper-soft">
              RFQ FILE PREPARATION
            </div>
            <h1 className="max-w-[760px] text-4xl font-semibold leading-tight md:text-5xl">
              PCBA Quote File Checklist
            </h1>
            <p className="mt-5 max-w-[760px] text-base leading-8 text-white/72 md:text-lg">
              Prepare Gerber files, BOM data, placement information, assembly notes, testing requirements,
              quantity, and delivery details before requesting turnkey PCBA manufacturing review.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href="/contact"
                eventName="quote_click"
                eventParams={{ location: 'pcba_quote_checklist_hero', destination: '/contact' }}
                className="rounded-lg bg-cc-copper px-6 py-3 text-sm font-semibold text-cc-ink transition-all hover:-translate-y-0.5"
              >
                Send Files for Review
              </TrackedLink>
              <TrackedLink
                href="/contact"
                eventName="upload_gerber_bom_click"
                eventParams={{ location: 'pcba_quote_checklist_hero', destination: '/contact' }}
                className="rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50"
              >
                Upload Gerber &amp; BOM
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-14">
          <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-7">
              <section className="rounded-xl border border-cc-copper/15 bg-cc-carbon-2 p-7 shadow-sm">
                <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-ink">
                  QUICK ANSWER
                </div>
                <p className="text-sm leading-7 text-cc-ink-mute">
                  For a PCBA quote, prepare Gerber files, a BOM with MPNs and quantities, Pick and Place data if
                  available, PCB specifications, testing requirements, delivery information, and any special
                  assembly notes. Complete files help Huitai Electronics review fabrication, component sourcing,
                  SMT assembly, DIP assembly, testing, and finished PCBA delivery requirements.
                </p>
              </section>

              <section className="rounded-xl border border-cc-line bg-cc-carbon-2 p-7">
                <h2 className="mb-4 text-2xl font-semibold text-cc-ink">Checklist Table</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-cc-line bg-cc-carbon text-cc-ink">
                        <th className="px-4 py-3 font-semibold">File / Information</th>
                        <th className="px-4 py-3 font-semibold">Required or Optional</th>
                        <th className="px-4 py-3 font-semibold">Why It Matters</th>
                        <th className="px-4 py-3 font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checklistItems.map((row) => (
                        <tr key={row.item} className="border-b border-cc-line last:border-b-0">
                          <td className="px-4 py-4 font-semibold text-cc-ink">{row.item}</td>
                          <td className="px-4 py-4 text-cc-ink-mute">{row.status}</td>
                          <td className="px-4 py-4 leading-6 text-cc-ink-mute">{row.why}</td>
                          <td className="px-4 py-4 leading-6 text-cc-ink-mute">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-xl border border-cc-line bg-cc-carbon-2 p-7">
                <h2 className="mb-4 text-2xl font-semibold text-cc-ink">How to Prepare the RFQ Package</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    'Group Gerber files, BOM, and placement data in one clear folder.',
                    'Use exact MPNs where possible and mark acceptable alternatives separately.',
                    'Separate prototype, pilot, and production quantities if they differ.',
                    'Add testing, programming, packaging, and delivery notes before review.',
                  ].map((item) => (
                    <div key={item} className="rounded-lg border border-cc-line bg-cc-carbon p-4 text-sm leading-6 text-cc-ink-mute">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-cc-line bg-cc-carbon-2 p-7">
                <h2 className="mb-5 text-2xl font-semibold text-cc-ink">FAQ</h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="border-b border-cc-line pb-4 last:border-b-0 last:pb-0">
                      <h3 className="mb-2 text-base font-semibold text-cc-ink">{faq.question}</h3>
                      <p className="text-sm leading-7 text-cc-ink-mute">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-cc-copper/15 bg-cc-carbon-2 p-7 text-white">
                <h2 className="mb-3 text-2xl font-semibold">Send Gerber, BOM, quantity, and testing requirements for review.</h2>
                <p className="mb-5 max-w-[720px] text-sm leading-7 text-white/70">
                  Huitai Electronics can review available RFQ files before turnkey PCBA quotation and production planning.
                </p>
                <div className="flex flex-wrap gap-3">
                  <TrackedLink
                    href="/contact"
                    eventName="quote_click"
                    eventParams={{ location: 'pcba_quote_checklist_bottom', destination: '/contact' }}
                    className="inline-flex rounded-lg bg-cc-copper px-5 py-3 text-sm font-semibold text-cc-ink transition-all hover:-translate-y-0.5"
                  >
                    Request a PCBA Quote
                  </TrackedLink>
                  <TrackedLink
                    href="/contact"
                    eventName="upload_gerber_bom_click"
                    eventParams={{ location: 'pcba_quote_checklist_bottom', destination: '/contact' }}
                    className="inline-flex rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/50"
                  >
                    Upload Gerber &amp; BOM
                  </TrackedLink>
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-xl border border-cc-line bg-cc-carbon-2 p-6 lg:sticky lg:top-24">
              <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-ink">
                RELATED PAGES
              </div>
              <h2 className="mb-3 text-xl font-semibold text-cc-ink">Continue PCBA RFQ preparation</h2>
              <p className="mb-5 text-sm leading-6 text-cc-ink-mute">
                Review related cost, file, BOM sourcing, contact, and turnkey assembly resources.
              </p>
              <div className="space-y-2">
                {relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-cc-ink underline underline-offset-4">
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
