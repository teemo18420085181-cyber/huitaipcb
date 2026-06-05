import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';

export const metadata = {
  title: 'Quality Control — 6-Layer Inspection | Huitai Electronics',
  description: 'AOI, X-Ray BGA inspection, flying probe, ICT, functional testing and IQC options for PCB assembly projects that need documented quality control.',
  alternates: { canonical: 'https://huitaipcb.com/quality' },
  openGraph: { url: 'https://huitaipcb.com/quality' },
};

const QC = [
  {
    n: '01', tag: 'INCOMING QUALITY CONTROL',
    title: 'Every component verified before it touches your board.',
    desc: 'All incoming components are inspected against the BOM before stock-in. We check authenticity, date codes, packaging integrity, and dimensions using digital calipers and optical loupes. Counterfeit components are rejected immediately — we only use parts from authorized distributors.',
    specs: ['Approved sourcing options', 'Date-code verification', 'Physical dimension check', 'Package integrity inspection', 'Anti-static handling', 'Traceability records when required'],
    image: '/factory/qua-03.png',
    badge: 'IQC', badgeColor: 'bg-cc-copper text-cc-ink',
  },
  {
    n: '02', tag: 'AOI — AUTOMATED OPTICAL INSPECTION',
    title: 'Automated optical inspection after SMT assembly.',
    desc: 'AOI can be used after reflow soldering to scan for missing components, misalignment, solder bridges, polarity errors, and lifted pins. Boards with AOI issues are reviewed by a QC operator before rework or release.',
    specs: ['AOI process available', 'Missing component detection', 'Solder bridge detection', 'Polarity verification', 'Component misalignment', 'Operator review'],
    image: '/factory/flow-06.png',
    badge: 'Automated', badgeColor: 'bg-cc-carbon-2 text-white',
  },
  {
    n: '03', tag: 'X-RAY INSPECTION',
    title: 'Hidden solder joints verified inside and out.',
    desc: 'BGAs, QFNs, LGAs, and other bottom-terminated components cannot be inspected visually. Our X-Ray system images solder balls through the package, checking for voids, bridges, open joints, and misalignment. Mandatory for any board with area-array packages.',
    specs: ['BGA ball array verification', 'Void rate measurement', 'Hidden joint inspection', 'QFN / LGA / CSP supported', 'Defect analysis software', 'Full image archive with report'],
    image: '/factory/qua-01.png',
    badge: 'X-Ray', badgeColor: 'bg-cc-signal text-white',
  },
  {
    n: '04', tag: 'FUNCTIONAL TESTING',
    title: 'Boards can be powered on and verified against your spec.',
    desc: 'We perform functional testing using your test specification, test fixture, or firmware. Boards are powered up and tested for signal integrity, peripheral communication, power consumption, and custom pass/fail criteria. A test report can be provided based on project requirements.',
    specs: ['Power-on verification', 'Signal integrity check', 'Oscilloscope measurement', 'Custom test fixtures', 'Firmware loading', 'Pass/fail logged per unit'],
    image: '/factory/qua-02.png',
    badge: 'Test Plan', badgeColor: 'bg-cc-copper text-cc-ink',
  },
];

const STATS = [
  { n: 'DFM', label: 'Engineering review', sub: 'Before quotation' },
  { n: 'AOI', label: 'Inspection option', sub: 'For SMT builds' },
  { n: 'X-Ray', label: 'BGA inspection', sub: 'When required' },
  { n: 'Test', label: 'Report options', sub: 'Based on project needs' },
];

export default function QualityPage() {
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
              QUALITY CONTROL
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
              Quality steps documented.<br />
              <em className="not-italic text-cc-copper-soft">Every shipment documented.</em>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[680px] mx-auto">
              Four layers of quality control from incoming components to final shipment. Trained QC operators, modern inspection equipment, and full traceability on every order.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-cc-carbon px-[5vw] py-8">
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-start pl-[18px] border-l-2 border-cc-copper">
                <div className="text-2xl font-semibold text-white leading-none">{s.n}</div>
                <div className="text-xs text-white/70 mt-1 font-medium">{s.label}</div>
                <div className="text-[10px] text-white/40 mt-0.5 tracking-wide">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto space-y-5">
            {QC.map((q, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={q.n} className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-cc-line bg-cc-carbon-2 hover:shadow-lg transition-all duration-300 ${isEven ? '' : 'md:[&>*:first-child]:order-last'}`}>
                  <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                    <Image src={q.image} alt={q.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-cc-carbon-2/20 group-hover:bg-cc-carbon-2/10 transition-colors duration-300" />
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      <div className="w-10 h-10 rounded-xl bg-cc-copper/100 backdrop-blur border border-white/20 flex items-center justify-center text-white text-[13px] font-bold">{q.n}</div>
                      <div className={`text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full inline-block ${q.badgeColor}`}>{q.badge}</div>
                    </div>
                    <div className="absolute bottom-5 left-5 text-[9px] text-white/60 tracking-[0.2em] font-medium">{q.tag}</div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="text-[10px] text-cc-ink/50 font-semibold tracking-[0.18em] mb-3">QC STAGE {q.n}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-cc-ink leading-tight mb-4">{q.title}</h2>
                    <p className="text-sm text-cc-ink-mute leading-relaxed mb-5">{q.desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.specs.map((s, si) => (
                        <div key={si} className="flex items-center gap-2 text-xs text-cc-ink-mute">
                          <span className="w-1.5 h-1.5 rounded-full bg-cc-signal flex-shrink-0" />{s}
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
            <div className="absolute -top-[80px] -right-[80px] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: '#9EE34F', filter: 'blur(60px)' }} />
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Want to discuss your quality requirements?</h2>
            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-[500px] mx-auto">Tell us your IPC class, test spec, and any custom requirements. We&apos;ll confirm what&apos;s covered in our standard process and what needs a custom setup.</p>
            <TrackedLink href="/contact" eventName="quote_click" eventParams={{ location: 'quality_bottom_cta', destination: '/contact', button_text: 'Send us your requirements' }} className="inline-flex items-center gap-2 bg-cc-copper text-cc-ink text-sm font-semibold py-3 px-7 rounded-xl hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}>
              Send us your requirements →
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
