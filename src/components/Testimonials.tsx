const EXPECTATIONS = [
  {
    title: 'Engineering review before quotation',
    description:
      'Available Gerber, BOM, placement, assembly, sample, and test information is reviewed to identify open requirements before a quote scope is confirmed.',
  },
  {
    title: 'Clear sourcing and substitution decisions',
    description:
      'BOM availability and alternatives can be reviewed, and substitutions require customer approval before purchasing.',
  },
  {
    title: 'Inspection, testing, and documentation by scope',
    description:
      'Inspection, testing support, and documentation are discussed before production and included according to the agreed project requirements.',
  },
  {
    title: 'One accountable PCBA workflow',
    description:
      'PCB fabrication, sourcing, SMT/DIP assembly, testing support, and finished PCBA delivery are coordinated as one managed workflow.',
  },
];

export default function Testimonials() {
  return (
    <section className="font-body-cc border-t border-cc-line bg-cc-carbon-2 px-[5vw] py-[90px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <div className="font-mono-cc mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
            <span className="h-px w-[18px] bg-cc-copper" />
            WHAT TO EXPECT
            <span className="h-px w-[18px] bg-cc-copper" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-cc-ink md:text-4xl">
            A clear process for <span className="cc-copper-text">real PCBA projects.</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {EXPECTATIONS.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-cc-line bg-cc-carbon p-7 transition-all duration-200 hover:border-cc-copper/30"
            >
              <div className="cc-copper-fill flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-base font-semibold text-cc-ink">{item.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-cc-ink-mute">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="font-mono-cc mt-8 text-center text-xs text-cc-ink-mute">
          Project scope, lead time, inspection, testing, and documentation are confirmed before
          quotation or production.
        </div>
      </div>
    </section>
  );
}
