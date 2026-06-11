// Preenche conteúdo de PDP dos 2 compressores elétricos (uso único).
// Fontes oficiais Atlas Copco:
// - Datasheet GA 11+-30 50 Hz (2935 0826 40)
// - Leaflet GX 2-11 (9096 3240 92)
// - Página da série GA em atlascopco.com/pt-br
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/db/schema';

const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

interface Conteudo {
  slug: string;
  pitch: string;
  descricao: string[];
  especificacoes: Array<[string, string]>;
}

const conteudos: Conteudo[] = [
  {
    slug: 'ga-gx',
    pitch:
      'Linha completa de compressores de parafuso lubrificados Atlas Copco — do GX compacto de <b>2,2 kW</b> ao GA industrial de grande porte — com pressões de 7,5 a 13 bar, regime 100% contínuo e versões Full Feature com secador de ar integrado.',
    descricao: [
      '<b>As linhas GA e GX são os compressores de parafuso com injeção de óleo da Atlas Copco para fornecimento contínuo de ar comprimido na indústria.</b> A série GX (2,2 a 11 kW) leva a tecnologia de parafuso industrial para pequenas e médias operações, com vazão de 4,0 a 26,6 l/s e pressões de 7,5 a 13 bar; a série GA cobre da entrada ao grande porte — de 5,5 até 500 kW, com vazão de até 5.082 m³/h — sempre em regime de trabalho 100% contínuo.',
      'Na prática, isso atende desde a oficina e a manufatura leve até linhas de produção que não podem parar: metalmecânica, plásticos, alimentos e bebidas, ar de instrumentação. O GX tem baixo nível de ruído (61 a 67 dB(A)) e montagem compacta — no piso ou sobre reservatório —, podendo ser instalado junto ao ponto de uso; as versões Full Feature de ambas as linhas trazem secador refrigerado integrado, entregando ar seco direto na rede e protegendo tubulação e ferramentas contra condensado. Nos modelos GA, o controlador Elektronikon® com monitoramento SMARTLINK acompanha a máquina à distância, e as versões VSD de velocidade variável ajustam a rotação à demanda real de ar, com economia de energia de até 35% (até 50% no VSD⁺) em relação à velocidade fixa.',
      'Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul dimensiona o compressor de parafuso adequado à vazão e à pressão da sua operação, com <b>venda ou locação</b>, peças originais e assistência técnica em todo o RS e Santa Catarina. Solicite um orçamento e receba a indicação do modelo GA ou GX certo para a sua demanda.',
    ],
    especificacoes: [
      ['Tecnologia', 'Parafuso rotativo com injeção de óleo'],
      ['Linha GX', '2,2–11 kW (GX 2 a GX 11)'],
      ['Linha GA', '5,5–500 kW'],
      ['Pressão de trabalho', '7,5–13 bar'],
      ['Vazão (FAD) — GX', '4,0–26,6 l/s'],
      ['Vazão (FAD) — série GA', 'até 5.082 m³/h'],
      ['Nível de ruído — GX', '61–67 dB(A)'],
      ['Regime de trabalho', '100% contínuo'],
      ['Variantes', 'Piso ou tanque · Full Feature (secador integrado) · VSD/VSD⁺'],
    ],
  },
  {
    slug: 'ga-11-30-vsd',
    pitch:
      'Compressores de parafuso lubrificados de <b>11 a 30 kW</b> com vazão de 26,7 a 94,0 l/s e pressão de 7,5 a 13 bar — linha GA 11⁺-30 com motor IE4, controlador Elektronikon® Touch e versões VSD de velocidade variável para economia de energia.',
    descricao: [
      '<b>O GA 11⁺-30 é a linha de compressores de parafuso com injeção de óleo da Atlas Copco na faixa de 11 a 30 kW (15–40 hp), com pressão de trabalho de 7,5 a 13 bar e vazão (FAD) de 26,7 a 94,0 l/s.</b> São seis modelos — GA 11⁺, 15⁺, 18⁺, 22⁺, 26⁺ e GA 30 — projetados para regime de trabalho 100% contínuo, com motor classe IE4 e nível de ruído entre 67 e 70 dB(A), entre os mais baixos da categoria.',
      'É o porte de compressor que sustenta a produção em metalmecânica, plásticos, alimentos e bebidas e qualquer planta onde o ar comprimido é insumo crítico. O controlador Elektronikon® Touch traz programação semanal e monitoramento remoto SMARTLINK de série; a versão Full Feature adiciona secador refrigerado integrado (ponto de orvalho de 2 a 3 °C) com separador de água, entregando ar seco direto na rede — sem equipamento externo. Nas versões VSD, a rotação acompanha a demanda real de ar, reduzindo o consumo de energia em até 35% na comparação com máquinas de velocidade fixa.',
      'Como distribuidora autorizada Atlas Copco no Rio Grande do Sul, a ACB Sul fornece o GA 11⁺-30 para <b>venda ou locação</b>, com dimensionamento técnico, peças originais e assistência em campo em todo o RS e Santa Catarina. Solicite um orçamento informando pressão e vazão necessárias e receba a configuração adequada à sua operação.',
    ],
    especificacoes: [
      ['Modelos', 'GA 11⁺ · 15⁺ · 18⁺ · 22⁺ · 26⁺ · 30'],
      ['Potência instalada', '11–30 kW (15–40 hp)'],
      ['Pressão máxima de trabalho', '7,5–13 bar(e)'],
      ['Vazão (FAD)', '26,7–94,0 l/s (96–338 m³/h)'],
      ['Nível de ruído', '67–70 dB(A)'],
      ['Motor', 'Classe de eficiência IE4'],
      ['Controlador', 'Elektronikon® Touch + monitoramento SMARTLINK'],
      ['Versão Full Feature', 'Secador integrado (ponto de orvalho 2–3 °C)'],
      ['Regime de trabalho', '100% contínuo'],
      ['Peso', '411–567 kg'],
    ],
  },
];

for (const c of conteudos) {
  const [p] = await db
    .select({ id: schema.produtos.id })
    .from(schema.produtos)
    .where(eq(schema.produtos.slug, c.slug));
  if (!p) {
    console.error(`✖ produto não encontrado: ${c.slug}`);
    continue;
  }
  await db
    .update(schema.produtos)
    .set({ pitch: c.pitch, descricao: c.descricao, publicado: true, atualizadoEm: new Date() })
    .where(eq(schema.produtos.id, p.id));
  await db.delete(schema.produtoSpecs).where(eq(schema.produtoSpecs.produtoId, p.id));
  await db.insert(schema.produtoSpecs).values(
    c.especificacoes.map(([rotulo, valor], i) => ({ produtoId: p.id, rotulo, valor, ordem: i })),
  );
  const palavras = c.descricao.join(' ').replace(/<[^>]+>/g, '').split(/\s+/).length;
  console.log(`✔ ${c.slug}: ${c.especificacoes.length} specs, descrição ${palavras} palavras`);
}

await client.end();
