import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Snowflakes from '@/components/Snowflakes';

interface SealedScreenProps {
  onRestart: () => void;
}

export default function SealedScreen({ onRestart }: SealedScreenProps) {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 🔥 TYPING TEXT
  const fullText = 'Always & Forever ❄️ 🤍';
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 130); // ⏱ typing speed (ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-pink-50 to-amber-100 flex flex-col items-center justify-center relative overflow-hidden px-4">
      <Snowflakes />

      {/* Subtitle */}
      <motion.p
        className="text-pink-500 italic text-lg mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        the grand finale...
      </motion.p>

      {/* Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        One More Thing
      </motion.h1>

      {/* Content card */}
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mb-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        {/* Heart */}
        <motion.div
          className="text-6xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💝
        </motion.div>

        {/* Main title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          From my heart 💌
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-2xl text-slate-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          You Matter To Me
        </motion.p>

        {/* 🔥 Typing Animation Box */}
        <motion.div
          className="bg-gradient-to-r from-pink-100 to-pink-50 border-2 border-pink-300 rounded-2xl p-6 mb-8 min-h-[72px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <p className="text-2xl font-bold text-pink-600 italic tracking-wide">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        {/* Date */}
        <motion.p
          className="text-gray-500 text-sm mb-8 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {dateString}
        </motion.p>

        {/* Restart */}
        <motion.button
          onClick={onRestart}
          className="bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          See Again ✨ 🔄
        </motion.button>
      </motion.div>
    </div>
  );
}
