'use client';

import { useState, useRef, useCallback } from 'react';

// ── SVG animations per step ─────────────────────────────────
const FilesAnim = () => (
  <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Monitor */}
    <rect x="30" y="10" width="120" height="90" rx="4" fill="#0D0B2E" stroke="#3A3270" strokeWidth="1.5"/>
    <rect x="35" y="15" width="110" height="75" rx="2" fill="#0a0820"/>
    {/* Gerber traces */}
    <polyline points="45,35 60,35 60,50 75,50 75,35 90,35" stroke="#FCEA0B" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2s" repeatCount="indefinite"/>
    </polyline>
    <polyline points="95,55 110,55 110,40 125,40 125,65 140,65" stroke="#FCEA0B" strokeWidth="1.5" strokeLinecap="round">
      <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
    </polyline>
    {/* Scan line */}
    <line x1="35" y1="50" x2="145" y2="50" stroke="#93C249" strokeWidth="1" opacity="0.6">
      <animate attributeName="y1" values="15;90;15" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="15;90;15" dur="2s" repeatCount="indefinite"/>
    </line>
    {/* Check items */}
    <g fontSize="8" fontFamily="monospace">
      <text x="40" y="75" fill="#93C249">�?Clearance OK</text>
      <text x="40" y="85" fill="#93C249">
        �?Via size OK
        <animate attributeName="opacity" values="0;1" dur="1.5s" begin="0.8s" fill="freeze"/>
      </text>
    </g>
    {/* Monitor stand */}
    <rect x="80" y="100" width="20" height="6" rx="2" fill="#27215B"/>
    <rect x="70" y="106" width="40" height="4" rx="2" fill="#27215B"/>
    {/* Engineer silhouette */}
    <circle cx="160" cy="45" r="11" fill="#27215B" stroke="#93C249" strokeWidth="1.5"/>
    <path d="M149 57 Q160 51 171 57 L173 90 L147 90 Z" fill="#27215B" stroke="#93C249" strokeWidth="1.5"/>
    {/* Arm pointing */}
    <line x1="149" y1="72" x2="135" y2="57" stroke="#93C249" strokeWidth="2" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 149 72;-8 149 72;0 149 72" dur="2s" repeatCount="indefinite"/>
    </line>
    {/* Label */}
    <text x="90" y="138" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DFM REVIEW</text>
    <text x="90" y="150" fill="#ffffff88" fontSize="8" textAnchor="middle" fontFamily="sans-serif">24h turnaround</text>
  </svg>
);

const PCBFabAnim = () => (
  <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* PCB board */}
    <rect x="20" y="30" width="140" height="100" rx="4" fill="#0a3d2a" stroke="#1a7a55" strokeWidth="1.5"/>
    {/* Grid holes */}
    {[40,70,100,130].map(x => [50,80,110].map(y => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#0D1A0D" stroke="#1a7a55" strokeWidth="1">
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin={`${(x+y)/200}s`} fill="freeze"/>
      </circle>
    )))}
    {/* Copper traces drawing in */}
    <polyline points="40,50 70,50 70,80 100,80 100,50 130,50 130,110 100,110 100,80" stroke="#c89318" strokeWidth="2.5" strokeLinecap="round">
      <animate attributeName="stroke-dasharray" values="0,400;400,0" dur="2.5s" repeatCount="indefinite"/>
    </polyline>
    <polyline points="40,110 70,110 70,80" stroke="#c89318" strokeWidth="2.5" strokeLinecap="round">
      <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
    </polyline>
    {/* ENIG pads */}
    {[40,100,130].map((x,i) => (
      <rect key={i} x={x-6} y="104" width="12" height="6" rx="1" fill="#d4a017">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${1+i*0.3}s`} fill="freeze" repeatCount="indefinite"/>
      </rect>
    ))}
    {/* Layers indicator */}
    <rect x="22" y="32" width="30" height="9" rx="2" fill="#1a7a55"/>
    <text x="37" y="39" fill="#fff" fontSize="7" textAnchor="middle" fontFamily="monospace">6L FR4</text>
    {/* Label */}
    <text x="90" y="145" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PCB FABRICATION</text>
    <text x="90" y="157" fill="#ffffff88" fontSize="8" textAnchor="middle" fontFamily="sans-serif">In-house manufacturing</text>
  </svg>
);

const BOMSourceAnim = () => (
  <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Shelf */}
    <rect x="10" y="20" width="5" height="120" fill="#3A3270"/>
    <rect x="165" y="20" width="5" height="120" fill="#3A3270"/>
    {[40,70,100].map(y => <rect key={y} x="10" y={y} width="160" height="3" fill="#3A3270"/>)}
    {/* Component reels */}
    {[25,55,85,115,145].map((x,i) => (
      <g key={i}>
        <circle cx={x} cy="55" r="12" fill="#1A1640" stroke="#FCEA0B" strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" values={`0 ${x} 55;360 ${x} 55`} dur={`${3+i*0.5}s`} repeatCount="indefinite"/>
        </circle>
        <circle cx={x} cy="55" r="5" fill="#27215B"/>
      </g>
    ))}
    {[25,65,105,145].map((x,i) => (
      <g key={i}>
        <circle cx={x} cy="85" r="10" fill="#1A1640" stroke="#93C249" strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" values={`0 ${x} 85;-360 ${x} 85`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
        </circle>
        <circle cx={x} cy="85" r="4" fill="#27215B"/>
      </g>
    ))}
    {/* Picking arm */}
    <line x1="90" y1="10" x2="90" y2="40" stroke="#FCEA0B" strokeWidth="2.5">
      <animate attributeName="x1" values="25;145;25" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="25;145;25" dur="3s" repeatCount="indefinite"/>
    </line>
    <circle cx="90" cy="40" r="5" fill="#FCEA0B">
      <animate attributeName="cx" values="25;145;25" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="40;55;40" dur="3s" repeatCount="indefinite"/>
    </circle>
    {/* Authorized badge */}
    <rect x="50" y="112" width="80" height="14" rx="4" fill="#93C249" opacity="0.2" stroke="#93C249" strokeWidth="1"/>
    <text x="90" y="122" fill="#93C249" fontSize="8" textAnchor="middle" fontFamily="monospace">�?AUTHORIZED ONLY</text>
    {/* Label */}
    <text x="90" y="143" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BOM SOURCING</text>
    <text x="90" y="155" fill="#ffffff88" fontSize="8" textAnchor="middle" fontFamily="sans-serif">No grey market parts</text>
  </svg>
);

const SMTAnim = () => (
  <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* PCB board */}
    <rect x="20" y="80" width="140" height="60" rx="3" fill="#0a3d2a" stroke="#1a7a55" strokeWidth="1.5"/>
    {/* Components on board */}
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={30+i*22} y={90+Math.sin(i)*8} width="14" height="8" rx="1" fill="#0a0820" stroke="#3A3270" strokeWidth="0.5">
        <animate attributeName="opacity" values="0;0;1" dur="3s" begin={`${i*0.4}s`} fill="freeze" repeatCount="indefinite"/>
      </rect>
    ))}
    {/* Pick & place arm */}
    <line x1="30" y1="20" x2="150" y2="20" stroke="#3A3270" strokeWidth="3"/>
    {/* Vertical arm */}
    <line x1="90" y1="20" x2="90" y2="70" stroke="#FCEA0B" strokeWidth="2.5">
      <animate attributeName="x1" values="30;140;30" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="30;140;30" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="70;85;70" dur="3s" repeatCount="indefinite"/>
    </line>
    {/* Nozzle head */}
    <polygon points="85,70 95,70 92,78 88,78" fill="#FCEA0B">
      <animate attributeName="points" values="85,70 95,70 92,78 88,78;85,82 95,82 92,90 88,90;85,70 95,70 92,78 88,78" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="transform" values="translate(0,0);translate(50,0);translate(0,0)" dur="3s" repeatCount="indefinite"/>
    </polygon>
    {/* Component being picked */}
    <rect x="85" y="30" width="10" height="6" rx="1" fill="#93C249">
      <animate attributeName="y" values="30;72;30" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x" values="85;85;85" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite"/>
    </rect>
    {/* Tape reels */}
    <circle cx="25" cy="50" r="18" fill="#1A1640" stroke="#FCEA0B" strokeWidth="1.5">
      <animateTransform attributeName="transform" type="rotate" values="0 25 50;360 25 50" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="25" cy="50" r="8" fill="#27215B"/>
    <circle cx="155" cy="50" r="14" fill="#1A1640" stroke="#93C249" strokeWidth="1.5">
      <animateTransform attributeName="transform" type="rotate" values="0 155 50;-360 155 50" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="155" cy="50" r="6" fill="#27215B"/>
    {/* Label */}
    <text x="90" y="153" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SMT ASSEMBLY</text>
    <text x="90" y="163" fill="#ffffff88" fontSize="7" textAnchor="middle" fontFamily="sans-serif">01005 �?BGA</text>
  </svg>
);

const TestingAnim = () => (
  <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Oscilloscope body */}
    <rect x="20" y="15" width="100" height="80" rx="4" fill="#1A1640" stroke="#3A3270" strokeWidth="1.5"/>
    <rect x="25" y="20" width="90" height="65" rx="2" fill="#050918"/>
    {/* Waveform */}
    <polyline stroke="#FCEA0B" strokeWidth="1.5" fill="none" strokeLinecap="round"
      points="28,52 38,30 48,74 58,30 68,74 78,30 88,74 98,52 108,52">
      <animate attributeName="points"
        values="28,52 38,30 48,74 58,30 68,74 78,30 88,74 98,52 108,52;28,52 38,74 48,30 58,74 68,30 78,74 88,30 98,52 108,52;28,52 38,30 48,74 58,30 68,74 78,30 88,74 98,52 108,52"
        dur="1.5s" repeatCount="indefinite"/>
    </polyline>
    {/* Grid lines */}
    {[30,47,64].map(y => <line key={y} x1="28" y1={y} x2="108" y2={y} stroke="#3A3270" strokeWidth="0.5"/>)}
    {[45,65,85].map(x => <line key={x} x1={x} y1="22" x2={x} y2="83" stroke="#3A3270" strokeWidth="0.5"/>)}
    {/* Test probe */}
    <line x1="120" y1="120" x2="85" y2="95" stroke="#93C249" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="120" cy="120" r="3" fill="#93C249"/>
    {/* PCB under test */}
    <rect x="60" y="100" width="80" height="45" rx="3" fill="#0a3d2a" stroke="#1a7a55" strokeWidth="1"/>
    {/* LED indicators */}
    <circle cx="75" cy="113" r="4" fill="#93C249">
      <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="90" cy="113" r="4" fill="#93C249">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" repeatCount="indefinite"/>
    </circle>
    {/* PASS badge */}
    <rect x="100" y="107" width="35" height="16" rx="3" fill="#93C249">
      <animate attributeName="opacity" values="0;1" dur="1s" begin="1.5s" fill="freeze" repeatCount="indefinite"/>
    </rect>
    <text x="117" y="118" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PASS</text>
    {/* Label */}
    <text x="90" y="155" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TESTING</text>
    <text x="90" y="167" fill="#ffffff88" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Functional verified</text>
  </svg>
);

const QCAnim = () => (
  <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* PCB board */}
    <rect x="25" y="60" width="130" height="85" rx="4" fill="#0a3d2a" stroke="#1a7a55" strokeWidth="1.5"/>
    {/* Components */}
    {[45,75,105,135].map((x,i) => (
      <g key={i}>
        <rect x={x-8} y="75" width="14" height="8" rx="1" fill="#1A1640" stroke="#3A3270" strokeWidth="0.5"/>
        <rect x={x-8} y="95" width="14" height="8" rx="1" fill="#1A1640" stroke="#3A3270" strokeWidth="0.5"/>
        {/* Checkmarks appearing */}
        <text x={x} y="82" fill="#93C249" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
          �?          <animate attributeName="opacity" values="0;1" dur="0.3s" begin={`${0.5+i*0.4}s`} fill="freeze" repeatCount="indefinite"/>
        </text>
      </g>
    ))}
    {/* Magnifying glass */}
    <circle cx="90" cy="40" r="25" fill="#1A1640" fillOpacity="0.7" stroke="#FCEA0B" strokeWidth="2.5">
      <animate attributeName="cx" values="45;135;45" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="90" cy="40" r="18" fill="none" stroke="#FCEA0B" strokeWidth="1" strokeDasharray="2,2">
      <animate attributeName="cx" values="45;135;45" dur="4s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="rotate" values="0 90 40;360 90 40" dur="3s" repeatCount="indefinite"/>
    </circle>
    {/* Handle */}
    <line x1="110" y1="60" x2="125" y2="75" stroke="#FCEA0B" strokeWidth="3" strokeLinecap="round">
      <animate attributeName="x1" values="65;155;65" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="80;170;80" dur="4s" repeatCount="indefinite"/>
    </line>
    {/* Report */}
    <rect x="30" y="115" width="55" height="25" rx="2" fill="#27215B" stroke="#3A3270" strokeWidth="1"/>
    <text x="57" y="126" fill="#fff" fontSize="6" textAnchor="middle" fontFamily="monospace">TEST REPORT</text>
    <text x="57" y="134" fill="#93C249" fontSize="6" textAnchor="middle" fontFamily="monospace">PASS �?/text>
    {/* Label */}
    <text x="90" y="155" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">QUALITY CONTROL</text>
    <text x="90" y="167" fill="#ffffff88" fontSize="7" textAnchor="middle" fontFamily="sans-serif">IPC Class III</text>
  </svg>
);

const ShippingAnim = () => (
  <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Box body */}
    <rect x="30" y="75" width="110" height="75" rx="3" fill="#8B6914" stroke="#6B4A0F" strokeWidth="1.5"/>
    {/* PCB in box */}
    <rect x="45" y="95" width="80" height="50" rx="2" fill="#0a3d2a" stroke="#1a7a55" strokeWidth="1"/>
    <polyline points="60,110 75,110 75,125 90,125 90,110 105,110" stroke="#c89318" strokeWidth="1.5"/>
    {/* Box lid closing */}
    <rect x="30" y="65" width="110" height="15" rx="3" fill="#A07820" stroke="#6B4A0F" strokeWidth="1.5">
      <animate attributeName="y" values="30;65;65" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="height" values="50;15;15" dur="2s" repeatCount="indefinite"/>
    </rect>
    {/* Tape */}
    <rect x="75" y="70" width="30" height="5" rx="1" fill="#FCEA0B" opacity="0.8">
      <animate attributeName="opacity" values="0;0.8" dur="2s" begin="0.5s" fill="freeze" repeatCount="indefinite"/>
    </rect>
    {/* DHL label */}
    <rect x="40" y="110" width="60" height="20" rx="2" fill="#CC0000">
      <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.5s" fill="freeze" repeatCount="indefinite"/>
    </rect>
    <text x="70" y="123" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DHL</text>
    {/* Airplane */}
    <g>
      <animateTransform attributeName="transform" type="translate" values="-30,0;210,0" dur="3s" repeatCount="indefinite"/>
      <polygon points="150,30 170,40 150,50 145,40" fill="#FCEA0B"/>
      <line x1="145" y1="40" x2="130" y2="35" stroke="#FCEA0B" strokeWidth="2"/>
      <line x1="145" y1="40" x2="130" y2="45" stroke="#FCEA0B" strokeWidth="2"/>
    </g>
    {/* 42+ badge */}
    <circle cx="155" cy="100" r="18" fill="#27215B" stroke="#FCEA0B" strokeWidth="1.5"/>
    <text x="155" y="97" fill="#FCEA0B" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">42+</text>
    <text x="155" y="107" fill="#fff" fontSize="6" textAnchor="middle" fontFamily="sans-serif">countries</text>
    {/* Label */}
    <text x="90" y="158" fill="#FCEA0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SHIPPING</text>
    <text x="90" y="170" fill="#ffffff88" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Worldwide delivery</text>
  </svg>
);

// ── Step definitions ──────────────────────────────────────────
const STEPS = [
  {
    n: '01', title: 'Files & DFM Review', short: 'Review',
    desc: 'Upload Gerber + BOM. Engineers review and reply with DFM report within 24h.',
    color: '#FCEA0B', Anim: FilesAnim,
  },
  {
    n: '02', title: 'PCB Fabrication', short: 'Fabrication',
    desc: '1�?0 layers · FR4 / HDI / Rogers · HASL, ENIG · Electrically tested.',
    color: '#93C249', Anim: PCBFabAnim,
  },
  {
    n: '03', title: 'BOM Sourcing', short: 'Sourcing',
    desc: 'Authorized distributors only. Date-code verified. IQC on every reel.',
    color: '#FCEA0B', Anim: BOMSourceAnim,
  },
  {
    n: '04', title: 'SMT Assembly', short: 'Assembly',
    desc: '01005 to BGA. High-precision pick-and-place. Lead-free reflow. AOI after.',
    color: '#93C249', Anim: SMTAnim,
  },
  {
    n: '05', title: 'Testing & Assembly', short: 'Testing',
    desc: 'Flying probe, ICT, functional testing. Through-hole & box build handled too.',
    color: '#FCEA0B', Anim: TestingAnim,
  },
  {
    n: '06', title: 'Quality Control', short: 'QC',
    desc: 'AOI · X-Ray · Final QC. Signed test report included with every shipment.',
    color: '#93C249', Anim: QCAnim,
  },
  {
    n: '07', title: 'Packaging & Shipping', short: 'Shipping',
    desc: 'Anti-static packed. DHL / FedEx tracked to 42+ countries worldwide.',
    color: '#FCEA0B', Anim: ShippingAnim,
  },
];

// ── Single card ───────────────────────────────────────────────
function FlowCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: y * -12, ry: x * 12 });
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${hovered ? 16 : 0}px)`,
        transition: hovered ? 'transform 0.08s linear' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.6), 0 0 30px ${step.color}33` : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      className="relative flex-shrink-0 w-48 h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-brand-primary-dark select-none"
    >
      {/* Connector line to next */}
      {index < STEPS.length - 1 && (
        <div className="absolute right-0 top-1/2 w-6 h-0.5 bg-brand-yellow/30 translate-x-full -translate-y-0.5 z-10" />
      )}

      {/* Normal state */}
      <div
        className="absolute inset-0 flex flex-col p-5 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-primary text-sm font-bold mb-4"
          style={{ background: step.color }}
        >
          {step.n}
        </div>
        <div className="text-xl font-bold text-white mb-0.5">{step.title}</div>
        <div className="text-[11px] text-white/50 tracking-wide mb-3">{step.short}</div>
        <div className="h-0.5 w-8 rounded-sm mb-3" style={{ background: step.color }} />
        <div className="text-xs text-white/60 leading-relaxed">{step.desc}</div>
        {/* Bottom step indicator */}
        <div className="absolute bottom-4 right-4 text-[32px] font-black text-white/[0.04] leading-none">
          {step.n}
        </div>
      </div>

      {/* Hover state: Animation */}
      <div
        className="absolute inset-0 flex flex-col transition-opacity duration-300 bg-brand-primary-dark"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {/* Animation area */}
        <div className="flex-1 relative overflow-hidden" style={{ filter: `drop-shadow(0 0 8px ${step.color}44)` }}>
          <step.Anim />
        </div>
        {/* Bottom info strip */}
        <div className="px-4 pb-4">
          <div
            className="text-[10px] font-bold tracking-widest mb-0.5"
            style={{ color: step.color }}
          >
            STEP {step.n}
          </div>
          <div className="text-sm font-semibold text-white leading-tight">{step.title}</div>
        </div>
        {/* Glow border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `1px solid ${step.color}40` }}
        />
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function FlowCards3D() {
  return (
    <section className="py-20 px-[5vw] bg-brand-primary-dark overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] text-brand-yellow font-semibold tracking-[0.2em] mb-4">
            <span className="w-4 h-0.5 bg-brand-yellow rounded" />
            INTERACTIVE PROCESS
            <span className="w-4 h-0.5 bg-brand-yellow rounded" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Hover each step to see{' '}
            <em className="not-italic text-brand-yellow">inside the process.</em>
          </h2>
          <p className="text-sm text-white/50 max-w-[520px] mx-auto">
            From file upload to worldwide delivery �?every step coordinated by one team.
          </p>
        </div>

        {/* Cards row �?scrollable on mobile */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:overflow-visible md:justify-center"
            style={{ scrollbarWidth: 'none' }}>
            {STEPS.map((step, i) => (
              <div key={step.n} className="snap-start flex-shrink-0 flex items-center gap-0">
                <FlowCard step={step} index={i} />
                {i < STEPS.length - 1 && (
                  <div className="flex-shrink-0 w-6 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-brand-yellow/40 to-brand-green/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile hint */}
        <div className="text-center mt-6 text-xs text-white/30 md:hidden">
          �?Scroll to see all steps �?        </div>
      </div>
    </section>
  );
}
