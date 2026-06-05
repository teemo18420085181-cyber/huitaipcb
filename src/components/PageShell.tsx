import { ArrowRight, Construction } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

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
    <main className="pt-[100px] min-h-screen bg-cc-carbon">
      {/* Hero */}
      <section className="relative px-[5vw] py-16 md:py-24 bg-cc-carbon-2 text-white overflow-hidden">
        <div
          className="absolute -top-[100px] right-[10%] w-[300px] h-[300px] rounded-full opacity-30"
          style={{ background: '#E6A85A', filter: 'blur(100px)' }}
        />
        <div
          className="absolute -bottom-[100px] left-[10%] w-[280px] h-[280px] rounded-full opacity-20"
          style={{ background: '#9EE34F', filter: 'blur(100px)' }}
        />
        <div className="relative z-10 max-w-[1080px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cc-copper/10 border border-cc-copper/40 text-cc-copper-soft text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
            <span
              className="w-1.5 h-1.5 rounded-full bg-cc-copper"
              style={{ boxShadow: '0 0 12px #E6A85A' }}
            />
            {eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
            {title}
            {titleHighlight && (
              <>
                <br />
                <em className="not-italic text-cc-copper-soft">{titleHighlight}</em>
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
                className="bg-cc-carbon-2 border border-cc-line rounded-[14px] p-6 hover:border-cc-copper/30-light transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-[10px] bg-cc-carbon-2 text-cc-copper-soft flex items-center justify-center text-xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-cc-ink mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-cc-ink-mute leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon banner */}
      <section className="px-[5vw] pb-24">
        <div className="max-w-[820px] mx-auto bg-cc-carbon-2 border border-cc-line rounded-2xl p-8 md:p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-cc-copper/15 text-cc-ink flex items-center justify-center mx-auto mb-5">
            <Construction size={22} strokeWidth={2} />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-cc-ink mb-3">
            More details coming soon
          </h2>
          <p className="text-sm text-cc-ink-mute leading-relaxed max-w-[520px] mx-auto mb-6">
            {comingSoonText}
          </p>
          <TrackedLink
            href="/contact"
            eventName="quote_click"
            eventParams={{ location: 'page_shell_placeholder', destination: '/contact', button_text: 'Send us your inquiry' }}
            className="inline-flex items-center gap-2 bg-cc-carbon-2 text-white text-sm font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-colors"
          >
            Send us your inquiry
            <ArrowRight size={15} strokeWidth={2.5} />
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
