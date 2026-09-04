'use client';

import { useEffect, useRef, useState } from 'react';
import type { CursorState } from '@/types';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    // Hide on reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Detect hover targets
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="explore"]')) {
        setState('explore');
      } else if (target.closest('[data-cursor="enter"]')) {
        setState('enter');
      } else if (target.closest('[data-cursor="view"]') || target.closest('a, button, [role="button"]')) {
        setState('view');
      } else if (target.closest('[data-cursor="drag"]')) {
        setState('drag');
      } else {
        setState('default');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    const animate = () => {
      const lerpFactor = 0.12;
      const ringLerp = 0.07;

      dot.current.x += (pos.current.x - dot.current.x) * lerpFactor;
      dot.current.y += (pos.current.y - dot.current.y) * lerpFactor;
      ring.current.x += (pos.current.x - ring.current.x) * ringLerp;
      ring.current.y += (pos.current.y - ring.current.y) * ringLerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.current.x - 4}px, ${dot.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ring.current.x + 14}px, ${ring.current.y - 10}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  const isExpanded = state !== 'default';

  const labelMap: Record<CursorState, string> = {
    default: '',
    view: 'VIEW ↗',
    explore: 'EXPLORE',
    enter: 'ENTER →',
    drag: 'DRAG',
  };

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: isExpanded ? 'var(--gb-copper)' : 'var(--gb-offwhite)',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'background-color 0.2s ease, opacity 0.3s ease',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isExpanded ? 60 : 40,
          height: isExpanded ? 60 : 40,
          borderRadius: '50%',
          border: `1px solid ${isExpanded ? 'var(--gb-copper)' : 'rgba(245, 240, 232, 0.4)'}`,
          zIndex: 9998,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition:
            'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* Label */}
      {isExpanded && (
        <div
          ref={labelRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            opacity: visible ? 1 : 0,
            fontFamily: 'var(--font-display)',
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--gb-copper)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s ease',
            willChange: 'transform',
          }}
        >
          {labelMap[state]}
        </div>
      )}
    </>
  );
}
