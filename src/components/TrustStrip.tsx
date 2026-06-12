const STATS = [
  { n: '<24h', label: 'Engineering response target' },
  { n: 'NDA', label: 'Available on request' },
  { n: 'Proto', label: 'Prototype and low-volume support' },
  { n: 'Test', label: 'Planned to project scope' },
];

export default function TrustStrip() {
  return (
    <section className="cc-carbon-bg font-body-cc border-y border-cc-line px-[5vw] py-7">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-4 md:gap-7">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-start border-l-2 border-cc-copper pl-[18px]">
            <div className="font-display text-3xl font-bold leading-none text-cc-ink">{s.n}</div>
            <div className="font-mono-cc mt-2 text-[11px] tracking-wide text-cc-ink-mute">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
