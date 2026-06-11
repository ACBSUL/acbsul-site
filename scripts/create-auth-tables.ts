// Cria as tabelas do Better-Auth via SQL direto (espelha src/db/auth-schema.ts).
// Necessário porque o `drizzle-kit push` 0.31.x quebra ao introspectar o banco
// (bug em CHECK constraints). Idempotente (IF NOT EXISTS).
// Uso: npx tsx scripts/create-auth-tables.ts

import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });

try {
  await sql`
    create table if not exists "user" (
      id text primary key,
      name text not null,
      email text not null unique,
      email_verified boolean not null default false,
      image text,
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )`;
  await sql`
    create table if not exists "session" (
      id text primary key,
      expires_at timestamp not null,
      token text not null unique,
      ip_address text,
      user_agent text,
      user_id text not null references "user"(id) on delete cascade,
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )`;
  await sql`
    create table if not exists "account" (
      id text primary key,
      account_id text not null,
      provider_id text not null,
      user_id text not null references "user"(id) on delete cascade,
      access_token text,
      refresh_token text,
      id_token text,
      access_token_expires_at timestamp,
      refresh_token_expires_at timestamp,
      scope text,
      password text,
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )`;
  await sql`
    create table if not exists "verification" (
      id text primary key,
      identifier text not null,
      value text not null,
      expires_at timestamp not null,
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )`;
  console.log('✔ Tabelas de auth criadas (user, session, account, verification).');
} catch (e: any) {
  console.error('✖ Falhou:', e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
