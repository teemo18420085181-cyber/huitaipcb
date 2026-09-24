import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, CircuitBoard, FileText, ListChecks, Package, Plus } from 'lucide-react';
import { COMPANY_PUBLIC_PROFILE as company } from '@/lib/site';
import { V2Link } from '@/components/v2/Primitives';
import { BrandPhilosophy } from '@/components/v2/BrandPhilosophy';
import { ProjectCta } from '@/components/v2/WebsiteFrame';
import system from '@/components/v2/V2.module.css';
import styles from '@/components/v2/Website.module.css';
import brand from '@/components/v2/V3Brand.module.css';

const builds = [
  { eyebrow: 'First build', title: 'Prototype assembly', description: 'Start with your Gerber, BOM and assembly files to evaluate the first physical build.', chips: ['Gerber & BOM', 'Engineering review', 'First build'], href: '/contact?stage=prototype#quote-form', label: 'Start prototype review' },
  { eyebrow: 'Small-run', title: 'Low-volume production', description: 'Plan a small production run around the current revision, material availability and assembly requirements.', chips: ['Material planning', 'Assembly scope', 'Small batch'], href: '/contact?stage=low-volume#quote-form', label: 'Plan a low-volume build' },
  { eyebrow: 'Repeat build', title: 'Repeat production', description: 'Prepare the next build with an approved revision, controlled component choices and a defined inspection and test scope.', chips: ['Approved revision', 'Controlled BOM', 'Repeat build'], href: '/contact?stage=repeat#quote-form', label: 'Prepare repeat production' },
];
const scope = [
  ['PCB fabrication', 'Board fabrication requirements reviewed alongside your assembly files and intended application.'],
  ['Component sourcing', 'BOM review and component sourcing as part of the project scope, with substitutions discussed before use.'],
  ['PCB assembly', 'SMT, DIP / through-hole assembly, manual soldering and finished assembly according to your build requirements.'],
  ['Inspection, testing & packing', 'AOI, X-ray, programming, functional testing and packing, with the required steps defined for each project.'],
];
const stages = [
  ['Review the files', 'Check Gerber, BOM, CPL and manufacturing requirements.'],
  ['Confirm changes', 'Resolve open questions and approve component alternatives.'],
  ['Build the PCBA', 'Handle PCB, sourcing, SMT / DIP and required assembly.'],
  ['Inspect & test', 'Apply the programming, inspection and test scope agreed for the project.'],
  ['Repeat with control', 'Carry approved files, BOM version and test scope into the next build.'],
];

export const homeFaqs = [
  { question: 'Can I start with a prototype?', answer: 'Yes. Prototype production is part of our manufacturing scope. Share your board files, BOM and intended quantity so the project requirements can be reviewed.' },
  { question: 'Which inspection and test steps are included?', answer: 'The test scope is confirmed for each project. Tell us whether you need AOI, X-ray, programming or functional testing, and provide the relevant instructions and acceptance criteria.' },
];

export default function V3Home({ preview = false }: { preview?: boolean }) {
  const companyHref = preview ? '/v3/company' : '/company-verification';
  const workflowHref = preview ? '/v3/how-we-work' : '/how-we-work';
  return (
    <>
      <div className={system.container}>
        <section aria-labelledby="home-title" className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={`${system.label} ${styles.eyebrow}`}>{company.brand.positioning}</p>
            <h1 id="home-title" className={`${system.display} ${styles.heroTitle}`}>Custom PCBA Manufacturing for Prototype and Production</h1>
            <p className={system.body}>One-stop PCBA manufacturing for customer-owned designs. Work directly with our Shenzhen manufacturing team on PCB fabrication, component sourcing, assembly and project-defined testing.</p>
            <div className={`${system.actions} ${styles.heroActions}`}><V2Link href="/contact#quote-form" eventName={preview ? undefined : 'quote_click'} eventParams={{ location: 'home_hero', destination: '/contact#quote-form' }}>Get PCBA Quote<ArrowRight aria-hidden="true" /></V2Link><V2Link href="/contact#project-files" variant="secondary" eventName={preview ? undefined : 'upload_gerber_bom_click'} eventParams={{ location: 'home_hero', destination: '/contact#project-files' }}>Send Gerber & BOM<ArrowUpRight aria-hidden="true" /></V2Link></div>
            <div className={styles.heroNote}><span><Check aria-hidden="true" />Direct manufacturing team</span><span><Check aria-hidden="true" />One confirmed project scope</span></div>
          </div>
          <figure className={styles.heroFigure}>
            <Image src="/images/homepage/manufacturing/hero-inspection-line.webp" alt="Operator reviewing a board at an inspection workstation" width={1272} height={1812} sizes="(min-width: 821px) 45vw, 92vw" priority className={styles.heroImage} />
            <figcaption className={styles.heroCaption}><div><span>Assembly & inspection</span>Manufacturing in practice.</div><CircuitBoard size={26} aria-hidden="true" /></figcaption>
          </figure>
        </section>
        <div className={styles.scopeStrip}><p>Your project, from board to build.</p>{['PCB fabrication', 'Component sourcing', 'Assembly', 'Testing'].map(item => <span key={item}><Check aria-hidden="true" />{item}</span>)}</div>

        <section aria-labelledby="builds-title" className={styles.section}>
          <div className={styles.sectionHead}><div><p className={`${system.label} ${styles.eyebrow}`}>Find your starting point</p><h2 id="builds-title" className={system.heading}>What stage is your project at today?</h2></div><p className={system.body}>From a first build to repeat production, choose the point that matches your current revision and requirements.</p></div>
          <ol className={brand.startingGrid}>{builds.map(({ eyebrow, title, description, chips, href, label }, index) => <li key={title} className={brand.startingStage}>
            <span className={brand.stageNode} aria-hidden="true">0{index + 1}</span>
            <Link href={href} className={brand.startingCard}>
              <span className={`${system.label} ${brand.stageEyebrow}`}>0{index + 1} / {eyebrow}</span>
              <h3 className={system.subheading}>{title}</h3>
              <p className={system.body}>{description}</p>
              <span className={brand.stageChips}>{chips.map(chip => <span key={chip}>{chip}</span>)}</span>
              <span className={brand.stageCta}>{label}<ArrowRight size={18} aria-hidden="true" /></span>
            </Link>
          </li>)}</ol>
        </section>
      </div>

      <section id="manufacturing" aria-labelledby="manufacturing-title" className={`${styles.section} ${styles.scopeSection}`}>
        <div className={`${system.container} ${styles.scopeLayout}`}>
          <div className={styles.scopeIntro}><p className={`${system.label} ${styles.eyebrow}`}>Manufacturing scope</p><h2 id="manufacturing-title" className={system.heading}>From PCB to finished PCBA.</h2><p className={system.body}>Our manufacturing team takes responsibility for the agreed build: PCB fabrication, component sourcing, SMT / DIP assembly, inspection and testing. The included steps are confirmed for each project.</p><Link href="/pcb-fabrication-and-assembly" className={styles.cardLink}>PCB fabrication & assembly<ArrowRight size={17} aria-hidden="true" /></Link><figure className={styles.scopeFeature}><Image src="/images/v3-preview/pcb-panel-process.jpg" alt="A panel of green printed circuit boards during fabrication" width={900} height={600} sizes="(min-width: 821px) 38vw, 92vw" /><figcaption className={system.caption}>PCB fabrication · Representative process photo</figcaption></figure></div>
          <ol className={styles.scopeList}>{scope.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3 className={system.subheading}>{title}</h3><p className={system.body}>{text}</p></div></li>)}</ol>
        </div>
      </section>

      <BrandPhilosophy preview={preview} />

      <div className={system.container}>
        <section id="process" aria-labelledby="process-title" className={styles.section}>
          <div className={styles.sectionHead}><div><p className={`${system.label} ${styles.eyebrow}`}>How we work</p><h2 id="process-title" className={system.heading}>Make the next step clear.</h2></div><p className={system.body}>Review, confirm, build and test before carrying an approved scope into repeat production.</p></div>
          <ol className={styles.processList}>{stages.map(([title, text], index) => <li key={title}><span className={styles.processNumber}>0{index + 1}</span><div><h3 className={system.subheading}>{title}</h3><p>{text}</p></div></li>)}</ol>
          <div className={styles.journeyTeaser}>
            <div><span className={system.label}>The physical production path</span><p>PCB fabrication <ArrowRight aria-hidden="true" /> Component preparation <ArrowRight aria-hidden="true" /> Assembly <ArrowRight aria-hidden="true" /> Testing <ArrowRight aria-hidden="true" /> Packing & shipment</p></div>
            <Link href={`${workflowHref}#production-journey`} className={styles.cardLink}>See the seven-step production journey<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </section>

        <section id="quality" aria-labelledby="quality-title" className={`${styles.section} ${styles.quality}`}>
          <div className={styles.sectionHead}><div><p className={`${system.label} ${styles.eyebrow}`}>Assembly & quality</p><h2 id="quality-title" className={system.heading}>Build the checks into the plan.</h2></div><p className={system.body}>Inspection and testing should reflect the board, components and intended function. Discuss the required checks before production starts.</p></div>
          <div className={styles.photoGrid}>
            <figure><div className={styles.photoFrame}><Image src="/images/homepage/manufacturing/smt-assembly-line.webp" alt="Operators working beside SMT assembly equipment" width={1272} height={494} sizes="(min-width: 601px) 55vw, 92vw" /></div><figcaption><span>01</span><p>SMT assembly</p></figcaption></figure>
            <figure><div className={styles.photoFrame}><Image src="/images/homepage/manufacturing/aoi-inspection-review.webp" alt="Operator reviewing inspection results at an AOI workstation" width={1272} height={920} sizes="(min-width: 601px) 38vw, 92vw" /></div><figcaption><span>02</span><p>Inspection review</p></figcaption></figure>
          </div>
          <div className={styles.qualityNotes}><div><h3 className={system.subheading}>Assembly inspection</h3><p className={system.body}>Discuss AOI and X-ray requirements in relation to your components and assembly.</p></div><div><h3 className={system.subheading}>Programming & function</h3><p className={system.body}>Provide firmware, test instructions and acceptance criteria where these steps are required.</p></div><div><h3 className={system.subheading}>Project-specific scope</h3><p className={system.body}>Confirm the inspection, testing and packing steps for the build being quoted.</p></div></div>
        </section>

        <section aria-labelledby="company-title" className={styles.companyBand}>
          <div><p className={system.label}>Behind the brand</p><h2 id="company-title" className={system.heading}>Know who you work with.</h2><p className={system.body}>{company.brand.name} is our customer-facing brand. See the distinct manufacturing and commercial roles behind your project.</p><Link href={companyHref} className={styles.cardLink}>Company verification<ArrowRight size={17} aria-hidden="true" /></Link></div>
          <div className={styles.roleSummary}><div><span className={system.label}>{company.manufacturer.role}</span><p lang="zh-CN">{company.manufacturer.name}</p></div><div><span className={system.label}>{company.commercial.role}</span><p lang="zh-CN">{company.commercial.name}</p></div></div>
        </section>

        <section id="project-files" aria-labelledby="files-title" className={styles.section}>
          <div className={styles.filesLayout}>
            <div><p className={`${system.label} ${styles.eyebrow}`}>Prepare your project</p><h2 id="files-title" className={system.heading}>A useful quote starts with clear files.</h2><p className={system.body}>Send the latest revision and tell us what you need built. If a requirement is still undecided, include it in your message for review.</p><V2Link href="/contact#project-files" variant="secondary" className={styles.businessNote} eventName={preview ? undefined : 'upload_gerber_bom_click'} eventParams={{ location: 'home_project_files', destination: '/contact#project-files' }}>Send Gerber & BOM<ArrowUpRight aria-hidden="true" /></V2Link></div>
            <ul className={styles.fileList}><li><FileText aria-hidden="true" /><div><h3>Gerber & board specification</h3><p>Include your PCB data, stack-up and fabrication requirements.</p></div></li><li><ListChecks aria-hidden="true" /><div><h3>BOM & placement data</h3><p>Part numbers, quantities and pick-and-place / CPL files.</p></div></li><li><Package aria-hidden="true" /><div><h3>Quantity & delivery needs</h3><p>Build quantity, target schedule and destination.</p></div></li><li><CircuitBoard aria-hidden="true" /><div><h3>Programming & testing</h3><p>Firmware, test instructions and any special assembly needs.</p></div></li></ul>
          </div>
          <div className={styles.faq}><h2 className={system.subheading}>Before you send your files.</h2><div>
            {homeFaqs.map(({ question, answer }) => <details key={question}><summary>{question}<Plus aria-hidden="true" /></summary><p className={system.body}>{answer}</p></details>)}
            <details><summary>Which company handles my order?<Plus aria-hidden="true" /></summary><p className={system.body}>Our manufacturing and commercial entities have distinct roles. <Link href={companyHref} className={styles.textLink}>View company verification<ArrowRight size={16} aria-hidden="true" /></Link></p></details>
          </div></div>
        </section>
      </div>
      <ProjectCta preview={preview} location="home_final_cta" />
    </>
  );
}
