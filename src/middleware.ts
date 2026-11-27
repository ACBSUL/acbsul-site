// Proteção do painel (PRD §8): toda rota /admin/* exige sessão válida,
// exceto a própria tela de login. Também aplica noindex via header
// (reforço do <meta> e do robots.txt).
//
// Além da sessão, checa PAPEL e PERMISSÃO (src/lib/usuarios.ts) — esta é a
// trava de verdade. Esconder o item no menu não protege nada: sem isto,
// bastaria digitar /admin/produtos na barra de endereços.

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

    if (sessao) {
      const { buscarUsuario, podeAcessar, primeiraSecao, secaoDaUrl } = await import('./lib/usuarios');
      const usuario = await buscarUsuario(sessao.user.id);

      // desativado (ou removido no meio da sessão): derruba o acesso na hora
      if (!usuario || !usuario.ativo) {
        await auth.api.signOut({ headers: context.request.headers }).catch(() => {});
        return context.redirect('/admin/login?erro=inativo');
      }
      if (ehLogin) return context.redirect('/admin');

      const secao = secaoDaUrl(pathname);
      if (secao && !podeAcessar(usuario, secao)) {
        const destino = primeiraSecao(usuario);
        // sem nenhuma seção liberada não há painel para mostrar
        if (!destino) {
          await auth.api.signOut({ headers: context.request.headers }).catch(() => {});
          return context.redirect('/admin/login?erro=sem-acesso');
        }
        return context.redirect(`${destino}?erro=sem-permissao`);
      }

      context.locals.user = usuario;
    } else {
      context.locals.user = null;
    }
  }

  const resposta = await next();

  if (ehAdmin || pathname.startsWith('/api/auth')) {
    resposta.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return resposta;
});
