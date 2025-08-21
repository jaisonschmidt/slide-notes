// Componente ThemeToggle para alternar entre light e dark mode
export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-white border border-gray-300 dark:border-gray-300 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      title={darkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      aria-label="Alternar tema"
    >
      {darkMode ? (
        // Ícone de lua escuro para fundo branco
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      ) : (
        // Ícone de sol escuro para fundo branco
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
      )}
    </button>
  );
}
