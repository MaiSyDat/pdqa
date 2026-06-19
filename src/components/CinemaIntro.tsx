import { useEffect, useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinemaIntroProps {
  onComplete: () => void;
}

export default function CinemaIntro({ onComplete }: CinemaIntroProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Chào Yêu Dấu từng là của anh.",
    "Cái này anh làm để lữu giữ những kỷ nhiệm của tụi mình á",
    "Nhưng mà",
    "Giờ lại thành món quà chia tay mất tiêu rồi tiếc ghê ha.",
    "Nếu gặp anh là một điều tồi tệ,",
    "là điều mà em vẫn luôn nghĩ rằng đó là cái nghiệp mà mình phải trả",
    "thì bằng tất cả sự chân thành còn lại",
    "Anh xin lỗi em",
    "Và...",
    "Rời xa em là điều anh phải làm, chứ chưa từng là điều anh muốn.",
    "Cùng xem lại một chút tin nhắn đầu tiên và cuối cùng nhé..."
  ];
  const text = texts[textIndex];
  const [isDone, setIsDone] = useState(false);

  // Split text into words and pre-calculate global character indices to keep typing sequence uniform
  let charCount = 0;
  const wordsWithIndices = text.split(" ").map(word => {
    const chars = Array.from(word).map(char => {
      const index = charCount++;
      return { char, index };
    });
    // Account for space between words
    charCount++;
    return chars;
  });

  // Container motion variant with exit animation for text transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: 'blur(5px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Character motion variant using custom animation index for staggered delays (dark charcoal gradient text)
  const charVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: 'blur(5px)',
      scale: 0.95
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        delay: 0.6 + i * 0.08,
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const step1Variants = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  useEffect(() => {
    if (step === 2) {
      const currentText = texts[textIndex];
      // Delay = 0.6s start delay, each char has 0.08s delay, and 1.0s animation duration
      const typingDuration = (0.6 + currentText.length * 0.08 + 1.0) * 1000;
      // Add standard reading pause: minimum 2.0s, or 50ms per character to scale with length
      const readingPause = Math.max(2000, currentText.length * 50);
      const totalDuration = typingDuration + readingPause;

      const timer = setTimeout(() => {
        if (textIndex < texts.length - 1) {
          setTextIndex(prev => prev + 1);
        } else {
          setIsDone(true);
        }
      }, totalDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [step, textIndex]);

  return (
    <div
      onClick={isDone ? onComplete : undefined}
      className={`fixed inset-0 w-screen h-screen bg-[#faf9f5] flex flex-col items-center justify-center select-none overflow-hidden z-55 ${isDone ? 'cursor-pointer' : 'cursor-default'
        }`}
    >
      {/* Atmospheric Soft Sunset Glow Effects (ambient pastel colored lighting) */}
      <div className="absolute top-[10%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-pink-200/20 via-rose-100/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-amber-200/20 via-orange-100/10 to-transparent blur-[120px] pointer-events-none animate-[pulse_10s_infinite]" />

      {/* Floating subtle warm gold/pink particles */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-40">
        <div className="absolute w-2 h-2 bg-pink-400/15 rounded-full blur-[0.5px] top-[25%] left-[20%] animate-[pulse_3s_infinite_1s]" />
        <div className="absolute w-2.5 h-2.5 bg-amber-400/10 rounded-full blur-[1px] top-[65%] left-[75%] animate-[pulse_4s_infinite_2s]" />
        <div className="absolute w-1.5 h-1.5 bg-pink-300/20 rounded-full top-[40%] left-[45%] animate-[pulse_2.5s_infinite_0.5s]" />
        <div className="absolute w-2.5 h-2.5 bg-amber-300/15 rounded-full blur-[0.5px] top-[75%] left-[35%] animate-[pulse_3.5s_infinite_1.5s]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-8 text-center w-full">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="play-trigger"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={step1Variants}
              className="flex items-center justify-center relative w-32 h-32"
            >
              {/* Animated Throbbing Circles - pulsing out */}
              <motion.div
                animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-pink-300/70 pointer-events-none z-10"
              />
              <motion.div
                animate={{ scale: [1, 1.75, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-pink-400/50 pointer-events-none z-10"
              />

              {/* Main Circular Pulse Button */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent('play-bgm'));
                  setStep(2);
                }}
                className="w-24 h-24 rounded-full bg-white border border-pink-100 text-pink-500 hover:text-pink-600 flex items-center justify-center shadow-[0_10px_35px_rgba(239,71,111,0.12)] z-30 cursor-pointer relative"
                title="Bắt đầu câu chuyện"
              >
                {/* Clean filled Play Icon */}
                <svg className="w-8 h-8 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={`cinema-text-${textIndex}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="flex flex-col items-center justify-center"
            >
              {/* Main Cinema Text (Dark Warm Charcoal Gradient) */}
              <motion.h1
                className="font-display font-bold text-3xl sm:text-5xl md:text-6xl leading-tight tracking-wide select-none drop-shadow-[0_1px_6px_rgba(0,0,0,0.04)] pb-2"
              >
                {wordsWithIndices.map((wordChars, wordIndex) => (
                  <Fragment key={wordIndex}>
                    <span className="inline-block whitespace-nowrap">
                      {wordChars.map(({ char, index }) => (
                        <motion.span
                          key={index}
                          custom={index}
                          variants={charVariants}
                          className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#2d2b28] via-[#4a4742] to-[#706c64]"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                    {/* Render space character OUTSIDE the whitespace-nowrap span to avoid collapsing */}
                    {wordIndex < wordsWithIndices.length - 1 && " "}
                  </Fragment>
                ))}
              </motion.h1>

              {/* Cinema Button revealed only after text completes typing */}
              {isDone && (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onComplete();
                  }}
                  className="mt-16 px-8 py-3 rounded-full border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-[11px] font-sans font-medium tracking-[0.25em] text-neutral-600 hover:text-neutral-900 uppercase transition-all duration-300 active:scale-95 cursor-pointer z-30 shadow-[0_4px_15px_rgba(0,0,0,0.03)]"
                >
                  Chạm để đi tiếp
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
