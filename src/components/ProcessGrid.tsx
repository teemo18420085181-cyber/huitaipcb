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
    desc: 'AOI · X-Ray for BGAs · flying probe · ICT · functional testing. Test reports can be provided based on project requirements.',
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
    <section className="font-body-cc px-[5vw] py-[90px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 max-w-[680px]">
          <div className="font-mono-cc mb-3.5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
            <span className="h-px w-[18px] bg-cc-copper" />
            THE TURNKEY WORKFLOW
          </div>
          <h2 className="font-display mb-3.5 text-3xl font-bold leading-tight tracking-tight text-cc-ink md:text-4xl lg:text-[44px]">
            Eight stages, <span className="cc-copper-text">one team,</span> zero handoffs.
          </h2>
          <p className="text-[15px] leading-relaxed text-cc-ink-mute">
            From the moment you upload files to the day boards arrive — every stage coordinated
            through our Shenzhen engineering and manufacturing partners.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <Link
              key={p.n}
              href={p.href}
              className="group overflow-hidden rounded-[14px] border border-cc-line bg-cc-carbon-2 transition-all duration-200 hover:-translate-y-1 hover:border-cc-copper/40"
            >
              <div className="relative h-40 overflow-hidden bg-cc-carbon-3">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cc-carbon via-cc-carbon/40 to-transparent" />
                <div className="cc-copper-fill font-mono-cc absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold">
                  {p.n}
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-1.5 text-sm font-semibold text-cc-ink transition-colors group-hover:text-cc-copper-soft">
                  {p.name}
                </h3>
                <p className="line-clamp-3 text-xs leading-relaxed text-cc-ink-mute">{p.desc}</p>
              </div>
              <div className="-mt-px h-[3px] bg-gradient-to-r from-cc-copper to-cc-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
