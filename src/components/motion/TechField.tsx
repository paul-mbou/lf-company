import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePrefersReduced } from './usePrefersReduced';

type Props = {
  className?: string;
};

export default function TechField({ className = '' }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReduced();

  useEffect(() => {
    if (!root.current || reduced) return;

    const ctx = gsap.context(() => {
      gsap.to('.tf-line-h', {
        xPercent: 12,
        duration: 18,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
      });
      gsap.to('.tf-line-v', {
        yPercent: 10,
        duration: 22,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });
      gsap.to('.tf-orb', {
        x: '+=40',
        y: '-=28',
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 1.2,
      });
      gsap.to('.tf-scan', {
        yPercent: 220,
        duration: 6.5,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root} className={`tech-field ${className}`} aria-hidden="true">
      <div className="tf-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={`h-${i}`} className="tf-line tf-line-h" style={{ top: `${(i + 1) * 11}%` }} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={`v-${i}`} className="tf-line tf-line-v" style={{ left: `${(i + 1) * 9}%` }} />
        ))}
      </div>
      <span className="tf-orb tf-orb-a" />
      <span className="tf-orb tf-orb-b" />
      <span className="tf-scan" />
      <span className="tf-vignette" />
    </div>
  );
}
