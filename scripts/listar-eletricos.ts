// Lista todos os produtos da categoria compressores-eletricos no banco,
// com slug, nome e status de publicação. Apoio para reorganização.
// Uso: npx tsx scripts/listar-eletricos.ts
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/db/schema';

const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

const [cat] = await db
  .select({ id: schema.categorias.id, slug: schema.categorias.slug, nome: schema.categorias.nome })
  .from(schema.categorias)
  .where(eq(schema.categorias.slug, 'compressores-eletricos'));

if (!cat) {
  console.error('✖ categoria compressores-eletricos não encontrada');
} else {
  console.log(`Categoria: ${cat.nome} (id=${cat.id})\n`);
  const rows = await db
    .select({
      id: schema.produtos.id,
      slug: schema.produtos.slug,
      nome: schema.produtos.nome,
      publicado: schema.produtos.publicado,
      chips: schema.produtos.specsChips,
    })
    .from(schema.produtos)
    .where(eq(schema.produtos.categoriaId, cat.id));
  rows.sort((a, b) => Number(b.publicado) - Number(a.publicado));
  for (const r of rows) {
    console.log(
      `${r.publicado ? '✅ PUB ' : '⛔ OFF '} | id=${r.id} | ${r.slug} | ${r.nome} | chips: ${(r.chips ?? []).join('; ')}`,
    );
  }
  console.log(`\nTotal: ${rows.length} produto(s) na categoria.`);
}

await client.end();
