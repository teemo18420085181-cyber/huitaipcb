import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { SeoLandingPage as SeoLandingPageData } from '@/lib/content/seoPages';

export default function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  return (
    <>
      <Nav />
      <main className="pt-[64px] min-h-screen bg-bg">
        <section className="relative px-[5vw] py-16 md:py-24 bg-brand-primary text-white overflow-hidden">
          <div className="relative z-10 max-w-[1080px] mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
              {page.eyebrow}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5 max-w-[760px]">
              {page.title}
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[720px]">
              {page.intro}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/contact" className="bg-brand-yellow text-brand-primary text-sm font-semibold py-3 px-6 rounded-lg hover:-translate-y-0.5 transition-all">
                Get PCB Assembly Quote
              </Link>
              <Link href="/contact" className="border border-white/25 text-white text-sm font-semibold py-3 px-6 rounded-lg hover:border-white/50 transition-all">
                Upload Gerber &amp; BOM
              </Link>
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="max-w-[1080px] mx-auto grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
            <div className="space-y-5">
              {page.sections.map((section) => (
                <section key={section.heading} className="bg-white border border-line rounded-2xl p-7">
                  <h2 className="text-2xl font-semibold text-brand-primary mb-3">{section.heading}</h2>
                  <p className="text-sm text-ink-muted leading-7">{section.body}</p>
                </section>
              ))}

              <section className="bg-white border border-line rounded-2xl p-7">
                <h2 className="text-2xl font-semibold text-brand-primary mb-5">What We Can Coordinate</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {page.bullets.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white border border-line rounded-2xl p-7">
                <h2 className="text-2xl font-semibold text-brand-primary mb-5">FAQ</h2>
                <div className="space-y-4">
                  {page.faq.map((item) => (
                    <div key={item.question} className="border-b border-line pb-4 last:border-b-0 last:pb-0">
                      <h3 className="text-base font-semibold text-brand-primary mb-2">{item.question}</h3>
                      <p className="text-sm text-ink-muted leading-7">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 h-fit bg-white border border-line rounded-2xl p-6">
              <div className="text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-3">
                SEND RFQ
              </div>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">
                Start with your available files.
              </h2>
              <p className="text-sm text-ink-muted leading-6 mb-5">
                Send Gerber files, BOM lists, PCB drawings, sample photos, schematic if available, assembly requirements, and testing requirements.
              </p>
              <Link href="/contact" className="inline-flex w-full justify-center bg-brand-primary text-white text-sm font-semibold py-3 px-5 rounded-lg hover:bg-brand-primary-light transition-colors">
                Request a PCBA Quote
              </Link>
              <div className="mt-5 pt-5 border-t border-line text-xs text-ink-muted leading-6">
                Related: <Link href="/services" className="text-brand-primary underline">turnkey services</Link>,{' '}
                <Link href="/capabilities" className="text-brand-primary underline">capabilities</Link>,{' '}
                <Link href="/knowledge" className="text-brand-primary underline">knowledge base</Link>.
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
