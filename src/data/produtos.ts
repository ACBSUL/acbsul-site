// Modelo padronizado de PRODUTO (aprovado pelo cliente — espelha as futuras
// tabelas `produtos`, `produto_imagens` e `produto_specs` do banco no Passo 2;
// este arquivo vira o seed).
//
// Princípio: campos atômicos + composição por regra — o admin preenche o mínimo
// e o sistema deriva nome, H1, SEO, alt e mensagem de WhatsApp (com override
// opcional). Specs vêm dos nomes de arquivo de _fotos-produtos/ ou de fonte
// oficial Atlas Copco — NUNCA inventar números.
//
// A página própria (/produtos/[categoria]/[slug]) existe quando o produto tem
// pitch + descricao + especificacoes completos (ver temPaginaPropria).

import type { CategoriaSlug } from './categorias';

export interface ProdutoImagem {
  src: string;
  /** vazio = derivado por altImagem() */
  alt?: string;
  principal?: boolean;
}

/** linha da tabela de especificações técnicas (flexível por tipo de produto) */
export interface ProdutoSpec {
  rotulo: string;
  valor: string;
}

export interface Produto {
  /** identificador na URL */
  slug: string;
  /** código/modelo Atlas Copco — só o modelo (ex.: "QAS 140") */
  codigo: string;
  /** complemento exibido junto ao código (ex.: "Diesel", "VSD", "Stage V") */
  etiqueta?: string;
  /** termo semântico obrigatório (PRD §7 — nenhum produto é só código) */
  tipo: string;
  categoria: CategoriaSlug;
  /** default "Atlas Copco" */
  marca?: string;
  /** override do nome de exibição (vazio = `tipo + codigo`) */
  nome?: string;
  /** 2–3 chips curtos do card */
  specsChips: string[];
  /** galeria — primeira (ou principal:true) é a imagem do card/OG */
  imagens: ProdutoImagem[];
  /** destaque no catálogo (PRD §8) */
  destaque?: boolean;

  // ---- conteúdo da página própria (PDP) ----
  /** parágrafo de abertura, 1–2 frases (HTML simples permitido) */
  pitch?: string;
  /** parágrafos 150–400 palavras; 1º começa com <b>afirmação direta</b> (guardrails §9) */
  descricao?: string[];
  /** tabela técnica rótulo/valor */
  especificacoes?: ProdutoSpec[];

  // ---- SEO (vazio = derivado) ----
  /** ≤ 60 caracteres */
  seoTitle?: string;
  /** ≤ 155 caracteres */
  seoDescription?: string;

  /** rascunho não aparece no site (default true) */
  publicado?: boolean;
}

/* ============================================================
   DERIVADORES — composição por regra, com override por campo
   ============================================================ */

const MARCA_PADRAO = 'Atlas Copco';

export const marcaDe = (p: Produto): string => p.marca ?? MARCA_PADRAO;

/** nome de exibição (card, form, schema): override ou `tipo + codigo` */
export const nomeProduto = (p: Produto): string => p.nome ?? `${p.tipo} ${p.codigo}`;

/** H1 do PDP: "CÓDIGO — Tipo Marca" */
export const h1Produto = (p: Produto): string => `${p.codigo} — ${p.tipo} ${marcaDe(p)}`;

/** código + etiqueta para o <span class="code"> */
export const codigoEtiqueta = (p: Produto): string =>
  p.etiqueta ? `${p.codigo} · ${p.etiqueta}` : p.codigo;

export const imagemPrincipal = (p: Produto): ProdutoImagem | null =>
  p.imagens.find((i) => i.principal) ?? p.imagens[0] ?? null;

export const altImagem = (p: Produto, img: ProdutoImagem): string =>
  img.alt ?? `${nomeProduto(p)} ${marcaDe(p)}`;

/** o produto tem página própria quando o conteúdo de PDP está completo */
export const temPaginaPropria = (p: Produto): boolean =>
  Boolean(p.pitch && p.descricao?.length && p.especificacoes?.length);

export const urlProduto = (p: Produto): string => `/produtos/${p.categoria}/${p.slug}`;

/** mensagem pré-preenchida de WhatsApp do card */
export const waMsgProduto = (p: Produto, nomeCategoria: string): string =>
  `Olá! Quero um orçamento: ${nomeProduto(p)} (${nomeCategoria}).`;

/** <title> do PDP (override ou derivado; validar ≤60 no admin) */
export const seoTitleProduto = (p: Produto): string =>
  p.seoTitle ?? `${p.codigo} · ${p.tipo} ${marcaDe(p)} | ACB Sul`;

/** meta description do PDP (override ou derivado; validar ≤155 no admin) */
export const seoDescriptionProduto = (p: Produto): string =>
  p.seoDescription ??
  `${nomeProduto(p)} ${marcaDe(p)}. Venda e locação com assistência técnica no RS e SC — ACB Sul, Porto Alegre.`;

/** contagem de produtos publicados por categoria (chips de filtro) */
export function contagemPorCategoria(): Record<string, number> {
  const n: Record<string, number> = {};
  for (const p of produtos) {
    if (p.publicado === false) continue;
    n[p.categoria] = (n[p.categoria] ?? 0) + 1;
  }
  return n;
}

const P = '/assets/products';

/* ============================================================
   CATÁLOGO (seed)
   ============================================================ */

export const produtos: Produto[] = [
  // ========== COMPRESSORES ELÉTRICOS ==========
  {
    slug: 'ga-gx',
    codigo: 'GA · GX',
    tipo: 'Compressor de Parafuso',
    nome: 'Compressores de Parafuso GA e GX',
    categoria: 'compressores-eletricos',
    specsChips: ['Parafuso lubrificado', 'Uso contínuo', 'Indústria'],
    imagens: [
      {
        src: `${P}/compressores-eletricos/ga-gx.png`,
        alt: 'Compressor de parafuso elétrico Atlas Copco das linhas GA e GX',
      },
    ],
  },
  {
    slug: 'ga-11-30-vsd',
    codigo: 'GA 11⁺-30',
    etiqueta: 'VSD',
    tipo: 'Compressor de Parafuso',
    nome: 'Compressor de Parafuso GA 11⁺-30 VSD',
    categoria: 'compressores-eletricos',
    specsChips: ['11–30 kW', 'Velocidade variável', 'Economia de energia'],
    imagens: [
      {
        src: `${P}/compressores-eletricos/ga-11-30-vsd.png`,
        alt: 'Compressor de parafuso Atlas Copco GA 11+-30 com tecnologia VSD',
      },
    ],
  },

  // ========== COMPRESSORES PORTÁTEIS ==========
  {
    slug: 'e-air-t500',
    codigo: 'E-AIR T500',
    etiqueta: 'Elétrico',
    tipo: 'Compressor Elétrico Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['100% elétrico', 'Zero emissões locais', 'Baixo ruído'],
    imagens: [
      {
        src: `${P}/compressores-portateis/e-air-t500.jpeg`,
        alt: 'Compressor elétrico portátil Atlas Copco E-AIR T500',
      },
    ],
    // ---- PDP (specs de fonte oficial Atlas Copco / LECTURA) ----
    pitch:
      'Compressor de ar portátil <b>100% elétrico</b> com vazão de até <b>13,9 m³/min (≈ 490 pcm)</b> e pressão ajustável de 4 a 10,3 bar — ar comprimido sem diesel, sem emissões locais e com baixo nível de ruído, ideal para obras urbanas e ambientes fechados.',
    descricao: [
      '<b>O Atlas Copco E-AIR T500 é um compressor de ar portátil 100% elétrico que entrega até 13,9 m³/min (≈ 490 pcm) com pressão ajustável de 4 a 10,3 bar — sem consumo de diesel e sem emissões locais.</b> O motor elétrico de 90 kW com acionamento de velocidade variável (VSD) ajusta a rotação à demanda real de ar, reduzindo o consumo de energia em comparação com equipamentos de velocidade fixa, e a partida suave reduz o pico de corrente na rede.',
      'Por dispensar combustão, o E-AIR T500 pode trabalhar em locais onde um compressor a diesel não entra: túneis, ambientes fechados, indústrias e centros urbanos com restrição de ruído e de emissões. O sistema de regulagem eletrônica de pressão permite ajustar o ponto de trabalho com precisão, cobrindo desde ferramentas pneumáticas e perfuração até jateamento — um único equipamento para diferentes frentes de serviço. A operação silenciosa também viabiliza turnos noturnos em área urbana.',
      'Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul fornece o E-AIR T500 para <b>venda ou locação</b>, com dimensionamento técnico, peças originais e assistência em campo em todo o RS e Santa Catarina. Solicite um orçamento e receba a indicação adequada à pressão e à vazão da sua operação.',
    ],
    especificacoes: [
      { rotulo: 'Modelo', valor: 'E-AIR T500' },
      { rotulo: 'Tipo', valor: 'Compressor de parafuso portátil — 100% elétrico' },
      { rotulo: 'Vazão (FAD)', valor: 'até 13,9 m³/min (≈ 490 pcm)' },
      { rotulo: 'Pressão de trabalho', valor: '4 – 10,3 bar (regulagem eletrônica)' },
      { rotulo: 'Motor', valor: 'Elétrico · 90 kW' },
      { rotulo: 'Alimentação', valor: '380 – 575 V · 50/60 Hz' },
      { rotulo: 'Acionamento', valor: 'Velocidade variável (VSD)' },
      { rotulo: 'Emissões locais', valor: 'Zero — opera em ambientes fechados' },
      { rotulo: 'Peso', valor: '≈ 1.900 kg' },
      { rotulo: 'Garantia', valor: 'Atlas Copco — peças originais' },
    ],
    seoTitle: 'E-AIR T500 · Compressor Elétrico Atlas Copco | ACB Sul',
    seoDescription:
      'Compressor de ar elétrico portátil Atlas Copco E-AIR T500: até 13,9 m³/min, pressão ajustável e zero emissões locais. Venda e locação no RS — ACB Sul.',
  },
  {
    slug: 'e-air-t900',
    codigo: 'E-AIR T900',
    etiqueta: 'Elétrico',
    tipo: 'Compressor Elétrico Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['100% elétrico', 'Zero emissões locais', 'Obras urbanas'],
    imagens: [
      {
        src: `${P}/compressores-portateis/e-air-t900.jpeg`,
        alt: 'Compressor elétrico portátil Atlas Copco E-AIR T900',
      },
    ],
  },
  {
    slug: 'xas-48-kd',
    codigo: 'XAS 48 Kd',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['90 pcm', '7 bar', 'Compacto'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xas-48-kd.jpg`,
        alt: 'Compressor portátil Atlas Copco XAS 48 Kd de 90 pcm e 7 bar',
      },
    ],
  },
  {
    slug: 'u110',
    codigo: 'U110',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['100 pcm', '7 bar', 'Compacto'],
    imagens: [
      {
        src: `${P}/compressores-portateis/u110.jpg`,
        alt: 'Compressor portátil Atlas Copco U110 de 100 pcm e 7 bar',
      },
    ],
  },
  {
    slug: 'xas-88-kd',
    codigo: 'XAS 88 Kd',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['175 pcm', '7 bar', 'Construção civil'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xas-88-kd.jpg`,
        alt: 'Compressor portátil Atlas Copco XAS 88 Kd de 175 pcm e 7 bar',
      },
    ],
  },
  {
    slug: 'u190-pace',
    codigo: 'U190 PACE',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['90–190 pcm', '5–10,5 bar', 'Pressão ajustável'],
    imagens: [
      {
        src: `${P}/compressores-portateis/u190-pace.jpg`,
        alt: 'Compressor portátil Atlas Copco U190 PACE de 90 a 190 pcm',
      },
    ],
  },
  {
    slug: 'xahs-157',
    codigo: 'XAHS 157',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['300 pcm', '12 bar', 'Alta pressão'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xahs-157.jpg`,
        alt: 'Compressor portátil Atlas Copco XAHS 157 de 300 pcm e 12 bar',
      },
    ],
  },
  {
    slug: 'xas-157-pdg',
    codigo: 'XAS 157 PdG',
    tipo: 'Compressor Portátil',
    nome: 'Compressor Portátil XAS 157 PdG com Gerador',
    categoria: 'compressores-portateis',
    specsChips: ['321 pcm', '7 bar', 'Gerador integrado'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xas-157-pdg.jpg`,
        alt: 'Compressor portátil Atlas Copco XAS 157 PdG com gerador integrado',
      },
    ],
  },
  {
    slug: 'xas-300-pd',
    codigo: 'XAS 300 PD',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['300 pcm', '7 bar', 'Serviços de campo'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xas-300-pd.png`,
        alt: 'Compressor portátil Atlas Copco XAS 300 PD de 300 pcm e 7 bar',
      },
    ],
  },
  {
    slug: 'xahs-300-pd',
    codigo: 'XAHS 300 PD',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['285 pcm', '12 bar', 'Alta pressão'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xahs-300-pd.png`,
        alt: 'Compressor portátil Atlas Copco XAHS 300 PD de 285 pcm e 12 bar',
      },
    ],
  },
  {
    slug: 'xats-300-pd',
    codigo: 'XATS 300 Pd',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['286 pcm', '10 bar', 'Versátil'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xats-300-pd.png`,
        alt: 'Compressor portátil Atlas Copco XATS 300 Pd de 286 pcm e 10 bar',
      },
    ],
  },
  {
    slug: 'xats-167',
    codigo: 'XATS 167',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['335 pcm', '10 bar', 'Construção civil'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xats-167.jpg`,
        alt: 'Compressor portátil Atlas Copco XATS 167 de 335 pcm e 10 bar',
      },
    ],
  },
  {
    slug: 'xas-187',
    codigo: 'XAS 187',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['400 pcm', '7 bar', 'Construção civil'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xas-187.jpg`,
        alt: 'Compressor portátil Atlas Copco XAS 187 de 400 pcm e 7 bar',
      },
    ],
  },
  {
    slug: 'xas-770',
    codigo: 'XAS 770',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['771 pcm', '7 bar', 'Grandes obras'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xas-770.jpg`,
        alt: 'Compressor portátil Atlas Copco XAS 770 de 771 pcm e 7 bar',
      },
    ],
  },
  {
    slug: 'xahs-805',
    codigo: 'XAHS 805',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['800 pcm', '12 bar', 'Mineração'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xahs-805.jpg`,
        alt: 'Compressor portátil Atlas Copco XAHS 805 de 800 pcm e 12 bar',
      },
    ],
  },
  {
    slug: 'xats-805',
    codigo: 'XATS 805',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['805 pcm', '10 bar', 'Grandes obras'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xats-805.jpg`,
        alt: 'Compressor portátil Atlas Copco XATS 805 de 805 pcm e 10 bar',
      },
    ],
  },
  {
    slug: 'xams-900',
    codigo: 'XAMS 900',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['900 pcm', '9 bar', 'Grandes obras'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xams-900.jpg`,
        alt: 'Compressor portátil Atlas Copco XAMS 900 de 900 pcm e 9 bar',
      },
    ],
  },
  {
    slug: 'xats-910',
    codigo: 'XATS 910',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['910 pcm', '10 bar', 'Mineração'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xats-910.jpg`,
        alt: 'Compressor portátil Atlas Copco XATS 910 de 910 pcm e 10 bar',
      },
    ],
  },
  {
    slug: 'w1100',
    codigo: 'W1100',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['1000–1100 pcm', '19–28 bar', 'Alta pressão'],
    imagens: [
      {
        src: `${P}/compressores-portateis/w1100.jpg`,
        alt: 'Compressor portátil Atlas Copco W1100 de até 1100 pcm e 28 bar',
      },
    ],
  },
  {
    slug: 'x1200',
    codigo: 'X1200',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['1000–1200 pcm', '16–30 bar', 'Perfuração'],
    imagens: [
      {
        src: `${P}/compressores-portateis/x1200.jpg`,
        alt: 'Compressor portátil Atlas Copco X1200 de até 1200 pcm e 30 bar',
      },
    ],
  },
  {
    slug: 'xavs-1600',
    codigo: 'XAVS 1600',
    tipo: 'Compressor Portátil',
    categoria: 'compressores-portateis',
    specsChips: ['1600 pcm', '7–14 bar', 'Alta vazão'],
    imagens: [
      {
        src: `${P}/compressores-portateis/xavs-1600.png`,
        alt: 'Compressor portátil Atlas Copco XAVS 1600 de 1600 pcm',
      },
    ],
  },

  // ========== GERADORES DE ENERGIA ==========
  {
    slug: 'qas-24',
    codigo: 'QAS 24',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['24 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-24.jpg`, alt: 'Gerador de energia Atlas Copco QAS 24 de 24 kVA' },
    ],
  },
  {
    slug: 'qas-40',
    codigo: 'QAS 40',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['40 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-40.jpg`, alt: 'Gerador de energia Atlas Copco QAS 40 de 40 kVA' },
    ],
  },
  {
    slug: 'qas-55',
    codigo: 'QAS 55',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['55 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-55.jpg`, alt: 'Gerador de energia Atlas Copco QAS 55 de 55 kVA' },
    ],
  },
  {
    slug: 'qas-70',
    codigo: 'QAS 70',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['70 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-70.jpg`, alt: 'Gerador de energia Atlas Copco QAS 70 de 70 kVA' },
    ],
  },
  {
    slug: 'qas-85',
    codigo: 'QAS 85',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['86 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-85.jpg`, alt: 'Gerador de energia Atlas Copco QAS 85 de 86 kVA' },
    ],
  },
  {
    slug: 'qas-105',
    codigo: 'QAS 105',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['102 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-105.jpg`, alt: 'Gerador de energia Atlas Copco QAS 105 de 102 kVA' },
    ],
  },
  {
    slug: 'qas-130',
    codigo: 'QAS 130',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['130 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-130.jpg`, alt: 'Gerador de energia Atlas Copco QAS 130 de 130 kVA' },
    ],
  },
  {
    slug: 'qas-140',
    codigo: 'QAS 140',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['144 kVA', 'Trifásico', 'Cabine silenciada'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-140.jpg`, alt: 'Gerador de energia Atlas Copco QAS 140 de 144 kVA' },
    ],
  },
  {
    slug: 'qas-170',
    codigo: 'QAS 170',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['175 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-170.jpg`, alt: 'Gerador de energia Atlas Copco QAS 170 de 175 kVA' },
    ],
  },
  {
    slug: 'qas-180',
    codigo: 'QAS 180',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['180 kVA', 'Cabine silenciada', 'Venda ou locação'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-180.jpg`, alt: 'Gerador de energia Atlas Copco QAS 180 de 180 kVA' },
    ],
  },
  {
    slug: 'qas-210',
    codigo: 'QAS 210',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['210 kVA', 'Cabine silenciada', 'Backup industrial'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-210.jpg`, alt: 'Gerador de energia Atlas Copco QAS 210 de 210 kVA' },
    ],
  },
  {
    slug: 'qas-225',
    codigo: 'QAS 225',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['225 kVA', 'Cabine silenciada', 'Backup industrial'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-225.jpg`, alt: 'Gerador de energia Atlas Copco QAS 225 de 225 kVA' },
    ],
  },
  {
    slug: 'qas-360',
    codigo: 'QAS 360',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['365 kVA', 'Cabine silenciada', 'Backup industrial'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-360.jpg`, alt: 'Gerador de energia Atlas Copco QAS 360 de 365 kVA' },
    ],
  },
  {
    slug: 'qas-550',
    codigo: 'QAS 550',
    etiqueta: 'Diesel',
    tipo: 'Gerador de Energia',
    categoria: 'geradores-de-energia',
    specsChips: ['550 kVA', 'Cabine silenciada', 'Alta potência'],
    imagens: [
      { src: `${P}/geradores-de-energia/qas-550.jpg`, alt: 'Gerador de energia Atlas Copco QAS 550 de 550 kVA' },
    ],
  },
  {
    slug: 'qac-1100',
    codigo: 'QAC 1100',
    etiqueta: 'TwinPower',
    tipo: 'Gerador de Energia',
    nome: 'Gerador de Energia QAC 1100 TwinPower',
    categoria: 'geradores-de-energia',
    specsChips: ['1100 kVA', 'TwinPower', 'Alta potência'],
    imagens: [
      {
        src: `${P}/geradores-de-energia/qac-1100.jpeg`,
        alt: 'Gerador de energia Atlas Copco QAC 1100 TwinPower de 1100 kVA',
      },
    ],
  },

  // ========== GERADORES DE GÁS NITROGÊNIO ==========
  {
    slug: 'ngm-7-70',
    codigo: 'NGM⁺ 7-70',
    tipo: 'Gerador de Nitrogênio',
    categoria: 'geradores-de-gas-nitrogenio',
    specsChips: ['Tecnologia de membrana', 'N₂ no local', 'Alimentos e química'],
    imagens: [
      {
        src: `${P}/geradores-de-gas-nitrogenio/ngm-7-70.jpeg`,
        alt: 'Gerador de nitrogênio Atlas Copco NGM+ 7-70 com tecnologia de membrana',
      },
    ],
  },

  // ========== TORRE DE ILUMINAÇÃO ==========
  {
    slug: 'hilight-v5-led',
    codigo: 'HiLight V5⁺',
    etiqueta: 'LED',
    tipo: 'Torre de Iluminação LED',
    categoria: 'torre-de-iluminacao',
    specsChips: ['LED', 'Obras e eventos', 'Venda ou locação'],
    imagens: [
      {
        src: `${P}/torre-de-iluminacao/hilight-v5-led.jpeg`,
        alt: 'Torre de iluminação LED Atlas Copco HiLight V5+',
      },
    ],
  },
  {
    slug: 'qlt-m20',
    codigo: 'QLT M20',
    tipo: 'Torre de Iluminação',
    categoria: 'torre-de-iluminacao',
    specsChips: ['Iluminação móvel', 'Operação noturna', 'Venda ou locação'],
    imagens: [
      { src: `${P}/torre-de-iluminacao/qlt-m20.jpg`, alt: 'Torre de iluminação Atlas Copco QLT M20' },
    ],
  },

  // ========== ROMPEDORES ==========
  {
    slug: 'tex-21-pe',
    codigo: 'TEX 21 PE',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Ergonômico', 'Demolição leve'],
    imagens: [
      { src: `${P}/rompedores/tex-21-pe.jpg`, alt: 'Rompedor pneumático ergonômico Atlas Copco TEX 21 PE' },
    ],
  },
  {
    slug: 'tex-33-pe',
    codigo: 'TEX 33 PE',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Ergonômico', 'Demolição média'],
    imagens: [
      { src: `${P}/rompedores/tex-33-pe.jpg`, alt: 'Rompedor pneumático ergonômico Atlas Copco TEX 33 PE' },
    ],
  },
  {
    slug: 'tex-40-pe',
    codigo: 'TEX 40 PE',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Ergonômico', 'Demolição pesada'],
    imagens: [
      { src: `${P}/rompedores/tex-40-pe.jpg`, alt: 'Rompedor pneumático ergonômico Atlas Copco TEX 40 PE' },
    ],
  },
  {
    slug: 'tex-230-pe',
    codigo: 'TEX 230 PE',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Ergonômico', 'Construção pesada'],
    imagens: [
      { src: `${P}/rompedores/tex-230-pe.jpg`, alt: 'Rompedor pneumático ergonômico Atlas Copco TEX 230 PE' },
    ],
  },
  {
    slug: 'tex-280-pe',
    codigo: 'TEX 280 PE',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Ergonômico', 'Construção pesada'],
    imagens: [
      { src: `${P}/rompedores/tex-280-pe.jpg`, alt: 'Rompedor pneumático ergonômico Atlas Copco TEX 280 PE' },
    ],
  },
  {
    slug: 'tex-p60-s',
    codigo: 'TEX P60 S',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Alta produção', 'Pavimento'],
    imagens: [{ src: `${P}/rompedores/tex-p60-s.jpg`, alt: 'Rompedor pneumático Atlas Copco TEX P60 S' }],
  },
  {
    slug: 'tex-p90-s',
    codigo: 'TEX P90 S',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Alta produção', 'Demolição pesada'],
    imagens: [{ src: `${P}/rompedores/tex-p90-s.jpg`, alt: 'Rompedor pneumático Atlas Copco TEX P90 S' }],
  },
  {
    slug: 'rtex',
    codigo: 'RTEX',
    tipo: 'Rompedor Pneumático',
    categoria: 'rompedores',
    specsChips: ['Pneumático', 'Baixa vibração', 'Alta eficiência'],
    imagens: [
      { src: `${P}/rompedores/rtex.jpg`, alt: 'Rompedor pneumático Atlas Copco RTEX de baixa vibração' },
    ],
  },

  // ========== PERFURATRIZ (sem foto — linha sob consulta) ==========
  {
    slug: 'linha-perfuratrizes',
    codigo: 'Linha completa',
    tipo: 'Perfuratriz Pneumática',
    nome: 'Perfuratrizes Pneumáticas Atlas Copco',
    categoria: 'perfuratriz',
    specsChips: ['Mineração e pedreiras', 'Poços e fundações', 'Sob consulta'],
    imagens: [],
  },

  // ========== PEÇAS ==========
  {
    slug: 'kit-250h',
    codigo: 'Kit 250 horas',
    tipo: 'Kit de Manutenção',
    nome: 'Kit de Manutenção 250 Horas',
    categoria: 'pecas',
    specsChips: ['Revisão 250h', 'Original Atlas Copco'],
    imagens: [
      { src: `${P}/pecas/kit-250h.png`, alt: 'Kit de manutenção original Atlas Copco de 250 horas' },
    ],
  },
  {
    slug: 'kit-500h',
    codigo: 'Kit 500 horas',
    tipo: 'Kit de Manutenção',
    nome: 'Kit de Manutenção 500 Horas',
    categoria: 'pecas',
    specsChips: ['Revisão 500h', 'Original Atlas Copco'],
    imagens: [
      { src: `${P}/pecas/kit-500h.png`, alt: 'Kit de manutenção original Atlas Copco de 500 horas' },
    ],
  },
  {
    slug: 'kit-1000h',
    codigo: 'Kit 1000 horas',
    tipo: 'Kit de Manutenção',
    nome: 'Kit de Manutenção 1000 Horas',
    categoria: 'pecas',
    specsChips: ['Revisão 1000h', 'Original Atlas Copco'],
    imagens: [
      { src: `${P}/pecas/kit-1000h.png`, alt: 'Kit de manutenção original Atlas Copco de 1000 horas' },
    ],
  },
  {
    slug: 'kits-manutencao',
    codigo: 'Kits 250 · 500 · 1000h',
    tipo: 'Kits de Manutenção',
    nome: 'Kits de Manutenção Programada',
    categoria: 'pecas',
    specsChips: ['250h / 500h / 1000h', 'Peças originais'],
    imagens: [
      {
        src: `${P}/pecas/kits-manutencao.png`,
        alt: 'Kits de manutenção programada Atlas Copco de 250, 500 e 1000 horas',
      },
    ],
  },
  {
    slug: 'paroil-m-20l',
    codigo: 'PAROIL M',
    etiqueta: '20 L',
    tipo: 'Óleo para Compressores',
    nome: 'Óleo PAROIL M para Compressores',
    categoria: 'pecas',
    specsChips: ['20 litros', 'Elemento compressor'],
    imagens: [
      {
        src: `${P}/pecas/paroil-m-20l.jpg`,
        alt: 'Óleo Atlas Copco PAROIL M de 20 litros para unidade compressora',
      },
    ],
  },
  {
    slug: 'paroil-e',
    codigo: 'PAROIL E',
    tipo: 'Óleo para Motores Diesel',
    nome: 'Óleo PAROIL E para Motores Diesel',
    categoria: 'pecas',
    specsChips: ['Motores diesel', 'Original Atlas Copco'],
    imagens: [{ src: `${P}/pecas/paroil-e.jpg`, alt: 'Óleo Atlas Copco PAROIL E para motores diesel' }],
  },
  {
    slug: 'paroil-s-xtreme',
    codigo: 'PAROIL S Xtreme',
    tipo: 'Óleo Sintético',
    categoria: 'pecas',
    specsChips: ['Sintético', 'Motores diesel'],
    imagens: [
      {
        src: `${P}/pecas/paroil-s-xtreme.jpeg`,
        alt: 'Óleo sintético Atlas Copco PAROIL S Xtreme para motores diesel',
      },
    ],
  },
  {
    slug: 'parcool-eg',
    codigo: 'PARCOOL EG',
    tipo: 'Líquido de Arrefecimento',
    categoria: 'pecas',
    specsChips: ['Aditivo refrigerante', 'Original Atlas Copco'],
    imagens: [{ src: `${P}/pecas/parcool-eg.jpeg`, alt: 'Líquido refrigerante Atlas Copco PARCOOL EG' }],
  },
  {
    slug: 'lampada-1kw',
    codigo: 'Lâmpada 1 kW',
    tipo: 'Lâmpada para Torre de Iluminação',
    nome: 'Lâmpada 1 kW para Torre de Iluminação',
    categoria: 'pecas',
    specsChips: ['Reposição', 'Torres de iluminação'],
    imagens: [
      { src: `${P}/pecas/lampada-1kw.jpeg`, alt: 'Lâmpada de 1 kW para torre de iluminação Atlas Copco' },
    ],
  },
  {
    slug: 'pecas-originais',
    codigo: 'Linha completa',
    tipo: 'Peças Originais',
    nome: 'Peças Originais Atlas Copco',
    categoria: 'pecas',
    specsChips: ['Filtros e separadores', 'Garantia de fábrica'],
    imagens: [
      { src: `${P}/pecas/pecas-originais.png`, alt: 'Peças de reposição originais Atlas Copco' },
    ],
  },

  // ========== BOMBAS DE VÁCUO ==========
  {
    slug: 'ghs-350-5400-vsd',
    codigo: 'GHS 350–5400 VSD',
    tipo: 'Bomba de Vácuo de Parafuso',
    nome: 'Bomba de Vácuo de Parafuso GHS VSD',
    categoria: 'bombas-de-vacuo',
    specsChips: ['Parafuso lubrificado', 'Velocidade variável', 'Indústria'],
    imagens: [
      {
        src: `${P}/bombas-de-vacuo/ghs-350-5400-vsd.jpg`,
        alt: 'Bomba de vácuo de parafuso Atlas Copco GHS 350 a 5400 VSD',
      },
    ],
  },
  {
    slug: 'gvs-16-630',
    codigo: 'GVS 16–630',
    tipo: 'Bomba de Vácuo de Palhetas',
    nome: 'Bomba de Vácuo de Palhetas GVS',
    categoria: 'bombas-de-vacuo',
    specsChips: ['Palhetas rotativas', 'Embalagem e processos'],
    imagens: [
      {
        src: `${P}/bombas-de-vacuo/gvs-16-630.jpg`,
        alt: 'Bomba de vácuo de palhetas rotativas Atlas Copco GVS 16 a 630',
      },
    ],
  },
  {
    slug: 'gvsa',
    codigo: 'GVSA',
    tipo: 'Bomba de Vácuo de Palhetas',
    categoria: 'bombas-de-vacuo',
    specsChips: ['Palhetas rotativas', 'Uso industrial'],
    imagens: [{ src: `${P}/bombas-de-vacuo/gvsa.jpg`, alt: 'Bomba de vácuo de palhetas Atlas Copco GVSA' }],
  },
  {
    slug: 'dzs-065-300',
    codigo: 'DZS 065–300',
    tipo: 'Bomba de Vácuo Seca tipo Garra',
    nome: 'Bomba de Vácuo Seca tipo Garra DZS',
    categoria: 'bombas-de-vacuo',
    specsChips: ['Operação a seco', 'Tipo garra', 'Baixa manutenção'],
    imagens: [
      {
        src: `${P}/bombas-de-vacuo/dzs-065-300.jpg`,
        alt: 'Bomba de vácuo seca tipo garra Atlas Copco DZS 065 a 300',
      },
    ],
  },

  // ========== QUALITY AIR (TRATAMENTO DE AR) ==========
  {
    slug: 'osc-12-2500',
    codigo: 'OSC 12–2500',
    tipo: 'Separador de Óleo e Água',
    nome: 'Separador de Óleo e Água OSC',
    categoria: 'quality-air',
    specsChips: ['Tratamento de condensado', 'Conformidade ambiental'],
    imagens: [
      { src: `${P}/quality-air/osc-12-2500.jpg`, alt: 'Separador de óleo e água Atlas Copco OSC 12 a 2500' },
    ],
  },

  // ========== MOTOBOMBAS ==========
  {
    slug: 'pac-h-high-head',
    codigo: 'PAC H',
    etiqueta: 'High Head',
    tipo: 'Motobomba de Alta Pressão',
    categoria: 'motobombas',
    specsChips: ['Alto recalque', 'Esgotamento de obras'],
    imagens: [
      {
        src: `${P}/motobombas/pac-h-high-head.jpg`,
        alt: 'Motobomba Atlas Copco PAC H high head de alto recalque',
      },
    ],
  },
  {
    slug: 'pas-hard-hat',
    codigo: 'PAS Hard Hat',
    tipo: 'Motobomba',
    categoria: 'motobombas',
    specsChips: ['Esgotamento', 'Estrutura protegida'],
    imagens: [
      { src: `${P}/motobombas/pas-hard-hat.jpg`, alt: 'Motobomba Atlas Copco PAS Hard Hat para esgotamento' },
    ],
  },
  {
    slug: 'pas-mf-hf',
    codigo: 'PAS MF/HF',
    tipo: 'Motobomba',
    categoria: 'motobombas',
    specsChips: ['Esgotamento', 'Sólidos em suspensão'],
    imagens: [{ src: `${P}/motobombas/pas-mf-hf.jpg`, alt: 'Motobomba Atlas Copco PAS MF/HF' }],
  },
  {
    slug: 'var',
    codigo: 'VAR',
    tipo: 'Motobomba',
    categoria: 'motobombas',
    specsChips: ['Drenagem de obras', 'Escorva assistida'],
    imagens: [{ src: `${P}/motobombas/var.jpg`, alt: 'Motobomba Atlas Copco VAR para drenagem de obras' }],
  },
  {
    slug: 'weda-d',
    codigo: 'WEDA D',
    tipo: 'Bomba Submersível de Drenagem',
    categoria: 'motobombas',
    specsChips: ['Elétrica submersível', 'Drenagem'],
    imagens: [
      {
        src: `${P}/motobombas/weda-d.jpg`,
        alt: 'Bomba submersível elétrica de drenagem Atlas Copco WEDA D',
      },
    ],
  },
  {
    slug: 'weda-l',
    codigo: 'WEDA L',
    tipo: 'Bomba Submersível',
    categoria: 'motobombas',
    specsChips: ['Elétrica submersível', 'Esgotamento'],
    imagens: [{ src: `${P}/motobombas/weda-l.jpg`, alt: 'Bomba submersível elétrica Atlas Copco WEDA L' }],
  },
];
