'use client';

import { useApp } from '@/app/context';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { setCurrentScreen, scrollY } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setScrollProgress(Math.min(scrollY / 400, 1));
  }, [scrollY]);

  const interpolateColor = (color1: string, color2: string, t: number): string => {
    const hex = (x: number) => {
      return ('0' + parseInt(x.toString()).toString(16)).slice(-2);
    };
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    const r1 = (c1 >> 16) & 255,
      g1 = (c1 >> 8) & 255,
      b1 = c1 & 255;
    const r2 = (c2 >> 16) & 255,
      g2 = (c2 >> 8) & 255,
      b2 = c2 & 255;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `#${hex(r)}${hex(g)}${hex(b)}`;
  };

  const color1 = interpolateColor('#F4F6F6', '#1C2833', scrollProgress * 0.3);
  const color2 = interpolateColor('#609E99', '#1C2833', scrollProgress * 0.5);

  const bgGradient = `repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px), linear-gradient(180deg,
    ${color1} 0%,
    ${color2} 45%,
    #1C2833 100%)`;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: bgGradient }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-14 py-20 text-center relative z-5">
        <div className="text-xs tracking-widest text-gray-800 font-bold uppercase mb-8 opacity-85">
          1,335 VOC-Disease Associations
        </div>

        <h1
          className="text-7xl font-light leading-tight text-gray-800 mb-6"
          style={{ fontFamily: "'Georgia', 'Garamond', serif", letterSpacing: '-1px' }}
        >
          Clarity in <span className="italic font-light">Complexity</span>
        </h1>

        <p className="text-base text-gray-800 max-w-2xl mx-auto mb-14 leading-relaxed font-normal opacity-90">
          Transform scattered VOC literature into interpretable biomarker hypotheses. Discover disease-associated
          chemical signatures and validate screening panels with confidence.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setCurrentScreen('diseaseAtlas')}
            className="px-9 py-3.5 bg-gray-900 text-gray-100 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            Explore Database
          </button>
          <button
            onClick={() => setCurrentScreen('vocChecker')}
            className="px-9 py-3.5 bg-transparent text-gray-900 border-1.5 border-gray-900 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gray-100 transition-colors"
          >
            Test a VOC
          </button>
        </div>
      </div>
    </div>
  );
}
