// Migração: colunas de rastreio (origem da campanha) na tabela leads.
//   fonte          meta | google | instagram | direto ... (calculada no navegador)
//   utm_*          UTMs do último clique em anúncio (90 dias)
//   gclid/gbraid/wbraid  identificadores de clique do Google Ads
//   fbclid         identificador de clique da Meta
//   pagina         URL onde o formulário foi enviado
//   visitante_id   id anônimo do visitante (external_id do Pixel)
//
// Só ACRESCENTA colunas (todas opcionais). Não apaga nem altera dados.
// Idempotente: ADD COLUMN IF NOT EXISTS.
// Uso: npx tsx scripts/migrate-leads-rastreio.ts   (exige DATABASE_URL no .env)

import 'dotenv/config';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env.');
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });

const COLUNAS = [
  'fonte',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'pagina',
  'visitante_id',
];

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
  console.log('✔ Colunas de rastreio garantidas. Tabela leads agora tem:');
  console.log('  ' + cols.map((r) => r.column_name).join(', '));
}

main()
  .catch((e) => {
    console.error('✖ Migração falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => sql.end());
