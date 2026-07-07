import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';

const pageTitle = 'China PCBA Manufacturer for Prototype and Low-Volume Turnkey Assembly';
const pageDescription =
  'China PCBA manufacturer support for overseas buyers needing PCB fabrication, BOM sourcing, SMT/DIP assembly, testing discussion and low-volume production.';
const pageUrl = 'https://huitaipcb.com/china-pcba-manufacturer';

const serviceScope = [
  'PCB fabrication coordination',
  'BOM review and component sourcing',
  'MPN, package and lifecycle checking',
  'SMT assembly',
  'DIP / through-hole assembly when required',
  'Visual inspection and AOI when applicable',
  'Functional testing discussion based on customer requirements',
  'Packing and shipment support',
];

const suitableProjects = [
  'Overseas buyers with Gerber and BOM files',
  'Prototype PCBA projects',
  'Low-volume PCBA production',
  'Small batch electronics projects',
  'Projects needing BOM sourcing support',
  'Projects needing SMT/DIP assembly and basic inspection/testing discussion',
  'Projects moving from prototype to small batch',
];

const quoteFiles = [
  'Gerber files',
  'BOM with MPNs',
  'Pick-and-place file',
  'Assembly drawing',
  'Quantity',
  'Testing requirements',
  'Sample photos if available',
  'Shipping destination',
];

const workflowSteps = [
  {
    title: 'Step 1: RFQ files and project requirements',
    text: 'Gerber, BOM, quantity, drawings, testing notes, and shipping needs are collected for first review.',
  },
  {
    title: 'Step 2: Engineering and BOM review',
    text: 'Available files, BOM risk, MPN clarity, packages, lifecycle status, and assembly notes are checked before quotation.',
  },
  {
    title: 'Step 3: Quotation and scope confirmation',
    text: 'PCB fabrication, sourcing, SMT/DIP assembly, inspection, testing discussion, packing, and delivery scope are confirmed in writing.',
  },
  {
    title: 'Step 4: PCB fabrication and component sourcing',
    text: 'PCB fabrication and component purchasing are coordinated after the required production data and sourcing assumptions are confirmed.',
  },
  {
    title: 'Step 5: SMT/DIP assembly',
    text: 'SMT assembly and DIP or through-hole assembly are arranged according to the confirmed BOM, placement data, and assembly notes.',
  },
  {
    title: 'Step 6: Inspection and testing discussion',
    text: 'Visual inspection, AOI when applicable, and functional testing discussion are matched to the confirmed project requirements.',
  },
  {
    title: 'Step 7: Packing and shipment',
    text: 'Finished PCBA boards are packed and prepared for delivery based on the agreed packing and shipping destination.',
  },
  {
    title: 'Step 8: Feedback before repeat or low-volume production',
    text: 'Prototype feedback, BOM changes, test notes, and production file updates are reviewed before repeat or low-volume production.',
  },
];

const priceFactors = [
  'Whether PCB fabrication is included',
  'Whether component sourcing is included',
  'Whether alternatives need approval',
  'Whether testing is included or only inspection',
  'Whether shipping is included',
  'Whether incomplete files require extra engineering work',
];

const faqs = [
  {
    question: 'What is a China PCBA manufacturer?',
    answer:
      'A China PCBA manufacturer supports printed circuit board assembly projects, including PCB fabrication coordination, component sourcing, SMT/DIP assembly, inspection, testing discussion and delivery. The exact scope should be confirmed before quotation.',
  },
  {
    question: 'Can Huitai support prototype PCBA and low-volume production?',
    answer:
      'Yes. Huitai supports prototype PCBA and low-volume PCBA projects for overseas buyers who need engineering review, BOM checking, assembly and delivery support before scaling production.',
  },
  {
    question: 'Do I need a complete BOM before requesting a quote?',
    answer:
      'A complete BOM helps speed up quotation, but Huitai can first review available files and point out missing information. Before production, MPNs, packages, quantities and approved alternatives should be confirmed.',
  },
  {
    question: 'Is functional testing included by default?',
    answer:
      'Functional testing depends on the customer-confirmed test method, firmware, fixture, power requirements and pass/fail criteria. AOI and visual inspection do not replace functional testing.',
  },
  {
    question: 'Can you work from a sample board if files are incomplete?',
    answer:
      'A sample board can support preliminary evaluation, but it cannot directly replace production-ready files. If Gerber, BOM or placement data are missing, production file reconstruction feasibility must be reviewed first.',
  },
  {
    question: 'How should overseas buyers start?',
    answer:
      'Send Gerber files, BOM, quantity, available sample photos and testing requirements. Huitai will review the project scope and confirm what is needed before quotation.',
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    images: OG_IMAGES,
  },
};

function JsonLdScripts() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
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
        name: pageTitle,
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

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
      {children}
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-lg border border-cc-line bg-cc-carbon-3/70 p-4 text-sm leading-6 text-cc-ink-mute"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cc-signal" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-cc-copper-soft underline underline-offset-4 transition-colors hover:text-cc-copper-bright">
      {children}
    </Link>
  );
}

export default function ChinaPcbaManufacturerPage() {
  return (
    <>
      <Nav />
      <main className="font-body-cc min-h-screen bg-cc-carbon pt-16 text-cc-ink">
        <JsonLdScripts />

        <section className="border-b border-cc-line bg-cc-carbon-2 px-[5vw] py-14 text-white md:py-20">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionEyebrow>CHINA PCBA MANUFACTURING PARTNER</SectionEyebrow>
              <h1 className="font-display max-w-[760px] text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[54px]">
                {pageTitle}
              </h1>
              <p className="mt-5 max-w-[700px] text-base leading-8 text-white/72 md:text-lg">
                Huitai helps overseas buyers move from Gerber, BOM and project requirements to finished PCBA through PCB fabrication, component sourcing, SMT/DIP assembly, inspection, testing discussion and delivery.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  href="/contact"
                  eventName="quote_click"
                  eventParams={{ location: 'china_pcba_manufacturer_hero', destination: '/contact' }}
                  className="cc-copper-fill inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  Send Your PCBA Files
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="/turnkey-pcb-assembly"
                  eventName="service_click"
                  eventParams={{ location: 'china_pcba_manufacturer_hero', destination: '/turnkey-pcb-assembly' }}
                  className="inline-flex items-center rounded-lg border border-white/20 bg-cc-carbon/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cc-copper/60 hover:text-cc-copper-soft"
                >
                  View Turnkey PCB Assembly
                </TrackedLink>
              </div>
            </div>
            <Image
              src="/images/china-pcba-manufacturer/pcba-board-batch-real.jpg"
              alt="Assembled PCBA boards for prototype and low-volume manufacturing"
              width={1600}
              height={900}
              priority
              className="h-auto w-full rounded-lg border border-cc-line object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="mx-auto mt-8 max-w-[1180px] rounded-lg border border-cc-copper/25 bg-cc-copper/10 p-5 text-sm leading-7 text-cc-ink">
            If you are looking for a China PCBA manufacturer for prototype or low-volume production, the key is not only unit price. File review, BOM risk, assembly scope and testing requirements should be checked before production starts.
          </p>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionEyebrow>MANUFACTURING SUPPORT SCOPE</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                What Huitai Handles as a PCBA Manufacturing Partner
              </h2>
              <p className="mb-6 text-sm leading-7 text-cc-ink-mute">
                Huitai coordinates PCB fabrication, component sourcing, SMT/DIP assembly, inspection, testing discussion, packaging and delivery for custom PCBA projects. The exact scope is confirmed before quotation and before production data is released.
              </p>
              <Checklist items={serviceScope} />
              <p className="mt-5 rounded-lg border border-cc-copper/25 bg-cc-copper/10 p-4 text-sm leading-7 text-cc-ink">
                Functional testing must be based on customer-confirmed test method, firmware, fixture, power requirements and pass/fail criteria.
              </p>
              <p className="mt-5 text-sm leading-7 text-cc-ink-mute">
                Related service paths include our{' '}
                <TextLink href="/turnkey-pcb-assembly">turnkey PCB assembly service</TextLink>,{' '}
                <TextLink href="/bom-sourcing-pcb-assembly">BOM sourcing for PCB assembly</TextLink>, and{' '}
                <TextLink href="/quality">PCBA inspection and testing</TextLink>.
              </p>
            </div>
            <Image
              src="/images/china-pcba-manufacturer/pcb-fabrication-process-real.jpg"
              alt="PCB fabrication and PCBA manufacturing workflow"
              width={1600}
              height={900}
              className="h-auto w-full rounded-lg border border-cc-line object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className="border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionEyebrow>SUITABLE PROJECTS</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                A practical fit for prototype-to-low-volume PCBA projects.
              </h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                This page is for buyers who need a manufacturing partner in China to connect file review, sourcing, assembly and delivery. If you mainly need a quotation workflow, see{' '}
                <TextLink href="/china-pcb-assembly">China PCB assembly quote review</TextLink>. For smaller first builds, review{' '}
                <TextLink href="/prototype-pcb-assembly">prototype PCB assembly in China</TextLink> and{' '}
                <TextLink href="/low-volume-pcba-assembly">low-volume PCBA assembly</TextLink>.
              </p>
            </div>
            <Checklist items={suitableProjects} />
          </div>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionEyebrow>RFQ FILE PACKAGE</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                What Buyers Should Send Before Quotation
              </h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                Files do not need to be perfect before the first review, but stable production requires confirmed production data. Huitai can first review available files and explain what still needs confirmation.
              </p>
              <p className="mt-4 text-sm leading-7 text-cc-ink-mute">
                Helpful references: <TextLink href="/knowledge/what-files-required-pcba-quote">Gerber and BOM quote review</TextLink>,{' '}
                <TextLink href="/knowledge/pcba-from-sample-board-what-files-are-needed">sample board evaluation and production file reconstruction</TextLink>, and{' '}
                <TextLink href="/contact">send files for review</TextLink>.
              </p>
            </div>
            <Checklist items={quoteFiles} />
          </div>
        </section>

        <section className="border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-14 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow>PROTOTYPE TO LOW-VOLUME WORKFLOW</SectionEyebrow>
            <h2 className="font-display max-w-[780px] text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
              Prototype to Low-Volume PCBA Workflow
            </h2>
            <p className="mt-4 max-w-[760px] text-sm leading-7 text-cc-ink-mute">
              Many first-time overseas buyers start with prototype PCBA or a small batch before larger production. This lets the team confirm files, BOM decisions, assembly notes and testing scope before repeat builds.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {workflowSteps.map((step) => (
                <div key={step.title} className="rounded-lg border border-cc-line bg-cc-carbon-3 p-5">
                  <h3 className="mb-2 text-base font-semibold leading-snug text-cc-ink">{step.title}</h3>
                  <p className="text-sm leading-6 text-cc-ink-mute">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Image
              src="/images/china-pcba-manufacturer/pcba-inspection-testing-real.jpg"
              alt="PCBA inspection and testing workflow"
              width={1600}
              height={900}
              className="order-last h-auto w-full rounded-lg border border-cc-line object-cover lg:order-first"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div>
              <SectionEyebrow>INSPECTION AND TESTING SCOPE</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                Inspection and testing depend on project scope.
              </h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                Huitai can support visual inspection, AOI when applicable, and functional testing discussion based on customer-confirmed requirements. AOI and visual inspection are useful checks, but they do not replace a defined functional test plan.
              </p>
              <p className="mt-5 rounded-lg border border-cc-copper/25 bg-cc-copper/10 p-4 text-sm leading-7 text-cc-ink">
                Functional testing depends on test method, firmware, fixture, power requirements, communication steps and pass/fail criteria.
              </p>
              <p className="mt-5 text-sm leading-7 text-cc-ink-mute">
                Learn more about <TextLink href="/quality">PCBA inspection and testing</TextLink> and{' '}
                <TextLink href="/knowledge/pcba-testing-before-shipment">testing requirements before shipment</TextLink>.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-14 md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionEyebrow>BUYER DECISION CHECK</SectionEyebrow>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
                Why Not Only Choose by Unit Price?
              </h2>
              <p className="text-sm leading-7 text-cc-ink-mute">
                PCBA quotations are easier to compare when the scope is clear. A low unit price can mean a different boundary, such as bare PCB only, assembly without sourcing, inspection without functional testing, or shipping excluded. Buyers should confirm what is included before comparing suppliers.
              </p>
            </div>
            <Checklist items={priceFactors} />
          </div>
        </section>

        <section className="px-[5vw] py-14 md:py-20">
          <div className="mx-auto max-w-[980px]">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="font-display mb-8 text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
              Common questions about China PCBA manufacturing support.
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
            <SectionEyebrow>READY TO REVIEW YOUR PCBA PROJECT?</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight text-cc-ink md:text-4xl">
              Need a China PCBA Manufacturer for Your Project?
            </h2>
            <p className="mx-auto mt-4 max-w-[660px] text-sm leading-7 text-cc-ink-mute">
              Send your Gerber files, BOM, quantity and testing requirements. Huitai will review the available files, BOM risk, assembly scope and delivery needs before quotation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedLink
                href="/contact"
                eventName="quote_click"
                eventParams={{ location: 'china_pcba_manufacturer_final_cta', destination: '/contact' }}
                className="cc-copper-fill inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                Send RFQ
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/how-we-work"
                eventName="service_click"
                eventParams={{ location: 'china_pcba_manufacturer_final_cta', destination: '/how-we-work' }}
                className="inline-flex items-center rounded-lg border border-cc-copper/30 px-6 py-3 text-sm font-semibold text-cc-copper-soft transition-colors hover:border-cc-copper/60"
              >
                View How We Work
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
