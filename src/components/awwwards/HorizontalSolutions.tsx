import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { usePrefersReduced } from '../motion/usePrefersReduced';

gsap.registerPlugin(ScrollTrigger);

type Visual = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
};

type Item = {
  pole: string;
  group: string;
  title: string;
  text: string;
};

type Props = {
  title: string;
  intro: string;
  write: string;
  items: Item[];
  contactBase: string;
  visuals?: Visual[];
};

export default function HorizontalSolutions({ title, intro, write, items, contactBase, visuals = [] }: Props) {
  const reduced = usePrefersReduced();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced || !section.current || !track.current) return;
      const total = track.current.scrollWidth - window.innerWidth + 80;
      gsap.to(track.current, {
        x: () => -Math.max(total, 0),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${Math.max(total, window.innerHeight)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: section, dependencies: [reduced, items.length] },
  );

  return (
    <section className="hz" id="solutions" ref={section}>
      <div className="hz-head wrap">
        <p className="place mono">03 · DEPLOY</p>
        <h2>{title}</h2>
        <p className="section-intro">{intro}</p>
      </div>
      <div className="hz-viewport">
        <div className="hz-track" ref={track}>
          {items.map((item, index) => {
            const visual = visuals[index];
            return (
              <a
                key={item.title}
                className="hz-card"
                href={`${contactBase}?pole=${item.pole}`}
                data-cursor="hover"
              >
                {visual ? (
                  <img
                    className="hz-card-visual"
                    src={visual.src}
                    srcSet={visual.srcSet}
                    sizes="(min-width: 960px) 28vw, 78vw"
                    alt=""
                    width={visual.width}
                    height={visual.height}
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="hz-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="kicker">{item.group}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="go">{write}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
