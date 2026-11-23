// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { createHash } from 'node:crypto';

// Chave para pular o cache (ver isr abaixo), derivada do segredo de login.
const segredo = process.env.BETTER_AUTH_SECRET;
const tokenCache = segredo ? createHash('sha256').update(`isr-bypass:${segredo}`).digest('hex') : undefined;

// Stack: Astro híbrido na Vercel. As páginas de conteúdo (home, quem-somos,
// serviços, 404), o catálogo, as rotas /admin/* e as APIs usam SSR
// (`export const prerender = false`) para ler do banco a cada acesso.
// Banco: Supabase (Postgres) + Drizzle — ver src/db/.
// Design system: CSS próprio (src/styles/site-v2.css), Sora + DM Sans.
export default defineConfig({
  site: 'https://acbsulcompressores.com.br',
  // Porta local fixa do projeto (CLAUDE.md): http://localhost:5030/
  server: { port: 5030 },
  // Cache (ISR) das páginas públicas: a Vercel guarda o HTML pronto por 5 min e
  // serve do CDN, sem ir ao banco a cada clique (o servidor fica nos EUA e
  // levava 1–4,5 s para responder). Parâmetros de URL (gclid, utm) não quebram o
  // cache. Mudanças no /admin aparecem em até 5 min. /admin e /api ficam fora.
  // tokenCache: quem tem o cookie __prerender_bypass com esse valor vê a
  // página sem cache — o /admin/popup grava esse cookie para o "Ver como fica".
  adapter: vercel({
    isr: {
      expiration: 300,
      exclude: [/^\/admin/, /^\/api/],
      bypassToken: tokenCache,
    },
  }),
  integrations: [sitemap()],
  // CSRF: o checkOrigin do Astro vem ligado por padrão e, atrás do proxy da
  // Vercel, o header Origin e o Host nem sempre batem — isso bloqueava os POSTs
  // do /admin com "Cross-site POST form submissions are forbidden". Desligamos
  // com segurança: todo POST está sob /admin (protegido por login Better-Auth)
  // e as páginas públicas não têm POST, então a superfície de CSRF é mínima.
  security: { checkOrigin: false },
});
