import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Artificial minimum wait time plus actual loading progress
    if (progress >= 100) {
      const timer = setTimeout(() => setIsReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (isReady) {
      const tl = gsap.timeline({
        onComplete: onFinish,
      });
      if (textRef.current) {
        tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });
      }
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.2');
    }
  }, [isReady, onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-cyber-black flex flex-col items-center justify-center"
    >
      <h1
        ref={textRef}
        className="text-4xl lg:text-6xl font-bold neon-text mb-8 tracking-wider"
      >
        VP.
      </h1>
      <div className="w-48 lg:w-64 h-1 bg-cyber-gray rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-500 text-sm mt-4 font-mono tracking-widest uppercase">
        Initializing {Math.round(progress)}%
      </p>
    </div>
  );
}