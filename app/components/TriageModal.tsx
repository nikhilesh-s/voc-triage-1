'use client';

import { useApp } from '@/app/context';

export default function TriageModal() {
  const { showTriageModal, setShowTriageModal, demoTriageResult } = useApp();

  if (!showTriageModal) return null;

  const r = demoTriageResult;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto p-12 border border-white/30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-light text-gray-800 m-0">Triage Results</h2>
          <button
            onClick={() => setShowTriageModal(false)}
            className="bg-none border-none text-2xl cursor-pointer text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-8">
          <div className="p-6 bg-green-100 rounded-lg text-center">
            <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2 m-0">
              Priority Score
            </p>
            <p className="text-5xl font-bold text-green-600 m-0">{r.score}</p>
          </div>
          <div className="p-6 bg-teal-100 rounded-lg text-center">
            <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2 m-0">
              Confidence
            </p>
            <p className="text-5xl font-bold text-teal-600 m-0">{r.confidence}%</p>
          </div>
        </div>

        <div className="p-5 bg-gray-100 border-l-4" style={{ borderColor: '#AAB3B8' }} >
          <p className="text-sm font-semibold text-gray-800 m-0">{r.flag}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-800 mb-4 tracking-widest uppercase">
            Top Chemical Features
          </h3>
          {r.topFeatures.map(f => (
            <div key={f.name} className="mb-3">
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-gray-800 font-semibold">{f.name}</span>
                <span className="text-xs text-gray-500">{f.importance}%</span>
              </div>
              <div className="h-1.5 bg-gray-300 rounded overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${f.importance}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-800 mb-3 tracking-widest uppercase">
            Confounders
          </h3>
          <ul className="list-none p-0 m-0">
            {r.confounders.map(c => (
              <li key={c} className="py-2 text-gray-800 text-sm">
                ⚠ {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 bg-teal-50 rounded-lg mb-7 border-l-4 border-green-500">
          <p className="text-xs text-gray-500 font-bold mb-2 tracking-widest uppercase m-0">
            Recommendation
          </p>
          <p className="text-sm text-gray-800 leading-relaxed m-0 font-normal">
            {r.recommendation}
          </p>
        </div>

        <button
          onClick={() => setShowTriageModal(false)}
          className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
