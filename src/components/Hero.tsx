'use client';

import { Upload, Play, Check } from 'lucide-react';
import Link from 'next/link';

const PROCESS_STEPS = [
  { icon: '✓', name: 'Files & DFM Review',    meta: 'Step 01 · Completed', status: 'done' },
  { icon: '✓', name: 'BOM Sourcing & IQC',    meta: 'Step 02 · 24 components sourced', status: 'done' },
  { icon: '✓', name: 'PCB Fabrication',       meta: 'Step 03 · 4-layer FR4 ready', status: 'done' },
  { icon: '⚡', name: 'SMT Assembly',          meta: 'Step 04 · In progress…', status: 'active' },
  { icon: '5',  name: 'Functional Testing',   meta: 'Step 05 · Pending', status: 'pending' },
  { icon: '6',  name: 'Packaging & Shipping', meta: 'Step 06 · Pending', status: 'pending' },
];

export default function Hero() {
  return (
    <section className="relative pt-[140px] pb-20 px-[5vw] bg-brand-primary text-white overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none hero-grid-bg" />

      {/* Color blobs */}
      <div
        className="absolute -top-[100px] -right-[50px] w-[300px] h-[300px] rounded-full opacity-30"
        style={{ background: '#FCEA0B', filter: 'blur(80px)' }}
      />
      <div
        className="absolute -bottom-[100px] left-[30%] w-[280px] h-[280px] rounded-full opacity-25"
        style={{ background: '#93C249', filter: 'blur(90px)' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

        {/* Left: Headline & CTAs */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/40 text-brand-yellow text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand-yellow"
              style={{ boxShadow: '0 0 12px #FCEA0B' }}
            />
            PCB ASSEMBLY SERVICES · TURNKEY PCBA MANUFACTURING
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-semibold leading-[1.1] tracking-tight mb-5">
            PCB Assembly Services
            <br />
            <em className="not-italic text-brand-yellow">from Gerber</em> to
            <br />
            <span className="text-brand-green">Finished PCBA.</span>
          </h1>

          <p className="text-base text-white/75 leading-relaxed max-w-[540px] mb-9">
            Turn your Gerber files, BOM lists, samples, or product requirements into assembled and tested PCBA boards through our China PCB assembly and turnkey PCBA manufacturing workflow.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/contact"
              className="bg-brand-yellow text-brand-primary text-[13px] font-semibold py-3 px-5 rounded-[9px] inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}
            >
              <Upload size={16} strokeWidth={2.5} />
              Get PCB Assembly Quote
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-white text-xs py-3 px-5 rounded-lg border border-white/20 inline-flex items-center gap-2 hover:border-white/40 transition-all"
            >
              <Play size={13} strokeWidth={2.5} />
              Upload Gerber &amp; BOM
            </Link>
          </div>

          <div className="flex items-center gap-3.5 flex-wrap">
            {[
              'Engineering review before quotation',
              'NDA available on request',
              'Functional Testing by project needs',
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-[11px] text-white/60 tracking-wide">
                <Check size={14} strokeWidth={2.5} className="text-brand-green flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Project Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-[18px] p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-white text-[13px] font-medium">
              <span className="relative w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0">
                <span
                  className="absolute inset-[-3px] rounded-full bg-brand-green opacity-40"
                  style={{ animation: 'splashPulse 1.5s ease-out infinite' }}
                />
              </span>
              Live project · #PRJ-2841
            </div>
            <span className="text-[10px] text-brand-green tracking-widest font-medium">
              IN PROGRESS
            </span>
          </div>

          {PROCESS_STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-[10px] mb-1.5 transition-colors ${
                step.status === 'active'
                  ? 'bg-brand-yellow/[0.08] border border-brand-yellow/20'
                  : ''
              }`}
            >
              <div
                className={`w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[13px] flex-shrink-0 ${
                  step.status === 'done'
                    ? 'bg-brand-green text-brand-primary'
                    : step.status === 'active'
                    ? 'bg-brand-yellow text-brand-primary'
                    : 'bg-white/[0.08] text-white/50'
                }`}
              >
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white font-medium leading-tight">
                  {step.name}
                </div>
                <div className="text-[10px] text-white/40 tracking-wide mt-0.5">
                  {step.meta}
                </div>
              </div>
              {step.status === 'done' && (
                <span className="text-[11px] text-brand-green font-semibold">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
