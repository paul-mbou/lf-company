import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Magnetic from '../motion/Magnetic';
import MeshConstellation from '../motion/MeshConstellation';
import { easeOut, usePrefersReduced } from '../motion/usePrefersReduced';
import ScrambleText from './ScrambleText';

export type PoleItem = {
  id: string;
  short: string;
  title: string;
  summary: string;
  body: string;
};

type Props = {
  poles: PoleItem[];
  title: string;
  intro: string;
  cta: string;
  contactBase: string;
  label: string;
};

const DEG_PER_SEC = 7.2; // full revolution ~50s
const RESUME_AFTER_CLICK_MS = 10000;
const RADIUS = 168;

export default function OrbitalPoles({ poles, title, intro, cta, contactBase, label }: Props) {
  const reduced = usePrefersReduced();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const angleRef = useRef(0);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  const pole = poles[active];
  const step = 360 / Math.max(poles.length, 1);

  function clearResume() {
    if (resumeTimer.current != null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }

  function paintNodes(nextAngle: number) {
    poles.forEach((_, index) => {
      const el = nodeRefs.current[index];
      if (!el) return;
      const theta = ((index * step + nextAngle - 90) * Math.PI) / 180;
      const x = Math.cos(theta) * RADIUS;
      const y = Math.sin(theta) * RADIUS;
      const selected = index === activeRef.current;
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${selected ? 1.06 : 1})`;
      el.classList.toggle('is-active', selected);
      el.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }

  function syncActiveFromAngle(nextAngle: number) {
    const normalized = (((-nextAngle / step) % poles.length) + poles.length) % poles.length;
    const nearest = Math.round(normalized) % poles.length;
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
      paintNodes(nextAngle);
    }
  }

  function select(index: number) {
    const next = -index * step;
    angleRef.current = next;
    activeRef.current = index;
    setActive(index);
    paintNodes(next);

    // Only a click pauses the orbit
    pausedRef.current = true;
    setPaused(true);
    clearResume();
    if (!reduced) {
      resumeTimer.current = window.setTimeout(() => {
        pausedRef.current = false;
        setPaused(false);
        resumeTimer.current = null;
      }, RESUME_AFTER_CLICK_MS);
    }
  }

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    paintNodes(angleRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poles.length, step]);

  useEffect(() => {
    if (reduced || poles.length < 2) {
      paintNodes(angleRef.current);
      return;
    }

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!pausedRef.current) {
        angleRef.current += DEG_PER_SEC * dt;
        paintNodes(angleRef.current);
        syncActiveFromAngle(angleRef.current);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearResume();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, poles.length, step]);

  return (
    <section className="orbital" id="poles">
      <MeshConstellation className="orbital-mesh" density={58} interactive shooting />
      <div className="orbital-copy wrap">
        <p className="place mono">02 · SIGNAL</p>
        <h2 className="display">
          <ScrambleText text={title} as="span" />
        </h2>
        <p className="section-intro">{intro}</p>
      </div>

      <div className={`orbital-stage wrap ${paused ? 'is-paused' : ''}`}>
        <div className="orbital-ring" role="tablist" aria-label={label} aria-roledescription="orbit" data-cursor="hover">
          <div className="orbital-core" aria-hidden="true">
            <span />
            <strong>{pole?.short}</strong>
          </div>
          {poles.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`orbital-node ${index === active ? 'is-active' : ''}`}
              ref={(el) => {
                nodeRefs.current[index] = el;
              }}
              aria-selected={index === active}
              onClick={() => select(index)}
            >
              <em>{String(index + 1).padStart(2, '0')}</em>
              {item.short}
            </button>
          ))}
        </div>

        <div className="orbital-panel">
          <AnimatePresence mode="wait">
            {pole && (
              <motion.div
                key={pole.id}
                className="orbital-panel-inner"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: easeOut }}
              >
                <p className="pole-index">{pole.short}</p>
                <h3>{pole.title}</h3>
                <p className="pole-summary">{pole.summary}</p>
                <p className="pole-body-text">{pole.body}</p>
                <Magnetic className="button button-xl cut" href={`${contactBase}?pole=${pole.id}`} strength={0.5}>
                  {cta}
                </Magnetic>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
