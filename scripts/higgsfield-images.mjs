#!/usr/bin/env node
/**
 * Generate LF Company tech illustrations via Higgsfield Recraft V4.1 Pro.
 *
 * Required env:
 *   HF_API_KEY_ID
 *   HF_API_KEY_SECRET
 * or a single HF_CREDENTIALS="id:secret"
 *
 * Usage:
 *   node scripts/higgsfield-images.mjs
 */

import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../src/assets/higgsfield');

const credentials =
  process.env.HF_CREDENTIALS ||
  (process.env.HF_API_KEY_ID && process.env.HF_API_KEY_SECRET
    ? `${process.env.HF_API_KEY_ID}:${process.env.HF_API_KEY_SECRET}`
    : '');

if (!credentials || !credentials.includes(':')) {
  console.error(
    'Missing Higgsfield credentials.\nSet HF_API_KEY_ID + HF_API_KEY_SECRET, or HF_CREDENTIALS="id:secret".',
  );
  process.exit(1);
}

const SIGNAL = { rgb: [103, 207, 24] };
const DATA = { rgb: [20, 156, 212] };
const INK = { rgb: [18, 23, 30] };
const PAPER = { rgb: [231, 235, 240] };
const NIGHT = { rgb: [11, 16, 22] };

/** Clear, illustrative, ultra-tech — no muddy photoreal stock. */
const jobs = [
  {
    file: 'hero-holo-field.png',
    aspect_ratio: '16:9',
    background_color: NIGHT,
    colors: [SIGNAL, DATA, INK],
    prompt:
      'Ultra-clear vector-tech illustration of a digital mission-control field for a French B2B company LF Company. Crisp isometric holographic panels, sharp Power BI style charts, signal lime green #67CF18 and data cyan #149CD4 filaments, cool charcoal night glass background #0B1016, clean edges, high contrast, no blur, no photoreal people, no purple, no neon overload, premium Awwwards tech illustration, readable at large and small sizes',
  },
  {
    file: 'hero-ops.png',
    aspect_ratio: '4:3',
    background_color: NIGHT,
    colors: [SIGNAL, DATA, PAPER],
    prompt:
      'Crystal-clear tech illustration of an operations workstation: ultrawide monitor with sharp dashboard UI, floating translucent KPI cards, lime green accent lines, cyan data links, dark glass desk, isometric + UI hybrid style, ultra sharp, high clarity, no faces, no logos text, no purple, editorial tech poster quality',
  },
  {
    file: 'iso-systems.png',
    aspect_ratio: '4:3',
    background_color: PAPER,
    colors: [SIGNAL, DATA, INK],
    prompt:
      'Ultra-clean isometric systems map illustration on cool paper #E7EBF0: mobile CRM phone, ERP cylinder, Power BI charts, cloud node, security shield, connected by thin lime and cyan wires, precise engineering drawing, flat lighting, razor sharp edges, no photorealism, no purple, brand tech diagram for LF Company',
  },
  {
    file: 'field-tablet.png',
    aspect_ratio: '4:3',
    background_color: PAPER,
    colors: [SIGNAL, DATA, INK],
    prompt:
      'Clear illustrative tech scene: rugged tablet in a warehouse aisle showing a sharp sales reporting UI with green charts, soft daylight, crisp product illustration style mixed with UI mock, high clarity, no muddy blur, no purple neon, professional field-tech aesthetic',
  },
  {
    file: 'training-tech.png',
    aspect_ratio: '4:3',
    background_color: PAPER,
    colors: [SIGNAL, DATA, INK],
    prompt:
      'Clear tech illustration of a modern e-learning room: large interactive touch screen with course modules UI in lime green and cyan, laptops on desks, bright airy interior, sharp vector-realism hybrid, high contrast, no purple, no blurry stock photo look, premium SaaS training visual',
  },
];

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function submit(job) {
  const res = await fetch('https://api.higgsfield.ai/recraft/v4.1/pro/text-to-image', {
    method: 'POST',
    headers: {
      Authorization: `Key ${credentials}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': randomUUID(),
    },
    body: JSON.stringify({
      prompt: job.prompt,
      resolution: '2k',
      aspect_ratio: job.aspect_ratio,
      output_format: 'png',
      colors: job.colors,
      background_color: job.background_color,
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Submit failed ${res.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

async function poll(statusUrl) {
  for (let i = 0; i < 90; i += 1) {
    const res = await fetch(statusUrl, {
      headers: { Authorization: `Key ${credentials}` },
    });
    const body = await res.json();
    if (body.status === 'completed') return body;
    if (['failed', 'nsfw', 'canceled'].includes(body.status)) {
      throw new Error(`Generation ${body.status}: ${JSON.stringify(body)}`);
    }
    await sleep(2500);
  }
  throw new Error('Timed out waiting for Higgsfield');
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status} for ${file}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(outDir, file), buf);
  console.log(`✓ ${file} (${Math.round(buf.length / 1024)} KB)`);
}

await mkdir(outDir, { recursive: true });
console.log(`Generating ${jobs.length} Recraft Pro images via Higgsfield…`);

for (const job of jobs) {
  process.stdout.write(`→ ${job.file} … `);
  const queued = await submit(job);
  const done = await poll(queued.status_url);
  const url = done.images?.[0]?.url;
  if (!url) throw new Error(`No image URL for ${job.file}`);
  await download(url, job.file);
}

console.log(`Done. Files in ${outDir}`);
