'use client';

import { useApp } from '@/app/context';

export default function VOCChecker() {
  const { vocSearch, setVocSearch, setCurrentScreen, vocDatabase } = useApp();

  const getVocResult = (search: string) => {
    const lower = search.toLowerCase().replace(/\s/g, '_');
    for (const key in vocDatabase) {
      if (key.includes(lower) || vocDatabase[key].name.toLowerCase().includes(search.toLowerCase())) {
        return vocDatabase[key];
      }
    }
    return null;
  };

  const result = vocSearch ? getVocResult(vocSearch) : null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px), linear-gradient(180deg, #F4F6F6 0%, #609E99 45%, #1C2833 100%)',
      }}
    >
      <div
        className="sticky top-0 z-20 px-14 py-7 border-b border-white/10 flex items-center gap-6 bg-white/5 backdrop-blur-md"
      >
        <button
          onClick={() => setCurrentScreen('home')}
          className="text-xs font-bold text-gray-800 tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          ← Home
        </button>
        <h2 className="text-xs font-bold text-gray-800 m-0 tracking-widest uppercase">VOC Specificity Checker</h2>
      </div>

      <div className="flex-1 px-14 py-14 max-w-4xl mx-auto w-full">
        <div className="p-12 bg-white/95 rounded-xl border border-white/30 shadow-md">
          <input
            type="text"
            placeholder="Search a VOC (isoprene, dimethyl sulfide, acetone, benzene)..."
            value={vocSearch}
            onChange={e => setVocSearch(e.target.value)}
            className="w-full px-4.5 py-3.5 border border-teal-200 rounded-lg text-sm font-normal text-gray-800 mb-8 bg-white focus:outline-none focus:ring-2 focus:ring-offset-0"
          />

          {result ? (
            <div>
              <div className="p-7 bg-teal-50 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-light text-gray-800 m-0">{result.name}</h3>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: result.specificityColor }}
                    />
                    <span className="text-xs font-bold text-gray-800 tracking-widest uppercase">
                      {result.specificity}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs text-gray-500 font-bold mb-2 tracking-widest uppercase m-0">
                    Disease Contexts
                  </p>
                  <ul className="list-none p-0 m-0">
                    {result.contexts.map(c => (
                      <li key={c} className="py-1.5 text-gray-800 text-sm">
                        • {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-white rounded border-l-4 border-teal-600">
                  <p className="text-sm text-gray-800 m-0 leading-relaxed font-normal">
                    {result.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-10 py-20 text-center text-gray-500">
              <p className="text-sm font-normal">Search for a VOC to see specificity analysis and disease associations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
