// Proteção do painel (PRD §8): toda rota /admin/* exige sessão válida,
// exceto a própria tela de login. Também aplica noindex via header
// (reforço do <meta> e do robots.txt).

import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const ehAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  const ehLogin = pathname === '/admin/login' || pathname === '/admin/login/';

  if (ehAdmin) {
    // import dinâmico: o módulo de auth (e o banco) só carrega em rotas admin
    const { auth } = await import('./lib/auth');
    const sessao = await auth.api.getSession({
      headers: context.request.headers,
    });

    if (!sessao && !ehLogin) {
      return context.redirect('/admin/login');
    }
    if (sessao && ehLogin) {
      return context.redirect('/admin');
    }
    context.locals.user = sessao?.user ?? null;
  }

  const resposta = await next();

  if (ehAdmin || pathname.startsWith('/api/auth')) {
    resposta.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return resposta;
});
