import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle-btn"
      onClick={onToggle}
      className={`relative p-2 rounded-full border transition-colors duration-500 focus:outline-none focus:ring-1 ${
        theme === 'light'
          ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-800 focus:ring-neutral-400'
          : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200 focus:ring-neutral-700'
      }`}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -40 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 40 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <Sun className="w-5 h-5 stroke-[1.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: 40 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -40 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <Moon className="w-5 h-5 stroke-[1.5]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
