export const metadata = {
  title: 'Request a PCB Assembly Quote | Upload Gerber & BOM',
  description: 'Request a PCB assembly quote from Huitai Electronics. Upload Gerber files, BOM lists, drawings, sample photos, and testing requirements for engineering review.',
  alternates: { canonical: 'https://huitaipcb.com/contact' },
  openGraph: {
    title: 'Request a PCB Assembly Quote | Upload Gerber & BOM',
    description: 'Request a PCB assembly quote from Huitai Electronics. Upload Gerber files, BOM lists, drawings, sample photos, and testing requirements for engineering review.',
    url: 'https://huitaipcb.com/contact',
  },
};

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-[100px] min-h-screen bg-bg">
        <section className="px-[5vw] py-12">
          <div className="max-w-[920px] mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-3.5">
                <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
                GET A QUOTE
              </div>
              <h1 className="text-3xl md:text-[40px] font-semibold text-brand-primary tracking-tight leading-tight mb-3">
                Get a PCB Assembly Quote
              </h1>
              <p className="text-[15px] text-ink-muted leading-relaxed max-w-[640px] mx-auto">
                Upload your Gerber files, BOM lists, PCB drawings, sample photos, or project requirements. Our engineering team reviews your files before quotation — no automated black-box pricing.
              </p>
              <p className="text-[13px] text-ink-muted leading-relaxed max-w-[620px] mx-auto mt-3">
                Not sure if your files are complete? Send what you have. Our team can review the available information and let you know what is missing.
              </p>
            </div>

            <InquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
