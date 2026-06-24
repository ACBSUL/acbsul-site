// Reorganiza a categoria COMPRESSORES ELÉTRICOS conforme a Apresentação ACBSul
// rev01 26.05.26 (páginas 07 a 17), um card por slide/família, na ordem do PDF
// (G4 → GA 37). Todos os números (vazão PCM, potência kW, pressão, óleo, módulo,
// tensões, montagem) vêm DO PRÓPRIO PDF — nada inventado.
//
// Regra do cliente: publicar só o que está no PDF; tudo o mais na categoria fica
// desativado (publicado=false). Idempotente — pode rodar mais de uma vez.
//
// Uso: npx tsx scripts/organizar-eletricos-pdf.ts
import 'dotenv/config';
import { and, eq, notInArray } from 'drizzle-orm';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/db/schema';

const IMG = '/assets/products/compressores-eletricos';
const IMG_G = `${IMG}/compressores-parafuso-linha-g.webp`; // série G (parafuso correia)
const IMG_GA = `${IMG}/ga-gx.png`; // série GA velocidade fixa
const IMG_GA_VSD = `${IMG}/ga-11-30-vsd.png`; // série GA VSD+

const fecho = (faixa: string) =>
  `Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul dimensiona e fornece os compressores ${faixa} para <b>venda ou locação</b>, com peças originais e assistência técnica em campo no RS e em Santa Catarina. O atendimento parte de Porto Alegre e cobre a região metropolitana e o interior — solicite um orçamento informando a pressão e a vazão da sua operação.`;

interface Item {
  slug: string;
  nome: string;
  img: string;
  alt: string;
  chips: string[];
  pitch: string;
  descricao: string[];
  specs: Array<[string, string]>;
}

// Ordem = ordem do PDF (pág. 07 → 17). A inserção segue esta sequência para que
// o id cresça na mesma ordem (o catálogo ordena por id).
const itens: Item[] = [
  // ---------- pág. 07 — Linha G velocidade fixa (eletropneumático) ----------
  {
    slug: 'linha-g-fixa-g4-g7',
    nome: 'Compressor de Parafuso Linha G — G4, G5 e G7 (Velocidade Fixa)',
    img: IMG_G,
    alt: 'Compressor de parafuso lubrificado Atlas Copco Linha G (G4, G5 e G7) de velocidade fixa',
    chips: ['G4 · G5 · G7', '19–33 PCM', '4–7 kW · Vel. fixa'],
    pitch:
      'Compressores de parafuso lubrificados de velocidade fixa da Linha G — modelos <b>G4, G5 e G7</b>, de 19 a 33 PCM e 4 a 7 kW — para ar comprimido contínuo em pequenas oficinas e indústria leve.',
    descricao: [
      '<b>A Linha G G4–G7 reúne os compressores de parafuso lubrificados de velocidade fixa da Atlas Copco na faixa de entrada: G4 (19 PCM / 4 kW), G5 (24 PCM / 5 kW) e G7 (33 PCM / 7 kW).</b> São máquinas de transmissão por polia e correia, partida estrela-triângulo e controle eletropneumático, indicadas para fornecimento contínuo de ar comprimido em oficinas e operações de pequeno porte.',
      'O motor é IP55 e a lubrificação usa óleo sintético RS Ultra. Estão disponíveis nas montagens BM (sobre base, sem reservatório), TM (sobre tanque de 100 L), FF (com secador de ar integrado) e P (sem secador), em tensões trifásicas de 220, 380 ou 440 V, com pressão de trabalho de 125 ou 150 psi. A versão FF entrega ar seco direto na rede, protegendo tubulação e ferramentas contra condensado.',
      fecho('da Linha G G4–G7'),
    ],
    specs: [
      ['Modelos', 'G4 · G5 · G7'],
      ['Vazão (FAD)', '19 · 24 · 33 PCM'],
      ['Potência do motor', '4 · 5 · 7 kW'],
      ['Pressão de trabalho', '125 ou 150 psi'],
      ['Transmissão', 'Polia e correia'],
      ['Partida', 'Estrela-triângulo'],
      ['Controle', 'Eletropneumático'],
      ['Óleo', 'Sintético RS Ultra'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'BM (base) · TM (tanque 100 L) · FF (secador integrado) · P'],
    ],
  },
  // ---------- pág. 08 — Linha G velocidade fixa (Base Controller) ----------
  {
    slug: 'linha-g-fixa-g7l-g11',
    nome: 'Compressor de Parafuso Linha G — G7L e G11 (Velocidade Fixa)',
    img: IMG_G,
    alt: 'Compressor de parafuso lubrificado Atlas Copco Linha G (G7L e G11) de velocidade fixa',
    chips: ['G7L · G11', '41–57 PCM', '7–11 kW · Vel. fixa'],
    pitch:
      'Compressores de parafuso lubrificados de velocidade fixa da Linha G — modelos <b>G7L e G11</b>, de 41 a 57 PCM e 7 a 11 kW — com módulo Base Controller para indústria de pequeno e médio porte.',
    descricao: [
      '<b>O G7L (41 PCM / 7 kW) e o G11 (57 PCM / 11 kW) são compressores de parafuso lubrificados de velocidade fixa da Linha G, com transmissão por polia e correia, partida estrela-triângulo e módulo Base Controller.</b> Atendem o fornecimento contínuo de ar comprimido em oficinas e linhas de produção de pequeno e médio porte.',
      'O motor é IP55 e a lubrificação usa óleo sintético RS Ultra. As montagens disponíveis são BM (sobre base, sem reservatório), TM (sobre tanque de 265 L), FF (com secador integrado) e P (sem secador), em tensões trifásicas de 220, 380 ou 440 V, com pressões de 100, 125, 150 ou 175 psi. A versão Full Feature (FF) integra secador refrigerado, entregando ar seco pronto para uso.',
      fecho('da Linha G G7L–G11'),
    ],
    specs: [
      ['Modelos', 'G7L · G11'],
      ['Vazão (FAD)', '41 · 57 PCM'],
      ['Potência do motor', '7 · 11 kW'],
      ['Pressão de trabalho', '100 · 125 · 150 · 175 psi'],
      ['Transmissão', 'Polia e correia'],
      ['Partida', 'Estrela-triângulo'],
      ['Controlador', 'Módulo Base Controller'],
      ['Óleo', 'Sintético RS Ultra'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'BM (base) · TM (tanque 265 L) · FF (secador integrado) · P'],
    ],
  },
  // ---------- pág. 09 — Linha G velocidade variável (módulo WEG) ----------
  {
    slug: 'linha-g-vsd-g7-g11',
    nome: 'Compressor de Parafuso Linha G VSD — G7 e G11 (Velocidade Variável)',
    img: IMG_G,
    alt: 'Compressor de parafuso lubrificado Atlas Copco Linha G VSD (G7 e G11) de velocidade variável',
    chips: ['G7 · G11 VSD', '21–62 PCM', '7–11 kW · VSD'],
    pitch:
      'Compressores de parafuso da Linha G de <b>velocidade variável (VSD)</b> — G7 e G11 com inversor de frequência, vazão de 21 a 61,9 PCM, que ajustam a rotação à demanda real de ar e economizam energia.',
    descricao: [
      '<b>O G7 VSD e o G11 VSD são compressores de parafuso lubrificados de velocidade variável da Linha G, com inversor de frequência e módulo WEG: o G7 VSD entrega de 21 a 44,5 PCM (7 kW) e o G11 VSD de 30,3 a 61,9 PCM (11 kW).</b> A rotação acompanha a demanda real de ar, reduzindo o consumo de energia frente às máquinas de velocidade fixa.',
      'A transmissão é por polia e correia, o motor é IP55 e a lubrificação usa óleo sintético RXD (Roto Xtend Fluid). São fornecidos nas montagens TM (tanque de 265 L) e FF (com secador integrado), com dreno eletrônico incluso, em tensões trifásicas de 220 (sem a opção de 175 psi), 380 ou 440 V e pressões de 100, 125, 150 ou 175 psi.',
      fecho('da Linha G VSD G7–G11'),
    ],
    specs: [
      ['Modelos', 'G7 VSD · G11 VSD'],
      ['Vazão (FAD)', '21–44,5 · 30,3–61,9 PCM'],
      ['Potência do motor', '7 · 11 kW'],
      ['Pressão de trabalho', '100 · 125 · 150 · 175 psi'],
      ['Transmissão', 'Polia e correia'],
      ['Partida', 'Inversor de frequência (VSD)'],
      ['Controlador', 'Módulo WEG'],
      ['Óleo', 'Sintético RXD (Roto Xtend Fluid)'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 (sem 175 psi) · 380 · 440 V'],
      ['Montagem', 'TM (tanque 265 L) · FF (secador integrado) · dreno eletrônico'],
    ],
  },
  // ---------- pág. 10 — Linha G velocidade fixa G15–G22 ----------
  {
    slug: 'linha-g-fixa-g15-g22',
    nome: 'Compressor de Parafuso Linha G — G15, G18 e G22 (Velocidade Fixa)',
    img: IMG_G,
    alt: 'Compressor de parafuso lubrificado Atlas Copco Linha G (G15, G18 e G22) de velocidade fixa',
    chips: ['G15 · G18 · G22', '90–128 PCM', '15–22 kW · Vel. fixa'],
    pitch:
      'Compressores de parafuso lubrificados de velocidade fixa da Linha G — <b>G15, G18 e G22</b>, de 90 a 128 PCM e 15 a 22 kW — com módulo Base Controller para a indústria.',
    descricao: [
      '<b>O G15 (90 PCM / 15 kW), o G18 (109 PCM / 18 kW) e o G22 (128 PCM / 22 kW) são compressores de parafuso lubrificados de velocidade fixa da Linha G, com transmissão por polia e correia, partida estrela-triângulo e módulo Base Controller.</b> É o porte que sustenta a produção contínua em metalmecânica, plásticos e demais operações industriais.',
      'O motor é IP55 e a lubrificação usa óleo mineral RIF (Roto Inject Fluid). As montagens disponíveis são BM (sobre base, sem reservatório), TM (sobre tanque de 265 L), FF (com secador integrado) e P (sem secador), em tensões trifásicas de 220, 380 ou 440 V, com pressões de 100, 125 ou 150 psi.',
      fecho('da Linha G G15–G22'),
    ],
    specs: [
      ['Modelos', 'G15 · G18 · G22'],
      ['Vazão (FAD)', '90 · 109 · 128 PCM'],
      ['Potência do motor', '15 · 18 · 22 kW'],
      ['Pressão de trabalho', '100 · 125 · 150 psi'],
      ['Transmissão', 'Polia e correia'],
      ['Partida', 'Estrela-triângulo'],
      ['Controlador', 'Módulo Base Controller'],
      ['Óleo', 'Mineral RIF (Roto Inject Fluid)'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'BM (base) · TM (tanque 265 L) · FF (secador integrado) · P'],
    ],
  },
  // ---------- pág. 11 — Linha G velocidade variável G15–G22 ----------
  {
    slug: 'linha-g-vsd-g15-g22',
    nome: 'Compressor de Parafuso Linha G VSD — G15, G18 e G22 (Velocidade Variável)',
    img: IMG_G,
    alt: 'Compressor de parafuso lubrificado Atlas Copco Linha G VSD (G15, G18 e G22) de velocidade variável',
    chips: ['G15 · G18 · G22 VSD', '90–128 PCM', '15–22 kW · VSD'],
    pitch:
      'Compressores de parafuso da Linha G de <b>velocidade variável (VSD)</b> — G15, G18 e G22 com inversor de frequência, de 90 a 128 PCM, que ajustam a rotação à demanda e economizam energia.',
    descricao: [
      '<b>O G15 VSD (90 PCM / 15 kW), o G18 VSD (109 PCM / 18 kW) e o G22 VSD (128 PCM / 22 kW) são compressores de parafuso lubrificados de velocidade variável da Linha G, com inversor de frequência e módulo WEG.</b> A rotação acompanha a demanda real de ar, reduzindo o consumo de energia em relação às máquinas de velocidade fixa de mesmo porte.',
      'A transmissão é por polia e correia, o motor é IP55 e a lubrificação usa óleo sintético RXD (Roto Xtend Fluid). São fornecidos nas montagens BM (base), TM (tanque de 265 L), FF (com secador integrado) e P (sem secador), em tensões trifásicas de 220 (com transformador externo ao compressor), 380 ou 440 V, e pressões de 100, 125 ou 150 psi.',
      fecho('da Linha G VSD G15–G22'),
    ],
    specs: [
      ['Modelos', 'G15 VSD · G18 VSD · G22 VSD'],
      ['Vazão (FAD)', '90 · 109 · 128 PCM'],
      ['Potência do motor', '15 · 18 · 22 kW'],
      ['Pressão de trabalho', '100 · 125 · 150 psi'],
      ['Transmissão', 'Polia e correia'],
      ['Partida', 'Inversor de frequência (VSD)'],
      ['Controlador', 'Módulo WEG'],
      ['Óleo', 'Sintético RXD (Roto Xtend Fluid)'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 (trafo externo) · 380 · 440 V'],
      ['Montagem', 'BM (base) · TM (tanque 265 L) · FF (secador integrado) · P'],
    ],
  },
  // ---------- pág. 12 — Linha GA velocidade fixa (Elektronikon Standard) ----------
  {
    slug: 'linha-ga-fixa-ga15-ga26',
    nome: 'Compressor de Parafuso GA 15 a GA 26 (Velocidade Fixa, Elektronikon Standard)',
    img: IMG_GA,
    alt: 'Compressor de parafuso lubrificado Atlas Copco GA 15 a GA 26 de velocidade fixa',
    chips: ['GA 15 a GA 26', '96–157 PCM', '15–26 kW · Elektronikon'],
    pitch:
      'Compressores de parafuso lubrificados de velocidade fixa da série GA — <b>GA 15, GA 18, GA 22 e GA 26</b>, de 96 a 157 PCM e 15 a 26 kW — com transmissão por engrenamento e controlador Elektronikon.',
    descricao: [
      '<b>O GA 15 (96 PCM), GA 18 (119 PCM), GA 22 (140 PCM) e GA 26 (157 PCM) são compressores de parafuso lubrificados de velocidade fixa da série GA, de 15 a 26 kW, com transmissão por engrenamento, partida estrela-triângulo e módulo Elektronikon Standard.</b> A transmissão direta por engrenagens eleva a eficiência frente às versões por correia, em regime de trabalho contínuo.',
      'O motor é IP55 e a lubrificação usa óleo sintético RS Ultra. As montagens disponíveis são FF (com secador integrado), P (sem secador), BM (sobre base) e TM (sobre tanque de 475 L), em tensões trifásicas de 220, 380 ou 440 V, com pressões de 100, 125, 150 ou 175 psi.',
      fecho('da série GA 15–26'),
    ],
    specs: [
      ['Modelos', 'GA 15 · GA 18 · GA 22 · GA 26'],
      ['Vazão (FAD)', '96 · 119 · 140 · 157 PCM'],
      ['Potência do motor', '15 · 18 · 22 · 26 kW'],
      ['Pressão de trabalho', '100 · 125 · 150 · 175 psi'],
      ['Transmissão', 'Engrenamento'],
      ['Partida', 'Estrela-triângulo'],
      ['Controlador', 'Elektronikon Standard'],
      ['Óleo', 'Sintético RS Ultra'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'FF (secador integrado) · P · BM (base) · TM (tanque 475 L)'],
    ],
  },
  // ---------- pág. 13 — Linha GA 16 bar (MKV Touch) ----------
  {
    slug: 'linha-ga-16bar-ga11-ga26',
    nome: 'Compressor de Parafuso GA 16 bar — GA 11 a GA 26 (Alta Pressão, 232 psi)',
    img: IMG_GA,
    alt: 'Compressor de parafuso Atlas Copco GA linha 16 bar (GA 11 a GA 26) de alta pressão',
    chips: ['GA 11 a GA 26', '41–105 PCM', '16 bar · 232 psi'],
    pitch:
      'Compressores de parafuso da série GA na <b>linha de 16 bar (232 psi)</b> — GA 11 a GA 26, de 41 a 105 PCM — para aplicações de alta pressão como corte a laser, com módulo MKV Touch.',
    descricao: [
      '<b>A linha GA de 16 bar reúne os modelos GA 11 (41 PCM), GA 15 (59 PCM), GA 18 (75 PCM), GA 22 (87 PCM) e GA 26 (105 PCM), de 11 a 26 kW, com pressão de trabalho de 232 psi (16 bar) para aplicações de alta pressão como o corte a laser.</b> A transmissão é por engrenamento, com partida estrela-triângulo e módulo MKV Touch.',
      'O motor é IP55 e a lubrificação usa óleo sintético RXD (Roto Xtend Fluid). As montagens disponíveis são FF (com secador integrado) e TM (sobre tanque — 270 L no GA 11 e 500 L do GA 15 ao GA 26), em tensões trifásicas de 220, 380 ou 460 V. A pressão elevada atende processos industriais que exigem ar acima do padrão de 7 bar.',
      fecho('da linha GA 16 bar'),
    ],
    specs: [
      ['Modelos', 'GA 11 · GA 15 · GA 18 · GA 22 · GA 26'],
      ['Vazão (FAD)', '41 · 59 · 75 · 87 · 105 PCM'],
      ['Potência do motor', '11 · 15 · 18 · 22 · 26 kW'],
      ['Pressão de trabalho', '232 psi (16 bar)'],
      ['Linha', '16 bar — corte a laser'],
      ['Transmissão', 'Engrenamento'],
      ['Partida', 'Estrela-triângulo'],
      ['Controlador', 'MKV Touch'],
      ['Óleo', 'Sintético RXD (Roto Xtend Fluid)'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 · 380 · 460 V'],
      ['Montagem', 'FF · TM (GA 11: 270 L · GA 15–26: 500 L)'],
    ],
  },
  // ---------- pág. 14 — Linha GA+ velocidade fixa (Elektronikon Touch) ----------
  {
    slug: 'linha-ga-plus-fixa-ga11-ga30',
    nome: 'Compressor de Parafuso GA⁺ — GA 11⁺ a GA 30 (Velocidade Fixa, Elektronikon Touch)',
    img: IMG_GA,
    alt: 'Compressor de parafuso lubrificado Atlas Copco GA 11+ a GA 30 de velocidade fixa',
    chips: ['GA 11⁺ a GA 30', '79–190 PCM', '11–30 kW · Touch'],
    pitch:
      'Compressores de parafuso lubrificados de velocidade fixa da série GA⁺ — <b>GA 11⁺ a GA 30</b>, de 79 a 190 PCM e 11 a 30 kW — com transmissão por engrenamento e controlador Elektronikon Touch.',
    descricao: [
      '<b>A série GA⁺ de velocidade fixa reúne os modelos GA 11⁺ (79 PCM), GA 15⁺ (106 PCM), GA 18⁺ (130 PCM), GA 22⁺ (154 PCM), GA 26⁺ (177 PCM) e GA 30 (190 PCM), de 11 a 30 kW, com transmissão por engrenamento, partida estrela-triângulo e módulo Elektronikon Touch.</b> É o porte que sustenta a produção em plantas onde o ar comprimido é insumo crítico.',
      'O motor é IP55 e a lubrificação usa óleo sintético RS Ultra. As montagens disponíveis são FF (com secador integrado) e P (sem secador), em tensões trifásicas de 220, 380 ou 440 V, com pressões de 100, 125, 150 ou 175 psi. O controlador Elektronikon Touch traz programação e monitoramento da máquina.',
      fecho('da série GA⁺ 11–30'),
    ],
    specs: [
      ['Modelos', 'GA 11⁺ · GA 15⁺ · GA 18⁺ · GA 22⁺ · GA 26⁺ · GA 30'],
      ['Vazão (FAD)', '79 · 106 · 130 · 154 · 177 · 190 PCM'],
      ['Potência do motor', '11 · 15 · 18 · 22 · 26 · 30 kW'],
      ['Pressão de trabalho', '100 · 125 · 150 · 175 psi'],
      ['Transmissão', 'Engrenamento'],
      ['Partida', 'Estrela-triângulo'],
      ['Controlador', 'Elektronikon Touch'],
      ['Óleo', 'Sintético RS Ultra'],
      ['Motor', 'IP55'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'FF (secador integrado) · P'],
    ],
  },
  // ---------- pág. 15 — Linha GA VSD+ (GA 7 a GA 15) ----------
  {
    slug: 'linha-ga-vsd-ga7-ga15',
    nome: 'Compressor de Parafuso GA VSD⁺ — GA 7 a GA 15 (Velocidade Variável, IE5)',
    img: IMG_GA_VSD,
    alt: 'Compressor de parafuso Atlas Copco GA 7 a GA 15 VSD+ de velocidade variável e motor IE5',
    chips: ['GA 7 a GA 15 VSD⁺', '14–87 PCM', '7–15 kW · IE5'],
    pitch:
      'Compressores de parafuso da série GA <b>VSD⁺ de velocidade variável</b> — GA 7, GA 11 e GA 15 — com motor de ímã permanente IE5, transmissão direta e pressão ajustável de 4 a 13 bar.',
    descricao: [
      '<b>O GA 7 VSD⁺ (14,1–46,4 PCM), GA 11 VSD⁺ (14,1–68,6 PCM) e GA 15 VSD⁺ (14,1–87,3 PCM) são compressores de parafuso lubrificados de velocidade variável da série GA, de 7 a 15 kW, com transmissão direta e motor de ímã permanente de índice de rendimento IE5.</b> A velocidade variável ajusta a vazão à demanda real, com ampla faixa de regulagem.',
      'A pressão é ajustável de 4 a 13 bar (12,75 bar nas versões FF), o motor é IP66 e a lubrificação usa óleo sintético RXD (Roto Xtend Fluid). As montagens disponíveis são FF (com secador integrado) e P (sem secador), em tensões trifásicas de 220, 380 ou 440 V. O motor IE5 e a transmissão direta entregam a maior eficiência energética da linha.',
      fecho('da série GA VSD⁺ 7–15'),
    ],
    specs: [
      ['Modelos', 'GA 7 VSD⁺ · GA 11 VSD⁺ · GA 15 VSD⁺'],
      ['Vazão (FAD)', '14,1–46,4 · 14,1–68,6 · 14,1–87,3 PCM'],
      ['Potência do motor', '7 · 11 · 15 kW'],
      ['Pressão ajustável', '4 a 13 bar (12,75 para FF)'],
      ['Transmissão', 'Direta'],
      ['Motor', 'Ímã permanente · rendimento IE5 · IP66'],
      ['Óleo', 'Sintético RXD (Roto Xtend Fluid)'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'FF (secador integrado) · P'],
    ],
  },
  // ---------- pág. 16 — Linha GA VSD+ (GA 18 a GA 26) ----------
  {
    slug: 'linha-ga-vsd-ga18-ga26',
    nome: 'Compressor de Parafuso GA VSD⁺ — GA 18 a GA 26 (Velocidade Variável, IE5)',
    img: IMG_GA_VSD,
    alt: 'Compressor de parafuso Atlas Copco GA 18 a GA 26 VSD+ de velocidade variável e motor IE5',
    chips: ['GA 18 a GA 26 VSD⁺', '32–182 PCM', '18–26 kW · IE5'],
    pitch:
      'Compressores de parafuso da série GA <b>VSD⁺ de velocidade variável</b> — GA 18, GA 22 e GA 26 — com motor de ímã permanente IE5, transmissão direta e pressão ajustável de 4 a 13 bar.',
    descricao: [
      '<b>O GA 18 VSD⁺ (31,8–133,8 PCM), GA 22 VSD⁺ (31,8–161,2 PCM) e GA 26 VSD⁺ (31,8–181,8 PCM) são compressores de parafuso lubrificados de velocidade variável da série GA, de 18 a 26 kW, com transmissão direta e motor de ímã permanente de índice de rendimento IE5.</b> A ampla faixa de vazão acompanha a demanda real de ar da planta.',
      'A pressão é ajustável de 4 a 13 bar (12,75 bar nas versões FF), o motor é IP66 e a lubrificação usa óleo sintético RXD (Roto Xtend Fluid). As montagens disponíveis são FF (com secador integrado) e P (sem secador), em tensões trifásicas de 220, 380 ou 440 V. O conjunto IE5 com acionamento variável reduz o consumo de energia em cargas parciais.',
      fecho('da série GA VSD⁺ 18–26'),
    ],
    specs: [
      ['Modelos', 'GA 18 VSD⁺ · GA 22 VSD⁺ · GA 26 VSD⁺'],
      ['Vazão (FAD)', '31,8–133,8 · 31,8–161,2 · 31,8–181,8 PCM'],
      ['Potência do motor', '18 · 22 · 26 kW'],
      ['Pressão ajustável', '4 a 13 bar (12,75 para FF)'],
      ['Transmissão', 'Direta'],
      ['Motor', 'Ímã permanente · rendimento IE5 · IP66'],
      ['Óleo', 'Sintético RXD (Roto Xtend Fluid)'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'FF (secador integrado) · P'],
    ],
  },
  // ---------- pág. 17 — Linha GA VSD+ (GA 30 e GA 37) ----------
  {
    slug: 'linha-ga-vsd-ga30-ga37',
    nome: 'Compressor de Parafuso GA VSD⁺ — GA 30 e GA 37 (Velocidade Variável, IE5)',
    img: IMG_GA_VSD,
    alt: 'Compressor de parafuso Atlas Copco GA 30 e GA 37 VSD+ de velocidade variável e motor IE5',
    chips: ['GA 30 · GA 37 VSD⁺', '32–246 PCM', '30–37 kW · IE5'],
    pitch:
      'Compressores de parafuso da série GA <b>VSD⁺ de velocidade variável</b> — GA 30 e GA 37, até 246 PCM — com motor de ímã permanente IE5, transmissão direta e pressão ajustável de 4 a 13 bar.',
    descricao: [
      '<b>O GA 30 VSD⁺ (31,8–207,6 PCM) e o GA 37 VSD⁺ (31,8–246,4 PCM) são compressores de parafuso lubrificados de velocidade variável da série GA, de 30 e 37 kW, com transmissão direta e motor de ímã permanente de índice de rendimento IE5.</b> São o topo da faixa VSD⁺, para plantas com alta demanda de ar comprimido.',
      'A pressão é ajustável de 4 a 13 bar (12,75 bar nas versões FF), o motor é IP66 e a lubrificação usa óleo sintético RXD (Roto Xtend Fluid). As montagens disponíveis são FF (com secador integrado) e P (sem secador), em tensões trifásicas de 220, 380 ou 440 V. A velocidade variável com motor IE5 entrega máxima economia de energia em regime industrial contínuo.',
      fecho('da série GA VSD⁺ 30–37'),
    ],
    specs: [
      ['Modelos', 'GA 30 VSD⁺ · GA 37 VSD⁺'],
      ['Vazão (FAD)', '31,8–207,6 · 31,8–246,4 PCM'],
      ['Potência do motor', '30 · 37 kW'],
      ['Pressão ajustável', '4 a 13 bar (12,75 para FF)'],
      ['Transmissão', 'Direta'],
      ['Motor', 'Ímã permanente · rendimento IE5 · IP66'],
      ['Óleo', 'Sintético RXD (Roto Xtend Fluid)'],
      ['Tensões (trifásico)', '220 · 380 · 440 V'],
      ['Montagem', 'FF (secador integrado) · P'],
    ],
  },
];

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env.');
  process.exit(1);
}

const client = postgres(url, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

async function main() {
  const [cat] = await db
    .select({ id: schema.categorias.id })
    .from(schema.categorias)
    .where(eq(schema.categorias.slug, 'compressores-eletricos'));
  if (!cat) {
    console.error('✖ categoria compressores-eletricos não encontrada');
    process.exit(1);
  }

  const slugsPdf = itens.map((i) => i.slug);

  // 1) upsert dos 11 produtos do PDF, na ordem (id cresce na ordem do PDF)
  let inseridos = 0;
  let atualizados = 0;
  for (const it of itens) {
    const [existe] = await db
      .select({ id: schema.produtos.id })
      .from(schema.produtos)
      .where(eq(schema.produtos.slug, it.slug));

    let id: number;
    if (existe) {
      id = existe.id;
      await db
        .update(schema.produtos)
        .set({
          nome: it.nome,
          categoriaId: cat.id,
          specsChips: it.chips,
          pitch: it.pitch,
          descricao: it.descricao,
          publicado: true,
          atualizadoEm: new Date(),
        })
        .where(eq(schema.produtos.id, id));
      atualizados++;
    } else {
      const [row] = await db
        .insert(schema.produtos)
        .values({
          slug: it.slug,
          nome: it.nome,
          categoriaId: cat.id,
          specsChips: it.chips,
          pitch: it.pitch,
          descricao: it.descricao,
          publicado: true,
        })
        .returning({ id: schema.produtos.id });
      id = row.id;
      inseridos++;
    }

    // specs (substitui)
    await db.delete(schema.produtoSpecs).where(eq(schema.produtoSpecs.produtoId, id));
    await db.insert(schema.produtoSpecs).values(
      it.specs.map(([rotulo, valor], i) => ({ produtoId: id, rotulo, valor, ordem: i })),
    );

    // imagem (substitui)
    await db.delete(schema.produtoImagens).where(eq(schema.produtoImagens.produtoId, id));
    await db
      .insert(schema.produtoImagens)
      .values({ produtoId: id, src: it.img, alt: it.alt, principal: true, ordem: 0 });

    console.log(`${existe ? '↻' : '✔'} ${it.slug} — ${it.nome}`);
  }

  // 2) desativar TUDO na categoria que não seja um dos 11 do PDF
  const desativados = await db
    .update(schema.produtos)
    .set({ publicado: false, atualizadoEm: new Date() })
    .where(
      and(
        eq(schema.produtos.categoriaId, cat.id),
        notInArray(schema.produtos.slug, slugsPdf),
      ),
    )
    .returning({ slug: schema.produtos.slug });

  console.log(`\n→ ${inseridos} inserido(s), ${atualizados} atualizado(s).`);
  console.log(`→ desativados (fora do PDF): ${desativados.map((d) => d.slug).join(', ') || 'nenhum'}`);
}

main()
  .catch((e) => {
    console.error('✖ Falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => client.end());
