import { useEffect, useRef } from 'react';
import { usePrefersReduced } from './usePrefersReduced';

type Props = {
  className?: string;
  density?: number;
  interactive?: boolean;
  shooting?: boolean;
  tone?: 'dark' | 'light';
};

type Star = { x: number; y: number; vx: number; vy: number; r: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

export default function MeshConstellation({
  className = '',
  density = 46,
  interactive = true,
  shooting = true,
  tone = 'dark',
}: Props) {
  const reduced = usePrefersReduced();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const green = tone === 'dark' ? '103, 207, 24' : '88, 184, 20';
    const blue = tone === 'dark' ? '20, 156, 212' : '10, 98, 134';

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.5,
      }));
    }

    function spawnMeteor() {
      if (!shooting || Math.random() > 0.018) return;
      const fromTop = Math.random() > 0.5;
      meteors.push({
        x: fromTop ? Math.random() * width : -20,
        y: fromTop ? -12 : Math.random() * height * 0.55,
        vx: 3.2 + Math.random() * 2.4,
        vy: 1.4 + Math.random() * 1.6,
        life: 1,
      });
    }

    function draw() {
      if (!visible) {
        raf = 0;
        return;
      }

      ctx!.clearRect(0, 0, width, height);
      spawnMeteor();

      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        if (interactive && pointer.active) {
          const dx = pointer.x - star.x;
          const dy = pointer.y - star.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            star.x -= dx * 0.01;
            star.y -= dy * 0.01;
          }
        }
      }

      const linkDist = Math.min(140, width * 0.18);
      for (let i = 0; i < stars.length; i += 1) {
        for (let j = i + 1; j < stars.length; j += 1) {
          const a = stars[i];
          const b = stars[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > linkDist) continue;
          const alpha = (1 - dist / linkDist) * 0.35;
          ctx!.strokeStyle = `rgba(${i % 2 === 0 ? green : blue}, ${alpha})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }

        if (interactive && pointer.active) {
          const dist = Math.hypot(pointer.x - stars[i].x, pointer.y - stars[i].y);
          if (dist < 150) {
            ctx!.strokeStyle = `rgba(${green}, ${(1 - dist / 150) * 0.45})`;
            ctx!.beginPath();
            ctx!.moveTo(stars[i].x, stars[i].y);
            ctx!.lineTo(pointer.x, pointer.y);
            ctx!.stroke();
          }
        }
      }

      for (const star of stars) {
        ctx!.fillStyle = `rgba(${green}, 0.85)`;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      meteors = meteors.filter((m) => m.life > 0.05);
      for (const meteor of meteors) {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life *= 0.965;
        const grad = ctx!.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.vx * 8, meteor.y - meteor.vy * 8);
        grad.addColorStop(0, `rgba(${blue}, ${meteor.life})`);
        grad.addColorStop(1, `rgba(${green}, 0)`);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6;
        ctx!.beginPath();
        ctx!.moveTo(meteor.x, meteor.y);
        ctx!.lineTo(meteor.x - meteor.vx * 8, meteor.y - meteor.vy * 8);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    function kick() {
      if (!visible || raf) return;
      raf = requestAnimationFrame(draw);
    }

    function onMove(event: PointerEvent) {
      if (!interactive) return;
      const rect = canvas!.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function onLeave() {
      pointer.active = false;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '12% 0px' },
    );
    io.observe(parent);
    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, [density, interactive, reduced, shooting, tone]);

  if (reduced) return null;

  return <canvas className={`mesh-constellation ${className}`.trim()} ref={canvasRef} aria-hidden="true" />;
}
