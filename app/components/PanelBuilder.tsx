'use client';

import { useApp } from '@/app/context';

export default function PanelBuilder() {
  const { setCurrentScreen, candidatePanels, setShowTriageModal } = useApp();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px), linear-gradient(180deg, #F4F6F6 0%, #609E99 45%, #1C2833 100%)',
      }}
    >
      <div
        className="sticky top-0 z-20 px-14 py-7 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md"
      >
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentScreen('home')}
            className="text-xs font-bold text-gray-800 tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            ← Home
          </button>
          <h2 className="text-xs font-bold text-gray-800 m-0 tracking-widest uppercase">Panel Builder</h2>
        </div>

        <button
          onClick={() => setShowTriageModal(true)}
          className="px-7 py-2.5 bg-green-500 text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-green-600 transition-colors"
        >
          Run Analysis
        </button>
      </div>

      <div className="flex-1 px-14 py-14 max-w-6xl mx-auto w-full">
        <div className="p-12 bg-white/95 rounded-xl border border-white/30 shadow-md">
          <h3 className="text-xs font-bold text-gray-800 mb-8 tracking-widest uppercase">Candidate Panels</h3>

          <div className="space-y-7">
            {candidatePanels.map(panel => (
              <div
                key={panel.name}
                className="p-7 bg-teal-50 rounded-lg border border-teal-200"
              >
                <div className="mb-4">
                  <h4 className="text-base font-medium text-gray-800 m-0 mb-1">
                    {panel.name}
                  </h4>
                  <p className="text-sm text-gray-500 m-0 font-normal">
                    {panel.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {panel.vocs.map(voc => (
                    <span
                      key={voc}
                      className="px-3 py-1.5 bg-gray-900 text-white rounded text-xs font-semibold"
                    >
                      {voc}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500 m-0 font-medium">
                  Confidence: <strong>{panel.confidence}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
