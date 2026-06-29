'use client';

import type { CSSProperties } from 'react';
import { Check, MessageCircle, Upload } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import TrackedAnchor from '@/components/TrackedAnchor';

const traceStyle = (len: number, delay = 0): CSSProperties =>
  ({ '--len': len, animationDelay: `${delay}s` } as CSSProperties);

const STEPS = [
  { step: '01', name: 'Files & DFM Review', meta: 'Files checked', status: 'done' },
  { step: '02', name: 'BOM Sourcing & IQC', meta: 'Risk items flagged', status: 'done' },
  { step: '03', name: 'PCB Fabrication', meta: 'Scope reviewed', status: 'done' },
  { step: '04', name: 'SMT / DIP Assembly', meta: 'Process planning', status: 'active' },
  { step: '05', name: 'Inspection & Testing', meta: 'By project scope', status: 'pending' },
  { step: '06', name: 'Packaging & Shipping', meta: 'After final review', status: 'pending' },
];

const REVIEW_NOTES = [
  { label: '24h email reply', desc: 'Project emails and RFQ questions are replied to within 24 hours' },
  { label: 'Engineering review', desc: 'DFM, BOM risk, and assembly scope checked before quotation' },
  { label: 'NDA on request', desc: 'Available before sharing sensitive project files' },
  { label: 'Testing by scope', desc: 'Inspection and test plans discussed project by project' },
];

const FILE_PROMPTS = [
  { label: 'Gerber / drill files', note: 'PCB fabrication data' },
  { label: 'BOM with MPNs', note: 'Parts, quantities, and alternatives' },
  { label: 'Quantity and schedule', note: 'Prototype or low-volume target' },
  { label: 'Testing notes', note: 'ICT, functional, or inspection needs' },
];

const REVIEW_FOCUS = ['Missing files', 'BOM shortage risk', 'Assembly process', 'Testing scope'];

function CircuitLayer() {
  return (
    <svg
      className="cc-trace pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="url(#ccGrad)" strokeWidth="1.5" opacity="0.55">
        <path style={traceStyle(1700)} d="M-20 210 H300 L360 270 H720 L780 210 H1180" />
        <path style={traceStyle(1500, 0.15)} d="M-20 640 H240 L300 580 H560 L620 640 H980 L1040 580 H1460" />
        <path style={traceStyle(900, 0.3)} d="M1120 -20 V160 L1180 220 V520" />
        <path style={traceStyle(700, 0.4)} d="M170 920 V700 L110 640 V360" />
      </g>
      {[
        [300, 210], [780, 210], [1180, 210], [620, 640], [1040, 580], [1180, 520], [110, 360],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" fill="#0a0b0d" stroke="#c98b3a" strokeWidth="1.5" opacity="0.7" />
      ))}
      <defs>
        <linearGradient id="ccGrad" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e6a85a" />
          <stop offset="1" stopColor="#7d5320" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="cc-carbon-bg font-body-cc relative flex flex-col justify-center overflow-hidden px-[5vw] pb-16 pt-[112px] text-cc-ink md:min-h-[86vh] md:pb-20 md:pt-[130px]">
      <CircuitLayer />
      <div className="pointer-events-none absolute left-1/2 top-24 hidden h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-cc-copper/10 blur-[120px] md:block" />
      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[360px] w-[360px] rounded-full bg-cc-signal/5 blur-[110px] md:block" />
      <div className="pointer-events-none absolute inset-x-0 top-[88px] hidden h-px bg-gradient-to-r from-transparent via-cc-copper/30 to-transparent md:block" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="flex flex-col items-start">
          <div
            className="cc-rise font-mono-cc mb-7 inline-flex items-center gap-2.5 rounded-full border border-cc-line bg-cc-carbon-2/60 px-3.5 py-1.5 text-[11px] tracking-[0.18em] text-cc-copper-soft"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="cc-via h-1.5 w-1.5 rounded-full bg-cc-copper-bright" />
            TURNKEY PCBA / SHENZHEN, CHINA
          </div>

          <h1
            className="cc-rise font-display mb-6 text-[40px] font-extrabold leading-[1.02] tracking-[-0.02em] md:text-6xl lg:text-[68px]"
            style={{ animationDelay: '0.28s' }}
          >
            From Gerber
            <br />
            to <span className="cc-copper-text">finished PCBA.</span>
          </h1>

          <p
            className="cc-rise mb-9 max-w-[540px] text-[15px] leading-relaxed text-cc-ink-mute"
            style={{ animationDelay: '0.4s' }}
          >
            Send Gerber files, BOM, samples, or incomplete project notes. We review
            missing data, BOM risk, assembly scope, and testing needs before quoting,
            then coordinate PCB fabrication, sourcing, SMT/DIP assembly, testing support,
            and finished PCBA delivery.
          </p>

          <div className="cc-rise mb-11 grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap" style={{ animationDelay: '0.52s' }}>
            <TrackedLink
              href="/contact#project-files"
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'home_hero', destination: '/contact#project-files' }}
              className="cc-copper-fill group inline-flex w-full items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[13px] font-semibold tracking-wide transition-all hover:-translate-y-0.5 sm:w-auto"
              style={{ boxShadow: '0 8px 30px rgba(201,139,58,0.32)' }}
            >
              <Upload size={16} strokeWidth={2.5} />
              Send Gerber + BOM for Review
            </TrackedLink>
            <TrackedAnchor
              href="https://wa.me/8618420085181?text=Hi%20Huitai%20Electronics%2C%20I%27d%20like%20to%20discuss%20a%20PCB%20assembly%20project."
              target="_blank"
              rel="noopener noreferrer"
              eventName="whatsapp_click"
              eventParams={{ location: 'home_hero', contact_method: 'whatsapp' }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-cc-copper/30 bg-cc-carbon-2/40 px-5 py-3.5 text-[13px] font-medium text-cc-ink transition-all hover:border-cc-copper/60 hover:bg-cc-carbon-2 sm:w-auto"
            >
              <MessageCircle size={15} strokeWidth={2.5} className="text-cc-copper-soft" />
              Ask About BOM Shortage
            </TrackedAnchor>
          </div>

          <div className="cc-rise mb-8 w-full max-w-[640px] overflow-hidden rounded-2xl border border-cc-line bg-cc-carbon-2/70 shadow-2xl shadow-black/20" style={{ animationDelay: '0.58s' }}>
            <div className="flex items-center justify-between border-b border-cc-line px-4 py-3">
              <div className="font-mono-cc text-[11px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                RFQ PACKAGE
              </div>
              <div className="font-mono-cc text-[10px] tracking-[0.14em] text-cc-ink-mute">
                BEFORE QUOTE REVIEW
              </div>
            </div>
            <div className="grid gap-px bg-cc-line sm:grid-cols-2">
              {FILE_PROMPTS.map((item) => (
                <div key={item.label} className="bg-cc-carbon-2/95 p-4">
                  <div className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-cc-ink">
                    <Check size={13} strokeWidth={3} className="flex-shrink-0 text-cc-signal" />
                    {item.label}
                  </div>
                  <div className="pl-5 text-xs leading-5 text-cc-ink-mute">{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cc-rise grid w-full max-w-[860px] gap-3 sm:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: '0.64s' }}>
            {REVIEW_NOTES.map((item) => (
              <div key={item.label} className="rounded-xl border border-cc-line bg-white/[0.025] p-4">
                <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-cc-ink">
                  <Check size={13} strokeWidth={3} className="flex-shrink-0 text-cc-signal" />
                  {item.label}
                </div>
                <p className="text-[11px] leading-5 text-cc-ink-mute">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="cc-rise relative min-w-0 rounded-2xl border border-cc-line bg-cc-carbon-2/75 p-6 backdrop-blur-sm"
          style={{ animationDelay: '0.46s', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.8)' }}
        >
          <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-cc-copper/70" />
          <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-cc-copper/70" />
          <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-cc-copper/70" />
          <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-cc-copper/70" />

          <div className="mb-5 flex items-center justify-between">
            <div className="font-mono-cc flex items-center gap-2 text-[12px] text-cc-ink">
              <span className="cc-via cc-blink h-1.5 w-1.5 rounded-full bg-cc-signal" />
              SAMPLE BUILD / #PRJ-2841
            </div>
            <span className="font-mono-cc rounded border border-cc-copper/30 px-1.5 py-0.5 text-[9px] tracking-[0.16em] text-cc-copper-soft">
              ILLUSTRATIVE
            </span>
          </div>

          <div className="mb-5 rounded-xl border border-cc-line bg-cc-carbon/55 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-mono-cc text-[10px] font-semibold tracking-[0.16em] text-cc-copper-soft">
                REVIEW FOCUS
              </div>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cc-copper to-cc-signal" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {REVIEW_FOCUS.map((item) => (
                <div key={item} className="rounded-lg border border-cc-line bg-white/[0.03] px-3 py-2 text-[11px] text-cc-ink-mute">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <span className="absolute bottom-3 left-[18px] top-3 w-px bg-gradient-to-b from-cc-copper/50 via-cc-copper/30 to-transparent" />
            {STEPS.map((item) => (
              <div
                key={item.step}
                className={`relative mb-1 flex items-center gap-3 rounded-[10px] px-3 py-2.5 transition-colors ${
                  item.status === 'active' ? 'border border-cc-copper/25 bg-cc-copper/[0.07]' : ''
                }`}
              >
                <div
                  className={`font-mono-cc relative z-10 flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-[8px] text-[11px] font-bold ${
                    item.status === 'done'
                      ? 'bg-cc-signal/15 text-cc-signal ring-1 ring-cc-signal/40'
                      : item.status === 'active'
                      ? 'cc-copper-fill'
                      : 'bg-white/[0.04] text-cc-ink-mute ring-1 ring-white/10'
                  }`}
                >
                  {item.step}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium leading-tight text-cc-ink">{item.name}</div>
                  <div className="font-mono-cc mt-0.5 text-[10px] tracking-wide text-cc-ink-mute">{item.meta}</div>
                </div>
                {item.status === 'done' && (
                  <span className="font-mono-cc text-[10px] font-semibold tracking-wide text-cc-signal">DONE</span>
                )}
                {item.status === 'active' && (
                  <span className="font-mono-cc text-[10px] font-semibold tracking-wide text-cc-copper-soft">LIVE</span>
                )}
              </div>
            ))}
          </div>

          <div className="font-mono-cc mt-4 flex items-center justify-between border-t border-cc-line pt-3 text-[10px] tracking-wide text-cc-ink-mute">
            <span>SCHEDULE | PROJECT-DEPENDENT</span>
            <span className="text-cc-copper-soft">REVIEW BEFORE QUOTE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
