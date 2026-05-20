import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Turnkey PCB Assembly Services in China | SMT, BOM Sourcing & Testing',
  description: 'Explore turnkey PCB assembly services in China, including PCB fabrication, BOM review, component sourcing, SMT assembly, DIP assembly, functional testing, final assembly, and delivery.',
  alternates: { canonical: 'https://huitaipcb.com/services' },
};

const SERVICES = [
  {
    n: '01', tag: 'FILES & DFM REVIEW',
    title: 'Your design reviewed before a single component is ordered.',
    desc: 'Upload your Gerber, BOM, and assembly files. Our engineers review submissions for manufacturability issues such as spacing violations, missing reference designators, footprint mismatches, and paste mask problems before quotation.',
    detail: 'Gerber · BOM · Pick-and-place · Assembly notes · Sample boards accepted',
    image: '/factory/flow-01.png',
    badge: 'Day 1', badgeColor: 'bg-brand-yellow text-brand-primary',
    link: '/capabilities',
  },
  {
    n: '02', tag: 'BOM SOURCING & IQC',
    title: 'Every component sourced, verified, and inspected.',
    desc: 'Our procurement team reviews component availability, sourcing channels, shortages, and possible alternatives when needed before assembly planning.',
    detail: 'BOM review · sourcing options · alternatives check · purchasing coordination',
    image: '/factory/flow-02.png',
    badge: 'Day 1–2', badgeColor: 'bg-brand-green text-white',
    link: '/capabilities',
  },
  {
    n: '03', tag: 'PCB FABRICATION',
    title: 'Your bare board fabricated from your Gerber files.',
    desc: 'We fabricate 1–30 layer PCBs in FR4, Rogers, HDI, rigid-flex, and aluminum MCPCB. Standard 4–6 layer boards are ready in 5 business days. Every bare board is electrically tested before it goes to assembly.',
    detail: 'FR4 · HDI · Rogers · Rigid-flex · MCPCB · HASL · ENIG · OSP',
    image: '/factory/flow-03.png',
    badge: 'Day 2–4', badgeColor: 'bg-brand-primary text-white',
    link: '/capabilities',
  },
  {
    n: '04', tag: 'SMT ASSEMBLY',
    title: 'Automated pick-and-place on multiple production lines.',
    desc: 'Components are placed using pick-and-place equipment selected for the project. We can support small passives, BGAs, QFNs, LGAs, lead-free reflow, and AOI process planning based on requirements.',
    detail: 'Min component: 01005 · BGA · QFN · LGA · CSP · Lead-free reflow',
    image: '/factory/flow-04.png',
    badge: 'Day 3–5', badgeColor: 'bg-brand-yellow text-brand-primary',
    link: '/capabilities',
  },
  {
    n: '05', tag: 'THROUGH-HOLE & HAND SOLDERING',
    title: 'DIP components, connectors, and post-solder finishing.',
    desc: 'After SMT, through-hole components are inserted and wave-soldered or hand-soldered depending on volume and design requirements. Connectors, terminal blocks, transformers, and large capacitors are handled by experienced operators following IPC-J-STD-001 workmanship standards.',
    detail: 'Wave solder · Selective solder · Hand solder · IPC-J-STD-001',
    image: '/factory/flow-05.png',
    badge: 'Day 4–6', badgeColor: 'bg-brand-green text-white',
    link: '/quality',
  },
  {
    n: '06', tag: 'INSPECTION & TESTING',
    title: 'Inspection and testing planned around your board.',
    desc: 'AOI catches missing or misaligned components. X-Ray verifies BGA solder joints. Flying probe or ICT confirms electrical continuity. Functional testing validates board operation against your test specification. A signed test report accompanies every shipment.',
    detail: 'AOI · X-Ray · Flying probe · ICT · Functional test · IPC Class II/III',
    image: '/factory/flow-06.png',
    badge: 'Day 5–7', badgeColor: 'bg-brand-primary text-white',
    link: '/quality',
  },
  {
    n: '07', tag: 'BOX BUILD & FINAL ASSEMBLY',
    title: 'From assembled boards to finished, ready-to-ship products.',
    desc: 'We install your boards into enclosures, route and terminate cable harnesses, flash firmware, and perform final product-level testing. Finished goods are ready for your warehouse or end customers — no further assembly work needed on your end.',
    detail: 'Enclosure mounting · Cable harnessing · Firmware flashing · Final QC',
    image: '/factory/flow-07.png',
    badge: 'Optional', badgeColor: 'bg-brand-yellow text-brand-primary',
    link: '/contact',
  },
  {
    n: '08', tag: 'PACKAGING & SHIPPING',
    title: 'Shipped to your door with full documentation.',
    desc: 'Every order is anti-static packaged, foam-separated, and boxed with a signed test report and packing list. We ship worldwide via DHL and FedEx with full tracking. Lead times vary by board complexity — most prototype runs ship within 7–10 business days.',
    detail: 'Anti-static bags · Foam protection · documentation · DHL / FedEx · global delivery',
    image: '/factory/flow-08.png',
    badge: 'Day 6–10', badgeColor: 'bg-brand-green text-white',
    link: '/contact',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="pt-[64px] min-h-screen bg-bg">
        <section className="relative px-[5vw] py-16 md:py-24 bg-brand-primary text-white overflow-hidden">
          <div className="absolute -top-[100px] right-[10%] w-[300px] h-[300px] rounded-full opacity-30" style={{ background: '#FCEA0B', filter: 'blur(100px)' }} />
          <div className="absolute -bottom-[100px] left-[10%] w-[280px] h-[280px] rounded-full opacity-20" style={{ background: '#93C249', filter: 'blur(100px)' }} />
          <div className="relative z-10 max-w-[1080px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" style={{ boxShadow: '0 0 12px #FCEA0B' }} />
              TURNKEY SERVICES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
              Turnkey PCB Assembly Services
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[680px] mx-auto">
              PCB fabrication coordination, BOM review, component sourcing, SMT assembly, DIP assembly, functional testing, final assembly, packaging, and global delivery through one managed workflow.
            </p>
          </div>
        </section>

        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto space-y-5">
            {SERVICES.map((s, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={s.n} className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-line bg-white hover:shadow-lg transition-all duration-300 ${isEven ? '' : 'md:[&>*:first-child]:order-last'}`}>
                  <div className="relative h-64 md:h-auto min-h-[260px] overflow-hidden">
                    <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-brand-primary/25 group-hover:bg-brand-primary/15 transition-colors duration-300" />
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/80 backdrop-blur border border-white/20 flex items-center justify-center text-white text-[13px] font-bold">{s.n}</div>
                      <div className={`text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full inline-block ${s.badgeColor}`}>{s.badge}</div>
                    </div>
                    <div className="absolute bottom-5 left-5 text-[9px] text-white/60 tracking-[0.2em] font-medium">{s.tag}</div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="text-[10px] text-brand-primary/50 font-semibold tracking-[0.18em] mb-3">SERVICE {s.n}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-brand-primary leading-tight mb-4">{s.title}</h2>
                    <p className="text-sm text-ink-muted leading-relaxed mb-5">{s.desc}</p>
                    <div className="bg-bg-muted rounded-lg px-4 py-3 text-xs text-ink-muted border border-line mb-5">
                      <span className="font-medium text-brand-primary">Covers: </span>{s.detail}
                    </div>
                    <Link href={s.link} className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-primary hover:text-brand-primary-light transition-colors">
                      Request a PCBA Quote →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="max-w-[820px] mx-auto bg-brand-primary rounded-2xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[80px] -right-[80px] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: '#FCEA0B', filter: 'blur(60px)' }} />
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Ready to send us your project?</h2>
            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-[500px] mx-auto">Upload your Gerber files and BOM. We&apos;ll review them and respond with the next questions, scope, and lead time for a turnkey quote.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-yellow text-brand-primary text-sm font-semibold py-3 px-7 rounded-xl hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}>
              Upload Gerber & BOM →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
