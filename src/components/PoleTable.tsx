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
};

export default function PoleTable({ poles, tabsLabel, cta, contactBase }: Props) {
  const [active, setActive] = useState(poles[0]?.id ?? '');
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = usePrefersReduced();
  const activePole = poles.find((pole) => pole.id === active) ?? poles[0];

  function focusIndex(index: number) {
    const next = (index + poles.length) % poles.length;
    setActive(poles[next].id);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = poles.findIndex((pole) => pole.id === active);
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
      <div className="pole-table pole-stage">
        <div className="pole-tabs" role="tablist" aria-label={tabsLabel} onKeyDown={onKeyDown}>
          {poles.map((pole, index) => {
            const selected = pole.id === active;
            return (
              <button
                key={pole.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`tab-${pole.id}`}
                type="button"
                role="tab"
                className="pole-tab"
                aria-selected={selected}
                aria-controls={`panel-${pole.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(pole.id)}
              >
                {pole.short}
                {selected && (
                  <motion.span
                    className="pole-tab-ink"
                    layoutId="pole-ink"
                    transition={reduced ? { duration: 0 } : springSnappy}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="pole-viewport">
          <AnimatePresence mode="wait">
            {activePole && (
              <motion.div
                key={activePole.id}
                id={`panel-${activePole.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activePole.id}`}
                className="pole-panel is-active"
                initial={
                  reduced
                    ? false
                    : { opacity: 0, y: 28, rotateX: 12, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: -18, rotateX: -8, scale: 0.98 }
                }
                transition={{ duration: reduced ? 0.15 : 0.55, ease: easeOut }}
                style={{ transformPerspective: 1200, transformOrigin: '50% 0%' }}
              >
                <div className="pole-copy">
                  <motion.p
                    className="pole-index"
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.4 }}
                  >
                    {activePole.short}
                  </motion.p>
                  <h3>{activePole.title}</h3>
                  <p className="pole-summary">{activePole.summary}</p>
                  <Magnetic
                    className="button"
                    href={`${contactBase}?pole=${activePole.id}`}
                    strength={0.28}
                  >
                    {cta}
                  </Magnetic>
                </div>
                <div className="pole-body">
                  <div className="pole-signal" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <p>{activePole.body}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keep all panels available for no-JS / crawlers via noscript is handled by Astro; here we keep a11y live region */}
        <div className="sr-only" aria-live="polite">
          {activePole?.title}
        </div>
      </div>
    </LayoutGroup>
  );
}
