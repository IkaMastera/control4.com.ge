'use client';

import { useEffect, useMemo, useState } from 'react';

const KEY = 'c4_intro_chip_seen';

function getQueryFlag(name: string) {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has(name);
}

export default function IntroLoaderChip() {
  const [show, setShow] = useState(false);

  // ?debugIntro=1 forces it on; ?resetIntro=1 clears the session flag
  const force = useMemo(() => getQueryFlag('debugIntro'), []);
  const reset = useMemo(() => getQueryFlag('resetIntro'), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (reset) sessionStorage.removeItem(KEY);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem(KEY);

    if (!force) {
      if (prefersReduced) return; // respect accessibility
      if (seen) return;           // one-time only
    }

    setShow(true);
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(KEY, '1');
    }, 1400);

    return () => window.clearTimeout(t);
  }, [force, reset]);

  if (!show) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[9999] grid place-items-center"
    >
      <div className="relative select-none">
        {/* Glow */}
        <div className="absolute -inset-6 -z-10 blur-2xl opacity-80 bg-[radial-gradient(40%_60%_at_50%_100%,rgba(0,86,184,0.35),rgba(0,194,255,0.12)_70%,transparent)]" />
        {/* Chip badge */}
        <div className="mx-auto flex items-center gap-3 rounded-xl bg-white/6 px-4 py-3 ring-1 ring-white/12 backdrop-blur">
          <div className="text-[--color-primary]">
            <MicrochipSVG />
          </div>
          <span className="text-xs sm:text-sm leading-none text-white/85">
            Connecting to Control4 Director…
          </span>
        </div>
      </div>

      <style jsx>{`
        .microchip { display:block; width:64px; height:64px; }
        .microchip__center,
        .microchip__dot,
        .microchip__line,
        .microchip__lines,
        .microchip__spark,
        .microchip__wave {
          animation-duration: 5s;
          animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
          animation-iteration-count: infinite;
        }
        .microchip__core, .microchip__dot {
          fill: color-mix(in srgb, currentColor 60%, #0D1117 40%);
          transition: fill .3s;
        }
        .microchip__line { stroke: color-mix(in srgb, currentColor 60%, #0D1117 40%); }
        .microchip__spark, .microchip__wave { stroke: color-mix(in srgb, currentColor 85%, white 0%); animation-timing-function: linear; }
        .microchip__center, .microchip__wave { transform-origin: 25px 25px; }
        .microchip__center { animation-name: center-scale; }
        .microchip__lines { animation-name: lines-scale; transform-origin: 54px 54px; }

        @keyframes center-scale { from,to{transform:scale(0)} 12.5%,75%{transform:scale(1)} }
        @keyframes lines-scale { from{opacity:1;transform:scale(0)} 12.5%,75%{opacity:1;transform:scale(1)} 93.75%,to{opacity:0;transform:scale(.5)} }

        .microchip__line--1{animation-name:line-draw1} .microchip__line--2{animation-name:line-draw2} .microchip__line--3{animation-name:line-draw3}
        .microchip__line--4{animation-name:line-draw4} .microchip__line--5{animation-name:line-draw5} .microchip__line--6{animation-name:line-draw6}
        .microchip__line--7{animation-name:line-draw7} .microchip__line--8{animation-name:line-draw8} .microchip__line--9{animation-name:line-draw9}

        @keyframes line-draw1{from,93.75%,to{stroke-dashoffset:59}25%,68.75%{stroke-dashoffset:17}}
        @keyframes line-draw2{from,93.75%,to{stroke-dashoffset:42}25%,68.75%{stroke-dashoffset:0}}
        @keyframes line-draw3{from,93.75%,to{stroke-dashoffset:59}25%,68.75%{stroke-dashoffset:17}}
        @keyframes line-draw4{from,93.75%,to{stroke-dashoffset:78}25%,68.75%{stroke-dashoffset:18}}
        @keyframes line-draw5{from,93.75%,to{stroke-dashoffset:60}25%,68.75%{stroke-dashoffset:0}}
        @keyframes line-draw6{from,93.75%,to{stroke-dashoffset:91}25%,68.75%{stroke-dashoffset:31}}
        @keyframes line-draw7{from,93.75%,to{stroke-dashoffset:60}25%,68.75%{stroke-dashoffset:17}}
        @keyframes line-draw8{from,93.75%,to{stroke-dashoffset:43}25%,68.75%{stroke-dashoffset:0}}
        @keyframes line-draw9{from,93.75%,to{stroke-dashoffset:60}25%,68.75%{stroke-dashoffset:17}}

        .microchip__spark--1{animation-name:spark1} .microchip__spark--2{animation-name:spark2} .microchip__spark--3{animation-name:spark3}
        .microchip__spark--4{animation-name:spark4} .microchip__spark--5{animation-name:spark5} .microchip__spark--6{animation-name:spark6}
        .microchip__spark--7{animation-name:spark7} .microchip__spark--8{animation-name:spark8} .microchip__spark--9{animation-name:spark9}

        @keyframes spark1{from,27.5%{stroke-dashoffset:59}50%,52.5%{stroke-dashoffset:-25}75%,to{stroke-dashoffset:-109}}
        @keyframes spark2{from,27.5%{stroke-dashoffset:42}50%,52.5%{stroke-dashoffset:-42}75%,to{stroke-dashoffset:-126}}
        @keyframes spark3{from,27.5%{stroke-dashoffset:59}50%,52.5%{stroke-dashoffset:-25}75%,to{stroke-dashoffset:-109}}
        @keyframes spark4{from,27.5%{stroke-dashoffset:78}50%,52.5%{stroke-dashoffset:-42}75%,to{stroke-dashoffset:-162}}
        @keyframes spark5{from,27.5%{stroke-dashoffset:60}50%,52.5%{stroke-dashoffset:-60}75%,to{stroke-dashoffset:-180}}
        @keyframes spark6{from,27.5%{stroke-dashoffset:91}50%,52.5%{stroke-dashoffset:-29}75%,to{stroke-dashoffset:-149}}
        @keyframes spark7{from,27.5%{stroke-dashoffset:60}50%,52.5%{stroke-dashoffset:-26}75%,to{stroke-dashoffset:-112}}
        @keyframes spark8{from,27.5%{stroke-dashoffset:43}50%,52.5%{stroke-dashoffset:-43}75%,to{stroke-dashoffset:-129}}
        @keyframes spark9{from,27.5%{stroke-dashoffset:60}50%,52.5%{stroke-dashoffset:-26}75%,to{stroke-dashoffset:-112}}
      `}</style>
    </div>
  );
}

function MicrochipSVG() {
  return (
    <svg
      className="microchip"
      viewBox="0 0 128 128"
      width="64"
      height="64"
      role="img"
      aria-label="Control4 microchip pulses while connecting"
    >
      {/* symbols */}
      <symbol id="dot-1"><circle r="3" cx="3" cy="38" /></symbol>
      <symbol id="dot-2"><circle r="3" cx="3" cy="54" /></symbol>
      <symbol id="dot-3"><circle r="3" cx="3" cy="70" /></symbol>
      <symbol id="dot-4"><circle r="3" cx="3" cy="3" /></symbol>
      <symbol id="dot-5"><circle r="3" cx="20" cy="3" /></symbol>
      <symbol id="dot-6"><circle r="3" cx="3" cy="30" /></symbol>
      <symbol id="dot-7"><circle r="3" cx="37" cy="3" /></symbol>
      <symbol id="dot-8"><circle r="3" cx="54" cy="3" /></symbol>
      <symbol id="dot-9"><circle r="3" cx="71" cy="3" /></symbol>

      <symbol id="line-1"><polyline points="12 54,12 46,3 46,3 38" strokeDasharray="42 42" /></symbol>
      <symbol id="line-2"><polyline points="29 54,3 54" strokeDasharray="42 42" /></symbol>
      <symbol id="line-3"><polyline points="12 54,12 62,3 62,3 70" strokeDasharray="42 42" /></symbol>
      <symbol id="line-4"><polyline points="28 20,28 12,20 12,20 3" strokeDasharray="60 60" /></symbol>
      <symbol id="line-5"><polyline points="37 29,37 20,3 20,3 3" strokeDasharray="60 60" /></symbol>
      <symbol id="line-6"><polyline points="15 20,15 30,3 30" strokeDasharray="60 60" /></symbol>
      <symbol id="line-7"><polyline points="54 12,37 12,37 3" strokeDasharray="43 43" /></symbol>
      <symbol id="line-8"><polyline points="54 29,54 3" strokeDasharray="43 43" /></symbol>
      <symbol id="line-9"><polyline points="54 12,71 12,71 3" strokeDasharray="43 43" /></symbol>

      <symbol id="spark-1"><polyline points="12 54,12 46,3 46,3 38" strokeDasharray="15 69" /></symbol>
      <symbol id="spark-2"><polyline points="29 54,3 54" strokeDasharray="15 69" /></symbol>
      <symbol id="spark-3"><polyline points="12 54,12 62,3 62,3 70" strokeDasharray="15 69" /></symbol>
      <symbol id="spark-4"><polyline points="28 20,28 12,20 12,20 3" strokeDasharray="15 105" /></symbol>
      <symbol id="spark-5"><polyline points="37 29,37 20,3 20,3 3" strokeDasharray="15 105" /></symbol>
      <symbol id="spark-6"><polyline points="15 20,15 30,3 30" strokeDasharray="15 105" /></symbol>
      <symbol id="spark-7"><polyline points="54 12,37 12,37 3" strokeDasharray="15 71" /></symbol>
      <symbol id="spark-8"><polyline points="54 29,54 3" strokeDasharray="15 71" /></symbol>
      <symbol id="spark-9"><polyline points="54 12,71 12,71 3" strokeDasharray="15 71" /></symbol>

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
          {/* right mirror */}
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
          {/* right extra */}
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
          {/* bottom extra */}
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