import { Upload } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

export default function FinalCTA() {
  return (
    <section className="font-body-cc relative overflow-hidden border-t border-cc-line bg-cc-carbon-2 px-[5vw] py-24">
      <div
        className="pointer-events-none absolute -right-[100px] -top-[200px] h-[500px] w-[500px] rounded-full opacity-20"
        style={{ background: '#c98b3a', filter: 'blur(130px)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-[200px] -left-[100px] h-[400px] w-[400px] rounded-full opacity-[0.1]"
        style={{ background: '#9ee34f', filter: 'blur(120px)' }}
      />

      <div className="relative z-10 mx-auto max-w-[880px] text-center">
        <h2 className="font-display mb-4 text-3xl font-bold leading-tight tracking-tight text-cc-ink md:text-4xl lg:text-[42px]">
          Ready to send us your <span className="cc-copper-text">next project?</span>
        </h2>
        <p className="mx-auto mb-8 max-w-[560px] text-[15px] leading-relaxed text-cc-ink-mute">
          Upload your Gerber files and BOM. Our engineering team will review them and respond with
          the next questions, scope, and lead time for a full turnkey quote.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <TrackedLink
            href="/contact"
            eventName="upload_gerber_bom_click"
            eventParams={{ location: 'final_cta', destination: '/contact' }}
            className="cc-copper-fill inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
            style={{ boxShadow: '0 8px 30px rgba(201,139,58,0.32)' }}
          >
            <Upload size={16} strokeWidth={2.5} />
            Upload Gerber &amp; BOM
          </TrackedLink>
          <TrackedLink
            href="/contact"
            eventName="quote_click"
            eventParams={{ location: 'final_cta', destination: '/contact', button_text: 'Talk to Engineering' }}
            className="inline-flex items-center rounded-[10px] border border-cc-copper/30 bg-cc-carbon/40 px-5 py-3.5 text-[13px] font-medium text-cc-ink transition-all hover:border-cc-copper/60"
          >
            Talk to Engineering
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
