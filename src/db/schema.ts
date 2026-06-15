// Schema do banco (Supabase/Postgres via Drizzle) — espelha os modelos
// aprovados em src/data/categorias.ts e src/data/produtos.ts, que servem
// de seed (scripts/seed.ts). Campos opcionais = NULL → derivadores compõem
// nome, H1, SEO, alt e mensagem de WhatsApp (mesma regra de produtos.ts).

import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

// Configurações globais do site — linha única (id = 1). Cada campo NULL/vazio
// significa "usar o padrão de src/data/empresa.ts". Editável em /admin/configuracoes.
export const configuracoes = pgTable('configuracoes', {
  id: integer('id').primaryKey().default(1),
  /** número geral de WhatsApp (fallback das categorias sem número) — só dígitos, formato wa.me */
  whatsappGeral: text('whatsapp_geral'),
  /** telefone fixo de exibição, ex.: (51) 3377-3626 */
  telefone: text('telefone'),
  email: text('email'),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow(),
});

export const categorias = pgTable('categorias', {
  id: serial('id').primaryKey(),
  /** identificador na URL (/produtos#slug e /produtos/[slug]/...) */
  slug: text('slug').notNull().unique(),
  nome: text('nome').notNull(),
  nomeCurto: text('nome_curto').notNull(),
  /** chave do ícone em cat-icons.ts */
  icone: text('icone').notNull(),
  ordem: integer('ordem').notNull().default(0),
  /** parágrafo editável da página de categoria (IA sugere, admin aprova) */
  introducao: text('introducao'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  /** roteamento de WhatsApp por categoria (PRD §8) — NULL = número geral */
  whatsappNumero: text('whatsapp_numero'),
  whatsappMensagem: text('whatsapp_mensagem'),
  /** esconder do site sem apagar */
  ativa: boolean('ativa').notNull().default(true),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow(),
});

export const produtos = pgTable('produtos', {
  id: serial('id').primaryKey(),
  /** identificador na URL — NULL = ainda sem slug (admin sugere a partir do nome) */
  slug: text('slug').unique(),
  /** nome do produto: único campo de identidade (ex.: "Compressor Elétrico Portátil E-AIR T500") */
  nome: text('nome').notNull(),
  categoriaId: integer('categoria_id')
    .notNull()
    .references(() => categorias.id),
  /** 2–3 chips curtos do card */
  specsChips: text('specs_chips').array().notNull().default([]),
  destaque: boolean('destaque').notNull().default(false),

  // ---- conteúdo da página própria (PDP) ----
  pitch: text('pitch'),
  /** parágrafos 150–400 palavras; 1º começa com afirmação direta (§9) */
  descricao: text('descricao').array(),

  // ---- SEO (NULL = derivado) ----
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),

  /** rascunho não aparece no site */
  publicado: boolean('publicado').notNull().default(true),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow(),
});

export const produtoImagens = pgTable('produto_imagens', {
  id: serial('id').primaryKey(),
  produtoId: integer('produto_id')
    .notNull()
    .references(() => produtos.id, { onDelete: 'cascade' }),
  src: text('src').notNull(),
  /** NULL = derivado (nome + Atlas Copco) */
  alt: text('alt'),
  principal: boolean('principal').notNull().default(false),
  ordem: integer('ordem').notNull().default(0),
});

// Leads recebidos pelo formulário "Solicitar mais informações" (PDP) e afins.
// Salvo antes de redirecionar o lead ao WhatsApp da categoria. Visível em /admin/leads.
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  /** de onde veio o lead: 'produto' (formulário da PDP) ou 'contato-direto' (form da home) */
  origem: text('origem').notNull().default('produto'),
  /** nome do produto de origem (NULL = formulário sem produto específico) */
  produto: text('produto'),
  /** slug da categoria — define o WhatsApp de destino */
  categoriaSlug: text('categoria_slug'),
  nome: text('nome').notNull(),
  telefone: text('telefone').notNull(),
  email: text('email').notNull(),
  /** Compra / Locação / Compra ou locação */
  interesse: text('interesse'),
  /** controle do admin: lead já retornado? */
  atendido: boolean('atendido').notNull().default(false),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
});

export const produtoSpecs = pgTable('produto_specs', {
  id: serial('id').primaryKey(),
  produtoId: integer('produto_id')
    .notNull()
    .references(() => produtos.id, { onDelete: 'cascade' }),
  rotulo: text('rotulo').notNull(),
  valor: text('valor').notNull(),
  ordem: integer('ordem').notNull().default(0),
});
