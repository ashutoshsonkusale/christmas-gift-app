import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes: Snowflake[] = [];
      for (let i = 0; i < 50; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 8 + Math.random() * 4,
          size: 4 + Math.random() * 8,
          opacity: 0.3 + Math.random() * 0.7,
        });
      }
      setSnowflakes(flakes);
    };

    generateSnowflakes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--snowflake-opacity);
          }
          90% {
            opacity: var(--snowflake-opacity);
          }
          100% {
            transform: translateY(100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(30px);
          }
        }

        .snowflake {
          position: fixed;
          top: -10px;
          pointer-events: none;
          animation: snowfall linear infinite, sway ease-in-out infinite;
        }
      `}</style>

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            '--snowflake-opacity': flake.opacity,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s, ${flake.duration * 0.5}s`,
          } as React.CSSProperties}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="white"
            opacity={flake.opacity}
          >
            <path d="M50,0 L61,35 L100,50 L61,65 L50,100 L39,65 L0,50 L39,35 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
