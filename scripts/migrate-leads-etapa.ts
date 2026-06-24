// Migração: adiciona a coluna `etapa` na tabela leads (Kanban de gestão).
//   - 'aberto'     → Contato Aberto (default)
//   - 'respondido' → Respondido
//   - 'crm'        → Encaminhado para CRM
//
// Idempotente: ADD COLUMN IF NOT EXISTS, pode rodar quantas vezes quiser.
// Uso: npx tsx scripts/migrate-leads-etapa.ts   (exige DATABASE_URL no .env)

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
    await tx`ALTER TABLE leads ADD COLUMN IF NOT EXISTS etapa text NOT NULL DEFAULT 'aberto'`;
  });
  console.log('✔ Coluna leads.etapa garantida (default \'aberto\').');
}

main()
  .catch((e) => {
    console.error('✖ Migração falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => sql.end());
