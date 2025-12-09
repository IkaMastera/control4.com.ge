'use client';

import { useEffect, useMemo, useState } from 'react';

/** DEBUG: 0 = never finish.
 *  PROD: 3500–4000 = switch to "Connected" (green) and auto-hide shortly after.
 */
const CONNECT_MS = 3000;            // ⬅️ set to 3500 for ~3.5s intro later
const AUTOHIDE_AFTER_OK = 600;   // hide delay after turning green

export default function IntroLoaderChipDebug() {
  // Mount gate to avoid hydration mismatch — but DO NOT early-return before hooks.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Phase state (always declared, regardless of mount)
  const [phase, setPhase] = useState<'connecting' | 'connected'>('connecting');

  // Timers (run only when we actually want to auto-finish)
  useEffect(() => {
    if (CONNECT_MS <= 0) return;
    const t1 = setTimeout(() => setPhase('connected'), CONNECT_MS);
    const t2 = setTimeout(() => {
      const el = document.getElementById('c4-intro-overlay');
      if (el) el.remove();
    }, CONNECT_MS + AUTOHIDE_AFTER_OK);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const statusText = useMemo(
    () => (phase === 'connected' ? 'Connected' : 'Connecting'),
    [phase]
  );

  // If not mounted yet, render an empty placeholder to preserve hook order.
  if (!mounted) return <span hidden aria-hidden="true" />;

  return (
    <div
      id="c4-intro-overlay"
      className="fixed inset-0 z-99999 grid place-items-end sm:place-items-center pointer-events-none"
      aria-live="polite"
      suppressHydrationWarning
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-bg/75 backdrop-blur-sm" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(40%_55%_at_50%_60%,rgba(0,86,184,.35),rgba(0,194,255,.18)_55%,transparent)]" />

      {/* badge */}
      <div className="mb-8 sm:mb-0 relative pointer-events-none c4-chip-badge">
        <div className="absolute -inset-6 -z-10 blur-2xl opacity-80 bg-[radial-gradient(40%_60%_at_50%_100%,rgba(0,86,184,.30),rgba(0,194,255,.12)_70%,transparent)]" />
        <div className="flex items-center gap-3 rounded-2xl bg-white/6 px-6 py-4 ring-1 ring-white/10">
          <div className="text-[--color-primary]">
            <MicrochipSVG />
          </div>

          {/* text + underline loader */}
          <div className="relative text-sm sm:text-base text-white/90">
            <span
              className={
                phase === 'connected'
                  ? 'font-semibold text-emerald-400 transition-colors'
                  : 'font-semibold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-[c4TextPulse_1.6s_ease-in-out_infinite]'
              }
            >
              {statusText}
            </span>
            <span className="text-white/85"> to Control4 Director</span>

            {phase === 'connecting' && (
              <span aria-hidden="true" className="block mt-1 h-0.5 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full w-1/3 rounded-full bg-linear-to-r from-primary via-accent to-primary animate-[c4Bar_1.4s_ease-in-out_infinite_alternate]" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* GLOBAL styles for SVG animations */}
      <style jsx global>{`
        .c4-chip-badge { overflow: visible; }
        .microchip { display:block; width:78px; height:78px; overflow:visible; }

        .microchip__center,.microchip__dot,.microchip__line,.microchip__lines,
        .microchip__spark,.microchip__wave{
          animation-duration:5s;
          animation-timing-function:cubic-bezier(0.65,0,0.35,1);
          animation-iteration-count:infinite;
        }

        .microchip__core,.microchip__dot{ fill: color-mix(in srgb, #0056B8 70%, #0D1117 30%); }
        .microchip__line{ stroke: color-mix(in srgb, #0056B8 85%, #0D1117 15%); }
        .microchip__spark,.microchip__wave{ stroke:#00C2FF; animation-timing-function:linear; }

        .microchip__line--1,.microchip__line--2,.microchip__line--3{ stroke-dasharray:42 42; }
        .microchip__line--4,.microchip__line--5,.microchip__line--6{ stroke-dasharray:60 60; }
        .microchip__line--7,.microchip__line--8,.microchip__line--9{ stroke-dasharray:43 43; }
        .microchip__spark--1,.microchip__spark--2,.microchip__spark--3{ stroke-dasharray:15 69; }
        .microchip__spark--4,.microchip__spark--5,.microchip__spark--6{ stroke-dasharray:15 105; }
        .microchip__spark--7,.microchip__spark--8,.microchip__spark--9{ stroke-dasharray:15 71; }

        .microchip__line,.microchip__spark{ stroke-width:2; vector-effect:non-scaling-stroke; }
        .microchip__center,.microchip__wave{ transform-origin:25px 25px; }
        .microchip__lines{ transform-origin:54px 54px; }

        .microchip__center{ animation-name:center-scale; }
        .microchip__lines{ animation-name:lines-scale; }
        .microchip__line--1{ animation-name:line-draw1; }
        .microchip__line--2{ animation-name:line-draw2; }
        .microchip__line--3{ animation-name:line-draw3; }
        .microchip__line--4{ animation-name:line-draw4; }
        .microchip__line--5{ animation-name:line-draw5; }
        .microchip__line--6{ animation-name:line-draw6; }
        .microchip__line--7{ animation-name:line-draw7; }
        .microchip__line--8{ animation-name:line-draw8; }
        .microchip__line--9{ animation-name:line-draw9; }
        .microchip__spark--1{ animation-name:spark1; }
        .microchip__spark--2{ animation-name:spark2; }
        .microchip__spark--3{ animation-name:spark3; }
        .microchip__spark--4{ animation-name:spark4; }
        .microchip__spark--5{ animation-name:spark5; }
        .microchip__spark--6{ animation-name:spark6; }
        .microchip__spark--7{ animation-name:spark7; }
        .microchip__spark--8{ animation-name:spark8; }
        .microchip__spark--9{ animation-name:spark9; }
        .microchip__wave--1{ animation-name:wave-scale1; }
        .microchip__wave--2{ animation-name:wave-scale2; }

        @keyframes center-scale{ from,to{transform:scale(0)} 12.5%,75%{transform:scale(1)} }
        @keyframes lines-scale{ from{opacity:1;transform:scale(0)} 12.5%,75%{opacity:1;transform:scale(1)} 93.75%,to{opacity:0;transform:scale(.5)} }

        @keyframes line-draw1{from,93.75%,to{stroke-dashoffset:59}25%,68.75%{stroke-dashoffset:17}}
        @keyframes line-draw2{from,93.75%,to{stroke-dashoffset:42}25%,68.75%{stroke-dashoffset:0}}
        @keyframes line-draw3{from,93.75%,to{stroke-dashoffset:59}25%,68.75%{stroke-dashoffset:17}}
        @keyframes line-draw4{from,93.75%,to{stroke-dashoffset:78}25%,68.75%{stroke-dashoffset:18}}
        @keyframes line-draw5{from,93.75%,to{stroke-dashoffset:60}25%,68.75%{stroke-dashoffset:0}}
        @keyframes line-draw6{from,93.75%,to{stroke-dashoffset:91}25%,68.75%{stroke-dashoffset:31}}
        @keyframes line-draw7{from,93.75%,to{stroke-dashoffset:60}25%,68.75%{stroke-dashoffset:17}}
        @keyframes line-draw8{from,93.75%,to{stroke-dashoffset:43}25%,68.75%{stroke-dashoffset:0}}
        @keyframes line-draw9{from,93.75%,to{stroke-dashoffset:60}25%,68.75%{stroke-dashoffset:17}}

        @keyframes spark1{from,27.5%{stroke-dashoffset:59}50%,52.5%{stroke-dashoffset:-25}75%,to{stroke-dashoffset:-109}}
        @keyframes spark2{from,27.5%{stroke-dashoffset:42}50%,52.5%{stroke-dashoffset:-42}75%,to{stroke-dashoffset:-126}}
        @keyframes spark3{from,27.5%{stroke-dashoffset:59}50%,52.5%{stroke-dashoffset:-25}75%,to{stroke-dashoffset:-109}}
        @keyframes spark4{from,27.5%{stroke-dashoffset:78}50%,52.5%{stroke-dashoffset:-42}75%,to{stroke-dashoffset:-162}}
        @keyframes spark5{from,27.5%{stroke-dashoffset:60}50%,52.5%{stroke-dashoffset:-60}75%,to{stroke-dashoffset:-180}}
        @keyframes spark6{from,27.5%{stroke-dashoffset:91}50%,52.5%{stroke-dashoffset:-29}75%,to{stroke-dashoffset:-149}}
        @keyframes spark7{from,27.5%{stroke-dashoffset:60}50%,52.5%{stroke-dashoffset:-26}75%,to{stroke-dashoffset:-112}}
        @keyframes spark8{from,27.5%{stroke-dashoffset:43}50%,52.5%{stroke-dashoffset:-43}75%,to{stroke-dashoffset:-129}}
        @keyframes spark9{from,27.5%{stroke-dashoffset:60}50%,52.5%{stroke-dashoffset:-26}75%,to{stroke-dashoffset:-112}}

        @keyframes wave-scale1{0%,25%,50%,75%{stroke-width:6px;transform:scale(1)}10%,35%,60%,85%,100%{stroke-width:0;transform:scale(2)}}
        @keyframes wave-scale2{5%,30%,55%,80%{stroke-width:6px;transform:scale(1)}15%,40%,65%,90%,100%{stroke-width:0;transform:scale(2)}}

        /* text animations */
        @keyframes c4TextPulse { 0%,100%{filter:none} 50%{filter:drop-shadow(0 0 8px rgba(0,194,255,.25))} }
        @keyframes c4Bar { 0%{transform:translateX(0%);width:18%} 50%{transform:translateX(82%);width:30%} 100%{transform:translateX(0%);width:18%} }
      `}</style>
    </div>
  );
}

/* SVG with padded viewBox so no limb is clipped */
function MicrochipSVG() {
  return (
    <svg
      className="microchip"
      viewBox="-8 -8 144 144"  // padding to prevent clipping
      role="img"
      aria-label="Control4 microchip pulses"
    >
      {/* dots */}
      <symbol id="dot-1"><circle r="3" cx="3" cy="38" /></symbol>
      <symbol id="dot-2"><circle r="3" cx="3" cy="54" /></symbol>
      <symbol id="dot-3"><circle r="3" cx="3" cy="70" /></symbol>
      <symbol id="dot-4"><circle r="3" cx="3" cy="3" /></symbol>
      <symbol id="dot-5"><circle r="3" cx="20" cy="3" /></symbol>
      <symbol id="dot-6"><circle r="3" cx="3" cy="30" /></symbol>
      <symbol id="dot-7"><circle r="3" cx="37" cy="3" /></symbol>
      <symbol id="dot-8"><circle r="3" cx="54" cy="3" /></symbol>
      <symbol id="dot-9"><circle r="3" cx="71" cy="3" /></symbol>

      {/* lines */}
      <symbol id="line-1"><polyline points="12 54,12 46,3 46,3 38" /></symbol>
      <symbol id="line-2"><polyline points="29 54,3 54" /></symbol>
      <symbol id="line-3"><polyline points="12 54,12 62,3 62,3 70" /></symbol>
      <symbol id="line-4"><polyline points="28 20,28 12,20 12,20 3" /></symbol>
      <symbol id="line-5"><polyline points="37 29,37 20,3 20,3 3" /></symbol>
      <symbol id="line-6"><polyline points="15 20,15 30,3 30" /></symbol>
      <symbol id="line-7"><polyline points="54 12,37 12,37 3" /></symbol>
      <symbol id="line-8"><polyline points="54 29,54 3" /></symbol>
      <symbol id="line-9"><polyline points="54 12,71 12,71 3" /></symbol>

      {/* sparks + wave */}
      <symbol id="spark-1"><polyline points="12 54,12 46,3 46,3 38" /></symbol>
      <symbol id="spark-2"><polyline points="29 54,3 54" /></symbol>
      <symbol id="spark-3"><polyline points="12 54,12 62,3 62,3 70" /></symbol>
      <symbol id="spark-4"><polyline points="28 20,28 12,20 12,20 3" /></symbol>
      <symbol id="spark-5"><polyline points="37 29,37 20,3 20,3 3" /></symbol>
      <symbol id="spark-6"><polyline points="15 20,15 30,3 30" /></symbol>
      <symbol id="spark-7"><polyline points="54 12,37 12,37 3" /></symbol>
      <symbol id="spark-8"><polyline points="54 29,54 3" /></symbol>
      <symbol id="spark-9"><polyline points="54 12,71 12,71 3" /></symbol>
      <symbol id="wave"><rect x="3" y="3" rx="2.5" ry="2.5" width="44" height="44" /></symbol>

      {/* draw */}
      <g transform="translate(10,10)">
        <g className="microchip__lines" strokeLinecap="round" strokeLinejoin="round">
          {/* left */}
          <g>
            <g fill="none" stroke="currentColor">
              <use className="microchip__line microchip__line--1" href="#line-1" />
              <use className="microchip__spark microchip__spark--1" href="#spark-1" />
              <use className="microchip__line microchip__line--2" href="#line-2" />
              <use className="microchip__spark microchip__spark--2" href="#spark-2" />
              <use className="microchip__line microchip__line--3" href="#line-3" />
              <use className="microchip__spark microchip__spark--3" href="#spark-3" />
            </g>
            <g fill="currentColor">
              <use className="microchip__dot microchip__dot--1" href="#dot-1" />
              <use className="microchip__dot microchip__dot--2" href="#dot-2" />
              <use className="microchip__dot microchip__dot--3" href="#dot-3" />
            </g>
          </g>

          {/* top */}
          <g>
            <g fill="none" stroke="currentColor">
              <use className="microchip__line microchip__line--4" href="#line-4" />
              <use className="microchip__spark microchip__spark--4" href="#spark-4" />
              <use className="microchip__line microchip__line--5" href="#line-5" />
              <use className="microchip__spark microchip__spark--5" href="#spark-5" />
              <use className="microchip__line microchip__line--6" href="#line-6" />
              <use className="microchip__spark microchip__spark--6" href="#spark-6" />
            </g>
            <g fill="currentColor">
              <use className="microchip__dot microchip__dot--4" href="#dot-4" />
              <use className="microchip__dot microchip__dot--5" href="#dot-5" />
              <use className="microchip__dot microchip__dot--6" href="#dot-6" />
            </g>
          </g>

          {/* right mirrors */}
          <g transform="translate(108,0) scale(-1,1)">
            <g fill="none" stroke="currentColor">
              <use className="microchip__line microchip__line--4" href="#line-4" />
              <use className="microchip__spark microchip__spark--4" href="#spark-4" />
              <use className="microchip__line microchip__line--5" href="#line-5" />
              <use className="microchip__spark microchip__spark--5" href="#spark-5" />
              <use className="microchip__line microchip__line--6" href="#line-6" />
              <use className="microchip__spark microchip__spark--6" href="#spark-6" />
            </g>
            <g fill="currentColor">
              <use className="microchip__dot microchip__dot--4" href="#dot-4" />
              <use className="microchip__dot microchip__dot--5" href="#dot-5" />
              <use className="microchip__dot microchip__dot--6" href="#dot-6" />
            </g>
          </g>
          <g transform="translate(108,0) scale(-1,1)">
            <g fill="none" stroke="currentColor">
              <use className="microchip__line microchip__line--1" href="#line-1" />
              <use className="microchip__spark microchip__spark--1" href="#spark-1" />
              <use className="microchip__line microchip__line--2" href="#line-2" />
              <use className="microchip__spark microchip__spark--2" href="#spark-2" />
              <use className="microchip__line microchip__line--3" href="#line-3" />
              <use className="microchip__spark microchip__spark--3" href="#spark-3" />
            </g>
            <g fill="currentColor">
              <use className="microchip__dot microchip__dot--1" href="#dot-1" />
              <use className="microchip__dot microchip__dot--2" href="#dot-2" />
              <use className="microchip__dot microchip__dot--3" href="#dot-3" />
            </g>
          </g>

          {/* bottom */}
          <g transform="translate(0,108) scale(1,-1)">
            <g fill="none" stroke="currentColor">
              <use className="microchip__line microchip__line--7" href="#line-7" />
              <use className="microchip__spark microchip__spark--7" href="#spark-7" />
              <use className="microchip__line microchip__line--8" href="#line-8" />
              <use className="microchip__spark microchip__spark--8" href="#spark-8" />
              <use className="microchip__line microchip__line--9" href="#line-9" />
              <use className="microchip__spark microchip__spark--9" href="#spark-9" />
            </g>
            <g fill="currentColor">
              <use className="microchip__dot microchip__dot--7" href="#dot-7" />
              <use className="microchip__dot microchip__dot--8" href="#dot-8" />
              <use className="microchip__dot microchip__dot--9" href="#dot-9" />
            </g>
          </g>
          <g transform="translate(0,108) scale(1,-1)">
            <g fill="none" stroke="currentColor">
              <use className="microchip__line microchip__line--4" href="#line-4" />
              <use className="microchip__spark microchip__spark--4" href="#spark-4" />
              <use className="microchip__line microchip__line--5" href="#line-5" />
              <use className="microchip__spark microchip__spark--5" href="#spark-5" />
              <use className="microchip__line microchip__line--6" href="#line-6" />
              <use className="microchip__spark microchip__spark--6" href="#spark-6" />
            </g>
            <g fill="currentColor">
              <use className="microchip__dot microchip__dot--4" href="#dot-4" />
              <use className="microchip__dot microchip__dot--5" href="#dot-5" />
              <use className="microchip__dot microchip__dot--6" href="#dot-6" />
            </g>
          </g>
        </g>

        {/* center */}
        <g transform="translate(29,29)">
          <g className="microchip__center">
            <g fill="none" stroke="currentColor" strokeWidth="6">
              <use className="microchip__wave microchip__wave--1" href="#wave" />
              <use className="microchip__wave microchip__wave--2" href="#wave" />
            </g>
            <rect className="microchip__core" fill="currentColor" rx="5" ry="5" width="50" height="50" />
          </g>
        </g>
      </g>
    </svg>
  );
}