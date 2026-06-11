// Conteúdo de PDP — compressores portáteis (20).
// Números: chips aprovados do seed (vazão pcm / pressão bar, de fontes oficiais).
// Uso: npx tsx scripts/preencher-portateis.ts
import { aplicar, type Conteudo } from './aplicar-conteudo';

const fecho = (nome: string, extra = '') =>
  `Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul fornece o ${nome} para <b>venda ou locação</b>, com peças originais e assistência técnica em campo no RS e em Santa Catarina. O atendimento parte de Porto Alegre e cobre a região metropolitana e o interior, com orçamento rápido pelo WhatsApp da categoria.${extra ? ' ' + extra : ''}`;

const conteudos: Conteudo[] = [
  {
    slug: 'e-air-t900',
    pitch:
      'Compressor de ar portátil <b>100% elétrico</b> de grande porte — ar comprimido sem diesel e sem emissões locais para obras urbanas, túneis e ambientes fechados, com operação silenciosa.',
    descricao: [
      '<b>O Atlas Copco E-AIR T900 é um compressor de ar portátil 100% elétrico de grande porte, que entrega ar comprimido sem consumo de diesel e sem emissões locais.</b> É o irmão maior do E-AIR T500: mesma proposta de eletrificação do canteiro, com mais capacidade para alimentar múltiplas frentes de trabalho simultâneas.',
      'Por dispensar combustão, o E-AIR T900 trabalha onde um compressor a diesel não entra: túneis, galerias, indústrias, centros urbanos com restrição de ruído e zonas de baixa emissão. A partida suave reduz o pico de corrente na rede, e o acionamento elétrico corta o custo de combustível e a manutenção de motor — menos paradas, menos insumo, menos ruído para a vizinhança. Para empreiteiras que precisam atender exigências ambientais de editais públicos, é o caminho direto.',
      fecho('E-AIR T900', 'Informe a vazão e a pressão necessárias e receba o dimensionamento adequado à sua frente de obra.'),
    ],
    especificacoes: [
      ['Modelo', 'E-AIR T900'],
      ['Acionamento', '100% elétrico (zero emissões locais)'],
      ['Tecnologia', 'Parafuso rotativo'],
      ['Aplicação', 'Obras urbanas, túneis e ambientes fechados'],
      ['Vantagens', 'Baixo ruído · partida suave · sem custo de diesel'],
    ],
  },
  {
    slug: 'xas-48-kd',
    pitch:
      'Compressor de ar portátil diesel compacto de <b>90 pcm a 7 bar</b> — porte leve para rebocar com veículo comum e alimentar ferramentas pneumáticas em obras e manutenção.',
    descricao: [
      '<b>O Atlas Copco XAS 48 Kd é um compressor de ar portátil diesel de 90 pcm e 7 bar de pressão de trabalho, o porte compacto da linha XAS.</b> Montado sobre chassi rebocável com carenagem protetora, é dimensionado para alimentar uma frente de trabalho com ferramentas pneumáticas leves.',
      'É o compressor típico de equipes de manutenção urbana, instaladoras e pequenas empreiteiras: leve o suficiente para ser rebocado por uma caminhonete, simples de operar e econômico no diesel. Alimenta rompedores leves, perfuradores manuais, pistolas de pintura e ferramentas de aperto em serviços de rua, reformas e montagens industriais. A carenagem em aço protege o conjunto no transporte e reduz o ruído na operação em vias públicas.',
      fecho('XAS 48 Kd'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 48 Kd'],
      ['Vazão (FAD)', '90 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Montagem', 'Chassi rebocável com carenagem'],
    ],
  },
  {
    slug: 'u110',
    pitch:
      'Compressor de ar portátil compacto de <b>100 pcm a 7 bar</b> — a opção ágil da linha U para serviços leves de obra, manutenção e instalações.',
    descricao: [
      '<b>O Atlas Copco U110 é um compressor de ar portátil de 100 pcm e 7 bar, projetado para serviços leves com máxima mobilidade.</b> Compacto e de baixo peso, circula com facilidade dentro do canteiro e entre obras.',
      'Atende equipes que precisam de ar comprimido confiável sem mobilizar um equipamento de grande porte: ferramentas pneumáticas manuais, pequenos rompedores, limpeza por sopro e serviços de instalação. O conjunto carenado protege os componentes e mantém o nível de ruído adequado a ambientes urbanos, enquanto o consumo contido de diesel reduz o custo por hora trabalhada. Para quem alterna entre frentes pequenas — manutenção predial, redes, sinalização —, o U110 entrega o equilíbrio entre capacidade e portabilidade.',
      fecho('U110'),
    ],
    especificacoes: [
      ['Modelo', 'U110'],
      ['Vazão (FAD)', '100 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Perfil', 'Compacto e leve, fácil reboque'],
    ],
  },
  {
    slug: 'xas-88-kd',
    pitch:
      'Compressor de ar portátil diesel de <b>175 pcm a 7 bar</b> — o porte intermediário clássico da construção civil, para duas ferramentas pneumáticas simultâneas.',
    descricao: [
      '<b>O Atlas Copco XAS 88 Kd é um compressor de ar portátil diesel de 175 pcm e 7 bar de pressão de trabalho, porte intermediário da linha XAS para a construção civil.</b> Com essa vazão, alimenta com folga dois rompedores médios trabalhando ao mesmo tempo.',
      'É um dos compressores mais presentes em canteiros brasileiros: demolição de pisos e calçadas, abertura de valas, compactação e ferramentas de perfuração. O chassi rebocável com carenagem em aço aguenta a rotina de transporte entre obras, e a mecânica da linha XAS é conhecida pela facilidade de manutenção — pontos de serviço acessíveis e intervalos longos entre revisões, o que importa quando o equipamento roda o ano inteiro.',
      fecho('XAS 88 Kd', 'Kits de manutenção 250/500/1000 horas disponíveis em pronta-entrega.'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 88 Kd'],
      ['Vazão (FAD)', '175 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Capacidade típica', '2 rompedores médios simultâneos'],
    ],
  },
  {
    slug: 'u190-pace',
    pitch:
      'Compressor portátil com sistema <b>PACE</b>: vazão de 90 a 190 pcm e pressão ajustável de 5 a 10,5 bar — um equipamento que se reconfigura eletronicamente para cada serviço.',
    descricao: [
      '<b>O Atlas Copco U190 PACE é um compressor de ar portátil com vazão de 90 a 190 pcm e pressão ajustável de 5 a 10,5 bar pelo sistema PACE (Pressure Adjusted thru Cognitive Electronics).</b> Em vez de um ponto fixo de trabalho, o operador seleciona no controlador a pressão exata que a aplicação pede — e o compressor entrega a vazão correspondente.',
      'Na prática, um único U190 substitui compressores diferentes: 7 bar para ferramentas pneumáticas comuns, pressões maiores para perfuração e aplicações específicas. Para locadoras e empresas com serviços variados, isso significa frota menor e utilização maior — o mesmo equipamento atende a obra de segunda e o jateamento de sábado. O ajuste fica registrado no controlador, evitando operação fora da faixa.',
      fecho('U190 PACE'),
    ],
    especificacoes: [
      ['Modelo', 'U190 PACE'],
      ['Vazão (FAD)', '90–190 pcm'],
      ['Pressão de trabalho', '5–10,5 bar (ajustável)'],
      ['Sistema', 'PACE — pressão regulada eletronicamente'],
      ['Acionamento', 'Motor diesel'],
    ],
  },
  {
    slug: 'xahs-157',
    pitch:
      'Compressor portátil de alta pressão: <b>300 pcm a 12 bar</b> — ar para perfuração, jateamento e aplicações que exigem mais do que os 7 bar convencionais.',
    descricao: [
      '<b>O Atlas Copco XAHS 157 é um compressor de ar portátil de alta pressão, com 300 pcm de vazão a 12 bar de pressão de trabalho.</b> O “H” da nomenclatura indica a família high pressure da linha XA — projetada para aplicações em que os 7 bar de um compressor convencional não bastam.',
      'É o equipamento de jateamento abrasivo, perfuração com martelo de fundo de furo (DTH), ensaios de estanqueidade e fibra óptica (lançamento de cabos por sopro). Nos 12 bar, ferramentas e marteletes de perfuração atingem produtividade plena, e o jato abrasivo mantém pressão constante mesmo em mangueiras longas. A carenagem silenciada permite trabalhar em áreas urbanas, e o chassi rebocável acompanha a equipe de obra em obra.',
      fecho('XAHS 157'),
    ],
    especificacoes: [
      ['Modelo', 'XAHS 157'],
      ['Vazão (FAD)', '300 pcm'],
      ['Pressão de trabalho', '12 bar'],
      ['Família', 'XAHS — alta pressão'],
      ['Aplicações típicas', 'Jateamento · perfuração DTH · fibra óptica'],
    ],
  },
  {
    slug: 'xas-157-pdg',
    pitch:
      'Compressor portátil de <b>321 pcm a 7 bar</b> com <b>gerador de energia integrado</b> — ar comprimido e eletricidade num único equipamento rebocável.',
    descricao: [
      '<b>O Atlas Copco XAS 157 PdG é um compressor de ar portátil de 321 pcm e 7 bar com gerador de energia elétrica integrado.</b> Um único equipamento, um único motor diesel, duas utilidades de canteiro: ar comprimido para as ferramentas pneumáticas e energia para iluminação, ferramentas elétricas e equipamentos de apoio.',
      'Para frentes de obra sem acesso à rede elétrica — rodovias, redes de saneamento, obras rurais — o PdG elimina a necessidade de rebocar dois equipamentos, com economia direta de mobilização, manutenção e espaço. A energia disponível alimenta também soldas e bombas pequenas, mantendo a frente autônoma o dia inteiro com um único abastecimento.',
      fecho('XAS 157 PdG'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 157 PdG'],
      ['Vazão (FAD)', '321 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Diferencial', 'Gerador de energia elétrica integrado'],
      ['Acionamento', 'Motor diesel único para ar + energia'],
    ],
  },
  {
    slug: 'xas-300-pd',
    pitch:
      'Compressor de ar portátil diesel de <b>300 pcm a 7 bar</b> — o cavalo de batalha para serviços de campo com várias ferramentas simultâneas.',
    descricao: [
      '<b>O Atlas Copco XAS 300 PD é um compressor de ar portátil diesel de 300 pcm e 7 bar de pressão de trabalho.</b> É o porte que sustenta uma frente de obra completa: três a quatro rompedores médios operando ao mesmo tempo, ou combinações de ferramentas pneumáticas, perfuradores e equipamentos de pintura.',
      'Serviços de campo pedem confiabilidade acima de tudo — e a linha XAS é referência mundial nisso há décadas. A carenagem resistente protege o conjunto em estradas e canteiros, os pontos de manutenção são agrupados para revisão rápida, e o controle de carga ajusta o motor à demanda real de ar, economizando diesel nos intervalos entre picos de uso. Para empreiteiras e locadoras, é um ativo de giro garantido.',
      fecho('XAS 300 PD'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 300 PD'],
      ['Vazão (FAD)', '300 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Capacidade típica', '3–4 rompedores médios simultâneos'],
    ],
  },
  {
    slug: 'xahs-300-pd',
    pitch:
      'Compressor portátil de alta pressão: <b>285 pcm a 12 bar</b> — produtividade plena em jateamento e perfuração de médio porte.',
    descricao: [
      '<b>O Atlas Copco XAHS 300 PD é um compressor de ar portátil de alta pressão com 285 pcm de vazão a 12 bar de trabalho.</b> Pertence à família XAHS, dimensionada para as aplicações que exigem pressão acima do padrão da construção civil.',
      'Com 12 bar disponíveis, o jateamento abrasivo mantém o padrão de acabamento em superfícies extensas, e os martelos de perfuração DTH alcançam avanço de furo consistente em rocha. É também o compressor de ensaios de pressão em tubulações e do lançamento de cabos por ar em redes de telecomunicações. O conjunto silenciado e rebocável segue a equipe em qualquer logística — do pátio industrial à obra remota.',
      fecho('XAHS 300 PD'),
    ],
    especificacoes: [
      ['Modelo', 'XAHS 300 PD'],
      ['Vazão (FAD)', '285 pcm'],
      ['Pressão de trabalho', '12 bar'],
      ['Família', 'XAHS — alta pressão'],
      ['Aplicações típicas', 'Jateamento · perfuração · ensaios de pressão'],
    ],
  },
  {
    slug: 'xats-300-pd',
    pitch:
      'Compressor portátil versátil de <b>286 pcm a 10 bar</b> — a faixa intermediária de pressão que cobre construção e aplicações técnicas com um só equipamento.',
    descricao: [
      '<b>O Atlas Copco XATS 300 Pd é um compressor de ar portátil de 286 pcm e 10 bar de pressão de trabalho — a família XATS fica no meio do caminho entre os 7 bar convencionais e os 12 bar de alta pressão.</b> Essa posição faz dele um dos portáteis mais versáteis do catálogo.',
      'Nos 10 bar, atende tanto as ferramentas pneumáticas comuns da obra quanto boa parte das aplicações técnicas: perfuração leve, jateamento de manutenção, ensaios e limpeza de linhas. Locadoras gostam da família XATS exatamente por isso — um equipamento que serve a mais clientes. O motor diesel com controle de carga module o consumo conforme a demanda, e a carenagem silenciada viabiliza o trabalho em áreas com restrição de ruído.',
      fecho('XATS 300 Pd'),
    ],
    especificacoes: [
      ['Modelo', 'XATS 300 Pd'],
      ['Vazão (FAD)', '286 pcm'],
      ['Pressão de trabalho', '10 bar'],
      ['Família', 'XATS — pressão intermediária'],
      ['Perfil', 'Versátil: obra + aplicações técnicas'],
    ],
  },
  {
    slug: 'xats-167',
    pitch:
      'Compressor portátil de <b>335 pcm a 10 bar</b> — vazão de sobra para a construção civil com a flexibilidade da pressão intermediária.',
    descricao: [
      '<b>O Atlas Copco XATS 167 é um compressor de ar portátil de 335 pcm e 10 bar de pressão de trabalho.</b> Combina a vazão que uma frente de obra completa consome com a pressão intermediária da família XATS, acima do padrão de 7 bar.',
      'Essa combinação atende canteiros com mix de equipamentos: rompedores e compactadores pneumáticos ao lado de perfuradores e ferramentas que rendem mais a 10 bar. A reserva de pressão também compensa perdas em redes de mangueira longas, comuns em obras lineares — saneamento, pavimentação, redes elétricas subterrâneas. Manutenção simples e pontos de serviço agrupados mantêm o equipamento disponível, obra após obra.',
      fecho('XATS 167'),
    ],
    especificacoes: [
      ['Modelo', 'XATS 167'],
      ['Vazão (FAD)', '335 pcm'],
      ['Pressão de trabalho', '10 bar'],
      ['Família', 'XATS — pressão intermediária'],
      ['Aplicações típicas', 'Construção civil · obras lineares'],
    ],
  },
  {
    slug: 'xas-187',
    pitch:
      'Compressor de ar portátil diesel de <b>400 pcm a 7 bar</b> — capacidade para mobilizar uma equipe inteira de ferramentas pneumáticas.',
    descricao: [
      '<b>O Atlas Copco XAS 187 é um compressor de ar portátil diesel de 400 pcm e 7 bar de pressão de trabalho.</b> É o degrau acima do XAS 88 na linha mais tradicional de portáteis da Atlas Copco, com o dobro da capacidade de ar.',
      'Com 400 pcm, uma única máquina alimenta quatro a cinco rompedores médios simultâneos — a demolição de uma laje, a abertura de uma vala extensa ou várias frentes pequenas ao mesmo tempo. Para a empreiteira, isso significa menos equipamentos no canteiro, menos abastecimentos e uma única manutenção. A robustez da linha XAS em estrada e obra é o motivo de ela ser uma das mais locadas do Brasil.',
      fecho('XAS 187'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 187'],
      ['Vazão (FAD)', '400 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Capacidade típica', '4–5 rompedores médios simultâneos'],
    ],
  },
  {
    slug: 'xas-770',
    pitch:
      'Compressor de ar portátil de grande porte: <b>771 pcm a 7 bar</b> — ar para grandes obras, paradas industriais e múltiplas frentes simultâneas.',
    descricao: [
      '<b>O Atlas Copco XAS 770 é um compressor de ar portátil de grande porte, com 771 pcm de vazão a 7 bar de pressão de trabalho.</b> É a categoria de equipamento que sustenta grandes obras e serviços industriais de fôlego.',
      'Essa vazão alimenta redes provisórias de ar comprimido inteiras: paradas de manutenção em fábricas, montagens industriais, obras de infraestrutura com dezenas de ferramentas em operação. Em vez de espalhar compressores pequenos, uma única unidade centraliza o fornecimento, simplificando abastecimento, manutenção e controle. O conjunto silenciado permite posicionar o equipamento próximo à frente de trabalho sem violar limites de ruído.',
      fecho('XAS 770'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 770'],
      ['Vazão (FAD)', '771 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Porte', 'Grande — múltiplas frentes simultâneas'],
      ['Aplicações típicas', 'Grandes obras · paradas industriais'],
    ],
  },
  {
    slug: 'xahs-805',
    pitch:
      'Compressor portátil de alta pressão e grande vazão: <b>800 pcm a 12 bar</b> — o padrão da perfuração em mineração e grandes jateamentos.',
    descricao: [
      '<b>O Atlas Copco XAHS 805 é um compressor de ar portátil de 800 pcm a 12 bar de pressão de trabalho — alta pressão e grande vazão no mesmo equipamento.</b> É a combinação exigida pela perfuração de produção e pelos serviços pesados de tratamento de superfície.',
      'Na mineração e em pedreiras, o XAHS 805 alimenta perfuratrizes DTH de produção, mantendo avanço de furo constante mesmo em rocha dura. No setor naval e industrial, sustenta jateamento abrasivo de grandes áreas com múltiplos operadores simultâneos. A carenagem robusta enfrenta o ambiente de mina, e o controle eletrônico do motor otimiza o diesel em ciclos longos de operação contínua.',
      fecho('XAHS 805'),
    ],
    especificacoes: [
      ['Modelo', 'XAHS 805'],
      ['Vazão (FAD)', '800 pcm'],
      ['Pressão de trabalho', '12 bar'],
      ['Família', 'XAHS — alta pressão'],
      ['Aplicações típicas', 'Perfuração DTH · mineração · jateamento pesado'],
    ],
  },
  {
    slug: 'xats-805',
    pitch:
      'Compressor portátil de grande vazão com pressão intermediária: <b>805 pcm a 10 bar</b> — flexibilidade para grandes obras com demandas variadas.',
    descricao: [
      '<b>O Atlas Copco XATS 805 é um compressor de ar portátil de 805 pcm e 10 bar de pressão de trabalho.</b> Une o porte dos grandes compressores de obra à pressão intermediária da família XATS — flexível o bastante para servir aplicações distintas no mesmo contrato.',
      'Em grandes obras de infraestrutura, é comum a demanda alternar entre ferramentas convencionais de 7 bar e equipamentos que rendem mais a 10 bar: o XATS 805 cobre os dois cenários sem troca de máquina. Centraliza o ar de dezenas de pontos de consumo, reduz a frota mobilizada e mantém reserva de pressão para redes longas de distribuição dentro do canteiro.',
      fecho('XATS 805'),
    ],
    especificacoes: [
      ['Modelo', 'XATS 805'],
      ['Vazão (FAD)', '805 pcm'],
      ['Pressão de trabalho', '10 bar'],
      ['Família', 'XATS — pressão intermediária'],
      ['Porte', 'Grande — obras de infraestrutura'],
    ],
  },
  {
    slug: 'xams-900',
    pitch:
      'Compressor de ar portátil de <b>900 pcm a 9 bar</b> — grande vazão para obras pesadas e serviços industriais contínuos.',
    descricao: [
      '<b>O Atlas Copco XAMS 900 é um compressor de ar portátil de 900 pcm e 9 bar de pressão de trabalho, da família XAMS de pressão média-alta.</b> É um dos maiores portáteis sobre chassi do catálogo, projetado para operação contínua em serviço pesado.',
      'A vazão de 900 pcm sustenta operações que não param: túneis e galerias com várias perfuratrizes, jateamento industrial em turnos, redes provisórias de grandes montagens. Os 9 bar dão margem de pressão sobre o padrão da construção, compensando perdas de linha e mantendo as ferramentas no ponto ideal de operação. Robustez de mina, manutenção agrupada e telemetria de motor completam o pacote de disponibilidade.',
      fecho('XAMS 900'),
    ],
    especificacoes: [
      ['Modelo', 'XAMS 900'],
      ['Vazão (FAD)', '900 pcm'],
      ['Pressão de trabalho', '9 bar'],
      ['Família', 'XAMS — pressão média-alta'],
      ['Perfil', 'Operação contínua em serviço pesado'],
    ],
  },
  {
    slug: 'xats-910',
    pitch:
      'Compressor portátil de <b>910 pcm a 10 bar</b> — a maior vazão da família XATS, para mineração e obras de grande escala.',
    descricao: [
      '<b>O Atlas Copco XATS 910 é um compressor de ar portátil de 910 pcm e 10 bar de pressão de trabalho — o topo da família XATS em vazão.</b> Foi projetado para os consumos de ar da mineração e das obras de grande escala.',
      'Alimenta perfuratrizes, sistemas de bombeamento pneumático e frentes múltiplas com folga de capacidade, mantendo pressão estável mesmo com todos os pontos consumindo ao mesmo tempo. Em mineração, a confiabilidade é o critério número um: a linha XATS responde com componentes dimensionados para poeira, vibração e jornadas de 24 horas, além de intervalos de manutenção que maximizam a disponibilidade do ativo.',
      fecho('XATS 910'),
    ],
    especificacoes: [
      ['Modelo', 'XATS 910'],
      ['Vazão (FAD)', '910 pcm'],
      ['Pressão de trabalho', '10 bar'],
      ['Família', 'XATS — maior vazão da linha'],
      ['Aplicações típicas', 'Mineração · grandes obras'],
    ],
  },
  {
    slug: 'w1100',
    pitch:
      'Compressor portátil de altíssima pressão: <b>1.000–1.100 pcm a 19–28 bar</b> — projetado para perfuração profunda de poços e rocha.',
    descricao: [
      '<b>O Atlas Copco W1100 é um compressor de ar portátil de altíssima pressão: 1.000 a 1.100 pcm de vazão com pressão de trabalho de 19 a 28 bar.</b> É uma categoria à parte entre os portáteis — feita para a perfuração profunda, onde a pressão define o alcance do furo.',
      'Na perfuração de poços artesianos e geotermia, o martelo DTH precisa de pressão crescente conforme a profundidade aumenta e a coluna d’água pesa sobre o furo: os 28 bar do W1100 mantêm a perfuração produtiva onde compressores convencionais param. Também atende perfuração de rocha em mineração e obras especiais de fundação. Para perfuristas, é o equipamento que destrava contratos de maior profundidade.',
      fecho('W1100'),
    ],
    especificacoes: [
      ['Modelo', 'W1100'],
      ['Vazão (FAD)', '1.000–1.100 pcm'],
      ['Pressão de trabalho', '19–28 bar'],
      ['Categoria', 'Altíssima pressão'],
      ['Aplicações típicas', 'Poços artesianos · perfuração profunda DTH'],
    ],
  },
  {
    slug: 'x1200',
    pitch:
      'Compressor portátil de <b>1.000–1.200 pcm com 16 a 30 bar</b> — o topo de linha para perfuração de alta exigência, com faixa de pressão configurável.',
    descricao: [
      '<b>O Atlas Copco X1200 é um compressor de ar portátil de 1.000 a 1.200 pcm com pressão de trabalho configurável de 16 a 30 bar — o topo da oferta para perfuração de alta exigência.</b> Vazão de grande porte e pressão extrema no mesmo chassi.',
      'A faixa ajustável de pressão acompanha o projeto do furo: pressões menores na fase inicial, máxima nos trechos profundos — sem trocar de compressor no meio do serviço. É o equipamento dos contratos de poços profundos, perfuração mineral e obras especiais em rocha, onde cada metro adicional de alcance se converte diretamente em receita. O conjunto é dimensionado para operação contínua em campo, com proteção para ambientes severos.',
      fecho('X1200'),
    ],
    especificacoes: [
      ['Modelo', 'X1200'],
      ['Vazão (FAD)', '1.000–1.200 pcm'],
      ['Pressão de trabalho', '16–30 bar (configurável)'],
      ['Categoria', 'Altíssima pressão — topo de linha'],
      ['Aplicações típicas', 'Perfuração profunda · poços · mineração'],
    ],
  },
  {
    slug: 'xavs-1600',
    pitch:
      'Compressor portátil de <b>1.600 pcm com pressão variável de 7 a 14 bar</b> — vazão máxima e flexibilidade total num único equipamento.',
    descricao: [
      '<b>O Atlas Copco XAVS 1600 é um compressor de ar portátil de 1.600 pcm com pressão de trabalho variável de 7 a 14 bar.</b> O “V” da nomenclatura indica a pressão ajustável: o operador configura o ponto de trabalho conforme a aplicação, da pressão convencional de obra até 14 bar.',
      'Com a maior vazão da seleção portátil, uma única unidade substitui um conjunto de compressores: alimenta redes inteiras de ferramentas, perfuração, jateamento e ensaios — alternando o perfil de pressão entre serviços sem mobilizar outro ativo. Para locadoras e grandes empreiteiras, o XAVS 1600 maximiza a taxa de utilização da frota; para a operação, simplifica logística, abastecimento e manutenção em um só ponto.',
      fecho('XAVS 1600'),
    ],
    especificacoes: [
      ['Modelo', 'XAVS 1600'],
      ['Vazão (FAD)', '1.600 pcm'],
      ['Pressão de trabalho', '7–14 bar (variável)'],
      ['Categoria', 'Grande vazão com pressão ajustável'],
      ['Aplicações típicas', 'Redes de obra · perfuração · jateamento'],
    ],
  },
];

await aplicar(conteudos);
