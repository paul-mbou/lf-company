import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  '';

export default defineConfig({
  site: vercelHost ? `https://${vercelHost}` : 'https://www.lf-company.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
});
