// Seed do banco a partir dos modelos aprovados em src/data/ (CLAUDE.md Passo 2).
// Idempotente: limpa as tabelas do catálogo e reinsere tudo.
// Uso: npm run db:seed  (exige DATABASE_URL no .env; rodar db:push antes)

import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/db/schema';
import { categorias as categoriasSeed } from '../src/data/categorias';
import { produtos as produtosSeed } from '../src/data/produtos';

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env (ver .env.example).');
  process.exit(1);
}

const client = postgres(url, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

async function main() {
  console.log('→ Limpando tabelas do catálogo…');
  await db.delete(schema.produtoSpecs);
  await db.delete(schema.produtoImagens);
  await db.delete(schema.produtos);
  await db.delete(schema.categorias);

  console.log(`→ Inserindo ${categoriasSeed.length} categorias…`);
  const idPorSlug = new Map<string, number>();
  for (const c of categoriasSeed) {
    const [row] = await db
      .insert(schema.categorias)
      .values({
        slug: c.slug,
        nome: c.nome,
        nomeCurto: c.nomeCurto,
        icone: c.icone,
        ordem: c.ordem,
        introducao: c.introducao ?? null,
        seoTitle: c.seoTitle ?? null,
        seoDescription: c.seoDescription ?? null,
        whatsappNumero: c.whatsappNumero ?? null,
        whatsappMensagem: c.whatsappMensagem ?? null,
        ativa: c.ativa,
      })
      .returning({ id: schema.categorias.id });
    idPorSlug.set(c.slug, row.id);
  }

  console.log(`→ Inserindo ${produtosSeed.length} produtos…`);
  for (const p of produtosSeed) {
    const categoriaId = idPorSlug.get(p.categoria);
    if (!categoriaId) {
      throw new Error(`Produto "${p.slug}": categoria desconhecida "${p.categoria}"`);
    }
    const [row] = await db
      .insert(schema.produtos)
      .values({
        slug: p.slug,
        codigo: p.codigo,
        etiqueta: p.etiqueta ?? null,
        tipo: p.tipo,
        categoriaId,
        marca: p.marca ?? null,
        nome: p.nome ?? null,
        specsChips: p.specsChips,
        destaque: p.destaque ?? false,
        pitch: p.pitch ?? null,
        descricao: p.descricao ?? null,
        seoTitle: p.seoTitle ?? null,
        seoDescription: p.seoDescription ?? null,
        publicado: p.publicado ?? true,
      })
      .returning({ id: schema.produtos.id });

    if (p.imagens.length) {
      await db.insert(schema.produtoImagens).values(
        p.imagens.map((img, i) => ({
          produtoId: row.id,
          src: img.src,
          alt: img.alt ?? null,
          principal: img.principal ?? false,
          ordem: i,
        })),
      );
    }

    if (p.especificacoes?.length) {
      await db.insert(schema.produtoSpecs).values(
        p.especificacoes.map((s, i) => ({
          produtoId: row.id,
          rotulo: s.rotulo,
          valor: s.valor,
          ordem: i,
        })),
      );
    }
  }

  console.log('✔ Seed concluído.');
  console.log(`  Categorias: ${categoriasSeed.length} | Produtos: ${produtosSeed.length}`);
}

main()
  .catch((e) => {
    console.error('✖ Seed falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => client.end());
