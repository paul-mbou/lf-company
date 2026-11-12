import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = {
  ready: boolean;
  label: string;
};

export default function Preloader({ ready, label }: Props) {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const value = useRef(0);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    let frame = 0;
    let exitTimer = 0;
    const tick = () => {
      const target = readyRef.current ? 100 : 90;
      const step = readyRef.current ? 5.5 : 1.4 + Math.random() * 0.8;
      value.current = Math.min(target, value.current + step);
      setProgress(Math.floor(value.current));
      if (value.current < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => setGone(true), 380);
      }
    };
    frame = requestAnimationFrame(tick);

    const hardExit = window.setTimeout(() => {
      value.current = 100;
      setProgress(100);
      setGone(true);
    }, 4500);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hardExit);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    readyRef.current = true;
  }, [ready]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="aww-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(18px)', y: -24 }}
          transition={{ duration: 0.75, ease: [0.22, 0.7, 0.2, 1] }}
        >
          <div className="aww-loader-mark">LF</div>
          <p className="aww-loader-label">{label}</p>
          <div className="aww-loader-bar">
            <motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }} />
          </div>
          <div className="aww-loader-count">{String(progress).padStart(3, '0')}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
