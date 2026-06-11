# CLAUDE.md — Projeto ACB Sul Compressores

Contexto de engenharia para a reconstrução do site da **ACB Sul Compressores**.
A fonte de verdade completa é [PRD-acbsul-site.html](PRD-acbsul-site.html) — leia-o antes de qualquer página.
Este arquivo resume as regras operacionais e registra **um override de stack**.

---

## ⚠️ prioritário
Sempre responda tudo em Portuguê simples de fácil entendimento.

## ⚠️ Override de stack (PRD desatualizado neste ponto)

O PRD (seção 4) recomenda **Next.js**. **Ignorar.** A decisão do cliente é construir em **Astro**.
Tudo o mais no PRD permanece válido (princípios, conteúdo, arquitetura de informação, schema, QA).
Onde o PRD disser "Next.js / App Router / NextAuth / ISR nativo", traduza para os equivalentes Astro abaixo.

---

## 1. O que é o projeto (tese estratégica)

Rebuild do site da ACB Sul otimizado para **SEO** e **GEO (Generative Engine Optimization)** — ser
citado por ChatGPT, Gemini, Perplexity e Google AI Overviews. Os concorrentes (Evolusul, Máximo)
vencem hoje **não por serem melhores, mas por serem mais legíveis por máquina**. A ACB Sul tem
autoridade real maior (distribuidora **Atlas Copco**, 40+ anos, portfólio amplo) mas péssima
apresentação legível por máquina.

**Tese:** transformar a autoridade real em **fatos explícitos, estruturados (Schema.org) e
ancorados geograficamente em Porto Alegre/RS**, em **HTML renderizado no servidor**.

Modelo de negócio: **catálogo de geração de leads, SEM checkout**. Conversão = solicitação de
orçamento + **direcionamento de WhatsApp por categoria** (cada categoria conecta ao especialista certo).

**Termos-alvo:** "empresa de compressores RS", "distribuidor Atlas Copco RS", "assistência técnica de
compressores Porto Alegre".

---

## 2. Princípios NÃO-NEGOCIÁVEIS (valem para todas as páginas)

1. **Conteúdo no HTML renderizado pelo servidor.** Todo texto relevante no HTML inicial — nunca
   montado só por JS no cliente. (Em Astro: conteúdo em `.astro`, não dentro de ilhas client-side.)
2. **Densidade de fatos da entidade.** Toda página de destino afirma: empresa = ACB Sul; atividade =
   compressores/equipamentos industriais; marca = distribuidor autorizado Atlas Copco; local = Porto
   Alegre/RS; atendimento = RS e SC; longevidade = mais de 40 anos.
3. **Ancoragem geográfica explícita** ("Porto Alegre", "Rio Grande do Sul", "RS", "região
   metropolitana", "interior") em texto, não só no mapa.
4. **Coocorrência com a marca-âncora Atlas Copco** em title, H1 e corpo.
5. **Blocos citáveis:** a 1ª frase de cada resposta de FAQ e de cada bloco definicional é uma
   afirmação direta e completa.
6. **Dados estruturados Schema.org** em todas as páginas aplicáveis
   (Organization/LocalBusiness global; Product; Service; FAQPage; BreadcrumbList).
7. **Encoding UTF-8** em todo o site.
8. **Performance e mobile-first:** Core Web Vitals no verde; tudo responsivo.

> Instrução-chave do PRD para todo prompt de construção: *"Requisito inegociável: o texto de conteúdo
> deve estar no HTML renderizado pelo servidor, não montado apenas no cliente."*

---

## 3. Identidade e dados da empresa (fonte única)

Itens marcados **[CONFIRMAR]** precisam de validação do cliente antes do go-live.

- **Nome:** ACB Sul Compressores
- **Posicionamento:** Distribuidor autorizado Atlas Copco no Rio Grande do Sul
- **Longevidade:** mais de 40 anos **[CONFIRMAR ano de fundação]**
- **Sede:** Rua Santa Catarina, 304 — Santa Maria Goretti, Porto Alegre/RS — CEP 91030-330
- **Telefone:** (51) 3377-3626
- **E-mail:** adm@acbsulcompressores.com.br
- **WhatsApp:** **[CONFIRMAR — nº atual malformado]**
- **Horário:** Seg–Sex, 8h–12h e 13h–17h
- **Atuação:** Rio Grande do Sul e Santa Catarina
- **Portfólio (preservar amplitude — é vantagem competitiva):** compressores de parafuso, pistão e
  portáteis; tratamento de ar (secadores, filtros, separadores); geradores de energia; geradores de
  nitrogênio; torre de iluminação; bombas de vácuo; rompedores; perfuratriz; motobombas; peças e kits
  originais Atlas Copco.

Textos institucionais prontos (usar literalmente): ver Anexo 12.2 do PRD (EntityBlock, bloco
definicional de Serviços), Anexo 12.4 (12 FAQs prontas), Anexo 12.1 (titles/metas), Anexo 12.3 (JSON-LD).

---

## 4. Stack (Astro)

| Camada | Decisão | Equivalência ao PRD |
|---|---|---|
| Framework | **Astro** (modo híbrido `output: 'server'`, `prerender` por rota) | substitui Next.js App Router |
| Render institucional | **SSG** (`export const prerender = true`) | = SSG do PRD |
| Render catálogo | **SSR sob demanda + cache**, ou SSG com **revalidação on-demand** (ISR via adapter Vercel) | = "SSG/ISR" do PRD |
| Banco | **PostgreSQL** (SQLite aceitável no início) | igual ao PRD |
| ORM | **Drizzle ORM** (type-safe, SQL-first) | — |
| Auth admin | **Better-Auth** ou **Lucia** — sessão usuário/senha, sem cadastro público | substitui NextAuth |
| Estilização | **Tailwind CSS**, mobile-first | igual ao PRD |
| Ilhas interativas | React/Svelte só onde necessário (carrossel, acordeão, forms do admin) | — |
| IA no painel | **API Anthropic (Claude)** com prompt caching | igual ao PRD |
| Imagens | `astro:assets` + CDN (Cloudflare R2 / Cloudinary), `loading="lazy"` exceto LCP | — |
| Deploy | Vercel ou Cloudflare (edge) — adapter Astro correspondente | — |

**Requisitos transversais obrigatórios:**
- `sitemap.xml` + `robots.txt` automáticos (`@astrojs/sitemap`); `robots.txt` libera GPTBot, ClaudeBot,
  PerplexityBot, OAI-SearchBot, Google-Extended.
- Title + meta description únicos por página (Anexo 12.1).
- Open Graph + Twitter Card em todas as páginas.
- `<html lang="pt-BR">`; um único `<h1>` por página; hierarquia de headings correta.
- URLs limpas e semânticas em português (seção 6).
- HTTPS + redirect **301** das URLs antigas (Anexo 12.5).
- Considerar `llms.txt` na raiz (reforço de GEO).

---

## 5. Componentes reutilizáveis (stubs no bootstrap)

1. **`EntityBlock`** — bloco institucional curto (2–3 frases) com os fatos da empresa. Topo da home e
   rodapé de toda página de destino. É a "frase citável" padrão (texto em Anexo 12.2.1).
2. **`WhatsAppCTA categoria`** — botão "Falar com especialista". Abre `wa.me/<numero>?text=<msg>` com
   número e mensagem vindos da **config por categoria** no painel.
3. **`LeadForm`** — formulário (nome, e-mail, telefone, categoria, mensagem). Validar campos; **sem
   dados pessoais em query string**; **sem envio a endpoints não confiáveis**.
4. **`FAQAccordion`** — pares P/R + injeção automática de `FAQPage`.
5. **`ProductCard`** e **`SpecTable`** — card de catálogo e tabela de specs.
6. **`Breadcrumb`** — com `BreadcrumbList`.
7. **`LocalBusinessSchema`** — JSON-LD global (Anexo 12.3) em todas as páginas.

---

## 6. Arquitetura de informação

| Página | URL | Render | Schema |
|---|---|---|---|
| Home | `/` | SSG | Organization, LocalBusiness, WebSite |
| Empresa | `/empresa` | SSG | AboutPage, Organization |
| Produtos (catálogo) | `/produtos` | SSG/ISR | CollectionPage, BreadcrumbList |
| Categoria | `/produtos/[categoria]` | SSG/ISR | CollectionPage, BreadcrumbList |
| Produto | `/produtos/[categoria]/[produto]` | SSG/ISR | Product, BreadcrumbList |
| Peças | `/pecas` | SSG/ISR | CollectionPage |
| Serviços | `/servicos` | SSG | Service, FAQPage |
| Locação | `/locacao` | SSG | Service, FAQPage |
| Contato | `/contato` | SSG | ContactPage, LocalBusiness |
| FAQ | `/faq` | SSG | FAQPage |
| Pilar Atlas Copco | `/distribuidor-atlas-copco-rs` | SSG (Fase 2) | Service, FAQPage |
| Admin | `/admin/*` | SSR protegido | **noindex** |

URLs antigas (`/produto/categoria/...`, `/pagina/institucional/...`) → **301** (Anexo 12.5).
Levantar lista completa via Search Console/sitemap antigo antes do go-live.

**Categorias do catálogo (preservar portfólio amplo):** Parafuso · Pistão · Portáteis · Tratamento de
Ar · Geradores de Energia · Geradores de Nitrogênio · Torre de Iluminação · Bombas de Vácuo ·
Rompedores · Perfuratriz · Motobombas · Peças e Acessórios.

---

## 7. Pontos de aceite por página (resumo — detalhe na seção 7 do PRD)

- **Home** `/` — H1: "Compressores Industriais e Assistência Técnica Atlas Copco no RS". Ordem dos
  blocos: hero c/ banners rotativos + CTA → **EntityBlock** (maior impacto GEO) → grade de linhas c/
  `WhatsAppCTA` → serviços → "Por que ACB Sul" → mini-FAQ (4) → EntityBlock+contato no rodapé.
  *Aceite:* HTML servido contém "distribuidor autorizado Atlas Copco", "Porto Alegre", "Rio Grande do
  Sul" e "mais de 40 anos" **antes** de qualquer card de produto.
- **Empresa** `/empresa` — ≥ 500 palavras de prosa factual; sem H1 genérico "Quem Somos".
- **Produtos** — Categoria: H1 = nome + "no RS", parágrafo introdutório editável (IA), grade,
  `WhatsAppCTA` da categoria. Produto: H1 com termo semântico além do código (ex.: "GA 11-30 VSD —
  Compressor de Parafuso Atlas Copco"), `SpecTable`, descrição ≥ 150 palavras, CTA + LeadForm,
  relacionados. *Aceite:* todo título de produto tem termo semântico além do código.
- **Peças** `/pecas` — kits originais Atlas Copco (250h/500h/1000h) + `WhatsAppCTA categoria=pecas`.
- **Serviços** `/servicos` — H1: "Assistência Técnica Especializada em Compressores no RS"; bloco
  definicional citável (Anexo 12.2.2) + FAQ. Schema Service + FAQPage.
- **Locação** `/locacao` — H1: "Locação de Compressores, Geradores e Torres de Iluminação no RS";
  bloco "locação ou compra?". Service + FAQPage.
- **Contato** `/contato` — LeadForm, Google Maps embed, WhatsApp, telefone, e-mail, horário.
  ContactPage + LocalBusiness. Sem dados pessoais em URL.
- **FAQ** `/faq` — **maior ganho rápido**: 15–25 perguntas reais (12 prontas no Anexo 12.4), 1ª frase =
  afirmação direta, FAQPage obrigatório, zero placeholders, validar no Rich Results Test.

---

## 8. Painel administrativo inteligente

- **Acesso:** login usuário/senha; rotas `noindex`; sessão segura; **sem cadastro público**.
- **CRUD de catálogo:** categorias e produtos (nome, código, categoria, specs, descrição, imagens, destaque).
- **WhatsApp por categoria:** número de destino + mensagem pré-preenchida; `WhatsAppCTA` lê essa config.
- **IA assistida (API Anthropic):** "Gerar descrição" (≥150 palavras), "Gerar title + meta", "Sugerir
  3 FAQs". **Human-in-the-loop:** a IA sugere, o admin revisa e aprova.
- **Publicação:** salvar dispara revalidação on-demand das páginas afetadas.
- *Aceite:* usuário não-técnico cadastra produto, gera descrição por IA, revisa e publica — e a página
  pública renderiza o conteúdo **no HTML servido**.

---

## 9. Guardrails do conteúdo gerado por IA

Toda descrição deve: (a) começar com afirmação direta do que é o produto; (b) citar a aplicação
industrial; (c) mencionar Atlas Copco quando aplicável; (d) evitar marketing vago; (e) 150–400 palavras.
**Title ≤ 60 caracteres; meta ≤ 155.**

---

## 10. Critérios de aceite globais (QA)

- [ ] `EntityBlock` no HTML servido de todas as páginas de destino.
- [ ] Title/meta únicos por página, com Atlas Copco + RS onde aplicável.
- [ ] JSON-LD válido (Organization, LocalBusiness, Product, Service, FAQPage, BreadcrumbList) — testado
      no Rich Results Test.
- [ ] FAQ sem placeholders, com FAQPage.
- [ ] UTF-8 correto em todas as páginas.
- [ ] 301 das URLs antigas configuradas.
- [ ] `sitemap.xml` e `robots.txt` presentes e corretos.
- [ ] Mobile-first; Core Web Vitals no verde.
- [ ] WhatsApp routing por categoria funcionando a partir do painel.
- [ ] Admin protegido por login; `noindex` em `/admin`.

---

## 11. Ordem de construção (um passo por vez — não pedir tudo de uma vez)

- **Passo 0 — Bootstrap:** projeto Astro híbrido + Tailwind + Postgres/Drizzle com a arquitetura da
  seção 6. Componentes da seção 5 como stubs. UTF-8, `lang="pt-BR"`, sitemap, robots, JSON-LD global.
- **Passo 1 — Páginas estáticas de conteúdo (maior impacto GEO primeiro):** Home → Empresa → Serviços
  → Locação → FAQ. Para cada uma, usar spec da seção 7 + textos dos anexos. HTML servido, H1 conforme
  PRD, EntityBlock e schema.
- **Passo 2 — Catálogo + admin:** modelo de dados (categoria, produto, config WhatsApp), CRUD, auth,
  categoria/produto com revalidação on-demand, `WhatsAppCTA` lendo config por categoria.
- **Passo 3 — IA no painel:** integração API Anthropic com guardrails da seção 9.
- **Passo 4 — Pilar Atlas Copco + 301 + QA** contra o checklist da seção 10.

---

## Pendências do cliente [CONFIRMAR antes do go-live]

Ano de fundação · número de WhatsApp correto · estrutura física (oficina/frota) · lista completa de
URLs antigas para 301.

## acesso do projeto
acbsulpoa@gmail.com
@ACBsul130417*

Supabase:
Project Name: ACBSUL - Site
Password: jkvw.DQ@#E#hK4Q

GitHub para publicação: https://github.com/ACBSUL/acbsul-site