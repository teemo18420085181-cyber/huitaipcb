export const metadata = {
  title: 'Contact HuiTai Electronics | Free PCB Quote',
  description: 'Get a free PCB assembly quote from HuiTai Electronics. 24hr response. Shenzhen China. inquiry form, email and phone available.',
  alternates: { canonical: 'https://www.huitaipcb.com/contact' },
  openGraph: { title: 'Contact HuiTai Electronics | Free PCB Quote', description: 'Get a free PCB assembly quote from HuiTai Electronics. 24hr response. Shenzhen China. inquiry form, email and phone available.', url: 'https://www.huitaipcb.com/contact' },
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
                Upload your files. We&apos;ll respond within{' '}
                <em className="not-italic text-brand-green-dark">24 hours.</em>
              </h1>
              <p className="text-[15px] text-ink-muted leading-relaxed max-w-[640px] mx-auto">
                Send us your Gerber, BOM, and any reference photos. Our engineering
                team reviews every file before quoting 鈥?no automated black-box
                pricing.
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
