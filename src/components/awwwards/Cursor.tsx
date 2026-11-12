import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { springSnappy, usePrefersReduced } from '../motion/usePrefersReduced';

type Trail = { id: number; x: number; y: number };

export default function Cursor() {
  const reduced = usePrefersReduced();
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<Trail[]>([]);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, springSnappy);
  const sy = useSpring(y, springSnappy);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    document.documentElement.classList.add('aww-cursor');
    let id = 0;
    let last = 0;
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const now = performance.now();
      if (now - last > 28) {
        last = now;
        id += 1;
        const next = { id, x: event.clientX, y: event.clientY };
        setTrail((prev) => [...prev.slice(-10), next]);
      }
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHover(Boolean(target?.closest('a, button, [data-cursor="hover"]')));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      document.documentElement.classList.remove('aww-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <>
      {trail.map((point, index) => (
        <span
          key={point.id}
          className="aww-cursor-trail"
          style={{
            transform: `translate3d(${point.x}px, ${point.y}px, 0)`,
            opacity: (index + 1) / (trail.length + 2),
          }}
          aria-hidden="true"
        />
      ))}
      <motion.div
        className={`aww-cursor-el ${hover ? 'is-hover' : ''} ${visible ? 'is-on' : ''}`}
        style={{ x: sx, y: sy }}
        aria-hidden="true"
      >
        <span className="aww-cursor-dot" />
        <span className="aww-cursor-ring" />
        <span className="aww-cursor-cross" />
      </motion.div>
    </>
  );
}
