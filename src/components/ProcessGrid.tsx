import Image from 'next/image';
import Link from 'next/link';

const PROCESS = [
  {
    n: '01',
    name: 'Files & DFM Review',
    desc: 'Gerber, BOM, and assembly notes reviewed by our engineering team. Manufacturability issues flagged before production.',
    image: '/factory/flow-01.png',
    href: '/services',
  },
  {
    n: '02',
    name: 'BOM Sourcing',
    desc: 'Component procurement from authorized distributors. IQC inspection on every incoming reel.',
    image: '/factory/flow-02.png',
    href: '/services',
  },
  {
    n: '03',
    name: 'PCB Fabrication',
    desc: '1–30 layers · FR4 / HDI / Rogers / Rigid-flex / Aluminum · HASL, ENIG, OSP, Immersion Silver · Impedance control available.',
    image: '/factory/flow-03.png',
    href: '/capabilities',
  },
  {
    n: '04',
    name: 'SMT Assembly',
    desc: 'High-precision pick-and-place. 01005 to BGA. Lead-free reflow. Multiple production lines.',
    image: '/factory/flow-04.png',
    href: '/services',
  },
  {
    n: '05',
    name: 'Through-Hole & Hand Solder',
    desc: 'DIP components, connectors, transformers. Wave soldering or hand soldering for low-volume builds.',
    image: '/factory/flow-05.png',
    href: '/services',
  },
  {
    n: '06',
    name: 'Inspection & Testing',
    desc: 'AOI · X-Ray for BGAs · flying probe · ICT · functional testing. Reports issued with every order.',
    image: '/factory/flow-06.png',
    href: '/quality',
  },
  {
    n: '07',
    name: 'Box Build & Assembly',
    desc: 'Enclosure mounting, cable harnessing, final product integration. Ready-to-use finished goods.',
    image: '/factory/flow-07.png',
    href: '/services',
  },
  {
    n: '08',
    name: 'Packaging & Shipping',
    desc: 'Anti-static packaging, project documentation, and DHL/FedEx or customer-specified delivery.',
    image: '/factory/flow-08.png',
    href: '/contact',
  },
];

export default function ProcessGrid() {
  return (
    <section className="py-[90px] px-[5vw]">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12 max-w-[680px]">
          <div className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-3.5">
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
            THE TURNKEY WORKFLOW
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold text-brand-primary tracking-tight leading-tight mb-3.5">
            Eight stages,{' '}
            <em className="not-italic text-brand-green-dark">one team,</em> zero
            handoffs.
          </h2>
          <p className="text-[15px] text-ink-muted leading-relaxed">
            From the moment you upload files to the day boards arrive — every
            stage coordinated through our Shenzhen engineering and manufacturing partners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((p) => (
            <Link
              key={p.n}
              href={p.href}
              className="group bg-white border border-line rounded-[14px] overflow-hidden hover:border-brand-primary-light hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-40 overflow-hidden bg-brand-primary-dark">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-brand-primary/10 to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-brand-yellow flex items-center justify-center text-brand-primary text-[11px] font-bold shadow-md">
                  {p.n}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-brand-primary mb-1.5 group-hover:text-brand-primary-light transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                  {p.desc}
                </p>
              </div>
              <div className="h-[3px] bg-gradient-to-r from-brand-yellow to-brand-green -mt-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
