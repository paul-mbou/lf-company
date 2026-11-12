import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { easeOut, usePrefersReduced } from './usePrefersReduced';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function ClipReveal({ children, className = '', delay = 0 }: Props) {
  const reduced = usePrefersReduced();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  return (
    <div className={`clip-reveal ${className}`.trim()} ref={ref}>
      <motion.div
        initial={reduced ? false : { y: '110%', opacity: 0.2, rotate: 1.5 }}
        animate={inView || reduced ? { y: '0%', opacity: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.9, delay, ease: easeOut }}
      >
        {children}
      </motion.div>
    </div>
  );
}
