import { motion } from 'framer-motion'
import Snowflakes from '@/components/Snowflakes'

interface WelcomeScreenProps {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF6E5] via-[#FFF1EE] to-[#FFEED6] flex flex-col items-center justify-center relative overflow-hidden px-4 font-['Inter']">

      {/* ❄️ Snow */}
      <Snowflakes speed="slow" />

      {/* Decorative dots */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40" />
      <div className="absolute bottom-32 right-10 w-8 h-8 bg-pink-200 rounded-full opacity-40" />
      <div className="absolute top-40 right-20 w-5 h-5 bg-blue-200 rounded-full opacity-40" />

      {/* Subtitle */}
      <motion.p
  className="text-[#FF7A9E] text-lg mb-3 font-['Pacifico'] italic tracking-wide"
  initial={{ opacity: 0, y: -6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  a little christmas thought… 🎄
</motion.p>

      {/* Title */}
      <motion.h1
        className="text-[48px] md:text-[64px] font-extrabold text-[#1F2937] mb-10 text-center font-['Playfair_Display']"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        Hey You
      </motion.h1>

      {/* 🎁 LETTER — slightly UP */}
      <motion.div
        className="bg-[#FFFCF5] rounded-[36px] shadow-[0_35px_90px_rgba(0,0,0,0.12)] px-8 md:px-12 py-12 max-w-xl w-full relative -mt-8"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65 }}
      >
        {/* Mac dots */}
        <div className="flex gap-2 mb-8">
          <span className="w-3 h-3 rounded-full bg-[#FF8A8A]" />
          <span className="w-3 h-3 rounded-full bg-[#FFD36A]" />
          <span className="w-3 h-3 rounded-full bg-[#6EE7B7]" />
        </div>

        <p className="text-[#6B7280] text-center text-lg leading-relaxed mb-6">
          I wanted to do a tiny something this Christmas,
          because you mean a lot to me.
        </p>

        <p className="text-[#FF7A9E] font-['Pacifico'] text-center text-lg mb-10">
          Tap below, okay?
        </p>

        <motion.button
  onClick={onNext}
  className="mx-auto block bg-[#FF7A9E] hover:bg-[#FF6A91] text-white font-semibold py-4 px-10 rounded-full text-lg
             shadow-[0_18px_40px_rgba(255,122,158,0.45)]
             border-2 border-black"
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
>
  Open Your Gift →
</motion.button>

        {/* 🐱 LEFT CAT — STATIC (NO JUMP) */}
        <img
          src="/images/cat_santa_left.webp"
          alt="Santa Cat Left"
          className="absolute -bottom-16 -left-10 w-28 md:w-36 pointer-events-none"
        />

        {/* 🐱 RIGHT CAT — JUMPING IN PLACE */}
        <motion.img
          src="/images/santacat.png"
          alt="Santa Cat Right"
          className="absolute -top-12 -right-10 w-24 md:w-28 pointer-events-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      
    </div>
  )
}
