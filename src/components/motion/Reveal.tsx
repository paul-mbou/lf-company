import { motion } from 'framer-motion';
import { easeOut, usePrefersReduced } from './usePrefersReduced';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'article';
};

export default function Reveal({ children, className = '', delay = 0, y = 36, as = 'div' }: Props) {
  const reduced = usePrefersReduced();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduced ? 0 : 0.7, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}
