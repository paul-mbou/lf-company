import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type CSSProperties } from 'react';
import { usePrefersReduced } from './motion/usePrefersReduced';

gsap.registerPlugin(ScrollTrigger);

type Logo = {
  src: string;
  label: string;
};

type Props = {
  title: string;
  intro: string;
  logos: Logo[];
};

export default function TechStack({ title, intro, logos }: Props) {
  const reduced = usePrefersReduced();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      const copy = root.current.querySelector('.tech-stack-copy');
      const chips = gsap.utils.toArray<HTMLElement>('.tech-chip', root.current);
      if (!chips.length) return;

      gsap.set(chips, { opacity: 0, y: 28, rotateX: 16, filter: 'blur(6px)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 78%',
          once: true,
        },
      });

      if (copy) {
        gsap.set(copy, { opacity: 0, y: 36 });
        tl.to(copy, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0);
      }

      tl.to(
        chips,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: {
            each: 0.045,
            from: 'start',
            grid: 'auto',
          },
          ease: 'power3.out',
        },
        0.18,
      );

      // Soft signal sweep across the grid after boot
      tl.to(
        chips,
        {
          '--chip-glow': 1,
          duration: 0.28,
          stagger: { each: 0.04, from: 'start' },
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
        },
        '-=0.15',
      );

      chips.forEach((chip) => {
        const icon = chip.querySelector('img');
        if (!icon) return;
        gsap.to(icon, {
          y: -2,
          duration: 2.4 + Math.random() * 1.2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: Math.random() * 1.5,
        });
      });
    },
    { scope: root, dependencies: [reduced, logos.length] },
  );

  return (
    <section className="tech-stack wrap" id="stack" aria-labelledby="stack-title" ref={root}>
      <div className="tech-stack-copy">
        <p className="place mono">01 · STACK</p>
        <h2 className="display" id="stack-title">
          {title}
        </h2>
        <p className="lead">{intro}</p>
      </div>
      <ul className="tech-stack-grid" role="list">
        {logos.map((logo, index) => (
          <li
            key={logo.label}
            className="tech-chip cut"
            data-cursor="hover"
            style={{ '--i': index } as CSSProperties}
          >
            <span className="tech-chip-index mono" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <img src={logo.src} alt="" width={28} height={28} loading="lazy" decoding="async" />
            <span className="mono">{logo.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
