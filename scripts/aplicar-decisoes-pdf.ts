// Aplica no banco as decisões do cliente sobre a apresentação rev01 26.05.26:
//  1) liga as imagens extraídas do PDF aos 17 produtos novos;
//  2) despublica geradores e portáteis que saíram de linha (ficam como rascunho);
//  3) renomeia W1100 -> W1000 (nova nomenclatura DrillAir).
// Idempotente: pode rodar mais de uma vez. Uso: npx tsx scripts/aplicar-decisoes-pdf.ts
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/db/schema';

const P = '/assets/products';

// slug -> [categoria-pasta, alt]
const imagens: Record<string, [string, string]> = {
  'compressores-parafuso-linha-g': ['compressores-eletricos', 'Compressor de parafuso Atlas Copco da Linha G (modelo G7 FF) sobre reservatório'],
  'xas-58-kd': ['compressores-portateis', 'Compressor de ar portátil Atlas Copco XAS 58 Kd de 115 pcm'],
  'xas-98-kd': ['compressores-portateis', 'Compressor de ar portátil Atlas Copco XAS 98 Kd de 186 pcm'],
  'x-air-290-14': ['compressores-portateis', 'Compressor portátil a diesel Atlas Copco X-Air 290/14 de 272 pcm'],
  'x-air-300-12': ['compressores-portateis', 'Compressor portátil a diesel Atlas Copco X-Air 300/12 de 296 pcm'],
  'x-air-350-10': ['compressores-portateis', 'Compressor portátil a diesel Atlas Copco X-Air 350/10 de 339 pcm'],
  'x-air-400-7': ['compressores-portateis', 'Compressor portátil a diesel Atlas Copco X-Air 400/7 de 404 pcm'],
  'xahs-450-cud': ['compressores-portateis', 'Compressor portátil Atlas Copco XAHS 450 Cud da linha XAS boX'],
  'xahs-750-cud': ['compressores-portateis', 'Compressor portátil Atlas Copco XAHS 750 Cud da linha XAS boX'],
  'xahs-850-cud-pace': ['compressores-portateis', 'Compressor portátil Atlas Copco XAHS 850 Cud PACE da linha XAS boX'],
  'x-air-plus-815-14': ['compressores-portateis', 'Compressor portátil a diesel Atlas Copco X-Air+ 815/14 de 818 pcm'],
  'x-air-plus-970-10': ['compressores-portateis', 'Compressor portátil a diesel Atlas Copco X-Air+ 970/10 de 992 pcm'],
  'x-air-plus-900-20': ['compressores-portateis', 'Compressor portátil a diesel Atlas Copco X-Air+ 900/20 de 880 pcm'],
  'y1300-sd': ['compressores-portateis', 'Compressor portátil de perfuração Atlas Copco DrillAir Y1300 Sd'],
  'e-air-t400': ['compressores-portateis', 'Compressor de ar portátil 100% elétrico Atlas Copco E-AIR T400'],
  'hilight-v7-led': ['torre-de-iluminacao', 'Torre de iluminação LED Atlas Copco HiLight V7+'],
  'hilight-ms4-solar': ['torre-de-iluminacao', 'Torre de iluminação solar Atlas Copco HiLight MS4'],
};

// fora de linha (somente manutenção) -> rascunho
const despublicar = [
  'qas-24', 'qas-140', 'qas-170', 'qas-210',
  'xahs-157', 'xas-157-pdg', 'xats-167', 'xas-187', 'xas-770',
  'xahs-805', 'xats-805', 'xams-900', 'xats-910',
];

const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

const idDe = async (slug: string) => {
  const [r] = await db.select({ id: schema.produtos.id }).from(schema.produtos).where(eq(schema.produtos.slug, slug));
  return r?.id ?? null;
};

async function main() {
  // 1) imagens
  for (const [slug, [cat, alt]] of Object.entries(imagens)) {
    const id = await idDe(slug);
    if (!id) { console.error(`✖ imagem: ${slug} não encontrado`); continue; }
    const src = `${P}/${cat}/${slug}.webp`;
    await db.delete(schema.produtoImagens).where(eq(schema.produtoImagens.produtoId, id));
    await db.insert(schema.produtoImagens).values({ produtoId: id, src, alt, principal: true, ordem: 0 });
    console.log(`✔ imagem ligada: ${slug}`);
  }

  // 2) despublicar (manter no banco como rascunho)
  for (const slug of despublicar) {
    const id = await idDe(slug);
    if (!id) { console.error(`✖ despublicar: ${slug} não encontrado`); continue; }
    await db.update(schema.produtos).set({ publicado: false, atualizadoEm: new Date() }).where(eq(schema.produtos.id, id));
    console.log(`• rascunho: ${slug}`);
  }

  // 3) W1100 -> W1000
  const wid = await idDe('w1100');
  if (wid) {
    await db.update(schema.produtos)
      .set({
        slug: 'w1000',
        nome: 'Compressor Portátil W1000',
        specsChips: ['920–1060 pcm', '19–28 bar', 'DrillAir'],
        atualizadoEm: new Date(),
      })
      .where(eq(schema.produtos.id, wid));
    await db.update(schema.produtoImagens)
      .set({ src: `${P}/compressores-portateis/w1000.jpg`, alt: 'Compressor portátil de perfuração Atlas Copco DrillAir W1000' })
      .where(eq(schema.produtoImagens.produtoId, wid));
    console.log('✔ W1100 → W1000');
  } else if (await idDe('w1000')) {
    console.log('• W1000 já aplicado');
  } else {
    console.error('✖ W1100/W1000 não encontrado');
  }

  console.log('\n→ Decisões aplicadas.');
}

main().catch((e) => { console.error('✖', e); process.exitCode = 1; }).finally(() => client.end());
