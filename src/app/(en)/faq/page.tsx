import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'PCBA Manufacturing FAQ | Files, BOM, Samples & Production',
  description:
    'Procurement answers about PCBA quotation files, Gerber, BOM, pick-and-place data, assembly drawings, samples, small batches, sourcing, and production support.',
  alternates: { canonical: `${SITE.url}/faq` },
  openGraph: {
    title: 'PCBA Manufacturing FAQ | Huitai PCB',
    description: 'A practical supplier-screening FAQ for prototype, small-batch, and production PCBA buyers.',
    url: `${SITE.url}/faq`,
    siteName: SITE.brandName,
  },
};

const faqs = [
  {
    question: 'What files should I send for a PCBA manufacturing quote?',
    answer:
      'Send the Gerber files, BOM with manufacturer part numbers, pick-and-place or CPL data, assembly drawing, target quantity, and testing requirements. Firmware, programming instructions, panel requirements, and sample photos are also useful when they apply to the project.',
  },
  {
    question: 'Do you support prototype and small-batch PCB assembly?',
    answer:
      'Yes. Huitai PCB supports prototype and small-batch PCBA manufacturing, including builds starting from 5 sets when the confirmed project scope is suitable. Quotation and process planning are based on the actual files, component availability, quantity, assembly requirements, and test scope.',
  },
  {
    question: 'Can you support PCBA manufacturing from an existing design or sample?',
    answer:
      'Yes. For a customer-owned or authorized design, send the available Gerber, BOM, pick-and-place data, drawings, revision notes, and clear sample photos. A sample can support preliminary review, but stable production still requires confirmed manufacturing files and prototype verification when files must be reconstructed.',
  },
  {
    question: 'Do you provide component sourcing with PCB assembly?',
    answer:
      'Yes. BOM sourcing can be included with PCB fabrication, SMT assembly, DIP assembly, inspection, programming, and functional testing. Exact MPNs, package details, approved alternatives, and no-substitute parts should be confirmed before purchasing.',
  },
  {
    question: 'Does Huitai PCB provide full product development?',
    answer:
      'Huitai PCB is primarily a PCBA manufacturing supplier. Engineering support focuses on manufacturing readiness, BOM and file review, assembly questions, programming, and test planning for existing customer designs. Product definition, system design ownership, certification, and final product validation remain with the customer unless a separate, verified scope is agreed.',
  },
];

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-16 text-cc-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <section className="cc-carbon-bg border-b border-cc-line px-[5vw] py-16 md:py-24">
          <div className="mx-auto max-w-[980px]">
            <div className="font-mono-cc mb-5 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
              PROCUREMENT FAQ
            </div>
            <h1 className="font-display max-w-[760px] text-4xl font-extrabold leading-tight md:text-6xl">
              PCBA Manufacturing Questions Buyers Ask
            </h1>
            <p className="mt-6 max-w-[720px] text-base leading-8 text-cc-ink-mute">
              Use these answers to prepare a reviewable RFQ and determine whether the manufacturing
              scope fits your prototype, small-batch, or production requirement.
            </p>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto max-w-[900px] space-y-4">
            {faqs.map((item, index) => (
              <section key={item.question} className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 md:p-8">
                <div className="font-mono-cc text-[10px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h2 className="font-display mt-2 text-xl font-bold md:text-2xl">{item.question}</h2>
                <p className="mt-3 text-sm leading-7 text-cc-ink-mute">{item.answer}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="mx-auto grid max-w-[900px] gap-4 rounded-2xl border border-cc-copper/30 bg-cc-carbon-2 p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold">Prepare your manufacturing package</h2>
              <p className="mt-2 text-sm leading-7 text-cc-ink-mute">
                Review the file checklist or send the available files for a scoped quotation review.
              </p>
              <Link href="/pcba-quote-file-checklist" className="mt-3 inline-flex text-sm font-semibold text-cc-copper-soft underline underline-offset-4">
                View the RFQ file checklist
              </Link>
            </div>
            <TrackedLink
              href="/contact#project-files"
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'faq_cta', destination: '/contact#project-files' }}
              className="cc-copper-fill inline-flex justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Send Manufacturing Files
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
