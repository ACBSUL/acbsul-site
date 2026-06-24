// QA da tela de Leads (Kanban + Lista). Loga via UI, renderiza as duas visões,
// captura erros de console/página e salva screenshots.
// Uso: npx tsx scripts/shot-leads.ts   (dev server precisa estar em :5030)

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

const erros: string[] = [];
page.on('console', (m) => {
  if (m.type() === 'error') erros.push(`console: ${m.text()}`);
});
page.on('pageerror', (e) => erros.push(`pageerror: ${e.message}`));
page.on('response', (r) => {
  if (r.url().includes('/admin/leads') && r.status() >= 500) erros.push(`http ${r.status()} em ${r.url()}`);
});

await page.setViewport({ width: 1280, height: 900 });
await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle0' });
await page.type('input[name=email]', 'adm@acbsulcompressores.com.br');
await page.type('input[name=senha]', 'AcbSul#Admin2026');
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click('button[type=submit]'),
]);

// Kanban (padrão)
await page.goto(`${BASE}/admin/leads`, { waitUntil: 'networkidle0' });
const temKanban = await page.$('[data-kanban]');
const colunas = await page.$$eval('[data-coluna]', (els) => els.map((e) => e.getAttribute('data-coluna')));
const cards = (await page.$$('[data-card]')).length;
await page.screenshot({ path: `${SAIDA}/leads-kanban-desktop.png`, fullPage: true });

await page.setViewport({ width: 375, height: 760 });
await page.goto(`${BASE}/admin/leads`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${SAIDA}/leads-kanban-mobile.png`, fullPage: true });

// Lista
await page.setViewport({ width: 1280, height: 900 });
await page.goto(`${BASE}/admin/leads?vista=lista`, { waitUntil: 'networkidle0' });
const temTabela = await page.$('table.lista');
await page.screenshot({ path: `${SAIDA}/leads-lista-desktop.png`, fullPage: true });

await browser.close();

console.log('Kanban presente:', !!temKanban);
console.log('Colunas:', colunas.join(', '));
console.log('Cards renderizados:', cards);
console.log('Tabela (lista) presente:', !!temTabela);
console.log('Erros capturados:', erros.length ? erros : 'nenhum');
