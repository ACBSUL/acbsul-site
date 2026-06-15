// Camada de leitura do catálogo no banco (Etapa C). Entrega os MESMOS
// formatos de src/data/categorias.ts e src/data/produtos.ts, então os
// derivadores (nomeProduto, h1Produto, seoTitleProduto…) e o markup das
// páginas continuam funcionando sem mudanças.

import { asc } from 'drizzle-orm';
import { db, tabelas } from '../db';
import type { Categoria } from '../data/categorias';
import type { Produto, ProdutoImagem, ProdutoSpec } from '../data/produtos';

export interface CategoriaDb extends Categoria {
  id: number;
}

export interface ProdutoDb extends Produto {
  id: number;
  categoriaId: number;
  criadoEm: Date;
}

const ou = <T>(v: T | null): T | undefined => v ?? undefined;

export async function carregarCategorias(): Promise<CategoriaDb[]> {
  const rows = await db
    .select()
    .from(tabelas.categorias)
    .orderBy(asc(tabelas.categorias.ordem));
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    nome: r.nome,
    nomeCurto: r.nomeCurto,
    icone: r.icone,
    ordem: r.ordem,
    introducao: ou(r.introducao),
    seoTitle: ou(r.seoTitle),
    seoDescription: ou(r.seoDescription),
    whatsappNumero: ou(r.whatsappNumero),
    whatsappMensagem: ou(r.whatsappMensagem),
    ativa: r.ativa,
  }));
}

export async function carregarProdutos(): Promise<ProdutoDb[]> {
  const [cats, prods, imgs, specs] = await Promise.all([
    db.select().from(tabelas.categorias),
    db.select().from(tabelas.produtos).orderBy(asc(tabelas.produtos.id)),
    db
      .select()
      .from(tabelas.produtoImagens)
      .orderBy(asc(tabelas.produtoImagens.produtoId), asc(tabelas.produtoImagens.ordem)),
    db
      .select()
      .from(tabelas.produtoSpecs)
      .orderBy(asc(tabelas.produtoSpecs.produtoId), asc(tabelas.produtoSpecs.ordem)),
  ]);

  const slugCategoria = new Map(cats.map((c) => [c.id, c.slug]));

  const imagensPor = new Map<number, ProdutoImagem[]>();
  for (const i of imgs) {
    const lista = imagensPor.get(i.produtoId) ?? [];
    lista.push({ src: i.src, alt: ou(i.alt), principal: i.principal });
    imagensPor.set(i.produtoId, lista);
  }

  const specsPor = new Map<number, ProdutoSpec[]>();
  for (const s of specs) {
    const lista = specsPor.get(s.produtoId) ?? [];
    lista.push({ rotulo: s.rotulo, valor: s.valor });
    specsPor.set(s.produtoId, lista);
  }

  return prods.map((r) => ({
    id: r.id,
    categoriaId: r.categoriaId,
    slug: r.slug ?? '',
    nome: r.nome,
    categoria: (slugCategoria.get(r.categoriaId) ?? '') as Produto['categoria'],
    specsChips: r.specsChips ?? [],
    imagens: imagensPor.get(r.id) ?? [],
    destaque: r.destaque,
    pitch: ou(r.pitch),
    descricao: r.descricao ?? undefined,
    especificacoes: specsPor.get(r.id) ?? [],
    seoTitle: ou(r.seoTitle),
    seoDescription: ou(r.seoDescription),
    publicado: r.publicado,
    criadoEm: r.criadoEm,
  }));
}

/* ---------- utilidades do admin ---------- */

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "chip1, chip2, chip3" → ['chip1','chip2','chip3'] */
export const parseChips = (s: string): string[] =>
  s.split(',').map((x) => x.trim()).filter(Boolean);

/** uma spec por linha: "Rótulo | Valor" */
export const parseSpecs = (s: string): ProdutoSpec[] =>
  s
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [rotulo, ...resto] = l.split('|');
      return { rotulo: rotulo.trim(), valor: resto.join('|').trim() };
    })
    .filter((x) => x.rotulo && x.valor);

/** parágrafos separados por linha em branco */
export const parseParagrafos = (s: string): string[] =>
  s
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
