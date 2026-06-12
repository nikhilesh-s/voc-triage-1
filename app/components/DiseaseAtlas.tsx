'use client';

import { useApp } from '@/app/context';

export default function DiseaseAtlas() {
  const { diseases, diseaseSearch, setDiseaseSearch, setCurrentScreen, setSelectedDisease } = useApp();

  const filtered = diseaseSearch
    ? diseases.filter(d => d.name.toLowerCase().includes(diseaseSearch.toLowerCase()))
    : diseases;

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
          <h2 className="text-xs font-bold text-gray-800 m-0 tracking-widest uppercase">Disease Database</h2>
        </div>
      </div>

      <div className="flex-1 px-14 py-14">
        <div className="mb-12 max-w-md">
          <input
            type="text"
            placeholder="Search by disease name..."
            value={diseaseSearch}
            onChange={e => setDiseaseSearch(e.target.value)}
            className="w-full px-4.5 py-3.5 border border-white/20 rounded-lg text-sm font-normal text-gray-800 bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(disease => (
            <div
              key={disease.name}
              onClick={() => {
                setSelectedDisease(disease);
                setCurrentScreen('diseaseDetail');
              }}
              className="p-8 bg-white/95 border border-white/30 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className="text-lg font-medium text-gray-800 m-0">{disease.name}</h3>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: disease.evidenceColor }}
                  />
                  <span className="text-xs font-bold text-gray-800 tracking-widest uppercase">
                    {disease.evidence}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6 m-0 font-normal">{disease.sampleSource}</p>

              <div className="flex flex-wrap gap-1.5">
                {disease.vocFamilies.map(voc => (
                  <span
                    key={voc}
                    className="px-3 py-1.5 bg-teal-100 text-teal-700 rounded text-xs font-medium"
                  >
                    {voc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
