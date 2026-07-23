import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const QUALITY_STEPS = [
  'Inspection requirements reviewed with the project files',
  'AOI or X-ray applied when appropriate to the assembly scope',
  'Electrical or functional testing based on customer requirements',
  'Final review and packing before finished PCBA delivery',
];

export default function QualityTesting() {
  return (
    <section className="font-body-cc bg-cc-mist px-[5vw] py-20 text-cc-heading md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-cc-card sm:min-h-[470px]">
          <Image
            src="/images/china-pcba-manufacturer/pcba-inspection-testing-real.jpg"
            alt="Technician inspecting PCBA boards during the testing workflow"
            fill
            quality={78}
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 44vw"
          />
        </div>

        <div>
          <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
            QUALITY &amp; TESTING
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[44px]">
            Define the inspection and test scope before production.
          </h2>
          <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-cc-body">
            Testing is not a generic badge. The required checks depend on the board,
            available fixtures or instructions, product risk, and the acceptance criteria
            agreed for the project.
          </p>

          <ul className="mt-7 grid gap-3">
            {QUALITY_STEPS.map((step) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-xl border border-cc-line-light bg-cc-card px-4 py-3.5 text-sm leading-6 text-cc-heading"
              >
                <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-cc-copper-ink" />
                {step}
              </li>
            ))}
          </ul>

          <Link
            href="/quality"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cc-heading underline decoration-cc-copper/50 underline-offset-4 hover:text-cc-copper-ink"
          >
            Review quality and testing
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
