'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { V2Button } from '@/components/v2/Primitives';
import system from '@/components/v2/V2.module.css';

export default function FormExample() {
  const [reviewed, setReviewed] = useState(false);
  return (
    <form onSubmit={(event) => { event.preventDefault(); setReviewed(true); }} onChange={() => setReviewed(false)}>
      <div className={system.formGrid}>
        <label className={system.field}>Work email<input className={system.input} type="email" name="preview-email" required placeholder="you@company.com" autoComplete="email" /></label>
        <label className={system.field}>Build stage<select className={system.input} name="preview-stage" defaultValue="prototype"><option value="prototype">Prototype</option><option value="low-volume">Low-volume production</option><option value="repeat">Repeat production</option></select></label>
        <label className={system.field}>Quantity<input className={system.input} type="number" name="preview-quantity" min="1" step="1" required placeholder="e.g. 100" aria-describedby="quantity-help" /><span id="quantity-help" className={system.fieldHelp}>Use a whole number for this example.</span></label>
        <label className={system.field}>Testing requirements<textarea className={system.input} name="preview-testing" rows={3} placeholder="Programming, functional test, or a test fixture…" /></label>
      </div>
      <div className={system.section} style={{ paddingBlock: 24, display: 'grid', gap: 20 }}>
        <label className={system.checkLabel}><input type="checkbox" required />I understand this is a local form example.</label>
        <div className={system.actions}><V2Button type="submit">Review these details</V2Button><span className={system.caption}>Local validation only. No inquiry is submitted.</span></div>
        <p role="status" className={system.caption}>{reviewed ? <span className={system.status}><CheckCircle2 aria-hidden="true" />Details complete. This preview has not sent your information.</span> : 'Required fields and keyboard focus are available in this example.'}</p>
      </div>
    </form>
  );
}
