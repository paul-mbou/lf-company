import { useGSAP } from '@gsap/react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import type { Copy } from '../i18n/ui';
import Cursor from './awwwards/Cursor';
import HorizontalSolutions from './awwwards/HorizontalSolutions';
import OrbitalPoles from './awwwards/OrbitalPoles';
import Preloader from './awwwards/Preloader';
import SmoothScroll from './awwwards/SmoothScroll';
import ClipReveal from './motion/ClipReveal';
import DataOrbit from './motion/DataOrbit';
import KineticStrip from './motion/KineticStrip';
import Magnetic from './motion/Magnetic';
import MaskImage from './motion/MaskImage';
import MeshConstellation from './motion/MeshConstellation';
import Reveal from './motion/Reveal';
import SectionBridge from './motion/SectionBridge';
import Spotlight from './motion/Spotlight';
import TiltMedia from './motion/TiltMedia';
import { easeOut, usePrefersReduced } from './motion/usePrefersReduced';
import TechStack from './TechStack';

gsap.registerPlugin(ScrollTrigger);

export type Img = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
};

type Logo = { src: string; label: string };

type Props = {
  copy: Copy;
  contact: string;
  home: string;
  lms: string;
  images: {
    hero: Img;
    holo: Img;
    systems: Img;
    field: Img;
    training: Img;
    solutions: Img[];
  };
  logos: Logo[];
};

export default function HomeExperience({ copy: t, contact, home, lms, images, logos }: Props) {
  const reduced = usePrefersReduced();
  const [sceneReady, setSceneReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [sectionTone, setSectionTone] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSceneReady(true);
      setEntered(true);
    }, 420);
    return () => window.clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const { scrollYProgress: heroProgress } = useScroll({
    target: hero,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, reduced ? 1 : 0.35]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduced ? 1 : 1.04]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setSectionTone(Math.min(1, Math.max(0, (value - 0.15) * 1.4)));
  });

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>('.aww-rise').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 90, opacity: 0, rotateX: 22, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.aww-section').forEach((section) => {
        gsap.fromTo(
          section,
          { clipPath: 'inset(8% 4% 8% 4% round 0px)', opacity: 0.55 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'top 42%',
              scrub: 0.65,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.aww-stagger > *').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: el.parentElement, start: 'top 80%', once: true },
          },
        );
      });
    },
    { scope: root, dependencies: [reduced, entered] },
  );

  return (
    <div
      className="home-experience aww"
      ref={root}
      style={{ ['--tone' as string]: String(sectionTone) }}
    >
      <SmoothScroll />
      <Cursor />
      <Preloader ready={sceneReady || reduced} label={t.hero.place} />
      {!reduced && <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />}

      <section className="aww-hero" ref={hero}>
        <motion.div className="aww-hero-scene" style={{ scale: heroScale, opacity: heroOpacity }}>
          <img
            className="aww-hero-banner"
            src={images.hero.src}
            srcSet={images.hero.srcSet}
            alt=""
            width={images.hero.width}
            height={images.hero.height}
            aria-hidden="true"
          />
          <div className="aww-hero-banner-veil" aria-hidden="true" />
        </motion.div>

        <MeshConstellation className="hero-mesh" density={58} interactive shooting />

        <div className="aww-hero-ui wrap">
          <motion.div
            className="aww-hero-copy"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={entered || reduced ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, delay: 0.08, ease: easeOut }}
          >
            <p className="aww-kicker">
              <span className="aww-pulse" />
              LF Company · {t.hero.place}
            </p>
            <h1 className="display">
              <motion.span
                initial={reduced ? false : { opacity: 0, filter: 'blur(8px)' }}
                animate={entered || reduced ? { opacity: 1, filter: 'blur(0px)' } : undefined}
                transition={{ duration: 1.15, delay: 0.18, ease: easeOut }}
              >
                {t.hero.title}
              </motion.span>
            </h1>
            <p className="cinema-lede">{t.hero.lede}</p>
            <div className="cinema-actions">
              <Magnetic className="button button-xl cut" href={contact} strength={0.6}>
                {t.hero.primary}
              </Magnetic>
              <Magnetic className="button button-ghost-xl cut" href={`${home}#poles`} strength={0.38}>
                {t.hero.secondary}
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            className="aww-hero-float"
            initial={reduced ? false : { opacity: 0, x: 90, rotateY: -18 }}
            animate={entered || reduced ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
            transition={{ duration: 1.05, delay: 0.28, ease: easeOut }}
            data-cursor="hover"
          >
            <TiltMedia
              src={images.holo.src}
              srcSet={images.holo.srcSet}
              sizes="(min-width: 960px) 34vw, 80vw"
              alt={t.hero.photoAlt}
              width={images.holo.width}
              height={images.holo.height}
              priority
            />
            <div className="cinema-hud cut">
              <span className="hud-dot" />
              <span>{t.hero.hudLabel}</span>
              <strong>{t.hero.hudMeta}</strong>
            </div>
          </motion.div>
        </div>

        <div className="aww-scroll-hint" aria-hidden="true">
          <span />
          scroll
        </div>
        <KineticStrip items={t.poles.items.map((p) => p.title)} />
      </section>

      <SectionBridge label="01 · STACK" />
      <div className="aww-section">
        <MeshConstellation className="section-mesh" density={46} interactive shooting />
        <TechStack title={t.stack.title} intro={t.stack.intro} logos={logos} />
      </div>

      <SectionBridge label="02 · SIGNAL" />
      <div className="aww-section">
        <OrbitalPoles
          poles={t.poles.items}
          title={t.poles.title}
          intro={t.poles.intro}
          cta={t.poles.cta}
          contactBase={contact}
          label={t.poles.label}
        />
      </div>

      <SectionBridge label="03 · DEPLOY" />
      <div className="aww-section">
        <MeshConstellation className="section-mesh" density={50} interactive shooting />
        <HorizontalSolutions
          title={t.solutions.title}
          intro={t.solutions.intro}
          write={t.solutions.write}
          items={t.solutions.items}
          contactBase={contact}
          visuals={images.solutions}
        />
      </div>

      <SectionBridge label="04 · FIELD" />
      <section className="aww-split aww-section" id="approach">
        <MeshConstellation className="section-mesh" density={44} interactive shooting />
        <div className="aww-split-media">
          <MaskImage
            src={images.field.src}
            srcSet={images.field.srcSet}
            sizes="100vw"
            alt={t.approach.photoAlt}
            width={images.field.width}
            height={images.field.height}
          />
          <DataOrbit />
        </div>
        <div className="aww-split-copy wrap">
          <ClipReveal>
            <p className="place mono">04 · FIELD</p>
            <h2 className="display">{t.approach.title}</h2>
            <p className="lead">{t.approach.lead}</p>
          </ClipReveal>
          <ul className="reason-grid">
            {t.approach.items.map((item, i) => (
              <li key={item.title}>
                <Spotlight className="reason-tile aww-rise cut" data-cursor="hover">
                  <em className="mono">{String(i + 1).padStart(2, '0')}</em>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Spotlight>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionBridge label="05 · PULSE" />
      <section className="aww-news aww-section" id="news">
        <MeshConstellation className="section-mesh" density={42} interactive shooting />
        <div className="wrap">
          <ClipReveal>
            <p className="place mono">05 · PULSE</p>
            <h2 className="display">{t.news.title}</h2>
          </ClipReveal>
          <ul className="news-bento">
            {t.news.items.map((item, i) => (
              <li key={item.title}>
                <Spotlight className={`news-tile news-tile-${i + 1} aww-rise cut`} data-cursor="hover">
                  {i === 0 ? (
                    <img
                      className="news-tile-visual"
                      src={images.systems.src}
                      srcSet={images.systems.srcSet}
                      sizes="(min-width: 760px) 40vw, 90vw"
                      alt=""
                      width={images.systems.width}
                      height={images.systems.height}
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  ) : null}
                  {item.iso ? (
                    <time className="when mono" dateTime={item.iso}>
                      {item.when}
                    </time>
                  ) : (
                    <span className="when mono">{item.when}</span>
                  )}
                  <p className="news-kicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                </Spotlight>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionBridge label="06 · TRAIN" />
      <section className="aww-learn aww-section">
        <MeshConstellation className="section-mesh" density={48} interactive shooting />
        <div className="learn-spectacle-grid wrap">
          <div className="aww-rise learn-spectacle-copy">
            <p className="place mono">06 · TRAIN</p>
            <h2 className="display">{t.learn.title}</h2>
            <p>{t.learn.text}</p>
            <Magnetic className="button button-xl cut" href={lms} strength={0.48} target="_blank" rel="noopener noreferrer">
              {t.learn.cta}
              <span className="sr-only"> ({t.nav.learningNew})</span>
            </Magnetic>
          </div>
          <div className="aww-rise learn-spectacle-media">
            <TiltMedia
              src={images.training.src}
              srcSet={images.training.srcSet}
              sizes="(min-width: 960px) 48vw, 100vw"
              alt={t.learn.photoAlt}
              width={images.training.width}
              height={images.training.height}
            />
          </div>
        </div>
      </section>

      <SectionBridge label="NOW" />
      <section className="band band-spectacle aww-section">
        <MeshConstellation className="section-mesh" density={52} interactive shooting />
        <DataOrbit className="band-orbit" />
        <Reveal className="band-inner">
          <p className="place mono">NOW</p>
          <h2 className="display">{t.close.title}</h2>
          <p>{t.close.text}</p>
          <Magnetic className="button button-xl cut" href={contact} strength={0.55}>
            {t.close.cta}
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
