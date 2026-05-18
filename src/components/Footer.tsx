import Link from 'next/link';

const SERVICES_LINKS = [
  { label: 'Turnkey PCBA', href: '/services' },
  { label: 'PCB Fabrication', href: '/capabilities' },
  { label: 'Component Sourcing', href: '/services' },
  { label: 'SMT Assembly', href: '/services' },
  { label: 'Box Build', href: '/services' },
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
    <footer className="bg-brand-primary-dark text-white py-12 pb-8 px-[5vw]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 pb-8 border-b border-white/[0.08]">

          {/* Brand col */}
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-brand-yellow rounded-lg flex items-center justify-center font-bold text-brand-primary text-xs">
                HT
              </div>
              <div>
                <strong className="block text-sm font-semibold text-white tracking-wide">
                  ONESTOPPCBA
                </strong>
                <span className="text-[9px] text-white/40 tracking-widest">
                  HUITAI ELECTRONICS
                </span>
              </div>
            </div>
            <p className="text-xs text-white/55 leading-loose">
              Shenzhen Huitai Electronics Technology Co., Ltd.
            </p>
            <p className="text-xs text-white/55 leading-loose">
              Building D, 4F, Zhaochang Industrial Park,<br />
              Gonghe Industrial Road, Shajing,<br />
              Bao&apos;an District, Shenzhen, China
            </p>
          </div>

          {/* Services col */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[0.14em] text-brand-yellow mb-3.5">
              SERVICES
            </h5>
            {SERVICES_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-xs text-white/55 leading-loose hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Resources col */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[0.14em] text-brand-yellow mb-3.5">
              RESOURCES
            </h5>
            {RESOURCE_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-xs text-white/55 leading-loose hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact col */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[0.14em] text-brand-yellow mb-3.5">
              CONTACT
            </h5>
            <a
              href="mailto:teemo18420085181@gmail.com"
              className="block text-xs text-white/55 leading-loose hover:text-white transition-colors"
            >
              teemo18420085181@gmail.com
            </a>
            <span className="block text-xs text-white/55 leading-loose">
              Mon–Sat, 09:00–18:00 CST
            </span>
            <Link
              href="/contact"
              className="block text-xs text-brand-yellow/80 leading-loose hover:text-brand-yellow transition-colors mt-1"
            >
              Get a quote →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center pt-6 text-[11px] text-white/40 flex-wrap gap-2">
          <span>© 2026 Huitai Electronics Technology Co., Ltd. All rights reserved.</span>
          <span className="flex gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>·</span>
            <span>NDA Available</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
