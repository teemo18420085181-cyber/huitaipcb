'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Upload } from 'lucide-react';
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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <nav className="font-body-cc fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-cc-line bg-cc-carbon/80 px-[5vw] backdrop-blur-md">
      <Link href="/" className="group flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[9px] bg-cc-carbon-2 ring-1 ring-cc-copper/30 transition-transform group-hover:-rotate-6">
          <Image src="/logo.svg" alt="OneStopPCBA Logo" width={36} height={36} className="h-7 w-7 object-contain" />
        </span>
        <div className="flex flex-col leading-none">
          <strong className="text-sm font-semibold tracking-wide text-cc-ink">ONESTOPPCBA</strong>
          <em className="font-mono-cc not-italic text-[9px] font-medium tracking-[0.16em] text-cc-ink-mute">
            HUITAI ELECTRONICS
          </em>
        </div>
      </Link>

      <div className="hidden h-full items-center gap-7 md:flex">
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

      <div className="flex items-center gap-2.5">
        <TrackedLink
          href="/contact"
          eventName="quote_click"
          eventParams={{ location: 'nav', destination: '/contact' }}
          className="hidden rounded-lg border border-cc-copper/30 px-4 py-2 text-xs font-medium text-cc-ink transition-all hover:border-cc-copper/60 hover:text-cc-copper-soft sm:inline-block"
        >
          Get a Quote
        </TrackedLink>
        <TrackedLink
          href="/contact"
          eventName="upload_gerber_bom_click"
          eventParams={{ location: 'nav', destination: '/contact' }}
          className="cc-copper-fill inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all hover:-translate-y-0.5"
        >
          <Upload size={13} strokeWidth={2.5} />
          Upload Gerber &amp; BOM
        </TrackedLink>
      </div>
    </nav>
  );
}
