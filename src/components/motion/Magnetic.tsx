import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { springSnappy, usePrefersReduced } from './usePrefersReduced';

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  target?: string;
  rel?: string;
};

export default function Magnetic({
  children,
  className = '',
  href,
  strength = 0.35,
  target,
  rel,
}: Props) {
  const reduced = usePrefersReduced();
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springSnappy);
  const sy = useSpring(y, springSnappy);

  function onMove(event: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const style = reduced ? undefined : { x: sx, y: sy };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        target={target}
        rel={rel}
        whileTap={reduced ? undefined : { scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
