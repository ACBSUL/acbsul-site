// Migração: coluna empresa na tabela leads (campo "Empresa" do formulário da home).
// Só ACRESCENTA a coluna (opcional). Idempotente: ADD COLUMN IF NOT EXISTS.
// Uso: npx tsx scripts/migrate-leads-empresa.ts   (exige DATABASE_URL no .env)
import 'dotenv/config';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env.');
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });

const COLUNAS = ['empresa'];

async function main() {
  await sql.begin(async (tx) => {
    await tx`SET LOCAL statement_timeout = 0`;
    await tx`SET LOCAL lock_timeout = '20s'`;
    for (const c of COLUNAS) {
      await tx.unsafe(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ${c} text`);
    }
  });
  const cols = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'leads' ORDER BY ordinal_position`;
  console.log('✔ Coluna empresa garantida. Tabela leads agora tem:');
  console.log('  ' + cols.map((r) => r.column_name).join(', '));
}

main()
  .catch((e) => {
    console.error('✖ Migração falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => sql.end());
