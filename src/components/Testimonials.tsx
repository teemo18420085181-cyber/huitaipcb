const TESTIMONIALS = [
  {
    quote:
      "We've worked with Huitai Electronics for over 18 months across 12 product revisions. Not a single shipment was late. Their DFM review caught a critical impedance issue that would have killed our launch timeline — and they flagged it the morning after we uploaded.",
    name: 'Hardware startup customer, USA',
    title: '',
    company: '',
    country: '',
    rating: 5,
  },
  {
    quote:
      "Getting quotes from Chinese manufacturers used to take a week of back-and-forth. With Huitai Electronics I upload files Monday morning and have a detailed quote and DFM report by Tuesday. That turnaround completely changed how we plan our sprints.",
    name: 'Industrial electronics customer, Germany',
    title: '',
    company: '',
    country: '',
    rating: 5,
  },
  {
    quote:
      'The test report they include with every shipment is more thorough than what I get from most local CMs. AOI screenshots, flying probe results, pass/fail logs per unit. Our internal QA audit takes half the time now.',
    name: 'Engineering team, Australia',
    title: '',
    company: '',
    country: '',
    rating: 5,
  },
  {
    quote:
      "We sent them a bare schematic for our first prototype run — no Gerber, no BOM, nothing finished. They helped us through DFM, sourced every component, and delivered 20 working boards. Exactly what a first-time hardware founder needs.",
    name: 'Product founder, Brazil',
    title: '',
    company: '',
    country: '',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="font-body-cc border-t border-cc-line bg-cc-carbon-2 px-[5vw] py-[90px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <div className="font-mono-cc mb-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
            <span className="h-px w-[18px] bg-cc-copper" />
            WHAT CUSTOMERS SAY
            <span className="h-px w-[18px] bg-cc-copper" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-cc-ink md:text-4xl">
            Hardware teams trust us with <span className="cc-copper-text">real projects.</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-cc-line bg-cc-carbon p-7 transition-all duration-200 hover:border-cc-copper/30"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, si) => (
                  <span key={si} className="text-sm text-cc-copper-bright">
                    ★
                  </span>
                ))}
              </div>

              <blockquote className="flex-1 text-sm leading-relaxed text-cc-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 border-t border-cc-line pt-2">
                <div className="cc-copper-fill flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-cc-ink">{t.name}</div>
                  {(t.title || t.company) && (
                    <div className="text-xs text-cc-ink-mute">
                      {[t.title, t.company].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="font-mono-cc mt-8 text-center text-xs text-cc-ink-mute">
          Reviews from hardware teams we&apos;ve worked with. Ask us for more references when you get
          in touch.
        </div>
      </div>
    </section>
  );
}
