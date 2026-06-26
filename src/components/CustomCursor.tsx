import { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();
  const isHovering = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.left = `${mousePos.x}px`;
    dot.style.top = `${mousePos.y}px`;

    // Smooth ring follow with delay
    const ringX = parseFloat(ring.style.left || '0') || mousePos.x;
    const ringY = parseFloat(ring.style.top || '0') || mousePos.y;
    const newRingX = ringX + (mousePos.x - ringX) * 0.15;
    const newRingY = ringY + (mousePos.y - ringY) * 0.15;
    ring.style.left = `${newRingX}px`;
    ring.style.top = `${newRingY}px`;
  }, [mousePos]);

  useEffect(() => {
    const handleMouseEnter = () => {
      isHovering.current = true;
      ringRef.current?.classList.add('hover');
    };
    const handleMouseLeave = () => {
      isHovering.current = false;
      ringRef.current?.classList.remove('hover');
    };

    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .hoverable');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    let elements = addListeners();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      elements = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
