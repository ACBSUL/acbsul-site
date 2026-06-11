// Conteúdo de PDP — peças e acessórios (10). Fatos: chips aprovados do seed.
// Uso: npx tsx scripts/preencher-pecas.ts
import { aplicar, type Conteudo } from './aplicar-conteudo';

const fechoPecas = (oQue: string) =>
  `A ACB Sul, distribuidora autorizada Atlas Copco no Rio Grande do Sul, mantém ${oQue} em pronta-entrega em Porto Alegre, com envio para todo o RS e Santa Catarina e aplicação pela assistência técnica própria. Consulte disponibilidade pelo WhatsApp de Peças.`;

const kit = (
  slug: string,
  nome: string,
  horas: string,
  paragrafo2: string,
): Conteudo => ({
  slug,
  pitch: `Kit de manutenção original Atlas Copco para a revisão de <b>${horas} horas</b> — todos os itens da intervenção em uma única caixa, com garantia de fábrica preservada.`,
  descricao: [
    `<b>O ${nome} é o conjunto original Atlas Copco com todos os itens da revisão programada de ${horas} horas de operação.</b> Em vez de comprar peça a peça, a caixa reúne exatamente o que o plano de manutenção do equipamento pede — sem faltar item no dia do serviço e sem improviso com similares.`,
    paragrafo2,
    fechoPecas(`os kits de ${horas} horas das linhas mais usadas`),
  ],
  especificacoes: [
    ['Kit', `Revisão de ${horas} horas`],
    ['Origem', 'Peças genuínas Atlas Copco'],
    ['Conteúdo', 'Itens do plano de manutenção do equipamento'],
    ['Garantia', 'Preserva a garantia de fábrica'],
    ['Aplicação', 'Compressores e equipamentos Atlas Copco'],
  ],
});

const conteudos: Conteudo[] = [
  kit(
    'kit-250h',
    'Kit de Manutenção 250 Horas',
    '250',
    'A revisão de 250 horas é a primeira parada programada do ciclo: inspeção e troca dos itens de proteção básica do equipamento. Cumpri-la em dia — e com peças genuínas — é o que mantém o desempenho de fábrica e a validade da garantia. Para frotas de locação, o kit fechado simplifica o almoxarifado: uma caixa por equipamento, rastreável por código.',
  ),
  kit(
    'kit-500h',
    'Kit de Manutenção 500 Horas',
    '500',
    'Na parada de 500 horas, o plano de manutenção amplia o escopo da revisão intermediária. O kit fechado garante que filtros e itens de desgaste sejam trocados em conjunto, como a engenharia do equipamento prevê — trocas parciais com similares são a causa clássica de contaminação do circuito de óleo e de queda de eficiência. Com o kit original, a revisão sai mais rápida e dentro da especificação.',
  ),
  kit(
    'kit-1000h',
    'Kit de Manutenção 1000 Horas',
    '1000',
    'A revisão de 1.000 horas é a mais completa do ciclo anual típico: o kit cobre os elementos que protegem o conjunto rotativo e o circuito de óleo na intervenção maior. É a parada que define a vida útil do equipamento no longo prazo — feita com peças genuínas, devolve o compressor à condição de desempenho de fábrica; feita com similares, cobra o preço em eficiência e disponibilidade nos meses seguintes.',
  ),
  {
    slug: 'kits-manutencao',
    pitch:
      'Programa completo de kits de manutenção <b>250 · 500 · 1000 horas</b> com peças originais Atlas Copco — o plano de revisões do seu equipamento em caixas fechadas.',
    descricao: [
      '<b>Os Kits de Manutenção Programada Atlas Copco reúnem, em caixas fechadas, todos os itens das revisões de 250, 500 e 1.000 horas dos equipamentos da marca.</b> Cada kit corresponde a uma parada do plano de manutenção, com as peças genuínas que a engenharia do equipamento especifica.',
      'Trabalhar com o programa completo muda a gestão da manutenção: o almoxarifado estoca por equipamento e por parada (não por peça avulsa), o serviço nunca atrasa por item faltante e o histórico fica rastreável para auditoria e revenda do ativo. Para quem opera frota — locadoras, construtoras, indústrias com vários compressores — é a forma mais barata de manter disponibilidade alta e garantia válida.',
      fechoPecas('os kits das linhas portátil e estacionária mais vendidas'),
    ],
    especificacoes: [
      ['Programa', 'Kits de 250 · 500 · 1.000 horas'],
      ['Origem', 'Peças genuínas Atlas Copco'],
      ['Formato', 'Caixa fechada por parada de manutenção'],
      ['Benefícios', 'Garantia preservada · estoque simples · rastreabilidade'],
    ],
  },
  {
    slug: 'paroil-m-20l',
    pitch:
      'Óleo lubrificante <b>PAROIL M</b> em embalagem de 20 litros — formulado pela Atlas Copco para o elemento compressor dos seus equipamentos.',
    descricao: [
      '<b>O PAROIL M é o óleo lubrificante mineral formulado pela Atlas Copco para o elemento compressor de seus equipamentos, fornecido aqui na embalagem de 20 litros.</b> Não é um óleo genérico aprovado depois: é o lubrificante desenvolvido junto com o compressor.',
      'O óleo é o componente mais crítico de um compressor lubrificado: sela, refrigera e lubrifica o conjunto rotativo simultaneamente. O PAROIL M mantém a viscosidade e a resistência à oxidação nos ciclos térmicos reais do equipamento, protegendo o elemento — o item mais caro da máquina — e mantendo os intervalos de troca previstos no plano de manutenção. Usar óleo fora de especificação é a forma mais rápida de encurtar a vida de um compressor.',
      fechoPecas('o PAROIL M e os demais lubrificantes da linha'),
    ],
    especificacoes: [
      ['Produto', 'PAROIL M'],
      ['Embalagem', '20 litros'],
      ['Aplicação', 'Elemento compressor Atlas Copco'],
      ['Tipo', 'Lubrificante mineral de especificação de fábrica'],
    ],
  },
  {
    slug: 'paroil-e',
    pitch:
      'Óleo <b>PAROIL E</b> para os motores diesel dos equipamentos Atlas Copco — a especificação de fábrica para compressores portáteis, geradores e torres.',
    descricao: [
      '<b>O PAROIL E é o óleo formulado pela Atlas Copco para os motores diesel que equipam seus compressores portáteis, geradores e torres de iluminação.</b> Especificação única para a frota: o mesmo óleo aprovado para os motores de toda a linha móvel da marca.',
      'Equipamento de canteiro trabalha em poeira, carga variável e longos períodos em marcha: condições que degradam óleos comuns antes da hora. O PAROIL E é formulado para esse regime, mantendo a proteção do motor pelos intervalos completos do plano de manutenção. Para quem opera várias máquinas Atlas Copco, padronizar no PAROIL E simplifica o estoque e elimina o risco de aplicação errada entre equipamentos.',
      fechoPecas('o PAROIL E em embalagens para frota'),
    ],
    especificacoes: [
      ['Produto', 'PAROIL E'],
      ['Aplicação', 'Motores diesel de equipamentos Atlas Copco'],
      ['Equipamentos', 'Compressores portáteis · geradores · torres'],
      ['Tipo', 'Óleo de especificação de fábrica'],
    ],
  },
  {
    slug: 'paroil-s-xtreme',
    pitch:
      'Óleo <b>sintético</b> PAROIL S Xtreme para motores diesel — proteção máxima em operação severa e intervalos estendidos de troca.',
    descricao: [
      '<b>O PAROIL S Xtreme é o óleo sintético da Atlas Copco para motores diesel em operação severa.</b> A base sintética sustenta a lubrificação em temperaturas extremas e cargas contínuas que levam óleos minerais ao limite.',
      'É a escolha para os regimes mais duros: mineração, jornadas 24/7, calor intenso e equipamentos que não podem parar fora do cronograma. A estabilidade térmica do sintético protege o motor nos picos que degradam óleo comum e permite trabalhar com os intervalos estendidos previstos pela Atlas Copco para esta especificação — menos paradas de manutenção por ano, custo por hora menor em operação intensiva. Compatível com a linha diesel dos equipamentos da marca.',
      fechoPecas('o PAROIL S Xtreme'),
    ],
    especificacoes: [
      ['Produto', 'PAROIL S Xtreme'],
      ['Tipo', 'Óleo sintético para motores diesel'],
      ['Perfil', 'Operação severa · intervalos estendidos'],
      ['Aplicação', 'Motores diesel de equipamentos Atlas Copco'],
    ],
  },
  {
    slug: 'parcool-eg',
    pitch:
      'Líquido de arrefecimento <b>PARCOOL EG</b> — o aditivo refrigerante de especificação Atlas Copco que protege o sistema de arrefecimento contra corrosão e congelamento.',
    descricao: [
      '<b>O PARCOOL EG é o líquido de arrefecimento de especificação Atlas Copco para os motores e sistemas de refrigeração de seus equipamentos.</b> Protege contra corrosão, cavitação e variações extremas de temperatura — os três inimigos silenciosos do circuito de arrefecimento.',
      'Radiador entupido por corrosão e bomba d’água cavitada são defeitos caros e 100% evitáveis: nascem de água pura ou aditivo errado no sistema. O PARCOOL EG mantém o circuito limpo e protegido pelos longos intervalos especificados pela fábrica, em qualquer estação — relevante no Sul, onde geadas e verões de 40 °C testam o mesmo equipamento no mesmo ano. Aplicação em compressores portáteis, geradores e torres com motor a combustão.',
      fechoPecas('o PARCOOL EG'),
    ],
    especificacoes: [
      ['Produto', 'PARCOOL EG'],
      ['Função', 'Líquido de arrefecimento / aditivo refrigerante'],
      ['Proteções', 'Corrosão · cavitação · congelamento'],
      ['Aplicação', 'Motores de equipamentos Atlas Copco'],
    ],
  },
  {
    slug: 'lampada-1kw',
    pitch:
      'Lâmpada de reposição de <b>1 kW</b> para torres de iluminação — o item de giro que mantém a torre entregando luz total, sempre em estoque na ACB Sul.',
    descricao: [
      '<b>A lâmpada de 1 kW é o item de reposição das torres de iluminação com refletores de descarga, como a Atlas Copco QLT M20.</b> É o componente de desgaste natural do equipamento — e o que define se a torre ilumina a área projetada ou trabalha pela metade.',
      'Operar torre com lâmpada queimada ou no fim da vida derruba a segurança da frente noturna: menos luz, mais sombra, mais risco. Manter lâmpadas de reposição com o equipamento é prática padrão de locadoras e obras com turno noturno — a troca leva minutos e devolve a iluminação ao projeto. A ACB Sul fornece a lâmpada correta para a sua torre, na especificação do fabricante.',
      fechoPecas('lâmpadas de 1 kW e componentes para torres de iluminação'),
    ],
    especificacoes: [
      ['Item', 'Lâmpada 1 kW'],
      ['Aplicação', 'Torres de iluminação (ex.: QLT M20)'],
      ['Perfil', 'Item de reposição / desgaste natural'],
      ['Troca', 'Rápida, no próprio local de operação'],
    ],
  },
  {
    slug: 'pecas-originais',
    pitch:
      'Linha completa de <b>peças originais Atlas Copco</b>: filtros, separadores, elementos e componentes — com garantia de fábrica e pronta-entrega em Porto Alegre.',
    descricao: [
      '<b>A ACB Sul fornece a linha completa de peças originais Atlas Copco: filtros de ar e de óleo, separadores ar/óleo, elementos filtrantes, válvulas, sensores e componentes de reposição para compressores e equipamentos da marca.</b> Tudo com procedência de fábrica e garantia Atlas Copco.',
      'Peça original não é detalhe: o separador ar/óleo errado contamina a rede, o filtro similar fora de especificação encurta a vida do elemento compressor, e qualquer não-original pode invalidar a garantia do equipamento. Com mais de 40 anos como distribuidora autorizada, a ACB Sul mantém estoque local das peças de maior giro e acesso direto ao catálogo completo da fábrica para itens sob encomenda — com a orientação técnica de quem também faz a assistência.',
      fechoPecas('as peças de maior giro das linhas portátil, estacionária e de geração'),
    ],
    especificacoes: [
      ['Linha', 'Peças originais Atlas Copco'],
      ['Itens', 'Filtros · separadores · elementos · válvulas · sensores'],
      ['Garantia', 'De fábrica, com procedência'],
      ['Disponibilidade', 'Pronta-entrega local + catálogo completo sob encomenda'],
    ],
  },
];

await aplicar(conteudos);
