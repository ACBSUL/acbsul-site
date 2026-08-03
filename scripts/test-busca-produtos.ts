// Teste da pesquisa por nome em /produtos (dev server em localhost:5030).
// Uso: npx tsx scripts/test-busca-produtos.ts
// Exercita: filtro por termo, sem acento, várias palavras, combinação com a
// linha selecionada, estado "nada encontrado" e limpar pesquisa.

import 'dotenv/config';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const EXEC = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync)!;

let falhas = 0;
function ok(nome: string, cond: boolean, extra = '') {
  console.log(`${cond ? '✔' : '✖'} ${nome}${extra ? ` — ${extra}` : ''}`);
  if (!cond) falhas++;
}

const b = await puppeteer.launch({ executablePath: EXEC, headless: true });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 900 });
await pg.goto('http://localhost:5030/produtos', { waitUntil: 'networkidle0' });

// se houver popup ativo no site, ele cobre a página — fecha antes de testar
await new Promise((r) => setTimeout(r, 400));
await pg.evaluate(() => {
  const x = document.querySelector('#popup-banner .popup-x') as HTMLElement | null;
  x?.click();
});

const estado = () =>
  pg.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#pgrid [data-cat]')) as HTMLElement[];
    const visiveis = cards.filter((c) => c.style.display !== 'none');
    return {
      total: cards.length,
      visiveis: visiveis.length,
      contador: Number(document.getElementById('fcount')?.textContent ?? -1),
      titulo: document.getElementById('ftitle')?.textContent ?? '',
      vazio: !(document.getElementById('pvazio') as HTMLElement)?.hidden,
      nomes: visiveis.slice(0, 4).map((c) => c.querySelector('h3')?.textContent?.trim() ?? ''),
    };
  });

async function digitar(termo: string) {
  await pg.evaluate(() => {
    const i = document.getElementById('pbusca') as HTMLInputElement;
    i.value = '';
    i.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await pg.type('#pbusca', termo, { delay: 8 });
  await new Promise((r) => setTimeout(r, 120));
  return estado();
}

/* 1. campo existe e o catálogo começa inteiro */
const inicial = await estado();
ok('campo de busca presente', (await pg.$('#pbusca')) !== null);
ok('catálogo começa completo', inicial.visiveis === inicial.total, `${inicial.total} itens`);

/* 2. busca simples */
const gerador = await digitar('gerador');
ok('busca "gerador" filtra', gerador.visiveis > 0 && gerador.visiveis < inicial.total,
  `${gerador.visiveis} de ${inicial.total}`);
ok('contador acompanha a busca', gerador.contador === gerador.visiveis);
ok('título mostra o termo', gerador.titulo.includes('gerador'), gerador.titulo);

/* 3. sem acento acha com acento */
const semAcento = await digitar('nitrogenio');
const comAcento = await digitar('nitrogênio');
ok('busca sem acento = com acento', semAcento.visiveis === comAcento.visiveis && semAcento.visiveis > 0,
  `${semAcento.visiveis} itens`);

/* 4. várias palavras (todas precisam bater) */
const duasPalavras = await digitar('compressor parafuso');
ok('duas palavras restringem o resultado', duasPalavras.visiveis > 0, duasPalavras.nomes.join(' | '));

/* 5. termo inexistente → estado vazio */
const nada = await digitar('xyzabc123');
ok('termo sem resultado mostra o aviso', nada.vazio && nada.visiveis === 0);

/* 6. limpar pesquisa volta tudo */
await pg.click('#pvazioLimpar');
await new Promise((r) => setTimeout(r, 120));
const limpo = await estado();
ok('limpar pesquisa restaura o catálogo', limpo.visiveis === inicial.total && !limpo.vazio);

/* 7. combina com a linha selecionada */
await pg.evaluate(() => {
  const l = document.querySelector('.cat-link[data-filter="compressores-parafuso"]') as HTMLElement;
  (l ?? (document.querySelectorAll('.cat-link')[1] as HTMLElement)).click();
});
await new Promise((r) => setTimeout(r, 200));
const soLinha = await estado();
const linhaMaisBusca = await digitar('gerador');
ok('linha + busca combinam', linhaMaisBusca.visiveis <= soLinha.visiveis,
  `linha ${soLinha.visiveis} → +busca ${linhaMaisBusca.visiveis}`);
ok('oferece ampliar para todas as linhas',
  await pg.evaluate(() => !(document.getElementById('pvazioTodas') as HTMLElement)?.hidden));

await pg.click('#pvazioTodas');
await new Promise((r) => setTimeout(r, 200));
const ampliado = await estado();
ok('ampliar busca em todas as linhas traz resultados', ampliado.visiveis > 0, `${ampliado.visiveis} itens`);

await b.close();
console.log(falhas === 0 ? '\n✔ Todos os testes passaram.' : `\n✖ ${falhas} falha(s).`);
process.exitCode = falhas ? 1 : 0;
