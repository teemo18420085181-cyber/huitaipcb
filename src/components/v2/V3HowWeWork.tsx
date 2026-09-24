import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText, ListChecks, Package, CircuitBoard, Plus } from 'lucide-react';
import { V2Link } from '@/components/v2/Primitives';
import { ProjectCta } from '@/components/v2/WebsiteFrame';
import system from '@/components/v2/V2.module.css';
import styles from '@/components/v2/Website.module.css';

const steps = [
  { title: 'Files arrive', text: 'Start with your current project files and the intended build. Missing information is recorded before it becomes a production assumption.', input: 'Gerber, BOM, CPL / placement data and assembly requirements.', decision: 'Identify missing files, version differences and quotation questions.' },
  { title: 'Engineering review', text: 'Review manufacturing feasibility, BOM risk and consistency between the files supplied for the build.', input: 'Latest revision, component part numbers, board specification and test instructions.', decision: 'Surface manufacturing constraints, sourcing risks and open technical questions.' },
  { title: 'Confirmation', text: 'Resolve open questions and confirm component alternatives or material changes before they enter the project.', input: 'Proposed alternatives, quantity, acceptance criteria and manufacturing requirements.', decision: 'Agree the build scope, BOM version and project-level changes.' },
  { title: 'Production', text: 'Handle the confirmed PCB, component sourcing, SMT and required DIP / manual assembly scope.', input: 'Approved revision, BOM and assembly instructions.', decision: 'Build to the manufacturing requirements confirmed for this order.' },
  { title: 'Verification', text: 'Apply the inspection, programming and functional test steps defined for the project before delivery.', input: 'Firmware, fixtures, inspection plan and pass/fail criteria where required.', decision: 'Review results against the agreed test scope; AOI does not replace functional testing.' },
  { title: 'Repeat production', text: 'For repeat orders, bring the approved files, component choices and test scope forward into the next build.', input: 'Approved files, BOM version, test scope and prior production history.', decision: 'Confirm changes before repeating or scaling the build.' },
];

const productionSteps = [
  { title: 'PCB fabrication', text: 'Confirm board material, stack-up, finish and fabrication requirements for the approved design.', image: '/images/v3-preview/pcb-wet-process.jpg', alt: 'Printed circuit boards passing through a wet-processing line', width: 1024, height: 768 },
  { title: 'Components prepared', text: 'Review the approved BOM, source parts and agree any alternatives before they enter the build.', image: '/images/v3-preview/component-reels.webp', alt: 'Component reels organized on storage racks', width: 600, height: 600 },
  { title: 'SMT assembly', text: 'Place and solder surface-mount components against the confirmed board and placement data.', image: '/images/v3-preview/smt-placement-process.webp', alt: 'Technician working beside SMT placement equipment', width: 1920, height: 1280 },
  { title: 'Through-hole & manual work', text: 'Add connectors and other parts that need DIP or manual assembly for this project.', image: '/images/v3-preview/through-hole-assembly-process.jpg', alt: 'Hands placing through-hole components on a circuit board', width: 800, height: 532 },
  { title: 'Inspection & testing', text: 'Inspect the assembly and carry out programming or functional tests where agreed for the build.', image: '/images/v3-preview/functional-test-fixture.jpg', alt: 'Circuit board aligned with a functional test fixture', width: 1154, height: 768 },
  { title: 'Finished assembly, if needed', text: 'Fit the PCBA into its enclosure or complete other final assembly when the product requires it.', image: '/images/v3-preview/finished-enclosure-assembly.jpg', alt: 'Worker fitting a printed circuit board into a plastic enclosure', width: 500, height: 496 },
  { title: 'Packing & shipment handoff', text: 'Pack boards to the agreed ESD and transit-protection needs. Confirm the quantity, destination and shipment details; share tracking when available.', image: '/images/homepage/manufacturing/anti-static-packing.webp', alt: 'Operator placing assembled boards into protective bags', width: 1400, height: 876 },
];

export const workflowFaqs = [
  { question: 'What if some files are missing?', answer: 'Share the available files and explain what is missing. Sample photos can help discussion, but do not replace the production data needed to build the board.' },
  { question: 'Can I begin with a smaller build?', answer: 'Prototype and low-volume production are part of our scope. Include your intended quantity so the files, assembly and testing needs can be reviewed before a repeat order.' },
  { question: 'Does AOI confirm that my product works?', answer: 'AOI reviews visible assembly conditions. Functional testing checks defined board behavior using the agreed firmware, fixture, inputs, outputs and pass/fail criteria. Confirm which checks your project requires.' },
];

export default function V3HowWeWork({ preview = false }: { preview?: boolean }) {
  const companyHref = preview ? '/v3/company' : '/company-verification';
  return (
    <>
      <div className={system.container}>
        <header className={`${styles.companyHero} ${styles.workflowHero}`}>
          <div><p className={`${system.label} ${styles.eyebrow}`}>Gerber & BOM to finished PCBA</p><h1 className={system.display}>How We Work With Overseas PCBA Buyers</h1></div>
          <div className={styles.editorialBody}><p className={system.body}>Work directly with our manufacturing team from file review to PCBA assembly and project-defined testing. Confirm the build scope before production, then carry approved decisions into repeat orders.</p><div className={system.actions}><V2Link href="/contact#quote-form" eventName={preview ? undefined : 'quote_click'} eventParams={{ location: 'how_we_work_hero', destination: '/contact#quote-form' }}>Send Your PCBA Files<ArrowRight aria-hidden="true" /></V2Link><V2Link href="/turnkey-pcb-assembly" variant="secondary" eventName={preview ? undefined : 'service_click'} eventParams={{ location: 'how_we_work_hero', destination: '/turnkey-pcb-assembly' }}>View Turnkey PCBA Service<ArrowRight aria-hidden="true" /></V2Link></div></div>
        </header>

        <section aria-labelledby="workflow-files-title" className={styles.section}>
          <div className={styles.filesLayout}>
            <div><p className={`${system.label} ${styles.eyebrow}`}>Before quotation</p><h2 id="workflow-files-title" className={system.heading}>Share the files behind the build.</h2><p className={system.body}>Send the latest revision and mark anything that is still undecided. Available files can be reviewed first; missing production data needs confirmation before manufacturing.</p><Link href="/pcba-quote-file-checklist" className={styles.cardLink}>Full quotation file checklist<ArrowRight size={17} aria-hidden="true" /></Link><figure className={styles.filesPhoto}><Image src="/images/v3-preview/board-review-illustration.jpg" alt="Technician comparing a printed circuit board panel with project information" width={6000} height={4000} sizes="(min-width: 821px) 42vw, 92vw" /><figcaption className={system.caption}>Project review · Representative process photo</figcaption></figure></div>
            <ul className={styles.fileList}>
              <li><FileText aria-hidden="true" /><div><h3>Board & assembly data</h3><p>Gerber, board specification, pick-and-place file and assembly drawing.</p></div></li>
              <li><ListChecks aria-hidden="true" /><div><h3>Bill of materials</h3><p>Manufacturer part numbers, packages and approved alternatives.</p></div></li>
              <li><CircuitBoard aria-hidden="true" /><div><h3>Programming & test requirements</h3><p>Firmware, test method, fixtures and acceptance criteria where required.</p></div></li>
              <li><Package aria-hidden="true" /><div><h3>Order requirements</h3><p>Prototype or batch quantity, target schedule, packing needs and destination.</p></div></li>
            </ul>
          </div>
        </section>

        <section id="workflow" aria-labelledby="workflow-title" className={`${styles.section} ${styles.quality} ${styles.workflowSection}`}>
          <div className={styles.sectionHead}><div><p className={`${system.label} ${styles.eyebrow}`}>Review → Confirm → Build → Test → Repeat</p><h2 id="workflow-title" className={system.heading}>Six stages. Clear decisions at each step.</h2></div><p className={system.body}>The exact process depends on your design, sourcing choices and agreed testing scope. Each stage makes the next manufacturing decision clearer.</p></div>
          <ol className={styles.workflowSteps}>{steps.map((step, index) => <li key={step.title}>
            <div className={styles.workflowStepTitle}><span className={styles.processNumber}>0{index + 1}</span><h3 className={system.subheading}>{step.title}</h3></div>
            <div className={styles.editorialBody}><p className={system.body}>{step.text}</p><dl className={styles.workflowFacts}><div><dt>Project inputs</dt><dd>{step.input}</dd></div><div><dt>Review focus</dt><dd>{step.decision}</dd></div></dl></div>
          </li>)}</ol>
        </section>

        <section id="production-journey" aria-labelledby="production-journey-title" className={`${styles.section} ${styles.productionJourney}`}>
          <div className={styles.sectionHead}><div><p className={`${system.label} ${styles.eyebrow}`}>The physical production path</p><h2 id="production-journey-title" className={system.heading}>From bare PCB to packed PCBA.</h2></div><p className={system.body}>Once the build scope is confirmed, these are the production steps a project may move through. The exact assembly, testing, finishing and packing requirements are agreed for each order.</p></div>
          <ol className={styles.productionJourneyGrid}>{productionSteps.map((step, index) => <li key={step.title}>
            <figure><Image src={step.image} alt={step.alt} width={step.width} height={step.height} sizes={index === productionSteps.length - 1 ? '(min-width: 821px) 42vw, 92vw' : '(min-width: 1101px) 28vw, (min-width: 601px) 44vw, 92vw'} /></figure>
            <div className={styles.productionJourneyCopy}><span className={styles.processNumber}>0{index + 1}</span><div><h3 className={system.subheading}>{step.title}</h3><p className={system.body}>{step.text}</p>{index === productionSteps.length - 1 && <ul className={styles.shipmentChecks}><li>ESD protection</li><li>Quantity check</li><li>Shipment details</li></ul>}</div></div>
          </li>)}</ol>
          <p className={`${system.caption} ${styles.processPhotoNote}`}>Representative process photos, not images of a specific Huitai order or facility. PCB fabrication and optional production steps are confirmed in the project scope.</p>
        </section>
      </div>

      <section aria-labelledby="updates-title" className={`${styles.section} ${styles.scopeSection}`}>
        <div className={system.container}>
          <div className={styles.sectionHead}><div><p className={`${system.label} ${styles.eyebrow}`}>Project communication</p><h2 id="updates-title" className={system.heading}>Discuss the updates your team needs.</h2></div><p className={system.body}>Agree on the milestones and records your team needs to see while the confirmed build moves toward shipment.</p></div>
          <ul className={styles.projectUpdates}><li>Component purchasing status</li><li>Production photos</li><li>Inspection notes</li><li>Packing photos & shipment tracking</li></ul>
          <p className={`${system.caption} ${styles.businessNote}`}>The updates and documentation included are confirmed for each project.</p>
        </div>
      </section>

      <div className={system.container}>
        <section aria-labelledby="workflow-questions-title" className={styles.section}>
          <div className={`${styles.faq} ${styles.workflowFaq}`}><h2 id="workflow-questions-title" className={system.subheading}>Questions before production.</h2><div>
            {workflowFaqs.map(({ question, answer }) => <details key={question}><summary>{question}<Plus aria-hidden="true" /></summary><p className={system.body}>{answer}</p></details>)}
            <details><summary>Where can I check the company roles?<Plus aria-hidden="true" /></summary><p className={system.body}>The company verification page identifies the customer-facing brand, manufacturing entity and commercial entity. <Link href={companyHref} className={styles.textLink}>View company verification<ArrowRight size={16} aria-hidden="true" /></Link></p></details>
          </div></div>
        </section>
      </div>
      <ProjectCta preview={preview} location="how_we_work_final_cta" serviceHref="/china-pcb-assembly" serviceLabel="View China PCB Assembly Service" />
    </>
  );
}
