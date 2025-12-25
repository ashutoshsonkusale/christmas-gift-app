import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Snowflakes from '@/components/Snowflakes';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showMerry, setShowMerry] = useState(false);

  const fullText = 'Loading your winter gift...';
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const merryTimer = setTimeout(() => setShowMerry(true), 1500);

    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
      }
    }, 80);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      clearTimeout(merryTimer);
      clearInterval(typingInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0f1b2d] to-[#14233a] flex flex-col items-center justify-center relative overflow-hidden">

      {/* ❄️ INLINE SNOWFALL */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {Array.from({ length: 45 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full opacity-80"
            style={{
              width: '4px',
              height: '4px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -100}px`,
              animation: `snowFall ${4 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* ☁️ CLOUDS */}
      {[
        { top: 'top-16', left: 'left-6', size: 'w-36', float: 10, dur: 6 },
        { top: 'top-28', left: 'right-10', size: 'w-44', float: -12, dur: 7 },
        { top: 'top-40', left: 'left-1/3', size: 'w-32', float: 8, dur: 5 },
        { top: 'top-24', left: 'right-1/3', size: 'w-28', float: -6, dur: 6 },
      ].map((c, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 200 60"
          className={`absolute ${c.top} ${c.left} ${c.size} fill-slate-400 opacity-40 z-10`}
          animate={{ y: [0, c.float, 0] }}
          transition={{ duration: c.dur, repeat: Infinity }}
        >
          <ellipse cx="50" cy="35" rx="40" ry="20" />
          <ellipse cx="90" cy="25" rx="30" ry="18" />
          <ellipse cx="120" cy="35" rx="40" ry="22" />
        </motion.svg>
      ))}

      {/* 🐱 CAT */}
      <motion.img
        src="/images/cat.png"
        alt="Christmas Cat"
        className="w-28 sm:w-32 md:w-36 z-20 select-none"
        draggable={false}
        initial={{ x: '-140vw' }}
        animate={{ x: ['-140vw', '0vw', '0vw', '140vw'] }}
        transition={{
          duration: 8,
          times: [0, 0.4, 0.55, 1],
          ease: 'easeInOut',
        }}
      />

      {/* 🎄 Merry Christmas */}
      {showMerry && (
        <motion.p
          className="text-white text-4xl sm:text-5xl font-[cursive] neon-text z-20"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        >
          Merry Christmas 🎅
        </motion.p>
      )}

      {/* ⌨️ Loading text */}
      <p className="mt-3 text-white text-lg sm:text-xl font-light tracking-wide opacity-90 z-20">
        {typedText}
        <span className="animate-pulse">|</span>
      </p>

      {/* ❄️ Bottom Snow Ground */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-t-[100%] z-10" />

      
    </div>
  );
}
