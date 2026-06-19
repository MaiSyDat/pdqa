import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Smile,
  Mic,
  Image as ImageIcon,
  Send,
  ExternalLink,
  FastForward,
  MessageSquare,
  ArrowLeft,
  Camera,
  Mail,
  Sparkles
} from 'lucide-react';
import { Theme, Message } from '../types';
import {
  INITIAL_REPLICA_MESSAGES,
  SWEET_CONVERSATION_SEQUENCE,
  ARGUMENT_CONVERSATION_SEQUENCE
} from '../chatData';

interface MessengerIntroProps {
  theme: Theme;
  onComplete: () => void;
}

// Replica of profile silhouette avatar seen in user picture
const SilhouetteAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-[#e4e6eb] dark:bg-[#2c2d30] flex items-center justify-center shrink-0 select-none overflow-hidden border-0">
    <svg className="w-6 h-6 text-[#8a8d91] dark:text-[#6a6d71] translate-y-[1px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

// High-fidelity digital vector depiction of the _cosytales_ comic shared in chat
const CosytalesAttachment = () => {
  return (
    <div className="w-[195px] sm:w-[220px] rounded-2xl overflow-hidden bg-white dark:bg-[#181818] border border-[#f0f0f0] dark:border-neutral-850 flex flex-col shadow-sm select-none">
      {/* Chibi post heading */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-50/50 dark:bg-neutral-900/30 border-b border-neutral-100 dark:border-neutral-850">
        <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center overflow-hidden">
          <span className="text-[8px]">👩‍❤️‍👨</span>
        </div>
        <span className="text-[10px] font-bold tracking-tight text-neutral-850 dark:text-neutral-200">_cosytales_</span>
      </div>

      {/* Frame 1: Girl looking at pinkish sea beach under sunset */}
      <div className="w-full h-24 relative bg-gradient-to-b from-[#f9e5d9] via-[#fec5bb] to-[#ecd1ca] overflow-hidden flex items-center justify-center">
        {/* Soft sea horizon */}
        <div className="absolute bottom-0 w-full h-[60%] bg-[#fdb7ab]/30" />
        <div className="absolute bottom-0 w-full h-5 bg-gradient-to-t from-white/70 to-transparent" />

        {/* Girl figure */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Small floating romantic heart */}
          <span className="text-[9px] text-[#e76f51] font-bold animate-[bounce_2s_infinite]">❤️</span>
          {/* Chibi Hair */}
          <div className="w-12 h-11 rounded-t-full bg-[#5c4033] relative">
            <div className="absolute bottom-0 -left-1.5 w-4 h-4 bg-[#5c4033] rounded-bl-xl" />
            <div className="absolute bottom-0 -right-1.5 w-4 h-4 bg-[#5c4033] rounded-br-xl" />
          </div>
          {/* Chibi shoulders */}
          <div className="w-8 h-2 bg-[#fcd5ce] rounded-t" />
        </div>
      </div>

      {/* Frame 2: Couple looking closely at each other, cute cartoon eyes */}
      <div className="w-full h-24 relative bg-[#fbe7e4] overflow-hidden flex flex-col justify-around p-1.5">
        <div className="flex justify-between items-center px-3.5 h-full pt-1">
          {/* Left chibi eye */}
          <div className="flex flex-col items-center">
            {/* Eyebrow */}
            <div className="w-6 h-0.5 bg-[#4e3629] rounded-full rotate-[-4deg] mb-1" />
            <div className="w-6.5 h-4.5 bg-white rounded-full flex items-center justify-center relative overflow-hidden border border-[#e4ccca] shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="w-3.5 h-3.5 bg-[#6c584c] rounded-full flex items-center justify-center">
                <div className="w-1.2 h-1.2 bg-white rounded-full translate-x-[-0.5px] translate-y-[-0.5px]" />
              </div>
            </div>
          </div>

          {/* Right chibi eye */}
          <div className="flex flex-col items-center">
            {/* Eyebrow */}
            <div className="w-6 h-0.5 bg-[#4e3629] rounded-full rotate-[4deg] mb-1" />
            <div className="w-6.5 h-4.5 bg-white rounded-full flex items-center justify-center relative overflow-hidden border border-[#e4ccca] shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="w-3.5 h-3.5 bg-[#6c584c] rounded-full flex items-center justify-center">
                <div className="w-1.2 h-1.2 bg-white rounded-full translate-x-[-0.5px] translate-y-[-0.5px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Soft pink blush indicator layout */}
        <div className="absolute bottom-1 left-2.5 w-4 h-2 bg-rose-400/25 rounded-full blur-[1px]" />
        <div className="absolute bottom-1 right-2.5 w-4 h-2 bg-rose-400/25 rounded-full blur-[1px]" />
      </div>
    </div>
  );
};


export default function MessengerIntro({ theme, onComplete }: MessengerIntroProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState<'dat' | 'quynh_anh'>('dat');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [userHasScrolledUp, setUserHasScrolledUp] = useState(false);

  const [chatPhase, setChatPhase] = useState<'sweet' | 'blackout-1' | 'blackout-2' | 'argument'>('sweet');
  const [argumentStep, setArgumentStep] = useState(0);

  const [isOpeningLetter, setIsOpeningLetter] = useState(false);
  const [animationStage, setAnimationStage] = useState<'none' | 'emerging' | 'opening' | 'fade-out'>('none');
  const animationTimersRef = useRef<any[]>([]);

  const handleImageClick = () => {
    if (isOpeningLetter) return;
    setIsOpeningLetter(true);
    setAnimationStage('emerging');

    const t1 = setTimeout(() => {
      setAnimationStage('opening');
    }, 1200);

    const t2 = setTimeout(() => {
      setAnimationStage('fade-out');
    }, 2850);

    const t3 = setTimeout(() => {
      onComplete();
      // Reset state in case they navigate back
      setIsOpeningLetter(false);
      setAnimationStage('none');
    }, 3250);

    animationTimersRef.current = [t1, t2, t3];
  };

  useEffect(() => {
    return () => {
      animationTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Play audio sound for notification
  const playPing = (type: 'sent' | 'recv') => {
    // Disabled at user request to keep only background music
  };

  // Monitor scroll behavior of the chat stream
  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    // Check if user is scrolled away from bottom by more than 60px
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceFromBottom > 60) {
      setUserHasScrolledUp(true);
    } else {
      setUserHasScrolledUp(false);
    }
  };

  // Scroll smoothly to bottom, but ONLY if the user has not manually scrolled up
  useEffect(() => {
    if (!userHasScrolledUp && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // Handle blackout transitions
  useEffect(() => {
    if (chatPhase === 'blackout-1') {
      const timer = setTimeout(() => {
        setChatPhase('blackout-2');
      }, 4500);
      return () => clearTimeout(timer);
    }
    if (chatPhase === 'blackout-2') {
      const timer = setTimeout(() => {
        setChatPhase('argument');
        setArgumentStep(0);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [chatPhase]);

  // Handle conversational flow simulation
  useEffect(() => {
    if (chatPhase === 'sweet') {
      const allSweetMessages = [...INITIAL_REPLICA_MESSAGES, ...SWEET_CONVERSATION_SEQUENCE];

      // Wait slightly on startup before streaming
      if (currentStep === 0) {
        const startTimeout = setTimeout(() => {
          const firstMsg = allSweetMessages[0];
          if (firstMsg?.sender === 'system_date') {
            setMessages([firstMsg]);
            setCurrentStep(2); // Progress to next step
          } else {
            setTypingSender(firstMsg?.sender === 'dat' ? 'dat' : 'quynh_anh');
            setIsTyping(true);
            setCurrentStep(1);
          }
        }, 1800);
        return () => clearTimeout(startTimeout);
      }

      if (currentStep > allSweetMessages.length) {
        setIsTyping(false);
        // Transition to blackout fade after 2.5 seconds of silence
        const timeout = setTimeout(() => {
          setChatPhase('blackout-1');
        }, 2500);
        return () => clearTimeout(timeout);
      }

      const nextMsg = allSweetMessages[currentStep - 1];
      if (!nextMsg) return;

      // If it is a system date stamp, show it with a pleasant idle gap without typing animation
      if (nextMsg.sender === 'system_date') {
        const dateTimeout = setTimeout(() => {
          setMessages((prev) => [...prev, nextMsg]);
          setCurrentStep((prev) => prev + 1);
        }, 800);
        return () => clearTimeout(dateTimeout);
      }

      // Calculate highly realistic typing time based on length of impending text
      const isBlank = nextMsg.sender === 'quynh_anh_blank' || nextMsg.sender === 'dat_blank';
      const isSpecial = isBlank || nextMsg.text === '[Sticker]' || nextMsg.sender === 'shared_post' || nextMsg.sender === 'system_call_started' || nextMsg.sender === 'system_call_ended';
      const typingTime = isSpecial
        ? 900
        : Math.max(900, Math.min(2000, nextMsg.text.length * 15 + 250));

      // Read/idle delay prior to typing based on length of previous message so user can comfortably finish reading
      const prevMsg = currentStep > 1 ? allSweetMessages[currentStep - 2] : null;
      const prevLength = prevMsg ? prevMsg.text.length : 15;
      const idleDelay = prevMsg?.sender === 'system_date'
        ? 300
        : Math.max(700, Math.min(1600, prevLength * 10 + 350));

      const typingTimeout = setTimeout(() => {
        setTypingSender(nextMsg.sender === 'attachment' || nextMsg.sender === 'dat' || nextMsg.sender === 'dat_blank' ? 'dat' : 'quynh_anh');
        setIsTyping(true);
      }, idleDelay);

      const sendTimeout = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, nextMsg]);
        playPing(nextMsg.sender === 'attachment' || nextMsg.sender === 'dat' || nextMsg.sender === 'dat_blank' ? 'sent' : 'recv');
        setCurrentStep((prev) => prev + 1);
      }, idleDelay + typingTime);

      return () => {
        clearTimeout(typingTimeout);
        clearTimeout(sendTimeout);
      };
    }

    if (chatPhase === 'argument') {
      if (argumentStep === 0) {
        const startTimeout = setTimeout(() => {
          // Prepend some blurry skeleton/draft messages to simulate a time gap
          const gapMessages: Message[] = [
            { id: 'gap-sep-1', sender: 'system_date_gap', text: '... 1.5 tháng sau ...' },
            { id: 'gap-1', sender: 'quynh_anh_gap', text: '140px' },
            { id: 'gap-2', sender: 'dat_gap', text: '90px' },
            { id: 'gap-3', sender: 'quynh_anh_gap', text: '185px' },
            { id: 'gap-4', sender: 'dat_gap', text: '65px' },
            { id: 'gap-5', sender: 'quynh_anh_gap', text: '110px' }
          ];
          setMessages((prev) => [...prev, ...gapMessages]);
          setArgumentStep(1);
        }, 800);
        return () => clearTimeout(startTimeout);
      }

      if (argumentStep > ARGUMENT_CONVERSATION_SEQUENCE.length) {
        setIsTyping(false);
        return;
      }

      const nextMsg = ARGUMENT_CONVERSATION_SEQUENCE[argumentStep - 1];
      if (!nextMsg) return;

      // Deliver date separators instantly with an natural pacing shift
      if (nextMsg.sender === 'system_date') {
        const dateTimeout = setTimeout(() => {
          setMessages((prev) => [...prev, nextMsg]);
          setArgumentStep((prev) => prev + 1);
        }, 800);
        return () => clearTimeout(dateTimeout);
      }

      const isSpecial = nextMsg.text === '[Sticker]' || nextMsg.sender === 'attachment';
      const typingTime = isSpecial
        ? 950
        : Math.max(950, Math.min(2200, nextMsg.text.length * 16 + 300));

      const prevMsg = argumentStep > 1 ? ARGUMENT_CONVERSATION_SEQUENCE[argumentStep - 2] : null;
      const prevLength = prevMsg ? prevMsg.text.length : 15;
      const idleDelay = prevMsg?.sender === 'system_date'
        ? 300
        : Math.max(750, Math.min(1700, prevLength * 11 + 400));

      const typingTimeout = setTimeout(() => {
        setTypingSender(nextMsg.sender === 'attachment' ? 'dat' : (nextMsg.sender === 'dat' ? 'dat' : 'quynh_anh'));
        setIsTyping(true);
      }, idleDelay);

      const sendTimeout = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, nextMsg]);
        playPing(nextMsg.sender === 'attachment' || nextMsg.sender === 'dat' ? 'sent' : 'recv');
        setArgumentStep((prev) => prev + 1);
      }, idleDelay + typingTime);

      return () => {
        clearTimeout(typingTimeout);
        clearTimeout(sendTimeout);
      };
    }
  }, [currentStep, argumentStep, chatPhase]);

  if (chatPhase === 'blackout-1' || chatPhase === 'blackout-2') {
    return (
      <div
        id="cinematic-blackout-container"
        className="fixed inset-0 w-screen h-screen z-[100] bg-[#faf9f5] flex flex-col items-center justify-center select-none overflow-hidden pb-[8vh] sm:pb-[10vh]"
      >
        {/* Ambient background cinematic lights - glowing warmth and tragedy */}
        <div id="cinema-glow-1" className="absolute -top-[20%] left-[10%] w-[80%] sm:w-[60%] h-[50%] rounded-full bg-gradient-to-br from-pink-300/10 to-transparent blur-[120px] pointer-events-none" />
        <div id="cinema-glow-2" className="absolute -bottom-[20%] right-[10%] w-[80%] sm:w-[60%] h-[50%] rounded-full bg-gradient-to-tl from-rose-300/15 to-transparent blur-[120px] pointer-events-none animate-[pulse_6s_infinite]" />

        <div id="cinema-caption-wrapper" className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 md:px-12 text-center">
          <AnimatePresence mode="wait">
            {chatPhase === 'blackout-1' && (
              <motion.div
                key="b1"
                initial={{ opacity: 0, y: 40, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 sm:space-y-8"
              >
                <h2
                  id="cinematic-text-b1"
                  className="font-display font-bold text-4xl sm:text-6xl md:text-7xl leading-tight tracking-wide text-[#2d2b28] drop-shadow-[0_1px_5px_rgba(0,0,0,0.02)]"
                >
                  Chúng ta đã gặp đã yêu và...
                </h2>
                <motion.div
                  id="cinematic-divider"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 100, opacity: 0.5 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                  className="h-[1.5px] bg-rose-500 mx-auto"
                />
              </motion.div>
            )}

            {chatPhase === 'blackout-2' && (
              <motion.div
                key="b2"
                initial={{ opacity: 0, y: 40, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 sm:space-y-8"
              >
                <h2
                  id="cinematic-text-b2"
                  className="font-display font-bold text-4xl sm:text-6xl md:text-7xl leading-tight tracking-wide text-[#2d2b28] drop-shadow-[0_1px_5px_rgba(0,0,0,0.02)]"
                >
                  cãi vã
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cinematic clean low-profile skip button */}
        <button
          id="cinematic-skip-btn"
          onClick={() => {
            setChatPhase('argument');
            setArgumentStep(0);
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-500 hover:text-neutral-800 active:scale-95 transition-all uppercase cursor-pointer py-2 px-5 bg-white hover:bg-neutral-50 rounded-full border border-neutral-200 hover:border-neutral-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
        >
          Bỏ Qua Chuyển Cảnh
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-2 sm:p-4 w-full max-w-md mx-auto h-full overflow-hidden ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-100'
      }`}>
      {/* CSS custom scroll helper inside jsx */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        @keyframes dotBubbleWave {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4.5px);
          }
        }
        .dot-wave-1 {
          animation: dotBubbleWave 1.2s infinite ease-in-out;
          animation-delay: -0.32s;
        }
        .dot-wave-2 {
          animation: dotBubbleWave 1.2s infinite ease-in-out;
          animation-delay: -0.16s;
        }
        .dot-wave-3 {
          animation: dotBubbleWave 1.2s infinite ease-in-out;
        }
      `}</style>

      {/* Action line */}
      <div className="w-full flex items-center justify-between py-1.5 px-3 select-none shrink-0 mb-1">
        <h4 className="font-mono text-[9px] uppercase tracking-widest opacity-40 flex items-center gap-1.5 font-bold">
          <MessageSquare className="w-3 h-3 text-pink-500 animate-[pulse_2s_infinite]" />
          Instagram Direct
        </h4>
        <button
          onClick={onComplete}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[9.5px] font-mono hover:scale-105 tracking-wider transition-all cursor-pointer ${theme === 'light'
            ? 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-500 shadow-sm'
            : 'border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200'
            }`}
        >
          <span>Mở Hộp Thư Bản Thân</span>
          <FastForward className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Instagram Message Layout (Perfect replication) */}
      <div
        style={{ height: 'calc(100dvh - 180px)' }}
        className={`w-full flex flex-col max-h-[720px] rounded-[36px] sm:rounded-[42px] overflow-hidden border shadow-2xl transition-all ${theme === 'light'
          ? 'bg-[#ffffff] border-neutral-150/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)]'
          : 'bg-[#000000] border-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
          }`}>

        {/* 1. INSTAGRAM PROFILE HEADER */}
        <div className={`flex items-center justify-between px-4 py-3 shrink-0 border-b select-none ${theme === 'light' ? 'bg-[#ffffff] border-neutral-100' : 'bg-[#000000] border-neutral-900'
          }`}>
          <div className="flex items-center gap-3.5">
            {/* Back Chevron */}
            <button onClick={onComplete} className="p-0.5 rounded-full active:scale-90 transition-all text-neutral-800 dark:text-neutral-100">
              <ArrowLeft className="w-[22px] h-[22px] stroke-[2]" />
            </button>

            {/* Gray silhouette circle avatar identical to screenshot */}
            <div className="relative">
              <SilhouetteAvatar />
              <span className="absolute bottom-0 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-black rounded-full" />
            </div>

            <div className="flex flex-col">
              <h3 className={`font-semibold text-[14.5px] leading-tight tracking-tight ${theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                Phạm Đỗ Quỳnh Anh
              </h3>
              {isTyping && typingSender === 'quynh_anh' ? (
                <p className="text-[10px] text-pink-500 dark:text-pink-400 font-semibold leading-tight flex items-center gap-[1px]">
                  đang soạn tin nhắn<span className="dot-wave-1">.</span><span className="dot-wave-2">.</span><span className="dot-wave-3">.</span>
                </p>
              ) : (
                <p className="text-[10px] text-green-500 font-medium leading-tight">Đang hoạt động</p>
              )}
            </div>
          </div>

          {/* Action icon group identical to screenshot */}
          <div className="flex items-center gap-4 text-neutral-850 dark:text-neutral-100 font-normal">
            <button className="relative p-0.5 active:scale-95 transition-all">
              {/* Sticker action - Custom sticker face icon */}
              <svg className="w-6 h-6 stroke-[1.8] text-neutral-800 dark:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm6 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z" />
              </svg>
            </button>
            <button className="p-0.5 active:scale-95 transition-all">
              <Phone className="w-5.5 h-5.5 text-neutral-800 dark:text-neutral-200 stroke-[1.8]" />
            </button>
            <button className="p-0.5 active:scale-95 transition-all">
              {/* Camera layout */}
              <svg className="w-6.5 h-6.5 text-neutral-800 dark:text-neutral-200 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" className="hidden" />
                <rect x="2" y="5" width="15" height="14" rx="3" />
                <path d="M17 9.5l5-3.5v12l-5-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2. INSTAGRAM MAIN SCROLLABLE STREAM AREA */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className={`flex-grow overflow-y-auto no-scrollbar px-4 py-4 space-y-4 ${theme === 'light' ? 'bg-[#ffffff]' : 'bg-[#000000]'
            }`}
        >
          {/* Instagram Connecting Friendly Header */}
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center select-none shrink-0 border-b border-neutral-100/10 dark:border-neutral-900/40 mb-3 pb-5">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200/20">
                <svg className="w-11 h-11 text-neutral-450 dark:text-neutral-500 translate-y-[1px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-black rounded-full" />
            </div>

            <h3 className={`font-bold text-[16px] tracking-tight ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              Cục cưng
            </h3>
            <p className="text-[10px] font-mono text-neutral-450 dark:text-neutral-550 mt-0.5 uppercase tracking-wider">
              quynh_anh • instagram
            </p>
            <p className="text-[11.5px] text-neutral-400 dark:text-neutral-500 mt-2 max-w-[240px] px-2 leading-relaxed">
              Các bạn đã trở thành bạn bè trên Instagram. Cuộc trò chuyện này được mã hóa bảo mật đầu cuối.
            </p>
          </div>

          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isMyMessage = msg.sender === 'dat';

              // Case G: Blurry Gap Placeholder for Quỳnh Anh (Incoming)
              if (msg.sender === 'quynh_anh_gap') {
                return (
                  <div key={msg.id} className="flex justify-start items-end gap-2 opacity-[0.15] dark:opacity-[0.1] blur-[1.5px] select-none my-1.5 transition-all">
                    <SilhouetteAvatar />
                    <div className={`h-8 rounded-[18px] rounded-tl-sm ${theme === 'light'
                      ? 'bg-neutral-300'
                      : 'bg-neutral-800'
                      }`} style={{ width: msg.text || '120px' }} />
                  </div>
                );
              }

              // Case H: Blurry Gap Placeholder for Đạt (Outgoing)
              if (msg.sender === 'dat_gap') {
                return (
                  <div key={msg.id} className="flex justify-end items-end gap-2 opacity-[0.15] dark:opacity-[0.1] blur-[1.5px] select-none my-1.5 transition-all">
                    <div className={`h-8 rounded-[18px] rounded-tr-sm ${theme === 'light'
                      ? 'bg-neutral-300'
                      : 'bg-neutral-800'
                      }`} style={{ width: msg.text || '80px' }} />
                  </div>
                );
              }

              // Case J: Blank Placeholder for Quỳnh Anh (Incoming)
              if (msg.sender === 'quynh_anh_blank') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.98, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 350 }}
                    className="flex justify-start items-end gap-2"
                  >
                    <SilhouetteAvatar />
                    <div
                      className={`h-9 rounded-[22px] rounded-tl-lg flex items-center justify-center ${theme === 'light'
                        ? 'bg-white border border-[#f0f0f0]'
                        : 'bg-black border border-[#202020]'
                        }`}
                      style={{ width: msg.text || '120px' }}
                    />
                  </motion.div>
                );
              }

              // Case K: Blank Placeholder for Đạt (Outgoing)
              if (msg.sender === 'dat_blank') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.98, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 350 }}
                    className="flex justify-end items-end gap-2"
                  >
                    <div
                      className={`h-9 rounded-[22px] rounded-tr-lg ${theme === 'light'
                        ? 'bg-[#efefef]'
                        : 'bg-[#262626]'
                        }`}
                      style={{ width: msg.text || '80px' }}
                    />
                  </motion.div>
                );
              }

              // Case I: Blurry Gap Date/Time Separator
              if (msg.sender === 'system_date_gap') {
                return (
                  <div key={msg.id} className="text-center py-6 select-none opacity-30 dark:opacity-20 transition-all">
                    <span className="text-[10.5px] font-mono tracking-[0.2em] uppercase italic text-neutral-400 dark:text-neutral-500">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              // Case A: Date Sepator
              if (msg.sender === 'system_date') {
                return (
                  <div key={msg.id} className="text-center py-4 select-none">
                    <span className="text-[11px] font-medium tracking-tight text-neutral-400 dark:text-neutral-500">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              // Case B: Call Started Box
              if (msg.sender === 'system_call_started') {
                return (
                  <div key={msg.id} className="flex justify-start max-w-[85%] mb-2">
                    <div className={`p-4 rounded-[24px] border flex items-center gap-3.5 transition-colors ${theme === 'light'
                      ? 'bg-white border-neutral-150 text-neutral-800 shadow-[0_1px_5px_rgba(0,0,0,0.02)]'
                      : 'bg-[#181818] border-neutral-850 text-neutral-100'
                      }`}>
                      {/* Gray circle call asset */}
                      <div className="w-10 h-10 rounded-full bg-[#f0f0f1] dark:bg-[#2c2d30] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-neutral-700 dark:text-neutral-300 fill-current" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-semibold leading-tight">{msg.text}</p>
                        <p className="text-[11px] text-neutral-400 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              // Case C: Call Ended Box
              if (msg.sender === 'system_call_ended') {
                return (
                  <div key={msg.id} className="flex flex-col gap-1.5 justify-start mb-2">
                    <div className="flex justify-start max-w-[85%]">
                      <div className={`p-4 rounded-[24px] border flex items-center gap-3.5 transition-colors ${theme === 'light'
                        ? 'bg-white border-neutral-150 text-neutral-800 shadow-[0_1px_5px_rgba(0,0,0,0.02)]'
                        : 'bg-[#181818] border-neutral-850 text-neutral-100'
                        }`}>
                        {/* Grey call ended circle asset */}
                        <div className="w-10 h-10 rounded-full bg-[#f0f0f1] dark:bg-[#2c2d30] flex items-center justify-center shrink-0">
                          {/* Call ended standard vector hand receiver icon rotated */}
                          <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300 transform -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c-2.21 0-4-1.79-4-4v-.5C8 5.01 10.01 3 12.5 3S17 5.01 17 7.5v.5c0 2.21-1.79 4-4 4zm-1.72 2.22s.31.25.72.5c4.71 1.7 8 5.28 8 9.28h-14c0-4 3.29-7.58 8-9.28z" className="hidden" />
                            <rect x="5" y="5" width="14" height="14" rx="2" className="hidden" />
                            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.27 1.11l-2.2 2.2z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-[13px] font-semibold leading-tight">{msg.text}</p>
                          <p className="text-[11px] text-neutral-400 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                    {/* Caption helper identical to image */}
                    <div className="pl-3 py-0.5 select-none text-left">
                      <span className="text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 leading-normal font-sans">
                        Nhấn đúp để ❤️
                      </span>
                    </div>
                  </div>
                );
              }

              // Case D: Shared Chibi Post
              if (msg.sender === 'shared_post') {
                return (
                  <div key={msg.id} className="flex justify-start items-center gap-3 mb-2">
                    {/* Dual panel stacked reaction triggers on left */}
                    <div className="flex flex-col gap-2 shrink-0 select-none">
                      <button className="w-8 h-8 rounded-full bg-[#f5f5f5] dark:bg-[#1a1a1a] flex items-center justify-center text-neutral-700 dark:text-neutral-300 active:scale-90 transition-all border border-neutral-100 dark:border-neutral-850">
                        <Send className="w-4 h-4 transform rotate-[-25deg] translate-x-[1px]" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-[#f5f5f5] dark:bg-[#1a1a1a] flex items-center justify-center text-neutral-700 dark:text-neutral-300 active:scale-90 transition-all border border-neutral-100 dark:border-neutral-850">
                        {/* Custom remix arrows vector */}
                        <svg className="w-4.5 h-4.5 text-neutral-600 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                        </svg>
                      </button>
                    </div>

                    {/* Shared comic asset */}
                    <CosytalesAttachment />
                  </div>
                );
              }

              // Case E: Bức thư tay Attachment -> Replaced with interactive gift.jpg bubble
              if (msg.sender === 'attachment') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="flex justify-end pt-1"
                  >
                    <motion.div
                      onClick={handleImageClick}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative w-[240px] sm:w-[280px] rounded-2xl overflow-hidden border shadow-lg cursor-pointer transition-all ${theme === 'light'
                        ? 'bg-white border-neutral-200/80 hover:border-pink-300 hover:shadow-pink-100/50'
                        : 'bg-neutral-900 border-neutral-800 hover:border-pink-900/60 hover:shadow-pink-950/20'
                        }`}
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                        <img
                          src="/img/gift.jpg"
                          alt="Hộp quà và bức thư tay"
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay text / gradient hint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3 text-left">
                          <span className="text-[10px] font-mono tracking-widest text-pink-300 uppercase font-black">
                            Món quà của anh
                          </span>
                          <p className="text-white text-[11px] font-medium mt-0.5 opacity-90">
                            Nhấp vào để xem thư...
                          </p>
                        </div>

                        {/* Interactive floating indicator */}
                        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white rounded-full p-1.5 shadow-md flex items-center justify-center">
                          <Mail className="w-3.5 h-3.5 text-pink-300 fill-pink-500/10 animate-[pulse_1.5s_infinite]" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              }

              // Case F: Standard Instagram Chat Bubble
              if (msg.text === '[Sticker]') {
                const stickerEmoji = msg.id.startsWith('arg') ? '😿💔' : '🐱💞';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {!isMyMessage && <SilhouetteAvatar />}
                    {/* Beautiful warm glowing sticker container */}
                    <div className="w-24 h-24 select-none flex items-center justify-center relative my-1 active:scale-110 transition-transform cursor-pointer">
                      <div className="text-5xl animate-[bounce_1.8s_infinite] select-none filter drop-shadow">
                        {stickerEmoji}
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 350 }}
                  className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {/* Left Silhouette Avatar for incoming chats */}
                  {!isMyMessage && <SilhouetteAvatar />}

                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-[22px] text-[13.5px] leading-relaxed text-left ${isMyMessage
                      ? theme === 'light'
                        ? 'bg-[#efefef] text-black rounded-tr-lg'
                        : 'bg-[#262626] text-white rounded-tr-lg'
                      : theme === 'light'
                        ? 'bg-white text-black rounded-tl-lg border border-[#f0f0f0]'
                        : 'bg-black text-white rounded-tl-lg border border-[#202020]'
                      }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Loading Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex ${typingSender === 'dat' ? 'justify-end' : 'justify-start'} items-end gap-2`}
            >
              {typingSender === 'quynh_anh' && <SilhouetteAvatar />}
              <div className={`px-4 py-3 rounded-[24px] flex items-center gap-[4px] h-[34px] ${typingSender === 'dat'
                ? theme === 'light' ? 'bg-[#efefef] rounded-tr-[4px]' : 'bg-[#262626] rounded-tr-[4px]'
                : theme === 'light' ? 'bg-[#1e1e1e]/5 rounded-tl-[4px] border border-[#f0f0f0]' : 'bg-neutral-900/40 rounded-tl-[4px] border border-neutral-850'
                }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 dot-wave-1 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 dot-wave-2 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 dot-wave-3 inline-block" />
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* 3. INSTAGRAM BOTTOM DIRECT MUSIC/INPUT BAR REPLICA */}
        <div className={`px-3.5 py-3 border-t flex items-center gap-2.5 shrink-0 select-none ${theme === 'light' ? 'bg-[#ffffff] border-neutral-100' : 'bg-[#000000] border-neutral-900'
          }`}>
          {/* Blue solid background camera trigger button */}
          <button
            onClick={onComplete}
            className="w-8.5 h-8.5 rounded-full bg-[#0095f6] hover:bg-[#1877f2] flex items-center justify-center text-white shrink-0 active:scale-95 transition-all select-none cursor-pointer"
          >
            <Camera className="w-[18px] h-[18px] stroke-[2.5] fill-current" />
          </button>

          {/* Pill text/icon entry overlay */}
          <div className={`flex-grow flex items-center py-2 px-3.5 rounded-full border text-left cursor-pointer ${theme === 'light'
            ? 'bg-white border-[#dbdbdb] text-neutral-850'
            : 'bg-black border-[#262626] text-neutral-200'
            }`}
            onClick={onComplete}
          >
            <span className="text-[13.5px] opacity-45 flex-grow select-none">
              Nhắn tin...
            </span>

            {/* Sub-bar overlay icon set */}
            <div className="flex items-center gap-3 ml-2 text-neutral-800 dark:text-neutral-200">
              <button className="hover:scale-105 active:scale-90 transition-all">
                <Mic className="w-[19px] h-[19px] stroke-[1.8]" />
              </button>
              <button className="hover:scale-105 active:scale-90 transition-all">
                <ImageIcon className="w-[19px] h-[19px] stroke-[1.8]" />
              </button>
              <button className="hover:scale-105 active:scale-90 transition-all">
                <Smile className="w-[19px] h-[19px] stroke-[1.8]" />
              </button>
              <button className="hover:scale-105 active:scale-90 transition-all">
                {/* Plus circle sticker trigger button */}
                <svg className="w-5 h-5 stroke-[1.8] text-neutral-800 dark:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exquisite emerging letter animation overlay */}
      <AnimatePresence>
        {isOpeningLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 w-screen h-screen z-[150] flex flex-col items-center justify-center select-none overflow-hidden"
            style={{
              background: theme === 'light'
                ? 'radial-gradient(circle at center, rgba(250, 249, 245, 0.92) 0%, rgba(240, 235, 225, 0.98) 100%)'
                : 'radial-gradient(circle at center, rgba(20, 19, 18, 0.94) 0%, rgba(10, 9, 8, 0.99) 100%)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {/* Ambient glowing background circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose-500/10 blur-[80px] pointer-events-none animate-pulse" />

            {/* Micro details: Floating Sparkles and Heart particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => {
                const randomX = Math.sin(i) * 150;
                const randomY = Math.cos(i) * 150;
                return (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: `calc(50vw + ${randomX}px)`,
                      y: `calc(50vh + ${randomY + 100}px)`,
                      scale: 0.5
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      y: `calc(50vh - ${150 + Math.random() * 100}px)`,
                      x: `calc(50vw + ${randomX + (Math.random() * 100 - 50)}px)`,
                      rotate: 360
                    }}
                    transition={{
                      duration: 2.8,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute text-pink-400/50 text-xs"
                  >
                    {i % 2 === 0 ? '❤️' : '✨'}
                  </motion.div>
                );
              })}
            </div>

            {/* Animation Scene Container */}
            <div className="relative flex flex-col items-center justify-center w-full max-w-md h-full px-6">

              {/* Gift Image (Fading/shrinking as envelope rises) */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{
                  scale: animationStage === 'none' ? 0.9 : 1,
                  opacity: animationStage === 'fade-out' ? 0 : 0.85,
                  y: animationStage === 'opening' ? 40 : 0
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-56 aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200/20 shadow-2xl mb-24 opacity-80"
              >
                <img
                  src="/img/gift.jpg"
                  alt="Hộp quà và bức thư"
                  className="w-full h-full object-cover filter blur-[1px] brightness-90"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-300 font-bold">
                    Món quà cuối...
                  </span>
                </div>
              </motion.div>

              {/* The Emerging Envelope */}
              <motion.div
                initial={{ scale: 0.1, y: 150, opacity: 0, rotate: -15 }}
                animate={{
                  scale: animationStage === 'fade-out' ? 0.9 : 1,
                  y: animationStage === 'opening' ? -120 : (animationStage === 'fade-out' ? -140 : -30),
                  opacity: animationStage === 'fade-out' ? 0 : 1,
                  rotate: 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 70,
                  damping: 14,
                  mass: 0.8
                }}
                className="absolute w-64 h-44 z-30"
                style={{ perspective: '1000px' }}
              >
                {/* 3D Envelope Container */}
                <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>

                  {/* Back Plate */}
                  <div className="absolute inset-0 bg-[#fbf5e6] dark:bg-[#252018] rounded-xl border border-[#ebdcb9] dark:border-[#383024] shadow-2xl z-10" />

                  {/* Letter Paper (Slides out) */}
                  <motion.div
                    initial={{ y: 5, scale: 0.92, opacity: 0 }}
                    animate={{
                      y: animationStage === 'opening' ? -100 : 5,
                      scale: animationStage === 'opening' ? 1.05 : 0.92,
                      opacity: animationStage === 'opening' ? 1 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 80,
                      damping: 15,
                      delay: 0.3
                    }}
                    className="absolute left-4 right-4 bottom-2 h-40 bg-white dark:bg-[#2c2b28] rounded-lg shadow-xl border border-neutral-100 dark:border-neutral-850 z-20 p-4 flex flex-col justify-between"
                  >
                    {/* Watermark Logo */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none text-neutral-800 dark:text-white font-serif font-black text-6xl">
                      SĐ & QA
                    </div>

                    <div className="space-y-1.5 z-10 text-left">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
                        <span className="text-[10px] font-sans font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                          Bức thư tay
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100 leading-tight">
                        Gửi Quỳnh Anh
                      </h4>
                      <p className="font-serif text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[190px] italic">
                        "Có những lời anh chưa kịp nói... mong em một đời an yên..."
                      </p>
                    </div>

                    {/* Handwriting style decorative line lines */}
                    <div className="w-full flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-2 z-10">
                      <span className="text-[9px] font-mono text-rose-500 uppercase tracking-wider font-bold">
                        Đang mở đọc...
                      </span>
                      <span className="text-[8px] font-mono text-neutral-400">
                        17.06.2026
                      </span>
                    </div>
                  </motion.div>

                  {/* Top Flap (Rotates open) */}
                  <motion.div
                    initial={{ rotateX: 0, zIndex: 40 }}
                    animate={{
                      rotateX: animationStage === 'opening' ? 180 : 0,
                      zIndex: animationStage === 'opening' ? 5 : 40
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute top-0 left-0 right-0 h-20 origin-top z-40"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      background: theme === 'light' ? '#eeddae' : '#30271b',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      transformOrigin: 'top',
                      transformStyle: 'preserve-3d'
                    }}
                  />

                  {/* Left Flap */}
                  <div
                    className="absolute inset-y-0 left-0 w-32 z-30"
                    style={{
                      clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
                      background: theme === 'light' ? '#f4e3bf' : '#352c1e',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px'
                    }}
                  />

                  {/* Right Flap */}
                  <div
                    className="absolute inset-y-0 right-0 w-32 z-30"
                    style={{
                      clipPath: 'polygon(100% 0, 100% 100%, 0 50%)',
                      background: theme === 'light' ? '#f4e3bf' : '#352c1e',
                      borderTopRightRadius: '12px',
                      borderBottomRightRadius: '12px'
                    }}
                  />

                  {/* Bottom Flap */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-28 z-30 shadow-inner"
                    style={{
                      clipPath: 'polygon(0 100%, 100% 100%, 50% 0%)',
                      background: theme === 'light' ? '#eddcae' : '#30271b',
                      borderBottomLeftRadius: '12px',
                      borderBottomRightRadius: '12px'
                    }}
                  />

                  {/* Wax Seal (Heart/Rose Seal in front center) */}
                  <motion.div
                    animate={{
                      scale: animationStage === 'opening' ? 0 : 1,
                      opacity: animationStage === 'opening' ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-[44px] left-[108px] w-10 h-10 rounded-full bg-rose-600/90 dark:bg-rose-700/90 flex items-center justify-center shadow-lg border border-rose-500/40 z-50 cursor-pointer active:scale-90 transition-transform"
                  >
                    <span className="text-white text-base select-none">❤️</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative instruction text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: animationStage === 'opening' ? 0 : 0.6,
                  y: animationStage === 'opening' ? 20 : 0
                }}
                className="absolute bottom-16 text-center"
              >
                <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                  Đang mở bức thư kỷ niệm...
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
