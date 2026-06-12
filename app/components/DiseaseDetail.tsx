'use client';

import { useApp } from '@/app/context';

export default function DiseaseDetail() {
  const { selectedDisease, setCurrentScreen } = useApp();

  if (!selectedDisease) return null;

  const d = selectedDisease;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px), linear-gradient(180deg, #F4F6F6 0%, #609E99 45%, #1C2833 100%)',
      }}
    >
      <div className="sticky top-0 z-20 px-14 py-7 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <button
          onClick={() => setCurrentScreen('diseaseAtlas')}
          className="text-xs font-bold text-gray-800 tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          ← Back to Database
        </button>
      </div>

      <div className="flex-1 px-14 py-14 max-w-4xl mx-auto w-full">
        <div className="p-12 bg-white/95 rounded-xl border border-white/30 shadow-md">
          <div className="flex items-start justify-between mb-3">
            <h1
              className="text-5xl font-light text-gray-800 m-0"
              style={{ fontFamily: "'Georgia', 'Garamond', serif" }}
            >
              {d.name}
            </h1>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: d.evidenceColor }}
              />
              <span className="text-xs font-bold text-gray-800 tracking-widest uppercase">
                {d.evidence}
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-10 m-0 font-normal">{d.sampleSource}</p>

          <div className="mb-10">
            <h3 className="text-xs font-bold text-gray-800 mb-4 tracking-widest uppercase">
              VOC Families
            </h3>
            <div className="flex flex-wrap gap-2">
              {d.vocFamilies.map(voc => (
                <span key={voc} className="px-3.5 py-2 bg-teal-100 text-teal-700 rounded text-sm font-medium">
                  {voc}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-bold text-gray-800 mb-4 tracking-widest uppercase">
              Biological Pathways
            </h3>
            <div className="p-5 bg-teal-50 rounded-lg border-l-4 border-teal-600">
              <ul className="list-none p-0 m-0">
                {d.pathways.map(p => (
                  <li key={p} className="py-2 text-gray-800 text-sm font-normal">
                    → {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-bold text-gray-800 mb-4 tracking-widest uppercase">
              Confounders to Monitor
            </h3>
            <div className="p-5 bg-gray-100 rounded-lg border-l-4" style={{ borderColor: '#AAB3B8' }}>
              <ul className="list-none p-0 m-0">
                {d.confounders.map(c => (
                  <li key={c} className="py-2 text-gray-800 text-sm font-normal">
                    ⚠ {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('panelBuilder')}
            className="w-full px-8 py-3.5 bg-gray-900 text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            Build Panel
          </button>
        </div>
      </div>
    </div>
  );
}
