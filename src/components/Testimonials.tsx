const TESTIMONIALS = [
  {
    quote:
      "We've worked with OneStopPCBA for over 18 months across 12 product revisions. Not a single shipment was late. Their DFM review caught a critical impedance issue that would have killed our launch timeline — and they flagged it the morning after we uploaded.",
    name: 'James T.',
    title: 'Hardware Lead',
    company: 'IoT Startup',
    country: '🇺🇸 Boston, USA',
    rating: 5,
  },
  {
    quote:
      "Getting quotes from Chinese manufacturers used to take a week of back-and-forth. With OneStopPCBA I upload files Monday morning and have a detailed quote and DFM report by Tuesday. That turnaround completely changed how we plan our sprints.",
    name: 'Lars B.',
    title: 'R&D Engineer',
    company: 'Embedded Systems',
    country: '🇩🇪 Munich, Germany',
    rating: 5,
  },
  {
    quote:
      'The test report they include with every shipment is more thorough than what I get from most local CMs. AOI screenshots, flying probe results, pass/fail logs per unit. Our internal QA audit takes half the time now.',
    name: 'Sarah M.',
    title: 'Engineering Manager',
    company: 'Industrial Electronics',
    country: '🇦🇺 Melbourne, Australia',
    rating: 5,
  },
  {
    quote:
      "We sent them a bare schematic for our first prototype run — no Gerber, no BOM, nothing finished. They helped us through DFM, sourced every component, and delivered 20 working boards. Exactly what a first-time hardware founder needs.",
    name: 'Rafael G.',
    title: 'Founder / CEO',
    company: 'Smart Energy Startup',
    country: '🇧🇷 São Paulo, Brazil',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-[90px] px-[5vw] bg-white border-t border-line">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-4">
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
            WHAT CUSTOMERS SAY
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-primary tracking-tight">
            Hardware teams trust us with{' '}
            <em className="not-italic text-brand-green-dark">real projects.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-bg-muted border border-line rounded-2xl p-7 flex flex-col gap-4 hover:border-brand-primary/20 hover:shadow-sm transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, si) => (
                  <span key={si} className="text-brand-yellow text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-ink leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-primary">{t.name}</div>
                  <div className="text-xs text-ink-muted">
                    {t.title} · {t.company}
                  </div>
                  <div className="text-xs text-ink-muted mt-0.5">{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div className="text-center mt-8 text-xs text-ink-muted">
          Reviews from hardware teams we&apos;ve worked with. Ask us for more references when you get in touch.
        </div>
      </div>
    </section>
  );
}
