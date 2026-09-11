import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
      title={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
      className={`relative inline-flex items-center justify-center p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-emerald-800 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
