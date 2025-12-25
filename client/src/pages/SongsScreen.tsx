import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Snowflakes from '@/components/Snowflakes';
import { Play, Pause } from 'lucide-react';

interface SongsScreenProps {
  onNext: () => void;
}

interface Song {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

const SONGS: Song[] = [
  {
    id: 1,
    title: 'High On You',
    subtitle: 'LIKE FAIRY LIGHTS FOR MY HEART',
    image: '/images/song_1_cat_ornament.webp',
    url: 'https://christmas-premium-free-demo.vercel.app/assets/music1-eAt8kRLO.mp3',
  },
  {
    id: 2,
    title: 'For a Reason',
    subtitle: 'SOME PEOPLE FEEL LIKE HOME',
    image: '/images/song_2_cat_sunset.webp',
    url: '/assets/forreason.mp3',
  },
  {
    id: 3,
    title: 'Dil Kaa Jo Haal Hai',
    subtitle: 'WINTER FEELINGS HIT DIFFERENT',
    image: '/images/song_3_cat_santa_hat.webp',
    url: '/assets/Dilkajohaalhai.mp3',
  },
];

export default function SongsScreen({ onNext }: SongsScreenProps) {
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [songProgress, setSongProgress] = useState<Record<number, number>>({});

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = SONGS.find((song) => song.id === currentSongId);

  const handlePlayPause = (songId: number) => {
    if (currentSongId === songId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongId(songId);
      setIsPlaying(true);
      setDuration(0);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (audio.src !== new URL(currentSong.url, window.location.origin).href) {
      audio.src = currentSong.url;
      audio.load();
    }

    const savedTime = songProgress[currentSong.id] || 0;
    audio.currentTime = savedTime;

    if (isPlaying) {
      audio.play().catch((e) => {
        console.error('Play error:', e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentSongId, isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (currentSongId) {
        setSongProgress((prev) => ({
          ...prev,
          [currentSongId]: audio.currentTime,
        }));
      }
    };

    const updateDuration = () => {
      if (currentSongId) {
        setDuration(audio.duration || 0);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentSongId]);

  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentTime = currentSongId ? songProgress[currentSongId] || 0 : 0;
  const progressPercentage = currentSongId && duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-pink-50 flex flex-col items-center justify-start pt-8 pb-16 relative overflow-hidden px-4">
      <Snowflakes />

      <audio ref={audioRef} />

      {/* Subtitle */}
      <motion.p
        className="text-pink-400 text-lg italic mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Soft, warm & full of feeling
      </motion.p>

      {/* Main Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-orange-600 text-center leading-tight mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Songs That Feel Like Christmas
        <br />
        With You 🎶
      </motion.h1>

      {/* Songs List */}
      <div className="w-full max-w-4xl space-y-8">
        {SONGS.map((song, index) => {
          const isActive = currentSongId === song.id;
          const isThisPlaying = isActive && isPlaying;

          return (
            <motion.div
              key={song.id}
              onClick={() => handlePlayPause(song.id)}
              className={`
                relative bg-white rounded-3xl p-6 cursor-pointer transition-all duration-500 group
                ${isActive
                  ? 'shadow-2xl border-4 border-orange-400 bg-gradient-to-b from-white to-orange-50'
                  : 'shadow-xl border-4 border-transparent'
                }
              `}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.15 }}
              whileHover={{ scale: isActive ? 1.02 : 1.015 }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Image Section */}
                <div className="relative w-full sm:w-48 sm:h-48 h-64 sm:h-auto flex-shrink-0">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-full object-cover rounded-2xl sm:rounded-none"
                  />

                  {/* Play/Pause Overlay - Icon ko chhota kiya */}
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      ${isActive ? 'opacity-100' : ''}
                    `}
                  >
                    <div
                      className={`
                        bg-white bg-opacity-80 rounded-full p-3 shadow-2xl  // padding kam kiya (p-5 → p-3)
                        scale-0 group-hover:scale-100 transition-transform duration-300
                        ${isActive ? 'scale-100' : ''}
                      `}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-10 h-10 text-orange-500" fill="currentColor" />  // w-16 → w-10
                      ) : (
                        <Play className="w-10 h-10 text-orange-500 ml-1" fill="currentColor" />  // ml-3 → ml-1
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-orange-700">
                        {song.title}
                      </h3>
                      <p className="text-sm text-orange-500 uppercase font-medium tracking-wide mt-1">
                        {song.subtitle}
                      </p>
                    </div>

                    {isActive && (
                      <div className="bg-black text-green-400 text-xs font-mono px-4 py-2 rounded-full shadow-md">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    )}
                  </div>

                  {/* Reel to Reel */}
                  <div className="flex items-center justify-center sm:justify-start gap-6 mt-4">
                    <motion.div
                      className="relative w-16 h-16"
                      animate={isThisPlaying ? { rotate: 360 } : {}}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gray-100 border-4 border-gray-300 shadow-inner" />
                      <div className="absolute inset-2 rounded-full bg-white" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300 rounded-full shadow" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gray-300 absolute" />
                        <div className="w-full h-0.5 bg-gray-300 absolute rotate-90" />
                      </div>
                    </motion.div>

                    <div className="flex-1 max-w-xs relative">
                      <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                        <motion.div
                          className="h-full bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200"
                          animate={{ width: isActive ? `${progressPercentage}%` : '0%' }}
                          transition={{ type: 'tween', duration: 0.2 }}
                        />
                        <span className="absolute inset-0 text-xs text-gray-400 flex items-center justify-center font-medium tracking-wider">
                          MAGNETIC TAPE
                        </span>
                      </div>
                    </div>

                    <motion.div
                      className="relative w-16 h-16"
                      animate={isThisPlaying ? { rotate: -360 } : {}}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gray-100 border-4 border-gray-300 shadow-inner" />
                      <div className="absolute inset-2 rounded-full bg-white" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300 rounded-full shadow" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gray-300 absolute" />
                        <div className="w-full h-0.5 bg-gray-300 absolute rotate-90" />
                      </div>
                    </motion.div>
                  </div>

                  {isActive && (
                    <p className="text-orange-200 italic text-lg mt-4 tracking-widest opacity-60">
                      REEL TO REEL
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-3xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        Next 🎄 →
      </motion.button>
    </div>
  );
}