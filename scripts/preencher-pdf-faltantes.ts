// Conteúdo de PDP para os 16 produtos do lote do PDF (Apresentação ACBSul rev01
// 26.05.26) que estavam PUBLICADOS mas sem página própria (sem pitch/descrição).
// Números (vazão pcm / pressão bar / cobertura m² / autonomia h): do próprio PDF.
// Uso: npx tsx scripts/preencher-pdf-faltantes.ts
import { aplicar, type Conteudo } from './aplicar-conteudo';

const fecho = (nome: string, extra = '') =>
  `Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul fornece o ${nome} para <b>venda ou locação</b>, com peças originais e assistência técnica em campo no RS e em Santa Catarina. O atendimento parte de Porto Alegre e cobre a região metropolitana e o interior, com orçamento rápido pelo WhatsApp da categoria.${extra ? ' ' + extra : ''}`;

const conteudos: Conteudo[] = [
  // ===================== LINHA SMALL AIR =====================
  {
    slug: 'xas-58-kd',
    pitch:
      'Compressor de ar portátil diesel da linha Small Air com <b>115 pcm a 7 bar</b> — leve o bastante para rebocar atrás de um automóvel comum, sem habilitação especial.',
    descricao: [
      '<b>O Atlas Copco XAS 58 Kd é um compressor de ar portátil diesel da linha Small Air (Série 8), com vazão de 115 pcm e pressão de trabalho de 7 bar.</b> É o porte intermediário da família mais compacta de portáteis da Atlas Copco, resultado de mais de uma década de desenvolvimento contínuo.',
      'A Série 8 reúne motor diesel, refrigerador complementar e tanque de combustível de tamanho normal em um conjunto leve e compacto — possível de transportar atrás de um automóvel normal, sem licença especial de condução. Com 115 pcm, o XAS 58 Kd alimenta ferramentas pneumáticas de manutenção, instalação e pequenas obras: rompedores leves, perfuradores manuais, pistolas de pintura e ferramentas de aperto. A carroceria HH (Hardhat) protege os componentes no transporte e na operação em via pública, e o equipamento é oferecido nas versões UC (com rodas, rebocável) e SKID (sem rodas, para montar em caminhão utilitário).',
      fecho('XAS 58 Kd'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 58 Kd'],
      ['Linha', 'Small Air (Série 8)'],
      ['Vazão (FAD)', '115 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Carroceria', 'HH (Hardhat)'],
      ['Versões', 'UC (com rodas) · SKID (sem rodas)'],
    ],
  },
  {
    slug: 'xas-98-kd',
    pitch:
      'Compressor de ar portátil diesel da linha Small Air com <b>186 pcm a 7 bar</b> — o topo da Série 8, compacto e rebocável por veículo comum.',
    descricao: [
      '<b>O Atlas Copco XAS 98 Kd é um compressor de ar portátil diesel da linha Small Air (Série 8), com vazão de 186 pcm e pressão de trabalho de 7 bar.</b> É o maior modelo da família compacta da Atlas Copco, capaz de produzir até cerca de 5 m³/min de ar em um conjunto leve.',
      'A Série 8 integra motor diesel, refrigerador complementar e tanque de combustível de tamanho normal num pacote que pode ser transportado atrás de um automóvel normal, sem licença especial de condução. Com 186 pcm, o XAS 98 Kd já sustenta duas frentes de ferramentas pneumáticas simultâneas: rompedores médios, marteletes, perfuradores e equipamentos de jateamento leve em obras de construção civil e manutenção urbana. A carroceria HH (Hardhat) protege o conjunto contra impactos e intempéries, e há versões UC (com rodas, para reboque) e SKID (sem rodas, para integrar a um caminhão de serviço).',
      fecho('XAS 98 Kd'),
    ],
    especificacoes: [
      ['Modelo', 'XAS 98 Kd'],
      ['Linha', 'Small Air (Série 8)'],
      ['Vazão (FAD)', '186 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Carroceria', 'HH (Hardhat)'],
      ['Versões', 'UC (com rodas) · SKID (sem rodas)'],
    ],
  },

  // ===================== LINHA MEDIUM X-AIR =====================
  {
    slug: 'x-air-290-14',
    pitch:
      'Compressor de ar portátil diesel de alta pressão: <b>272 pcm a 14 bar</b> — linha X-Air para perfuração, rompimento e jateamento nas condições mais severas.',
    descricao: [
      '<b>O Atlas Copco X-Air 290/14 Pd é um compressor de ar portátil diesel da linha Medium X-Air, com vazão de 272 pcm e pressão de trabalho de 14 bar.</b> A pressão elevada o destina às aplicações que exigem mais do que os 7 bar convencionais de obra.',
      'Os compressores X-Air foram projetados para trabalhar nas condições mais adversas e são reconhecidos pela confiabilidade e eficiência — em serviços com perfuratrizes, rompedores, marteletes, concreto projetado e jateamento. A robustez do projeto assegura longa vida útil e elevado valor de revenda. O elemento compressor de parafuso de alta eficiência é combinado com motor diesel e ventilador dimensionados para o menor consumo de combustível da categoria, garantindo baixo custo operacional. O equipamento está disponível nas versões UC (com rodas, rebocável) e SKID (sem rodas), adaptando-se à logística de cada canteiro.',
      fecho('X-Air 290/14 Pd'),
    ],
    especificacoes: [
      ['Modelo', 'X-Air 290/14 Pd'],
      ['Linha', 'Medium X-Air'],
      ['Vazão (FAD)', '272 pcm'],
      ['Pressão de trabalho', '14 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Aplicações típicas', 'Perfuração · rompimento · jateamento'],
      ['Versões', 'UC (com rodas) · SKID (sem rodas)'],
    ],
  },
  {
    slug: 'x-air-300-12',
    pitch:
      'Compressor de ar portátil diesel de <b>296 pcm a 12 bar</b> — linha X-Air para obras pesadas, com baixo consumo de combustível da categoria.',
    descricao: [
      '<b>O Atlas Copco X-Air 300/12 Pd é um compressor de ar portátil diesel da linha Medium X-Air, com vazão de 296 pcm e pressão de trabalho de 12 bar.</b> A faixa de 12 bar atende às aplicações que pedem alta pressão sem chegar ao porte de perfuração profunda.',
      'A linha X-Air foi projetada para as condições mais adversas e é reconhecida pela confiabilidade e eficiência em trabalhos com perfuratrizes, rompedores, marteletes, concreto projetado e jateamento. A robustez do projeto assegura longa vida útil e elevado valor de revenda. O elemento compressor de parafuso de alta eficiência, aliado a motor diesel e ventilador otimizados, entrega o menor consumo de combustível da categoria e baixo custo operacional ao longo de toda a vida do equipamento. Há versões UC (com rodas, para reboque) e SKID (sem rodas), conforme a forma de transporte e instalação na obra.',
      fecho('X-Air 300/12 Pd'),
    ],
    especificacoes: [
      ['Modelo', 'X-Air 300/12 Pd'],
      ['Linha', 'Medium X-Air'],
      ['Vazão (FAD)', '296 pcm'],
      ['Pressão de trabalho', '12 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Aplicações típicas', 'Perfuração · rompimento · jateamento'],
      ['Versões', 'UC (com rodas) · SKID (sem rodas)'],
    ],
  },
  {
    slug: 'x-air-350-10',
    pitch:
      'Compressor de ar portátil diesel de <b>339 pcm a 10 bar</b> — linha X-Air com pressão intermediária e grande vazão para a construção pesada.',
    descricao: [
      '<b>O Atlas Copco X-Air 350/10 Pd é um compressor de ar portátil diesel da linha Medium X-Air, com vazão de 339 pcm e pressão de trabalho de 10 bar.</b> Combina vazão de sobra para várias ferramentas simultâneas com a pressão intermediária que muitas aplicações técnicas exigem.',
      'Os compressores X-Air foram projetados para trabalhar nas condições mais adversas e são reconhecidos pela confiabilidade e eficiência — em serviços com perfuratrizes, rompedores, marteletes, concreto projetado e jateamento. A robustez do projeto assegura longa vida útil e elevado valor de revenda. O elemento compressor de parafuso de alta eficiência é combinado com motor diesel e ventilador dimensionados para o menor consumo de combustível da categoria, mantendo o custo operacional baixo mesmo em jornadas longas. O equipamento é oferecido nas versões UC (com rodas, rebocável) e SKID (sem rodas), adaptando-se à logística de transporte de cada frente de obra.',
      fecho('X-Air 350/10 Pd'),
    ],
    especificacoes: [
      ['Modelo', 'X-Air 350/10 Pd'],
      ['Linha', 'Medium X-Air'],
      ['Vazão (FAD)', '339 pcm'],
      ['Pressão de trabalho', '10 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Aplicações típicas', 'Construção pesada · perfuração · jateamento'],
      ['Versões', 'UC (com rodas) · SKID (sem rodas)'],
    ],
  },
  {
    slug: 'x-air-400-7',
    pitch:
      'Compressor de ar portátil diesel de <b>404 pcm a 7 bar</b> — o maior da linha X-Air, para mobilizar várias ferramentas pneumáticas ao mesmo tempo.',
    descricao: [
      '<b>O Atlas Copco X-Air 400/7 Pd é um compressor de ar portátil diesel da linha Medium X-Air, com vazão de 404 pcm e pressão de trabalho de 7 bar.</b> É o modelo de maior vazão da família X-Air na pressão padrão de obra, dimensionado para alimentar uma equipe inteira de ferramentas pneumáticas.',
      'Com 404 pcm, uma única máquina sustenta quatro a cinco rompedores médios simultâneos ou combinações de marteletes, perfuradores e equipamentos de concreto projetado. A linha X-Air foi projetada para as condições mais adversas e é reconhecida pela confiabilidade e eficiência, com robustez que assegura longa vida útil e elevado valor de revenda. O elemento compressor de parafuso de alta eficiência, combinado com motor diesel e ventilador otimizados, garante o menor consumo de combustível da categoria — menos abastecimentos por jornada e custo operacional reduzido. Há versões UC (com rodas, para reboque) e SKID (sem rodas) conforme a necessidade da obra.',
      fecho('X-Air 400/7 Pd'),
    ],
    especificacoes: [
      ['Modelo', 'X-Air 400/7 Pd'],
      ['Linha', 'Medium X-Air'],
      ['Vazão (FAD)', '404 pcm'],
      ['Pressão de trabalho', '7 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Capacidade típica', '4–5 rompedores médios simultâneos'],
      ['Versões', 'UC (com rodas) · SKID (sem rodas)'],
    ],
  },

  // ===================== LINHA MEDIUM (XAS boX) =====================
  {
    slug: 'xahs-450-cud',
    pitch:
      'Compressor de ar portátil de alta pressão da linha XAS boX: <b>441 pcm a 12 bar</b> — robustez e facilidade de manutenção para as condições de obra mais difíceis.',
    descricao: [
      '<b>O Atlas Copco XAHS 450 Cud é um compressor de ar portátil de alta pressão da linha XAS boX, com vazão de 441 pcm e pressão de trabalho de 12 bar.</b> A linha XAS boX é o resultado de dez anos de desenvolvimento contínuo, cobrindo a faixa de 400 a 850 pcm.',
      'O XAHS 450 Cud foi projetado para suportar as condições de trabalho mais difíceis: faixa de temperatura operacional padrão de -10 °C a +50 °C e chassi robusto que garante operação confiável. A pressão de 12 bar atende jateamento, perfuração e ferramentas que rendem mais acima do padrão de obra. O design, o controlador e a modularidade colocam o operador no controle, e o forte foco em facilidade de serviço — pontos de manutenção acessíveis — maximiza o tempo de atividade e a utilização do equipamento, fator decisivo para empreiteiras e locadoras que mantêm o ativo em operação o ano inteiro.',
      fecho('XAHS 450 Cud'),
    ],
    especificacoes: [
      ['Modelo', 'XAHS 450 Cud'],
      ['Linha', 'XAS boX (Medium)'],
      ['Vazão (FAD)', '441 pcm'],
      ['Pressão de trabalho', '12 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Temperatura operacional', '-10 °C a +50 °C'],
      ['Aplicações típicas', 'Jateamento · perfuração · alta pressão'],
    ],
  },
  {
    slug: 'xahs-750-cud',
    pitch:
      'Compressor de ar portátil de alta pressão da linha XAS boX: <b>727 pcm a 12 bar</b> — grande vazão e robustez para serviços pesados e contínuos.',
    descricao: [
      '<b>O Atlas Copco XAHS 750 Cud é um compressor de ar portátil de alta pressão da linha XAS boX, com vazão de 727 pcm e pressão de trabalho de 12 bar.</b> É um dos modelos de maior capacidade da linha, que cobre a faixa de 400 a 850 pcm em resultado de dez anos de desenvolvimento contínuo.',
      'Com 727 pcm a 12 bar, o XAHS 750 Cud sustenta múltiplas frentes simultâneas de jateamento abrasivo e perfuração, ou redes provisórias de ar comprimido em grandes obras e paradas industriais. Foi projetado para as condições de trabalho mais difíceis: temperatura operacional padrão de -10 °C a +50 °C e chassi robusto que garante operação confiável. O design, o controlador e a modularidade dão controle total ao operador, e o foco em facilidade de serviço mantém o equipamento disponível — pontos de manutenção acessíveis reduzem o tempo de parada e elevam a utilização do ativo.',
      fecho('XAHS 750 Cud'),
    ],
    especificacoes: [
      ['Modelo', 'XAHS 750 Cud'],
      ['Linha', 'XAS boX (Medium)'],
      ['Vazão (FAD)', '727 pcm'],
      ['Pressão de trabalho', '12 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Temperatura operacional', '-10 °C a +50 °C'],
      ['Aplicações típicas', 'Jateamento · perfuração · grandes obras'],
    ],
  },
  {
    slug: 'xahs-850-cud-pace',
    pitch:
      'Compressor portátil da linha XAS boX com sistema <b>PACE</b>: vazão de 678 a 848 pcm e pressão ajustável de 5 a 12 bar — um equipamento que se reconfigura para cada serviço.',
    descricao: [
      '<b>O Atlas Copco XAHS 850 Cud PACE é um compressor de ar portátil da linha XAS boX, com vazão de 678 a 848 pcm e pressão ajustável de 5 a 12 bar pelo sistema PACE.</b> Em vez de um ponto fixo de trabalho, o operador seleciona a pressão exata que a aplicação exige, e o compressor entrega a vazão correspondente.',
      'Na prática, um único XAHS 850 Cud PACE substitui equipamentos diferentes: pressões menores para ferramentas pneumáticas comuns e até 12 bar para jateamento e perfuração de alta exigência. A linha XAS boX, fruto de dez anos de desenvolvimento, foi projetada para as condições de trabalho mais difíceis — temperatura operacional padrão de -10 °C a +50 °C e chassi robusto que garante operação confiável. Para locadoras e grandes empreiteiras, a flexibilidade do PACE significa frota menor e maior taxa de utilização, com o controlador registrando o ajuste e evitando operação fora da faixa. O foco em facilidade de serviço maximiza o tempo de atividade.',
      fecho('XAHS 850 Cud PACE'),
    ],
    especificacoes: [
      ['Modelo', 'XAHS 850 Cud PACE'],
      ['Linha', 'XAS boX (Medium)'],
      ['Vazão (FAD)', '678–848 pcm'],
      ['Pressão de trabalho', '5–12 bar (ajustável — PACE)'],
      ['Acionamento', 'Motor diesel'],
      ['Temperatura operacional', '-10 °C a +50 °C'],
      ['Sistema', 'PACE — pressão regulada eletronicamente'],
    ],
  },

  // ===================== LINHA LARGE LOW (X-Air+) =====================
  {
    slug: 'x-air-plus-815-14',
    pitch:
      'Compressor de ar portátil diesel de grande porte: <b>818 pcm a 14 bar</b> — linha X-Air⁺ Large com controlador inteligente Xc2003 e baixo custo total de propriedade.',
    descricao: [
      '<b>O Atlas Copco X-Air⁺ 815/14 MWMd é um compressor de ar portátil diesel de grande porte da linha Large Low, com vazão de 818 pcm e pressão de trabalho de 14 bar.</b> Resultado de extenso trabalho de pesquisa e desenvolvimento, oferece versatilidade e o menor custo total de propriedade da categoria.',
      'É uma solução leve e compacta para o porte, o que garante melhor manobrabilidade e transportabilidade entre frentes de obra. A pressão de 14 bar atende perfuração, jateamento pesado e redes provisórias de ar com várias ferramentas simultâneas. Todos os modelos da família contam com o controlador inteligente Xc2003, interface simples e intuitiva que facilita a operação no campo. O motor diesel MWM e o elemento compressor de alta eficiência mantêm o consumo de combustível baixo e o custo operacional sob controle, mesmo em jornadas contínuas de serviço pesado.',
      fecho('X-Air⁺ 815/14 MWMd'),
    ],
    especificacoes: [
      ['Modelo', 'X-Air⁺ 815/14 MWMd'],
      ['Linha', 'Large Low'],
      ['Vazão (FAD)', '818 pcm'],
      ['Pressão de trabalho', '14 bar'],
      ['Acionamento', 'Motor diesel MWM'],
      ['Controlador', 'Xc2003'],
      ['Aplicações típicas', 'Perfuração · jateamento pesado · redes de obra'],
    ],
  },
  {
    slug: 'x-air-plus-970-10',
    pitch:
      'Compressor portátil diesel de <b>992 pcm</b> com sistema <b>PACE</b> (pressão de 7 a 10 bar) — a maior vazão da linha X-Air⁺ Large, com controlador Xc2003.',
    descricao: [
      '<b>O Atlas Copco X-Air⁺ 970/10 MWMd é um compressor de ar portátil diesel de grande porte da linha Large Low, com vazão de 992 pcm e pressão ajustável de 7 a 10 bar pela funcionalidade PACE.</b> É o modelo de maior vazão da família X-Air⁺ Large.',
      'A funcionalidade PACE permite escolher a pressão ideal para a operação: o usuário define o ponto de trabalho e o compressor entrega a melhor vazão de ar para a aplicação, da pressão convencional de obra até 10 bar. Com 992 pcm, centraliza o fornecimento de redes provisórias inteiras em grandes obras e paradas industriais. É uma solução leve e compacta para o porte, com melhor manobrabilidade e transportabilidade. Todos os modelos contam com o controlador inteligente Xc2003, de interface simples e intuitiva, sem comprometer a eficiência no consumo de combustível e mantendo baixos os custos operacionais.',
      fecho('X-Air⁺ 970/10 MWMd'),
    ],
    especificacoes: [
      ['Modelo', 'X-Air⁺ 970/10 MWMd'],
      ['Linha', 'Large Low'],
      ['Vazão (FAD)', '992 pcm'],
      ['Pressão de trabalho', '7–10 bar (ajustável — PACE)'],
      ['Acionamento', 'Motor diesel MWM'],
      ['Controlador', 'Xc2003'],
      ['Aplicações típicas', 'Grandes obras · redes provisórias de ar'],
    ],
  },
  {
    slug: 'x-air-plus-900-20',
    pitch:
      'Compressor portátil diesel de altíssima pressão: <b>880 pcm</b> com <b>PACE</b> de 14 a 20 bar — linha X-Air⁺ Large para perfuração e aplicações de alta exigência.',
    descricao: [
      '<b>O Atlas Copco X-Air⁺ 900/20 MWMd é um compressor de ar portátil diesel da linha Large Low, com vazão de 880 pcm e pressão ajustável de 14 a 20 bar pela funcionalidade PACE.</b> É a versão de altíssima pressão da família X-Air⁺ Large, para aplicações que exigem muito acima do padrão de obra.',
      'A funcionalidade PACE permite escolher a pressão ideal — de 14 a 20 bar — e o compressor entrega a melhor vazão de ar para cada aplicação, sem troca de equipamento no meio do serviço. É o porte indicado para perfuração de produção, martelos de fundo de furo (DTH) e jateamento de alta pressão. A solução é leve e compacta para a categoria, com boa manobrabilidade e transportabilidade entre frentes. Todos os modelos contam com o controlador inteligente Xc2003, de interface simples e intuitiva, mantendo a eficiência no consumo de combustível e o menor custo total de propriedade da categoria.',
      fecho('X-Air⁺ 900/20 MWMd'),
    ],
    especificacoes: [
      ['Modelo', 'X-Air⁺ 900/20 MWMd'],
      ['Linha', 'Large Low'],
      ['Vazão (FAD)', '880 pcm'],
      ['Pressão de trabalho', '14–20 bar (ajustável — PACE)'],
      ['Acionamento', 'Motor diesel MWM'],
      ['Controlador', 'Xc2003'],
      ['Aplicações típicas', 'Perfuração DTH · jateamento de alta pressão'],
    ],
  },

  // ===================== LINHA DRILL AIR =====================
  {
    slug: 'y1300-sd',
    pitch:
      'Compressor portátil de perfuração da linha DrillAir: vazão de <b>1.166 a 1.309 pcm</b> e pressão de 17 a 35 bar — vazão máxima em qualquer ajuste de pressão.',
    descricao: [
      '<b>O Atlas Copco Y1300 Sd é um compressor de ar portátil da linha DrillAir, com vazão de 1.166 a 1.309 pcm e pressão de trabalho de 17 a 35 bar.</b> É um equipamento de altíssima pressão e grande vazão, projetado especificamente para perfuração.',
      'A linha DrillAir foi desenvolvida para melhorar a eficiência operacional, aumentando a velocidade de perfuração e reduzindo o consumo de combustível por metro perfurado. Projetada com base nos princípios científicos de pressão e vazão, atinge a vazão máxima em qualquer ajuste de pressão — vantagem decisiva conforme aumentam a profundidade do furo, o diâmetro e o tamanho do martelo. O Y1300 Sd atende perfuração de poços profundos, geotermia, mineração e fundações especiais, oferecendo flexibilidade para adaptar pressão e vazão às mudanças de profundidade do poço de maneira customizada para cada aplicação. Para perfuristas, é o equipamento que viabiliza contratos de maior alcance.',
      fecho('Y1300 Sd'),
    ],
    especificacoes: [
      ['Modelo', 'Y1300 Sd'],
      ['Linha', 'DrillAir'],
      ['Vazão (FAD)', '1.166–1.309 pcm'],
      ['Pressão de trabalho', '17–35 bar'],
      ['Acionamento', 'Motor diesel'],
      ['Aplicações típicas', 'Perfuração profunda · poços · mineração'],
    ],
  },

  // ===================== LINHA E-AIR (ELÉTRICO) =====================
  {
    slug: 'e-air-t400',
    pitch:
      'Compressor de ar portátil <b>100% elétrico</b> com <b>399 pcm a 10 bar</b> — ar comprimido sem emissões e silencioso para obras urbanas e ambientes fechados.',
    descricao: [
      '<b>O Atlas Copco E-AIR T400 é um compressor de ar portátil 100% elétrico que entrega 399 pcm a 10 bar de pressão de trabalho, sem consumo de diesel e sem emissões locais.</b> É o modelo de entrada da linha E-Air, que traz os benefícios dos equipamentos elétricos para frentes de trabalho de qualquer natureza.',
      'Por dispensar combustão, o E-AIR T400 opera onde um compressor a diesel não entra: túneis, ambientes fechados, indústrias e centros urbanos com restrição de ruído e de emissões. Os motores são eficientes e robustos, o nível de ruído é baixo e o design é plug-and-play — basta conectar à fonte de energia do local. Quando há rede elétrica disponível, usar eletricidade no lugar de diesel reduz os custos operacionais, dependendo do preço da energia, e elimina a manutenção de motor a combustão. Para empreiteiras que precisam cumprir exigências ambientais de editais, é uma solução de ar comprimido ecologicamente correta e eficiente.',
      fecho('E-AIR T400'),
    ],
    especificacoes: [
      ['Modelo', 'E-AIR T400'],
      ['Linha', 'E-Air'],
      ['Vazão (FAD)', '399 pcm'],
      ['Pressão de trabalho', '10 bar'],
      ['Acionamento', '100% elétrico (zero emissões locais)'],
      ['Vantagens', 'Baixo ruído · plug-and-play · sem custo de diesel'],
      ['Aplicações típicas', 'Obras urbanas · túneis · ambientes fechados'],
    ],
  },

  // ===================== TORRES DE ILUMINAÇÃO =====================
  {
    slug: 'hilight-v7-led',
    pitch:
      'Torre de iluminação LED Atlas Copco HiLight V7⁺ — cobertura de até <b>7.360 m²</b> e autonomia de até 105 horas, para obras, eventos e operações noturnas.',
    descricao: [
      '<b>A Atlas Copco HiLight V7⁺ é uma torre de iluminação LED móvel que cobre até 7.360 m² com média de 20 lux de brilho, e oferece autonomia de até 105 horas.</b> É um dos modelos de maior cobertura da linha HiLight, indicado para grandes áreas de obra e eventos.',
      'A iluminação LED garante luz uniforme e de qualidade com baixo consumo de combustível, o que se traduz na longa autonomia entre abastecimentos — vantagem direta em frentes de trabalho remotas e operação noturna contínua. A linha HiLight é reconhecida mundialmente pela qualidade, construção robusta e tamanho compacto, fáceis de transportar e posicionar no local. Uma única HiLight ilumina grandes áreas com segurança, aumentando a produtividade do canteiro enquanto atende aos padrões ambientais e de segurança. É solução típica para obras de infraestrutura, pátios industriais, eventos e serviços de emergência que exigem iluminação temporária confiável.',
      fecho('HiLight V7⁺'),
    ],
    especificacoes: [
      ['Modelo', 'HiLight V7⁺'],
      ['Tecnologia', 'Iluminação LED'],
      ['Cobertura', 'até 7.360 m²'],
      ['Autonomia', 'até 105 horas'],
      ['Brilho médio', '20 lux'],
      ['Aplicações típicas', 'Obras · eventos · operação noturna'],
    ],
  },
  {
    slug: 'hilight-ms4-solar',
    pitch:
      'Torre de iluminação <b>solar</b> Atlas Copco HiLight MS4 — cobertura de até <b>3.846 m²</b> com energia fotovoltaica, sem combustível e sem emissões.',
    descricao: [
      '<b>A Atlas Copco HiLight MS4 é uma torre de iluminação solar (fotovoltaica) que cobre até 3.846 m², funcionando com energia limpa e sem consumo de combustível.</b> Integra a linha HiLight de torres e geradores fotovoltaicos inovadores e fáceis de operar.',
      'Por ser alimentada por energia solar, a HiLight MS4 não gera emissões nem ruído de motor, sendo ideal para áreas com restrição ambiental, eventos, segurança de perímetro e canteiros que exigem iluminação sustentável. As baterias armazenam a energia captada durante o dia para a operação noturna, eliminando o custo recorrente de combustível e a manutenção de motor a combustão. A linha HiLight é reconhecida mundialmente pela qualidade, construção robusta e tamanho compacto, com abordagem operacional flexível que prioriza eficiência e segurança no local. É a opção da Atlas Copco para quem precisa atender aos padrões ambientais sem abrir mão de iluminação confiável.',
      fecho('HiLight MS4'),
    ],
    especificacoes: [
      ['Modelo', 'HiLight MS4'],
      ['Tecnologia', 'Iluminação solar (fotovoltaica)'],
      ['Cobertura', 'até 3.846 m²'],
      ['Energia', 'Solar — baterias para operação noturna'],
      ['Emissões', 'Zero — sem combustível e sem ruído de motor'],
      ['Aplicações típicas', 'Eventos · segurança · obras sustentáveis'],
    ],
  },
];

await aplicar(conteudos);
