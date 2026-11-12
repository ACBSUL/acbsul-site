// Recebe os eventos do funil enviados pelo tracking.js (navegador) e repassa à
// Meta pela Conversions API, com o mesmo event_id do Pixel. Rota pública, no
// MESMO domínio do site (first-party): bloqueadores cortam menos e não há CORS.
//
// O evento Lead NÃO passa aqui: ele sai de /api/leads, no servidor, depois que
// o lead é salvo no banco — com e-mail e telefone — para não poder ser forjado.

import type { APIRoute } from 'astro';
import { enviarEventoMeta } from '../../lib/capi';

export const prerender = false;

const PERMITIDOS = new Set(['PageView', 'ViewContent', 'AddToWishlist', 'InitiateCheckout', 'Contact']);

const json = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

export const POST: APIRoute = async ({ request, url }) => {
  // só aceita chamadas do próprio site
  const origem = request.headers.get('origin');
  // na Vercel url.host é o host interno; o domínio que o visitante acessou vem em x-forwarded-host/host
  const hostSite = request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host;
  if (origem) {
    let hostOrigem = '';
    try { hostOrigem = new URL(origem).host; } catch {}
    if (hostOrigem !== hostSite && hostOrigem !== url.host) return json({ ok: false, erro: 'origem' }, 403);
  }

  let corpo: any;
  try {
    corpo = JSON.parse(await request.text());
  } catch {
    return json({ ok: false, erro: 'json-invalido' }, 400);
  }

  const nome = String(corpo?.event_name || '');
  if (!PERMITIDOS.has(nome)) return json({ ok: false, erro: 'evento-nao-permitido' }, 400);
  if (!corpo.event_id) return json({ ok: false, erro: 'event_id-obrigatorio' }, 400);

  const r = await enviarEventoMeta(
    {
      event_name: nome,
      event_id: String(corpo.event_id).slice(0, 80),
      event_time: corpo.event_time,
      event_source_url: String(corpo.event_source_url || '').slice(0, 1000),
      external_id: corpo.external_id ? String(corpo.external_id).slice(0, 80) : undefined,
      fbp: corpo.fbp ? String(corpo.fbp).slice(0, 200) : undefined,
      fbc: corpo.fbc ? String(corpo.fbc).slice(0, 500) : undefined,
      custom_data: typeof corpo.custom_data === 'object' && corpo.custom_data ? corpo.custom_data : {},
      utm: typeof corpo.utm === 'object' && corpo.utm ? corpo.utm : {},
    },
    request,
  );

  if (r.desligado) return json({ ok: false, desligado: true }, 200);
  return json({ ok: r.ok }, r.ok ? 200 : 502);
};
