import { MessageCircle, Upload } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import TrackedAnchor from '@/components/TrackedAnchor';

const CTA_POINTS = ['Gerber + BOM review', 'BOM shortage questions', 'Testing scope discussion', 'Email reply within 24h'];

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

      <div className="relative z-10 mx-auto max-w-[940px] text-center">
        <h2 className="font-display mb-4 text-3xl font-bold leading-tight tracking-tight text-cc-ink md:text-4xl lg:text-[42px]">
          Ready to send us your <span className="cc-copper-text">next project?</span>
        </h2>
        <p className="mx-auto mb-8 max-w-[560px] text-[15px] leading-relaxed text-cc-ink-mute">
          Upload your Gerber files and BOM. Our engineering team will review them and respond with
          the next questions within 24 hours by email, then confirm scope, sourcing, testing, and quotation details.
        </p>
        <div className="mx-auto mb-8 grid max-w-[780px] gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CTA_POINTS.map((item) => (
            <div key={item} className="rounded-xl border border-cc-line bg-cc-carbon/45 px-3 py-3 text-xs font-medium text-cc-ink-mute">
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <TrackedLink
            href="/contact#project-files"
            eventName="upload_gerber_bom_click"
            eventParams={{ location: 'final_cta', destination: '/contact#project-files' }}
            className="cc-copper-fill inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
            style={{ boxShadow: '0 8px 30px rgba(201,139,58,0.32)' }}
          >
            <Upload size={16} strokeWidth={2.5} />
            Upload Gerber &amp; BOM
          </TrackedLink>
          <TrackedAnchor
            href="https://wa.me/8618420085181?text=Hi%20Huitai%20Electronics%2C%20I%27d%20like%20to%20discuss%20a%20PCB%20assembly%20project."
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_click"
            eventParams={{ location: 'final_cta', contact_method: 'whatsapp' }}
            className="inline-flex items-center gap-2 rounded-[10px] border border-cc-copper/30 bg-cc-carbon/40 px-5 py-3.5 text-[13px] font-medium text-cc-ink transition-all hover:border-cc-copper/60"
          >
            <MessageCircle size={15} strokeWidth={2.5} className="text-cc-copper-soft" />
            Talk to Engineering
          </TrackedAnchor>
        </div>
      </div>
    </section>
  );
}
