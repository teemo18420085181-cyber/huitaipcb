import { Upload } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="bg-brand-primary text-white py-20 px-[5vw] relative overflow-hidden">
      <div
        className="absolute -top-[200px] -right-[100px] w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: '#FCEA0B', filter: 'blur(120px)' }}
      />
      <div
        className="absolute -bottom-[200px] -left-[100px] w-[400px] h-[400px] rounded-full opacity-[0.12]"
        style={{ background: '#93C249', filter: 'blur(110px)' }}
      />

      <div className="max-w-[880px] mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-tight leading-tight mb-4">
          Ready to send us your{' '}
          <em className="not-italic text-brand-yellow">next project?</em>
        </h2>
        <p className="text-[15px] text-white/65 leading-relaxed max-w-[560px] mx-auto mb-8">
          Upload your Gerber files and BOM. Our engineering team will review them
          and respond within 24 hours with a full turnkey quote and lead time.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/contact"
            className="bg-brand-yellow text-brand-primary text-[13px] font-semibold py-3 px-6 rounded-[9px] cursor-pointer border-0 inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all"
            style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}
          >
            <Upload size={16} strokeWidth={2.5} />
            Upload Files Now
          </Link>
          <button className="bg-transparent text-white text-[13px] py-3 px-5 rounded-[10px] border border-white/20 cursor-pointer hover:border-white/40 transition-all">
            Talk to Engineering
          </button>
        </div>
      </div>
    </section>
  );
}
