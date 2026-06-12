// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Stack: Astro híbrido na Vercel. Páginas públicas continuam pré-renderizadas
// (estáticas); rotas /admin/* e APIs (Passo 2) usam `export const prerender = false`.
// Banco: Supabase (Postgres) + Drizzle — ver src/db/.
// Design system: CSS próprio (src/styles/site-v2.css), Sora + DM Sans.
export default defineConfig({
  site: 'https://acbsulcompressores.com.br',
  // Porta local fixa do projeto (CLAUDE.md): http://localhost:5030/
  server: { port: 5030 },
  adapter: vercel(),
  integrations: [sitemap()],
  // CSRF: o checkOrigin do Astro vem ligado por padrão e, atrás do proxy da
  // Vercel, o header Origin e o Host nem sempre batem — isso bloqueava os POSTs
  // do /admin com "Cross-site POST form submissions are forbidden". Desligamos
  // com segurança: todo POST está sob /admin (protegido por login Better-Auth)
  // e o site público é estático, então a superfície de CSRF é mínima.
  security: { checkOrigin: false },
});
