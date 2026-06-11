// Modelo padronizado de CATEGORIA (aprovado pelo cliente — espelha a futura
// tabela `categorias` do banco no Passo 2; este arquivo vira o seed).
// Ordem e nomes definidos pelo cliente (espelham as pastas de _fotos-produtos).

export interface Categoria {
  /** identificador na URL (/produtos#slug e /produtos/[slug]/...) */
  slug: string;
  /** nome completo — menus, breadcrumb, títulos */
  nome: string;
  /** rótulo compacto — chips e espaços apertados */
  nomeCurto: string;
  /** chave do ícone em cat-icons.ts */
  icone: string;
  /** posição de exibição no portfólio */
  ordem: number;
  /** parágrafo editável da futura página de categoria (IA sugere, admin aprova) */
  introducao?: string;
  /** SEO da futura página de categoria (≤60 / ≤155) */
  seoTitle?: string;
  seoDescription?: string;
  /** roteamento de WhatsApp por categoria (PRD §8) — vazio = número geral da empresa */
  whatsappNumero?: string;
  whatsappMensagem?: string;
  /** esconder do site sem apagar */
  ativa: boolean;
}

export const categorias = [
  {
    slug: 'compressores-eletricos',
    nome: 'Compressores Elétricos',
    nomeCurto: 'Elétricos',
    icone: 'compressores-eletricos',
    ordem: 1,
    introducao:
      'Compressores de parafuso elétricos Atlas Copco das linhas GA e GX para ar comprimido contínuo na indústria. Venda com dimensionamento técnico, peças originais e assistência no RS e SC.',
    ativa: true,
  },
  {
    slug: 'compressores-portateis',
    nome: 'Compressores Portáteis',
    nomeCurto: 'Portáteis',
    icone: 'compressores-portateis',
    ordem: 2,
    introducao:
      'Compressores de ar portáteis Atlas Copco a diesel e 100% elétricos, de 90 a 1600 pcm, para construção civil, mineração e serviços de campo. Venda e locação com pronta-entrega no RS e SC.',
    ativa: true,
  },
  {
    slug: 'geradores-de-energia',
    nome: 'Geradores de Energia',
    nomeCurto: 'Geradores',
    icone: 'geradores-de-energia',
    ordem: 3,
    introducao:
      'Geradores de energia Atlas Copco QAS e QAC de 24 a 1100 kVA, com cabine silenciada, para obras, eventos e backup industrial. Venda e locação no Rio Grande do Sul e Santa Catarina.',
    ativa: true,
  },
  {
    slug: 'geradores-de-gas-nitrogenio',
    nome: 'Geradores de Gás Nitrogênio',
    nomeCurto: 'Nitrogênio',
    icone: 'geradores-de-gas-nitrogenio',
    ordem: 4,
    introducao:
      'Geradores de nitrogênio Atlas Copco para produção de N₂ no próprio local, com tecnologia de membrana — solução para alimentos, química e laboratórios.',
    ativa: true,
  },
  {
    slug: 'torre-de-iluminacao',
    nome: 'Torre de Iluminação',
    nomeCurto: 'Iluminação',
    icone: 'torre-de-iluminacao',
    ordem: 5,
    introducao:
      'Torres de iluminação móveis Atlas Copco, incluindo modelos LED, para obras, eventos e operações noturnas. Disponíveis para venda ou locação na ACB Sul.',
    ativa: true,
  },
  {
    slug: 'rompedores',
    nome: 'Rompedores',
    nomeCurto: 'Rompedores',
    icone: 'rompedores',
    ordem: 6,
    introducao:
      'Rompedores pneumáticos Atlas Copco das linhas TEX e RTEX para demolição, pavimento e construção pesada — robustos, ergonômicos e de baixa vibração.',
    ativa: true,
  },
  {
    slug: 'perfuratriz',
    nome: 'Perfuratriz',
    nomeCurto: 'Perfuratriz',
    icone: 'perfuratriz',
    ordem: 7,
    introducao:
      'Perfuratrizes pneumáticas Atlas Copco para mineração, pedreiras, poços e fundações. Linha completa sob consulta com os especialistas da ACB Sul.',
    ativa: true,
  },
  {
    slug: 'pecas',
    nome: 'Peças',
    nomeCurto: 'Peças',
    icone: 'pecas',
    ordem: 8,
    introducao:
      'Peças de reposição originais Atlas Copco: kits de manutenção de 250, 500 e 1000 horas, óleos PAROIL, refrigerante PARCOOL e filtros — com garantia de fábrica.',
    ativa: true,
  },
  {
    slug: 'bombas-de-vacuo',
    nome: 'Bombas de Vácuo',
    nomeCurto: 'Vácuo',
    icone: 'bombas-de-vacuo',
    ordem: 9,
    introducao:
      'Bombas de vácuo industriais Atlas Copco de parafuso, palhetas e garra a seco, para embalagem, processos químicos e manuseio de materiais.',
    ativa: true,
  },
  {
    slug: 'quality-air',
    nome: 'Quality Air',
    nomeCurto: 'Quality Air',
    icone: 'quality-air',
    ordem: 10,
    introducao:
      'Equipamentos Quality Air Atlas Copco para tratamento de ar comprimido e de condensado, como o separador de óleo e água OSC — ar limpo e conformidade ambiental.',
    ativa: true,
  },
  {
    slug: 'motobombas',
    nome: 'Motobombas',
    nomeCurto: 'Motobombas',
    icone: 'motobombas',
    ordem: 11,
    introducao:
      'Motobombas e bombas submersíveis Atlas Copco das linhas PAC, PAS, VAR e WEDA para drenagem e esgotamento em obras e indústria.',
    ativa: true,
  },
] as const satisfies readonly Categoria[];

export type CategoriaSlug = (typeof categorias)[number]['slug'];

/** lookup rápido por slug */
export const categoriaPorSlug = new Map<string, Categoria>(categorias.map((c) => [c.slug, c]));
