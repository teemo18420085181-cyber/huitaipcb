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
      <main className="min-h-screen bg-bg pt-[64px]">
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

        <section className="relative overflow-hidden bg-brand-primary px-[5vw] py-16 text-white md:py-24">
          <div className="relative z-10 mx-auto max-w-[1080px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-brand-yellow">
              {page.eyebrow}
            </div>
            <h1 className="mb-5 max-w-[800px] text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[52px]">
              {page.title}
            </h1>
            <p className="max-w-[760px] text-base leading-relaxed text-white/70 md:text-lg">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href="/contact"
                eventName="quote_click"
                eventParams={{ location: 'service_hero', page_slug: page.slug, destination: '/contact' }}
                className="rounded-lg bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-primary transition-all hover:-translate-y-0.5"
              >
                Get PCB Assembly Quote
              </TrackedLink>
              <TrackedLink
                href="/contact"
                eventName="upload_gerber_bom_click"
                eventParams={{ location: 'service_hero', page_slug: page.slug, destination: '/contact' }}
                className="rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50"
              >
                Upload Gerber &amp; BOM
              </TrackedLink>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <section className="rounded-2xl border border-brand-primary/10 bg-white p-7 shadow-sm">
                <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-brand-primary">
                  QUICK ANSWER
                </div>
                <p className="text-sm leading-7 text-ink-muted">{page.quickAnswer}</p>
              </section>

              {page.sections.map((section) => (
                <section key={section.heading} className="rounded-2xl border border-line bg-white p-7">
                  <h2 className="mb-3 text-2xl font-semibold text-brand-primary">{section.heading}</h2>
                  <p className="text-sm leading-7 text-ink-muted">{section.body}</p>
                </section>
              ))}

              <section className="rounded-2xl border border-line bg-white p-7">
                <h2 className="mb-5 text-2xl font-semibold text-brand-primary">What We Can Coordinate</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {page.bullets.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-ink-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {page.workflow && (
                <section className="rounded-2xl border border-line bg-white p-7">
                  <h2 className="mb-5 text-2xl font-semibold text-brand-primary">Workflow</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {page.workflow.map((step, index) => (
                      <div key={step} className="rounded-xl border border-line bg-bg-muted p-4">
                        <div className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-brand-primary">
                          STEP {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-sm leading-6 text-ink-muted">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {page.filesNeeded && (
                <section className="rounded-2xl border border-line bg-white p-7">
                  <h2 className="mb-5 text-2xl font-semibold text-brand-primary">Files Needed</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {page.filesNeeded.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm leading-6 text-ink-muted">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-2xl border border-line bg-white p-7">
                <h2 className="mb-5 text-2xl font-semibold text-brand-primary">FAQ</h2>
                <div className="space-y-4">
                  {page.faq.map((item) => (
                    <div key={item.question} className="border-b border-line pb-4 last:border-b-0 last:pb-0">
                      <h3 className="mb-2 text-base font-semibold text-brand-primary">{item.question}</h3>
                      <p className="text-sm leading-7 text-ink-muted">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-brand-primary/10 bg-brand-primary p-7 text-white">
                <h2 className="mb-3 text-2xl font-semibold">{ctaHeading}</h2>
                <p className="mb-5 max-w-[720px] text-sm leading-7 text-white/70">{ctaBody}</p>
                <TrackedLink
                  href="/contact"
                  eventName="upload_gerber_bom_click"
                  eventParams={{ location: 'service_bottom_cta', page_slug: page.slug, destination: '/contact' }}
                  className="inline-flex rounded-lg bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-primary transition-all hover:-translate-y-0.5"
                >
                  Upload Gerber &amp; BOM
                </TrackedLink>
              </section>
            </div>

            <aside className="h-fit rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-24">
              <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-brand-primary">
                SEND RFQ
              </div>
              <h2 className="mb-3 text-xl font-semibold text-brand-primary">
                Start with your available files.
              </h2>
              <p className="mb-5 text-sm leading-6 text-ink-muted">
                Send Gerber files, BOM lists, PCB drawings, sample photos, schematic if available, assembly requirements, and testing requirements.
              </p>
              <TrackedLink
                href="/contact"
                eventName="quote_click"
                eventParams={{ location: 'service_sidebar', page_slug: page.slug, destination: '/contact' }}
                className="inline-flex w-full justify-center rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-light"
              >
                Request a PCBA Quote
              </TrackedLink>
              <div className="mt-5 border-t border-line pt-5 text-xs leading-6 text-ink-muted">
                <div className="mb-2 font-semibold text-brand-primary">Related pages</div>
                <div className="space-y-1.5">
                  {page.relatedLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-brand-primary underline underline-offset-4">
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
