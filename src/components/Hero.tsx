import Image from 'next/image';
import { ArrowRight, CheckCircle2, FileUp } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

const PROJECT_SIGNALS = [
  'Prototype builds from 5 assembled boards',
  'Low-volume and repeat-production support',
  'Gerber, BOM, CPL, quantity, and test review',
];

export default function Hero() {
  return (
    <section className="cc-carbon-bg font-body-cc relative overflow-hidden px-[5vw] pb-16 pt-[104px] text-cc-ink md:pb-20 md:pt-[128px]">
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-white/5" />
      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
        <div>
          <div className="font-mono-cc mb-5 inline-flex items-center gap-2 rounded-full border border-cc-line bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-cc-copper-soft sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-cc-copper" />
            CUSTOM PCBA MANUFACTURING · SHENZHEN, CHINA
          </div>

          <h1 className="font-display max-w-[760px] text-[42px] font-extrabold leading-[1.02] tracking-[-0.035em] text-cc-ink sm:text-5xl md:text-[62px] lg:text-[56px] xl:text-[68px]">
            Custom PCBA Manufacturing for Prototype and Production
          </h1>

          <p className="mt-6 max-w-[650px] text-base leading-7 text-cc-ink-mute md:text-lg md:leading-8">
            From PCB fabrication and BOM sourcing to SMT/DIP assembly, inspection, testing and
            finished PCBA delivery, Huitai PCB supports custom electronics projects from first
            builds to repeat production.
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <TrackedLink
              href="/contact#quote-form"
              eventName="quote_click"
              eventParams={{ location: 'home_hero', destination: '/contact#quote-form' }}
              className="cc-copper-fill motion-press-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
            >
              Get PCBA Manufacturing Quote
              <ArrowRight size={16} strokeWidth={2.4} />
            </TrackedLink>
            <TrackedLink
              href="/contact#project-files"
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'home_hero', destination: '/contact#project-files' }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-cc-ink transition-colors hover:border-cc-copper/60 hover:bg-white/[0.06]"
            >
              <FileUp size={14} strokeWidth={2.4} />
              Send Gerber &amp; BOM
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            {PROJECT_SIGNALS.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm leading-5 text-cc-ink-mute">
                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-cc-copper" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-cc-carbon-2 shadow-2xl shadow-black/30 sm:min-h-[460px] lg:min-h-[590px]">
          <Image
            src="/images/homepage/manufacturing/hero-inspection-line.webp"
            alt="Operator inspecting PCBA assemblies on a production line"
            width={1272}
            height={1812}
            priority
            quality={82}
            className="absolute inset-0 h-full w-full object-cover"
            sizes="(max-width: 1024px) 90vw, 46vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="inline-flex rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cc-copper-soft backdrop-blur-sm">
              REAL PRODUCTION SCENE
            </div>
            <p className="mt-3 max-w-[430px] text-sm leading-6 text-white/80">
              SMT assembly is coordinated with PCB fabrication, component sourcing,
              inspection, testing, and finished PCBA delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
