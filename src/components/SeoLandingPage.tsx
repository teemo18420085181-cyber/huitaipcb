import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import type { SeoLandingPage as SeoLandingPageData } from '@/lib/content/seoPages';

function buildServiceSchema(page: SeoLandingPageData) {
  const url = `https://huitaipcb.com/${page.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.serviceName,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url,
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
          <div className="relative z-10 mx-auto max-w-[1080px]">
            <div className="font-mono-cc mb-6 inline-flex items-center gap-2 rounded-full border border-cc-line bg-cc-carbon-2/60 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.16em] text-cc-copper-soft">
              <span className="cc-via h-1.5 w-1.5 rounded-full bg-cc-copper-bright" />
              {page.eyebrow}
            </div>
            <h1 className="font-display mb-5 max-w-[820px] text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[52px]">
              {page.title}
            </h1>
            <p className="max-w-[760px] text-base leading-relaxed text-cc-ink-mute md:text-lg">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href="/contact"
                eventName="quote_click"
                eventParams={{ location: 'service_hero', page_slug: page.slug, destination: '/contact' }}
                className="cc-copper-fill rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{ boxShadow: '0 8px 30px rgba(201,139,58,0.3)' }}
              >
                Get PCB Assembly Quote
              </TrackedLink>
              <TrackedLink
                href="/contact"
                eventName="upload_gerber_bom_click"
                eventParams={{ location: 'service_hero', page_slug: page.slug, destination: '/contact' }}
                className="rounded-lg border border-cc-copper/30 bg-cc-carbon-2/40 px-6 py-3 text-sm font-semibold text-cc-ink transition-all hover:border-cc-copper/60"
              >
                Upload Gerber &amp; BOM
              </TrackedLink>
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
                  href="/contact"
                  eventName="upload_gerber_bom_click"
                  eventParams={{ location: 'service_bottom_cta', page_slug: page.slug, destination: '/contact' }}
                  className="cc-copper-fill relative inline-flex rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  Upload Gerber &amp; BOM
                </TrackedLink>
              </section>
            </div>

            <aside className="h-fit rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 lg:sticky lg:top-24">
              <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                SEND RFQ
              </div>
              <h2 className="font-display mb-3 text-xl font-bold text-cc-ink">
                Start with your available files.
              </h2>
              <p className="mb-5 text-sm leading-6 text-cc-ink-mute">
                Send Gerber files, BOM lists, PCB drawings, sample photos, schematic if available, assembly requirements, and testing requirements.
              </p>
              <TrackedLink
                href="/contact"
                eventName="quote_click"
                eventParams={{ location: 'service_sidebar', page_slug: page.slug, destination: '/contact' }}
                className="cc-copper-fill inline-flex w-full justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                Request a PCBA Quote
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
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
