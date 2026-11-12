# LF Company

Site vitrine bilingue (FR/EN) pour **LF Company** — data, apps, systèmes, web et formation, depuis Levallois-Perret.

**Live:** [lf-company-five.vercel.app](https://lf-company-five.vercel.app)

![LF Company — social preview](docs/portfolio/00-og-card.jpg)

## Portfolio

### Hero

![Hero — La donnée au service du terrain](docs/portfolio/01-hero.jpg)

### Cinq pôles (orbite interactive)

![Section pôles — orbitale](docs/portfolio/02-poles.jpg)

### Solutions

![Cartes solutions](docs/portfolio/03-solutions.jpg)

### Contact (mode clair)

![Page contact](docs/portfolio/04-contact.jpg)

## Stack

- [Astro](https://astro.build) (static) + React islands
- GSAP / Framer Motion
- Three.js (orb hero)
- Design system custom (mesh, cut corners, dark/light)

## Local

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   # React islands + Astro pieces
  layouts/      # Base (OG / i18n)
  pages/        # / et /en + contact
  styles/       # global + awwwards
  assets/       # illustrations 3D
docs/portfolio/ # captures pour showcase
```

## Notes

- i18n FR/EN via `src/i18n/ui.ts`
- Open Graph + Twitter cards (`public/og.jpg`)
- Déployé sur Vercel (`output: static`)
