import { useState, useEffect } from 'react';

function getPresentations() {
  const data = localStorage.getItem('presentations');
  return data ? JSON.parse(data) : [];
}

function savePresentations(presentations) {
  localStorage.setItem('presentations', JSON.stringify(presentations));
}

export default function Editor({ presentationId, onBack }) {
  const [presentation, setPresentation] = useState(null);
  const [title, setTitle] = useState('');
  const [slides, setSlides] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const all = getPresentations();
    const pres = all.find(p => p.id === presentationId);
    if (pres) {
      setPresentation(pres);
      setTitle(pres.title);
      setSlides(pres.slides || []);
    }
  }, [presentationId]);

  function handleSave() {
    const all = getPresentations();
    const idx = all.findIndex(p => p.id === presentationId);
    if (idx !== -1) {
      all[idx] = { ...all[idx], title, slides };
      savePresentations(all);
      setPresentation(all[idx]);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    }
  }

  function handleAddSlide(e) {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSlides([...slides, { note: newNote.trim() }]);
    setNewNote('');
  }

  function handleRemoveSlide(idx) {
    setSlides(slides.filter((_, i) => i !== idx));
  }

  function handleEditSlide(idx, value) {
    setSlides(slides.map((slide, i) => i === idx ? { ...slide, note: value } : slide));
  }

  if (!presentation) {
    return (
      <div>
        <p>Apresentação não encontrada.</p>
        <button onClick={onBack}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 flex flex-col items-center py-10 dark:bg-gradient-to-br dark:from-slate-100 dark:via-slate-200 dark:to-blue-100">
      {/* Logo já é exibida pelo App.jsx, não precisa duplicar aqui */}
      <div className="w-full max-w-2xl bg-white/10 dark:bg-white/10 rounded-2xl shadow-2xl p-10">
        <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-100 rounded-lg font-medium shadow transition">&larr; Voltar</button>
  <h2 className="text-3xl font-bold mb-6 drop-shadow text-gray-100 dark:text-gray-900">Editar apresentação</h2>
        <div className="mb-4">
          <label className="block text-3xl font-bold mb-6 drop-shadow text-gray-100 dark:text-gray-900">Título</label>
        <input
          className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-100 dark:text-gray-900"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      {saved && (
        <div className="mb-2 text-green-700 bg-green-100 border border-green-300 dark:text-green-900 dark:bg-green-200 dark:border-green-400 rounded px-4 py-2 text-sm font-medium w-full text-center transition">Alterações salvas!</div>
      )}
  <form onSubmit={handleAddSlide} className="mb-4 flex flex-col gap-2">
        <textarea
          className="border rounded px-3 py-2 resize-y min-h-[64px] font-sans text-base bg-white dark:bg-gray-100 dark:text-gray-900"
          placeholder="Anotação do slide (múltiplas linhas)"
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          rows={4}
        />
        <div className="flex justify-between items-center mt-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition">Adicionar slide</button>
          <button type="button" onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">Salvar alterações</button>
        </div>
      </form>
  <hr className="my-8 border-gray-300 dark:border-gray-400" />
  <h3 className="text-3xl font-bold mb-6 drop-shadow text-gray-100 dark:text-gray-900">Slides desta apresentação</h3>
  <ul className="space-y-3">
        {slides.map((slide, idx) => (
          <li key={idx} className="flex flex-col gap-1 mb-2">
            <div className="flex items-start gap-2">
              <span className="font-bold mt-2 text-gray-100 dark:text-gray-900">{idx + 1}.</span>
              <textarea
                className="border rounded px-2 py-2 flex-1 resize-y min-h-[80px] font-sans text-base bg-white dark:bg-gray-100 dark:text-gray-900"
                value={slide.note}
                onChange={e => handleEditSlide(idx, e.target.value)}
                rows={4}
              />
            </div>
            <button
              className="mt-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow transition self-end"
              onClick={() => handleRemoveSlide(idx)}
            >Remover</button>
          </li>
        ))}
      </ul>
  {/* Botão Salvar removido daqui, agora está ao lado do Adicionar slide */}
      </div>
    </div>
  );
}
