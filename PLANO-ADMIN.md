# Plano de construção — Painel Administrativo ACB Sul

Passo 2 (+ Passo 3) do CLAUDE.md. Uma etapa por vez; cada etapa termina com algo testável.

## Decisões de stack (fechadas em 10/06/2026)

| Item | Decisão |
|---|---|
| Hospedagem | **Ainda não decidida** — desenvolvimento com adapter Node (`@astrojs/node`); escolha final antes do go-live |
| Banco | **PostgreSQL gerenciado (Neon ou Supabase)** + Drizzle ORM |
| Imagens | **Cloudflare R2** (S3-compatível, sem custo de egress) |
| Auth | **Better-Auth** (usuário/senha, sem cadastro público) — Lucia foi descontinuado |
| Render público | Páginas institucionais continuam SSG; catálogo passa a SSR com cache (HTML sempre servido pelo servidor — princípio nº 1 do PRD). Se a hospedagem final tiver ISR (Vercel), migrar para revalidação on-demand |

## Etapa A — Fundação (servidor + banco)

1. `output: 'server'` no astro.config + `prerender = true` nas páginas estáticas atuais (nada muda no site público).
2. Adapter `@astrojs/node` (trocável depois conforme hospedagem).
3. Dependências: `drizzle-orm`, `drizzle-kit`, `pg`/`postgres`, `better-auth`, SDK S3 (R2).
4. Schema Drizzle espelhando os modelos já aprovados em `src/data/`:
   - `categorias` (campos de `categorias.ts`, incl. whatsappNumero/whatsappMensagem, seo, introducao, ativa, ordem)
   - `produtos` (campos atômicos de `produtos.ts`: slug, codigo, etiqueta, tipo, categoria, marca, nome-override, destaque, pitch, seo…)
   - `produto_imagens` (src, alt, principal, ordem)
   - `produto_specs` (rotulo, valor, ordem)
   - `produto_chips` (ou coluna JSON em produtos)
   - tabelas do Better-Auth (user, session…)
5. **Seed**: script que importa `categorias.ts` + `produtos.ts` para o banco.
6. `.env` com `DATABASE_URL` (Neon/Supabase) e credenciais R2.

**Aceite:** `npm run db:seed` popula o banco; uma rota de teste lê e devolve os produtos.

## Etapa B — Login e proteção

1. Better-Auth configurado (e-mail/senha), usuário admin criado por script — **sem rota de cadastro**.
2. Middleware Astro: `/admin/*` exige sessão válida; redirect para `/admin/login`.
3. `noindex` em todas as páginas do admin + bloqueio de `/admin` no robots.txt.

**Aceite:** acessar `/admin` sem login redireciona; com login entra.

## Etapa C — CRUD do catálogo

1. Layout do admin (navegação própria, sem o CSS público) + dashboard com listas e busca.
2. **Categorias:** editar nome, nomeCurto, ordem, introdução, SEO, ativa e **WhatsApp por categoria** (número + mensagem). `WhatsAppCTA`/links do site passam a ler do banco.
3. **Produtos:** criar/editar/desativar. Princípio do modelo aprovado: admin preenche o mínimo (codigo, tipo, categoria, chips, specs) e o sistema **deriva** nome, H1, SEO, alt e mensagem WhatsApp, com overrides opcionais. Preview dos valores derivados no formulário.
4. **Upload de imagens** para R2 (com alt derivado/override e marcação de principal).
5. Páginas públicas (`/produtos`, `/produtos/[categoria]/[produto]`, grade da Home) passam a ler do banco em vez dos arquivos TS. Os arquivos `src/data/*.ts` ficam apenas como seed histórico.

**Aceite:** cadastrar produto novo no admin → página pública renderiza no HTML servido, com schema Product e CTA correto.

## Etapa D — Publicação / cache

1. Catálogo SSR com cache HTTP (ou revalidação on-demand se Vercel).
2. Salvar no admin invalida o cache das páginas afetadas.
3. Sitemap passa a incluir produtos do banco.

**Aceite (PRD §8):** usuário não-técnico cadastra, publica, e a página sai atualizada.

## Etapa E — IA no painel (Passo 3)

1. Integração API Anthropic (prompt caching) no servidor — chave nunca exposta ao cliente.
2. Botões: "Gerar descrição" (150–400 palavras), "Gerar title+meta" (≤60/≤155), "Sugerir 3 FAQs".
3. Guardrails da seção 9 do CLAUDE.md no prompt + validação de limites no código.
4. Human-in-the-loop: resultado entra como rascunho editável, nunca publica direto.

## Pré-requisitos do cliente

- Criar projeto **Neon ou Supabase** → `DATABASE_URL`
- Criar bucket **Cloudflare R2** → access key, secret, endpoint, domínio público
- [CONFIRMAR] número de WhatsApp correto (necessário para a config por categoria valer em produção)
