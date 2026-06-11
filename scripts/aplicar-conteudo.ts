// Runner compartilhado dos scripts preencher-*.ts: grava pitch, descrição e
// especificações de PDP no banco. Guardrails (CLAUDE.md §9) são responsabilidade
// do conteúdo passado; aqui só validamos o tamanho (150–400 palavras).
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/db/schema';

export interface Conteudo {
  slug: string;
  pitch: string;
  descricao: string[];
  especificacoes: Array<[string, string]>;
}

export async function aplicar(conteudos: Conteudo[]) {
  const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
  const db = drizzle(client, { schema });
  let falhas = 0;

  for (const c of conteudos) {
    const palavras = c.descricao
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .split(/\s+/)
      .filter(Boolean).length;
    if (palavras < 150 || palavras > 400) {
      console.error(`✖ ${c.slug}: descrição com ${palavras} palavras (fora de 150–400)`);
      falhas++;
      continue;
    }
    const [p] = await db
      .select({ id: schema.produtos.id })
      .from(schema.produtos)
      .where(eq(schema.produtos.slug, c.slug));
    if (!p) {
      console.error(`✖ produto não encontrado: ${c.slug}`);
      falhas++;
      continue;
    }
    await db
      .update(schema.produtos)
      .set({ pitch: c.pitch, descricao: c.descricao, atualizadoEm: new Date() })
      .where(eq(schema.produtos.id, p.id));
    await db.delete(schema.produtoSpecs).where(eq(schema.produtoSpecs.produtoId, p.id));
    await db
      .insert(schema.produtoSpecs)
      .values(
        c.especificacoes.map(([rotulo, valor], i) => ({
          produtoId: p.id,
          rotulo,
          valor,
          ordem: i,
        })),
      );
    console.log(`✔ ${c.slug} (${palavras} palavras, ${c.especificacoes.length} specs)`);
  }

  await client.end();
  if (falhas) {
    console.error(`\n✖ ${falhas} falha(s).`);
    process.exitCode = 1;
  }
}
