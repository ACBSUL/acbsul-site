// Confere: login cai em /admin/leads, /admin redireciona p/ leads,
// e o link "Início" não existe mais na navegação.
import 'dotenv/config';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:5030';
const EXEC = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);
if (!EXEC) { console.error('✖ Sem navegador.'); process.exit(1); }

const browser = await puppeteer.launch({ executablePath: EXEC, headless: true });
const page = await browser.newPage();
await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle0' });
await page.type('input[name=email]', 'adm@acbsulcompressores.com.br');
await page.type('input[name=senha]', 'AcbSul#Admin2026');
await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }), page.click('button[type=submit]')]);
console.log('Após login, URL:', page.url());

await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle0' });
console.log('Ao abrir /admin, URL final:', page.url());

const itensNav = await page.$$eval('.topo nav a', (as) => as.map((a) => a.textContent?.trim()));
console.log('Itens da navegação:', itensNav.join(' | '));

await browser.close();
const ok = page.url().endsWith('/admin/leads') && !itensNav.some((t) => t === 'Início');
console.log(ok ? '✔ Leads é a inicial e "Início" foi removido.' : '✖ Algo fora do esperado.');
