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
  },
  {
    n: '02',
    tag: 'BOM SOURCING & IQC',
    title: 'We source every component. You approve the BOM.',
    desc: 'Our procurement team prioritizes authorized and franchised channels. Other sourcing options require customer approval, with incoming checks planned by project.',
    detail: 'BOM review · sourcing options · alternatives check',
    image: '/factory/flow-02.png',
    badge: 'Source review',
  },
  {
    n: '03',
    tag: 'PCB FABRICATION',
    title: 'Your bare boards manufactured to spec.',
    desc: 'We fabricate 1–30 layer PCBs across a full range of substrate types. Whether your design calls for standard FR4, high-frequency Rogers, HDI micro-vias, rigid-flex, or aluminum MCPCB — we cover it. Every bare board is electrically tested before assembly.',
    detail: 'FR4 (TG130/170/180) · HDI · Rogers / PTFE · Rigid-flex · Aluminum MCPCB · Heavy copper · Impedance control',
    image: '/factory/flow-03.png',
    badge: 'Managed fab',
  },
  {
    n: '04',
    tag: 'SMT ASSEMBLY',
    title: 'Automated precision SMT placement.',
    desc: 'Components are placed using high-precision pick-and-place machines. We handle 01005 packages up to large BGAs. Lead-free reflow is standard. AOI inspection follows immediately.',
    detail: 'Min component: 01005 · BGA · QFN · LGA · High-mix capable',
    image: '/factory/flow-04.png',
    badge: 'Automated',
  },
  {
    n: '05',
    tag: 'THROUGH-HOLE & POST-SOLDERING',
    title: 'DIP, connectors, and hand soldering.',
    desc: 'Through-hole components are inserted and hand-soldered or wave-soldered after SMT. Workmanship requirements can be discussed based on project needs.',
    detail: 'Wave solder · Selective solder · Hand solder · IPC-J-STD-001',
    image: '/factory/flow-05.png',
    badge: 'Expert operators',
  },
  {
    n: '06',
    tag: 'INSPECTION & TESTING',
    title: 'Testing planned around your project.',
    desc: 'AOI catches missing or misaligned components. X-Ray verifies hidden solder joints on BGAs. Flying probe or ICT confirms electrical continuity. Functional testing validates board operation.',
    detail: 'AOI · X-Ray · Flying probe · ICT · Functional test · Visual QC',
    image: '/factory/flow-06.png',
    badge: 'Test plan',
  },
  {
    n: '07',
    tag: 'BOX BUILD & FINAL ASSEMBLY',
    title: 'From boards to finished products.',
    desc: 'We install boards into enclosures, route cable harnesses, and perform final product integration. Finished goods ready for your customers — no further work needed.',
    detail: 'Enclosure mounting · Cable harnessing · Firmware flashing · Final QC',
    image: '/factory/flow-07.png',
    badge: 'Turnkey finish',
  },
  {
    n: '08',
    tag: 'PACKAGING & SHIPPING',
    title: 'Shipped with the agreed project documentation.',
    desc: 'Boards are anti-static packaged, foam-separated, and prepared with project documentation for DHL, FedEx, or customer-specified delivery.',
    detail: 'Anti-static bags · Foam protection · Documentation by scope · DHL / FedEx tracked',
    image: '/factory/flow-08.png',
    badge: 'Global delivery',
  },
];

export default function FlowShowcase() {
  return (
    <section className="font-body-cc border-y border-cc-line bg-cc-carbon-2 px-[5vw] py-[90px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 text-center">
          <div className="font-mono-cc mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
            <span className="h-px w-[18px] bg-cc-copper" />
            ONE TEAM · FULL PROCESS
            <span className="h-px w-[18px] bg-cc-copper" />
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold leading-tight tracking-tight text-cc-ink md:text-4xl lg:text-[44px]">
            From your files to <span className="cc-copper-text">finished boards</span>,
            <br className="hidden md:block" /> step by step.
          </h2>
          <p className="mx-auto max-w-[620px] text-[15px] leading-relaxed text-cc-ink-mute">
            This is what happens after you send us your Gerber files. Every step coordinated by one
            engineering contact — no hand-offs, no gaps.
          </p>
        </div>

        <div className="space-y-5">
          {FLOW.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={step.n}
                className={`group grid overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon transition-all duration-300 hover:border-cc-copper/30 md:grid-cols-2 ${
                  isEven ? '' : 'md:[&>*:first-child]:order-last'
                }`}
              >
                <div className="relative h-64 min-h-[280px] overflow-hidden md:h-auto">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-cc-carbon/45 transition-colors duration-300 group-hover:bg-cc-carbon/25" />
                  <div className="absolute left-5 top-5 flex flex-col gap-2">
                    <div className="font-mono-cc flex h-10 w-10 items-center justify-center rounded-xl border border-cc-copper/30 bg-cc-carbon/70 text-[13px] font-bold text-cc-copper-soft backdrop-blur">
                      {step.n}
                    </div>
                    <div className="cc-copper-fill font-mono-cc inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-widest">
                      {step.badge}
                    </div>
                  </div>
                  <div className="font-mono-cc absolute bottom-5 left-5 text-[9px] font-medium tracking-[0.2em] text-cc-ink/60">
                    {step.tag}
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="font-mono-cc mb-3 text-[10px] font-semibold tracking-[0.18em] text-cc-copper">
                    STEP {step.n}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold leading-tight text-cc-ink md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-cc-ink-mute">{step.desc}</p>
                  <div className="rounded-lg border border-cc-line bg-cc-carbon-3 px-4 py-3 text-xs text-cc-ink-mute">
                    <span className="font-mono-cc font-medium text-cc-copper-soft">Details: </span>
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="mb-5 text-sm text-cc-ink-mute">Ready to see how this works for your project?</p>
          <TrackedLink
            href="/contact"
            eventName="upload_gerber_bom_click"
            eventParams={{ location: 'home_flow_showcase', destination: '/contact' }}
            className="cc-copper-fill inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ boxShadow: '0 8px 30px rgba(201,139,58,0.3)' }}
          >
            Upload Gerber &amp; BOM →
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
