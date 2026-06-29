import Link from 'next/link';
import { MessageCircle, Upload } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedAnchor from '@/components/TrackedAnchor';
import TrackedLink from '@/components/TrackedLink';
import { dictionaries } from '@/lib/i18n/dictionary';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';
import { OG_IMAGES } from '@/lib/seo/og';

const home = dictionaries.de.home;

export const metadata = {
  title: home.metadata.title,
  description: home.metadata.description,
  alternates: {
    canonical: absoluteUrl('/de'),
    languages: getLanguageAlternates('/'),
  },
  openGraph: {
    title: home.metadata.title,
    description: home.metadata.description,
    url: absoluteUrl('/de'),
    locale: 'de_DE',
    siteName: 'Huitai Electronics',
    images: OG_IMAGES,
  },
};

export default function GermanHomePage() {
  return (
    <>
      <Nav />
      <main className="font-body-cc min-h-screen bg-cc-carbon pt-16 text-cc-ink">
        <section className="cc-carbon-bg border-b border-cc-line px-[5vw] py-16 md:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="font-mono-cc mb-6 inline-flex items-center gap-2 rounded-full border border-cc-line bg-cc-carbon-2/60 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.16em] text-cc-copper-soft">
                <span className="cc-via h-1.5 w-1.5 rounded-full bg-cc-copper-bright" />
                {home.eyebrow}
              </div>
              <h1 className="font-display mb-6 text-[40px] font-extrabold leading-[1.02] tracking-[-0.02em] md:text-6xl">
                {home.title}
              </h1>
              <p className="mb-8 max-w-[640px] text-[15px] leading-relaxed text-cc-ink-mute md:text-lg">
                {home.intro}
              </p>
              <div className="grid max-w-[560px] gap-3 sm:flex sm:flex-wrap">
                <TrackedLink
                  href="/de/contact#project-files"
                  eventName="upload_gerber_bom_click"
                  additionalEventName="quote_cta_click"
                  eventParams={{ location: 'de_home_hero', destination: '/de/contact#project-files' }}
                  className="cc-copper-fill inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  <Upload size={16} strokeWidth={2.5} />
                  {home.primaryCta}
                </TrackedLink>
                <TrackedAnchor
                  href="https://wa.me/8618420085181?text=Hi%20Huitai%20Electronics%2C%20I%27d%20like%20to%20discuss%20a%20PCBA%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventParams={{ location: 'de_home_hero', contact_method: 'whatsapp' }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-cc-copper/30 bg-cc-carbon-2/40 px-6 py-3.5 text-sm font-semibold text-cc-ink transition-all hover:border-cc-copper/60"
                >
                  <MessageCircle size={15} strokeWidth={2.5} className="text-cc-copper-soft" />
                  {home.secondaryCta}
                </TrackedAnchor>
              </div>
            </div>

            <div className="rounded-2xl border border-cc-line bg-cc-carbon-2/75 p-6 shadow-2xl shadow-black/20">
              <div className="font-mono-cc mb-4 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                {home.whatWeDo.eyebrow}
              </div>
              <h2 className="font-display mb-5 text-2xl font-bold leading-tight text-cc-ink">
                {home.whatWeDo.title}
              </h2>
              <div className="grid gap-3">
                {home.whatWeDo.items.map((item) => (
                  <div key={item.title} className="rounded-xl border border-cc-line bg-cc-carbon/45 p-4">
                    <h3 className="mb-1 text-sm font-semibold text-cc-ink">{item.title}</h3>
                    <p className="text-xs leading-5 text-cc-ink-mute">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-cc-line bg-cc-carbon-2 px-[5vw] py-6">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-3">
            <span className="font-mono-cc text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
              {home.keyPagesLabel}
            </span>
            {home.keyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-cc-line px-3.5 py-2 text-xs font-medium text-cc-ink-mute transition-colors hover:border-cc-copper/60 hover:text-cc-copper-soft"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="px-[5vw] py-16">
          <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-3">
            <section className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7 lg:col-span-2">
              <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                {home.process.eyebrow}
              </div>
              <h2 className="font-display mb-6 text-3xl font-bold leading-tight text-cc-ink">
                {home.process.title}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {home.process.steps.map((step, index) => (
                  <div key={step} className="rounded-xl border border-cc-line bg-cc-carbon-3 p-4">
                    <div className="font-mono-cc mb-2 text-[11px] font-semibold tracking-[0.14em] text-cc-copper">
                      SCHRITT {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm leading-6 text-cc-ink-mute">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7">
              <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                {home.fit.eyebrow}
              </div>
              <h2 className="font-display mb-5 text-2xl font-bold leading-tight text-cc-ink">
                {home.fit.title}
              </h2>
              <ul className="space-y-3 text-sm leading-6 text-cc-ink-mute">
                {home.fit.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-cc-line bg-cc-carbon-2 p-7 lg:col-span-3">
              <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                {home.trust.eyebrow}
              </div>
              <h2 className="font-display mb-5 text-2xl font-bold text-cc-ink">{home.trust.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {home.trust.items.map((item) => (
                  <div key={item} className="rounded-xl border border-cc-line bg-cc-carbon-3 p-4 text-sm text-cc-ink-mute">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-cc-copper/25 bg-cc-carbon-2 p-7 lg:col-span-3">
              <h2 className="font-display mb-3 text-2xl font-bold text-cc-ink">{home.finalCta.title}</h2>
              <p className="mb-5 max-w-[760px] text-sm leading-7 text-cc-ink-mute">{home.finalCta.body}</p>
              <TrackedLink
                href="/de/contact#project-files"
                eventName="upload_gerber_bom_click"
                additionalEventName="quote_cta_click"
                eventParams={{ location: 'de_home_final_cta', destination: '/de/contact#project-files' }}
                className="cc-copper-fill inline-flex rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                {home.finalCta.label}
              </TrackedLink>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
