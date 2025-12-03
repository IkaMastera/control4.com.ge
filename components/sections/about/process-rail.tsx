'use client';

import { useEffect, useRef } from 'react';

const STEPS = [
  { k: 'Discovery', v: 'Walkthrough, goals, constraints, budget, timeline.' },
  { k: 'Design', v: 'Wiring plans, rack layouts, scenes, UX, documentation.' },
  { k: 'Build', v: 'Cabling, racks, terminations, labeling, QA.' },
  { k: 'Program', v: 'Scenes, logic, voice, remote access, notifications.' },
  { k: 'Handover', v: 'Training, docs, support pathways, maintenance.' },
];

export default function ProcessRail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const c = canvasRef.current!; const ctx = c.getContext('2d')!;
    let w = 0, h = 0, t = 0, mounted = true;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, devicePixelRatio || 1));
      w = c.clientWidth; h = 120; c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = () => {
      t += 1; ctx.clearRect(0,0,w,h);
      const g = ctx.createLinearGradient(0,0,w,0); g.addColorStop(0,'rgba(0,194,255,.25)'); g.addColorStop(1,'rgba(0,86,184,.25)');
      ctx.fillStyle = g; ctx.fillRect(0, h/2-2, w, 4);

      const n = STEPS.length;
      for (let i=0;i<n;i++){
        const x = (i/(n-1))*w; const pul = 0.7 + Math.sin((t + i * 40) * 0.05) * 0.3;
        ctx.fillStyle = `rgba(0,194,255,${0.55 + 0.45*pul})`; ctx.beginPath(); ctx.arc(x,h/2,8,0,Math.PI*2); ctx.fill();
        const a = ctx.createRadialGradient(x,h/2,0,x,h/2,24); a.addColorStop(0,'rgba(0,194,255,.38)'); a.addColorStop(1,'rgba(0,194,255,0)');
        ctx.fillStyle = a; ctx.beginPath(); ctx.arc(x,h/2,22,0,Math.PI*2); ctx.fill();
      }

      for(let k=0;k<6;k++){
        const px=((t*(1.2+k*0.08))%(w+120))-60; const py=h/2 + Math.sin((t+k*60)*0.06)*8;
        ctx.fillStyle='rgba(168,216,255,.9)'; // packet body
        // @ts-ignore
        ctx.beginPath(); ctx.roundRect(px-14,py-4,28,8,4); ctx.fill();
        ctx.fillStyle='rgba(0,194,255,.7)'; // pulse core
        // @ts-ignore
        ctx.beginPath(); ctx.roundRect(px-6,py-2,12,4,2); ctx.fill();
      }

      if (mounted) raf.current = requestAnimationFrame(step);
    };

    const init=()=>{resize();step()};
    addEventListener('resize',resize); init();
    return ()=>{ if(raf.current) cancelAnimationFrame(raf.current); removeEventListener('resize',resize); }
  }, []);

  useEffect(() => {
    const el = wrapRef.current!; const nodes = Array.from(el.querySelectorAll('[data-node]')) as HTMLElement[];
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight)));
      el.style.setProperty('--p', String(p));
      nodes.forEach((n,i)=>{ const t = (i+1)/nodes.length; n.classList.toggle('is-lit', p>=t-0.03); });
    };
    onScroll(); addEventListener('scroll',onScroll,{passive:true});
    return ()=> removeEventListener('scroll',onScroll);
  }, []);

  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold">Our process, on rails</h2>
        <p className="mt-4 text-white/70">Built to remove surprises and preserve momentum.</p>
      </div>
      <div ref={wrapRef} className="relative mx-auto mt-14 max-w-5xl">
        <canvas ref={canvasRef} className="w-full h-[120px] rounded-xl border border-white/10 bg-[#0F1524]" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s)=>(
            <div key={s.k} className="about-step">
              <div className="about-step-led" data-node />
              <h3 className="text-base font-semibold">{s.k}</h3>
              <p className="text-white/70 text-sm">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
