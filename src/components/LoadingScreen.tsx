import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';

function useForceReady(delay = 7000) {
  const [forced, setForced] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setForced(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return forced;
}

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const forced = useForceReady();

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (forced) setIsReady(true);
  }, [forced]);

  useEffect(() => {
    if (!isReady) return;
    const timeout = setTimeout(onFinish, 1200);
    return () => clearTimeout(timeout);
  }, [isReady, onFinish]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-cyber-black flex flex-col items-center justify-center transition-opacity duration-500 ${isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <h1 className="text-4xl lg:text-6xl font-bold neon-text mb-8 tracking-wider">
        VP.
      </h1>
      <div className="w-48 lg:w-64 h-1 bg-cyber-gray rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-gray-500 text-sm mt-4 font-mono tracking-widest uppercase">
        Initializing {Math.round(progress)}%
      </p>
    </div>
  );
}