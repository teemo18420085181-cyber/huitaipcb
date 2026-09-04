import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeAnswer() {
  return (
    <section className="font-body-cc bg-cc-mist px-[5vw] py-14 text-cc-heading md:py-16">
      <div className="mx-auto grid max-w-[1180px] gap-6 border-l-2 border-cc-copper pl-6 md:grid-cols-[0.7fr_1.3fr] md:gap-12 md:pl-8">
        <div>
          <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
            DIRECT ANSWER
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            What Does Huitai PCB Provide?
          </h2>
        </div>
        <div>
          <p className="max-w-[760px] text-[15px] leading-7 text-cc-body md:text-base md:leading-8">
            Huitai PCB is a custom PCBA manufacturer supporting prototype, low-volume and
            repeat-production electronics projects. Manufacturing scope can include PCB
            fabrication, BOM sourcing, SMT and through-hole assembly, programming, AOI or X-ray
            inspection, electrical or functional testing, and finished PCBA delivery based on
            the customer&apos;s files and confirmed project requirements.
          </p>
          <Link
            href="/china-pcba-manufacturer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cc-heading underline decoration-cc-copper/50 underline-offset-4 hover:text-cc-copper-ink"
          >
            Review our China PCBA manufacturing approach
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
