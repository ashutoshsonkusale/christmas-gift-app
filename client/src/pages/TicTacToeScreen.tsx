import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Snowflakes from '@/components/Snowflakes'

interface TicTacToeScreenProps {
  onNext: () => void
}

const GRID_ITEMS = [
  '🍫', '🍬', '🍭',
  '🍩', '🍪', '🧁',
  '🍫', '🍬', '🍭',
]

// emojis jo cookie click pe niklenge
const BURST_EMOJIS = ['🍬', '🍭', '🍫', '🧁', '🍩']

export default function TicTacToeScreen({ onNext }: TicTacToeScreenProps) {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        onNext()
      }, 1400)
    }
  }, [clicked, onNext])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF6E5] via-[#FFF1EE] to-[#FFEED6] flex flex-col items-center justify-center relative overflow-hidden px-4">

      <Snowflakes speed="slow" />

      {/* Subtitle */}
      <motion.p
        className="text-[#FF7A9E] italic text-lg mb-3 font-['Pacifico']"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        A quick game first…
      </motion.p>

      {/* Title */}
      <motion.h1
        className="text-5xl md:text-7xl font-display text-slate-800 tracking-tight leading-tight mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Sweet Tic-Tac-Toe
      </motion.h1>

      {/* BOARD */}
      <motion.div
        className="bg-[#FFFCF5] rounded-[36px] shadow-[0_35px_90px_rgba(0,0,0,0.15)] p-8 mb-10 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="grid grid-cols-3 gap-6 w-80 h-80">
          {GRID_ITEMS.map((item, index) => {
            const isCenter = index === 4

            return (
              <div
                key={index}
                className="relative flex items-center justify-center"
              >
                {/* CELL */}
                <motion.button
                  onClick={() => {
                    if (isCenter && !clicked) setClicked(true)
                  }}
                  className={`
                    flex items-center justify-center text-5xl rounded-2xl
                    bg-[#FFFDF8] w-full h-full
                    ${isCenter ? 'border-4 border-dashed border-pink-400' : ''}
                  `}
                  animate={
                    isCenter && !clicked
                      ? { opacity: [0.4, 1, 0.4] }
                      : { opacity: 1 }
                  }
                  transition={
                    isCenter && !clicked
                      ? { duration: 1.6, repeat: Infinity }
                      : {}
                  }
                  whileHover={isCenter && !clicked ? { scale: 1.05 } : {}}
                  whileTap={isCenter && !clicked ? { scale: 0.95 } : {}}
                >
                  {item}
                </motion.button>

                {/* 🍬 EMOJI BURST */}
                <AnimatePresence>
                  {clicked && isCenter && (
                    <div className="absolute inset-0 pointer-events-none">
                      {BURST_EMOJIS.map((emoji, i) => (
                        <motion.span
                          key={i}
                          className="absolute text-3xl"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
                          animate={{
                            x: Math.cos((i / BURST_EMOJIS.length) * Math.PI * 2) * 60,
                            y: Math.sin((i / BURST_EMOJIS.length) * Math.PI * 2) * 60,
                            opacity: 0,
                            scale: 1.2,
                          }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.p
        className="text-pink-500 font-bold text-sm tracking-widest text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        TAP THE COOKIE TO CONTINUE
      </motion.p>
    </div>
  )
}
