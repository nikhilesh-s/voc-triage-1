'use client';

import { useApp } from '@/app/context';

export default function Header() {
  const { currentScreen, setCurrentScreen } = useApp();

  const isHome = currentScreen === 'home';

  return (
    <div
      className="sticky top-0 z-20 flex items-center justify-between px-14 py-7 bg-white/5 backdrop-blur-md border-b border-white/8"
      style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="text-xs font-semibold tracking-widest text-gray-800 uppercase">
        VOC-Triage
      </div>

      <div className="flex gap-12 text-xs text-gray-800 font-semibold tracking-widest uppercase">
        <button
          onClick={() => setCurrentScreen('diseaseAtlas')}
          className="hover:opacity-70 transition-opacity"
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          Database
        </button>
        <button
          onClick={() => setCurrentScreen('vocChecker')}
          className="hover:opacity-70 transition-opacity"
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          VOC Search
        </button>
        <button
          onClick={() => setCurrentScreen('panelBuilder')}
          className="hover:opacity-70 transition-opacity"
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          Builder
        </button>
      </div>

      <button
        onClick={() => setCurrentScreen('panelBuilder')}
        className="px-7 py-2.5 bg-gray-100 text-gray-800 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}
