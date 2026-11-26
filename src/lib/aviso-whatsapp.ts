// Aviso de novo lead no WhatsApp da empresa, pela Evolution API.
//
// Variáveis (Vercel → Settings → Environment Variables). Sem alguma delas o
// aviso fica desligado e o lead segue salvo normalmente:
//   EVOLUTION_URL         ex.: https://n8n-evolution-api.uzj3vo.easypanel.host
//   EVOLUTION_API_KEY     token da Evolution (segredo)
//   EVOLUTION_INSTANCIA   nome da instância conectada (ACBSUL)
//   AVISO_WHATSAPP_PARA   número que recebe os avisos, com 55 + DDD
//
// Uma mensagem por contato: no fim do chat (completa) ou, se a pessoa desistir,
// só com o que ela informou (o telefone já basta). Falha no envio só vira log.

const env = (k: string): string | undefined =>
  (typeof import.meta !== 'undefined' && import.meta.env?.[k]) || process.env[k];

export interface DadosAviso {
  origem: string;
  nome?: string | null;
  telefone: string;
  email?: string | null;
  empresa?: string | null;
  produto?: string | null;
  interesse?: string | null;
  utmSource?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  /** chat: a pessoa saiu antes de terminar */
  desistiu?: boolean;
}

function formatarTelefone(t: string): string {
  let n = t.replace(/\D/g, '');
  if ((n.length === 12 || n.length === 13) && n.startsWith('55')) n = n.slice(2);
  if (n.length === 11 && n.startsWith('0')) n = n.slice(1);
  if (n.length === 11) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  if (n.length === 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return t;
}

function deOnde(d: DadosAviso): string {
  if (d.gclid || d.utmSource === 'google') return 'Anúncio do Google';
  if (d.fbclid || /facebook|instagram|meta/i.test(d.utmSource || '')) return 'Anúncio da Meta';
  return 'Site';
}

export function montarAviso(d: DadosAviso): string {
  const formulario =
    d.origem === 'chat-whatsapp' ? 'Chat do site' : d.origem === 'contato-direto' ? 'Contato da home' : 'Formulário de produto';
  const nome = d.nome && d.nome !== 'Não informado' ? d.nome : '';
  const assunto = d.produto || (d.interesse && d.interesse !== 'Chat não concluído' ? d.interesse : '');
  const linhas = [
    d.desistiu ? '⚠️ *Contato pelo site (não terminou o chat)*' : '🔔 *Novo contato pelo site*',
    '',
    `📱 ${formatarTelefone(d.telefone)}`,
  ];
  if (nome) linhas.push(`👤 ${nome}`);
  if (d.empresa) linhas.push(`🏢 ${d.empresa}`);
  if (d.email) linhas.push(`✉️ ${d.email}`);
  if (assunto) linhas.push(`📌 ${assunto}`);
  linhas.push(`📍 ${formulario} · ${deOnde(d)}`);
  if (d.desistiu) linhas.push('', 'A pessoa saiu antes de enviar a mensagem. Vale chamar.');
  linhas.push('', 'Painel: https://www.acbsulcompressores.com.br/admin/leads');
  return linhas.join('\n');
}

export async function avisarWhatsapp(d: DadosAviso): Promise<void> {
  const url = env('EVOLUTION_URL')?.replace(/\/+$/, '');
  const chave = env('EVOLUTION_API_KEY');
  const instancia = env('EVOLUTION_INSTANCIA');
  const para = env('AVISO_WHATSAPP_PARA')?.replace(/\D/g, '');
  if (!url || !chave || !instancia || !para) return;
  try {
    const r = await fetch(`${url}/message/sendText/${encodeURIComponent(instancia)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: chave },
      body: JSON.stringify({ number: para, text: montarAviso(d) }),
      signal: AbortSignal.timeout(6000),
    });
    if (!r.ok) console.warn(`[aviso-whatsapp] HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
  } catch (e) {
    console.warn('[aviso-whatsapp] falhou:', (e as Error).message);
  }
}
