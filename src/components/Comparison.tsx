import { X, Check } from 'lucide-react';

const BAD_POINTS = [
  'Coordinating 5–8 separate vendors per project',
  'Component shortages delay your entire schedule',
  'Quality disputes — no single owner accountable',
  'Engineering time wasted on logistics, not R&D',
  'Language and time-zone friction with every vendor',
];

const GOOD_POINTS = [
  'One English-speaking project engineer handles everything',
  'We review sourcing options, alternatives, and purchasing plans for your approval',
  'DFM review and test reporting based on project requirements',
  'Your team focuses on the product, not supply chain',
  'Shenzhen-based supply chain coordination',
];

export default function Comparison() {
  return (
    <section className="font-body-cc border-y border-cc-line px-[5vw] py-[90px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 max-w-[680px]">
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
          <div className="rounded-[14px] border border-rose-500/25 bg-rose-500/[0.05] p-8">
            <div className="mb-5 flex items-center gap-2.5 border-b border-white/[0.06] pb-3.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-rose-500/90 text-white">
                <X size={14} strokeWidth={3} />
              </div>
              <div className="text-sm font-semibold text-rose-300">Managing suppliers yourself</div>
            </div>
            {BAD_POINTS.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 text-[13px] leading-relaxed text-rose-200/70">
                <span className="mt-0.5 flex-shrink-0 text-sm">•</span>
                {p}
              </div>
            ))}
          </div>

          <div className="rounded-[14px] border border-cc-signal/30 bg-cc-signal/[0.05] p-8">
            <div className="mb-5 flex items-center gap-2.5 border-b border-white/[0.06] pb-3.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cc-signal/90 text-cc-carbon">
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="text-sm font-semibold text-cc-signal">With OneStopPCBA turnkey</div>
            </div>
            {GOOD_POINTS.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 text-[13px] leading-relaxed text-cc-ink">
                <span className="mt-0.5 flex-shrink-0 text-sm text-cc-signal">●</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
