
import { useState, useEffect } from 'react';
import Editor from './Editor';
import Presentation from './Presentation';
import ThemeToggle from './ThemeToggle';

function getPresentations() {
  const data = localStorage.getItem('presentations');
  return data ? JSON.parse(data) : [];
}

function savePresentations(presentations) {
  localStorage.setItem('presentations', JSON.stringify(presentations));
}

export default function App() {
  function handleBack() {
    setEditingId(null);
    setPresentingId(null);
  }
  function confirmDelete() {
    if (!deleteModal.id) return;
    const updated = presentations.filter(p => p.id !== deleteModal.id);
    setPresentations(updated);
    savePresentations(updated);
    setDeleteModal({ open: false, id: null });
  }
  function cancelDelete() {
    setDeleteModal({ open: false, id: null });
  }
  const [presentations, setPresentations] = useState(() => getPresentations());
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [presentingId, setPresentingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [darkMode, setDarkMode] = useState(() => {
    // Preferência salva ou sistema
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  function handleEdit(id) {
    setEditingId(id);
  }

  function handleDeletePresentation(id) {
    setDeleteModal({ open: true, id });
  }

  function handleCreatePresentation(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newPresentation = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      slides: [],
    };
    const updated = [...presentations, newPresentation];
    setPresentations(updated);
    savePresentations(updated);
    setNewTitle('');
    setShowForm(false);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Atualiza o título da página conforme a tela
  useEffect(() => {
    if (editingId) {
      const pres = presentations.find(p => p.id === editingId);
      document.title = pres ? `Slide Notes - ${pres.title}` : 'Slide Notes - Editar apresentação';
    } else if (presentingId) {
      const pres = presentations.find(p => p.id === presentingId);
      document.title = pres ? `Slide Notes - ${pres.title}` : 'Slide Notes - Apresentação';
    } else if (showForm) {
      document.title = 'Slide Notes - Criar apresentação';
    } else {
      document.title = 'Slide Notes';
    }
  }, [editingId, presentingId, showForm, presentations]);


  // Renderização condicional correta
  if (editingId) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-col items-center pt-6">
          <img src="/slide-note-logo.svg" alt="Slide Note logo" className="h-14 w-auto mb-6 select-none" draggable="false" />
        </div>
        <Editor presentationId={editingId} onBack={handleBack} />
      </div>
    );
  }
  if (presentingId) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <Presentation presentationId={presentingId} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-col items-center pt-6">
        <img src="/slide-note-logo.svg" alt="Slide Note logo" className="h-16 w-auto mb-8 select-none" draggable="false" />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 flex flex-col items-center py-10 dark:bg-gradient-to-br dark:from-slate-100 dark:via-slate-200 dark:to-blue-100">
  <h1 className="text-3xl font-bold mb-6 drop-shadow text-gray-100 dark:text-gray-900">Minhas Apresentações</h1>
        {!showForm ? (
          <>
            {deleteModal.open && ( 
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"> 
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-xs w-full flex flex-col items-center"> 
                  <h2 className="text-lg font-bold mb-2 text-gray-800">Excluir apresentação</h2> 
                  <p className="text-gray-600 text-center mb-6 text-sm"> 
                    Tem certeza que deseja excluir <br /> 
                    <span className="font-semibold text-red-600">{presentations.find(p => p.id === deleteModal.id)?.title}</span>? 
                  </p> 
                  <div className="flex gap-3 w-full justify-center"> 
                    <button onClick={cancelDelete} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium">Cancelar</button> 
                    <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium">Excluir</button> 
                  </div> 
                </div> 
              </div> 
            )}
            <div className="w-full max-w-xl bg-white rounded-lg shadow p-6 mb-8">
              {presentations.length === 0 ? (
                <div className="flex justify-center items-center h-24">
                  <p className="text-gray-500 text-center w-full">Nenhuma apresentação encontrada.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {presentations.map((pres) => (
                    <li key={pres.id} className="border-b pb-2">
                      <span className="font-medium block mb-2">{pres.title}</span>
                      <div className="flex gap-2">
                        <button
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-medium shadow-sm text-xs transition"
                          onClick={() => handleEdit(pres.id)}
                          title="Editar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4 1a1 1 0 01-1.263-1.263l1-4a4 4 0 01.828-1.414z" /></svg>
                          Editar
                        </button>
                        <button
                          className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded font-medium shadow-sm text-xs transition"
                          onClick={() => setPresentingId(pres.id)}
                          title="Apresentar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.118v7.764a1 1 0 001.234.97l6.518-1.757A1 1 0 0016 14.118v-2.236a1 1 0 00-1.248-.714z" /></svg>
                          Apresentar
                        </button>
                        <button
                          className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium shadow-sm text-xs transition"
                          onClick={() => handleDeletePresentation(pres.id)}
                          title="Excluir"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-center mt-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition font-semibold"
                onClick={() => setShowForm(true)}
              >
                + Criar apresentação
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleCreatePresentation} className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <label className="font-medium">Título da apresentação</label>
            <input
              className="border rounded px-3 py-2"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowForm(false)}>Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Criar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
