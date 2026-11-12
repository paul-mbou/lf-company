import { motion } from 'framer-motion';
import { usePrefersReduced } from './usePrefersReduced';

type Props = {
  items: string[];
};

export default function KineticStrip({ items }: Props) {
  const reduced = usePrefersReduced();
  const row = [...items, ...items, ...items];

  return (
    <div className="kinetic-strip" aria-hidden="true">
      <motion.div
        className="kinetic-track"
        animate={reduced ? undefined : { x: ['0%', '-33.333%'] }}
        transition={reduced ? undefined : { duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
