import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';
import { Theme } from '../types';

interface EnvelopeProps {
  theme: Theme;
  onOpen: () => void;
}

export default function Envelope({ theme, onOpen }: EnvelopeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg text-center"
      >
        {/* Subtitle / Sender header */}
        <motion.p
          initial={{ opacity: 0, tracking: "0.15em" }}
          animate={{ opacity: 0.6, tracking: "0.25em" }}
          transition={{ delay: 0.3, duration: 1 }}
          className={`font-mono text-xs uppercase mb-3 ${
            theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          MAI SỸ ĐẠT
        </motion.p>

        {/* Recipient Cover Heading */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-12 ${
            theme === 'light' ? 'text-neutral-800' : 'text-neutral-100'
          }`}
        >
          Gửi Quỳnh Anh
        </motion.h1>

        {/* Sleek Minimalist Virtual Envelope Graphic & Button */}
        <motion.div
          id="envelope-visual-box"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer inline-block"
          onClick={onOpen}
        >
          {/* Subtle Outer Glow / Shadow */}
          <div
            className={`absolute -inset-4 rounded-2xl opacity-40 blur-xl transition-all duration-700 group-hover:opacity-75 ${
              theme === 'light'
                ? 'bg-neutral-100/50 group-hover:bg-neutral-200/50'
                : 'bg-neutral-900/30 group-hover:bg-neutral-800/30'
            }`}
          />

          <div
            className={`relative flex flex-col items-center justify-center p-10 sm:p-14 w-72 h-80 sm:w-80 sm:h-96 rounded-2xl border transition-all duration-700 ${
              theme === 'light'
                ? 'bg-neutral-50/80 hover:bg-white border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'
                : 'bg-neutral-950/40 hover:bg-neutral-950/70 border-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.2)]'
            }`}
          >
            {/* Elegant Seal Button */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`p-6 rounded-full border mb-8 transition-colors ${
                theme === 'light'
                  ? 'bg-white border-neutral-200/80 text-neutral-600 group-hover:border-neutral-400 group-hover:text-neutral-800'
                  : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 group-hover:border-neutral-600 group-hover:text-neutral-200'
              }`}
            >
              <Mail className="w-8 h-8 stroke-[1.2]" />
            </motion.div>

            {/* Micro Call to Action Text */}
            <div className="space-y-2">
              <span
                className={`block text-xs font-mono uppercase tracking-[0.2em] transition-opacity ${
                  theme === 'light' ? 'text-neutral-400 group-hover:text-neutral-700' : 'text-neutral-500 group-hover:text-neutral-200'
                }`}
              >
                Nhấp để mở thư
              </span>
              <div
                className={`flex items-center justify-center w-full gap-1 text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0 ${
                  theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'
                }`}
              >
                <span>Đọc thư tay của Đạt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Geometric fold aesthetics */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl border-t bg-gradient-to-r ${
                theme === 'light'
                  ? 'from-transparent via-neutral-200 to-transparent'
                  : 'from-transparent via-neutral-800 to-transparent'
              }`}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
