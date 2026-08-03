import 'dotenv/config';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
const BASE='http://localhost:5030';
const EXEC=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync)!;
const b=await puppeteer.launch({executablePath:EXEC,headless:true});
const p=await b.newPage();
await p.setViewport({width:1280,height:860});
await p.goto(`${BASE}/admin/login`,{waitUntil:'networkidle0'});
await p.type('input[name=email]','adm@acbsulcompressores.com.br');
await p.type('input[name=senha]','AcbSul#Admin2026');
await Promise.all([p.waitForNavigation({waitUntil:'networkidle0'}),p.click('button[type=submit]')]);
const rotas=['/admin/leads','/admin/categorias','/admin/categorias/nova','/admin/categorias/1','/admin/produtos','/admin/produtos/novo','/admin/produtos/1','/admin/popup','/admin/popup/5','/admin/configuracoes'];
for(const larg of [1280,390]){
  await p.setViewport({width:larg,height:860});
  console.log(`\n--- viewport ${larg}px ---`);
  for(const r of rotas){
    await p.goto(`${BASE}${r}`,{waitUntil:'networkidle0'});
    const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,erros:0}));
    const vaza=m.sw>m.cw+1;
    console.log(`${vaza?'VAZA':'ok  '} ${r.padEnd(26)} scroll=${m.sw} janela=${m.cw}`);
  }
}
await b.close();
