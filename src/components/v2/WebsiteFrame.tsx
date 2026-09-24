import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import TrackedAnchor from '@/components/TrackedAnchor';
import TrackedLink from '@/components/TrackedLink';
import { COMPANY_PUBLIC_PROFILE, SITE } from '@/lib/site';
import { V2Link, V2Theme } from './Primitives';
import WebsiteNavigation from './WebsiteNavigation';
import WebsiteWhatsApp from './WebsiteWhatsApp';
import system from './V2.module.css';
import styles from './Website.module.css';

export default function WebsiteFrame({ children, preview = true }: { children: React.ReactNode; preview?: boolean }) {
  const homeHref = preview ? '/v3' : '/';
  const aboutHref = preview ? '/v3/about' : '/about';
  const workflowHref = preview ? '/v3/how-we-work' : '/how-we-work';
  const companyHref = preview ? '/v3/company' : '/company-verification';
  return (
    <V2Theme className={styles.website}>
      <a href="#website-main" className={system.skipLink}>Skip to content</a>
      {preview && <aside aria-label="Preview information" className={styles.reviewBar}>
        <div className={`${system.container} ${styles.reviewInner}`}>
          <span>V3 / Local preview</span>
          <div><Link href="/v3">Homepage</Link><Link href="/v3/company">Company</Link><Link href="/v2-design-system">Design system</Link></div>
        </div>
      </aside>}
      <WebsiteNavigation preview={preview} />
      <main id="website-main" tabIndex={-1}>{children}</main>
      <footer className={styles.footer}>
        <div className={system.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <Link href={homeHref} className={styles.wordmark}>{COMPANY_PUBLIC_PROFILE.brand.name}<span aria-hidden="true">.</span></Link>
              <p className={system.body}>{COMPANY_PUBLIC_PROFILE.brand.positioning}</p>
              <TrackedAnchor className={styles.textLink} href={`mailto:${SITE.email}`} eventName={preview ? undefined : 'email_click'} eventParams={{ location: 'footer' }}>{SITE.email}<ArrowUpRight size={16} aria-hidden="true" /></TrackedAnchor>
              {preview ? <WebsiteWhatsApp /> : <TrackedAnchor href={`https://wa.me/${SITE.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" eventName="whatsapp_click" eventParams={{ location: 'footer' }} className={styles.textLink}>WhatsApp: {SITE.phone}<ArrowUpRight size={16} aria-hidden="true" /></TrackedAnchor>}
              <div className={styles.footerLocation}>
                <span className={system.label}>Manufacturing facility</span>
                <address lang="zh-CN">{COMPANY_PUBLIC_PROFILE.manufacturer.facilityAddress}</address>
                <a className={styles.textLink} href={`https://www.google.com/maps/search/?api=1&query=${COMPANY_PUBLIC_PROFILE.manufacturer.facilityMapQuery}`} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" />Open in Google Maps<ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className={styles.footerLinks}><h2 className={system.label}>Manufacturing</h2><Link href="/prototype-pcb-assembly">Prototype assembly</Link><Link href="/low-volume-pcba-assembly">Low-volume assembly</Link><Link href="/turnkey-pcb-assembly">Turnkey PCBA</Link><Link href="/pcb-fabrication-and-assembly">PCB fabrication & assembly</Link></div>
            <div className={styles.footerLinks}><h2 className={system.label}>Start a conversation</h2><Link href={aboutHref}>About Huitai PCB</Link><Link href={workflowHref}>How we work</Link><Link href={companyHref}>Company verification</Link><Link href={`${homeHref}#project-files`}>Prepare your files</Link><TrackedLink href="/contact#quote-form" eventName={preview ? undefined : 'quote_click'} eventParams={{ location: 'footer', destination: '/contact#quote-form' }}>Request a quote</TrackedLink><Link href="/contact">Contact</Link><Link href="/knowledge">Manufacturing knowledge</Link></div>
          </div>
          <div className={styles.footerBottom}><span>© 2026 {COMPANY_PUBLIC_PROFILE.brand.name} · Shenzhen, China</span>{preview ? <span>Local review only · Quote links open the existing RFQ page</span> : <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>}</div>
        </div>
      </footer>
      {preview && <WebsiteWhatsApp floating />}
    </V2Theme>
  );
}

export function ProjectCta({ preview = false, location = 'project_final_cta', serviceHref, serviceLabel }: { preview?: boolean; location?: string; serviceHref?: string; serviceLabel?: string }) {
  return (
    <section className={`${styles.projectCta} ${system.dark}`} aria-labelledby="project-title">
      <div className={`${system.container} ${styles.ctaInner}`}>
        <div><p className={system.label}>Your next build</p><h2 id="project-title" className={system.heading}>Let’s start with<br />your project.</h2><p className={system.body}>Share your files, quantity and testing requirements so we can review the manufacturing scope.</p></div>
        <div className={styles.ctaActions}><V2Link href="/contact#quote-form" eventName={preview ? undefined : 'quote_click'} eventParams={{ location, destination: '/contact#quote-form' }}>Get PCBA Quote<ArrowRight aria-hidden="true" /></V2Link><V2Link href="/contact#project-files" variant="secondary" eventName={preview ? undefined : 'upload_gerber_bom_click'} eventParams={{ location, destination: '/contact#project-files' }}>Send Gerber & BOM<ArrowUpRight aria-hidden="true" /></V2Link>{serviceHref && <V2Link href={serviceHref} variant="quiet" eventName={preview ? undefined : 'service_click'} eventParams={{ location, destination: serviceHref }}>{serviceLabel || 'View service'}<ArrowRight aria-hidden="true" /></V2Link>}</div>
      </div>
    </section>
  );
}
