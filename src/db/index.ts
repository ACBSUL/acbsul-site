// Cliente Drizzle (Supabase/Postgres). Usar SEMPRE este export — uma única
// conexão por instância. `prepare: false` é obrigatório com o transaction
// pooler do Supabase (porta 6543), o modo recomendado para serverless/Vercel.

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const url =
  (typeof import.meta !== 'undefined' && import.meta.env?.DATABASE_URL) ||
  process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL não definida (ver .env.example)');
}

const client = postgres(url, { prepare: false });

export const db = drizzle(client, { schema });
export * as tabelas from './schema';
