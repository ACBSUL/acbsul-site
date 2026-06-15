// Insere no banco SOMENTE os produtos novos da apresentação ACBSul rev01 26.05.26
// (linha G de parafuso, portáteis X-Air/XAS boX/X-Air+/Small Air, Y1300, E-AIR T400
// e torres HiLight V7⁺/MS4 Solar). Aditivo e idempotente: pula slugs já existentes,
// nunca apaga nada. Lê os dados de src/data/produtos.ts.
//
// Uso: npx tsx scripts/adicionar-produtos-pdf.ts
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/db/schema';
import { produtos as produtosSeed, nomeSeed } from '../src/data/produtos';

// slugs introduzidos pela apresentação (ordem do item 4)
const NOVOS = new Set([
  'compressores-parafuso-linha-g',
  'xas-58-kd',
  'xas-98-kd',
  'x-air-290-14',
  'x-air-300-12',
  'x-air-350-10',
  'x-air-400-7',
  'xahs-450-cud',
  'xahs-750-cud',
  'xahs-850-cud-pace',
  'x-air-plus-815-14',
  'x-air-plus-970-10',
  'x-air-plus-900-20',
  'y1300-sd',
  'e-air-t400',
  'hilight-v7-led',
  'hilight-ms4-solar',
]);

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env.');
  process.exit(1);
}

const client = postgres(url, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

async function main() {
  const cats = await db
    .select({ id: schema.categorias.id, slug: schema.categorias.slug })
    .from(schema.categorias);
  const idPorSlug = new Map(cats.map((c) => [c.slug, c.id]));

  const aInserir = produtosSeed.filter((p) => NOVOS.has(p.slug));
  if (aInserir.length !== NOVOS.size) {
    const achados = new Set(aInserir.map((p) => p.slug));
    const faltando = [...NOVOS].filter((s) => !achados.has(s));
    console.error(`✖ slugs não encontrados no seed: ${faltando.join(', ')}`);
    process.exit(1);
  }

  let inseridos = 0;
  let pulados = 0;

  for (const p of aInserir) {
    const categoriaId = idPorSlug.get(p.categoria);
    if (!categoriaId) {
      console.error(`✖ ${p.slug}: categoria "${p.categoria}" não existe no banco — pulando.`);
      continue;
    }

    const [existe] = await db
      .select({ id: schema.produtos.id })
      .from(schema.produtos)
      .where(eq(schema.produtos.slug, p.slug));
    if (existe) {
      console.log(`• ${p.slug}: já existe — pulado.`);
      pulados++;
      continue;
    }

    const [row] = await db
      .insert(schema.produtos)
      .values({
        slug: p.slug,
        nome: nomeSeed(p),
        categoriaId,
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

    console.log(
      `✔ ${p.slug} inserido (${p.especificacoes?.length ?? 0} specs, ${p.imagens.length} imagens).`,
    );
    inseridos++;
  }

  console.log(`\n→ ${inseridos} inserido(s), ${pulados} pulado(s).`);
}

main()
  .catch((e) => {
    console.error('✖ Falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => client.end());
