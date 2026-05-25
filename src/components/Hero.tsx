'use client';

import { Upload, Play, Check } from 'lucide-react';
import Link from 'next/link';

const PROCESS_STEPS = [
  { step: '01', name: 'Files & DFM Review', meta: 'Completed', status: 'done' },
  { step: '02', name: 'BOM Sourcing & IQC', meta: '24 components reviewed', status: 'done' },
  { step: '03', name: 'PCB Fabrication', meta: '4-layer FR4 prepared', status: 'done' },
  { step: '04', name: 'SMT Assembly', meta: 'In progress', status: 'active' },
  { step: '05', name: 'Functional Testing', meta: 'Pending scope confirmation', status: 'pending' },
  { step: '06', name: 'Packaging & Shipping', meta: 'Pending', status: 'pending' },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-brand-primary px-[5vw] pb-20 pt-[140px] text-white">
      <div className="hero-grid-bg pointer-events-none absolute inset-0 opacity-[0.08]" />

      <div
        className="absolute -right-[50px] -top-[100px] h-[300px] w-[300px] rounded-full opacity-30"
        style={{ background: '#FCEA0B', filter: 'blur(80px)' }}
      />
      <div
        className="absolute -bottom-[100px] left-[30%] h-[280px] w-[280px] rounded-full opacity-25"
        style={{ background: '#93C249', filter: 'blur(90px)' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-brand-yellow">
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand-yellow"
              style={{ boxShadow: '0 0 12px #FCEA0B' }}
            />
            PCB ASSEMBLY SERVICES / TURNKEY PCBA MANUFACTURING
          </div>

          <h1 className="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-[58px]">
            PCB Assembly Services{' '}
            <br />
            <em className="not-italic text-brand-yellow">from Gerber</em> to{' '}
            <br />
            <span className="text-brand-green">Finished PCBA.</span>
          </h1>

          <p className="mb-9 max-w-[540px] text-base leading-relaxed text-white/75">
            Turn your Gerber files, BOM lists, samples, or product requirements into assembled and tested PCBA boards through our China PCB assembly and turnkey PCBA manufacturing workflow.
          </p>

          <div className="mb-12 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[9px] bg-brand-yellow px-5 py-3 text-[13px] font-semibold text-brand-primary transition-all hover:-translate-y-0.5"
              style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}
            >
              <Upload size={16} strokeWidth={2.5} />
              Get PCB Assembly Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-3 text-xs text-white transition-all hover:border-white/40"
            >
              <Play size={13} strokeWidth={2.5} />
              Upload Gerber &amp; BOM
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            {[
              'Engineering review before quotation',
              'NDA available on request',
              'Functional testing by project needs',
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-[11px] tracking-wide text-white/60">
                <Check size={14} strokeWidth={2.5} className="flex-shrink-0 text-brand-green" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[13px] font-medium text-white">
              <span className="relative h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green">
                <span
                  className="absolute inset-[-3px] rounded-full bg-brand-green opacity-40"
                  style={{ animation: 'splashPulse 1.5s ease-out infinite' }}
                />
              </span>
              Live project / #PRJ-2841
            </div>
            <span className="text-[10px] font-medium tracking-widest text-brand-green">
              IN PROGRESS
            </span>
          </div>

          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className={`mb-1.5 flex items-center gap-3 rounded-[10px] px-3 py-2.5 transition-colors ${
                item.status === 'active'
                  ? 'border border-brand-yellow/20 bg-brand-yellow/[0.08]'
                  : ''
              }`}
            >
              <div
                className={`flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-[7px] text-[11px] font-semibold ${
                  item.status === 'done'
                    ? 'bg-brand-green text-brand-primary'
                    : item.status === 'active'
                    ? 'bg-brand-yellow text-brand-primary'
                    : 'bg-white/[0.08] text-white/50'
                }`}
              >
                {item.step}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium leading-tight text-white">
                  {item.name}
                </div>
                <div className="mt-0.5 text-[10px] tracking-wide text-white/40">
                  {item.meta}
                </div>
              </div>
              {item.status === 'done' && (
                <span className="text-[11px] font-semibold text-brand-green">Done</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
