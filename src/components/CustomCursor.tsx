import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
    };

    const handleEnter = () => {
      isHovering.current = true;
      gsap.to(dot, { scale: 2, duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 1.5, borderColor: 'rgba(0, 212, 255, 0.8)', backgroundColor: 'rgba(0, 212, 255, 0.1)', duration: 0.3, ease: 'power2.out' });
    };

    const handleLeave = () => {
      isHovering.current = false;
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 1, borderColor: 'rgba(0, 212, 255, 0.5)', backgroundColor: 'transparent', duration: 0.3, ease: 'power2.out' });
    };

    const addListeners = () => {
      const items = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .hoverable');
      items.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
      return items;
    };

    window.addEventListener('mousemove', handleMove);
    let elements = addListeners();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      elements = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}