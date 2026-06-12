import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { OG_IMAGES } from '@/lib/seo/og';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Huitai Electronics PCB assembly inquiry and RFQ handling.',
  alternates: { canonical: 'https://huitaipcb.com/privacy' },
  openGraph: { url: 'https://huitaipcb.com/privacy', images: OG_IMAGES },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-[100px] min-h-screen bg-cc-carbon px-[5vw] py-14">
        <article className="max-w-[860px] mx-auto bg-cc-carbon-2 border border-cc-line rounded-2xl p-8 md:p-10">
          <div className="text-[11px] text-cc-ink font-semibold tracking-[0.16em] mb-3">LEGAL</div>
          <h1 className="text-3xl font-semibold text-cc-ink mb-5">Privacy Policy</h1>
          <div className="space-y-5 text-sm text-cc-ink-mute leading-7">
            <p>
              Huitai Electronics collects the information you submit through our RFQ and contact forms so our engineering and sales team can review your PCB assembly project and respond to your request.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">Information We Collect</h2>
            <p>
              We may collect your name, email, phone or WhatsApp number, company, country, project requirements, Gerber files, BOM lists, drawings, sample photos, and testing requirements.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">How We Use Information</h2>
            <p>
              We use submitted information only for quotation, engineering review, component sourcing checks, project communication, and order follow-up. We do not sell customer contact information.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">Project Files</h2>
            <p>
              Uploaded project files are used to evaluate manufacturability, sourcing requirements, assembly process, testing needs, and delivery scope. Access is limited to team members and manufacturing partners involved in reviewing or producing your project.
            </p>
            <h2 className="text-lg font-semibold text-cc-ink">Contact</h2>
            <p>
              For privacy questions or file removal requests, contact us at <a href="mailto:sales@huitaipcb.com" className="text-cc-ink underline">sales@huitaipcb.com</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
