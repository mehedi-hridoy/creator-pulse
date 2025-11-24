import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-11 h-11 rounded-button
                 bg-light-card-DEFAULT dark:bg-dark-card-DEFAULT
                 border border-light-border-soft dark:border-dark-border-soft
                 shadow-card-light dark:shadow-card-dark
                 hover:shadow-xl
                 transition-all duration-300 ease-out
                 hover:scale-105 active:scale-95
                 group overflow-hidden"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      {/* Sun Icon (Light Mode) */}
      <Sun 
        className={`absolute w-5 h-5 text-amber-500 transition-all duration-300 ${
          theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      
      {/* Moon Icon (Dark Mode) */}
      <Moon 
        className={`absolute w-5 h-5 text-blue-400 transition-all duration-300 ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
}
