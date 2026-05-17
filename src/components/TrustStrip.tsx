const STATS = [
  { n: '42', suffix: '+', label: 'Countries served' },
  { n: '500', suffix: '+', label: 'Projects delivered' },
  { n: '300', suffix: '+', label: 'Active clients' },
  { n: '24', suffix: 'h', label: 'Quote turnaround' },
];

export default function TrustStrip() {
  return (
    <section className="bg-brand-primary-dark py-8 px-[5vw] border-b border-white/[0.05]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-7">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-start pl-[18px] border-l-2 border-brand-yellow"
          >
            <div className="text-3xl font-semibold text-white leading-none">
              {s.n}
              <em className="not-italic text-lg text-brand-yellow font-medium">
                {s.suffix}
              </em>
            </div>
            <div className="text-[11px] text-white/50 mt-1.5 tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
