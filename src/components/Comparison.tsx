import Link from 'next/link';
import { ArrowRight, Boxes, Check, Rocket } from 'lucide-react';

const SUPPORT_PATHS = [
  {
    eyebrow: 'PROTOTYPE SUPPORT',
    title: 'Start from 5 sets',
    description:
      'For design validation, first builds, and supplier qualification. Send the available files and note what still needs engineering review.',
    points: [
      'Prototype orders from 5 sets',
      'Gerber and BOM review before quotation',
      'Testing requirements discussed with the build scope',
    ],
    href: '/prototype-pcb-assembly',
    icon: Rocket,
  },
  {
    eyebrow: 'PRODUCTION SUPPORT',
    title: 'Move into repeat builds',
    description:
      'For low-volume and production projects that need the same fabrication, sourcing, assembly, and test decisions carried into the next build.',
    points: [
      'Low-volume and production support',
      'BOM sourcing tied to the approved build',
      'Inspection, packing, and delivery requirements aligned per project',
    ],
    href: '/low-volume-pcba-assembly',
    icon: Boxes,
  },
];

export default function Comparison() {
  return (
    <section className="font-body-cc bg-cc-paper px-[5vw] py-20 text-cc-heading md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 max-w-[780px]">
          <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
            PROTOTYPE TO PRODUCTION
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[44px]">
            Use the same turnkey path as your project develops.
          </h2>
          <p className="mt-4 max-w-[690px] text-[15px] leading-7 text-cc-body">
            Whether you are validating a new board or preparing repeat production, the quote
            should reflect the actual files, quantity, sourcing risks, and test requirements.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {SUPPORT_PATHS.map(({ eyebrow, title, description, points, href, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-cc-line-light bg-cc-card p-7 shadow-[0_12px_32px_rgba(17,22,28,0.04)] md:p-8"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono-cc text-[10px] font-semibold tracking-[0.16em] text-cc-copper-ink">
                    {eyebrow}
                  </div>
                  <h3 className="font-display mt-2 text-2xl font-bold text-cc-heading">{title}</h3>
                </div>
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cc-mist text-cc-copper-ink">
                  <Icon size={23} strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-sm leading-6 text-cc-body">{description}</p>
              <ul className="mt-6 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-cc-heading">
                    <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-cc-copper/15 text-cc-copper-ink">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cc-heading underline decoration-cc-copper/50 underline-offset-4 hover:text-cc-copper-ink"
              >
                Explore this build path
                <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-3 rounded-2xl bg-cc-heading p-5 text-cc-ink sm:grid-cols-2 md:p-6">
          <p className="text-sm leading-6">
            <strong className="text-cc-copper-soft">For hardware engineers:</strong>{' '}
            clarify files, DFM questions, assembly details, and test expectations.
          </p>
          <p className="text-sm leading-6">
            <strong className="text-cc-copper-soft">For procurement teams:</strong>{' '}
            align quantity, BOM sourcing, approved alternatives, and delivery scope.
          </p>
        </div>
      </div>
    </section>
  );
}
