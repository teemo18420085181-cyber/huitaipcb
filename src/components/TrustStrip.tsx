import {
  Cable,
  CircuitBoard,
  ClipboardCheck,
  Cpu,
  PackageCheck,
  PackageSearch,
} from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  {
    title: 'PCB fabrication',
    description: 'Bare boards coordinated to the confirmed stack-up, material, finish, and project requirements.',
    icon: CircuitBoard,
    href: '/pcb-fabrication-and-assembly',
  },
  {
    title: 'BOM sourcing',
    description: 'MPNs, availability, packages, and customer-approved alternatives reviewed with the assembly scope.',
    icon: PackageSearch,
    href: '/bom-sourcing-pcb-assembly',
  },
  {
    title: 'SMT assembly',
    description: 'Component placement and reflow planning for prototype, low-volume, and repeat builds.',
    icon: Cpu,
    href: '/pcb-assembly-services',
  },
  {
    title: 'Through-hole assembly',
    description: 'DIP, wave soldering, and hand-soldering requirements coordinated with the complete build.',
    icon: Cable,
    href: '/pcb-assembly-services',
  },
  {
    title: 'Inspection & testing',
    description: 'AOI, X-ray, electrical, and functional test needs discussed according to the project scope.',
    icon: ClipboardCheck,
    href: '/pcba-testing-quality-control',
  },
  {
    title: 'Finished PCBA delivery',
    description: 'Final review, anti-static packing, documentation, and delivery preparation in one workflow.',
    icon: PackageCheck,
    href: '/turnkey-pcb-assembly',
  },
];

export default function TrustStrip() {
  return (
    <section id="services-overview" className="font-body-cc bg-cc-paper px-[5vw] py-20 text-cc-heading md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 max-w-[760px]">
          <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
            MANUFACTURING CAPABILITIES
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[44px]">
            Custom PCBA Manufacturing Capabilities
          </h2>
          <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-cc-body">
            Use this page as the manufacturing hub, then review the service page that matches
            the fabrication, sourcing, assembly, testing, or delivery scope of your project.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-2xl border border-cc-line-light bg-cc-card p-6 shadow-[0_12px_32px_rgba(17,22,28,0.04)] transition-colors hover:border-cc-copper/45"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cc-copper/[0.12] text-cc-copper-ink">
                <Icon size={21} strokeWidth={1.9} />
              </div>
              <h3 className="font-display text-lg font-bold text-cc-heading">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-cc-body">{description}</p>
              <span className="mt-5 inline-flex text-xs font-semibold text-cc-copper-ink underline decoration-cc-copper/40 underline-offset-4">
                Review {title.toLowerCase()}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
