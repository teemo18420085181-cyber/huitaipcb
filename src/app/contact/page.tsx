export const metadata = {
  title: 'Request a PCB Assembly Quote | Upload Gerber & BOM',
  description: 'Request a PCB assembly quote from Huitai Electronics. Upload Gerber files, BOM lists, drawings, sample photos, and testing requirements for engineering review.',
  alternates: { canonical: 'https://huitaipcb.com/contact' },
  openGraph: {
    title: 'Request a PCB Assembly Quote | Upload Gerber & BOM',
    description: 'Request a PCB assembly quote from Huitai Electronics. Upload Gerber files, BOM lists, drawings, sample photos, and testing requirements for engineering review.',
    url: 'https://huitaipcb.com/contact',
    images: OG_IMAGES,
  },
};

import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import TrackedAnchor from '@/components/TrackedAnchor';
import { OG_IMAGES } from '@/lib/seo/og';

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-[100px] min-h-screen bg-cc-carbon">
        <section className="px-[5vw] py-12">
          <div className="max-w-[920px] mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[11px] text-cc-ink font-semibold tracking-[0.16em] mb-3.5">
                <span className="w-[18px] h-0.5 bg-cc-copper rounded-sm" />
                GET A QUOTE
              </div>
              <h1 className="text-3xl md:text-[40px] font-semibold text-cc-ink tracking-tight leading-tight mb-3">
                Get a PCB Assembly Quote
              </h1>
              <p className="text-[15px] text-cc-ink-mute leading-relaxed max-w-[640px] mx-auto">
                Send your Gerber, BOM, CPL (pick-and-place), assembly drawing, or sample board photos for engineering review. Our engineering team reviews your files before quotation — no automated black-box pricing.
              </p>
              <p className="text-[13px] text-cc-ink-mute leading-relaxed max-w-[620px] mx-auto mt-3">
                Not sure if your files are complete? Send what you have. Our team can review the available information and let you know what is missing.
              </p>
            </div>

            <div className="mb-8 grid gap-6 rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 sm:grid-cols-2 md:p-7">
              <div>
                <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  WHAT TO SEND
                </div>
                <ul className="space-y-1.5 text-sm leading-6 text-cc-ink-mute">
                  {[
                    'Gerber files',
                    'BOM (with manufacturer part numbers)',
                    'Pick-and-place file',
                    'Assembly drawing',
                    'Quantity',
                    'Target delivery time',
                    'Testing requirements',
                    'Sample photos, if files are incomplete',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  GOOD TO KNOW
                </div>
                <ul className="space-y-1.5 text-sm leading-6 text-cc-ink-mute">
                  {[
                    'Engineering review before quotation — no black-box pricing',
                    'PCB fabrication, BOM sourcing, SMT assembly, testing and delivery',
                    'Prototype and low-volume PCBA accepted',
                    'Incomplete files? Send a partial BOM or sample photos first',
                    'Testing planned based on your instructions',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cc-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <InquiryForm />

            <div className="mt-8 grid gap-5 rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 sm:grid-cols-[1fr_auto] sm:items-center md:p-8">
              <div>
                <div className="font-mono-cc mb-2 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                  PREFER TO CHAT?
                </div>
                <h2 className="font-display mb-2 text-xl font-bold text-cc-ink">Message us directly</h2>
                <p className="mb-4 max-w-[420px] text-sm leading-relaxed text-cc-ink-mute">
                  For a quick question or to start a conversation, reach us on WhatsApp — or scan the
                  WeChat code to add us.
                </p>
                <TrackedAnchor
                  href="https://wa.me/8618420085181?text=Hi%20Huitai%20Electronics%2C%20I%27d%20like%20a%20PCB%20assembly%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventParams={{ location: 'contact_page', contact_method: 'whatsapp' }}
                  className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: '#25D366' }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </TrackedAnchor>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-xl bg-white p-2.5">
                  <Image
                    src="/factory/wechat-qr.png"
                    alt="WeChat QR code — scan to add Huitai Electronics"
                    width={150}
                    height={150}
                    className="h-[150px] w-[150px]"
                  />
                </div>
                <div className="font-mono-cc text-[10px] font-semibold tracking-[0.16em] text-cc-ink-mute">
                  SCAN TO ADD ON WECHAT
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon-2">
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
                <div>
                  <div className="font-mono-cc mb-2 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                    FIND US
                  </div>
                  <h2 className="font-display text-xl font-bold text-cc-ink">Shenzhen, China</h2>
                  <p className="mt-1 max-w-[440px] text-sm leading-relaxed text-cc-ink-mute">
                    Building D, 4F, Zhaochang Industrial Park, Gonghe Industrial Road, Shajing,
                    Bao&apos;an District, Shenzhen, China
                  </p>
                </div>
                <a
                  href={'https://www.google.com/maps/search/?api=1&query=22.752083,113.798848'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-cc-copper/30 bg-cc-carbon-3/40 px-4 py-2.5 text-sm font-semibold text-cc-copper-soft transition-colors hover:border-cc-copper/60"
                >
                  Open in Google Maps
                </a>
              </div>
              <iframe
                title="Huitai Electronics location in Shajing, Bao'an, Shenzhen, China"
                src={'https://maps.google.com/maps?q=22.752083,113.798848&hl=en&z=17&output=embed'}
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
