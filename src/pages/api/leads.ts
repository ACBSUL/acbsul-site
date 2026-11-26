// Recebe o formulário "Solicitar mais informações" (PDP). Salva o lead no banco
// e devolve a URL do WhatsApp da categoria com uma mensagem já montada com os
// dados informados. Rota pública (não passa pela proteção de /admin).

import type { APIRoute } from 'astro';
import { and, desc, eq, sql } from 'drizzle-orm';
import { db, tabelas } from '../../db';
import { carregarConfig } from '../../lib/config';
import { enviarEventoMeta } from '../../lib/capi';
import { motivoSpam, telefoneValido } from '../../lib/antispam';
import { avisarWhatsapp, type DadosAviso } from '../../lib/aviso-whatsapp';

export const prerender = false;

/** nome provisório de quem informou só o telefone no chat (a coluna é NOT NULL) */
const SEM_NOME = 'Não informado';

const limpar = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const emailValido = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function jsonResp(corpo: unknown, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let dados: Record<string, unknown> = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      dados = await request.json();
    } else {
      const f = await request.formData();
      dados = Object.fromEntries(f);
    }
  } catch {
    return jsonResp({ ok: false, erro: 'corpo-invalido' }, 400);
  }

  const nomeInformado = limpar(dados.nome, 120);
  const telefone = limpar(dados.telefone, 40);
  const email = limpar(dados.email, 160);
  const interesse = limpar(dados.interesse, 60) || null;
  const produto = limpar(dados.produto, 200) || null;
  const categoriaSlug = limpar(dados.categoria, 80) || null;
  const empresa = limpar(dados.empresa, 120) || null;
  // só 'contato-direto' é aceito como override; qualquer outro valor = 'produto'
  const origemBruta = limpar(dados.origem, 30);
  const origem =
    origemBruta === 'contato-direto' || origemBruta === 'chat-whatsapp' ? origemBruta : 'produto';
  // o chat de WhatsApp (wa-chat.js) grava o telefone assim que é informado: nome
  // vem depois e não há e-mail
  const ehChat = origem === 'chat-whatsapp';
  const nome = nomeInformado || (ehChat ? SEM_NOME : '');

  if (!nome || !telefone || (!ehChat && (!email || !emailValido(email)))) {
    return jsonResp({ ok: false, erro: 'dados-invalidos' }, 400);
  }

  // robô: não salva, não manda conversão (e não diz o motivo a quem enviou)
  const spam = motivoSpam(dados, nome);
  if (spam) {
    console.warn(`[leads] bloqueado como spam: ${spam}`);
    return jsonResp({ ok: false, erro: 'dados-invalidos' }, 400);
  }
  if (!telefoneValido(telefone)) {
    return jsonResp({ ok: false, erro: 'telefone-invalido' }, 400);
  }

  // rastreio de campanha (preenchido pelo tracking.js; tudo opcional)
  const r = (k: string, max = 300) => limpar(dados[k], max) || null;
  const rastreio = {
    fonte: r('fonte', 60),
    utmSource: r('utm_source'),
    utmMedium: r('utm_medium'),
    utmCampaign: r('utm_campaign'),
    utmContent: r('utm_content'),
    utmTerm: r('utm_term'),
    gclid: r('gclid', 500),
    gbraid: r('gbraid', 500),
    wbraid: r('wbraid', 500),
    fbclid: r('fbclid', 500),
    pagina: r('pagina', 1000),
    visitanteId: r('visitante_id', 80),
  };

  // aviso no WhatsApp da empresa: formulários sempre; no chat, uma vez só, quando
  // o wa-chat.js pede (no fim, ou quando a pessoa sai antes de terminar)
  const desistiu = ehChat && dados.etapa_chat === 'desistiu';
  const querAviso = !ehChat || Boolean(dados.avisar);
  const aviso = (extra: Partial<DadosAviso> = {}) =>
    avisarWhatsapp({
      origem, nome, telefone, email, empresa, produto, interesse,
      utmSource: rastreio.utmSource, gclid: rastreio.gclid, fbclid: rastreio.fbclid,
      desistiu, ...extra,
    });

  // 1) chat: telefone → nome → assunto chegam em envios separados e completam o
  // MESMO lead (mesmo visitante + telefone, nas últimas 2 h, ainda não concluído).
  if (ehChat && rastreio.visitanteId) {
    const t = tabelas.leads;
    const [anterior] = await db
      .select({ id: t.id, nome: t.nome, produto: t.produto, interesse: t.interesse })
      .from(t)
      .where(
        and(
          eq(t.origem, 'chat-whatsapp'),
          eq(t.visitanteId, rastreio.visitanteId),
          eq(t.telefone, telefone),
          sql`${t.criadoEm} > now() - interval '2 hours'`,
        ),
      )
      .orderBy(desc(t.id))
      .limit(1);

    if (anterior) {
      const aberto = anterior.interesse === 'Chat não concluído';
      // saiu antes de terminar: avisa com o que já foi informado, sem mexer no lead
      if (desistiu) {
        if (aberto && querAviso) await aviso({ nome: anterior.nome, produto: anterior.produto ?? produto });
        return jsonResp({ ok: true });
      }
      const parcial = dados.etapa_chat === 'parcial';
      const repetido = anterior.produto === produto && anterior.interesse === interesse;
      if (aberto) {
        await db
          .update(t)
          .set({
            nome: nomeInformado || anterior.nome,
            produto: produto ?? anterior.produto,
            interesse,
          })
          .where(eq(t.id, anterior.id));
        if (!parcial && querAviso) await aviso({ nome: nomeInformado || anterior.nome, produto: produto ?? anterior.produto });
      }
      // telefone já registrado (parcial) ou reenvio do mesmo pedido: nada a criar
      if (aberto || parcial || repetido) return jsonResp({ ok: true });
    }
  }

  // 1a) salva o lead
  await db.insert(tabelas.leads).values({
    origem,
    produto,
    categoriaSlug,
    nome,
    telefone,
    email,
    interesse,
    empresa,
    ...rastreio,
  });

  // aviso em paralelo (não atrasa o resto); esperado antes de responder
  const avisoEnviado = querAviso && !(ehChat && dados.etapa_chat === 'parcial') ? aviso() : Promise.resolve();

  // 1b) Lead na Meta pelo servidor (CAPI), com o MESMO event_id que o Pixel
  // usa no navegador. Leva e-mail/telefone/nome (hasheados no envio). Falha da
  // Meta não impede o lead: já está salvo e o WhatsApp abre do mesmo jeito.
  const eventId = r('event_id', 80);
  if (eventId) {
    await enviarEventoMeta(
      {
        event_name: 'Lead',
        event_id: eventId,
        event_source_url: rastreio.pagina ?? undefined,
        external_id: rastreio.visitanteId ?? undefined,
        fbp: r('fbp', 200) ?? undefined,
        fbc: r('fbc', 500) ?? undefined,
        em: email,
        ph: telefone,
        nome,
        custom_data: {
          content_name: produto || (origem === 'contato-direto' ? 'Contato direto (home)' : 'Formulário'),
          content_category: categoriaSlug || origem,
          fonte: rastreio.fonte || undefined,
          interesse: interesse || undefined,
        },
        utm: { utm_campaign: rastreio.utmCampaign, utm_content: rastreio.utmContent },
      },
      request,
    );
  }

  // 2) descobre o WhatsApp de destino: número da categoria → senão número geral
  let numero = '';
  let nomeCategoria = '';
  if (categoriaSlug) {
    const [cat] = await db
      .select()
      .from(tabelas.categorias)
      .where(eq(tabelas.categorias.slug, categoriaSlug))
      .limit(1);
    if (cat) {
      numero = (cat.whatsappNumero || '').replace(/\D/g, '');
      nomeCategoria = cat.nome;
    }
  }
  if (!numero) numero = (await carregarConfig()).whatsapp;

  // 3) monta a mensagem com os dados informados
  const abertura = produto
    ? `Olá! Tenho interesse no produto ${produto}${nomeCategoria ? ` (${nomeCategoria})` : ''}.`
    : origem === 'contato-direto'
      ? 'Olá! Vim pelo site (contato direto) e gostaria de mais informações.'
      : 'Olá! Gostaria de mais informações.';
  const linhas = [
    abertura,
    '',
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
  ];
  if (email) linhas.push(`E-mail: ${email}`);
  if (empresa) linhas.push(`Empresa: ${empresa}`);
  if (interesse) linhas.push(`Interesse: ${interesse}`);

  const whatsapp = `https://wa.me/${numero}?text=${encodeURIComponent(linhas.join('\n'))}`;

  await avisoEnviado;
  return jsonResp({ ok: true, whatsapp });
};
