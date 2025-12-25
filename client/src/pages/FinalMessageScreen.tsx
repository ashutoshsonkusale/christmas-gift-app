import { motion } from 'framer-motion';
import Snowflakes from '@/components/Snowflakes';

interface FinalMessageScreenProps {
  onNext: () => void;
  onRestart: () => void;
}

export default function FinalMessageScreen({
  onNext,
  onRestart,
}: FinalMessageScreenProps) {
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
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        {/* Header with EXACT pink icon */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">≡</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Final Thoughts</h2>
        </motion.div>

        {/* Message */}
        <motion.div
          className="text-slate-700 space-y-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-lg italic text-pink-500">Hey Laado,</p>
          <p className="text-base leading-relaxed">
            This Christmas, I just want you to know how special you are to me.
          </p>
          <p className="text-base leading-relaxed">
            I hope this brought you a little comfort and a smile.
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={onNext}
            className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-3 px-6 rounded-full text-base shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Always for you, Cutie 💌
          </motion.button>

          <motion.button
            onClick={onRestart}
            className="flex-1 border-2 border-slate-300 text-slate-600 font-bold py-3 px-6 rounded-full text-base hover:bg-slate-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Restart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}