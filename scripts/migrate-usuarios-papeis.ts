// Migração: gestão de usuários do painel (papel + permissões por seção).
// Adiciona na tabela `user` do Better-Auth:
//   - papel      → 'admin' (acesso total) ou 'editor' (só as seções marcadas)
//   - permissoes → seções liberadas para o editor (array de texto)
//   - ativo      → false bloqueia o login sem apagar o usuário
//
// O primeiro usuário (o mais antigo) vira admin — senão ninguém conseguiria
// administrar o painel depois da migração.
//
// Idempotente: ADD COLUMN IF NOT EXISTS, pode rodar quantas vezes quiser.
// Uso: npx tsx scripts/migrate-usuarios-papeis.ts   (exige DATABASE_URL no .env)

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
    await tx`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS papel text NOT NULL DEFAULT 'editor'`;
    await tx`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS permissoes text[] NOT NULL DEFAULT '{}'`;
    await tx`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS ativo boolean NOT NULL DEFAULT true`;
  });

  // ninguém admin ainda? promove o usuário mais antigo (o dono do painel).
  const [temAdmin] = await sql`SELECT 1 FROM "user" WHERE papel = 'admin' LIMIT 1`;
  if (!temAdmin) {
    const [promovido] = await sql`
      UPDATE "user" SET papel = 'admin'
      WHERE id = (SELECT id FROM "user" ORDER BY created_at ASC LIMIT 1)
      RETURNING email`;
    console.log(promovido ? `✔ Admin definido: ${promovido.email}` : '• Nenhum usuário cadastrado ainda.');
  } else {
    console.log('• Já existe admin — nada a promover.');
  }

  const usuarios = await sql`SELECT email, papel, ativo FROM "user" ORDER BY created_at`;
  console.log('✔ Colunas garantidas. Usuários:');
  usuarios.forEach((u) => console.log(`   - ${u.email} · ${u.papel} · ${u.ativo ? 'ativo' : 'inativo'}`));
}

main()
  .catch((e) => {
    console.error('✖ Migração falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => sql.end());
