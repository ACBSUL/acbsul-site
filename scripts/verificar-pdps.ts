// Verifica que TODOS os produtos publicados têm página própria no ar (200)
// e conteúdo dentro dos guardrails. Uso: npx tsx scripts/verificar-pdps.ts
import 'dotenv/config';
import { carregarProdutos } from '../src/lib/catalogo';
import { temPaginaPropria, urlProduto } from '../src/data/produtos';

const BASE = 'http://localhost:5030';
const produtos = await carregarProdutos();
let falhas = 0;

for (const p of produtos) {
  if (!temPaginaPropria(p)) {
    console.error(`✖ ${p.slug}: sem conteúdo completo (pitch/descrição/specs)`);
    falhas++;
    continue;
  }
  const res = await fetch(`${BASE}${urlProduto(p)}`);
  if (res.status !== 200) {
    console.error(`✖ ${p.slug}: HTTP ${res.status} em ${urlProduto(p)}`);
    falhas++;
    continue;
  }
  const html = await res.text();
  if (!html.includes('spec-table') || !html.includes(p.codigo.slice(0, 6))) {
    console.error(`✖ ${p.slug}: página sem tabela de specs ou sem o código`);
    falhas++;
  }
}

console.log(
  falhas === 0
    ? `✔ ${produtos.length}/${produtos.length} produtos com página própria no ar.`
    : `✖ ${falhas} falha(s) em ${produtos.length} produtos.`,
);
process.exit(falhas ? 1 : 0);
