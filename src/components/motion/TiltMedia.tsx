import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { springSoft, usePrefersReduced } from './usePrefersReduced';

type Props = {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  parallaxY?: MotionValue<number> | number;
}

export default function TiltMedia({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = '',
  priority = false,
  parallaxY = 0,
}: Props) {
  const reduced = usePrefersReduced();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), springSoft);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), springSoft);
  const glareX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 55%)`;

  function onMove(event: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-media ${className}`}
      style={
        reduced
          ? { y: 0 }
          : {
              rotateX: rx,
              rotateY: ry,
              y: parallaxY,
              transformPerspective: 1100,
            }
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="tilt-frame">
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
        />
        {!reduced && <motion.span className="tilt-glare" style={{ background: glare }} aria-hidden="true" />}
        <span className="tilt-rim" aria-hidden="true" />
      </div>
    </motion.div>
  );
}
