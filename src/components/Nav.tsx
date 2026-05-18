'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Upload } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-bg/85 backdrop-blur-md border-b border-line flex items-center justify-between px-[5vw]">
      <Link href="/" className="flex items-center gap-3 cursor-pointer group">
        <Image
          src="/logo.svg"
          alt="OneStopPCBA Logo"
          width={80}
          height={80}
          className="w-[80px] h-[80px] transition-transform group-hover:rotate-[-5deg]"
        />
        <div className="flex flex-col leading-none">
          <strong className="text-sm font-semibold text-brand-primary tracking-wide">
            ONESTOPPCBA
          </strong>
          <em className="not-italic text-[9px] text-ink-muted tracking-[0.14em] font-medium">
            HUITAI ELECTRONICS
          </em>
        </div>
      </Link>

      <div className="hidden md:flex gap-7 items-center h-full">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative h-full flex items-center text-[13px] font-medium transition-colors ${
                active
                  ? 'text-brand-primary'
                  : 'text-ink hover:text-brand-primary'
              }`}
            >
              <span>{item.name}</span>
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] bg-brand-yellow transition-transform duration-200 origin-center ${
                  active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href="/contact"
          className="text-xs text-brand-primary font-medium py-2 px-4 rounded-lg border border-line hover:border-brand-primary transition-all hidden sm:inline-block"
        >
          Get a Quote
        </Link>
        <Link
          href="/contact"
          className="text-xs text-white font-medium py-2 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary-light hover:-translate-y-0.5 transition-all inline-flex items-center gap-1.5"
        >
          <Upload size={13} strokeWidth={2.5} />
          Upload Files
        </Link>
      </div>
    </nav>
  );
}
