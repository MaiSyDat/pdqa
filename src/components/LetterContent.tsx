import { motion } from 'motion/react';
import { LETTER_PARAGRAPHS } from '../data';
import { Theme } from '../types';

interface LetterContentProps {
  theme: Theme;
}

export default function LetterContent({ theme }: LetterContentProps) {
  return (
    <div className="space-y-8 select-text">
      {/* Main Letter Content Canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="space-y-6 sm:space-y-8 max-w-2xl mx-auto"
      >
        {LETTER_PARAGRAPHS.map((paragraph, index) => {
          const isDate = index === 0;
          const isSignOff = index >= LETTER_PARAGRAPHS.length - 2;
          const isFirstSalutation = index === 1;

          let blockClass = `font-serif tracking-normal leading-relaxed text-base sm:text-lg select-text text-justify `;
          
          if (isDate) {
            blockClass = "font-sans text-xs tracking-wider uppercase opacity-50 mb-8 block text-left";
          } else if (isFirstSalutation) {
            blockClass = `font-serif text-lg sm:text-xl font-medium tracking-tight text-left mb-6 ${
              theme === 'light' ? 'text-neutral-900' : 'text-neutral-50'
            }`;
          } else if (isSignOff) {
            blockClass = `font-serif text-right text-base sm:text-lg italic mt-6 ${
              index === LETTER_PARAGRAPHS.length - 1 
                ? 'font-medium not-italic mt-2 text-rose-600 dark:text-rose-400' 
                : 'opacity-85'
            }`;
          } else {
            // Standard body paragraph
            blockClass += theme === 'light' ? 'text-neutral-700 font-normal' : 'text-neutral-300 font-light';
          }

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              className={blockClass}
            >
              {paragraph}
            </motion.p>
          );
        })}
      </motion.div>
    </div>
  );
}

