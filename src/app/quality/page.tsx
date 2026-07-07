import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';

export const metadata = {
  title: 'PCBA Inspection and Testing Process | Huitai Electronics',
  description: 'PCBA inspection and testing support for turnkey builds: incoming component checks, SMT process review, AOI, visual inspection, functional testing when provided, and packaging check.',
  alternates: { canonical: 'https://huitaipcb.com/quality' },
  openGraph: {
    title: 'PCBA Inspection and Testing Process | Huitai Electronics',
    description: 'Incoming component checks, SMT process review, AOI, visual inspection, functional testing support, and packaging checks for turnkey PCBA projects.',
    url: 'https://huitaipcb.com/quality',
    images: OG_IMAGES,
  },
};

const pageUrl = 'https://huitaipcb.com/quality';

const qualityQuickAnswer =
  'Huitai supports PCBA inspection and testing as part of turnkey assembly projects. The process can include incoming component checks, solder paste and SMT process review, AOI inspection, visual inspection, functional testing when a test method is provided, packaging checks, and delivery preparation based on the agreed project scope.';

const answerCards = [
  {
    title: 'Who this is for',
    items: [
      'Overseas hardware teams that need inspection and testing discussed before PCBA delivery',
      'Prototype and low-volume projects where test method, acceptance criteria, or packaging must be confirmed',
      'Industrial electronics, IoT, test equipment, and custom hardware projects with practical quality requirements',
    ],
  },
  {
    title: 'What files we need',
    items: [
      'Gerber, BOM, CPL or pick-and-place data, and assembly drawings',
      'Test instructions, firmware, fixture notes, or pass/fail criteria when functional testing is required',
      'Sample photos, inspection notes, packaging requirements, and shipping expectations',
    ],
  },
  {
    title: 'What we check before delivery',
    items: [
      'Incoming component markings, package integrity, and BOM match against the agreed sourcing scope',
      'SMT process points, solder joints, polarity, orientation, AOI results, and visual inspection items',
      'Functional test steps when the customer provides a usable method, plus packaging and shipment checks',
    ],
  },
];

const qualityFaq = [
  {
    question: 'What quality checks are used before PCBA delivery?',
    answer:
      'Quality checks can include incoming component review, SMT process checks, AOI inspection, visual inspection, functional testing when a method is provided, packaging checks, and shipment preparation based on the agreed scope.',
  },
  {
    question: 'Do you perform AOI inspection?',
    answer:
      'AOI inspection can be used for suitable SMT assembly projects to check missing components, misalignment, solder bridges, polarity issues, and other visible assembly defects before release.',
  },
  {
    question: 'Can Huitai support functional testing?',
    answer:
      'Yes. Functional testing can be arranged based on customer-provided or confirmed test requirements, including the test method, firmware, fixture, power requirements, communication steps, and pass/fail criteria.',
  },
  {
    question: 'What test information should customers provide?',
    answer:
      'Useful test information includes test instructions, fixture drawings or photos, firmware, power requirements, communication protocol, expected readings, and pass/fail criteria.',
  },
  {
    question: 'How are finished PCBA boards packed before shipping?',
    answer:
      'Finished boards are packed according to the agreed project needs, with attention to ESD handling, board protection, labeling, quantity separation, and delivery preparation before shipment.',
  },
];

const relatedServiceLinks = [
  { label: 'Review turnkey PCBA scope', href: '/turnkey-pcb-assembly' },
  { label: 'Upload files and testing notes', href: '/contact#project-files' },
];

const QC = [
  {
    n: '01', tag: 'INCOMING QUALITY CONTROL',
    title: 'Incoming components checked against the agreed sourcing scope.',
    desc: 'Incoming component checks are planned against the BOM and sourcing scope. Available checks can include date codes, packaging integrity, markings, and physical dimensions. Authorized and franchised channels are prioritized, and other sourcing options require customer approval.',
    specs: ['Approved sourcing options', 'Date-code verification', 'Physical dimension check', 'Package integrity inspection', 'Anti-static handling', 'Traceability records when required'],
    image: '/factory/qua-03.png',
    alt: 'Incoming component check for PCBA assembly before SMT production',
    badge: 'IQC', badgeColor: 'bg-cc-copper text-cc-ink',
  },
  {
    n: '02', tag: 'AOI — AUTOMATED OPTICAL INSPECTION',
    title: 'Automated optical inspection after SMT assembly.',
    desc: 'AOI can be used after reflow soldering to scan for missing components, misalignment, solder bridges, polarity errors, and lifted pins. Boards with AOI issues are reviewed by a QC operator before rework or release.',
    specs: ['AOI process available', 'Missing component detection', 'Solder bridge detection', 'Polarity verification', 'Component misalignment', 'Operator review'],
    image: '/factory/flow-06.png',
    alt: 'AOI inspection for assembled PCBA boards before functional testing',
    badge: 'Automated', badgeColor: 'bg-cc-carbon-2 text-white',
  },
  {
    n: '03', tag: 'X-RAY INSPECTION',
    title: 'X-Ray inspection can be arranged when required and agreed in scope.',
    desc: 'X-Ray inspection for hidden solder joints can be arranged when required and agreed in the project scope, especially for packages where visual or AOI inspection is not enough.',
    specs: ['Arranged when required', 'Scope agreed before production', 'Hidden joint review', 'BGA / QFN / LGA / CSP packages', 'Visual/AOI limitation review', 'Customer approval by scope'],
    image: '/factory/qua-01.png',
    alt: 'X-Ray inspection review for hidden solder joints on PCBA boards',
    badge: 'X-Ray', badgeColor: 'bg-cc-signal text-white',
  },
  {
    n: '04', tag: 'FUNCTIONAL TESTING',
    title: 'Functional testing scope is confirmed before production.',
    desc: 'Functional testing is arranged based on the customer-confirmed test method, firmware, fixture, power requirements, communication steps and pass/fail criteria. AOI and visual inspection do not replace functional testing, and the final test scope should be confirmed before production.',
    specs: ['Customer-confirmed method', 'Firmware or programming steps', 'Fixture or connector access', 'Power requirements', 'Communication steps', 'Pass/fail criteria'],
    image: '/factory/qua-02.png',
    alt: 'Functional testing setup for assembled PCBA boards with customer test method',
    badge: 'Test Plan', badgeColor: 'bg-cc-copper text-cc-ink',
  },
];

const STATS = [
  { n: 'DFM', label: 'Engineering review', sub: 'Before quotation' },
  { n: 'AOI', label: 'Inspection option', sub: 'For SMT builds' },
  { n: 'X-Ray', label: 'BGA inspection', sub: 'When required' },
  { n: 'Test', label: 'Report options', sub: 'Based on project needs' },
];

function QualityJsonLd() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PCBA Inspection and Testing Process',
    serviceType: 'PCBA inspection and testing support',
    description: qualityQuickAnswer,
    url: pageUrl,
    provider: {
      '@id': 'https://huitaipcb.com/#organization',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Global overseas B2B customers',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qualityFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
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
        name: 'PCBA Inspection and Testing Process',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export default function QualityPage() {
  return (
    <>
      <Nav />
      <main className="pt-[64px] min-h-screen bg-cc-carbon">
        <QualityJsonLd />
        <section className="relative px-[5vw] py-16 md:py-24 bg-cc-carbon-2 text-white overflow-hidden">
          <div className="absolute -top-[100px] right-[10%] w-[300px] h-[300px] rounded-full opacity-30" style={{ background: '#E6A85A', filter: 'blur(100px)' }} />
          <div className="absolute -bottom-[100px] left-[10%] w-[280px] h-[280px] rounded-full opacity-20" style={{ background: '#9EE34F', filter: 'blur(100px)' }} />
          <div className="relative z-10 max-w-[1080px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-cc-copper/10 border border-cc-copper/40 text-cc-copper-soft text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cc-copper" style={{ boxShadow: '0 0 12px #E6A85A' }} />
              QUALITY CONTROL
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
              Quality steps documented.<br />
              <em className="not-italic text-cc-copper-soft">Documentation matched to your project.</em>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[680px] mx-auto">
              Quality steps can be planned from incoming components to final shipment, with inspection,
              testing, documentation, and traceability matched to the agreed project requirements.
            </p>
          </div>
        </section>

        <section className="bg-cc-carbon px-[5vw] py-14">
          <div className="mx-auto grid max-w-[1080px] gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-2xl border border-cc-copper/20 bg-cc-copper/[0.05] p-7">
              <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                QUICK ANSWER
              </div>
              <p className="text-sm leading-7 text-white/82">{qualityQuickAnswer}</p>
            </div>
            <div className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
              <h2 className="font-display mb-3 text-2xl font-bold text-white">Related service paths</h2>
              <div className="space-y-3">
                {relatedServiceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl border border-cc-line bg-cc-carbon-3 px-4 py-3 text-sm font-semibold text-white/72 underline decoration-cc-copper/40 underline-offset-4 transition-colors hover:text-cc-copper-soft"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-5 grid max-w-[1080px] gap-4 md:grid-cols-3">
            {answerCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-6">
                <h2 className="font-display mb-4 text-xl font-bold text-white">{card.title}</h2>
                <div className="space-y-3">
                  {card.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-white/68">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-copper" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-cc-carbon px-[5vw] py-8">
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-start pl-[18px] border-l-2 border-cc-copper">
                <div className="text-2xl font-semibold text-white leading-none">{s.n}</div>
                <div className="text-xs text-white/70 mt-1 font-medium">{s.label}</div>
                <div className="text-[10px] text-white/40 mt-0.5 tracking-wide">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto space-y-5">
            {QC.map((q, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={q.n} className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-cc-line bg-cc-carbon-2 hover:shadow-lg transition-all duration-300 ${isEven ? '' : 'md:[&>*:first-child]:order-last'}`}>
                  <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                    <Image src={q.image} alt={q.alt} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-cc-carbon-2/20 group-hover:bg-cc-carbon-2/10 transition-colors duration-300" />
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-cc-copper/100 backdrop-blur border border-white/20 flex items-center justify-center text-white text-[13px] font-bold">{q.n}</div>
                      <div className={`text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full inline-block ${q.badgeColor}`}>{q.badge}</div>
                    </div>
                    <div className="absolute bottom-5 left-5 text-[9px] text-white/60 tracking-[0.2em] font-medium">{q.tag}</div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="text-[10px] text-cc-ink/50 font-semibold tracking-[0.18em] mb-3">QC STAGE {q.n}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-cc-ink leading-tight mb-4">{q.title}</h2>
                    <p className="text-sm text-cc-ink-mute leading-relaxed mb-5">{q.desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.specs.map((s, si) => (
                        <div key={si} className="flex items-center gap-2 text-xs text-cc-ink-mute">
                          <span className="w-1.5 h-1.5 rounded-full bg-cc-signal flex-shrink-0" />{s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="mx-auto max-w-[1080px] rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
            <h2 className="font-display mb-5 text-2xl font-bold text-white">PCBA inspection and testing FAQ</h2>
            <div className="space-y-4">
              {qualityFaq.map((item) => (
                <div key={item.question} className="border-b border-cc-line pb-4 last:border-b-0 last:pb-0">
                  <h3 className="mb-2 text-base font-semibold text-white">{item.question}</h3>
                  <p className="text-sm leading-7 text-white/68">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="max-w-[820px] mx-auto bg-cc-carbon-2 rounded-2xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[80px] -right-[80px] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: '#9EE34F', filter: 'blur(60px)' }} />
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Want to discuss your quality requirements?</h2>
            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-[500px] mx-auto">Tell us your inspection notes, test method, firmware, fixture needs, and any custom acceptance criteria. We&apos;ll confirm what&apos;s covered in the agreed process and what needs a custom setup.</p>
            <TrackedLink href="/contact" eventName="quote_click" eventParams={{ location: 'quality_bottom_cta', destination: '/contact', button_text: 'Send us your requirements' }} className="inline-flex items-center gap-2 bg-cc-copper text-cc-ink text-sm font-semibold py-3 px-7 rounded-xl hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}>
              Send us your requirements →
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
