// Recebe o formulário "Solicitar mais informações" (PDP). Salva o lead no banco
// e devolve a URL do WhatsApp da categoria com uma mensagem já montada com os
// dados informados. Rota pública (não passa pela proteção de /admin).

import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db, tabelas } from '../../db';
import { carregarConfig } from '../../lib/config';

export const prerender = false;

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

  const nome = limpar(dados.nome, 120);
  const telefone = limpar(dados.telefone, 40);
  const email = limpar(dados.email, 160);
  const interesse = limpar(dados.interesse, 60) || null;
  const produto = limpar(dados.produto, 200) || null;
  const categoriaSlug = limpar(dados.categoria, 80) || null;
  const empresa = limpar(dados.empresa, 120) || null;
  // só 'contato-direto' é aceito como override; qualquer outro valor = 'produto'
  const origem = limpar(dados.origem, 30) === 'contato-direto' ? 'contato-direto' : 'produto';

  if (!nome || !telefone || !email || !emailValido(email)) {
    return jsonResp({ ok: false, erro: 'dados-invalidos' }, 400);
  }

  // 1) salva o lead
  await db.insert(tabelas.leads).values({
    origem,
    produto,
    categoriaSlug,
    nome,
    telefone,
    email,
    interesse,
  });

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
    `E-mail: ${email}`,
  ];
  if (empresa) linhas.push(`Empresa: ${empresa}`);
  if (interesse) linhas.push(`Interesse: ${interesse}`);

  const whatsapp = `https://wa.me/${numero}?text=${encodeURIComponent(linhas.join('\n'))}`;

  return jsonResp({ ok: true, whatsapp });
};
