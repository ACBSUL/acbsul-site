// Teste e2e do popup/banner contra o dev server em localhost:5030.
// Uso: npx tsx scripts/test-popup-e2e.ts
// Exercita: criação pelo admin, edição (conteúdo + gatilho + alcance),
// ativação/desativação e reflexo no HTML servido do site público.

import 'dotenv/config';

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
  return fetch(`${BASE}${caminho}`, {
    ...init,
    redirect: 'manual',
    headers: {
      Origin: BASE,
      ...(init.headers ?? {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
  });
}

function form(d: Record<string, string | string[]>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(d)) {
    if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
    else p.append(k, v);
  }
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: p.toString(),
  };
}

/* 1. login */
const login = await fetch(`${BASE}/api/auth/sign-in/email`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: BASE },
  body: JSON.stringify({ email: EMAIL, password: SENHA }),
});
cookie = (login.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]).join('; ');
ok('login no admin', login.ok && cookie.length > 0);
if (!cookie) process.exit(1);

/* 2. /admin/popup abre */
const lista = await req('/admin/popup');
const listaHtml = await lista.text();
ok('/admin/popup responde 200', lista.status === 200);
ok('menu do admin tem o item Popup', listaHtml.includes('>Popup<') || listaHtml.includes('Popup do site'));

/* 3. cria um popup */
const criar = await req('/admin/popup', form({ _acao: 'novo' }));
const destino = criar.headers.get('location') ?? '';
const id = Number(destino.split('/').pop());
ok('criar popup redireciona para a edição', criar.status === 302 && Number.isInteger(id), destino);

/* 4. edita: conteúdo + gatilho de rolagem + só na home + ATIVO */
const salvar = await req(
  `/admin/popup/${id}`,
  form({
    _acao: 'salvar',
    nomeInterno: 'TESTE locação XAMS',
    rotulo: 'Equipamento para locação',
    titulo: 'Compressor à diesel disponível para locação –',
    tituloDestaque: 'XAMS 900',
    texto: 'Alta performance, confiabilidade e eficiência para sua obra ou operação.',
    botaoTexto: 'SOLICITAR ORÇAMENTO',
    botaoLink: '/#contato',
    gatilho: 'rolagem',
    atrasoSegundos: '5',
    rolagemPercentual: '35',
    alcance: 'paginas',
    paginas: ['/'],
    reexibirHoras: '24',
    ativo: 'on',
  }),
);
ok('salvar popup redireciona com ok=1', salvar.headers.get('location') === `/admin/popup/${id}?ok=1`);

/* 5. site público: home mostra o popup no HTML servido */
const home = await (await fetch(`${BASE}/`)).text();
ok('home traz o popup no HTML servido', home.includes('id="popup-banner"'));
ok('home traz o título do popup', home.includes('XAMS 900'));
ok('gatilho de rolagem no HTML', home.includes('data-gatilho="rolagem"') && home.includes('data-rolagem="35"'));

/* 6. alcance respeitado: /servicos não deve ter o popup */
const servicos = await (await fetch(`${BASE}/servicos`)).text();
ok('página fora do alcance NÃO tem popup', !servicos.includes('id="popup-banner"'));

/* 7. troca para todo o site → /servicos passa a ter */
await req(
  `/admin/popup/${id}`,
  form({
    _acao: 'salvar',
    nomeInterno: 'TESTE locação XAMS',
    titulo: 'Compressor à diesel disponível para locação –',
    tituloDestaque: 'XAMS 900',
    gatilho: 'atraso',
    atrasoSegundos: '7',
    rolagemPercentual: '40',
    alcance: 'todo-site',
    reexibirHoras: '24',
    botaoTexto: 'SOLICITAR ORÇAMENTO',
    botaoLink: '/#contato',
    ativo: 'on',
  }),
);
const servicos2 = await (await fetch(`${BASE}/servicos`)).text();
ok('alcance "todo o site" alcança /servicos', servicos2.includes('id="popup-banner"'));
ok('atraso de 7s no HTML', servicos2.includes('data-atraso="7"'));

/* 8. desativar → some do site */
await req('/admin/popup', form({ _acao: 'alternar', id: String(id) }));
const homeOff = await (await fetch(`${BASE}/`)).text();
ok('popup desativado some do site', !homeOff.includes('id="popup-banner"'));

/* 9. preview mostra mesmo desativado */
const preview = await (await fetch(`${BASE}/?popup-preview=${id}`)).text();
ok('preview mostra o popup desativado', preview.includes('id="popup-banner"') && preview.includes('data-preview="1"'));

/* 10. limpeza */
const excluir = await req(`/admin/popup/${id}`, form({ _acao: 'excluir' }));
ok('excluir popup', excluir.headers.get('location') === '/admin/popup?ok=excluido');

console.log(falhas === 0 ? '\n✔ Todos os testes passaram.' : `\n✖ ${falhas} falha(s).`);
process.exitCode = falhas ? 1 : 0;
