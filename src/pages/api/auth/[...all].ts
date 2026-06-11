// Endpoints do Better-Auth (sign-in, sign-out, get-session…).
// Rota server (não pré-renderizada) — exige DATABASE_URL em runtime.

import type { APIRoute } from 'astro';
import { auth } from '../../../lib/auth';

export const prerender = false;

export const ALL: APIRoute = (ctx) => auth.handler(ctx.request);
