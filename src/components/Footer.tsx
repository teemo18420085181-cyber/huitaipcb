import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import TrackedAnchor from '@/components/TrackedAnchor';

const SERVICES_LINKS = [
  { label: 'Turnkey PCBA Manufacturing', href: '/turnkey-pcb-assembly' },
  { label: 'PCB Fabrication and Assembly', href: '/pcb-fabrication-and-assembly' },
  { label: 'Low-Volume PCBA Assembly', href: '/low-volume-pcba-assembly' },
  { label: 'BOM Sourcing and Assembly', href: '/bom-sourcing-pcb-assembly' },
  { label: 'PCBA Testing and Quality Control', href: '/pcba-testing-quality-control' },
];

const RESOURCE_LINKS = [
  { label: 'Knowledge Base', href: '/knowledge' },
  { label: 'How to Quote', href: '/contact' },
  { label: 'Quality Standards', href: '/quality' },
  { label: 'FAQ', href: '/knowledge' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="font-body-cc relative border-t border-cc-line bg-cc-carbon-2 px-[5vw] py-12 pb-8 text-cc-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cc-copper/30 to-transparent" />
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-8 border-b border-cc-line pb-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="cc-copper-fill flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold">
                HT
              </div>
              <div>
                <strong className="block text-sm font-semibold tracking-wide text-cc-ink">ONESTOPPCBA</strong>
                <span className="font-mono-cc text-[9px] font-medium tracking-[0.16em] text-cc-ink-mute">
                  HUITAI ELECTRONICS
                </span>
              </div>
            </div>
            <p className="text-xs leading-loose text-cc-ink-mute">
              Shenzhen Huitai Electronics Technology Co., Ltd.
            </p>
            <p className="text-xs leading-loose text-cc-ink-mute">
              Building D, 4F, Zhaochang Industrial Park,<br />
              Gonghe Industrial Road, Shajing,<br />
              Bao&apos;an District, Shenzhen, China
            </p>
          </div>

          <div>
            <h5 className="font-mono-cc mb-3.5 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
              SERVICES
            </h5>
            {SERVICES_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-xs leading-loose text-cc-ink-mute transition-colors hover:text-cc-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h5 className="font-mono-cc mb-3.5 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
              RESOURCES
            </h5>
            {RESOURCE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-xs leading-loose text-cc-ink-mute transition-colors hover:text-cc-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h5 className="font-mono-cc mb-3.5 text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
              CONTACT
            </h5>
            <TrackedAnchor
              href="mailto:teemo18420085181@gmail.com"
              eventName="email_click"
              eventParams={{ location: 'footer', contact_method: 'email' }}
              className="block text-xs leading-loose text-cc-ink-mute transition-colors hover:text-cc-ink"
            >
              teemo18420085181@gmail.com
            </TrackedAnchor>
            <span className="block text-xs leading-loose text-cc-ink-mute">Mon-Sat, 09:00-18:00 CST</span>
            <TrackedLink
              href="/contact"
              eventName="quote_click"
              eventParams={{ location: 'footer', destination: '/contact' }}
              className="mt-1 block text-xs leading-loose text-cc-copper-soft transition-colors hover:text-cc-copper-bright"
            >
              Get a PCB Assembly Quote
            </TrackedLink>
          </div>
        </div>

        <div className="font-mono-cc flex flex-wrap items-center justify-between gap-2 pt-6 text-[11px] text-cc-ink-mute">
          <span>© 2026 Huitai Electronics Technology Co., Ltd.</span>
          <span className="flex gap-3">
            <Link href="/privacy" className="transition-colors hover:text-cc-ink">Privacy</Link>
            <span className="text-cc-copper/40">/</span>
            <Link href="/terms" className="transition-colors hover:text-cc-ink">Terms</Link>
            <span className="text-cc-copper/40">/</span>
            <span>NDA Available</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
