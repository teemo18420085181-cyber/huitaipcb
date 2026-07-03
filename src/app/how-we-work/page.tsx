import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';

const pageUrl = 'https://huitaipcb.com/how-we-work';

const rfqFiles = [
  'Gerber files',
  'BOM',
  'Pick-and-place file',
  'Assembly drawing',
  'Sample board photos if available',
  'Prototype or batch quantity',
  'Testing requirements',
  'Shipping destination',
];

const engineeringChecks = [
  'PCB manufacturability',
  'BOM completeness',
  'MPN and package consistency',
  'Component availability and alternatives',
  'SMT/DIP assembly requirements',
  'Testing scope',
  'Packaging and shipping requirements',
];

const productionUpdates = [
  'PCB production update',
  'Component purchasing update',
  'SMT assembly photos when applicable',
  'Finished PCBA photos',
  'Inspection or testing photos when applicable',
  'Packing photos before shipment',
  'Tracking number after dispatch',
];

const inspectionItems = [
  'Visual inspection',
  'AOI inspection when applicable',
  'Basic electrical checks when applicable',
  'Functional testing based on customer-provided method',
  'Packing check before shipment',
];

const workflowSteps = [
  {
    step: '01',
    title: 'RFQ files received',
    text: 'Available files, quantity, testing notes, and shipping destination are collected for first review.',
  },
  {
    step: '02',
    title: 'Engineering review',
    text: 'Gerber, BOM, component availability, assembly requirements, and testing scope are checked before quotation.',
  },
  {
    step: '03',
    title: 'Quotation and confirmation',
    text: 'The written quotation is prepared around the confirmed PCB, sourcing, assembly, testing, and shipping scope.',
  },
  {
    step: '04',
    title: 'Production updates',
    text: 'Order updates, production photos, inspection notes, packing photos, or tracking information can be shared by scope.',
  },
];

const companyFacts = [
  ['Company', 'Huitai Electronics'],
  ['Location', 'Shenzhen, China'],
  ['Focus', 'Turnkey PCBA, BOM sourcing, SMT/DIP assembly, testing and delivery'],
  ['Communication', 'Email, website RFQ form, WhatsApp when available'],
  ['Project discussion', 'Optional video call or technical discussion for suitable projects'],
];

const faqs = [
  {
    question: 'Can overseas buyers work directly with Huitai without Alibaba?',
    answer:
      'Yes. Huitai mainly works through direct RFQ communication because custom PCBA projects often require engineering review, BOM checking, file confirmation and testing discussion before quotation.',
  },
  {
    question: 'What files should I send for a PCBA quotation?',
    answer:
      'Gerber files, BOM, pick-and-place data, assembly drawing, quantity and testing requirements are helpful. If some files are missing, Huitai can first review what is available and explain what still needs confirmation.',
  },
  {
    question: 'Can I start with a small order before larger production?',
    answer:
      'Yes. Many first-time buyers start with prototype PCBA or low-volume PCBA to verify files, BOM, assembly quality and testing requirements before scaling.',
  },
  {
    question: 'How do I know the order is moving forward after deposit?',
    answer:
      'Depending on the project scope, Huitai can provide updates such as component purchasing status, production photos, finished PCBA photos, inspection updates, packing photos and tracking information.',
  },
  {
    question: 'Do you provide functional testing?',
    answer:
      'Functional testing can be arranged when the customer provides or confirms the test method, fixture, firmware, power requirements and pass/fail criteria. AOI and visual inspection do not replace functional testing.',
  },
  {
    question: 'What if my files are incomplete?',
    answer:
      'Huitai can review available files, sample photos and project requirements first. If production data is missing, the missing information must be confirmed or reconstructed before stable PCBA production.',
  },
];

export const metadata: Metadata = {
  title: 'How We Work With Overseas PCBA Buyers',
  description:
    'Learn how Huitai works with overseas PCBA buyers from RFQ review, BOM checking and production updates to inspection, packing and shipment.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How We Work With Overseas PCBA Buyers',
    description:
      'Learn how Huitai works with overseas PCBA buyers from RFQ review, BOM checking and production updates to inspection, packing and shipment.',
    url: pageUrl,
    images: OG_IMAGES,
  },
};

function JsonLdScripts() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How We Work With Overseas PCBA Buyers',
    description: metadata.description,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': 'https://huitaipcb.com/#website',
    },
    publisher: {
      '@id': 'https://huitaipcb.com/#organization',
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
        item: 'https://huitaipcb.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'How We Work',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 rounded-lg border border-cc-line bg-cc-carbon-3/70 p-4 text-sm leading-6 text-cc-ink-mute">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cc-signal" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
      {children}
    </div>
  );
}

export default function HowWeWorkPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-16">
        <JsonLdScripts />

        <section className="border-b border-cc-line bg-cc-carbon-2 px-[5vw] py-14 text-white md:py-20">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionEyebrow>OVERSEAS PCBA ORDER WORKFLOW</SectionEyebrow>
              <h1 className="font-display max-w-[720px] text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[54px]">
                How We Work With Overseas PCBA Buyers
              </h1>
              <p className="mt-5 max-w-[660px] text-base leading-8 text-white/72 md:text-lg">
                A clear RFQ, engineering review, production, inspection and delivery process for custom PCBA projects.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  href="/contact"
                  eventName="quote_click"
                  eventParams={{ location: 'how_we_work_hero', destination: '/contact' }}
                  className="cc-copper-fill inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  Send Your PCBA Files
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="/turnkey-pcb-assembly"
                  eventName="service_click"
                  eventParams={{ location: 'how_we_work_hero', destination: '/turnkey-pcb-assembly' }}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-cc-carbon/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cc-copper/60 hover:text-cc-copper-soft"
                >
                  View Turnkey PCBA Service
                </TrackedLink>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-cc-line bg-white">
              <Image
                src="/images/how-we-work/pcba-board-workflow-illustration.png"
                alt="Assembled PCBA board for custom electronics manufacturing"
                width={1200}
                height={800}
                priority
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow>ORDER PATH</SectionEyebrow>
            <h2 className="font-display max-w-[760px] text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
              A practical workflow before production starts.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {workflowSteps.map((item) => (
                <div key={item.step} className="rounded-lg border border-cc-line bg-cc-carbon-2 p-5">
                  <div className="font-mono-cc mb-4 text-xs font-bold text-cc-copper-soft">{item.step}</div>
                  <h3 className="mb-2 text-base font-semibold text-cc-ink">{item.title}</h3>
                  <p className="text-sm leading-6 text-cc-ink-mute">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionEyebrow>WHAT YOU CAN SEND FOR RFQ</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                Your first file package does not need to answer everything.
              </h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                Files do not need to be perfect before the first discussion. If something is missing,
                Huitai can first review what is available and explain what still needs to be confirmed
                before production.
              </p>
              <p className="mt-4 text-sm leading-7 text-cc-ink-mute">
                For a deeper checklist, review the{' '}
                <Link href="/knowledge/what-files-required-pcba-quote" className="text-cc-copper-soft underline underline-offset-4">
                  Gerber and BOM quote review
                </Link>
                . If you are working from a physical board, see what may be needed when quoting{' '}
                <Link href="/knowledge/pcba-from-sample-board-what-files-are-needed" className="text-cc-copper-soft underline underline-offset-4">
                  PCBA from a sample board
                </Link>
                , or{' '}
                <Link href="/contact" className="text-cc-copper-soft underline underline-offset-4">
                  send files for review
                </Link>
                .
              </p>
            </div>
            <Checklist items={rfqFiles} />
          </div>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="order-last lg:order-first">
              <Image
                src="/images/how-we-work/bom-component-review-illustration.png"
                alt="Close-up of PCB components for BOM and assembly review"
                width={1200}
                height={800}
                className="h-auto w-full rounded-lg border border-cc-line object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionEyebrow>ENGINEERING REVIEW BEFORE QUOTATION</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                Custom PCBA projects need review before pricing.
              </h2>
              <p className="mb-6 text-sm leading-7 text-cc-ink-mute">
                Huitai does not treat custom PCBA projects as only a price list. Most projects require
                file review, BOM checking and production feasibility confirmation before quotation.
              </p>
              <Checklist items={engineeringChecks} />
              <p className="mt-5 text-sm leading-7 text-cc-ink-mute">
                This can include{' '}
                <Link href="/bom-sourcing-pcb-assembly" className="text-cc-copper-soft underline underline-offset-4">
                  BOM sourcing for PCB assembly
                </Link>{' '}
                and a{' '}
                <Link href="/turnkey-pcb-assembly" className="text-cc-copper-soft underline underline-offset-4">
                  turnkey PCB assembly review
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-cc-line bg-cc-carbon-3 p-7">
              <SectionEyebrow>CLEAR QUOTATION AND PAYMENT TERMS</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink">
                Written scope before custom production.
              </h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                For most custom PCBA orders, Huitai provides a written quotation before production.
                The quotation may include PCB fabrication, component sourcing, SMT/DIP assembly,
                testing and shipping when applicable.
              </p>
              <p className="mt-4 text-sm leading-7 text-cc-ink-mute">
                For many first-time or custom orders, production starts after deposit confirmation.
                Before final shipment, buyers can receive production photos, inspection updates,
                packing photos or shipment confirmation depending on the project scope.
              </p>
            </div>
            <div className="rounded-lg border border-cc-line bg-cc-carbon-3 p-7">
              <SectionEyebrow>PRODUCTION UPDATES DURING THE ORDER</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink">
                Practical updates while the order moves forward.
              </h2>
              <p className="mb-6 text-sm leading-7 text-cc-ink-mute">
                For overseas buyers, clear communication during production is important. Huitai can
                provide practical order updates so buyers understand the project status before shipment.
              </p>
              <Checklist items={productionUpdates} />
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionEyebrow>INSPECTION AND TESTING BEFORE SHIPMENT</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                Inspection scope is matched to the project and confirmed test method.
              </h2>
              <p className="mb-6 text-sm leading-7 text-cc-ink-mute">
                Inspection and test planning may include visual inspection, AOI when applicable,
                basic electrical checks when applicable, functional testing based on the customer method,
                and packing checks before shipment.
              </p>
              <Checklist items={inspectionItems} />
              <p className="mt-5 rounded-lg border border-cc-copper/25 bg-cc-copper/10 p-4 text-sm leading-7 text-cc-ink">
                Functional testing depends on the test procedure, fixture, firmware, power requirements
                and acceptance criteria provided or confirmed by the customer.
              </p>
              <p className="mt-5 text-sm leading-7 text-cc-ink-mute">
                Learn more about{' '}
                <Link href="/quality" className="text-cc-copper-soft underline underline-offset-4">
                  PCBA functional testing and inspection
                </Link>{' '}
                and{' '}
                <Link href="/knowledge/pcba-testing-before-shipment" className="text-cc-copper-soft underline underline-offset-4">
                  testing requirements for PCBA quote review
                </Link>
                .
              </p>
            </div>
            <Image
              src="/images/how-we-work/pcba-inspection-testing-workflow.png"
              alt="PCBA inspection and testing workflow"
              width={1200}
              height={800}
              className="h-auto w-full rounded-lg border border-cc-line object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className="border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionEyebrow>FIRST ORDER RECOMMENDATION</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                Start small when the project or supplier relationship is new.
              </h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                Many overseas buyers start with prototype PCBA or a small batch before moving to larger
                quantities. This helps confirm the files, BOM, assembly process, testing method and
                communication workflow before scaling production.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/prototype-pcb-assembly" className="rounded-lg border border-cc-copper/30 px-4 py-3 text-sm font-semibold text-cc-copper-soft transition-colors hover:border-cc-copper/60">
                  Prototype PCB assembly in China
                </Link>
                <Link href="/low-volume-pcba-assembly" className="rounded-lg border border-cc-copper/30 px-4 py-3 text-sm font-semibold text-cc-copper-soft transition-colors hover:border-cc-copper/60">
                  Low-volume PCBA assembly
                </Link>
              </div>
            </div>
            <div>
              <SectionEyebrow>COMPANY AND COMMUNICATION INFORMATION</SectionEyebrow>
              <div className="overflow-hidden rounded-lg border border-cc-line">
                {companyFacts.map(([label, value]) => (
                  <div key={label} className="grid gap-2 border-b border-cc-line bg-cc-carbon-3 p-4 last:border-b-0 sm:grid-cols-[180px_1fr]">
                    <div className="font-mono-cc text-[11px] font-semibold tracking-[0.12em] text-cc-copper-soft">{label}</div>
                    <div className="text-sm leading-6 text-cc-ink-mute">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto max-w-[980px]">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="font-display mb-8 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
              Common questions from first-time overseas PCBA buyers.
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-cc-line bg-cc-carbon-2 p-6">
                  <h3 className="mb-3 text-base font-semibold text-cc-ink">{faq.question}</h3>
                  <p className="text-sm leading-7 text-cc-ink-mute">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-cc-line bg-cc-carbon-2 px-[5vw] py-16 md:py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <SectionEyebrow>READY TO DISCUSS YOUR PCBA PROJECT?</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
              Ready to Discuss Your PCBA Project?
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-sm leading-7 text-cc-ink-mute">
              Send Gerber files, BOM, quantity, available sample photos and testing requirements.
              Huitai will review the project scope before quotation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedLink
                href="/contact"
                eventName="quote_click"
                eventParams={{ location: 'how_we_work_final_cta', destination: '/contact' }}
                className="cc-copper-fill inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                Send RFQ
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/china-pcb-assembly"
                eventName="service_click"
                eventParams={{ location: 'how_we_work_final_cta', destination: '/china-pcb-assembly' }}
                className="inline-flex items-center rounded-lg border border-cc-copper/30 px-6 py-3 text-sm font-semibold text-cc-copper-soft transition-colors hover:border-cc-copper/60"
              >
                View China PCB Assembly Service
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
