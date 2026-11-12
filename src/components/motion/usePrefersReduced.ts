import { useReducedMotion } from 'framer-motion';

export function usePrefersReduced() {
  return Boolean(useReducedMotion());
}

export const springSoft = { type: 'spring' as const, stiffness: 90, damping: 28, mass: 0.8 };
export const springSnappy = { type: 'spring' as const, stiffness: 260, damping: 28 };
export const easeOut = [0.22, 0.7, 0.2, 1] as const;
