import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'What does a PCBA manufacturer do?',
    answer:
      'A PCBA manufacturer turns PCB design files and a component list into assembled circuit boards. The confirmed scope can include PCB fabrication, component sourcing, SMT and through-hole assembly, inspection, programming, testing, and finished PCBA delivery.',
  },
  {
    question: 'What files are needed for a PCBA quote?',
    answer:
      'Send the Gerber files, BOM with MPNs, pick-and-place or CPL data, assembly drawing, target production quantity, and testing requirements. If something is missing, identify it in the project brief so it can be reviewed before quotation.',
  },
  {
    question: 'What is your minimum prototype quantity?',
    answer:
      'Prototype orders can start from 5 sets. The practical build scope still depends on the PCB specification, component availability, assembly process, and test requirements.',
  },
  {
    question: 'Can you support prototype and repeat production?',
    answer:
      'Yes. Huitai supports prototype, low-volume, and production PCBA projects. Each quotation is based on the actual quantity and the confirmed fabrication, sourcing, assembly, inspection, and delivery scope.',
  },
  {
    question: 'Can you source the complete BOM?',
    answer:
      'BOM sourcing can be included in the turnkey project. Availability, package questions, and possible alternatives are reviewed, and substitutions are not used without customer approval.',
  },
  {
    question: 'What PCBA testing can be included?',
    answer:
      'Inspection and testing may include AOI, X-ray, electrical checks, or functional testing depending on the board and the agreed project requirements. Share test instructions, fixtures, samples, or acceptance criteria when available.',
  },
];

export default function HomeFaq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="font-body-cc bg-cc-paper px-[5vw] py-20 text-cc-heading md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
            PCBA FAQ
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            What buyers usually need to confirm first.
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-cc-body">
            Prepare the Gerber files, BOM, pick-and-place data, assembly drawing, and
            quantity needed to review sourcing, assembly, testing, and delivery scope.
          </p>
          <Link
            href="/contact#project-files"
            className="mt-6 inline-flex text-sm font-semibold text-cc-heading underline decoration-cc-copper/50 underline-offset-4 hover:text-cc-copper-ink"
          >
            Prepare Your PCBA RFQ
          </Link>
        </div>

        <div className="divide-y divide-cc-line-light border-y border-cc-line-light">
          {FAQS.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-display text-base font-bold text-cc-heading marker:content-none md:text-lg">
                {item.question}
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 text-cc-copper-ink transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="max-w-[760px] pb-5 pr-8 text-sm leading-7 text-cc-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
