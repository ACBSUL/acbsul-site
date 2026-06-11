// Cria um usuário do painel (PRD §8: SEM cadastro público — usuários
// nascem só por este script, rodado localmente com acesso ao banco).
// Uso: npx tsx scripts/create-admin.ts <email> <senha> [nome]

import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as authSchema from '../src/db/auth-schema';

const [email, senha, nome] = process.argv.slice(2);
if (!email || !senha) {
  console.error('Uso: npx tsx scripts/create-admin.ts <email> <senha> [nome]');
  process.exit(1);
}
if (senha.length < 8) {
  console.error('✖ A senha precisa ter pelo menos 8 caracteres.');
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
const db = drizzle(client, { schema: authSchema });

// Instância local com cadastro habilitado — a do site (src/lib/auth.ts)
// mantém disableSignUp: true, então a rota pública continua bloqueada.
const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: authSchema }),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET,
});

try {
  const res = await auth.api.signUpEmail({
    body: { email, password: senha, name: nome ?? 'Administrador' },
  });
  console.log(`✔ Usuário criado: ${res.user.email} (${res.user.name})`);
} catch (e: any) {
  console.error('✖ Falhou:', e.body?.message ?? e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
