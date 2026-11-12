import { useEffect, useRef } from 'react';
import { usePrefersReduced } from './usePrefersReduced';

type Node = { x: number; y: number; r: number; vx: number; vy: number; pulse: number };

export default function DataOrbit({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReduced();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let nodes: Node[] = [];
    const links: Array<[number, number]> = [];

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(18, Math.floor((w * h) / 38000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.2 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        pulse: Math.random() * Math.PI * 2,
      }));
      links.length = 0;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 160) {
            links.push([i, j]);
          }
        }
      }
    }

    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const green = dark ? '125, 217, 50' : '103, 207, 24';
    const blue = dark ? '126, 200, 234' : '10, 98, 134';

    function draw() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      ctx!.clearRect(0, 0, w, h);

      if (!reduced) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
          node.pulse += 0.03;
        }
      }

      ctx!.lineWidth = 1;
      for (const [a, b] of links) {
        const na = nodes[a];
        const nb = nodes[b];
        if (!na || !nb) continue;
        const dist = Math.hypot(na.x - nb.x, na.y - nb.y);
        if (dist > 170) continue;
        const alpha = Math.max(0.05, 0.28 - dist / 700);
        ctx!.strokeStyle = `rgba(${blue}, ${alpha})`;
        ctx!.beginPath();
        ctx!.moveTo(na.x, na.y);
        ctx!.lineTo(nb.x, nb.y);
        ctx!.stroke();
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const glow = 0.45 + Math.sin(node.pulse) * 0.25;
        ctx!.fillStyle = i % 3 === 0 ? `rgb(${green})` : `rgb(${blue})`;
        ctx!.globalAlpha = glow;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      frame += 1;
      if (!reduced || frame < 2) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={`data-orbit ${className}`} aria-hidden="true" />;
}
