import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PROCESS = [
  {
    n: '01',
    name: 'Review Gerber & BOM',
    desc: 'Check available files, quantity, component information, assembly notes, and test requirements.',
    href: '/pcba-quote-file-checklist',
  },
  {
    n: '02',
    name: 'Confirm build scope',
    desc: 'Align PCB specifications, BOM sourcing, approved alternatives, assembly method, and inspection plan.',
    href: '/how-we-work',
  },
  {
    n: '03',
    name: 'Fabricate the PCB',
    desc: 'Coordinate the bare board build to the confirmed material, stack-up, finish, and drawing requirements.',
    href: '/pcb-fabrication-and-assembly',
  },
  {
    n: '04',
    name: 'Assemble SMT & DIP',
    desc: 'Move the approved materials through SMT placement and any required through-hole assembly.',
    href: '/pcb-assembly-services',
  },
  {
    n: '05',
    name: 'Inspect & test',
    desc: 'Apply the inspection and test steps agreed for the project before final release.',
    href: '/pcba-testing-quality-control',
  },
  {
    n: '06',
    name: 'Pack & deliver',
    desc: 'Prepare the finished PCBA, project documents, anti-static packing, and shipment details.',
    href: '/contact',
  },
];

export default function ProcessGrid() {
  return (
    <section id="pcba-process" className="font-body-cc bg-cc-mist px-[5vw] py-20 text-cc-heading md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
              GERBER &amp; BOM TO FINISHED PCBA
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[44px]">
              A six-stage workflow with clear review points.
            </h2>
            <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-cc-body">
              The quotation starts with the files and decisions that affect the real build,
              then keeps fabrication, sourcing, assembly, and testing connected.
            </p>
          </div>
          <Link
            href="/how-we-work"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-cc-heading underline decoration-cc-copper/50 underline-offset-4 hover:text-cc-copper-ink"
          >
            See how we work
            <ArrowRight size={15} />
          </Link>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((step) => (
            <li key={step.n}>
              <Link
                href={step.href}
                className="group flex h-full min-h-[190px] flex-col rounded-2xl border border-cc-line-light bg-cc-card p-6 transition-transform hover:-translate-y-0.5"
              >
                <div className="font-mono-cc mb-8 text-sm font-bold text-cc-copper-ink">{step.n}</div>
                <h3 className="font-display text-lg font-bold text-cc-heading">{step.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-cc-body">{step.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cc-heading transition-colors group-hover:text-cc-copper-ink">
                  Review details <ArrowRight size={13} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
