import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COMPANY_PUBLIC_PROFILE as company } from '@/lib/site';
import { V2Link } from '@/components/v2/Primitives';
import { BrandPhilosophy } from '@/components/v2/BrandPhilosophy';
import { ProjectCta } from '@/components/v2/WebsiteFrame';
import system from '@/components/v2/V2.module.css';
import styles from '@/components/v2/Website.module.css';
import brand from '@/components/v2/V3Brand.module.css';

const capabilities = [
  ['PCB fabrication & assembly', 'Define the board specification and assembly package together, including SMT, DIP / through-hole and manual assembly requirements.'],
  ['BOM sourcing', 'Review manufacturer part numbers, packages, availability and customer-approved alternatives before purchasing.'],
  ['Programming & testing', 'Confirm firmware, fixtures, procedures, power requirements and acceptance criteria for the testing included in your project.'],
];
const manufacturingFlow = [
  ['Your design', 'Gerber, BOM, CPL and project requirements'],
  ['Engineering review', 'Manufacturing questions and BOM risk'],
  ['PCB + components', 'Board specification and sourced materials'],
  ['SMT / DIP', 'Placement, through-hole and manual assembly as required'],
  ['Programming / testing', 'Project-defined inspection and functional checks'],
  ['Finished PCBA', 'Completed assembly prepared for delivery'],
];

export default function V3About({ preview = false }: { preview?: boolean }) {
  const workflowHref = preview ? '/v3/how-we-work' : '/how-we-work';
  const companyHref = preview ? '/v3/company' : '/company-verification';
  return (
    <>
      <div className={system.container}>
        <header className={`${styles.companyHero} ${brand.manufacturerHero}`}>
          <div className={brand.aboutIntro}><p className={`${system.label} ${styles.eyebrow}`}>{company.brand.positioning}</p><h1 className={system.display}>About Huitai PCB</h1><p>One-stop PCBA manufacturing for customer-owned designs, with direct access to the manufacturing team in Shenzhen.</p></div>
          <aside className={brand.trustPanel} aria-label="Manufacturer statement">
            <p className={`${system.label} ${brand.trustEyebrow}`}>Manufacturer-led PCBA</p>
            <h2>Direct PCBA manufacturing, one project path</h2>
            <p>Our Shenzhen manufacturing team reviews the full build scope with you: PCB fabrication, component sourcing, SMT / DIP assembly, programming, testing and finished assembly as required.</p>
            <ul><li>PCB fabrication</li><li>BOM sourcing</li><li>SMT / DIP assembly</li><li>Programming & testing</li><li>Finished assembly</li></ul>
          </aside>
        </header>

        <section aria-labelledby="about-build-title" className={`${styles.section} ${brand.manufacturingNarrative}`}>
          <figure className={brand.manufacturingPhoto}>
            <Image src="/images/v3-preview/smt-placement-process.webp" alt="Operator working beside SMT placement equipment on a production floor" width={1920} height={1280} sizes="(min-width: 821px) 46vw, 92vw" />
            <figcaption className={system.caption}>SMT production · Representative process photo</figcaption>
          </figure>
          <div className={brand.manufacturingCopy}>
            <p className={`${system.label} ${styles.eyebrow}`}>Your design, prepared for production</p>
            <h2 id="about-build-title" className={system.heading}>Bring the build details together.</h2>
            <p className={system.body}>Your files and requirements enter one manufacturing review, from the first engineering questions to assembled and tested PCBA.</p>
            <ol className={brand.manufacturingFlow}>{manufacturingFlow.map(([title, detail], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div></li>)}</ol>
            <div className={brand.manufacturingRoles}>
              <p><strong>We manufacture</strong><span>SMT / DIP and finished PCBA assembly</span></p>
              <p><strong>We source</strong><span>Electronic components and BOM materials</span></p>
              <p><strong>We verify</strong><span>Programming, inspection and testing as agreed</span></p>
            </div>
            <Link href={workflowHref} className={styles.cardLink}>See how project review works<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </section>

        <section aria-labelledby="about-capabilities-title" className={`${styles.section} ${styles.quality}`}>
          <div className={styles.sectionHead}><div><p className={`${system.label} ${styles.eyebrow}`}>Manufacturing capabilities</p><h2 id="about-capabilities-title" className={system.heading}>Start with the scope your board needs.</h2></div><p className={system.body}>From prototype and low-volume builds to repeat and mass production, the manufacturing process and testing requirements are confirmed for each project.</p></div>
          <div className={styles.cooperationGrid}>{capabilities.map(([title, text], index) => <article key={title}><span className={system.label}>0{index + 1} / Scope</span><h3 className={system.subheading}>{title}</h3><p className={system.body}>{text}</p></article>)}</div>
          <Link href={`${companyHref}#manufacturing-scope`} className={styles.cardLink}>View the full manufacturing scope<ArrowRight size={17} aria-hidden="true" /></Link>
        </section>
      </div>

      <section id="engineering-support" aria-labelledby="engineering-title" className={`${styles.section} ${styles.scopeSection}`}>
        <div className={`${system.container} ${styles.scopeLayout}`}>
          <div className={styles.scopeIntro}><p className={`${system.label} ${styles.eyebrow}`}>Engineering support</p><h2 id="engineering-title" className={system.heading}>Clarify the manufacturing handoff.</h2></div>
          <div className={styles.editorialBody}>
            <p className={system.body}>Engineering review covers file completeness, footprints, polarity, component alternatives, assembly constraints, programming and test requirements.</p>
            <p className={system.body}>You retain responsibility for the product definition, circuit design, system validation, certification and market decisions. Manufacturing review helps clarify what is needed to build and inspect the supplied design.</p>
            <V2Link href="/contact#project-files" variant="secondary" eventName={preview ? undefined : 'upload_gerber_bom_click'} eventParams={{ location: 'about_cta', destination: '/contact#project-files' }}>Send Gerber & BOM<ArrowRight aria-hidden="true" /></V2Link>
          </div>
        </div>
      </section>

      <BrandPhilosophy preview={preview} />
      <div className={system.container}>
        <section aria-labelledby="about-company-title" className={styles.companyBand}>
          <div><p className={system.label}>Company transparency</p><h2 id="about-company-title" className={system.heading}>A brand with clearly defined company roles.</h2><p className={system.body}>{company.brand.name} is the customer-facing brand. Manufacturing and commercial responsibilities are described separately on our company verification page.</p><Link href={companyHref} className={styles.cardLink}>View company verification<ArrowRight size={17} aria-hidden="true" /></Link></div>
          <div className={styles.roleSummary}><div><span className={system.label}>{company.manufacturer.role}</span><p lang="zh-CN">{company.manufacturer.name}</p></div><div><span className={system.label}>{company.commercial.role}</span><p lang="zh-CN">{company.commercial.name}</p></div></div>
        </section>
      </div>
      <ProjectCta preview={preview} location="about_final_cta" />
    </>
  );
}
