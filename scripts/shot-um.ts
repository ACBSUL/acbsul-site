// Screenshot avulso de uma rota do admin (viewport, sem fullPage).
// Uso: npx tsx scripts/shot-um.ts <rota> <arquivo.png> [largura]
import 'dotenv/config';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const [rota = '/admin', arquivo = '.qa-screens/avulso.png', largura = '375'] =
  process.argv.slice(2);
const EXEC = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync)!;

const b = await puppeteer.launch({ executablePath: EXEC, headless: true });
const p = await b.newPage();
await p.setViewport({ width: Number(largura), height: 760 });
await p.goto('http://localhost:5030/admin/login', { waitUntil: 'networkidle0' });
await p.type('input[name=email]', 'adm@acbsulcompressores.com.br');
await p.type('input[name=senha]', 'AcbSul#Admin2026');
await Promise.all([
  p.waitForNavigation({ waitUntil: 'networkidle0' }),
  p.click('button[type=submit]'),
]);
await p.goto(`http://localhost:5030${rota}`, { waitUntil: 'networkidle0' });
await p.screenshot({ path: arquivo as `${string}.png` });
await b.close();
console.log(`✔ ${arquivo}`);
