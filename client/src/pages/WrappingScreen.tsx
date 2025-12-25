import { motion } from 'framer-motion';
import Snowflakes from '@/components/Snowflakes';
import { useEffect } from 'react';

interface WrappingScreenProps {
  onComplete: () => void;
}

export default function WrappingScreen({ onComplete }: WrappingScreenProps) {
  useEffect(() => {
    // Quick spin ~1.5s + slow spin 2s = total ~3.5s, then onComplete after 5s total
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 flex flex-col items-center justify-center relative overflow-hidden">
      <Snowflakes />

      {/* Envelope with Heart - Quick anti-clockwise then slow anti-clockwise */}
      <motion.div
        className="relative mb-12"
        variants={{
          quickSpin: { rotate: -720 }, // 2 full anti-clockwise spins
          slowSpin: { rotate: -360 },
        }}
        initial="quickSpin"
        animate="slowSpin"
        transition={{
          quickSpin: { duration: 1.5, ease: "easeInOut" },
          slowSpin: {
            duration: 2, // exactly 2 seconds slow spin
            ease: "linear",
            delay: 1.5,
          },
        }}
      >
        <div className="text-9xl relative">
          <span className="block">💌</span>
          
          {/* Heart with gentle bounce */}
          <motion.span
            className="absolute top-4 left-1/2 -translate-x-1/2 text-5xl"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❤️
          </motion.span>
        </div>
      </motion.div>

      {/* Text Badge */}
      <motion.div
        className="bg-white bg-opacity-80 px-10 py-5 rounded-full shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 120 }}
      >
        <p className="text-pink-600 text-2xl italic font-medium">
          Wrapping this with care...
        </p>
      </motion.div>

      {/* Glowing blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-40"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-40"
          animate={{ scale: [1.3, 1, 1.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}