import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import system from './V2.module.css';
import brand from './V3Brand.module.css';

const principles = [
  {
    title: 'Review Before Production',
    description: 'We review manufacturing files, BOM risks and project requirements before production begins.',
    behavior: 'Gerber / BOM / CPL / build requirements',
  },
  {
    title: 'Confirm Before Substitution',
    description: 'Component alternatives and material changes are discussed and confirmed before they enter the build.',
    behavior: 'Alternative parts / BOM revision',
  },
  {
    title: 'Test Before Delivery',
    description: 'Inspection, programming and functional testing are defined for the project before shipment.',
    behavior: 'AOI / X-ray where applicable / functional test',
  },
  {
    title: 'Support From Prototype to Production',
    description: 'The same project can move from prototype and low-volume builds into repeat production.',
    behavior: 'Prototype / low volume / repeat build',
  },
];

export function BrandPhilosophy({ preview = false }: { preview?: boolean }) {
  return (
    <section id="what-we-believe" aria-labelledby="brand-philosophy-title" className={brand.philosophy}>
      <div className={`${system.container} ${brand.philosophyLayout}`}>
        <div className={brand.philosophyIntro}>
          <p className={`${system.label} ${brand.philosophyLabel}`}>What we believe · Manufacturing certainty</p>
          <h2 id="brand-philosophy-title" className={system.heading}>
            <span>Reduce Uncertainty</span> Before It Becomes Production Risk
          </h2>
          <p>A successful PCBA project is not only about placing components on a board. It is about identifying risks early, confirming changes before they affect the product, and verifying the result before production scales.</p>
          <p>That is how we approach manufacturing at Huitai PCB.</p>
          <Link href={preview ? '/v3/how-we-work' : '/how-we-work'} className={brand.philosophyLink}>See our manufacturing workflow <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className={brand.principleColumn}>
          <ol className={brand.principleRail}>
            {principles.map((principle, index) => (
              <li key={principle.title} className={brand.principle}>
                <span className={brand.principleNumber}>0{index + 1}</span>
                <div className={brand.principleCopy}>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
                <p className={brand.principleBehavior}>{principle.behavior}</p>
              </li>
            ))}
          </ol>
          <p className={brand.principleSummary} aria-label="Review, confirm, test, scale">
            <span>Review</span><ArrowRight aria-hidden="true" /><span>Confirm</span><ArrowRight aria-hidden="true" /><span>Test</span><ArrowRight aria-hidden="true" /><span>Scale</span>
          </p>
        </div>
      </div>
    </section>
  );
}
