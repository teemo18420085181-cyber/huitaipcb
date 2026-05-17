'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 4000;

export default function Splash() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sw1Ref = useRef<HTMLDivElement>(null);
  const sw2Ref = useRef<HTMLDivElement>(null);
  const sw3Ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [skipOpacity, setSkipOpacity] = useState(0);
  const endedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const endSplash = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    setFadeOut(true);
    setSkipOpacity(0);
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = 'auto';
    }, 1000);
  };

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const canvas = canvasRef.current;
    if (!bgCanvas || !canvas) return;

    const bgCtx = bgCanvas.getContext('2d')!;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let W = 0,
      H = 0,
      cx = 0,
      cy = 0;
    let rafId = 0;
    let startTime: number | null = null;
    let shockwaveFired = false;
    let textShown = false;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      tx: number;
      ty: number;
      color: string;
      delay: number;
      arrived: boolean;
    };
    type Star = {
      x: number;
      y: number;
      r: number;
      alpha: number;
      twinkle: number;
      phase: number;
    };

    let particles: Particle[] = [];
    let stars: Star[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      bgCanvas.width = canvas.width = W;
      bgCanvas.height = canvas.height = H;
      cx = W / 2;
      cy = H / 2;
    };

    const buildLogoTargets = () => {
      const LOGO_SIZE = Math.min(W, H) * 0.32;
      const off = document.createElement('canvas');
      off.width = LOGO_SIZE * 1.6;
      off.height = LOGO_SIZE;
      const o = off.getContext('2d')!;
      o.imageSmoothingEnabled = true;
      const W2 = off.width,
        H2 = off.height;

      // Yellow arc (top)
      o.fillStyle = '#FCEA0B';
      o.beginPath();
      o.moveTo(W2 * 0.3, H2 * 0.28);
      o.quadraticCurveTo(W2 * 0.5, H2 * -0.15, W2 * 0.78, H2 * 0.28);
      o.quadraticCurveTo(W2 * 0.5, H2 * 0.1, W2 * 0.3, H2 * 0.28);
      o.closePath();
      o.fill();

      // Green arc (bottom)
      o.fillStyle = '#93C249';
      o.beginPath();
      o.moveTo(W2 * 0.36, H2 * 0.78);
      o.quadraticCurveTo(W2 * 0.48, H2 * 1.1, W2 * 0.62, H2 * 0.78);
      o.quadraticCurveTo(W2 * 0.48, H2 * 0.95, W2 * 0.36, H2 * 0.78);
      o.closePath();
      o.fill();

      o.fillStyle = '#FFFFFF';
      o.font = `bold ${H2 * 0.65}px Inter, sans-serif`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillText('HT', W2 * 0.5, H2 * 0.5);

      const imgData = o.getImageData(0, 0, W2, H2);
      const data = imgData.data;
      const targets: { tx: number; ty: number; color: string }[] = [];
      const SAMPLE_STEP = Math.max(2, Math.round(LOGO_SIZE / 180));
      const offsetX = cx - W2 / 2;
      const offsetY = cy - H2 / 2;

      for (let y = 0; y < H2; y += SAMPLE_STEP) {
        for (let x = 0; x < W2; x += SAMPLE_STEP) {
          const idx = (y * W2 + x) * 4;
          const a = data[idx + 3];
          if (a > 80) {
            const r = data[idx],
              g = data[idx + 1],
              b = data[idx + 2];
            targets.push({
              tx: x + offsetX,
              ty: y + offsetY,
              color: `rgb(${r},${g},${b})`,
            });
          }
        }
      }
      return targets;
    };

    const initParticles = () => {
      const targets = buildLogoTargets();
      particles = [];
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [targets[i], targets[j]] = [targets[j], targets[i]];
      }
      const maxDist = Math.max(W, H) * 0.85;
      targets.forEach((t, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = maxDist * (0.7 + Math.random() * 0.6);
        particles.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          tx: t.tx,
          ty: t.ty,
          color: t.color,
          delay: (i / targets.length) * 600,
          arrived: false,
        });
      });
    };

    const initStars = () => {
      stars = [];
      const count = Math.min(120, Math.floor((W * H) / 12000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.5 + 0.1,
          twinkle: 0.5 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawStars = (t: number) => {
      bgCtx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.twinkle + s.phase));
        bgCtx.fillStyle = `rgba(252,234,11,${a * 0.3})`;
        bgCtx.beginPath();
        bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bgCtx.fill();
      });
    };

    const fireShockwaves = () => {
      [sw1Ref, sw2Ref, sw3Ref].forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        setTimeout(() => {
          const colors = [
            'rgba(252,234,11,.9)',
            'rgba(147,194,73,.7)',
            'rgba(255,255,255,.5)',
          ];
          el.style.borderColor = colors[i];
          el.style.opacity = '1';
          el.style.transition = 'none';
          el.style.width = '20px';
          el.style.height = '20px';
          requestAnimationFrame(() => {
            el.style.transition = 'all 1.2s cubic-bezier(0.16,1,0.3,1)';
            el.style.width = Math.max(W, H) * 1.2 + 'px';
            el.style.height = Math.max(W, H) * 1.2 + 'px';
            el.style.opacity = '0';
          });
        }, i * 120);
      });
    };

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const t = elapsed / 1000;

      drawStars(t);
      ctx.fillStyle = 'rgba(10,8,32,0.18)';
      ctx.fillRect(0, 0, W, H);

      let arrivedCount = 0;
      particles.forEach((p) => {
        if (elapsed < p.delay) return;
        const localElapsed = elapsed - p.delay;
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 0.5 && Math.abs(p.vx) < 0.3 && Math.abs(p.vy) < 0.3) {
          p.x = p.tx;
          p.y = p.ty;
          p.arrived = true;
          arrivedCount++;
        } else {
          p.vx += dx * 0.06;
          p.vy += dy * 0.06;
          const damping = localElapsed < 1200 ? 0.82 : 0.72;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx;
          p.y += p.vy;
        }

        const speed = Math.hypot(p.vx, p.vy);
        const trailLength = Math.min(speed * 0.6, 8);

        if (speed > 1 && !p.arrived) {
          ctx.strokeStyle = p.color
            .replace('rgb', 'rgba')
            .replace(')', ',0.4)');
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(
            p.x - (p.vx / speed) * trailLength,
            p.y - (p.vy / speed) * trailLength
          );
          ctx.stroke();
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.arrived ? 1.3 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      const arrivalRatio = arrivedCount / particles.length;
      if (arrivalRatio > 0.6 && !shockwaveFired) {
        fireShockwaves();
        shockwaveFired = true;
      }
      if (arrivalRatio > 0.85 && !textShown) {
        if (textRef.current) {
          textRef.current.style.transition =
            'opacity 0.8s ease, transform 0.8s ease';
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translateY(0)';
        }
        textShown = true;
      }

      if (elapsed > DURATION_MS && !endedRef.current) {
        endSplash();
        return;
      }

      if (!endedRef.current) rafId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    initStars();
    rafId = requestAnimationFrame(animate);

    const skipTimer = setTimeout(() => setSkipOpacity(1), 800);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(skipTimer);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[1000] flex items-center justify-center transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(ellipse at center, #1A1640 0%, #0a0820 100%)',
          opacity: fadeOut ? 0 : 1,
          pointerEvents: fadeOut ? 'none' : 'auto',
        }}
      >
        <canvas ref={bgCanvasRef} className="absolute inset-0 w-full h-full" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div
          ref={sw1Ref}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 0,
            height: 0,
            border: '2px solid rgba(252,234,11,.9)',
            opacity: 0,
          }}
        />
        <div
          ref={sw2Ref}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 0,
            height: 0,
            border: '2px solid rgba(147,194,73,.7)',
            opacity: 0,
          }}
        />
        <div
          ref={sw3Ref}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 0,
            height: 0,
            border: '2px solid rgba(255,255,255,.5)',
            opacity: 0,
          }}
        />

        <div
          ref={textRef}
          className="relative z-[2] text-center pointer-events-none"
          style={{
            marginTop: '280px',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          <div className="text-3xl md:text-4xl font-bold text-white tracking-[0.3em] mb-2">
            <em className="not-italic text-brand-yellow">ONE</em>STOPPCBA
          </div>
          <div className="text-[11px] text-white/50 tracking-[0.32em] font-medium">
            TURNKEY PCBA · ONE CONTACT · FULL DELIVERY
          </div>
        </div>
      </div>

      <button
        onClick={endSplash}
        className="fixed bottom-6 right-6 z-[1003] text-[10px] text-white/40 tracking-[0.12em] py-1.5 px-3.5 border border-white/20 rounded-full cursor-pointer bg-black/30 backdrop-blur transition-all hover:text-white hover:border-white/50"
        style={{
          opacity: skipOpacity,
          pointerEvents: fadeOut ? 'none' : 'auto',
        }}
      >
        SKIP ›
      </button>
    </>
  );
}
