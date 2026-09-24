import { Check, ArrowRight, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY_PUBLIC_PROFILE as company, FACILITY_GOOGLE_MAP_EMBED_URL } from '@/lib/site';
import { V2Card, V2Link } from '@/components/v2/Primitives';
import { ProjectCta } from '@/components/v2/WebsiteFrame';
import system from '@/components/v2/V2.module.css';
import styles from '@/components/v2/Website.module.css';

export default function V3Company({ preview = false }: { preview?: boolean }) {
  const homeHref = preview ? '/v3' : '/';
  return (
    <>
      <div className={system.container}>
        <header className={styles.companyHero}>
          <div><p className={`${system.label} ${styles.eyebrow}`}>Know who you work with</p><h1 className={system.display}>Company verification.</h1></div>
          <p className={system.body}>One-stop PCBA manufacturing with direct access to our Shenzhen team. See the manufacturing and commercial roles behind your project.</p>
        </header>

        <section aria-labelledby="brand-title" className={styles.brandPanel}>
          <div><p className={system.label}>{company.brand.role}</p><h2 id="brand-title" className={system.heading}>{company.brand.name}</h2></div>
          <p className={system.body}>{company.brand.name} is the customer-facing brand for our PCBA manufacturing business. {company.brand.positioning}.</p>
        </section>

        <section aria-label="Company roles" className={styles.companyRoles}>
          <V2Card className={styles.entityCard}>
            <p className={system.label}>01 / Manufacturing</p>
            <h2 lang="zh-CN">{company.manufacturer.name}</h2>
            <p className={styles.entityRole}>{company.manufacturer.role}</p>
            <p className={system.body}>Carries out the current manufacturing business. The manufacturing scope and testing requirements are confirmed for each project.</p>
            <a href="#manufacturing-scope" className={styles.cardLink}>Explore manufacturing scope<ArrowRight size={17} aria-hidden="true" /></a>
          </V2Card>
          <V2Card className={styles.entityCard}>
            <p className={system.label}>02 / Commercial</p>
            <h2 lang="zh-CN">{company.commercial.name}</h2>
            <p className={styles.entityRole}>{company.commercial.role}</p>
            <p className={system.body}>Primarily handles:</p>
            <ul>{company.commercial.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
          </V2Card>
        </section>

        <section id="manufacturing-facility" aria-labelledby="facility-title" className={`${styles.section} ${styles.facility}`}>
          <div>
            <p className={`${system.label} ${styles.eyebrow}`}>Shenzhen, China</p>
            <h2 id="facility-title" className={system.heading}>Current manufacturing facility.</h2>
            <address lang="zh-CN">{company.manufacturer.facilityAddress}</address>
            <p className={`${system.body} ${styles.bodyNote}`}>The registered address and current production address of <span lang="zh-CN">{company.manufacturer.name}</span>.</p>
          </div>
          <div className={styles.mapFrame}>
            <iframe title="Huitai PCB manufacturing facility location in Shajing, Shenzhen"
              src={FACILITY_GOOGLE_MAP_EMBED_URL} loading="eager" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className={styles.facilityMap} />
            <a href={`https://www.google.com/maps/search/?api=1&query=${company.manufacturer.facilityMapQuery}`} target="_blank" rel="noopener noreferrer" className={styles.mapLocationCard}>
              <MapPin size={22} aria-hidden="true" />
              <span><strong>GX12 manufacturing facility</strong><small>Open location in Google Maps</small></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="manufacturing-scope" aria-labelledby="scope-title" className={`${styles.section} ${styles.quality}`}>
          <div className={styles.sectionHead}>
            <div><p className={`${system.label} ${styles.eyebrow}`}>Manufacturing scope</p><h2 id="scope-title" className={system.heading}>From PCB fabrication to finished assembly.</h2></div>
            <p className={system.body}>Use this scope as a starting point for discussion. The production process and inspection plan depend on your design and project requirements.</p>
          </div>
          <ul className={styles.capabilityGrid}>{company.manufacturer.scope.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          <p className={`${system.body} ${styles.businessNote}`}>For a project-specific review, include your board files, BOM, order quantity and required testing.</p>
        </section>
      </div>

      <section aria-labelledby="cooperation-title" className={`${styles.section} ${styles.cooperation}`}>
        <div className={system.container}>
          <div className={styles.sectionHead}>
            <div><p className={`${system.label} ${styles.eyebrow}`}>Before production</p><h2 id="cooperation-title" className={system.heading}>A clear starting point for cooperation.</h2></div>
            <p className={system.body}>Bring the technical scope and commercial requirements into the same conversation before placing an order.</p>
          </div>
          <div className={styles.cooperationGrid}>
            <article><span className={system.label}>01 / Project</span><h3 className={system.subheading}>Define the build.</h3><p className={system.body}>Share the design revision, quantity, component requirements and target schedule for review.</p></article>
            <article><span className={system.label}>02 / Commercial</span><h3 className={system.subheading}>Identify the entity.</h3><p className={system.body}>Check the contracting, payment and invoicing details against the commercial documents for your order.</p></article>
            <article><span className={system.label}>03 / Acceptance</span><h3 className={system.subheading}>Agree on testing.</h3><p className={system.body}>Specify programming files, functional test instructions, acceptance criteria and packing needs.</p></article>
          </div>
          <V2Link href={`${homeHref}#project-files`} variant="quiet" className={styles.businessNote}>Prepare your project files<ArrowRight aria-hidden="true" /></V2Link>
        </div>
      </section>
      <ProjectCta preview={preview} location="company_final_cta" />
    </>
  );
}
