const STATS = [
  {
    n: '24h',
    label: 'Email response',
    desc: 'Project emails and RFQ messages are replied to within 24 hours.',
  },
  {
    n: 'BOM',
    label: 'Sourcing risk check',
    desc: 'Obsolete, long-lead, and alternative components reviewed with customer approval.',
  },
  {
    n: 'NDA',
    label: 'Available on request',
    desc: 'Confidential project data can be shared under an agreed NDA before review.',
  },
  {
    n: 'TEST',
    label: 'Project-based scope',
    desc: 'Inspection and functional test requirements are discussed before quotation.',
  },
];

export default function TrustStrip() {
  return (
    <section className="cc-carbon-bg font-body-cc border-y border-cc-line px-[5vw] py-8">
      <div className="mx-auto grid max-w-[1280px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon-2/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cc-copper/35"
          >
            <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-cc-copper/10 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative mb-3 flex items-center justify-between">
              <div className="font-display text-3xl font-bold leading-none text-cc-ink">{s.n}</div>
              <span className="h-1.5 w-1.5 rounded-full bg-cc-signal shadow-[0_0_16px_rgba(158,227,79,0.45)]" />
            </div>
            <div className="relative font-mono-cc text-[11px] font-semibold tracking-wide text-cc-copper-soft">
              {s.label}
            </div>
            <p className="relative mt-2 text-xs leading-5 text-cc-ink-mute">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
