// Conversions API (CAPI) da Meta — envio pelo servidor, no próprio domínio do
// site (Vercel). Mesma lógica do Worker do projeto sapabap (Framework FOP),
// adaptada: aqui o site já tem servidor, então não há Worker na Cloudflare.
//
// Cada evento sai com o MESMO event_id que o Pixel usou no navegador; a Meta
// deduplica e conta uma vez só. Se o navegador for bloqueado (adblock, iOS),
// o servidor garante o evento.
//
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   META_PIXEL_ID         1167185732664219
//   META_CAPI_TOKEN       token do pixel (SECRET — nunca no repositório)
//   META_TEST_EVENT_CODE  código de teste do Gerenciador de Eventos (opcional;
//                         APAGAR depois do teste — enquanto existir, os eventos
//                         reais não contam)
//   META_GRAPH_VERSION    opcional, padrão v21.0

import { createHash } from 'node:crypto';

const env = (k: string): string | undefined =>
  (typeof import.meta !== 'undefined' && import.meta.env?.[k]) || process.env[k];

export const PIXEL_ID_PADRAO = '1167185732664219';

export interface EventoCapi {
  event_name: string;
  event_id: string;
  /** segundos (ms é corrigido) */
  event_time?: number;
  event_source_url?: string;
  /** id anônimo do visitante (cru — hasheado aqui) */
  external_id?: string;
  fbp?: string;
  fbc?: string;
  /** e-mail e telefone CRUS — hasheados aqui, nunca logados */
  em?: string;
  ph?: string;
  /** nome completo cru — vira fn/ln hasheados */
  nome?: string;
  custom_data?: Record<string, unknown>;
  utm?: Record<string, unknown>;
}

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

const normaliza = (v: unknown) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** só dígitos, com DDI. Número brasileiro sem DDI (10 ou 11 dígitos) ganha 55. */
export function normalizaTelefone(v: unknown): string {
  let d = String(v ?? '').replace(/\D/g, '');
  if (!d) return '';
  if ((d.length === 10 || d.length === 11) && !d.startsWith('55')) d = '55' + d;
  return d.length >= 8 ? d : '';
}

function fbclidDaUrl(url?: string): string {
  try {
    return new URL(String(url)).searchParams.get('fbclid') || '';
  } catch {
    return '';
  }
}

/** Monta o evento no formato da Graph API a partir do pedido do navegador. */
function montaEvento(e: EventoCapi, request: Request) {
  const h = request.headers;
  // IP real do visitante atrás do proxy da Vercel (1º da lista)
  const ip = (h.get('x-forwarded-for') || h.get('x-real-ip') || '').split(',')[0].trim();

  const user_data: Record<string, unknown> = {
    client_ip_address: ip || undefined,
    client_user_agent: h.get('user-agent') || undefined,
  };

  // fbp e fbc vão CRUS — nunca hasheados
  if (e.fbp) user_data.fbp = String(e.fbp);
  if (e.fbc) user_data.fbc = String(e.fbc);
  else {
    const fbclid = fbclidDaUrl(e.event_source_url);
    if (fbclid) user_data.fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  // external_id: hash do MESMO valor cru que o Pixel recebeu no init
  if (e.external_id) user_data.external_id = [sha256(normaliza(e.external_id))];

  const em = normaliza(e.em);
  if (em && em.includes('@')) user_data.em = [sha256(em)];
  const ph = normalizaTelefone(e.ph);
  if (ph) user_data.ph = [sha256(ph)];

  if (e.nome) {
    const partes = normaliza(e.nome).replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);
    if (partes[0]) user_data.fn = [sha256(partes[0])];
    if (partes.length > 1) user_data.ln = [sha256(partes[partes.length - 1])];
  }

  // geo pelo IP (headers da Vercel) — sinal extra de match, sem PII digitada
  const cidade = decodeURIComponent(h.get('x-vercel-ip-city') || '');
  const regiao = h.get('x-vercel-ip-country-region') || '';
  const cep = h.get('x-vercel-ip-postal-code') || '';
  const pais = h.get('x-vercel-ip-country') || '';
  if (cidade) user_data.ct = [sha256(normaliza(cidade).replace(/[^a-z]/g, ''))];
  if (regiao) user_data.st = [sha256(normaliza(regiao))];
  if (cep) user_data.zp = [sha256(cep.replace(/\D/g, ''))];
  if (pais) user_data.country = [sha256(normaliza(pais))];

  const custom: Record<string, unknown> = { ...(e.custom_data || {}) };
  const utm = e.utm || {};
  if (utm.utm_campaign && !custom.campanha) custom.campanha = String(utm.utm_campaign);
  if (utm.utm_content && !custom.anuncio) custom.anuncio = String(utm.utm_content);

  // event_time em segundos; ms é corrigido; fora da janela (7 dias) usa agora
  let t = Number(e.event_time) || 0;
  if (t > 1e12) t = Math.floor(t / 1000);
  const agora = Math.floor(Date.now() / 1000);
  if (!t || t > agora + 60 || t < agora - 7 * 86400) t = agora;

  return {
    event_name: e.event_name,
    event_id: String(e.event_id),
    event_time: t,
    event_source_url: String(e.event_source_url || ''),
    action_source: 'website',
    user_data,
    custom_data: custom,
  };
}

export interface RespostaCapi {
  ok: boolean;
  status?: number;
  meta?: unknown;
  /** CAPI desligado (sem token configurado) */
  desligado?: boolean;
}

/**
 * Envia um evento à Meta. Até 3 tentativas em erro de rede ou 5xx; 4xx não
 * repete (token, pixel ou payload errado). Nunca lança: o fluxo do site
 * (salvar lead, abrir WhatsApp) não pode depender da Meta.
 */
export async function enviarEventoMeta(e: EventoCapi, request: Request): Promise<RespostaCapi> {
  const token = env('META_CAPI_TOKEN');
  const pixel = env('META_PIXEL_ID') || PIXEL_ID_PADRAO;
  if (!token) return { ok: false, desligado: true };

  const versao = env('META_GRAPH_VERSION') || 'v21.0';
  const url = `https://graph.facebook.com/${versao}/${pixel}/events`;
  const carga: Record<string, unknown> = {
    data: [montaEvento(e, request)],
    access_token: token,
  };
  const teste = env('META_TEST_EVENT_CODE');
  if (teste) carga.test_event_code = teste;

  const esperas = [0, 800, 2000];
  for (let i = 0; i < esperas.length; i++) {
    if (esperas[i]) await new Promise((ok) => setTimeout(ok, esperas[i]));
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carga),
      });
      const meta = await r.json().catch(() => ({}));
      if (r.ok) return { ok: true, status: r.status, meta };
      const err = (meta as any)?.error || {};
      // log sem user_data (nunca PII)
      console.error(
        JSON.stringify({
          capi: 'erro-graph',
          tentativa: i,
          event_name: e.event_name,
          event_id: e.event_id,
          status: r.status,
          fbtrace_id: err.fbtrace_id || null,
          code: err.code || null,
          message: err.message || null,
        }),
      );
      if (r.status < 500) return { ok: false, status: r.status, meta };
    } catch (erro) {
      console.error(
        JSON.stringify({ capi: 'erro-rede', tentativa: i, event_name: e.event_name, message: String(erro) }),
      );
    }
  }
  return { ok: false };
}
