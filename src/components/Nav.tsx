'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Upload, X } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

const NAV_ITEMS = [
  { name: 'Services', href: '/services' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Quality', href: '/quality' },
  { name: 'Industries', href: '/industries' },
  { name: 'Knowledge', href: '/knowledge' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-cc-carbon-2 ring-1 ring-cc-copper/30 transition-transform group-hover:-rotate-6">
            <Image src="/logo.svg" alt="Huitai Electronics logo" width={36} height={36} className="h-7 w-7 object-contain" />
          </span>
          <div className="min-w-0 leading-none">
            <strong className="block whitespace-nowrap text-[11px] font-semibold tracking-[0.05em] text-cc-ink sm:text-sm sm:tracking-[0.08em]">
              HUITAI ELECTRONICS
            </strong>
            <span className="font-mono-cc mt-1 hidden text-[8px] font-medium tracking-[0.14em] text-cc-ink-mute sm:block">
              TURNKEY PCBA MANUFACTURING
            </span>
          </div>
        </Link>

        <div className="hidden h-full items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
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
          <TrackedLink
            href="/contact#quote-form"
            eventName="quote_click"
            eventParams={{ location: 'nav', destination: '/contact#quote-form' }}
            className="hidden rounded-lg border border-cc-copper/30 px-4 py-2 text-xs font-medium text-cc-ink transition-all hover:border-cc-copper/60 hover:text-cc-copper-soft md:inline-block"
          >
            Start a Quote
          </TrackedLink>
          <TrackedLink
            href="/contact#project-files"
            eventName="upload_gerber_bom_click"
            eventParams={{ location: 'nav', destination: '/contact#project-files' }}
            className="cc-copper-fill inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold transition-all hover:-translate-y-0.5 sm:px-4 sm:text-xs"
          >
            <Upload size={13} strokeWidth={2.5} />
            <span className="sm:hidden">Upload Files</span>
            <span className="hidden sm:inline">Upload Gerber &amp; BOM</span>
          </TrackedLink>
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cc-line text-cc-ink transition-colors hover:border-cc-copper/50 lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-cc-line py-3 lg:hidden">
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {NAV_ITEMS.map((item) => (
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
            <TrackedLink
              href="/contact#quote-form"
              eventName="quote_click"
              eventParams={{ location: 'mobile_nav', destination: '/contact#quote-form' }}
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-lg border border-cc-copper/30 px-3 py-3 text-sm font-semibold text-cc-ink"
            >
              Start a PCB Assembly Quote
            </TrackedLink>
          </div>
        </div>
      )}
    </nav>
  );
}
