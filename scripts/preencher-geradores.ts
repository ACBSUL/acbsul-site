// Conteúdo de PDP — geradores de energia (15), gerador de nitrogênio (1)
// e torres de iluminação (2). Números: chips aprovados do seed (kVA oficiais).
// Uso: npx tsx scripts/preencher-geradores.ts
import { aplicar, type Conteudo } from './aplicar-conteudo';

const fechoGer = (nome: string) =>
  `Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul fornece o ${nome} para <b>venda ou locação</b>, com dimensionamento elétrico, peças originais e assistência técnica no RS e em Santa Catarina — atendimento a partir de Porto Alegre, cobrindo a região metropolitana e o interior.`;

// gerador QAS: P1 + P2 específico por porte + fecho
const qas = (
  slug: string,
  modelo: string,
  kva: string,
  aplicacao: string,
  paragrafo2: string,
): Conteudo => ({
  slug,
  pitch: `Gerador de energia diesel de <b>${kva}</b> com cabine silenciada — energia confiável para ${aplicacao}, em regime principal ou de emergência.`,
  descricao: [
    `<b>O Atlas Copco ${modelo} é um gerador de energia diesel de ${kva} com cabine metálica silenciada, projetado para fornecer energia confiável em regime principal (prime) ou de emergência (standby).</b> Faz parte da linha QAS, a família de geradores industriais móveis da Atlas Copco — construída para trabalhar tanto estacionária quanto circulando entre obras e eventos.`,
    paragrafo2,
    fechoGer(modelo),
  ],
  especificacoes: [
    ['Modelo', modelo],
    ['Potência', kva],
    ['Combustível', 'Diesel'],
    ['Carenagem', 'Cabine metálica silenciada'],
    ['Regime', 'Principal (prime) ou emergência (standby)'],
    ['Linha', 'QAS — geradores industriais móveis'],
  ],
});

const conteudos: Conteudo[] = [
  qas(
    'qas-24',
    'QAS 24',
    '24 kVA',
    'pequenos comércios, eventos e obras',
    'É o porte de entrada da linha: energia para o stand de evento, o canteiro em fase inicial, a loja durante uma falta prolongada ou o sítio sem rede trifásica estável. A cabine silenciada permite operar próximo ao público sem incômodo, e o tamanho compacto facilita o transporte em caminhões leves. Mesmo sendo o menor da família, mantém os padrões industriais da linha QAS: painel de controle completo, proteções elétricas e acesso fácil aos pontos de manutenção.',
  ),
  qas(
    'qas-40',
    'QAS 40',
    '40 kVA',
    'comércios, eventos e canteiros de obra',
    'Quarenta kVA cobrem com folga um canteiro de obras em atividade plena — betoneiras, serras, iluminação e escritório de campo — ou um evento de médio porte com som, iluminação e praça de alimentação. No comércio, sustenta supermercados pequenos e clínicas durante interrupções da rede. É um dos portes mais procurados na locação justamente pela versatilidade: cabe em muitos cenários sem sobrar nem faltar capacidade.',
  ),
  qas(
    'qas-55',
    'QAS 55',
    '55 kVA',
    'obras, eventos e backup comercial',
    'Com 55 kVA, o gerador acompanha obras em ritmo de produção — gruas leves, centrais de concreto compactas, múltiplos pontos de força — e estruturas de evento com demanda simultânea de som, LED e climatização. Como backup, protege estabelecimentos comerciais de médio porte contra perdas em horário de pico. O controlador da linha QAS permite partida automática na falta de rede, assumindo a carga sem intervenção do operador.',
  ),
  qas(
    'qas-70',
    'QAS 70',
    '70 kVA',
    'indústrias leves, obras e eventos de porte',
    'Setenta kVA atendem a indústria leve em horário de ponta (evitando a tarifa mais cara), o canteiro com equipamentos elétricos de maior porte e eventos com infraestrutura completa. A cabine silenciada da linha QAS mantém o nível de ruído compatível com áreas urbanas e ambientes de público, e o chassi com olhais e bolsões de empilhadeira agiliza a movimentação entre contratos — característica que locadoras valorizam no giro da frota.',
  ),
  qas(
    'qas-85',
    'QAS 85',
    '86 kVA',
    'indústrias, obras e backup de médio porte',
    'O porte de 86 kVA é o ponto de equilíbrio entre mobilidade e capacidade: alimenta linhas de produção leves, sistemas de bombeamento, câmaras frias e canteiros com central de concreto. Em backup, cobre prédios comerciais e unidades de saúde de médio porte. Com partida automática configurável e instrumentação completa no painel, integra-se a sistemas de transferência (ATS) para assumir a carga em segundos na queda da rede.',
  ),
  qas(
    'qas-105',
    'QAS 105',
    '102 kVA',
    'indústrias e operações que não podem parar',
    'Acima dos 100 kVA, o gerador entra no terreno das operações críticas: frigoríficos, laticínios e agroindústrias que não podem perder a cadeia de frio, condomínios e hospitais regionais, obras com equipamentos pesados de força. O QAS 105 entrega essa potência mantendo a mobilidade da linha — cabine compacta, transporte simples — e a robustez de motor industrial dimensionado para longas jornadas em regime prime.',
  ),
  qas(
    'qas-130',
    'QAS 130',
    '130 kVA',
    'indústrias, agroindústria e infraestrutura',
    'Cento e trinta kVA sustentam plantas industriais de médio porte, sistemas de irrigação e secadores na agroindústria, e infraestrutura crítica de saneamento e telecomunicações. Na locação, é um porte coringa para paradas programadas de manutenção, quando a fábrica precisa manter setores essenciais energizados. O conjunto silenciado e o tanque de combustível de longa autonomia reduzem as intervenções durante turnos extensos.',
  ),
  qas(
    'qas-140',
    'QAS 140',
    '144 kVA',
    'indústrias e cargas trifásicas de produção',
    'Com 144 kVA trifásicos, o QAS 140 assume cargas de produção de verdade: linhas de usinagem, compressores estacionários, sistemas de refrigeração industrial. É também um porte estratégico para eventos de grande público, alimentando estruturas completas de palco e transmissão. A regulação eletrônica de tensão protege equipamentos sensíveis, e o painel da linha QAS oferece medições completas para acompanhamento da carga em tempo real.',
  ),
  qas(
    'qas-170',
    'QAS 170',
    '175 kVA',
    'plantas industriais e grandes obras',
    'O patamar de 175 kVA atende plantas industriais com múltiplos setores simultâneos, grandes canteiros com gruas e centrais de concreto, e estruturas temporárias de grande consumo. Em regime standby, protege operações onde cada hora parada custa caro — indústria alimentícia, plástica, metalúrgica. A construção robusta da linha QAS, com cabine de aço e tratamento anticorrosivo, suporta anos de trabalho ao tempo.',
  ),
  qas(
    'qas-180',
    'QAS 180',
    '180 kVA',
    'indústrias e operações de média-alta demanda',
    'Cento e oitenta kVA é potência para operações de média-alta demanda: fábricas em expansão, estações de bombeamento de saneamento, mineração de pequeno porte e grandes eventos. O QAS 180 trabalha tanto como fonte principal em locais sem rede quanto como retaguarda automática integrada a ATS. Manutenção acessível e telemetria opcional ajudam locadoras e indústrias a manter a disponibilidade do ativo sob controle.',
  ),
  qas(
    'qas-210',
    'QAS 210',
    '210 kVA',
    'backup industrial e infraestrutura crítica',
    'No degrau dos 210 kVA, o gerador vira infraestrutura: backup de plantas industriais inteiras, data centers regionais, hospitais e centros logísticos com câmaras refrigeradas. Em regime principal, sustenta obras de grande porte e operações remotas. O controlador da linha QAS gerencia partida automática, sincronização e proteções, e a cabine silenciada permite instalação próxima a áreas ocupadas sem poluição sonora.',
  ),
  qas(
    'qas-225',
    'QAS 225',
    '225 kVA',
    'backup industrial e grandes operações',
    'Com 225 kVA, o QAS 225 cobre o topo da demanda de médio-grande porte: indústrias com processos contínuos, complexos comerciais, estações de tratamento e eventos de grande estrutura. A capacidade extra sobre o QAS 210 dá margem de segurança para partidas de motores grandes — bombas, compressores e sistemas de climatização — sem afundamento de tensão. Construção industrial, autonomia estendida e manutenção planejável completam o perfil.',
  ),
  qas(
    'qas-360',
    'QAS 360',
    '365 kVA',
    'grandes indústrias e infraestrutura pesada',
    'Trezentos e sessenta e cinco kVA colocam o QAS 360 no circuito das grandes cargas: plantas industriais completas, mineração, obras de infraestrutura pesada e backup de instalações onde a interrupção é inaceitável. Suporta operação prime contínua em locais sem rede e parte automaticamente em standby integrado a sistemas de transferência. O conjunto mantém a filosofia QAS: silenciado, móvel e pronto para alternar entre contratos.',
  ),
  qas(
    'qas-550',
    'QAS 550',
    '550 kVA',
    'alta potência para indústria e grandes projetos',
    'O QAS 550 é o porte de alta potência da linha: 550 kVA para alimentar fábricas inteiras, grandes eventos nacionais, obras de infraestrutura de grande escala e operações de mineração. Em paradas programadas de subestações, assume setores completos da planta. A engenharia da linha QAS em potências altas mantém a praticidade móvel — transporte rodoviário padrão e instalação rápida — algo raro nessa faixa de potência.',
  ),
  {
    slug: 'qac-1100',
    pitch:
      'Central de energia em contêiner com <b>1.100 kVA</b> no conceito TwinPower: dois módulos geradores independentes que operam juntos ou separados, conforme a demanda.',
    descricao: [
      '<b>O Atlas Copco QAC 1100 TwinPower é uma central de energia em contêiner de 1.100 kVA composta por dois módulos geradores independentes.</b> O conceito TwinPower permite operar os dois módulos em conjunto na demanda máxima ou apenas um deles em cargas parciais — economizando combustível e horas de motor.',
      'Essa arquitetura muda a economia da energia temporária de grande porte: em vez de um único motor grande rodando com carga baixa (e consumo alto), o TwinPower liga somente a capacidade necessária. Além da eficiência, há redundância embutida — a manutenção de um módulo não derruba o fornecimento. É a solução para mineração, grandes obras, utilities e backup de instalações críticas de grande escala.',
      fechoGer('QAC 1100 TwinPower'),
    ],
    especificacoes: [
      ['Modelo', 'QAC 1100 TwinPower'],
      ['Potência total', '1.100 kVA'],
      ['Arquitetura', '2 módulos geradores independentes'],
      ['Combustível', 'Diesel'],
      ['Formato', 'Contêiner para transporte padrão'],
      ['Diferencial', 'Operação modular: 1 ou 2 módulos conforme a carga'],
    ],
  },
  {
    slug: 'ngm-7-70',
    pitch:
      'Gerador de nitrogênio por <b>tecnologia de membrana</b> — N₂ produzido na sua planta, a partir de ar comprimido, eliminando a dependência de cilindros e contratos de gás.',
    descricao: [
      '<b>O Atlas Copco NGM⁺ 7-70 é um gerador de nitrogênio por membrana que produz N₂ continuamente a partir do ar comprimido da própria planta.</b> A tecnologia separa o nitrogênio do oxigênio por permeação: sem partes móveis no processo de separação, sem regeneração e com pureza ajustável às necessidades da aplicação.',
      'Para indústrias de alimentos (atmosfera modificada), química, plástico e eletrônica, gerar o próprio nitrogênio significa fim da logística de cilindros e do custo recorrente de gás entregue: o investimento se paga com o consumo. A instalação é simples — entrada de ar comprimido, saída de N₂ — e a operação é silenciosa e praticamente sem manutenção. Integra-se ao compressor existente ou a um conjunto dimensionado pela ACB Sul.',
      fechoGer('NGM⁺ 7-70'),
    ],
    especificacoes: [
      ['Modelo', 'NGM⁺ 7-70'],
      ['Tecnologia', 'Separação por membrana'],
      ['Alimentação', 'Ar comprimido'],
      ['Pureza', 'Ajustável conforme a aplicação'],
      ['Aplicações típicas', 'Alimentos · química · plástico · eletrônica'],
      ['Vantagem', 'Elimina cilindros e contratos de gás'],
    ],
  },
  {
    slug: 'hilight-v5-led',
    pitch:
      'Torre de iluminação <b>LED</b> rebocável — luz potente e uniforme para obras e eventos noturnos, com baixo consumo de diesel e lâmpadas de vida longa.',
    descricao: [
      '<b>A Atlas Copco HiLight V5⁺ é uma torre de iluminação móvel com refletores LED, projetada para iluminar grandes áreas de obra e eventos noturnos.</b> As ópticas LED distribuem luz uniforme — sem os pontos cegos das torres convencionais — e acendem instantaneamente, sem tempo de aquecimento.',
      'O LED muda o custo da iluminação noturna: consumo de diesel muito menor que torres de lâmpadas de descarga, vida útil longa das luminárias (sem trocas frequentes de lâmpada) e menos abastecimentos por semana de operação. O mastro recolhível e o chassi rebocável agilizam o posicionamento, e a operação silenciosa do conjunto permite uso próximo a áreas habitadas — frentes de pavimentação urbana, eventos, pátios logísticos e mineração.',
      fechoGer('HiLight V5⁺'),
    ],
    especificacoes: [
      ['Modelo', 'HiLight V5⁺'],
      ['Tecnologia', 'Refletores LED'],
      ['Formato', 'Torre móvel rebocável com mastro recolhível'],
      ['Vantagens', 'Baixo consumo · luz uniforme · partida instantânea'],
      ['Aplicações típicas', 'Obras noturnas · eventos · mineração · logística'],
    ],
  },
  {
    slug: 'qlt-m20',
    pitch:
      'Torre de iluminação móvel robusta para operação noturna contínua em obras, pátios e eventos — iluminação de área com a confiabilidade Atlas Copco.',
    descricao: [
      '<b>A Atlas Copco QLT M20 é uma torre de iluminação móvel projetada para a operação noturna contínua de obras, pátios industriais e eventos.</b> O conjunto reúne mastro elevável, refletores de alta potência e grupo gerador próprio num chassi rebocável de posicionamento rápido.',
      'É o equipamento clássico da frente de trabalho noturna: pavimentação, concretagens de madrugada, manutenção de rodovias e pátios de carga que operam 24 horas. O mastro alcança a altura necessária para iluminar grandes áreas com poucas torres, e o gerador integrado mantém autonomia para a jornada completa. A estrutura simples e os componentes acessíveis tornam a manutenção rápida — característica valorizada por locadoras com frota em giro constante.',
      fechoGer('QLT M20'),
    ],
    especificacoes: [
      ['Modelo', 'QLT M20'],
      ['Formato', 'Torre móvel rebocável com mastro elevável'],
      ['Energia', 'Grupo gerador integrado'],
      ['Reposição', 'Lâmpadas de 1 kW disponíveis (ver Peças)'],
      ['Aplicações típicas', 'Obras noturnas · rodovias · pátios 24h · eventos'],
    ],
  },
];

await aplicar(conteudos);
