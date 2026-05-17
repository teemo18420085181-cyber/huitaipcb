import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Capabilities — PCB & PCBA Technical Specs | OneStopPCBA',
  description: 'PCB fabrication: 1-30 layers, HDI, Rogers, rigid-flex, aluminum MCPCB, impedance control. Full SMT assembly specs from Shenzhen.',
};

const CAPS = [
  {
    n: '01', tag: 'MULTI-LAYER PCB',
    title: 'From 2-layer prototypes to 30-layer production boards.',
    desc: 'We fabricate PCBs from single-sided to 30 layers using FR4 (TG130/170/180) as standard substrate. Standard 4–6 layer turnaround is 5 business days. Controlled impedance available across all layer counts.',
    specs: ['1–30 layers', 'FR4 TG130 / TG170 / TG180', 'Min board thickness: 0.4mm', 'Max board size: 600×500mm', 'Min hole size: 0.15mm', 'Impedance control ±10%'],
    image: '/factory/cap-01.png',
    badge: 'Standard', badgeColor: 'bg-brand-yellow text-brand-primary',
  },
  {
    n: '02', tag: 'HDI — HIGH DENSITY INTERCONNECT',
    title: 'Micro vias, blind vias, buried vias for compact designs.',
    desc: 'HDI technology enables smaller boards with higher component density. We support any-layer HDI with laser-drilled micro vias down to 0.1mm, blind and buried vias, and trace widths down to 3mil. Essential for smartphones, wearables, and high-speed digital designs.',
    specs: ['Min trace/space: 3mil / 3mil', 'Laser micro via: 0.1mm', 'Blind & buried vias', 'Any-layer HDI available', 'Sequential lamination', 'Via-in-pad with fill & cap'],
    image: '/factory/cap-02.png',
    badge: 'Advanced', badgeColor: 'bg-brand-primary text-white',
  },
  {
    n: '03', tag: 'HIGH-FREQUENCY — ROGERS / PTFE',
    title: 'RF and microwave boards with controlled dielectric properties.',
    desc: 'For RF, antenna, radar, and microwave applications, standard FR4 is not sufficient. We fabricate on Rogers RO4000 series, RO3000 series, PTFE composites, and other specialty laminates with controlled Dk and Df values.',
    specs: ['Rogers RO4350B, RO4003C', 'Rogers RO3010, RT/Duroid', 'PTFE composites', 'Dk tolerance ±0.05', 'Low loss Df <0.004', '50Ω microstrip design'],
    image: '/factory/cap-03.png',
    badge: 'High-Frequency', badgeColor: 'bg-brand-green text-white',
  },
  {
    n: '04', tag: 'RIGID-FLEX PCB',
    title: 'Flexible and rigid sections in one integrated board.',
    desc: 'Rigid-flex PCBs combine the reliability of rigid boards with the flexibility of FPC. Ideal for wearables, medical devices, and applications where the board must bend. We manufacture and assemble rigid-flex as a single turnkey project.',
    specs: ['Polyimide (PI) flex substrate', '1–8 flex layers', 'Min bend radius: 6× board thickness', 'Static and dynamic flex', 'ZIF connectors assembled', 'Conformal coating available'],
    image: '/factory/cap-04.png',
    badge: 'Rigid-Flex', badgeColor: 'bg-brand-yellow text-brand-primary',
  },
  {
    n: '05', tag: 'ALUMINUM MCPCB',
    title: 'Metal core PCBs for LED and high-power applications.',
    desc: 'Aluminum metal core PCBs (MCPCB) provide excellent thermal management for high-power LED arrays, motor driver boards, and power electronics. The aluminum base conducts heat away from components, extending product life.',
    specs: ['Aluminum base: 1.0–3.0mm thick', 'Thermal conductivity: 1–3 W/mK', 'Dielectric layer: 75–150μm', 'Single & double-sided', 'LED array layouts', 'Custom shapes & cutouts'],
    image: '/factory/cap-05.png',
    badge: 'MCPCB', badgeColor: 'bg-brand-primary text-white',
  },
  {
    n: '06', tag: 'IMPEDANCE CONTROL & TESTING',
    title: 'Verified electrical performance on every controlled-impedance board.',
    desc: 'Controlled impedance is critical for high-speed digital signals, RF traces, and differential pairs. We model and verify impedance during fabrication and test every board with TDR or vector network analyzer. Test reports included.',
    specs: ['Single-ended: 25Ω–150Ω', 'Differential pairs: 50Ω–120Ω', 'Tolerance: ±10% standard, ±5% tight', 'TDR testing on every board', 'Coupon-based verification', 'Test report with shipment'],
    image: '/factory/cap-06.png',
    badge: 'Verified', badgeColor: 'bg-brand-green text-white',
  },
];

export default function CapabilitiesPage() {
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
              TECHNICAL CAPABILITIES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
              Every board type.<br />
              <em className="not-italic text-brand-yellow">Built to your spec.</em>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[680px] mx-auto">
              From standard FR4 to Rogers high-frequency, HDI micro-vias, rigid-flex, and aluminum MCPCB — we cover the full spectrum of PCB fabrication technologies.
            </p>
          </div>
        </section>

        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto space-y-5">
            {CAPS.map((cap, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={cap.n} className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-line bg-white hover:shadow-lg transition-all duration-300 ${isEven ? '' : 'md:[&>*:first-child]:order-last'}`}>
                  <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                    <Image src={cap.image} alt={cap.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-brand-primary/10 transition-colors duration-300" />
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/80 backdrop-blur border border-white/20 flex items-center justify-center text-white text-[13px] font-bold">{cap.n}</div>
                      <div className={`text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full inline-block ${cap.badgeColor}`}>{cap.badge}</div>
                    </div>
                    <div className="absolute bottom-5 left-5 text-[9px] text-white/60 tracking-[0.2em] font-medium">{cap.tag}</div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="text-[10px] text-brand-primary/50 font-semibold tracking-[0.18em] mb-3">CAPABILITY {cap.n}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-brand-primary leading-tight mb-4">{cap.title}</h2>
                    <p className="text-sm text-ink-muted leading-relaxed mb-5">{cap.desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {cap.specs.map((s, si) => (
                        <div key={si} className="flex items-center gap-2 text-xs text-ink-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />{s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="max-w-[820px] mx-auto bg-brand-primary rounded-2xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[80px] -right-[80px] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: '#FCEA0B', filter: 'blur(60px)' }} />
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Not sure which spec fits your design?</h2>
            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-[500px] mx-auto">Upload your Gerber files and our engineering team will review your design and recommend the right process within 24 hours.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-yellow text-brand-primary text-sm font-semibold py-3 px-7 rounded-xl hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}>
              Upload Files & Get DFM Review →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
