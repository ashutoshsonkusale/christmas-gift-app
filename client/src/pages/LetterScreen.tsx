import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Snowflakes from '@/components/Snowflakes'

interface LetterScreenProps {
  onNext: () => void
}

export default function LetterScreen({ onNext }: LetterScreenProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF6E5] via-[#FFF1EE] to-[#FFEED6] flex flex-col items-center justify-center relative overflow-hidden px-4">
      <Snowflakes />

      {/* Subtitle */}
      <motion.p
        className="text-pink-500 italic text-lg mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Wrapped straight from my heart
      </motion.p>

      {/* TITLE */}
      <motion.h1
        className="flex items-center gap-3 text-5xl md:text-6xl font-bold text-slate-900 text-center mb-10 leading-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span>A Christmas Note</span>
        <span>🎅</span>
        <span>💌</span>
      </motion.h1>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ENVELOPE */
          <motion.div
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ delay: 0.7 }}
            className="cursor-pointer"
          >
            <div className="relative w-[360px] h-[240px] mx-auto mb-8">
              <div className="absolute inset-0 bg-pink-100 rounded-2xl shadow-2xl" />
              <div className="absolute left-0 top-0 w-1/2 h-full bg-pink-200 clip-left" />
              <div className="absolute right-0 top-0 w-1/2 h-full bg-pink-200 clip-right" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-pink-300 clip-bottom" />
              <div className="absolute top-0 left-0 w-full h-1/2 bg-pink-300 clip-top z-10" />

              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <div className="bg-white rounded-full p-4 shadow-lg text-2xl">
                  ❤️
                </div>
              </motion.div>
            </div>

            <motion.p
              className="text-pink-400 italic text-lg text-center"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Tap to unwrap 🎁
            </motion.p>
          </motion.div>
        ) : (
          /* LETTER */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl"
          >
            <div className="relative bg-[#FFFDF5] rounded-[40px] shadow-2xl p-8 sm:p-10 md:p-14">

              {/* 🐱 CAT – TOP RIGHT (RESPONSIVE) */}
             <img
  src="/images/babycat.png"
  alt="Baby Cat"
  className="
    absolute
    -top-2
    right-6
    h-20
    sm:h-50
    md:h-50
    w-auto
    rotate-[20deg]
    drop-shadow-xl
  "
/>




              {/* Header pill */}
              <div className="mt-10 sm:mt-0 mb-6">
                <span className="inline-flex items-center gap-2 bg-pink-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md">
                  💖 MY PASANDIDA AURAT
                </span>
              </div>

              {/* TEXT */}
              <div className="max-h-[260px] overflow-y-auto pr-2 custom-scroll">
                <p className="text-xl italic text-slate-700 mb-4 font-[cursive]">
                  Hey Laado,
                </p>

                <p className="text-lg text-slate-700 mb-4 font-[cursive]">
                  Christmas feels warmer because of you.
                </p>

                <p className="text-lg text-slate-700 font-[cursive]">
                  You bring comfort, light, and calm into my world.
                </p>
              </div>

              {/* SIGN */}
              <p className="text-pink-500 text-3xl italic font-bold text-right mt-8">
                Always yours
              </p>

              {/* BUTTON */}
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="mt-8 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full text-lg shadow-xl"
              >
                Continue ✨
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
