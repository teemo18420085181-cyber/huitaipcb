import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import type { SeoLandingPage as SeoLandingPageData } from '@/lib/content/seoPages';

const HERO_IMAGES: Record<string, string> = {
  'pcb-assembly-services': '/factory/real-smt-1.jpg',
  'china-pcb-assembly': '/factory/svc-finished-delivery.jpg',
  'pcb-assembly-company': '/factory/svc-engineering-review.jpg',
  'prototype-pcb-assembly': '/factory/real-smt-2.jpg',
  'turnkey-pcb-assembly': '/factory/svc-smt-assembly.jpg',
  'pcb-fabrication-and-assembly': '/factory/svc-pcb-fabrication.jpg',
  'low-volume-pcba-assembly': '/factory/real-reels.jpg',
  'bom-sourcing-pcb-assembly': '/factory/bom-risk-sourcing.jpg',
  'pcba-testing-quality-control': '/factory/svc-inspection-testing.jpg',
};
const DEFAULT_HERO = '/factory/svc-smt-assembly.jpg';

const HERO_IMAGE_ALTS: Record<string, string> = {
  'bom-sourcing-pcb-assembly': 'BOM sourcing risk review with component reels, BOM list, and electronic parts',
};

const HERO_REVIEW_POINTS = [
  'Gerber + BOM review',
  'BOM shortage check',
  'SMT/DIP scope discussion',
  'Testing requirements',
];

const RFQ_CHECKLIST = [
  'Gerber / drill files',
  'BOM with manufacturer part numbers',
  'Quantity target and schedule',
  'Testing or inspection notes',
];

function buildServiceSchema(page: SeoLandingPageData) {
  const url = `https://huitaipcb.com/${page.slug}`;
  const schemaImage = page.slug === 'bom-sourcing-pcb-assembly' ? HERO_IMAGES[page.slug] : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.serviceName,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url,
    ...(schemaImage ? { image: `https://huitaipcb.com${schemaImage}` } : {}),
    provider: {
      '@type': 'Organization',
      name: 'Huitai Electronics',
      legalName: 'Shenzhen Huitai Electronics Technology Co., Ltd.',
      url: 'https://huitaipcb.com',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Global overseas B2B customers',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Overseas engineers, hardware teams, startups, industrial product companies, and purchasing managers',
    },
  };
}

function buildFaqSchema(page: SeoLandingPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  const ctaHeading = page.ctaHeading || 'Send Your Files for Engineering Review';
  const ctaBody = page.ctaBody || 'Send your Gerber files, BOM list, quantity, and testing requirements. Huitai will review the available information before quotation.';
  const primaryCtaLabel = page.primaryCtaLabel || 'Upload Gerber & BOM for Engineering Review';
  const heroImage = HERO_IMAGES[page.slug] || DEFAULT_HERO;
  const heroImageAlt = HERO_IMAGE_ALTS[page.slug] || page.serviceName;

  return (
    <>
      <Nav />
      <main className="font-body-cc min-h-screen pt-16 text-cc-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(page)) }}
        />
        {page.faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(page)) }}
          />
        )}

        <section className="cc-carbon-bg relative overflow-hidden border-b border-cc-line px-[5vw] py-16 md:py-24">
          <div className="relative z-10 mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1fr_minmax(0,400px)]">
            <div>
              <div className="font-mono-cc mb-6 inline-flex items-center gap-2 rounded-full border border-cc-line bg-cc-carbon-2/60 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.16em] text-cc-copper-soft">
                <span className="cc-via h-1.5 w-1.5 rounded-full bg-cc-copper-bright" />
                {page.eyebrow}
              </div>
              <h1 className="font-display mb-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[50px]">
                {page.title}
              </h1>
              <p className="max-w-[640px] text-base leading-relaxed text-cc-ink-mute md:text-lg">
                {page.intro}
              </p>
              <div className="mt-8 grid max-w-[560px] gap-3 sm:flex sm:flex-wrap">
                <TrackedLink
                  href="/contact#project-files"
                  eventName="upload_gerber_bom_click"
                  additionalEventName="quote_cta_click"
                  eventParams={{ location: 'service_hero', page_slug: page.slug, destination: '/contact#project-files' }}
                  className="cc-copper-fill rounded-lg px-6 py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{ boxShadow: '0 8px 30px rgba(201,139,58,0.3)' }}
                >
                  {primaryCtaLabel}
                </TrackedLink>
                <TrackedLink
                  href="/pcba-quote-file-checklist"
                  eventName="quote_file_checklist_click"
                  eventParams={{ location: 'service_hero', page_slug: page.slug, destination: '/pcba-quote-file-checklist' }}
                  className="rounded-lg border border-cc-copper/30 bg-cc-carbon-2/40 px-6 py-3 text-center text-sm font-semibold text-cc-ink transition-all hover:border-cc-copper/60"
                >
                  See RFQ File Checklist
                </TrackedLink>
              </div>
              <div className="mt-7 grid max-w-[640px] gap-2 sm:grid-cols-2">
                {HERO_REVIEW_POINTS.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg border border-cc-line bg-cc-carbon-2/60 px-3 py-2 text-xs text-cc-ink-mute">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-signal" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-cc-line lg:block">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 400px, 1px"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cc-carbon/55 via-transparent to-transparent" />
              <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-cc-copper/70" />
              <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-cc-copper/70" />
              <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-cc-copper/70" />
              <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-cc-copper/70" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-cc-line bg-cc-carbon/82 p-4 backdrop-blur-md">
                <div className="font-mono-cc mb-1 text-[10px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  BUYER FILE REVIEW
                </div>
                <div className="text-sm font-semibold text-cc-ink">Reply within 24 hours by email</div>
                <p className="mt-1 text-xs leading-5 text-cc-ink-mute">
                  Scope, missing files, sourcing risks, and testing questions are clarified before quote.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <section className="rounded-2xl border border-cc-copper/20 bg-cc-copper/[0.05] p-7">
                <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  QUICK ANSWER
                </div>
                <p className="text-sm leading-7 text-cc-ink">{page.quickAnswer}</p>
              </section>

              {page.sections.map((section) => (
                <section key={section.heading} className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
                  <h2 className="font-display mb-3 text-2xl font-bold text-cc-ink">{section.heading}</h2>
                  <p className="text-sm leading-7 text-cc-ink-mute">{section.body}</p>
                </section>
              ))}

              <section className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
                <h2 className="font-display mb-5 text-2xl font-bold text-cc-ink">What We Can Coordinate</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {page.bullets.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-cc-ink-mute">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-copper" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {page.workflow && (
                <section className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
                  <h2 className="font-display mb-5 text-2xl font-bold text-cc-ink">Workflow</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {page.workflow.map((step, index) => (
                      <div key={step} className="rounded-xl border border-cc-line bg-cc-carbon-3 p-4">
                        <div className="font-mono-cc mb-2 text-[11px] font-semibold tracking-[0.14em] text-cc-copper">
                          STEP {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-sm leading-6 text-cc-ink-mute">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {page.filesNeeded && (
                <section className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
                  <h2 className="font-display mb-5 text-2xl font-bold text-cc-ink">Files Needed</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {page.filesNeeded.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm leading-6 text-cc-ink-mute">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-signal" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
                <h2 className="font-display mb-5 text-2xl font-bold text-cc-ink">FAQ</h2>
                <div className="space-y-4">
                  {page.faq.map((item) => (
                    <div key={item.question} className="border-b border-cc-line pb-4 last:border-b-0 last:pb-0">
                      <h3 className="mb-2 text-base font-semibold text-cc-ink">{item.question}</h3>
                      <p className="text-sm leading-7 text-cc-ink-mute">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="relative overflow-hidden rounded-2xl border border-cc-copper/25 bg-cc-carbon-2 p-7">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-20"
                  style={{ background: '#c98b3a', filter: 'blur(90px)' }}
                />
                <h2 className="font-display relative mb-3 text-2xl font-bold text-cc-ink">{ctaHeading}</h2>
                <p className="relative mb-5 max-w-[720px] text-sm leading-7 text-cc-ink-mute">{ctaBody}</p>
                <TrackedLink
                  href="/contact#project-files"
                  eventName="upload_gerber_bom_click"
                  additionalEventName="quote_cta_click"
                  eventParams={{ location: 'service_bottom_cta', page_slug: page.slug, destination: '/contact#project-files' }}
                  className="cc-copper-fill relative inline-flex rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  {primaryCtaLabel}
                </TrackedLink>
              </section>
            </div>

            <aside className="h-fit overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon-2 lg:sticky lg:top-24">
              <div className="border-b border-cc-line bg-cc-copper/[0.07] px-6 py-4">
                <div className="font-mono-cc text-[10px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  EMAIL RESPONSE WITHIN 24H
                </div>
                <p className="mt-1 text-xs leading-5 text-cc-ink-mute">
                  Send what you have. We will reply with the next questions or review path.
                </p>
              </div>
              <div className="p-6">
              <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                SEND RFQ
              </div>
              <h2 className="font-display mb-3 text-xl font-bold text-cc-ink">
                Start with your available files.
              </h2>
              <p className="mb-5 text-sm leading-6 text-cc-ink-mute">
                Send Gerber files, BOM lists, PCB drawings, sample photos, schematic if available, assembly requirements, and testing requirements.
              </p>
              <div className="mb-5 space-y-2 rounded-xl border border-cc-line bg-cc-carbon/45 p-4">
                {RFQ_CHECKLIST.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs leading-5 text-cc-ink-mute">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-signal" />
                    {item}
                  </div>
                ))}
              </div>
              <TrackedLink
                href="/contact#project-files"
                eventName="upload_gerber_bom_click"
                additionalEventName="quote_cta_click"
                eventParams={{ location: 'service_sidebar', page_slug: page.slug, destination: '/contact#project-files' }}
                className="cc-copper-fill inline-flex w-full justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                {primaryCtaLabel}
              </TrackedLink>
              <div className="mt-5 border-t border-cc-line pt-5 text-xs leading-6 text-cc-ink-mute">
                <div className="font-mono-cc mb-2 font-semibold tracking-wide text-cc-copper-soft">Related pages</div>
                <div className="space-y-1.5">
                  {page.relatedLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-cc-ink-mute underline decoration-cc-copper/40 underline-offset-4 transition-colors hover:text-cc-copper-soft">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
