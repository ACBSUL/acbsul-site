// Fonte única dos dados da empresa (CLAUDE.md §3 / PRD §3).
// Itens [CONFIRMAR] precisam de validação do cliente antes do go-live.

export const empresa = {
  nome: 'ACB Sul Compressores',
  posicionamento: 'Distribuidor autorizado Atlas Copco no Rio Grande do Sul',
  // Apresentação oficial do cliente (rev01 26.05.26): a empresa foi fundada em
  // 2017; os "mais de 40 anos" são a EXPERIÊNCIA dos fundadores no mercado de
  // compressores — não a idade da empresa. Não usar "longevidade" como idade.
  fundacao: 2017,
  experiencia: 'mais de 40 anos', // experiência dos fundadores/equipe no setor
  // Mantido para schema/copy, já no enquadramento honesto (experiência, não idade da empresa).
  longevidade: 'mais de 40 anos de experiência',
  estoqueItens: '2.500', // itens de reposição a pronta entrega (pág. 5 da apresentação)
  endereco: {
    rua: 'Rua Santa Catarina, 304',
    bairro: 'Santa Maria Goretti',
    cidade: 'Porto Alegre',
    uf: 'RS',
    cep: '91030-330',
  },
  telefone: '(51) 3377-3626',
  telefoneTel: '+555133773626',
  // PRD §3 traz adm@; o modelo v2 mais recente do cliente usa comercial@. [CONFIRMAR]
  email: 'comercial@acbsulcompressores.com.br',
  // [CONFIRMAR — nº atual malformado]. Placeholder móvel no formato wa.me (DDI+DDD+numero).
  whatsapp: '5551991234567',
  horario: 'Seg–Sex, 8h–12h e 13h–17h',
  atuacao: 'Rio Grande do Sul e Santa Catarina',
  url: 'https://acbsulcompressores.com.br',
} as const;

// EntityBlock — texto institucional citável (frase-âncora de GEO). Enquadramento
// honesto: empresa fundada em 2017; os 40+ anos são a experiência dos fundadores.
export const entityBlockTexto =
  'A ACB Sul Compressores é distribuidora autorizada Atlas Copco no Rio Grande do Sul. Fundada em 2017, reúne mais de 40 anos de experiência no mercado de compressores Atlas Copco através de seus fundadores e atende, a partir de Porto Alegre, empresas e obras em todo o RS e em Santa Catarina, com venda de compressores industriais, assistência técnica especializada, peças de reposição originais Atlas Copco, estoque de mais de 2.500 itens a pronta entrega e locação de equipamentos novos e seminovos.';

// Categorias do catálogo: ver src/data/categorias.ts (modelo padronizado).

// Mini-FAQ da Home (4 perguntas — subconjunto do PRD Anexo 12.4).
export const miniFaq = [
  {
    p: 'A ACB Sul é distribuidora autorizada Atlas Copco?',
    r: 'Sim. A ACB Sul é distribuidora autorizada Atlas Copco no Rio Grande do Sul, com fornecimento de equipamentos novos, peças originais e assistência técnica.',
  },
  {
    p: 'Em quais regiões a ACB Sul atende?',
    r: 'A ACB Sul atende todo o Rio Grande do Sul e Santa Catarina, com sede em Porto Alegre.',
  },
  {
    p: 'A ACB Sul usa peças originais Atlas Copco?',
    r: 'Sim, todos os serviços utilizam peças de reposição originais Atlas Copco, garantindo desempenho e validade da garantia.',
  },
  {
    p: 'Como solicitar um orçamento?',
    r: 'Pelo WhatsApp da categoria desejada, pelo formulário de contato ou pelo telefone (51) 3377-3626.',
  },
] as const;
