# Sitemap de Design — Site ACB Sul Compressores

Mapa de páginas e blocos para geração de design. Cada página lista os blocos **na ordem de cima para
baixo**. O modelo de negócio é **catálogo gerador de leads (sem checkout)**: a conversão é sempre
"solicitar orçamento" via **WhatsApp por categoria** ou formulário.

---

## Direção visual (briefing para o designer)

- **Setor:** industrial / ar comprimido. Tom: **técnico, confiável, robusto** — não "startup".
- **Marca-âncora:** Atlas Copco (presença forte, é o maior diferencial). Cor institucional puxa para
  **azul industrial** (~#0A4FA0 / azul profundo #072F5F), com **acento laranja de segurança** (~#E2560F)
  para CTAs e destaques.
- **Base:** fundo claro neutro, muito respiro, tipografia sólida (display forte para títulos, sans
  legível para corpo, mono opcional para specs/códigos de produto).
- **Mobile-first** e responsivo. Performance é requisito (Core Web Vitals no verde).
- **Geografia visível:** Porto Alegre / RS aparece em texto, não só no mapa.
- **CTAs primários:** "Solicitar Orçamento" e "Falar com Especialista (WhatsApp)" — botões de alto
  contraste, sempre visíveis.

---

## Elementos globais (em todas as páginas)

- **Header / Navbar:** logo ACB Sul · selo "Distribuidor Autorizado Atlas Copco" · menu (Home,
  Empresa, Produtos, Peças, Serviços, Locação, Contato) · telefone (51) 3377-3626 · botão WhatsApp.
- **Botão flutuante de WhatsApp** (canto inferior, mobile e desktop).
- **EntityBlock** (bloco institucional citável, 2–3 frases com os fatos da empresa) — aparece no
  **rodapé de toda página de destino** e no topo da Home.
- **Footer:** EntityBlock · endereço (Rua Santa Catarina, 304 — Porto Alegre/RS) · telefone · e-mail ·
  horário (Seg–Sex 8h–12h / 13h–17h) · atuação RS e SC · links rápidos · selo Atlas Copco.

---

## Árvore de páginas

```
/
├── /empresa
├── /produtos                      (catálogo — índice de categorias)
│   └── /produtos/[categoria]      (ex.: /produtos/compressores-de-parafuso)
│       └── /produtos/[categoria]/[produto]
├── /pecas
├── /servicos
├── /locacao
├── /contato
├── /faq
├── /distribuidor-atlas-copco-rs   (página-pilar — Fase 2)
└── /admin/*                       (painel — design separado, ver seção própria)
```

---

## Páginas — blocos por página (de cima para baixo)

### 1. Home `/`
H1: **"Compressores Industriais e Assistência Técnica Atlas Copco no RS"**
1. **Hero** — banners rotativos (carrossel) com destaque de compressores + CTA de lead.
2. **EntityBlock** (logo abaixo do hero — maior impacto GEO). Texto factual da empresa.
3. **Grade de linhas de produto** — cards por categoria, cada card com botão **"Falar com Especialista"** (WhatsApp da categoria).
4. **Bloco de Serviços** — assistência técnica, manutenção, peças, locação.
5. **"Por que ACB Sul"** — diferenciais (Atlas Copco, 40+ anos, cobertura RS/SC, peças originais).
6. **Mini-FAQ** (4 perguntas) → link para `/faq`.
7. **Faixa de contato / EntityBlock no rodapé.**

### 2. Empresa `/empresa`
H1: **"Distribuidor Atlas Copco e Especialista em Compressores Industriais no RS"**
1. Hero curto institucional.
2. **Prosa factual ≥ 500 palavras** — trajetória, valores, diferenciais técnicos, vínculo Atlas Copco.
3. Bloco de cobertura (RS e SC) — mapa/região.
4. Números / destaques (40+ anos, estrutura).
5. CTA de contato + EntityBlock no rodapé.

### 3. Produtos — índice do catálogo `/produtos`
1. Hero/intro do catálogo.
2. **Grade de categorias** (12): Parafuso · Pistão · Portáteis · Tratamento de Ar · Geradores de
   Energia · Geradores de Nitrogênio · Torre de Iluminação · Bombas de Vácuo · Rompedores ·
   Perfuratriz · Motobombas · Peças e Acessórios.
3. Breadcrumb.
4. EntityBlock no rodapé.

### 3a. Categoria `/produtos/[categoria]`
H1: **nome da categoria + "no RS"**
1. Breadcrumb.
2. **Parágrafo introdutório** editável (gerado por IA) — no HTML.
3. **Grade de ProductCards.**
4. **WhatsAppCTA específico da categoria** ("Falar com especialista em [categoria]").
5. EntityBlock no rodapé.

### 3b. Produto `/produtos/[categoria]/[produto]`
H1: **termo semântico + código** (ex.: "GA 11-30 VSD — Compressor de Parafuso Atlas Copco")
1. Breadcrumb.
2. **Galeria de imagens** + bloco principal (nome, código, selo Atlas Copco).
3. **SpecTable** — tabela de especificações técnicas.
4. **Descrição ≥ 150 palavras.**
5. **CTA "Solicitar Orçamento" + LeadForm** (ou WhatsApp da categoria).
6. **Produtos relacionados.**
7. EntityBlock no rodapé.

### 4. Peças `/pecas`
1. Hero — "Peças e Kits Originais Atlas Copco".
2. Blocos de kits (250h / 500h / 1000h).
3. **WhatsAppCTA categoria=pecas.**
4. EntityBlock no rodapé.

### 5. Serviços `/servicos`
H1: **"Assistência Técnica Especializada em Compressores no RS"**
1. Hero.
2. **Bloco definicional citável** (1ª frase = afirmação direta sobre manutenção preventiva).
3. Cards de serviços (preventiva, corretiva, peças originais, controle por horímetro).
4. **FAQAccordion** (Service + FAQPage).
5. CTA + EntityBlock no rodapé.

### 6. Locação `/locacao`
H1: **"Locação de Compressores, Geradores e Torres de Iluminação no RS"**
1. Hero.
2. Equipamentos disponíveis para aluguel (indústrias e obras).
3. Vantagens (pronta-entrega, revisados, sem CAPEX).
4. **Bloco "Locação ou compra: qual escolher?"**
5. **LeadForm + CTA.**
6. FAQAccordion. EntityBlock no rodapé.

### 7. Contato `/contato`
1. **LeadForm dinâmico** (nome, e-mail, telefone, categoria, mensagem).
2. **Google Maps embed** (sede em Porto Alegre).
3. Canais diretos: WhatsApp, telefone, e-mail, horário.
4. EntityBlock no rodapé.

### 8. FAQ `/faq`
1. Hero — "Perguntas Frequentes sobre Compressores Industriais".
2. **FAQAccordion** com 15–25 perguntas (1ª frase de cada resposta = afirmação direta).
3. CTA de contato. EntityBlock no rodapé.

### 9. Pilar Atlas Copco `/distribuidor-atlas-copco-rs` (Fase 2)
1. Hero de autoridade.
2. Prosa afirmando o vínculo de distribuição.
3. Links para assistência técnica, peças e compressores.
4. FAQAccordion. EntityBlock no rodapé.

---

## Painel administrativo `/admin/*` (design à parte, não-público, `noindex`)

- **Tela de login** (usuário/senha, sem cadastro público).
- **Dashboard** — visão geral do catálogo + leads recebidos.
- **CRUD de Produtos** — formulário (nome, código, categoria, specs, descrição, imagens, destaque) com
  botões de **IA**: "Gerar descrição", "Gerar title + meta", "Sugerir 3 FAQs" (IA sugere → admin
  revisa/aprova).
- **CRUD de Categorias.**
- **Config de WhatsApp por categoria** — número de destino + mensagem pré-preenchida.
- **Caixa de Leads** — submissões dos formulários.

Estética do admin: utilitária, densa, clara — foco em produtividade, não em marketing.

---

## Componentes reutilizáveis (para o design system)

`EntityBlock` · `WhatsAppCTA` · `LeadForm` · `FAQAccordion` · `ProductCard` · `SpecTable` ·
`Breadcrumb` · Header · Footer · Botão WhatsApp flutuante · Hero/Carrossel.
