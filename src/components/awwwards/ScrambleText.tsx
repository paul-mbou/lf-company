import { useEffect, useState } from 'react';
import { usePrefersReduced } from '../motion/usePrefersReduced';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Props = {
  text: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'p';
  trigger?: boolean;
};

export default function ScrambleText({ text, className = '', as = 'span', trigger = true }: Props) {
  const reduced = usePrefersReduced();
  const [out, setOut] = useState(() => text.split(''));
  const Tag = as;

  useEffect(() => {
    if (reduced || !trigger) {
      setOut(text.split(''));
      return;
    }

    const chars = text.split('');
    setOut(chars.map((char) => (char === ' ' || char === '.' || char === '’' || char === "'" ? char : GLYPHS[0])));

    let iteration = 0;
    const id = window.setInterval(() => {
      setOut(
        chars.map((char, index) => {
          if (char === ' ' || char === '.' || char === '’' || char === "'") return char;
          if (index < iteration) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }),
      );
      iteration += 0.35;
      if (iteration >= chars.length) {
        setOut(chars);
        window.clearInterval(id);
      }
    }, 48);

    return () => window.clearInterval(id);
  }, [text, reduced, trigger]);

  return (
    <Tag className={`scramble ${className}`.trim()} aria-label={text}>
      {text.split('').map((char, index) => (
        <span
          key={`${index}-${char}`}
          className={`scramble-slot${char === ' ' ? ' is-space' : ''}`}
          aria-hidden="true"
        >
          <span className="scramble-glyph">{out[index] ?? char}</span>
          <span className="scramble-measure">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))}
    </Tag>
  );
}
