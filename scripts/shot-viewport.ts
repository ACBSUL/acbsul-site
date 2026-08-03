// QA visual do shell do admin: captura só a janela visível (não a página
// inteira), porque a barra lateral é position:fixed e sai distorcida numa
// captura de página inteira.
// Uso: npx tsx scripts/shot-viewport.ts

import 'dotenv/config';
import { existsSync, mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:5030';
const SAIDA = '.qa-screens/shell';
const EXEC = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);

if (!EXEC) {
  console.error('✖ Nenhum navegador encontrado.');
  process.exit(1);
}
mkdirSync(SAIDA, { recursive: true });

const browser = await puppeteer.launch({ executablePath: EXEC, headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 1280, height: 860 });
await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${SAIDA}/00-login.png` });
await page.type('input[name=email]', 'adm@acbsulcompressores.com.br');
await page.type('input[name=senha]', 'AcbSul#Admin2026');
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('button[type=submit]'),
]);

const telas: Array<[string, string]> = [
  ['01-leads', '/admin/leads'],
  ['02-categorias', '/admin/categorias'],
  ['03-produtos', '/admin/produtos'],
  ['04-produto-editar', '/admin/produtos/1'],
  ['05-popup', '/admin/popup'],
  ['06-configuracoes', '/admin/configuracoes'],
];

for (const [nome, rota] of telas) {
  await page.goto(`${BASE}${rota}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${SAIDA}/${nome}.png` });
  console.log(`✔ ${nome}`);
}

// menu lateral no mobile (fechado e aberto)
await page.setViewport({ width: 390, height: 780 });
await page.goto(`${BASE}/admin/produtos`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${SAIDA}/07-mobile-fechado.png` });
await page.click('[data-menu]');
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${SAIDA}/08-mobile-aberto.png` });
console.log('✔ mobile');

await browser.close();
console.log(`\nCapturas em ${SAIDA}/`);
