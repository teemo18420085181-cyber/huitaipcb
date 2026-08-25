import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import TrackedLink from '@/components/TrackedLink';
import TrackedAnchor from '@/components/TrackedAnchor';
import type { Locale } from '@/lib/i18n/routes';
import { SITE } from '@/lib/site';

const SERVICES_LINKS = [
  { label: 'China PCBA Manufacturer', href: '/china-pcba-manufacturer' },
  { label: 'Turnkey PCBA Manufacturing', href: '/turnkey-pcb-assembly' },
  { label: 'PCB Fabrication and Assembly', href: '/pcb-fabrication-and-assembly' },
  { label: 'Low-Volume PCBA Assembly', href: '/low-volume-pcba-assembly' },
  { label: 'BOM Sourcing and Assembly', href: '/bom-sourcing-pcb-assembly' },
  { label: 'PCBA Testing and Quality Control', href: '/pcba-testing-quality-control' },
];

const RESOURCE_LINKS = [
  { label: 'Knowledge Base', href: '/knowledge' },
  { label: 'About Huitai PCB', href: '/about' },
  { label: 'Case Studies', href: '/case-study' },
  { label: 'FAQ', href: '/faq' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Quality Standards', href: '/quality' },
];

const DE_SERVICES_LINKS = [
  { label: 'Turnkey-PCBA-Fertigung', href: '/de/turnkey-pcb-assembly' },
  { label: 'Leiterplattenbestückung China', href: '/de/china-pcb-assembly' },
  { label: 'BOM-Beschaffung', href: '/de/bom-sourcing-pcb-assembly' },
  { label: 'PCBA-Prototypen', href: '/de/prototype-pcb-assembly' },
];

const DE_RESOURCE_LINKS = [
  { label: 'Über Huitai PCB', href: '/about' },
  { label: 'Fallstudien', href: '/case-study' },
  { label: 'Häufige Fragen', href: '/faq' },
  { label: 'Kontakt', href: '/de/contact' },
];

const FOOTER_COPY = {
  en: {
    tagline: 'PCBA MANUFACTURING',
    description: 'PCBA manufacturing supplier in Shenzhen, China for PCB assembly, BOM sourcing, SMT and through-hole assembly, testing, and production delivery.',
    services: 'SERVICES',
    resources: 'RESOURCES',
    contact: 'CONTACT',
    hours: 'Mon-Sat, 09:00-18:00 CST',
    quote: 'Get a PCBA Manufacturing Quote',
    privacy: 'Privacy',
    terms: 'Terms',
    nda: 'NDA Available',
  },
  de: {
    tagline: 'PCBA-FERTIGUNG',
    description: 'PCBA-Fertigung in Shenzhen, China: Leiterplattenbestückung, BOM-Beschaffung, SMT-/THT-Montage, Prüfung und Produktionslieferung.',
    services: 'LEISTUNGEN',
    resources: 'INFORMATIONEN',
    contact: 'KONTAKT',
    hours: 'Mo-Sa, 09:00-18:00 CST',
    quote: 'PCBA-Fertigungsanfrage senden',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    nda: 'NDA verfügbar',
  },
} as const;

export default function Footer({ locale = 'en' }: { locale?: Locale }) {
  const copy = FOOTER_COPY[locale];
  const services = locale === 'de' ? DE_SERVICES_LINKS : SERVICES_LINKS;
  const resources = locale === 'de' ? DE_RESOURCE_LINKS : RESOURCE_LINKS;
  const contactHref = locale === 'de' ? '/de/contact#quote-form' : '/contact#quote-form';

  return (
    <footer className="font-body-cc relative border-t border-cc-line bg-cc-carbon-2 px-[5vw] py-12 pb-8 text-cc-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cc-copper/30 to-transparent" />
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-8 border-b border-cc-line pb-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
            <div className="mb-3 flex w-fit items-center gap-2.5">
              <span className="flex h-11 w-[58px] items-center justify-center">
                <BrandLogo className="h-10" />
              </span>
              <div>
                <strong className="block text-sm font-semibold tracking-wide text-cc-ink">HUITAI PCB</strong>
                <span className="font-mono-cc text-[9px] font-medium tracking-[0.16em] text-cc-ink-mute">
                  {copy.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-cc-ink">
              {copy.description}
            </p>
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
              {copy.services}
            </h5>
            {services.map((link) => (
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
              {copy.resources}
            </h5>
            {resources.map((link) => (
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
              {copy.contact}
            </h5>
            <TrackedAnchor
              href={`mailto:${SITE.email}`}
              eventName="email_click"
              eventParams={{ location: 'footer', contact_method: 'email' }}
              className="block text-xs leading-loose text-cc-ink-mute transition-colors hover:text-cc-ink"
            >
              {SITE.email}
            </TrackedAnchor>
            <TrackedAnchor
              href="https://wa.me/8618420085181?text=Hi%20Huitai%20PCB%2C%20I%27d%20like%20a%20PCBA%20manufacturing%20quote."
              target="_blank"
              rel="noopener noreferrer"
              eventName="whatsapp_click"
              eventParams={{ location: 'footer', contact_method: 'whatsapp' }}
              className="block text-xs leading-loose text-cc-signal transition-colors hover:text-cc-ink"
            >
              WhatsApp: {SITE.phone}
            </TrackedAnchor>
            <span className="block text-xs leading-loose text-cc-ink-mute">{copy.hours}</span>
            <TrackedLink
              href={contactHref}
              eventName="quote_click"
              eventParams={{ location: 'footer', destination: contactHref }}
              className="mt-1 block text-xs leading-loose text-cc-copper-soft transition-colors hover:text-cc-copper-bright"
            >
              {copy.quote}
            </TrackedLink>
          </div>
        </div>

        <div className="font-mono-cc flex flex-wrap items-center justify-between gap-2 pt-6 text-[11px] text-cc-ink-mute">
          <span>© 2026 {SITE.legalName}</span>
          <span className="flex gap-3">
            <Link href="/privacy" className="transition-colors hover:text-cc-ink">{copy.privacy}</Link>
            <span className="text-cc-copper/40">/</span>
            <Link href="/terms" className="transition-colors hover:text-cc-ink">{copy.terms}</Link>
            <span className="text-cc-copper/40">/</span>
            <span>{copy.nda}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
