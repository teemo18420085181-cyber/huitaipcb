import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';

export const metadata = {
  title: 'PCB & PCBA Capability Review | Huitai Electronics',
  description: 'PCB and PCBA capabilities are reviewed case by case based on board complexity, materials, BOM availability, assembly process, inspection, and testing requirements.',
  alternates: { canonical: 'https://huitaipcb.com/capabilities' },
  openGraph: { url: 'https://huitaipcb.com/capabilities', images: OG_IMAGES },
};

const CAPS = [
  {
    n: '01', tag: 'MULTI-LAYER PCB',
    title: 'Multi-layer PCB requirements reviewed for each project.',
    desc: 'Layer count, materials, board dimensions, hole sizes, impedance requirements, and target lead time are reviewed against the project files before quotation.',
    specs: ['Layer stack-up review', 'Material options by project', 'Board dimensions reviewed', 'Hole and via requirements', 'Impedance requirements reviewed', 'Lead time confirmed per project'],
    image: '/factory/cap-01.png',
    badge: 'Standard', badgeColor: 'bg-cc-copper text-cc-ink',
  },
  {
    n: '02', tag: 'HDI — HIGH DENSITY INTERCONNECT',
    title: 'HDI requirements reviewed for compact designs.',
    desc: 'Micro-via, blind-via, buried-via, via-in-pad, trace-space, and lamination requirements are reviewed case by case based on the design files and agreed production scope.',
    specs: ['Micro-via requirements', 'Blind & buried via review', 'Via-in-pad options', 'Trace/space review', 'Lamination planning', 'Capability confirmed before quotation'],
    image: '/factory/cap-02.png',
    badge: 'Advanced', badgeColor: 'bg-cc-carbon-2 text-white',
  },
  {
    n: '03', tag: 'HIGH-FREQUENCY — ROGERS / PTFE',
    title: 'RF and microwave material requirements reviewed by project.',
    desc: 'Rogers, PTFE, controlled dielectric, impedance, and RF-related fabrication requirements can be reviewed against the stack-up, frequency, and customer specifications before quotation.',
    specs: ['Specialty laminate review', 'Stack-up requirements', 'Dk / Df considerations', 'Impedance requirements', 'RF trace review', 'Material availability check'],
    image: '/factory/cap-03.png',
    badge: 'High-Frequency', badgeColor: 'bg-cc-signal text-white',
  },
  {
    n: '04', tag: 'RIGID-FLEX PCB',
    title: 'Flexible and rigid sections in one integrated board.',
    desc: 'Rigid-flex construction, flex layers, bend requirements, connectors, and coating needs can be reviewed as part of a turnkey PCBA project before quotation.',
    specs: ['Rigid-flex construction review', 'Flex layer requirements', 'Bend requirements', 'Connector assembly options', 'Coating requirements', 'Scope confirmed per project'],
    image: '/factory/cap-04.png',
    badge: 'Rigid-Flex', badgeColor: 'bg-cc-copper text-cc-ink',
  },
  {
    n: '05', tag: 'ALUMINUM MCPCB',
    title: 'Metal core PCBs for LED and high-power applications.',
    desc: 'Aluminum MCPCB material, thermal, dielectric, thickness, layout, and shape requirements can be reviewed for LED, motor-control, and power-electronics projects.',
    specs: ['Aluminum material review', 'Thermal requirements', 'Dielectric requirements', 'Board thickness review', 'LED / power layouts', 'Custom shape review'],
    image: '/factory/cap-05.png',
    badge: 'MCPCB', badgeColor: 'bg-cc-carbon-2 text-white',
  },
  {
    n: '06', tag: 'IMPEDANCE CONTROL & TESTING',
    title: 'Controlled-impedance and test requirements reviewed by project.',
    desc: 'Controlled-impedance targets, verification method, inspection scope, and required documentation can be discussed before quotation and confirmed in the agreed project scope.',
    specs: ['Impedance target review', 'Verification method by scope', 'Coupon options when required', 'Inspection requirements', 'Test scope confirmed before production', 'Documentation by agreement'],
    image: '/factory/cap-06.png',
    badge: 'By Scope', badgeColor: 'bg-cc-signal text-white',
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      <Nav />
      <main className="pt-[64px] min-h-screen bg-cc-carbon">
        <section className="relative px-[5vw] py-16 md:py-24 bg-cc-carbon-2 text-white overflow-hidden">
          <div className="absolute -top-[100px] right-[10%] w-[300px] h-[300px] rounded-full opacity-30" style={{ background: '#E6A85A', filter: 'blur(100px)' }} />
          <div className="absolute -bottom-[100px] left-[10%] w-[280px] h-[280px] rounded-full opacity-20" style={{ background: '#9EE34F', filter: 'blur(100px)' }} />
          <div className="relative z-10 max-w-[1080px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-cc-copper/10 border border-cc-copper/40 text-cc-copper-soft text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cc-copper" style={{ boxShadow: '0 0 12px #E6A85A' }} />
              TECHNICAL CAPABILITIES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
              Capabilities reviewed.<br />
              <em className="not-italic text-cc-copper-soft">Built to the agreed scope.</em>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[680px] mx-auto">
              From standard FR4 to specialty materials, HDI, rigid-flex, and aluminum MCPCB projects, available fabrication and assembly capabilities are confirmed case by case after engineering review.
            </p>
            <div className="mx-auto mt-5 max-w-[720px] rounded-xl border border-sky-100/25 bg-cc-carbon-2/10 px-4 py-3 text-sm leading-relaxed text-white/75 md:text-[15px]">
              Our PCB fabrication capabilities are provided as part of turnkey PCB assembly projects. We focus on assembled PCBA delivery, not standalone bare PCB orders.
            </div>
          </div>
        </section>

        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto space-y-5">
            {CAPS.map((cap, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={cap.n} className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-cc-line bg-cc-carbon-2 hover:shadow-lg transition-all duration-300 ${isEven ? '' : 'md:[&>*:first-child]:order-last'}`}>
                  <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                    <Image src={cap.image} alt={cap.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-cc-carbon-2/20 group-hover:bg-cc-carbon-2/10 transition-colors duration-300" />
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-cc-copper/100 backdrop-blur border border-white/20 flex items-center justify-center text-white text-[13px] font-bold">{cap.n}</div>
                      <div className={`text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full inline-block ${cap.badgeColor}`}>{cap.badge}</div>
                    </div>
                    <div className="absolute bottom-5 left-5 text-[9px] text-white/60 tracking-[0.2em] font-medium">{cap.tag}</div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="text-[10px] text-cc-ink/50 font-semibold tracking-[0.18em] mb-3">CAPABILITY {cap.n}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-cc-ink leading-tight mb-4">{cap.title}</h2>
                    <p className="text-sm text-cc-ink-mute leading-relaxed mb-5">{cap.desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {cap.specs.map((s, si) => (
                        <div key={si} className="flex items-center gap-2 text-xs text-cc-ink-mute">
                          <span className="w-1.5 h-1.5 rounded-full bg-cc-copper flex-shrink-0" />{s}
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
          <div className="max-w-[820px] mx-auto bg-cc-carbon-2 rounded-2xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[80px] -right-[80px] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: '#E6A85A', filter: 'blur(60px)' }} />
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Not sure which spec fits your design?</h2>
            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-[500px] mx-auto">Upload your Gerber files so our engineering team can identify open requirements and confirm the available process, inspection, documentation, and target lead time before quotation.</p>
            <TrackedLink href="/contact" eventName="upload_gerber_bom_click" eventParams={{ location: 'capabilities_bottom_cta', destination: '/contact' }} className="inline-flex items-center gap-2 bg-cc-copper text-cc-ink text-sm font-semibold py-3 px-7 rounded-xl hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}>
              Upload Gerber & BOM →
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
