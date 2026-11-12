import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReduced } from './usePrefersReduced';

type Props = {
  label?: string;
};

export default function SectionBridge({ label = 'NEXT' }: Props) {
  const reduced = usePrefersReduced();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scaleX = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.15, 1, 0.15]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.45, 0.9], [0, 1, 0]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.1, 0.55, 0.1]);

  return (
    <div className="section-bridge" ref={ref} aria-hidden="true">
      <motion.div className="section-bridge-line" style={{ scaleX, opacity }} />
      <motion.span className="section-bridge-label mono" style={{ opacity }}>
        {label}
      </motion.span>
      {!reduced && (
        <motion.span
          className="section-bridge-glow"
          style={{ opacity: glow }}
        />
      )}
    </div>
  );
}
