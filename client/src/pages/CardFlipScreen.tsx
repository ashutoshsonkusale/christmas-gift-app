import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Snowflakes from '@/components/Snowflakes';

interface CardFlipScreenProps {
  onNext: () => void;
}

interface Card {
  id: number;
  frontText: string;
  frontEmoji: string;
  backImage: string;
  backTitle: string;
  backText: string;
  backEmoji: string;
  bgColor: string;
  tilt: number;
}

const CARDS: Card[] = [
  {
    id: 1,
    frontText: 'You make\neverything feel\nwarmer',
    frontEmoji: '🤍',
    backImage: '/images/card_1_back_image.webp',
    backTitle: 'Christmas Feeling:',
    backText: 'Being with you feels like comfort and calm.',
    backEmoji: '🎄',
    bgColor: 'bg-pink-100',
    tilt: -6,
  },
  {
    id: 2,
    frontText: "You're cute even\nwhen you're\nannoyed",
    frontEmoji: '😅',
    backImage: '/images/card_3_back_image.webp',
    backTitle: 'Winter Observation:',
    backText: 'No matter the mood, you’re still my favorite.',
    backEmoji: '❤️',
    bgColor: 'bg-yellow-100',
    tilt: 0,
  },
  {
    id: 3,
    frontText: 'Christmas Coupon:\nUnlimited hugs',
    frontEmoji: '🫂🫂',
    backImage: '/images/pic3-D47Ivlf_.jpg',
    backTitle: 'Redeem Anytime',
    backText: 'Especially on cold days',
    backEmoji: 'forever',
    bgColor: 'bg-blue-100',
    tilt: 6,
  },
];

export default function CardFlipScreen({ onNext }: CardFlipScreenProps) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, []);

  const toggleFlip = (cardId: number) => {
    setFlipped((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-pink-50 to-amber-100 flex flex-col items-center justify-start pt-12 pb-24 relative overflow-hidden px-4">
      <Snowflakes />

      {/* Subtitle */}
      <motion.p
        className="text-pink-500 italic text-lg mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        ✨ ☁️ from a sincere heart
      </motion.p>

      {/* Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-slate-800 text-center leading-tight mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Little Things I Want You To Know
      </motion.h1>

      {/* Tree */}
      <motion.p
        className="text-5xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        🎄
      </motion.p>

      {/* Hint */}
      <motion.p
        className="text-pink-500 italic text-lg mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Tap the card to flip it❄️
      </motion.p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-12 md:gap-16 max-w-6xl px-4">
        {CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            className="relative"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0, rotate: card.tilt }}
            transition={{ delay: 0.9 + index * 0.2 }}
            whileHover={{ scale: 1.06 }}
          >
            <motion.div
              className="relative w-80 h-[28rem] md:h-[30rem] cursor-pointer"
              onClick={() => toggleFlip(card.id)}
              animate={{ rotateY: flipped[card.id] ? 180 : 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
            >
              {/* Front - Clip remains */}
              <div
                className={`absolute inset-0 ${card.bgColor} rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10 backface-hidden`}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-gray-200 bg-opacity-80 rounded-lg shadow-md z-10" />

                <p className="text-3xl md:text-4xl text-slate-800 text-center leading-relaxed whitespace-pre-line font-handwriting">
                  {card.frontText}
                </p>
                <p className="text-6xl mt-10">{card.frontEmoji}</p>
              </div>

              {/* Back - NO CLIP, FULL CLEAN IMAGE */}
              <div
                className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col backface-hidden overflow-hidden"
                style={{ transform: 'rotateY(180deg)' }}
              >
                {/* Removed the clip from back side */}

                {/* Large Full Image */}
                <div className="w-full flex-1 min-h-[16rem] md:min-h-[18rem] overflow-hidden">
                  <img
                    src={card.backImage}
                    alt="Memory"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Area Below */}
                <div className="px-8 py-6 flex flex-col items-center justify-center bg-white">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 font-handwriting">
                    {card.backTitle}
                  </h3>

                  <p className="text-lg text-slate-700 text-center leading-relaxed font-handwriting">
                    {card.backText}
                  </p>

                  {card.backEmoji === 'forever' ? (
                    <div className="mt-6 -rotate-1">
                      <span className="text-4xl font-bold text-pink-600 bg-pink-100 px-8 py-3 rounded-xl shadow-lg border-4 border-pink-400">
                        FOREVER
                      </span>
                    </div>
                  ) : (
                    <p className="text-5xl mt-6">{card.backEmoji}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        className="mt-20 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-pink-400/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        Next ✨ →
      </motion.button>

      {/* Custom CSS */}
      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        .font-handwriting {
          font-family: 'Reenie Beanie', 'Homemade Apple', cursive;
        }
      `}</style>
    </div>
  );
}