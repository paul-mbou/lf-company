# Design System — LF Company

## Intent

LF Company is a digital practice in Levallois-Perret. Five métiers — data, mobile, systems, web, training — serve companies that need the operation to become readable. The visitor’s job is to recognise their situation and start a precise conversation.

The site should feel like an **Awwwards mission control**: photographic hero banner (ops field), WebGL accent layer, custom cursor + trail, Lenis scroll, scramble type, orbital pole dial, horizontal deploy track — spectacular and interactive, still LF green/blue (no purple neon club).

Signature shapes are **cut corners / diamond pulses / hex cores** — angular like the LF mark, not soft SaaS pills.

Signature interaction: one pole at a time on an **orbital dial** you can drag. Selecting a pole is the ritual; writing from that pole finishes the job.

## Typography

- Body / UI: Schibsted Grotesk (self-hosted), 400 / 500 / 600
- Display: Space Grotesk 500–700 for H1/H2 and major indices
- Meta / HUD / kickers: JetBrains Mono
- Scale: hero `clamp(3.2rem, 9vw, 7rem)`, section `clamp(2.4rem, 6vw, 4.6rem)`, body `1.0625rem` / 1.6
- Headlines use `text-wrap: balance`

## Spacing and shapes

- 8px grid
- Header height 68px
- Section rhythm about 96px
- Default interactive surface: **cut polygon** via `--cut` / `--radius-cut: 14px` (not rounded cards)
- Orbital core: hexagon; pulses: diamond; media frames: cut corners with green/blue edge light

## Color roles (semantic, locked)

Same hue family as the live brand: signal green `#67CF18`, data blue `#149CD4`, cool ink. Stage tokens live under `.aww` (`--aww-signal`, `--aww-data`, `--aww-void`). No purple, no cream/terracotta, no rainbow borders.

| Role | Light | Dark / Aww stage | Notes |
|------|-------|------------------|-------|
| bg | `#E7EBF0` | `#05080D` / `#070B11` | Cool paper / void |
| surface | `#F4F6F8` | `#101820` | Quiet zones / panels |
| elevated | `#FFFFFF` | glass `rgba(12,18,26,.78)` | Decks |
| text-primary | `#12171E` | `#E8EDF2` | |
| text-secondary | `#3E4854` | `rgba(232,237,242,.68)` | |
| primary | `#67CF18` | `#67CF18` | Signal |
| accent / data | `#0A6286` | `#149CD4` | Filaments, links |
| glow | soft green/blue only | soft green/blue only | Controlled, low saturation overlays |

## Motion

- Library: Framer Motion + GSAP + Lenis + R3F accent
- Durations: 220ms controls, 480–700ms stage change, 900–1200ms hero entrance
- Moments:
  1. Hero: ops banner parallax + scanlines + WebGL screen blend + scramble title + magnetic CTAs
  2. Cursor: diamond trail + cut ring + crosshair on hover
  3. Poles: orbital dial drag + panel swap
  4. Solutions: horizontal scrub track + hover lift
  5. Field: mask wipe images + spotlight tiles + clip reveals
- `prefers-reduced-motion: reduce` collapses to opacity fades and static layouts

## Components

- Header: brand left, text nav, EN/FR, theme, green write. Sticky with light blur
- Buttons: primary green with ink text; ghost outline; cut corners; magnetic on primary CTAs
- Orbital dial: drag / click poles; hex core
- Form: honest mailto, validation on submit / blur-with-value
- Theme: light by default outside home stage; home stage is night mission control

## Anti-patterns

- Purple/indigo AI gradients, cream+terracotta serif kitsch, acid-only cyber black
- Soft pill radius everywhere; floating badge stickers on the hero
- Fake metrics / KPI strips competing with the brand in the first viewport
- Rainbow card borders, emoji icons, equal five-card hero grids
- Video backgrounds

## References

- Awwwards MCP (`awwwards` via `npx -y awwwards-mcp`) for award-site DNA, motion census, and visual references
