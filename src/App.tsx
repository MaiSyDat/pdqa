import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Inbox, RotateCcw, Heart, MessageSquare, ArrowLeft, Mail, Play, Image as ImageIcon } from 'lucide-react';
import AudioPlayer from './components/AudioPlayer';
import Envelope from './components/Envelope';
import LetterContent from './components/LetterContent';
import MessengerIntro from './components/MessengerIntro';
import CinemaIntro from './components/CinemaIntro';
import MemorySpace3D from './components/MemorySpace3D';
import { Theme } from './types';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Default to 'light' for high-quality light experience on load
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [currentStage, setCurrentStage] = useState<'intro' | 'chat' | 'letter' | 'space'>('intro');

  // Prevent scroll on body during Chat, Intro & Space stages
  useEffect(() => {
    if (currentStage === 'chat' || currentStage === 'intro' || currentStage === 'space') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [currentStage]);

  // Sync theme to localStorage and body styles
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;

    if (currentStage === 'intro' || currentStage === 'space') {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#faf9f5';
      document.body.style.color = '#2d2b28';
      return;
    }

    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#141312'; // Cozy dark charcoal graphite
      document.body.style.color = '#e3e1db';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#faf9f5'; // Calm premium organic off-white
      document.body.style.color = '#2d2b28';
    }
  }, [theme, currentStage]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      id="root-container"
      className={`flex flex-col font-sans antialiased relative transition-colors duration-700 ${currentStage === 'intro' || currentStage === 'chat' ? 'h-dvh overflow-hidden' : 'min-h-screen'
        } ${currentStage === 'intro'
          ? 'bg-[#faf9f5] text-[#2d2b28]'
          : theme === 'light'
            ? 'bg-[#faf9f5] text-neutral-800'
            : 'bg-[#141312] text-neutral-200'
        }`}
    >
      {/* Persistent Audio player logic (no UI is rendered) */}
      <AudioPlayer theme={theme} />

      {/* Exquisite Top Control Header - Persistent Navigation Bar */}
      {currentStage !== 'intro' && (
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between relative z-40 transition-all duration-300 border-b border-neutral-200/10 shrink-0">
          {/* Left Side: Branding / Back to chat */}
          <div className="flex items-center gap-2">
            {currentStage === 'letter' ? (
              <button
                id="back-to-chat-btn"
                onClick={() => setCurrentStage('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-tight transition-all cursor-pointer hover:scale-105 active:scale-95 ${theme === 'light'
                  ? 'border-neutral-200/80 bg-white hover:bg-neutral-50 hover:text-neutral-900 text-neutral-600 shadow-sm'
                  : 'border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-100'
                  }`}
                title="Quay về màn hình tin nhắn"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Xem Tin Nhắn</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 select-none">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse shrink-0" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
                  Dear, my love
                </span>
              </div>
            )}
          </div>

          {/* Right Side: Quick Stages, Audio and Theme Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Persistent Envelope / Mail Icon Shortcut */}
            <button
              id="nav-mail-shortcut-btn"
              onClick={() => setCurrentStage('letter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-tight transition-all cursor-pointer hover:scale-105 active:scale-95 ${currentStage === 'letter'
                ? 'border-pink-300 dark:border-pink-900 bg-pink-100/20 text-pink-500 dark:text-pink-400 font-bold'
                : theme === 'light'
                  ? 'border-neutral-200/80 bg-white hover:border-pink-200 text-neutral-600 hover:text-pink-500 shadow-sm'
                  : 'border-neutral-800 bg-neutral-900/40 hover:border-pink-900 text-neutral-400 hover:text-pink-400'
                }`}
              title="Đến bức thư tay viết riêng"
            >
              <Mail className={`w-3.5 h-3.5 ${currentStage === 'letter' ? 'text-pink-500 fill-pink-500/10' : 'text-neutral-500 dark:text-neutral-400'}`} />
              <span className="hidden xs:inline">Thư Tay</span>
            </button>

            {/* Persistent Chat Shortcut for easy navigation */}
            {currentStage !== 'chat' && (
              <button
                id="re-open-chat-btn"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('play-bgm'));
                  setCurrentStage('chat');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-tight transition-all cursor-pointer hover:scale-105 active:scale-95 ${theme === 'light'
                  ? 'border-neutral-200 bg-white hover:bg-neutral-50 hover:text-neutral-900 text-neutral-500 shadow-sm'
                  : 'border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                  }`}
                title="Xem lại tin nhắn kỷ niệm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                <span className="hidden xs:inline">Nhắn Tin</span>
              </button>
            )}

            {/* Image Shortcut - Launches 3D Memory Space */}
            <button
              id="nav-space-btn"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('play-bgm'));
                setCurrentStage('space');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-tight transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                currentStage === 'space'
                  ? 'border-cyan-300 dark:border-cyan-900 bg-cyan-100/20 text-cyan-500 dark:text-cyan-400 font-bold'
                  : theme === 'light'
                    ? 'border-neutral-200/80 bg-white hover:border-cyan-200 text-neutral-600 hover:text-cyan-500 shadow-sm'
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-cyan-900 text-neutral-400 hover:text-cyan-400'
              }`}
              title="Khám phá không gian kỷ niệm 3D"
            >
              <ImageIcon className={`w-3.5 h-3.5 ${currentStage === 'space' ? 'text-cyan-500' : 'text-neutral-500 dark:text-neutral-400'}`} />
              <span className="hidden xs:inline">Ảnh 3D</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Container Stage */}
      <main className="flex-grow flex flex-col relative justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStage === 'intro' && (
            <motion.div
              key="intro-stage"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex-grow flex items-center justify-center bg-[#faf9f5]"
            >
              <CinemaIntro onComplete={() => setCurrentStage('chat')} />
            </motion.div>
          )}

          {currentStage === 'chat' && (
            // SIMULATED MESSENGER STAGE
            <motion.div
              key="chat-stage"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex-grow flex items-center justify-center"
            >
              <MessengerIntro theme={theme} onComplete={() => setCurrentStage('letter')} />
            </motion.div>
          )}

          {currentStage === 'letter' && (
            // LETTER & COUNTDOWN STAGE (Unfolded & Active)
            <motion.div
              key="letter-stage"
              initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl mx-auto px-6 py-12 sm:py-20 flex flex-col gap-16 sm:gap-24"
            >
              {/* Back Button to fold letter and return home */}
              <div className="flex justify-start">
                <button
                  id="close-letter-btn"
                  onClick={() => setCurrentStage('chat')}
                  className={`flex items-center gap-2 group text-xs font-semibold focus:outline-none focus:ring-1 p-2 rounded-full border transition-all ${theme === 'light'
                    ? 'border-neutral-200/60 bg-white hover:bg-neutral-50/80 text-neutral-600 focus:ring-neutral-400'
                    : 'border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-900/80 text-neutral-400 focus:ring-neutral-750'
                    }`}
                >
                  <Inbox className="w-3.5 h-3.5 stroke-[1.8] group-hover:rotate-12 transition-transform" />
                  <span className="px-1">Gấp lại thư và Quay về</span>
                </button>
              </div>

              {/* The Written Letter Content (with customized typing) */}
              <section id="personal-letter-body" className="relative">
                {/* Visual subtle watermark on the background */}
                <div className={`absolute inset-y-12 inset-x-0 pointer-events-none select-none opacity-2 flex items-center justify-center font-display text-8xl md:text-9xl font-bold uppercase transition-opacity ${theme === 'light' ? 'text-neutral-900' : 'text-white'
                  }`}>
                  Đ ✕ QA
                </div>

                <LetterContent theme={theme} />
              </section>

              {/* Reset view trigger at the bottom */}
              <div className="flex justify-center pt-4 pb-8">
                <button
                  id="bottom-reset-btn"
                  onClick={() => setCurrentStage('intro')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold transition-all ${theme === 'light'
                    ? 'border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 shadow-[0_2px_8px_rgba(0,0,0,0.01)]'
                    : 'border-neutral-850 bg-neutral-900/30 text-neutral-400 hover:text-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                    }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xem lại</span>
                </button>
              </div>
            </motion.div>
          )}

          {currentStage === 'space' && (
            // 3D MEMORY SPACE STAGE
            <motion.div
              key="space-stage"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex-grow flex items-center justify-center"
            >
              <MemorySpace3D theme={theme} onBack={() => setCurrentStage('chat')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Exquisite Footer */}
      {currentStage !== 'intro' && (
        <footer className={`w-full max-w-7xl mx-auto px-6 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider opacity-30 text-center sm:text-left select-none transition-all duration-300 ${currentStage === 'chat' ? 'py-3 shrink-0' : 'py-8'
          }`}>
          <div>
            Em này! Trong tình yêu thế nào là phù hợp hả em
          </div>
          <div className="flex items-center gap-1">
            <span>Anh nghĩ mãi mà chẳng thể hiểu nổi</span>
          </div>
        </footer>
      )}
    </div>
  );
}
