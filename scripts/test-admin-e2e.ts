// Teste e2e do admin (Etapa C) contra o dev server em localhost:5030.
// Uso: npx tsx scripts/test-admin-e2e.ts
// Exercita: login, edição de categoria (WhatsApp por categoria) refletindo no
// site público, criação/publicação de produto, upload de imagem e exclusão.

import 'dotenv/config';
import { readFileSync } from 'node:fs';

const BASE = 'http://localhost:5030';
const EMAIL = 'adm@acbsulcompressores.com.br';
const SENHA = 'AcbSul#Admin2026';

let cookie = '';
let falhas = 0;

function ok(nome: string, cond: boolean, extra = '') {
  console.log(`${cond ? '✔' : '✖'} ${nome}${extra ? ` — ${extra}` : ''}`);
  if (!cond) falhas++;
}

async function req(caminho: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${caminho}`, {
    ...init,
    redirect: 'manual',
    headers: {
      // Origin correto: o Better-Auth valida origem (CSRF) em POSTs
      Origin: BASE,
      ...(init.headers ?? {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
  });
  return res;
}

function form(d: Record<string, string>) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(d).toString(),
  };
}

/* 1. login */
const login = await fetch(`${BASE}/api/auth/sign-in/email`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: BASE },
  body: JSON.stringify({ email: EMAIL, password: SENHA }),
});
cookie = login.headers
  .getSetCookie()
  .map((c) => c.split(';')[0])
  .join('; ');
ok('login', login.ok && cookie.length > 0);

/* 2. listas do admin */
ok('GET /admin/categorias', (await req('/admin/categorias')).status === 200);
ok('GET /admin/produtos', (await req('/admin/produtos')).status === 200);

/* 3. categoria 1: setar WhatsApp e ver refletir no site público */
const catForm = {
  nome: 'Compressores Elétricos',
  nomeCurto: 'Elétricos',
  icone: 'compressores-eletricos',
  ordem: '1',
  introducao:
    'Compressores de parafuso elétricos Atlas Copco das linhas GA e GX para ar comprimido contínuo na indústria. Venda com dimensionamento técnico, peças originais e assistência no RS e SC.',
  seoTitle: '',
  seoDescription: '',
  whatsappMensagem: '',
  ativa: 'on',
};
const r3 = await req('/admin/categorias/1', form({ ...catForm, whatsappNumero: '5551888887777' }));
ok('POST categoria (whatsapp)', r3.status === 302);

const pub = await (await req('/produtos')).text();
ok('site público com data-wa-num da categoria', pub.includes('data-wa-num="5551888887777"'));

// restaurar (sem número específico)
await req('/admin/categorias/1', form({ ...catForm, whatsappNumero: '' }));
const pub2 = await (await req('/produtos')).text();
ok('whatsapp da categoria restaurado', !pub2.includes('data-wa-num'));

/* 4. criar produto de teste */
const r4 = await req(
  '/admin/produtos/novo',
  form({
    codigo: 'TESTE-X1',
    etiqueta: 'E2E',
    tipo: 'Compressor de Teste',
    categoriaId: '1',
    specsChips: 'chip um, chip dois',
    slug: '',
  }),
);
const urlEdicao = r4.headers.get('location') ?? '';
const idNovo = urlEdicao.match(/\/admin\/produtos\/(\d+)/)?.[1];
ok('criar produto', r4.status === 302 && Boolean(idNovo), `id=${idNovo}`);

/* 5. completar conteúdo + publicar → página própria no site */
const r5 = await req(
  `/admin/produtos/${idNovo}`,
  form({
    _acao: 'salvar',
    codigo: 'TESTE-X1',
    etiqueta: 'E2E',
    tipo: 'Compressor de Teste',
    categoriaId: '1',
    marca: '',
    nome: '',
    slug: 'teste-x1',
    specsChips: 'chip um, chip dois',
    publicado: 'on',
    pitch: 'Pitch de teste do produto E2E.',
    descricao:
      '<b>O TESTE-X1 é um produto de teste e2e.</b> Primeiro parágrafo.\n\nSegundo parágrafo da descrição.',
    especificacoes: 'Potência | 99 kW\nPressão | 7 bar',
    seoTitle: '',
    seoDescription: '',
  }),
);
ok('salvar produto completo', r5.status === 302);

const pdp = await req('/produtos/compressores-eletricos/teste-x1');
const pdpHtml = await pdp.text();
ok(
  'PDP pública no HTML servido',
  pdp.status === 200 && pdpHtml.includes('TESTE-X1 — Compressor de Teste Atlas Copco'),
);
ok('PDP com specs', pdpHtml.includes('99 kW'));

/* 6. upload de imagem (Supabase Storage) */
const png = readFileSync('public/assets/products/pecas/kit-250h.png');
const fd = new FormData();
fd.set('_acao', 'img-add');
fd.set('alt', 'Imagem de teste e2e');
fd.set('arquivo', new Blob([png], { type: 'image/png' }), 'foto-teste.png');
const r6 = await req(`/admin/produtos/${idNovo}`, { method: 'POST', body: fd });
ok('upload de imagem', r6.status === 302);

const edicao = await (await req(`/admin/produtos/${idNovo}`)).text();
const urlImagem = edicao.match(/https:[^"]+storage[^"]+produtos[^"]+/)?.[0];
ok('imagem no Supabase Storage', Boolean(urlImagem), urlImagem?.slice(0, 80));
if (urlImagem) {
  const img = await fetch(urlImagem);
  ok('imagem pública acessível', img.ok, `${img.status} ${img.headers.get('content-type')}`);
}

const pdp2 = await (await req('/produtos/compressores-eletricos/teste-x1')).text();
ok('PDP exibe a imagem enviada', /storage\/v1\/object\/public\/produtos/.test(pdp2));

/* 7. excluir produto de teste */
const r7 = await req(`/admin/produtos/${idNovo}`, form({ _acao: 'excluir' }));
ok('excluir produto', r7.status === 302);
const pdp3 = await req('/produtos/compressores-eletricos/teste-x1');
ok('PDP some após exclusão (404)', pdp3.status === 404);

console.log(falhas === 0 ? '\n✔ Tudo passou.' : `\n✖ ${falhas} falha(s).`);
process.exit(falhas === 0 ? 0 : 1);
