import Link from 'next/link';
import { ArrowRight, Construction } from 'lucide-react';

interface PageShellProps {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description: string;
  comingSoonText?: string;
  features?: { icon: string; title: string; desc: string }[];
}

export default function PageShell({
  eyebrow,
  title,
  titleHighlight,
  description,
  comingSoonText = 'This section is being built. Detailed content coming soon — meanwhile, send us your inquiry and we\'ll cover everything in our reply.',
  features = [],
}: PageShellProps) {
  return (
    <main className="pt-[100px] min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative px-[5vw] py-16 md:py-24 bg-brand-primary text-white overflow-hidden">
        <div
          className="absolute -top-[100px] right-[10%] w-[300px] h-[300px] rounded-full opacity-30"
          style={{ background: '#FCEA0B', filter: 'blur(100px)' }}
        />
        <div
          className="absolute -bottom-[100px] left-[10%] w-[280px] h-[280px] rounded-full opacity-20"
          style={{ background: '#93C249', filter: 'blur(100px)' }}
        />
        <div className="relative z-10 max-w-[1080px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand-yellow"
              style={{ boxShadow: '0 0 12px #FCEA0B' }}
            />
            {eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
            {title}
            {titleHighlight && (
              <>
                <br />
                <em className="not-italic text-brand-yellow">{titleHighlight}</em>
              </>
            )}
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[680px] mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Features grid (optional) */}
      {features.length > 0 && (
        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white border border-line rounded-[14px] p-6 hover:border-brand-primary-light transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-[10px] bg-brand-primary text-brand-yellow flex items-center justify-center text-xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-brand-primary mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon banner */}
      <section className="px-[5vw] pb-24">
        <div className="max-w-[820px] mx-auto bg-white border border-line rounded-2xl p-8 md:p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-brand-yellow/15 text-brand-primary flex items-center justify-center mx-auto mb-5">
            <Construction size={22} strokeWidth={2} />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-brand-primary mb-3">
            More details coming soon
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed max-w-[520px] mx-auto mb-6">
            {comingSoonText}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-medium py-3 px-6 rounded-lg hover:bg-brand-primary-light transition-colors"
          >
            Send us your inquiry
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
