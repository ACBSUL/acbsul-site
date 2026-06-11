// Better-Auth — login do admin (PRD §8: usuário/senha, SEM cadastro público).
// Usuários são criados apenas via scripts/create-admin.ts (local).

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import * as authSchema from '../db/auth-schema';

const env = (k: string): string | undefined =>
  (typeof import.meta !== 'undefined' && import.meta.env?.[k]) || process.env[k];

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: authSchema }),
  emailAndPassword: {
    enabled: true,
    // bloqueia POST /api/auth/sign-up/* — sem cadastro público
    disableSignUp: true,
  },
  secret: env('BETTER_AUTH_SECRET'),
  baseURL: env('BETTER_AUTH_URL'),
  session: {
    // sessão de 7 dias, renovada a cada dia de uso
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
