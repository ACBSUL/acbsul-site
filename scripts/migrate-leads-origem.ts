// Migração: adiciona a coluna `origem` na tabela leads.
//   - 'produto'        → lead veio do formulário da página de produto (PDP)
//   - 'contato-direto' → lead veio do formulário "Contato Direto" da home
//
// Idempotente: ADD COLUMN IF NOT EXISTS, pode rodar quantas vezes quiser.
// Uso: npx tsx scripts/migrate-leads-origem.ts   (exige DATABASE_URL no .env)

import 'dotenv/config';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env.');
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });

async function main() {
  await sql.begin(async (tx) => {
    await tx`SET LOCAL statement_timeout = 0`;
    await tx`SET LOCAL lock_timeout = '20s'`;
    await tx`ALTER TABLE leads ADD COLUMN IF NOT EXISTS origem text NOT NULL DEFAULT 'produto'`;
  });
  console.log('✔ Coluna leads.origem garantida (default \'produto\').');
}

main()
  .catch((e) => {
    console.error('✖ Migração falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => sql.end());
