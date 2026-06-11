// Cliente Drizzle (Supabase/Postgres). Usar SEMPRE este export.
// `prepare: false` é obrigatório com o transaction pooler do Supabase
// (porta 6543), o modo recomendado para serverless/Vercel.
//
// A criação é PREGUIÇOSA (proxy): a conexão só nasce no primeiro uso.
// Isso permite que o build (prerender) rode sem DATABASE_URL — só as
// rotas server (admin/API) precisam da variável em runtime.

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as catalogo from './schema';
import * as auth from './auth-schema';

const schema = { ...catalogo, ...auth };

type Db = ReturnType<typeof criar>;

function criar() {
  const url =
    (typeof import.meta !== 'undefined' && import.meta.env?.DATABASE_URL) ||
    process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL não definida (ver .env.example)');
  return drizzle(postgres(url, { prepare: false }), { schema });
}

let real: Db | undefined;

export const db: Db = new Proxy({} as Db, {
  get(_alvo, prop) {
    real ??= criar();
    const v = (real as any)[prop];
    return typeof v === 'function' ? v.bind(real) : v;
  },
});

export * as tabelas from './schema';
export * as tabelasAuth from './auth-schema';
