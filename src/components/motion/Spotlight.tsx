import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { HTMLAttributes, ReactNode } from 'react';
import { usePrefersReduced } from './usePrefersReduced';

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Spotlight({ children, className = '', ...rest }: Props) {
  const reduced = usePrefersReduced();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(103, 207, 24, 0.18), transparent 55%)`;

  return (
    <motion.div
      className={`spotlight ${className}`.trim()}
      style={reduced ? undefined : { background }}
      onPointerMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
