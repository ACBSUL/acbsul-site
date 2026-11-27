// Usuários do painel: papéis, permissões por seção e CRUD (PRD §8).
//
// Modelo (inspirado no PROC Manager):
//   - admin  → acesso total, inclusive à própria seção de usuários;
//   - editor → só as seções marcadas em `permissoes`.
//
// A trava REAL é no servidor (src/middleware.ts). Esconder item de menu é só
// conforto visual — sem a checagem no middleware bastaria digitar a URL.

import { and, asc, eq, ne, sql } from 'drizzle-orm';
import { db, tabelasAuth } from '../db';
import { auth } from './auth';

export type Papel = 'admin' | 'editor';
export type PermKey = 'leads' | 'categorias' | 'produtos' | 'popup' | 'configuracoes' | 'usuarios';

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  papel: Papel;
  permissoes: PermKey[];
  ativo: boolean;
  criadoEm: Date;
};

/** Seções do painel na ordem do menu. `soAdmin` não pode ser dada a editor. */
export const SECOES: { chave: PermKey; rotulo: string; href: string; soAdmin?: boolean }[] = [
  { chave: 'leads', rotulo: 'Leads', href: '/admin/leads' },
  { chave: 'categorias', rotulo: 'Categorias', href: '/admin/categorias' },
  { chave: 'produtos', rotulo: 'Produtos', href: '/admin/produtos' },
  { chave: 'popup', rotulo: 'Popup', href: '/admin/popup' },
  { chave: 'configuracoes', rotulo: 'Configurações', href: '/admin/configuracoes' },
  { chave: 'usuarios', rotulo: 'Usuários', href: '/admin/usuarios', soAdmin: true },
];

/** Permissões que um editor pode receber (todas menos as de admin). */
export const PERMS_EDITOR = SECOES.filter((s) => !s.soAdmin);

/** A seção a que uma URL do painel pertence. null = área comum (ex.: /admin). */
export function secaoDaUrl(pathname: string): PermKey | null {
  const achou = SECOES.find((s) => pathname === s.href || pathname.startsWith(s.href + '/'));
  return achou?.chave ?? null;
}

/** Pode abrir a seção? Admin pode tudo; editor só o que está liberado. */
export function podeAcessar(u: Pick<Usuario, 'papel' | 'permissoes' | 'ativo'> | null, chave: PermKey): boolean {
  if (!u || !u.ativo) return false;
  if (u.papel === 'admin') return true;
  return u.permissoes.includes(chave);
}

/** Seções visíveis no menu para este usuário. */
export function secoesVisiveis(u: Pick<Usuario, 'papel' | 'permissoes' | 'ativo'> | null) {
  return SECOES.filter((s) => podeAcessar(u, s.chave));
}

/** Primeira seção que o usuário pode abrir — destino após o login. */
export function primeiraSecao(u: Pick<Usuario, 'papel' | 'permissoes' | 'ativo'> | null): string | null {
  return secoesVisiveis(u)[0]?.href ?? null;
}

const colunas = {
  id: tabelasAuth.user.id,
  nome: tabelasAuth.user.name,
  email: tabelasAuth.user.email,
  papel: tabelasAuth.user.papel,
  permissoes: tabelasAuth.user.permissoes,
  ativo: tabelasAuth.user.ativo,
  criadoEm: tabelasAuth.user.createdAt,
};

function normalizar(linha: any): Usuario {
  return {
    ...linha,
    papel: linha.papel === 'admin' ? 'admin' : 'editor',
    permissoes: (linha.permissoes ?? []) as PermKey[],
  };
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const linhas = await db.select(colunas).from(tabelasAuth.user).orderBy(asc(tabelasAuth.user.createdAt));
  return linhas.map(normalizar);
}

export async function buscarUsuario(id: string): Promise<Usuario | null> {
  const [linha] = await db.select(colunas).from(tabelasAuth.user).where(eq(tabelasAuth.user.id, id));
  return linha ? normalizar(linha) : null;
}

/** Quantos admins ativos existem — impede o painel ficar sem dono. */
export async function contarAdmins(exceto?: string): Promise<number> {
  const cond = [eq(tabelasAuth.user.papel, 'admin'), eq(tabelasAuth.user.ativo, true)];
  if (exceto) cond.push(ne(tabelasAuth.user.id, exceto));
  const [r] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(tabelasAuth.user)
    .where(and(...cond));
  return r?.n ?? 0;
}

/** Admin não guarda permissões avulsas: acesso total já é o papel. */
function limpar(papel: Papel, permissoes: PermKey[]): PermKey[] {
  if (papel === 'admin') return [];
  const validas = new Set(PERMS_EDITOR.map((s) => s.chave));
  return permissoes.filter((p) => validas.has(p));
}

export class ErroUsuario extends Error {}

/** Contexto interno do Better-Auth: hash de senha e gravação de user/account.
 *  Não usamos `auth.api.signUpEmail` de propósito — ela está desligada por
 *  `disableSignUp: true` (sem cadastro público, PRD §8), e essa trava tem que
 *  continuar valendo. Aqui o cadastro é só do admin logado. */
async function contexto() {
  return auth.$context;
}

export async function criarUsuario(input: {
  nome: string;
  email: string;
  senha: string;
  papel: Papel;
  permissoes: PermKey[];
}): Promise<Usuario> {
  const email = input.email.trim().toLowerCase();
  const nome = input.nome.trim() || email.split('@')[0];
  if (!email.includes('@')) throw new ErroUsuario('Informe um e-mail válido.');
  if (input.senha.length < 8) throw new ErroUsuario('A senha precisa ter pelo menos 8 caracteres.');

  const ctx = await contexto();
  const jaExiste = await ctx.internalAdapter.findUserByEmail(email);
  if (jaExiste) throw new ErroUsuario('Já existe um usuário com esse e-mail.');

  const hash = await ctx.password.hash(input.senha);
  const novo = await ctx.internalAdapter.createUser({
    email,
    name: nome,
    emailVerified: false,
  } as any);

  await ctx.internalAdapter.createAccount({
    userId: novo.id,
    providerId: 'credential',
    accountId: novo.id,
    password: hash,
  } as any);

  // papel/permissões vão num UPDATE próprio: o adapter do Better-Auth só
  // grava os campos que ele conhece, e essas colunas são nossas.
  await db
    .update(tabelasAuth.user)
    .set({ papel: input.papel, permissoes: limpar(input.papel, input.permissoes), ativo: true })
    .where(eq(tabelasAuth.user.id, novo.id));

  const criado = await buscarUsuario(novo.id);
  if (!criado) throw new ErroUsuario('Usuário criado, mas não foi possível lê-lo de volta.');
  return criado;
}

export async function atualizarUsuario(
  id: string,
  dados: { nome?: string; papel?: Papel; permissoes?: PermKey[]; ativo?: boolean },
): Promise<void> {
  const atual = await buscarUsuario(id);
  if (!atual) throw new ErroUsuario('Usuário não encontrado.');

  const papel = dados.papel ?? atual.papel;
  const ativo = dados.ativo ?? atual.ativo;

  // não deixa o painel ficar sem nenhum admin ativo
  const perdeAdmin = atual.papel === 'admin' && atual.ativo && (papel !== 'admin' || !ativo);
  if (perdeAdmin && (await contarAdmins(id)) === 0) {
    throw new ErroUsuario('Este é o único administrador ativo. Promova outra pessoa a admin antes.');
  }

  await db
    .update(tabelasAuth.user)
    .set({
      name: dados.nome?.trim() || atual.nome,
      papel,
      permissoes: limpar(papel, dados.permissoes ?? atual.permissoes),
      ativo,
      updatedAt: new Date(),
    })
    .where(eq(tabelasAuth.user.id, id));
}

/** Define uma senha nova (admin redefinindo a de outra pessoa, ou a própria). */
export async function definirSenha(id: string, senha: string): Promise<void> {
  if (senha.length < 8) throw new ErroUsuario('A senha precisa ter pelo menos 8 caracteres.');
  const ctx = await contexto();
  const hash = await ctx.password.hash(senha);
  await ctx.internalAdapter.updatePassword(id, hash);
  // encerra as sessões abertas: quem sabia a senha antiga precisa entrar de novo
  await db.delete(tabelasAuth.session).where(eq(tabelasAuth.session.userId, id));
}

export async function removerUsuario(id: string, quemPede: string): Promise<void> {
  if (id === quemPede) throw new ErroUsuario('Você não pode remover o seu próprio usuário.');
  const alvo = await buscarUsuario(id);
  if (!alvo) throw new ErroUsuario('Usuário não encontrado.');
  if (alvo.papel === 'admin' && (await contarAdmins(id)) === 0) {
    throw new ErroUsuario('Este é o único administrador ativo. Promova outra pessoa a admin antes.');
  }
  // session e account têm ON DELETE CASCADE (ver src/db/auth-schema.ts)
  await db.delete(tabelasAuth.user).where(eq(tabelasAuth.user.id, id));
}
