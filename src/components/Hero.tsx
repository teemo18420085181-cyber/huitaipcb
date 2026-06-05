'use client';

import type { CSSProperties } from 'react';
import { Upload, ArrowUpRight, Check } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

const traceStyle = (len: number, delay = 0): CSSProperties =>
  ({ '--len': len, animationDelay: `${delay}s` } as CSSProperties);

const STEPS = [
  { step: '01', name: 'Files & DFM Review', meta: 'Completed', status: 'done' },
  { step: '02', name: 'BOM Sourcing & IQC', meta: '24 components reviewed', status: 'done' },
  { step: '03', name: 'PCB Fabrication', meta: '4-layer FR-4 prepared', status: 'done' },
  { step: '04', name: 'SMT Assembly', meta: 'In progress', status: 'active' },
  { step: '05', name: 'Functional Testing', meta: 'Pending scope', status: 'pending' },
  { step: '06', name: 'Packaging & Shipping', meta: 'Pending', status: 'pending' },
];

const TRUST = ['Engineering review before quoting', 'NDA on request', 'Functional testing by need'];

/* Decorative copper routing that "draws in" on load */
function CircuitLayer() {
  return (
    <svg
      className="cc-trace pointer-events-none absolute inset-0 h-full w-full"
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
      {/* via pads */}
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
    <section className="cc-carbon-bg font-body-cc relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-[5vw] pb-24 pt-[150px] text-cc-ink">
      <CircuitLayer />
      {/* top + bottom hairlines */}
      <div className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-gradient-to-r from-transparent via-cc-copper/30 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        {/* ---- Left ---- */}
        <div className="flex flex-col items-start">
          <div
            className="cc-rise font-mono-cc mb-7 inline-flex items-center gap-2.5 rounded-full border border-cc-line bg-cc-carbon-2/60 px-3.5 py-1.5 text-[11px] tracking-[0.18em] text-cc-copper-soft"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="cc-via h-1.5 w-1.5 rounded-full bg-cc-copper-bright" />
            TURNKEY PCBA · SHENZHEN, CHINA
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
            className="cc-rise mb-9 max-w-[520px] text-[15px] leading-relaxed text-cc-ink-mute"
            style={{ animationDelay: '0.4s' }}
          >
            Send your Gerber files, BOM, samples, or requirements. Real engineers review
            them before quoting — then we run PCB fabrication, sourcing, SMT/DIP assembly,
            testing, and delivery as one managed build.
          </p>

          <div className="cc-rise mb-11 flex flex-wrap gap-3" style={{ animationDelay: '0.52s' }}>
            <TrackedLink
              href="/contact"
              eventName="quote_click"
              eventParams={{ location: 'home_hero', destination: '/contact' }}
              className="cc-copper-fill group inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[13px] font-semibold tracking-wide transition-all hover:-translate-y-0.5"
              style={{ boxShadow: '0 8px 30px rgba(201,139,58,0.32)' }}
            >
              <Upload size={16} strokeWidth={2.5} />
              Get a PCB Assembly Quote
            </TrackedLink>
            <TrackedLink
              href="/contact"
              eventName="upload_gerber_bom_click"
              eventParams={{ location: 'home_hero', destination: '/contact' }}
              className="group inline-flex items-center gap-2 rounded-[10px] border border-cc-copper/30 bg-cc-carbon-2/40 px-5 py-3.5 text-[13px] font-medium text-cc-ink transition-all hover:border-cc-copper/60 hover:bg-cc-carbon-2"
            >
              Upload Gerber &amp; BOM
              <ArrowUpRight size={15} strokeWidth={2.5} className="text-cc-copper-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </TrackedLink>
          </div>

          <div className="cc-rise font-mono-cc flex flex-wrap items-center gap-x-5 gap-y-2.5" style={{ animationDelay: '0.64s' }}>
            {TRUST.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-[11px] tracking-wide text-cc-ink-mute">
                <Check size={13} strokeWidth={3} className="flex-shrink-0 text-cc-signal" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: build manifest (datasheet card) ---- */}
        <div
          className="cc-rise relative rounded-2xl border border-cc-line bg-cc-carbon-2/70 p-6 backdrop-blur-sm"
          style={{ animationDelay: '0.46s', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.8)' }}
        >
          {/* corner ticks */}
          <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-cc-copper/70" />
          <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-cc-copper/70" />
          <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-cc-copper/70" />
          <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-cc-copper/70" />

          <div className="mb-5 flex items-center justify-between">
            <div className="font-mono-cc flex items-center gap-2 text-[12px] text-cc-ink">
              <span className="cc-via cc-blink h-1.5 w-1.5 rounded-full bg-cc-signal" />
              RUN / #PRJ-2841
            </div>
            <span className="font-mono-cc rounded border border-cc-signal/30 px-1.5 py-0.5 text-[9px] tracking-[0.2em] text-cc-signal">
              LIVE
            </span>
          </div>

          <div className="relative">
            {/* connecting copper spine */}
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
                  <span className="font-mono-cc text-[10px] font-semibold tracking-wide text-cc-copper-soft">●●●</span>
                )}
              </div>
            ))}
          </div>

          <div className="font-mono-cc mt-4 flex items-center justify-between border-t border-cc-line pt-3 text-[10px] tracking-wide text-cc-ink-mute">
            <span>LEAD TIME · EST. 1–3 WK</span>
            <span className="text-cc-copper-soft">REPLY &lt; 24H</span>
          </div>
        </div>
      </div>
    </section>
  );
}
