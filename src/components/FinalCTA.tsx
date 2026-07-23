import { ArrowRight, FileUp } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

const CTA_POINTS = [
  'Prototype orders from 5 sets',
  'Gerber and BOM review',
  'Testing scope discussion',
  'Prototype to production support',
];

export default function FinalCTA() {
  return (
    <section className="font-body-cc relative overflow-hidden bg-cc-carbon px-[5vw] py-20 text-cc-ink md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="relative mx-auto max-w-[980px] text-center">
        <div className="font-mono-cc mb-4 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
          START YOUR PCBA QUOTE
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[46px]">
          Send the files and requirements that define your build.
        </h2>
        <p className="mx-auto mt-4 max-w-[650px] text-[15px] leading-7 text-cc-ink-mute">
          Share your Gerber, BOM, quantity, project stage, and testing needs. Huitai will
          review the available information and follow up on the confirmed turnkey PCBA scope.
        </p>

        <div className="mx-auto mt-8 grid max-w-[820px] gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CTA_POINTS.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-medium text-cc-ink-mute"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid justify-center gap-3 sm:flex">
          <TrackedLink
            href="/contact#quote-form"
            eventName="quote_click"
            eventParams={{ location: 'final_cta', destination: '/contact#quote-form' }}
            className="cc-copper-fill inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            Request a Turnkey PCBA Quote
            <ArrowRight size={16} strokeWidth={2.4} />
          </TrackedLink>
          <TrackedLink
            href="/contact#project-files"
            eventName="upload_gerber_bom_click"
            eventParams={{ location: 'final_cta', destination: '/contact#project-files' }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-cc-ink transition-colors hover:border-cc-copper/60"
          >
            <FileUp size={16} strokeWidth={2.4} />
            Send Gerber &amp; BOM
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
