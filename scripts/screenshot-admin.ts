// Screenshots das telas do admin (QA visual do redesign).
// Usa o Chrome/Edge instalado via puppeteer-core (sem download de navegador).
// Uso: npx tsx scripts/screenshot-admin.ts

import 'dotenv/config';
import { existsSync, mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:5030';
const SAIDA = '.qa-screens';
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

// login pela própria UI (testa a tela de login de quebra)
await page.setViewport({ width: 1280, height: 900 });
await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${SAIDA}/00-login-desktop.png` });
await page.type('input[name=email]', 'adm@acbsulcompressores.com.br');
await page.type('input[name=senha]', 'AcbSul#Admin2026');
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('button[type=submit]'),
]);

const telas: Array<[string, string]> = [
  ['01-dashboard', '/admin'],
  ['02-categorias', '/admin/categorias'],
  ['03-categoria-editar', '/admin/categorias/1'],
  ['04-produtos', '/admin/produtos'],
  ['05-produto-novo', '/admin/produtos/novo'],
  ['06-produto-editar', '/admin/produtos/3'],
];

for (const [nome, rota] of telas) {
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}${rota}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${SAIDA}/${nome}-desktop.png`, fullPage: true });

  await page.setViewport({ width: 375, height: 760 });
  await page.goto(`${BASE}${rota}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${SAIDA}/${nome}-mobile.png`, fullPage: true });
  console.log(`✔ ${nome}`);
}

await browser.close();
console.log(`\nScreenshots em ${SAIDA}/`);
