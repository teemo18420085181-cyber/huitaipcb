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
    <section className="py-[90px] px-[5vw] bg-white border-y border-line">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12 max-w-[680px]">
          <div className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-3.5">
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
            WHY TURNKEY?
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold text-brand-primary tracking-tight leading-tight">
            What changes when you stop{' '}
            <em className="not-italic text-brand-green-dark">
              managing suppliers separately.
            </em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div
            className="p-8 rounded-[14px] border"
            style={{ borderColor: '#F0C0BD', background: '#FCF1EE' }}
          >
            <div className="flex items-center gap-2.5 mb-5 pb-3.5 border-b border-black/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                <X size={14} strokeWidth={3} />
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: '#A32D2D' }}
              >
                Managing suppliers yourself
              </div>
            </div>
            {BAD_POINTS.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 py-2 text-[13px] leading-relaxed"
                style={{ color: '#7A2C2C' }}
              >
                <span className="flex-shrink-0 mt-0.5 text-sm">•</span>
                {p}
              </div>
            ))}
          </div>

          <div
            className="p-8 rounded-[14px] border"
            style={{
              borderColor: 'rgba(147,194,73,.4)',
              background: 'rgba(147,194,73,.06)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-5 pb-3.5 border-b border-black/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-brand-green text-white flex items-center justify-center flex-shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="text-sm font-semibold text-brand-green-dark">
                With OneStopPCBA turnkey
              </div>
            </div>
            {GOOD_POINTS.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 py-2 text-[13px] text-brand-primary leading-relaxed"
              >
                <span className="flex-shrink-0 mt-0.5 text-sm text-brand-green">
                  ●
                </span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
