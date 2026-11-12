import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReduced } from './usePrefersReduced';

type Props = {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function MaskImage({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: Props) {
  const reduced = usePrefersReduced();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : ['-4%', '4%']);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.72, 1, 1, 0.85]);

  return (
    <div className={`mask-image cut ${className}`.trim()} ref={ref}>
      <motion.div className="mask-image-clip" style={{ opacity }}>
        <motion.img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ y }}
        />
      </motion.div>
      <span className="mask-image-blend" aria-hidden="true" />
      <span className="mask-image-frame" aria-hidden="true" />
    </div>
  );
}
