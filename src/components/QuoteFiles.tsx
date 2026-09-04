import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const QUOTE_FILES = [
  { item: 'Gerber', purpose: 'PCB fabrication' },
  { item: 'BOM + MPN', purpose: 'Component sourcing' },
  { item: 'CPL', purpose: 'SMT placement' },
  { item: 'Assembly Drawing', purpose: 'Polarity and assembly reference' },
  { item: 'Quantity', purpose: 'Pricing and production planning' },
  { item: 'Testing Requirements', purpose: 'Inspection and testing scope' },
];

export default function QuoteFiles() {
  return (
    <section className="font-body-cc bg-cc-paper px-[5vw] py-20 text-cc-heading md:py-24">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
        <div>
          <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
            RFQ INPUTS
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            What Files Do You Need for a PCBA Quote?
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-cc-body">
            Send the latest available manufacturing package. If a file or test method is still
            being prepared, identify it so the open point can be reviewed before quotation.
          </p>
          <Link
            href="/pcba-quote-file-checklist"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cc-heading underline decoration-cc-copper/50 underline-offset-4 hover:text-cc-copper-ink"
          >
            Open the PCBA quote file checklist
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-cc-line-light bg-cc-card">
          <table className="hidden w-full border-collapse text-left md:table">
            <thead className="bg-cc-heading text-cc-ink">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold">File / Information</th>
                <th className="px-5 py-4 text-sm font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cc-line-light">
              {QUOTE_FILES.map((row) => (
                <tr key={row.item}>
                  <th scope="row" className="w-[38%] px-5 py-4 text-sm font-semibold text-cc-heading">
                    {row.item}
                  </th>
                  <td className="px-5 py-4 text-sm leading-6 text-cc-body">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="divide-y divide-cc-line-light md:hidden">
            {QUOTE_FILES.map((row) => (
              <div key={row.item} className="grid gap-1 px-5 py-4">
                <dt className="text-sm font-semibold text-cc-heading">{row.item}</dt>
                <dd className="text-sm leading-6 text-cc-body">{row.purpose}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
