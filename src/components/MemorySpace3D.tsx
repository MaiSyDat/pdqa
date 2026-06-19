import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X } from 'lucide-react';
import { DEFAULT_ALBUM_PHOTOS } from '../data';
import { Theme } from '../types';

interface MemorySpace3DProps {
  theme: Theme;
  onBack: () => void;
}

export default function MemorySpace3D({ theme, onBack }: MemorySpace3DProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  // Framer Motion Animation Variants for staggering card entrances
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-40 select-none overflow-y-auto flex flex-col justify-start pb-12 ${theme === 'light' ? 'bg-[#faf9f5]' : 'bg-[#141312]'
        }`}
    >
      {/* 1. Header Navigation Bar */}
      <header
        className={`sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between backdrop-blur-md border-b select-none ${theme === 'light'
          ? 'bg-[#faf9f5]/80 border-neutral-200/50 text-neutral-800'
          : 'bg-[#141312]/80 border-neutral-900 text-neutral-200'
          }`}
      >
        <button
          onClick={onBack}
          className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all active:scale-95 cursor-pointer ${theme === 'light'
            ? 'border-neutral-200 bg-white hover:bg-neutral-50 shadow-sm text-neutral-600'
            : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 text-neutral-400'
            }`}
          title="Quay lại"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h3
          className={`font-display text-sm font-semibold tracking-widest uppercase select-none ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
            }`}
        >
          Những tấm hình ít ỏi mà anh có của chúng ta
        </h3>

        {/* Placeholder to align header title perfectly centered */}
        <div className="w-10" />
      </header>

      {/* 2. Scrollable Photo Grid */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-grow">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {DEFAULT_ALBUM_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={cardVariants}
              onClick={() => setSelectedPhoto(photo)}
              whileHover={{
                scale: 1.03,
                y: -4,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between aspect-[3/4] overflow-hidden ${theme === 'light'
                ? 'bg-white border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]'
                : 'bg-neutral-950/40 border-neutral-900/60 shadow-[0_4px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]'
                }`}
            >
              {/* Photo Box */}
              <div
                className={`relative w-full h-[85%] rounded-xl overflow-hidden ${theme === 'light' ? 'bg-neutral-50' : 'bg-neutral-900'
                  }`}
              >
                <img
                  src={photo.url}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* Bottom White Blank Space representing physical polaroid frame border */}
              <div className="h-[15%] w-full" />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 3. Lightbox Overlay Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center cursor-zoom-out p-4 backdrop-blur-xl ${theme === 'light' ? 'bg-[#faf9f5]/90' : 'bg-black/92'
              }`}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className={`absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full border transition-all active:scale-95 cursor-pointer ${theme === 'light'
                ? 'border-neutral-200 bg-white hover:bg-neutral-50 shadow-md text-neutral-600'
                : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 text-neutral-400'
                }`}
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Display large image */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`relative max-w-full max-h-[85vh] rounded-2xl overflow-hidden border shadow-2xl ${theme === 'light' ? 'bg-white border-neutral-100' : 'bg-neutral-950 border-neutral-900'
                }`}
              onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
            >
              <img
                src={selectedPhoto.url}
                alt="Memory Fullsize"
                className="max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] object-contain block select-none pointer-events-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
