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
    <footer className="bg-brand-primary-dark px-[5vw] py-12 pb-8 text-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-8 border-b border-white/[0.08] pb-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow text-xs font-bold text-brand-primary">
                HT
              </div>
              <div>
                <strong className="block text-sm font-semibold tracking-wide text-white">
                  ONESTOPPCBA
                </strong>
                <span className="text-[9px] font-medium tracking-[0.14em] text-white/40">
                  HUITAI ELECTRONICS
                </span>
              </div>
            </div>
            <p className="text-xs leading-loose text-white/55">
              Shenzhen Huitai Electronics Technology Co., Ltd.
            </p>
            <p className="text-xs leading-loose text-white/55">
              Building D, 4F, Zhaochang Industrial Park,<br />
              Gonghe Industrial Road, Shajing,<br />
              Bao&apos;an District, Shenzhen, China
            </p>
          </div>

          <div>
            <h5 className="mb-3.5 text-[11px] font-semibold tracking-[0.14em] text-brand-yellow">
              SERVICES
            </h5>
            {SERVICES_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-xs leading-loose text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h5 className="mb-3.5 text-[11px] font-semibold tracking-[0.14em] text-brand-yellow">
              RESOURCES
            </h5>
            {RESOURCE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-xs leading-loose text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h5 className="mb-3.5 text-[11px] font-semibold tracking-[0.14em] text-brand-yellow">
              CONTACT
            </h5>
            <TrackedAnchor
              href="mailto:teemo18420085181@gmail.com"
              eventName="click_email"
              eventParams={{ location: 'footer', contact_method: 'email' }}
              className="block text-xs leading-loose text-white/55 transition-colors hover:text-white"
            >
              teemo18420085181@gmail.com
            </TrackedAnchor>
            <span className="block text-xs leading-loose text-white/55">
              Mon-Sat, 09:00-18:00 CST
            </span>
            <TrackedLink
              href="/contact"
              eventName="click_quote_button"
              eventParams={{ location: 'footer', destination: '/contact' }}
              className="mt-1 block text-xs leading-loose text-brand-yellow/80 transition-colors hover:text-brand-yellow"
            >
              Get PCB Assembly Quote
            </TrackedLink>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-6 text-[11px] text-white/40">
          <span>Copyright 2026 Huitai Electronics Technology Co., Ltd. All rights reserved.</span>
          <span className="flex gap-3">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
            <span>/</span>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
            <span>/</span>
            <span>NDA Available</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
