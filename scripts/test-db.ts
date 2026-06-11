// Teste rápido de conexão com o banco (usa DATABASE_URL do .env).
// Uso: npx tsx scripts/test-db.ts
import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  prepare: false,
  max: 1,
  connect_timeout: 15,
});

try {
  const r = await sql`select version()`;
  console.log('✔ Conectado:', r[0].version);
} catch (e: any) {
  console.error('✖ Falhou:', e.code ?? '', e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
