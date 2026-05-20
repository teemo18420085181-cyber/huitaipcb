import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Huitai Electronics PCB assembly services, RFQ review, and project communication.',
  alternates: { canonical: 'https://huitaipcb.com/terms' },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-[100px] min-h-screen bg-bg px-[5vw] py-14">
        <article className="max-w-[860px] mx-auto bg-white border border-line rounded-2xl p-8 md:p-10">
          <div className="text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-3">LEGAL</div>
          <h1 className="text-3xl font-semibold text-brand-primary mb-5">Terms of Use</h1>
          <div className="space-y-5 text-sm text-ink-muted leading-7">
            <p>
              This website provides information about Huitai Electronics PCB assembly services and allows customers to submit RFQ information for engineering review.
            </p>
            <h2 className="text-lg font-semibold text-brand-primary">Quotation Scope</h2>
            <p>
              Any quotation is based on the files and requirements provided by the customer. Lead time, component availability, testing scope, and pricing may change after engineering review, BOM verification, or customer-approved requirement updates.
            </p>
            <h2 className="text-lg font-semibold text-brand-primary">Customer Files</h2>
            <p>
              You are responsible for ensuring that submitted Gerber files, BOM lists, drawings, and related documents are accurate and that you have the right to share them for quotation and manufacturing review.
            </p>
            <h2 className="text-lg font-semibold text-brand-primary">Manufacturing Requirements</h2>
            <p>
              IPC workmanship class, testing plans, inspection reports, packaging, and delivery requirements should be discussed before order confirmation. Requirements not included in the approved quotation may require separate review.
            </p>
            <h2 className="text-lg font-semibold text-brand-primary">Contact</h2>
            <p>
              Questions about these terms can be sent to <a href="mailto:teemo18420085181@gmail.com" className="text-brand-primary underline">teemo18420085181@gmail.com</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
