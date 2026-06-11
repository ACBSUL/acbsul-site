# Product

## Register

product

## Users

**Primário (admin):** funcionário não-técnico da ACB Sul (comercial/atendimento) que mantém o catálogo no dia a dia — cadastra produtos, ajusta o WhatsApp de cada categoria, publica conteúdo. Usa desktop no escritório e celular em campo. Não conhece HTML, SEO ou banco de dados; o sistema deriva isso para ele.

**Secundário (site público):** comprador industrial no RS/SC (engenheiro, compras, dono de obra) pesquisando compressores e equipamentos Atlas Copco. Chega via Google ou assistentes de IA, decide rápido e converte falando com um especialista no WhatsApp.

## Product Purpose

Painel administrativo do site da ACB Sul Compressores (catálogo de geração de leads, sem checkout). Permite que um usuário não-técnico gerencie categorias, produtos, imagens e o roteamento de WhatsApp por categoria — com nome, H1, SEO e mensagens derivados automaticamente das regras do PRD ("preencha o mínimo, o sistema compõe o resto"). Sucesso = o usuário cadastra e publica sozinho, e a página pública sai correta no HTML servido (SEO/GEO intactos), gerando leads qualificados por categoria.

## Brand Personality

Moderna · ágil · inovadora. No admin isso significa: interface limpa e rápida, fluxos curtos, automação visível (previews do que será derivado), zero burocracia visual. A modernidade serve a eficiência — não é decoração.

## Anti-references

- **Template genérico de catálogo/marketplace** (cara de loja pronta, WordPress de peças, Mercado Livre) — nem no site, nem no admin.
- **Sites dos concorrentes (Evolusul, Máximo)** — vencem por legibilidade de máquina, não por design; não copiar a estética deles.
- No admin: telas de ERP carregadas (dezenas de campos sem hierarquia) e dashboards de vaidade com métricas que ninguém usa.

## Design Principles

1. **Preencha o mínimo, o sistema deriva o resto.** Todo campo derivável mostra preview do valor final; o override é opcional e visível. O usuário nunca digita o que o sistema sabe compor.
2. **Publicar sem medo.** Toda ação dá feedback imediato, o estado público de cada item é sempre visível (publicado/rascunho/página própria), e ações destrutivas pedem confirmação. Errar é barato, desfazer é óbvio.
3. **O admin é tão rápido quanto o site.** Server-rendered, sem espera sem feedback, formulários curtos. Agilidade é a personalidade da marca aplicada ao fluxo de trabalho.
4. **Uma fonte de verdade.** O que o admin mostra é o que o site serve — mesmas regras de derivação, mesmo conteúdo, sem surpresa entre salvar e publicar.
5. **Funciona no celular do gestor.** Listas, formulários e upload utilizáveis em 375px — o catálogo se atualiza de onde o trabalho acontece.

## Accessibility & Inclusion

Sem requisito formal de conformidade (WCAG não auditado). Linha de base de boas práticas: navegação por teclado com foco visível, labels em todos os campos, contraste legível, alvos de toque adequados no mobile e `lang="pt-BR"`. Acessibilidade tratada como qualidade, não como certificação.
