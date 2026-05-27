import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';

const FLOW = [
  {
    n: '01',
    tag: 'FILES RECEIVED',
    title: 'Send us your files — we handle the rest.',
    desc: 'Upload your Gerber files, BOM, and any reference photos. Our engineering team reviews the available files before quotation.',
    detail: 'Accepted: Gerber, BOM (.xlsx/.csv), sample boards, schematics, assembly notes',
    image: '/factory/flow-01.png',
    badge: 'Start here',
    badgeColor: 'bg-brand-yellow text-brand-primary',
  },
  {
    n: '02',
    tag: 'BOM SOURCING & IQC',
    title: 'We source every component. You approve the BOM.',
    desc: 'Our procurement team sources all components from authorized distributors. Every incoming reel goes through IQC inspection with barcode verification.',
    detail: 'BOM review · sourcing options · alternatives check',
    image: '/factory/flow-02.png',
    badge: 'Source review',
    badgeColor: 'bg-brand-green text-white',
  },
  {
    n: '03',
    tag: 'PCB FABRICATION',
    title: 'Your bare boards manufactured to spec.',
    desc: 'We fabricate 1–30 layer PCBs across a full range of substrate types. Whether your design calls for standard FR4, high-frequency Rogers, HDI micro-vias, rigid-flex, or aluminum MCPCB — we cover it. Every bare board is electrically tested before assembly.',
    detail: 'FR4 (TG130/170/180) · HDI · Rogers / PTFE · Rigid-flex · Aluminum MCPCB · Heavy copper · Impedance control',
    image: '/factory/flow-03.png',
    badge: 'Managed fab',
    badgeColor: 'bg-brand-primary text-white',
  },
  {
    n: '04',
    tag: 'SMT ASSEMBLY',
    title: 'Automated precision SMT placement.',
    desc: 'Components are placed using high-precision pick-and-place machines. We handle 01005 packages up to large BGAs. Lead-free reflow is standard. AOI inspection follows immediately.',
    detail: 'Min component: 01005 · BGA · QFN · LGA · High-mix capable',
    image: '/factory/flow-04.png',
    badge: 'Automated',
    badgeColor: 'bg-brand-yellow text-brand-primary',
  },
  {
    n: '05',
    tag: 'THROUGH-HOLE & POST-SOLDERING',
    title: 'DIP, connectors, and hand soldering.',
    desc: 'Through-hole components are inserted and hand-soldered or wave-soldered after SMT. Workmanship requirements can be discussed based on project needs.',
    detail: 'Wave solder · Selective solder · Hand solder · IPC-J-STD-001',
    image: '/factory/flow-05.png',
    badge: 'Expert operators',
    badgeColor: 'bg-brand-green text-white',
  },
  {
    n: '06',
    tag: 'INSPECTION & TESTING',
    title: 'Testing planned around your project.',
    desc: 'AOI catches missing or misaligned components. X-Ray verifies hidden solder joints on BGAs. Flying probe or ICT confirms electrical continuity. Functional testing validates board operation.',
    detail: 'AOI · X-Ray · Flying probe · ICT · Functional test · Visual QC',
    image: '/factory/flow-06.png',
    badge: 'Test plan',
    badgeColor: 'bg-brand-primary text-white',
  },
  {
    n: '07',
    tag: 'BOX BUILD & FINAL ASSEMBLY',
    title: 'From boards to finished products.',
    desc: 'We install boards into enclosures, route cable harnesses, and perform final product integration. Finished goods ready for your customers — no further work needed.',
    detail: 'Enclosure mounting · Cable harnessing · Firmware flashing · Final QC',
    image: '/factory/flow-07.png',
    badge: 'Turnkey finish',
    badgeColor: 'bg-brand-yellow text-brand-primary',
  },
  {
    n: '08',
    tag: 'PACKAGING & SHIPPING',
    title: 'Shipped to your door with full documentation.',
    desc: 'Boards are anti-static packaged, foam-separated, and prepared with project documentation for DHL, FedEx, or customer-specified delivery.',
    detail: 'Anti-static bags · Foam protection · Test report included · DHL / FedEx tracked',
    image: '/factory/flow-08.png',
    badge: 'Global delivery',
    badgeColor: 'bg-brand-green text-white',
  },
];

export default function FlowShowcase() {
  return (
    <section className="py-[90px] px-[5vw] bg-bg-muted border-y border-line">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-4">
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
            ONE TEAM · FULL PROCESS
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold text-brand-primary tracking-tight leading-tight mb-4">
            From your files to{' '}
            <em className="not-italic text-brand-green-dark">finished boards</em>,
            <br className="hidden md:block" /> step by step.
          </h2>
          <p className="text-[15px] text-ink-muted max-w-[620px] mx-auto leading-relaxed">
            This is what happens after you send us your Gerber files. Every step
            coordinated by one engineering contact — no hand-offs, no gaps.
          </p>
        </div>

        <div className="space-y-5">
          {FLOW.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={step.n}
                className={`group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-line bg-white hover:shadow-lg transition-all duration-300 ${
                  isEven ? '' : 'md:[&>*:first-child]:order-last'
                }`}
              >
                <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-brand-primary/25 group-hover:bg-brand-primary/15 transition-colors duration-300" />
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/80 backdrop-blur border border-white/20 flex items-center justify-center text-white text-[13px] font-bold">
                      {step.n}
                    </div>
                    <div className={`text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full inline-block ${step.badgeColor}`}>
                      {step.badge}
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 text-[9px] text-white/60 tracking-[0.2em] font-medium">
                    {step.tag}
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="text-[10px] text-brand-primary/50 font-semibold tracking-[0.18em] mb-3">
                    STEP {step.n}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-primary leading-tight mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-5">
                    {step.desc}
                  </p>
                  <div className="bg-bg-muted rounded-lg px-4 py-3 text-xs text-ink-muted border border-line">
                    <span className="font-medium text-brand-primary">Details: </span>
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <p className="text-sm text-ink-muted mb-5">
            Ready to see how this works for your project?
          </p>
          <TrackedLink
            href="/contact"
            eventName="click_upload_gerber_bom"
            eventParams={{ location: 'home_flow_showcase', destination: '/contact' }}
            className="inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-semibold py-3.5 px-8 rounded-xl hover:bg-brand-primary-light hover:-translate-y-0.5 transition-all"
            style={{ boxShadow: '0 4px 24px rgba(39,33,91,.25)' }}
          >
            Upload Gerber &amp; BOM →
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
