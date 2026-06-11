// Conteúdo de PDP — rompedores (8), perfuratriz (1), bombas de vácuo (4),
// quality air (1) e motobombas (6). Fatos: chips aprovados do seed.
// Uso: npx tsx scripts/preencher-equipamentos.ts
import { aplicar, type Conteudo } from './aplicar-conteudo';

const fecho = (nome: string) =>
  `Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul fornece o ${nome} para <b>venda ou locação</b>, com peças originais e assistência técnica no RS e em Santa Catarina — atendimento a partir de Porto Alegre, cobrindo a região metropolitana e o interior, com orçamento rápido pelo WhatsApp da categoria.`;

const conteudos: Conteudo[] = [
  /* ============ ROMPEDORES ============ */
  {
    slug: 'tex-21-pe',
    pitch:
      'Rompedor pneumático <b>ergonômico</b> para demolição leve — concretos, pisos e asfalto, com empunhadura de vibração reduzida para jornadas inteiras.',
    descricao: [
      '<b>O Atlas Copco TEX 21 PE é um rompedor pneumático ergonômico para demolição leve: pisos, calçadas, revestimentos e asfalto.</b> O sufixo PE indica a versão com empunhaduras de vibração reduzida — projetadas para proteger o operador na exposição diária à ferramenta.',
      'Na demolição leve, o que define produtividade é o conjunto operador + ferramenta: um rompedor mais leve e com menos vibração permite trabalhar mais tempo com precisão, especialmente em serviços de reparo urbano e reformas onde o golpe pesado demais danifica o que deve ficar. O TEX 21 PE é alimentado por qualquer compressor portátil da linha — um XAS 48 aciona a ferramenta com folga — e a mecânica pneumática simples praticamente dispensa manutenção além da lubrificação.',
      fecho('TEX 21 PE'),
    ],
    especificacoes: [
      ['Modelo', 'TEX 21 PE'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Classe', 'Demolição leve'],
      ['Ergonomia', 'Empunhadura com vibração reduzida (PE)'],
      ['Aplicações típicas', 'Pisos · calçadas · asfalto · reformas'],
    ],
  },
  {
    slug: 'tex-33-pe',
    pitch:
      'Rompedor pneumático ergonômico de classe média — o equilíbrio entre peso, impacto e conforto para a demolição do dia a dia da construção.',
    descricao: [
      '<b>O Atlas Copco TEX 33 PE é um rompedor pneumático ergonômico de classe média, dimensionado para a demolição rotineira da construção civil.</b> Versão PE: empunhaduras com amortecimento que reduzem a vibração transmitida ao operador.',
      'É o rompedor "de tudo um pouco" do canteiro: abre valas em solo compactado, demole concretos de média resistência, remove pavimentos e fundações leves. A classe intermediária de peso entrega energia de impacto suficiente para render sem exigir dois operadores no manuseio. Combinado a um compressor portátil de 175 pcm, forma a dupla clássica das equipes de obra civil — simples, robusta e de manutenção mínima.',
      fecho('TEX 33 PE'),
    ],
    especificacoes: [
      ['Modelo', 'TEX 33 PE'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Classe', 'Demolição média'],
      ['Ergonomia', 'Empunhadura com vibração reduzida (PE)'],
      ['Aplicações típicas', 'Valas · concreto médio · pavimentos'],
    ],
  },
  {
    slug: 'tex-40-pe',
    pitch:
      'Rompedor pneumático ergonômico de classe pesada — energia de impacto para concreto estrutural e fundações, com proteção ao operador.',
    descricao: [
      '<b>O Atlas Copco TEX 40 PE é um rompedor pneumático ergonômico de classe pesada, para demolição de concreto estrutural, fundações e rocha branda.</b> A massa maior converte o ar comprimido em golpes de alta energia, encurtando o tempo de cada demolição.',
      'Quando o serviço é concreto armado, base de máquina ou pavimento espesso, a classe pesada faz diferença: menos golpes por volume demolido e avanço constante onde rompedores leves apenas “picam” a superfície. As empunhaduras PE com amortecimento mantêm a exposição à vibração sob controle mesmo com a energia elevada — fator de segurança do trabalho que pesa em obras fiscalizadas. Robustez pneumática: sem eletrônica, sem motor, manutenção resumida a lubrificação e ponteiros.',
      fecho('TEX 40 PE'),
    ],
    especificacoes: [
      ['Modelo', 'TEX 40 PE'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Classe', 'Demolição pesada'],
      ['Ergonomia', 'Empunhadura com vibração reduzida (PE)'],
      ['Aplicações típicas', 'Concreto estrutural · fundações · rocha branda'],
    ],
  },
  {
    slug: 'tex-230-pe',
    pitch:
      'Rompedor pneumático ergonômico para construção pesada — o porte que enfrenta pavimentos espessos e estruturas robustas em jornada contínua.',
    descricao: [
      '<b>O Atlas Copco TEX 230 PE é um rompedor pneumático ergonômico da família de construção pesada, projetado para demolições de grande exigência em jornada contínua.</b> Estrutura reforçada e energia de impacto elevada para os serviços que desgastam ferramentas comuns.',
      'Pavimentos rodoviários, bases industriais e estruturas de concreto de grande espessura pedem ferramenta dimensionada para o ciclo completo do serviço — não apenas para o golpe. O TEX 230 PE mantém o rendimento hora após hora, com componentes dimensionados para desgaste lento e empunhaduras amortecidas que preservam o operador. Na frota de uma locadora ou empreiteira de infraestrutura, é a ferramenta de confiança das demolições difíceis.',
      fecho('TEX 230 PE'),
    ],
    especificacoes: [
      ['Modelo', 'TEX 230 PE'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Classe', 'Construção pesada'],
      ['Ergonomia', 'Empunhadura com vibração reduzida (PE)'],
      ['Aplicações típicas', 'Pavimentos espessos · bases industriais'],
    ],
  },
  {
    slug: 'tex-280-pe',
    pitch:
      'Rompedor pneumático ergonômico do topo da família de construção pesada — máxima energia de impacto com vibração controlada.',
    descricao: [
      '<b>O Atlas Copco TEX 280 PE é um dos rompedores pneumáticos mais potentes da família TEX de construção pesada.</b> É a ferramenta para os serviços onde a energia de impacto define se o trabalho avança: concreto de alta resistência, estruturas antigas superarmadas, rocha.',
      'A engenharia do TEX 280 PE concentra o golpe na ponta da ferramenta enquanto o sistema PE de empunhaduras amortecidas absorve o retorno — o operador sente menos, trabalha mais e com mais precisão. Em demolições industriais e obras de infraestrutura, isso se traduz em cronograma: menos pausas, menos revezamento, mais metros demolidos por turno. Alimentação por compressor portátil de obra padrão.',
      fecho('TEX 280 PE'),
    ],
    especificacoes: [
      ['Modelo', 'TEX 280 PE'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Classe', 'Construção pesada — topo da família PE'],
      ['Ergonomia', 'Empunhadura com vibração reduzida (PE)'],
      ['Aplicações típicas', 'Concreto de alta resistência · demolição industrial'],
    ],
  },
  {
    slug: 'tex-p60-s',
    pitch:
      'Rompedor pneumático de <b>alta produção</b> para pavimento — projetado para o ritmo de obra rodoviária e grandes áreas de demolição.',
    descricao: [
      '<b>O Atlas Copco TEX P60 S é um rompedor pneumático de alta produção, projetado para demolição de pavimentos em ritmo de obra rodoviária.</b> A série P prioriza volume demolido por hora: golpes rápidos e consistentes para grandes áreas.',
      'Em recapeamentos, aberturas de faixa e remoção de placas de concreto, o gargalo costuma ser a velocidade da demolição. O TEX P60 S ataca exatamente isso, mantendo cadência alta de impacto com consumo de ar compatível com os compressores portáteis de canteiro. A construção simples — marca registrada das ferramentas pneumáticas Atlas Copco — significa menos itens de manutenção e mais disponibilidade na frente de serviço.',
      fecho('TEX P60 S'),
    ],
    especificacoes: [
      ['Modelo', 'TEX P60 S'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Série', 'P — alta produção'],
      ['Aplicações típicas', 'Pavimentos · obras rodoviárias · grandes áreas'],
    ],
  },
  {
    slug: 'tex-p90-s',
    pitch:
      'Rompedor pneumático de alta produção para demolição pesada — o maior da série P, para volume máximo de demolição por turno.',
    descricao: [
      '<b>O Atlas Copco TEX P90 S é o rompedor pneumático de alta produção para demolição pesada — o porte maior da série P.</b> Combina energia de impacto elevada com cadência de trabalho contínua, para volume máximo demolido por turno.',
      'É a escolha das obras onde demolição é atividade principal, não eventual: remoção de fundações, desmonte de estruturas, preparação de terrenos industriais. A massa da ferramenta trabalha a favor do golpe, reduzindo o esforço de penetração em concreto espesso, e a robustez da série S suporta o uso intensivo diário que destruiria ferramentas de classe leve. Par ideal: um compressor portátil XAS de 175–400 pcm.',
      fecho('TEX P90 S'),
    ],
    especificacoes: [
      ['Modelo', 'TEX P90 S'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Série', 'P — alta produção, porte maior'],
      ['Aplicações típicas', 'Demolição pesada · fundações · desmonte'],
    ],
  },
  {
    slug: 'rtex',
    pitch:
      'Rompedor pneumático de nova geração: <b>baixa vibração e alta eficiência</b> — demolição pesada consumindo menos ar, com muito mais conforto para o operador.',
    descricao: [
      '<b>O Atlas Copco RTEX é o rompedor pneumático de nova geração da marca, projetado em torno de dois avanços: vibração drasticamente reduzida e eficiência no consumo de ar.</b> O mecanismo de golpe repensado extrai mais energia útil de cada ciclo pneumático.',
      'O consumo menor de ar muda a logística da obra: o RTEX trabalha com compressores menores do que os exigidos por rompedores convencionais de desempenho comparável — menos diesel, menos equipamento mobilizado. E a baixa vibração permite jornadas mais longas dentro dos limites de exposição ocupacional, com menos fadiga e mais precisão. Para empresas que demolem todos os dias, o RTEX paga a diferença em produtividade e saúde ocupacional.',
      fecho('RTEX'),
    ],
    especificacoes: [
      ['Modelo', 'RTEX'],
      ['Acionamento', 'Pneumático (ar comprimido)'],
      ['Diferenciais', 'Baixa vibração · alta eficiência de ar'],
      ['Vantagem prática', 'Opera com compressor menor que rompedores equivalentes'],
      ['Aplicações típicas', 'Demolição pesada intensiva'],
    ],
  },
  /* ============ PERFURATRIZ ============ */
  {
    slug: 'linha-perfuratrizes',
    pitch:
      'Linha completa de perfuratrizes pneumáticas Atlas Copco para mineração, pedreiras, poços e fundações — equipamento sob consulta, dimensionado pela aplicação.',
    descricao: [
      '<b>A ACB Sul fornece a linha completa de perfuratrizes pneumáticas Atlas Copco para mineração, pedreiras, perfuração de poços e fundações.</b> São equipamentos especificados caso a caso: o modelo certo depende do diâmetro e profundidade do furo, do tipo de rocha e do compressor disponível.',
      'A oferta cobre desde perfuradores manuais para serviços de fundação e desmonte secundário até marteletes e equipamentos para perfuração de produção em rocha. Por se tratar de equipamento técnico, o fornecimento começa pelo dimensionamento: a equipe da ACB Sul levanta a aplicação, indica o conjunto perfuratriz + compressor adequado — a linha portátil de alta pressão XAHS/W/X é o par natural — e cota o equipamento com prazo de fábrica.',
      fecho('equipamento de perfuração adequado à sua aplicação'),
    ],
    especificacoes: [
      ['Linha', 'Perfuratrizes pneumáticas Atlas Copco'],
      ['Fornecimento', 'Sob consulta — dimensionado pela aplicação'],
      ['Aplicações típicas', 'Mineração · pedreiras · poços · fundações'],
      ['Par recomendado', 'Compressores de alta pressão XAHS / W / X'],
    ],
  },
  /* ============ BOMBAS DE VÁCUO ============ */
  {
    slug: 'ghs-350-5400-vsd',
    pitch:
      'Bombas de vácuo de parafuso com <b>velocidade variável (VSD)</b> — a tecnologia dos compressores Atlas Copco aplicada ao vácuo industrial, com grande economia de energia.',
    descricao: [
      '<b>A Atlas Copco GHS VSD é a linha de bombas de vácuo de parafuso lubrificadas com acionamento de velocidade variável, cobrindo as capacidades nominais de 350 a 5.400 m³/h.</b> É a tecnologia consagrada dos compressores GA aplicada à geração de vácuo industrial.',
      'O VSD é o diferencial econômico: a bomba ajusta a rotação à demanda real de vácuo do processo, em vez de operar em carga plena o tempo todo — a economia de energia em processos variáveis é substancial. Centralizar o vácuo numa GHS substitui múltiplas bombas pequenas espalhadas pela planta, reduzindo manutenção e ruído. Aplicações: embalagem, termoformagem, hold-down em CNC, processos químicos e alimentícios.',
      fecho('GHS VSD'),
    ],
    especificacoes: [
      ['Linha', 'GHS 350–5400 VSD'],
      ['Tecnologia', 'Parafuso lubrificado com velocidade variável'],
      ['Capacidade nominal', '350–5.400 m³/h (conforme modelo)'],
      ['Vantagem', 'Economia de energia em demanda variável'],
      ['Aplicações típicas', 'Embalagem · termoformagem · CNC · processos'],
    ],
  },
  {
    slug: 'gvs-16-630',
    pitch:
      'Bombas de vácuo de <b>palhetas rotativas</b> lubrificadas — a solução compacta e confiável para embalagem e processos industriais de vácuo contínuo.',
    descricao: [
      '<b>A Atlas Copco GVS 16–630 é a linha de bombas de vácuo de palhetas rotativas lubrificadas, com capacidades nominais de 16 a 630 m³/h.</b> É a tecnologia de vácuo mais difundida na indústria: simples, compacta e de desempenho estável.',
      'As palhetas lubrificadas entregam vácuo consistente para embalagem a vácuo de alimentos, envase, fixação de peças, linhas de montagem e laboratórios. A faixa ampla de modelos permite dimensionar a bomba exatamente para o ponto de operação do processo — do equipamento de bancada à instalação central. Manutenção direta (óleo, filtros e palhetas) com kits originais Atlas Copco disponíveis pela ACB Sul.',
      fecho('GVS adequada ao seu processo'),
    ],
    especificacoes: [
      ['Linha', 'GVS 16–630'],
      ['Tecnologia', 'Palhetas rotativas lubrificadas'],
      ['Capacidade nominal', '16–630 m³/h (conforme modelo)'],
      ['Aplicações típicas', 'Embalagem · envase · fixação · laboratórios'],
    ],
  },
  {
    slug: 'gvsa',
    pitch:
      'Bomba de vácuo de palhetas rotativas para uso industrial geral — confiabilidade Atlas Copco para processos contínuos de vácuo.',
    descricao: [
      '<b>A Atlas Copco GVSA é uma bomba de vácuo de palhetas rotativas para uso industrial geral.</b> Projetada para processos contínuos, entrega vácuo estável com a robustez característica dos equipamentos da marca.',
      'É a opção direta para substituir bombas de vácuo em fim de vida ou equipar novos pontos de processo: manuseio e fixação de peças, desaeração, secagem e aplicações de vácuo de uso geral na indústria. A construção em palhetas lubrificadas mantém o custo de aquisição acessível e a manutenção simples, com componentes de desgaste fáceis de repor. A ACB Sul dimensiona o modelo conforme a vazão e o nível de vácuo do seu processo.',
      fecho('GVSA'),
    ],
    especificacoes: [
      ['Modelo', 'GVSA'],
      ['Tecnologia', 'Palhetas rotativas lubrificadas'],
      ['Perfil', 'Uso industrial geral, processo contínuo'],
      ['Aplicações típicas', 'Fixação · desaeração · secagem · uso geral'],
    ],
  },
  {
    slug: 'dzs-065-300',
    pitch:
      'Bombas de vácuo <b>secas tipo garra</b> — vácuo sem óleo na câmara, baixa manutenção e eficiência para processos sensíveis a contaminação.',
    descricao: [
      '<b>A Atlas Copco DZS 065–300 é a linha de bombas de vácuo secas tipo garra (claw), que geram vácuo sem óleo na câmara de compressão.</b> As garras giram sem contato entre si — sem atrito, sem desgaste de palhetas e sem névoa de óleo no processo.',
      'A operação a seco é decisiva onde a contaminação por óleo é inaceitável (alimentos, farmacêutica, embalagem limpa) e onde o custo de manutenção pesa: sem troca de palhetas e com intervalos longos de serviço, o custo por hora de vácuo cai sensivelmente. A eficiência energética do princípio garra completa a conta — menos consumo para a mesma vazão. Capacidades nominais de 65 a 300 m³/h conforme o modelo.',
      fecho('DZS'),
    ],
    especificacoes: [
      ['Linha', 'DZS 065–300'],
      ['Tecnologia', 'Garra (claw) — operação a seco'],
      ['Capacidade nominal', '65–300 m³/h (conforme modelo)'],
      ['Vantagens', 'Sem óleo no processo · baixa manutenção · eficiência'],
      ['Aplicações típicas', 'Alimentos · farmacêutica · embalagem'],
    ],
  },
  /* ============ QUALITY AIR ============ */
  {
    slug: 'osc-12-2500',
    pitch:
      'Separador de óleo e água para condensado de compressores — descarte ambientalmente correto e em conformidade com a legislação, sem custo de coleta especializada.',
    descricao: [
      '<b>O Atlas Copco OSC 12–2500 é um separador de óleo e água que trata o condensado gerado por compressores lubrificados, permitindo o descarte correto direto na rede.</b> Todo compressor lubrificado produz condensado com óleo em suspensão — descartá-lo sem tratamento é passivo ambiental e infração.',
      'O OSC separa o óleo do condensado por estágios de filtragem, entregando água dentro dos limites legais de descarte e concentrando o óleo para destinação simples. A linha cobre instalações de todos os portes — a nomenclatura 12 a 2.500 refere-se à capacidade do compressor atendido (l/s) — e a manutenção se resume à troca periódica dos elementos. Para auditorias ambientais e certificações, é o item que regulariza a sala de compressores.',
      fecho('OSC adequado à sua instalação'),
    ],
    especificacoes: [
      ['Linha', 'OSC 12–2500'],
      ['Função', 'Separação de óleo do condensado de compressores'],
      ['Dimensionamento', 'Conforme capacidade do compressor (12–2.500 l/s)'],
      ['Benefício', 'Descarte em conformidade ambiental'],
      ['Manutenção', 'Troca periódica de elementos filtrantes'],
    ],
  },
  /* ============ MOTOBOMBAS ============ */
  {
    slug: 'pac-h-high-head',
    pitch:
      'Motobomba centrífuga de <b>alto recalque</b> (High Head) — esgotamento de obras e bombeamento a longas distâncias e grandes alturas.',
    descricao: [
      '<b>A Atlas Copco PAC H é uma motobomba centrífuga de alto recalque (High Head), projetada para bombear água a grandes alturas e longas distâncias.</b> É o equipamento de esgotamento para os cenários em que bombas convencionais não vencem a coluna.',
      'Rebaixamento de lençol em escavações profundas, transferência entre reservatórios distantes, drenagem de cavas de mineração: aplicações de alto recalque pedem pressão de bombeamento — e a PAC H entrega exatamente isso, com escorva automática e capacidade de operar com ar na linha de sucção. Montada em chassi com proteção, acompanha a obra do início ao fim com a robustez de equipamento de canteiro.',
      fecho('PAC H'),
    ],
    especificacoes: [
      ['Modelo', 'PAC H (High Head)'],
      ['Tipo', 'Motobomba centrífuga de alto recalque'],
      ['Escorva', 'Automática'],
      ['Aplicações típicas', 'Rebaixamento · transferências longas · mineração'],
    ],
  },
  {
    slug: 'pas-hard-hat',
    pitch:
      'Motobomba de esgotamento com estrutura protegida <b>Hard Hat</b> — bombeamento confiável com a canopy que aguenta o dia a dia do canteiro.',
    descricao: [
      '<b>A Atlas Copco PAS Hard Hat é uma motobomba de esgotamento com estrutura de proteção integral — a “capa dura” que dá nome à linha.</b> Motor, bomba e componentes ficam abrigados da chuva, do impacto e do manuseio rude de obra.',
      'Esgotamento de valas, poços de visita, escavações e áreas alagadas: serviço essencial, ambiente hostil. A canopy Hard Hat protege o investimento e reduz o ruído, permitindo operação contínua próxima a equipes e vizinhança. A escorva automática da linha PAS mantém o bombeamento estável mesmo com entrada intermitente de ar na sucção — típico de esgotamento raso. Manutenção acessível por portas amplas.',
      fecho('PAS Hard Hat'),
    ],
    especificacoes: [
      ['Modelo', 'PAS Hard Hat'],
      ['Tipo', 'Motobomba de esgotamento autoescorvante'],
      ['Proteção', 'Estrutura integral (canopy) Hard Hat'],
      ['Aplicações típicas', 'Valas · escavações · áreas alagadas'],
    ],
  },
  {
    slug: 'pas-mf-hf',
    pitch:
      'Motobombas de esgotamento para água com <b>sólidos em suspensão</b> — as linhas MF e HF bombeiam onde a água vem suja, sem entupir.',
    descricao: [
      '<b>As Atlas Copco PAS MF e HF são motobombas de esgotamento projetadas para água com sólidos em suspensão — a água real das obras.</b> O rotor e as passagens internas são dimensionados para deixar passar areia, pedrisco e detritos sem travar.',
      'Água limpa é raridade em canteiro: o esgotamento típico carrega lama, areia e restos de material. Bombas comuns entopem e desgastam; as linhas MF/HF mantêm vazão com sólidos em suspensão e resistem à abrasão com componentes reforçados. Com escorva automática e operação desassistida, ficam dias bombeando em escavações e contenções sem intervenção. São o padrão de esgotamento sujo em obras de fundação e saneamento.',
      fecho('PAS MF/HF'),
    ],
    especificacoes: [
      ['Modelos', 'PAS MF · PAS HF'],
      ['Tipo', 'Motobomba de esgotamento autoescorvante'],
      ['Diferencial', 'Bombeia água com sólidos em suspensão'],
      ['Aplicações típicas', 'Fundações · saneamento · água com detritos'],
    ],
  },
  {
    slug: 'var',
    pitch:
      'Motobomba com <b>escorva assistida</b> para drenagem de obras — partida rápida e bombeamento estável mesmo com sucção difícil.',
    descricao: [
      '<b>A Atlas Copco VAR é uma motobomba de drenagem com sistema de escorva assistida, projetada para partir rápido e manter o bombeamento estável em condições difíceis de sucção.</b> O sistema elimina a escorva manual e re-escorva sozinho quando entra ar na linha.',
      'Na drenagem de obras, a condição muda o dia inteiro: nível d’água variável, mangueiras longas, entrada de ar constante. A escorva assistida da VAR resolve o problema crônico das bombas convencionais nessas condições — a perda de escorva que para o serviço até alguém perceber. Resultado: drenagem desassistida confiável em escavações, galerias e rebaixamentos, com o equipamento operando sozinho por turnos inteiros.',
      fecho('VAR'),
    ],
    especificacoes: [
      ['Modelo', 'VAR'],
      ['Tipo', 'Motobomba de drenagem'],
      ['Diferencial', 'Escorva assistida — re-escorva automática'],
      ['Aplicações típicas', 'Drenagem de obras · escavações · galerias'],
    ],
  },
  {
    slug: 'weda-d',
    pitch:
      'Bomba <b>elétrica submersível</b> de drenagem WEDA D — liga, afunda e bombeia: a solução compacta para tirar água de onde ela não devia estar.',
    descricao: [
      '<b>A Atlas Copco WEDA D é uma bomba elétrica submersível de drenagem: trabalha mergulhada na água, sem escorva, sem mangueira de sucção e sem motor a combustão.</b> Ligou na tomada (ou no gerador), desceu ao ponto, está bombeando.',
      'Para poços de elevador, subsolos alagados, valas e caixas de passagem, a submersível elétrica é imbatível em praticidade: silenciosa, sem emissões (trabalha em ambiente fechado), leve de transportar e praticamente sem manutenção. A construção da linha WEDA — corpo resistente à abrasão e selo mecânico robusto — suporta a água suja típica de drenagem de obra. Combinada a um gerador QAS, vira solução completa onde não há rede elétrica.',
      fecho('WEDA D'),
    ],
    especificacoes: [
      ['Modelo', 'WEDA D'],
      ['Tipo', 'Bomba elétrica submersível de drenagem'],
      ['Vantagens', 'Sem escorva · silenciosa · opera em ambiente fechado'],
      ['Aplicações típicas', 'Subsolos · poços · valas · caixas de passagem'],
    ],
  },
  {
    slug: 'weda-l',
    pitch:
      'Bomba elétrica submersível WEDA L para esgotamento — mais capacidade de bombeamento para escavações e rebaixamentos de maior volume.',
    descricao: [
      '<b>A Atlas Copco WEDA L é a bomba elétrica submersível de esgotamento da linha WEDA para volumes maiores de água.</b> Mesmo princípio da WEDA D — mergulha e bombeia, sem escorva — com capacidade dimensionada para escavações e rebaixamentos de maior porte.',
      'Em obras de fundação profunda, contenções e rebaixamento de lençol freático, o volume de água exige bombas que sustentem vazão por dias seguidos: a WEDA L roda em operação contínua com motor refrigerado pela própria água bombeada. A robustez contra abrasão da linha aguenta água com areia e sedimentos, e a alimentação elétrica simplifica a logística — sem abastecimento de diesel no fundo da escavação.',
      fecho('WEDA L'),
    ],
    especificacoes: [
      ['Modelo', 'WEDA L'],
      ['Tipo', 'Bomba elétrica submersível de esgotamento'],
      ['Perfil', 'Maior capacidade da dupla WEDA D/L do catálogo'],
      ['Aplicações típicas', 'Fundações · contenções · rebaixamento de lençol'],
    ],
  },
];

await aplicar(conteudos);
