// Testa a persistência de "mover etapa": clica na seta → próxima coluna de um card
// na coluna 'aberto' e confirma que ele aparece em 'respondido' após recarregar.
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

await page.goto(`${BASE}/admin/leads`, { waitUntil: 'networkidle0' });

const idAlvo = await page.$$eval('[data-coluna="aberto"] [data-card]', (els) =>
  els.length ? els[0].getAttribute('data-id') : null);
console.log('Card alvo (coluna aberto):', idAlvo);
if (!idAlvo) { console.log('Sem card em aberto para testar.'); await browser.close(); process.exit(0); }

// seta "próxima" = segundo form .f-mover do card
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click(`[data-card][data-id="${idAlvo}"] .f-mover:nth-of-type(2) button`),
]);

const etapaAgora = await page.$eval(`[data-card][data-id="${idAlvo}"]`, (el) => el.closest('[data-coluna]')?.getAttribute('data-coluna'));
console.log('Etapa após mover (esperado "respondido"):', etapaAgora);

// volta para aberto p/ não bagunçar os dados
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0' }),
  page.click(`[data-card][data-id="${idAlvo}"] .f-mover:nth-of-type(1) button`),
]);
const etapaRevertida = await page.$eval(`[data-card][data-id="${idAlvo}"]`, (el) => el.closest('[data-coluna]')?.getAttribute('data-coluna'));
console.log('Etapa após reverter (esperado "aberto"):', etapaRevertida);

await browser.close();
console.log(etapaAgora === 'respondido' && etapaRevertida === 'aberto' ? '✔ Mover persiste corretamente.' : '✖ Persistência falhou.');
