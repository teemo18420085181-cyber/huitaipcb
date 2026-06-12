import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { OG_IMAGES } from '@/lib/seo/og';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Huitai Electronics PCB assembly services, RFQ review, and project communication.',
  alternates: { canonical: 'https://huitaipcb.com/terms' },
  openGraph: { url: 'https://huitaipcb.com/terms', images: OG_IMAGES },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-[100px] min-h-screen bg-cc-carbon px-[5vw] py-14">
        <article className="max-w-[860px] mx-auto bg-cc-carbon-2 border border-cc-line rounded-2xl p-8 md:p-10">
          <div className="text-[11px] text-cc-ink font-semibold tracking-[0.16em] mb-3">LEGAL</div>
          <h1 className="text-3xl font-semibold text-cc-ink mb-5">Terms of Use</h1>
          <div className="space-y-5 text-sm text-cc-ink-mute leading-7">
            <p>
              This website provides information about Huitai Electronics PCB assembly services and allows customers to submit RFQ information for engineering review.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">Quotation Scope</h2>
            <p>
              Any quotation is based on the files and requirements provided by the customer. Lead time, component availability, testing scope, and pricing may change after engineering review, BOM verification, or customer-approved requirement updates.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">Customer Files</h2>
            <p>
              You are responsible for ensuring that submitted Gerber files, BOM lists, drawings, and related documents are accurate and that you have the right to share them for quotation and manufacturing review.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">Manufacturing Requirements</h2>
            <p>
              IPC workmanship class, testing plans, inspection reports, packaging, and delivery requirements should be discussed before order confirmation. Requirements not included in the approved quotation may require separate review.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">Contact</h2>
            <p>
              Questions about these terms can be sent to <a href="mailto:sales@huitaipcb.com" className="text-cc-ink underline">sales@huitaipcb.com</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
