// Migração: simplificação dos "Dados básicos" do produto.
//   - backfill de `nome` (override existente OU `tipo + codigo`)
//   - `nome`  → NOT NULL  (passa a ser o único campo de identidade)
//   - `slug`  → NULLABLE  (admin sugere a partir do nome quando em branco)
//   - remove colunas: codigo, etiqueta, tipo, marca
//
// Idempotente: só age nas colunas que ainda existem.
// Uso: npx tsx scripts/migrate-nome-unico.ts   (exige DATABASE_URL no .env)

import 'dotenv/config';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env.');
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });

async function temColuna(coluna: string): Promise<boolean> {
  const rows = await sql`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'produtos' AND column_name = ${coluna}
  `;
  return rows.length > 0;
}

async function main() {
  const temCodigo = await temColuna('codigo');
  const temTipo = await temColuna('tipo');

  await sql.begin(async (tx) => {
    // DDL pode levar mais que o statement_timeout curto do pooler de transações.
    await tx`SET LOCAL statement_timeout = 0`;
    // Se outra conexão (ex.: dev server) segurar a tabela, falhe rápido e claro.
    await tx`SET LOCAL lock_timeout = '20s'`;

    // 1. Backfill do nome a partir da forma legada (só enquanto codigo existir).
    if (temCodigo && temTipo) {
      const r = await tx`
        UPDATE produtos
        SET nome = btrim(coalesce(tipo, '') || ' ' || coalesce(codigo, ''))
        WHERE nome IS NULL OR btrim(nome) = ''
      `;
      console.log(`→ Backfill de nome em ${r.count} produto(s).`);
    }

    // 2. nome → NOT NULL
    await tx`ALTER TABLE produtos ALTER COLUMN nome SET NOT NULL`;
    console.log('→ nome agora é NOT NULL.');

    // 3. slug → NULLABLE
    await tx`ALTER TABLE produtos ALTER COLUMN slug DROP NOT NULL`;
    console.log('→ slug agora aceita NULL (sugestão pós-cadastro).');

    // 4. Remover colunas legadas.
    await tx`ALTER TABLE produtos DROP COLUMN IF EXISTS codigo`;
    await tx`ALTER TABLE produtos DROP COLUMN IF EXISTS etiqueta`;
    await tx`ALTER TABLE produtos DROP COLUMN IF EXISTS tipo`;
    await tx`ALTER TABLE produtos DROP COLUMN IF EXISTS marca`;
    console.log('→ Colunas codigo, etiqueta, tipo e marca removidas.');
  });

  console.log('✔ Migração concluída.');
}

main()
  .catch((e) => {
    console.error('✖ Migração falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => sql.end());
