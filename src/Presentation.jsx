import { useEffect, useState } from 'react';

function getPresentations() {
  const data = localStorage.getItem('presentations');
  return data ? JSON.parse(data) : [];
}

export default function Presentation({ presentationId, onBack }) {
  const [presentation, setPresentation] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const all = getPresentations();
    const pres = all.find(p => p.id === presentationId);
    if (pres) setPresentation(pres);
  }, [presentationId]);

  if (!presentation) {
    return (
      <div>
        <p>Apresentação não encontrada.</p>
        <button onClick={onBack}>Voltar</button>
      </div>
    );
  }

  const slides = presentation.slides || [];
  const total = slides.length;

  function goNext() {
    setCurrent(c => (c < total - 1 ? c + 1 : c));
  }
  function goPrev() {
    setCurrent(c => (c > 0 ? c - 1 : c));
  }

  return (
  <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 dark:bg-gradient-to-br dark:from-slate-100 dark:via-slate-200 dark:to-blue-100 text-white dark:text-gray-900 font-sans relative">
  <header className="w-full flex items-center gap-4 px-8 py-4 sticky top-0 left-0 z-10 bg-transparent">
        <button onClick={onBack} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold shadow-lg transition">Sair</button>
        <span className="ml-4 text-sm font-medium text-blue-100 dark:text-blue-900 truncate max-w-xs" title={presentation.title}>{presentation.title}</span>
      </header>
  <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-white/10 dark:bg-white/80 rounded-2xl shadow-2xl p-10 mt-8">
        {total === 0 ? (
          <p className="text-gray-300 dark:text-gray-600">Nenhum slide cadastrado.</p>
        ) : (
          <>
            <div className="flex-1 flex items-center justify-center w-full mb-10">
              <span className="text-2xl leading-relaxed text-white/90 dark:text-gray-900 whitespace-pre-line text-center font-medium drop-shadow-lg">{slides[current].note}</span>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <button onClick={goPrev} disabled={current === 0} className="px-6 py-2 bg-blue-700 hover:bg-blue-800 dark:bg-blue-200 dark:hover:bg-blue-300 rounded text-white dark:text-blue-900 font-semibold shadow disabled:opacity-40 transition">Anterior</button>
              <span className="text-lg font-bold tracking-widest text-blue-200 dark:text-blue-900">{current + 1} / {total}</span>
              <button onClick={goNext} disabled={current === total - 1} className="px-6 py-2 bg-blue-700 hover:bg-blue-800 dark:bg-blue-200 dark:hover:bg-blue-300 rounded text-white dark:text-blue-900 font-semibold shadow disabled:opacity-40 transition">Próximo</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
