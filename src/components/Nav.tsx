'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { getLocaleFromPathname, getLocalizedPathname, type Locale } from '@/lib/i18n/routes';

const NAV_ITEMS: Record<Locale, { name: string; href: string }[]> = {
  en: [
    { name: 'Services', href: '/services' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Quality', href: '/quality' },
    { name: 'Industries', href: '/industries' },
    { name: 'Knowledge', href: '/knowledge' },
  ],
  de: [
    { name: 'Turnkey PCBA', href: '/de/turnkey-pcb-assembly' },
    { name: 'PCBA aus China', href: '/de/china-pcb-assembly' },
    { name: 'BOM-Beschaffung', href: '/de/bom-sourcing-pcb-assembly' },
    { name: 'Prototypen', href: '/de/prototype-pcb-assembly' },
    { name: 'Kontakt', href: '/de/contact' },
  ],
};

const NAV_COPY: Record<Locale, { quote: string; upload: string; mobileQuote: string; tagline: string }> = {
  en: {
    quote: 'Request a Quote',
    upload: 'Send Gerber & BOM',
    mobileQuote: 'Request a PCBA Quote',
    tagline: 'TURNKEY PCBA MANUFACTURING',
  },
  de: {
    quote: 'Anfrage',
    upload: 'Gerber & BOM senden',
    mobileQuote: 'PCBA-Anfrage',
    tagline: 'TURNKEY PCBA-FERTIGUNG',
  },
};

export default function Nav() {
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = getLocaleFromPathname(pathname);
  const navItems = NAV_ITEMS[locale];
  const copy = NAV_COPY[locale];
  const homeHref = locale === 'de' ? '/de' : '/';
  const quoteHref = locale === 'de' ? '/de/contact#quote-form' : '/contact#quote-form';
  const uploadHref = locale === 'de' ? '/de/contact#project-files' : '/contact#project-files';
  const enHref = getLocalizedPathname(pathname, 'en');
  const deHref = getLocalizedPathname(pathname, 'de');

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <nav className="font-body-cc fixed left-0 right-0 top-0 z-50 border-b border-cc-line bg-cc-carbon/90 px-[5vw] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between">
        <Link href={homeHref} className="group flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-cc-carbon-2 ring-1 ring-cc-copper/30 transition-transform group-hover:-rotate-6">
            <Image src="/logo.svg" alt="Huitai Electronics logo" width={36} height={36} className="h-7 w-7 object-contain" />
          </span>
          <div className="min-w-0 leading-none">
            <strong className="block whitespace-nowrap text-[11px] font-semibold tracking-[0.05em] text-cc-ink sm:text-sm sm:tracking-[0.08em]">
              <span className="min-[440px]:hidden">HUITAI</span>
              <span className="hidden min-[440px]:inline">HUITAI ELECTRONICS</span>
            </strong>
            <span className="font-mono-cc mt-1 hidden text-[8px] font-medium tracking-[0.14em] text-cc-ink-mute sm:block">
              {copy.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden h-full items-center gap-7 xl:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex h-full items-center text-[13px] font-medium transition-colors ${
                  active ? 'text-cc-copper-soft' : 'text-cc-ink-mute hover:text-cc-ink'
                }`}
              >
                <span>{item.name}</span>
                <span
                  className={`absolute bottom-[18px] left-0 right-0 h-px origin-center bg-cc-copper transition-transform duration-200 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-cc-line bg-cc-carbon-2/60 px-2 py-1 text-[11px] font-semibold text-cc-ink-mute sm:flex">
            <Link href={enHref} hrefLang="en" className={locale === 'en' ? 'text-cc-copper-soft' : 'transition-colors hover:text-cc-ink'}>
              EN
            </Link>
            <span className="text-cc-line">|</span>
            <Link href={deHref} hrefLang="de" className={locale === 'de' ? 'text-cc-copper-soft' : 'transition-colors hover:text-cc-ink'}>
              DE
            </Link>
          </div>
          <TrackedLink
            href={quoteHref}
            eventName="quote_click"
            eventParams={{ location: 'nav', destination: quoteHref }}
            className="cc-copper-fill inline-flex min-h-11 items-center justify-center rounded-lg px-3 py-2 text-[11px] font-semibold transition-transform hover:-translate-y-0.5 sm:px-4 sm:text-xs"
          >
            {copy.quote}
          </TrackedLink>
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-cc-line text-cc-ink transition-colors hover:border-cc-copper/50 xl:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-cc-line py-3 xl:hidden">
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-lg px-3 py-3 text-sm transition-colors ${
                  isActive(item.href) ? 'bg-cc-copper/10 text-cc-copper-soft' : 'text-cc-ink-mute hover:bg-white/[0.03] hover:text-cc-ink'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="my-1 flex w-fit items-center gap-2 rounded-full border border-cc-line bg-cc-carbon-2/60 px-3 py-2 text-xs font-semibold text-cc-ink-mute">
              <Link href={enHref} hrefLang="en" className={locale === 'en' ? 'text-cc-copper-soft' : 'transition-colors hover:text-cc-ink'}>
                EN
              </Link>
              <span className="text-cc-line">|</span>
              <Link href={deHref} hrefLang="de" className={locale === 'de' ? 'text-cc-copper-soft' : 'transition-colors hover:text-cc-ink'}>
                DE
              </Link>
            </div>
            <TrackedLink
              href={uploadHref}
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'mobile_nav', destination: uploadHref }}
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-lg border border-cc-copper/30 px-3 py-3 text-sm font-semibold text-cc-ink"
            >
              {copy.upload}
            </TrackedLink>
            <TrackedLink
              href={quoteHref}
              eventName="quote_click"
              eventParams={{ location: 'mobile_nav', destination: quoteHref }}
              onClick={() => setMenuOpen(false)}
              className="cc-copper-fill mt-1 rounded-lg px-3 py-3 text-center text-sm font-semibold"
            >
              {copy.mobileQuote}
            </TrackedLink>
          </div>
        </div>
      )}
    </nav>
  );
}
