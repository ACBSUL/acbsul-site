// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Stack: Astro (híbrido). A Home é estática (SSG). Catálogo/admin (Passo 2)
// migrarão para output: 'server' + adapter quando entrarem em cena.
// Design system: CSS próprio (src/styles/site-v2.css), Sora + DM Sans.
export default defineConfig({
  site: 'https://acbsulcompressores.com.br',
  integrations: [sitemap()],
});
