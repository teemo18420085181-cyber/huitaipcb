'use client';

import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { V2Button } from '@/components/v2/Primitives';
import system from '@/components/v2/V2.module.css';
import styles from './Preview.module.css';

export function ButtonStates() {
  const [busy, setBusy] = useState(false);
  return (
    <>
      <div className={styles.controlRow}>
        <V2Button busy={busy} className={styles.demoButton}>
          {busy ? 'Reviewing files…' : 'Get PCBA Quote'}
          {!busy && <ArrowRight aria-hidden="true" className={system.arrow} />}
        </V2Button>
        <V2Button variant="quiet" aria-pressed={busy} onClick={() => setBusy(!busy)}>Toggle loading state</V2Button>
      </div>
      <div className={styles.controlRow}>
        <V2Button disabled>Unavailable</V2Button>
        <span className={system.status}><CheckCircle2 aria-hidden="true" />Ready for review</span>
      </div>
      <p role="status" className={`${system.caption} ${styles.demoNote}`}>
        {busy ? 'Loading example. The action is disabled until the state is reset.' : 'Interactive state examples only. No files or inquiries are sent.'}
      </p>
    </>
  );
}

export function MotionExample() {
  const sample = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const [message, setMessage] = useState('10px travel · 320ms · ease out');
  return (
    <div className={styles.motionPanel}>
      <div ref={sample} className={styles.motionSample}>
        <CheckCircle2 size={28} aria-hidden="true" />
        <div><strong>Scope comes before production.</strong><span className={system.caption}>A small movement. A clear response.</span></div>
      </div>
      <div className={system.actions}>
        <V2Button variant="secondary" onClick={(event) => {
          animation.current?.cancel();
          if (!sample.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches || event.detail === 0) {
            setMessage('Motion skipped for reduced motion or keyboard activation.');
            return;
          }
          const tokens = getComputedStyle(sample.current);
          animation.current = sample.current.animate([
            { opacity: 0, transform: `translateY(${tokens.getPropertyValue('--v2-reveal-distance').trim()})` },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: parseFloat(tokens.getPropertyValue('--v2-reveal-time')), easing: tokens.getPropertyValue('--v2-ease-out').trim() });
          setMessage('10px travel · 320ms · ease out');
        }}><RotateCcw aria-hidden="true" />Replay reveal</V2Button>
      </div>
      <p role="status" className={system.caption}>{message}</p>
    </div>
  );
}
