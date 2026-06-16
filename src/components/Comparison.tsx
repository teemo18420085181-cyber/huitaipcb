import { Check, X } from 'lucide-react';

const BAD_POINTS = [
  'Coordinating several vendors for one PCBA project',
  'Component shortages discovered after the schedule is already tight',
  'Quality questions split across fabrication, sourcing, and assembly suppliers',
  'Engineering time spent chasing logistics instead of product work',
  'Different time zones, files, and communication threads for each supplier',
];

const GOOD_POINTS = [
  'One English-speaking project contact coordinates the full build',
  'BOM risk, sourcing options, and alternatives are reviewed for approval',
  'DFM, inspection, and testing scope are discussed before quotation',
  'Your team can focus on the product instead of supplier follow-up',
  'Shenzhen-based coordination for fabrication, sourcing, assembly, and delivery',
];

function PointRow({ children, good }: { children: string; good?: boolean }) {
  return (
    <div className={`flex items-start gap-2.5 py-2 text-[13px] leading-relaxed ${good ? 'text-cc-ink' : 'text-rose-200/75'}`}>
      <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${good ? 'bg-cc-signal' : 'bg-rose-300/70'}`} />
      {children}
    </div>
  );
}

export default function Comparison() {
  return (
    <section className="font-body-cc border-y border-cc-line px-[5vw] py-[90px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 max-w-[720px]">
          <div className="font-mono-cc mb-3.5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
            <span className="h-px w-[18px] bg-cc-copper" />
            WHY TURNKEY?
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-cc-ink md:text-4xl lg:text-[44px]">
            What changes when you stop{' '}
            <span className="cc-copper-text">managing suppliers separately.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[16px] border border-rose-500/25 bg-rose-500/[0.05] p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-rose-500/10 blur-3xl" />
            <div className="relative mb-5 flex items-center gap-2.5 border-b border-white/[0.06] pb-3.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-rose-500/90 text-white">
                <X size={14} strokeWidth={3} />
              </div>
              <div>
                <div className="text-sm font-semibold text-rose-300">Separate supplier management</div>
                <div className="mt-0.5 text-xs text-rose-200/55">More handoffs, more follow-up, more hidden risk.</div>
              </div>
            </div>
            <div className="relative">
              {BAD_POINTS.map((p) => (
                <PointRow key={p}>{p}</PointRow>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[16px] border border-cc-signal/30 bg-cc-signal/[0.05] p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cc-signal/10 blur-3xl" />
            <div className="relative mb-5 flex items-center gap-2.5 border-b border-white/[0.06] pb-3.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cc-signal/90 text-cc-carbon">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <div className="text-sm font-semibold text-cc-signal">With Huitai Electronics turnkey</div>
                <div className="mt-0.5 text-xs text-cc-ink-mute">One review path from files to finished PCBA delivery.</div>
              </div>
            </div>
            <div className="relative">
              {GOOD_POINTS.map((p) => (
                <PointRow key={p} good>
                  {p}
                </PointRow>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
