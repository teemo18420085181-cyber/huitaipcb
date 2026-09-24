import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ChevronDown, FileUp } from 'lucide-react';
import { V2Card, V2CardLink, V2Link, V2Theme } from '@/components/v2/Primitives';
import V2Navigation from '@/components/v2/Navigation';
import system from '@/components/v2/V2.module.css';
import styles from './Preview.module.css';
import { ButtonStates, MotionExample } from './InteractionExamples';
import FormExample from './FormExample';

const COLORS = [
  { name: 'Huitai Blue', value: '#27215B', role: 'Brand / structure' },
  { name: 'Huitai Yellow', value: '#FCEA0B', role: 'Primary action' },
  { name: 'Huitai Green', value: '#93C249', role: 'Status / detail' },
  { name: 'Warm White', value: '#FAFAF8', role: 'Page background' },
  { name: 'Deep Ink', value: '#202534', role: 'Text / hierarchy' },
];
const PATHS = [
  { n: '01', label: 'FIRST BUILDS', title: 'Prototype PCB Assembly', body: 'For first builds, engineering validation and design verification.', href: '/prototype-pcb-assembly' },
  { n: '02', label: 'SMALL-BATCH PRODUCTION', title: 'Low-Volume PCBA Assembly', body: 'For pilot runs, small batches and repeat builds after the design is substantially confirmed.', href: '/low-volume-pcba-assembly' },
  { n: '03', label: 'TURNKEY MANUFACTURING', title: 'Turnkey PCB Assembly', body: 'PCB fabrication, component sourcing, assembly and testing, with the scope confirmed for your project.', href: '/turnkey-pcb-assembly' },
];

export default function DesignSystemPreview() {
  // A production build always serves a real 404, regardless of query strings or request headers.
  if (process.env.NODE_ENV !== 'development') notFound();

  return (
    <V2Theme className={styles.preview}>
      <a href="#preview-main" className={system.skipLink}>Skip to content</a>
      <V2Navigation homeHref="/" quoteHref="/contact#quote-form" uploadHref="/contact#project-files" trackClicks={false}
        items={[{ label: 'Services', href: '/services' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Quality', href: '/quality' }, { label: 'Industries', href: '/industries' }, { label: 'Knowledge', href: '/knowledge' }]}
        languages={[{ label: 'EN', lang: 'en', href: '/', active: true }, { label: 'DE', lang: 'de', href: '/de' }]} />
      <main id="preview-main" tabIndex={-1}>
        <div className={system.container}>
          <div className={`${styles.notice} ${system.label}`}><span>Huitai / Website V3</span><span>Design system — Local preview</span></div>
          <section className={styles.intro} aria-labelledby="preview-title">
            <div className={styles.introText}>
              <div className={`${styles.introMeta} ${system.label}`}>Huitai PCB · PCBA Manufacturer in Shenzhen, China</div>
              <h1 id="preview-title" className={system.display}>Precision starts with clarity.</h1>
              <p className={system.body}>A quieter visual language for real manufacturing. Clear information, purposeful interaction, and the Huitai colors you already know.</p>
              <div className={system.actions}>
                <V2Link href="#components">Explore the components<ArrowDown size={16} aria-hidden="true" /></V2Link>
                <V2Link href="#in-context" variant="quiet">See it in context<ArrowRight aria-hidden="true" className={system.arrow} /></V2Link>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <Image src="/images/homepage/manufacturing/smt-assembly-line.webp" alt="Operators working beside SMT assembly equipment" width={1272} height={487} priority sizes="(min-width: 960px) 45vw, 92vw" className={styles.heroImage} />
              <figcaption className={`${styles.imageNote} ${system.label}`}><span>Existing manufacturing imagery</span><span>01 / SMT</span></figcaption>
            </figure>
          </section>
          <section id="foundations" className={`${system.section} ${styles.ruled}`} aria-labelledby="colors-title">
            <div className={styles.sectionHead}>
              <div className={`${system.label} ${styles.index}`}><span>01</span>Color & identity</div>
              <h2 id="colors-title" className={system.heading}>Recognizably Huitai.</h2>
              <p className={system.body}>Deep blue gives the page structure. Yellow makes the next step clear. Green adds a measured signal of progress.</p>
            </div>
            <div className={styles.palette}>
              {COLORS.map((color) => <div key={color.name} className={styles.swatch}>
                <div className={styles.color} style={{ background: color.value }} />
                <span className={styles.colorName}>{color.name}</span><span className={system.label}>{color.value}</span>
                <p className={system.caption}>{color.role}</p>
              </div>)}
            </div>
          </section>
          <section className={`${system.section} ${styles.ruled} ${styles.typeLayout}`} aria-labelledby="type-title">
            <div className={styles.sectionHead}>
              <div className={`${system.label} ${styles.index}`}><span>02</span>Typography & rhythm</div>
              <h2 id="type-title" className={system.heading}>Room to read.<br />A reason to keep going.</h2>
              <p className={system.body}>Three existing typefaces, each with a clear role. Hierarchy comes from weight, rhythm and space as much as size.</p>
            </div>
            <div className={styles.typeSamples}>
              <div className={styles.typeRow}><span className={system.label}>Display / Bricolage Grotesque</span><p className={`${system.display} ${styles.specimenDisplay}`}>From files to production.</p></div>
              <div className={styles.typeRow}><span className={system.label}>Section / Bricolage Grotesque</span><p className={system.subheading}>Review before production.</p></div>
              <div className={styles.typeRow}><span className={system.label}>Body / Hanken Grotesk</span><p className={system.body}>Share your Gerber, BOM and quantity so the manufacturing scope can be reviewed before quotation.</p></div>
              <div className={styles.typeRow}><span className={system.label}>Technical / JetBrains Mono</span><p className={system.label}>Gerber / BOM / CPL / Assembly drawing</p><p className={system.caption}>Caption — clear context, without competing for attention.</p></div>
            </div>
          </section>
          <section id="components" className={`${system.section} ${styles.ruled}`} aria-labelledby="components-title">
            <div className={styles.sectionHead}>
              <div className={`${system.label} ${styles.index}`}><span>03</span>Controls & feedback</div>
              <h2 id="components-title" className={system.heading}>One clear next step.</h2>
              <p className={system.body}>Primary and secondary actions stay consistent on light and dark surfaces. Try the loading state, keyboard focus and press feedback below.</p>
            </div>
            <div className={styles.componentLayout}>
              <div className={styles.componentSurface}>
                <h3 className={system.label}>Light surface</h3>
                <div className={styles.controlRow}><V2Link href="/contact#quote-form">Get PCBA Quote<ArrowRight className={system.arrow} aria-hidden="true" /></V2Link><V2Link href="/contact#project-files" variant="secondary"><FileUp aria-hidden="true" />Send Gerber & BOM</V2Link></div>
                <ButtonStates />
              </div>
              <div className={`${styles.componentSurface} ${styles.componentSurfaceDark} ${system.dark}`}>
                <h3 className={system.label}>Deep blue surface</h3>
                <div className={styles.controlRow}><V2Link href="/contact#quote-form">Get PCBA Quote<ArrowRight className={system.arrow} aria-hidden="true" /></V2Link><V2Link href="/contact#project-files" variant="secondary"><FileUp aria-hidden="true" />Send Gerber & BOM</V2Link></div>
                <ButtonStates />
              </div>
            </div>
          </section>
          <section id="in-context" className={`${system.section} ${styles.ruled}`} aria-labelledby="paths-title">
            <div className={styles.sectionHead}>
              <div className={`${system.label} ${styles.index}`}><span>04</span>Components in context</div>
              <h2 id="paths-title" className={system.heading}>Find your manufacturing path.</h2>
              <p className={system.body}>Card examples use existing service destinations. Prototype and low-volume describe build stages; turnkey describes the manufacturing scope.</p>
            </div>
            <div className={styles.cardGrid}>
              {PATHS.map((path) => <V2CardLink key={path.n} href={path.href} className={styles.pathCard}>
                <div className={`${styles.pathNumber} ${system.label}`}><span>{path.label}</span><span>{path.n}</span></div>
                <h3 className={system.subheading}>{path.title}</h3><p className={system.body}>{path.body}</p>
                <div className={styles.pathFooter}>Explore this service<ArrowRight size={18} aria-hidden="true" className={system.arrow} /></div>
              </V2CardLink>)}
            </div>
          </section>
          <section className={`${system.section} ${styles.ruled}`} aria-labelledby="materials-title">
            <div className={styles.sectionHead}>
              <div className={`${system.label} ${styles.index}`}><span>05</span>Material & motion</div>
              <h2 id="materials-title" className={system.heading}>Solid surfaces. Subtle responses.</h2>
              <p className={system.body}>Glass belongs in the navigation. Content gets solid surfaces. Movement provides feedback and respects reduced-motion preferences.</p>
            </div>
            <div className={styles.materialGrid}>
              <div className={`${system.dark} ${styles.principle}`}><span className={styles.principleMark} /><p className={system.label}>Brand principle / preview</p><h3 className={system.heading}>We help reduce uncertainty before production.</h3><p className={system.body}>Review the files. Confirm the scope.<br />Make the next step clear.</p></div>
              <V2Card><MotionExample /></V2Card>
            </div>
          </section>
          <section className={`${system.section} ${styles.ruled}`} aria-labelledby="details-title">
            <div className={styles.sectionHead}><div className={`${system.label} ${styles.index}`}><span>06</span>Disclosure & reading</div><h2 id="details-title" className={system.heading}>Answers, without the extra weight.</h2></div>
            <div className={styles.faq}>
              <details><summary>What files help define the manufacturing scope?<ChevronDown size={18} aria-hidden="true" /></summary><p className={system.body}>Gerber, BOM with MPNs, CPL or pick-and-place data, an assembly drawing, quantity, and any testing or programming requirements.</p></details>
              <details><summary>Does this preview change the live website?<ChevronDown size={18} aria-hidden="true" /></summary><p className={system.body}>This development-only page demonstrates the V3 evolution of the existing V2 components. Production adoption is a separate review.</p></details>
              <details><summary>What happens when reduced motion is enabled?<ChevronDown size={18} aria-hidden="true" /></summary><p className={system.body}>Movement and scaling are removed. Navigation, controls and answers remain available, with clear focus and state feedback.</p></details>
            </div>
          </section>
          <section id="forms" className={`${system.section} ${styles.ruled}`} aria-labelledby="forms-title">
            <div className={styles.sectionHead}><div className={`${system.label} ${styles.index}`}><span>07</span>Forms & clarity</div><h2 id="forms-title" className={system.heading}>A useful brief starts here.</h2><p className={system.body}>Visible labels, practical help and a clear completion state. The form keeps its native keyboard and validation behavior.</p></div>
            <V2Card><FormExample /></V2Card>
          </section>
          <section className={`${system.section} ${styles.ruled}`} aria-labelledby="table-title">
            <div className={styles.sectionHead}><div className={`${system.label} ${styles.index}`}><span>08</span>Technical information</div><h2 id="table-title" className={system.heading}>Easy to scan. Clear to act on.</h2></div>
            <div className={system.tableRegion} role="region" aria-label="Project input table" tabIndex={0}>
              <table className={system.table}><caption>Project inputs for scope review</caption><thead><tr><th scope="col">Input</th><th scope="col">What it defines</th><th scope="col">Useful detail</th></tr></thead><tbody>
                <tr><td>Gerber + drill files</td><td>PCB fabrication</td><td>Revision, stack-up and finish</td></tr>
                <tr><td>Bill of materials</td><td>Component sourcing</td><td>MPNs, quantities and approved alternatives</td></tr>
                <tr><td>Placement + assembly drawing</td><td>Assembly requirements</td><td>Orientation and special instructions</td></tr>
                <tr><td>Test specification</td><td>Programming and testing</td><td>Acceptance criteria and fixture requirements</td></tr>
              </tbody></table>
            </div>
          </section>
          <section className={`${system.section} ${styles.ruled}`} aria-labelledby="trust-title">
            <div className={styles.sectionHead}><div className={`${system.label} ${styles.index}`}><span>09</span>Trust through useful detail</div><h2 id="trust-title" className={system.heading}>Confidence comes from clarity.</h2><p className={system.body}>Explain what will be reviewed and agreed. Reserve certification and customer claims for evidence approved for publication.</p></div>
            <div className={system.trustGrid}>
              <article className={system.trustItem}><span className={system.label}>01 / Manufacturing scope</span><h3 className={system.subheading}>Define the build.</h3><p className={system.body}>Confirm the fabrication, assembly and finished-product requirements for the project.</p></article>
              <article className={system.trustItem}><span className={system.label}>02 / Engineering inputs</span><h3 className={system.subheading}>Review the details.</h3><p className={system.body}>Keep file revisions, component choices and programming instructions explicit.</p></article>
              <article className={system.trustItem}><span className={system.label}>03 / Acceptance criteria</span><h3 className={system.subheading}>Agree how to test.</h3><p className={system.body}>State the inspection and functional test requirements before production.</p></article>
            </div>
          </section>
          <footer className={styles.ruled}>
            <div className={system.footerGrid}><div><p className={system.subheading}>Huitai PCB</p><p className={system.body}>PCBA Manufacturer in Shenzhen, China</p><div className={system.actions} style={{ marginTop: 24 }}><V2Link href="#forms">Review a project<ArrowRight aria-hidden="true" /></V2Link></div></div><div className={system.footerLinks}><h3 className={system.label}>Manufacturing</h3><V2Link href="/prototype-pcb-assembly" variant="quiet">Prototype</V2Link><V2Link href="/low-volume-pcba-assembly" variant="quiet">Low-volume</V2Link><V2Link href="/turnkey-pcb-assembly" variant="quiet">Turnkey PCBA</V2Link></div><div className={system.footerLinks}><h3 className={system.label}>Project resources</h3><V2Link href="/pcba-quote-file-checklist" variant="quiet">File checklist</V2Link><V2Link href="/knowledge" variant="quiet">Knowledge</V2Link><V2Link href="#foundations" variant="quiet">Design foundations</V2Link></div></div>
            <div className={`${styles.footer} ${system.label}`}><span>Huitai PCB / V3 preview</span><span>Local preview · No analytics · No inquiry submission</span></div>
          </footer>
        </div>
      </main>
    </V2Theme>
  );
}
