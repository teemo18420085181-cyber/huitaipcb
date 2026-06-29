import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import TrackedAnchor from '@/components/TrackedAnchor';
import { dictionaries } from '@/lib/i18n/dictionary';
import { absoluteUrl, getLanguageAlternates } from '@/lib/i18n/routes';
import { OG_IMAGES } from '@/lib/seo/og';

const contact = dictionaries.de.contact;

export const metadata = {
  title: contact.metadata.title,
  description: contact.metadata.description,
  alternates: {
    canonical: absoluteUrl('/de/contact'),
    languages: getLanguageAlternates('/contact'),
  },
  openGraph: {
    title: contact.metadata.title,
    description: contact.metadata.description,
    url: absoluteUrl('/de/contact'),
    locale: 'de_DE',
    siteName: 'Huitai Electronics',
    images: OG_IMAGES,
  },
};

export default function GermanContactPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cc-carbon pt-16">
        <section className="px-[5vw] py-12 md:py-16">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid items-start gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
              <div className="lg:sticky lg:top-28">
                <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  <span className="h-0.5 w-[18px] rounded-sm bg-cc-copper" />
                  {contact.eyebrow}
                </div>
                <h1 className="font-display mb-4 text-4xl font-bold leading-tight tracking-tight text-cc-ink md:text-5xl">
                  {contact.title}
                </h1>
                <p className="mb-6 max-w-[520px] text-[15px] leading-relaxed text-cc-ink-mute">
                  {contact.intro}
                </p>
                <div className="hidden gap-3 lg:grid">
                  {contact.steps.map((text, index) => (
                    <div key={text} className="flex items-center gap-3 rounded-xl border border-cc-line bg-cc-carbon-2/60 p-3.5">
                      <span className="cc-copper-fill font-mono-cc flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-snug text-cc-ink">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <InquiryForm locale="de" />
            </div>

            <div className="mt-10 grid gap-6 rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 sm:grid-cols-2 md:p-7">
              <div>
                <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  {contact.usefulFilesTitle}
                </div>
                <ul className="space-y-1.5 text-sm leading-6 text-cc-ink-mute">
                  {contact.usefulFiles.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  {contact.nextTitle}
                </div>
                <ul className="space-y-1.5 text-sm leading-6 text-cc-ink-mute">
                  {contact.nextItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-5 rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 sm:grid-cols-[1fr_auto] sm:items-center md:p-8">
              <div>
                <div className="font-mono-cc mb-2 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  {contact.chatEyebrow}
                </div>
                <h2 className="font-display mb-2 text-xl font-bold text-cc-ink">{contact.chatTitle}</h2>
                <p className="mb-4 max-w-[420px] text-sm leading-relaxed text-cc-ink-mute">
                  {contact.chatBody}
                </p>
                <TrackedAnchor
                  href="https://wa.me/8618420085181?text=Hi%20Huitai%20Electronics%2C%20I%27d%20like%20a%20PCB%20assembly%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventParams={{ location: 'de_contact_page', contact_method: 'whatsapp' }}
                  className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: '#25D366' }}
                >
                  {contact.chatButton}
                </TrackedAnchor>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-xl bg-white p-2.5">
                  <Image
                    src="/factory/wechat-qr.png"
                    alt="WeChat QR code - scan to add Huitai Electronics"
                    width={150}
                    height={150}
                    className="h-[150px] w-[150px]"
                  />
                </div>
                <div className="font-mono-cc text-[10px] font-semibold tracking-[0.16em] text-cc-ink-mute">
                  {contact.wechatLabel}
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon-2">
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
                <div>
                  <div className="font-mono-cc mb-2 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                    {contact.findEyebrow}
                  </div>
                  <h2 className="font-display text-xl font-bold text-cc-ink">{contact.findTitle}</h2>
                  <p className="mt-1 max-w-[440px] text-sm leading-relaxed text-cc-ink-mute">
                    {contact.findBody}
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=22.752083,113.798848"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-cc-copper/30 bg-cc-carbon-3/40 px-4 py-2.5 text-sm font-semibold text-cc-copper-soft transition-colors hover:border-cc-copper/60"
                >
                  {contact.mapsLabel}
                </a>
              </div>
              <iframe
                title="Huitai Electronics location in Shajing, Bao'an, Shenzhen, China"
                src="https://maps.google.com/maps?q=22.752083,113.798848&hl=de&z=17&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[340px] w-full border-0"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
