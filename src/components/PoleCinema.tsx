import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Magnetic from './motion/Magnetic';
import { easeOut, springSnappy, usePrefersReduced } from './motion/usePrefersReduced';

export type PoleItem = {
  id: string;
  short: string;
  title: string;
  summary: string;
  body: string;
};

type Props = {
  poles: PoleItem[];
  tabsLabel: string;
  cta: string;
  contactBase: string;
  title: string;
  intro: string;
};

export default function PoleCinema({ poles, tabsLabel, cta, contactBase, title, intro }: Props) {
  const [active, setActive] = useState(poles[0]?.id ?? '');
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = usePrefersReduced();
  const index = Math.max(0, poles.findIndex((pole) => pole.id === active));
  const activePole = poles[index] ?? poles[0];

  function focusIndex(nextIndex: number) {
    const next = (nextIndex + poles.length) % poles.length;
    setActive(poles[next].id);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      focusIndex(index + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusIndex(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusIndex(poles.length - 1);
    }
  }

  return (
    <LayoutGroup>
      <section className="pole-cinema" id="poles">
        <div className="pole-cinema-head wrap">
          <p className="place">{String(index + 1).padStart(2, '0')} / {String(poles.length).padStart(2, '0')}</p>
          <h2>{title}</h2>
          <p className="section-intro">{intro}</p>
        </div>

        <div className="pole-cinema-shell">
          <div className="pole-rail" role="tablist" aria-label={tabsLabel} onKeyDown={onKeyDown}>
            {poles.map((pole, i) => {
              const selected = pole.id === active;
              return (
                <button
                  key={pole.id}
                  ref={(node) => {
                    tabs.current[i] = node;
                  }}
                  id={`tab-${pole.id}`}
                  type="button"
                  role="tab"
                  className="pole-rail-btn"
                  aria-selected={selected}
                  aria-controls={`panel-${pole.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(pole.id)}
                >
                  <span className="pole-rail-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pole-rail-label">{pole.short}</span>
                  {selected && (
                    <motion.span
                      className="pole-rail-glow"
                      layoutId="rail-glow"
                      transition={reduced ? { duration: 0 } : springSnappy}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pole-screen">
            <AnimatePresence mode="wait">
              {activePole && (
                <motion.div
                  key={activePole.id}
                  id={`panel-${activePole.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activePole.id}`}
                  className="pole-screen-panel"
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, x: 80, rotateY: -18, scale: 0.94 }
                  }
                  animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: -60, rotateY: 14, scale: 0.96 }}
                  transition={{ duration: reduced ? 0.15 : 0.55, ease: easeOut }}
                  style={{ transformPerspective: 1400, transformOrigin: 'left center' }}
                >
                  <div className="pole-screen-beam" aria-hidden="true" />
                  <p className="pole-index">{activePole.short}</p>
                  <h3>{activePole.title}</h3>
                  <p className="pole-summary">{activePole.summary}</p>
                  <p className="pole-body-text">{activePole.body}</p>
                  <Magnetic className="button button-xl" href={`${contactBase}?pole=${activePole.id}`} strength={0.42}>
                    {cta}
                  </Magnetic>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="sr-only" aria-live="polite">
          {activePole?.title}
        </div>
      </section>
    </LayoutGroup>
  );
}
