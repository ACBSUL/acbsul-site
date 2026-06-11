// Lista compacta de todos os produtos sem PDP (apoio p/ preencher conteúdo).
import 'dotenv/config';
import { produtos, temPaginaPropria } from '../src/data/produtos';

for (const p of produtos) {
  if (temPaginaPropria(p)) continue;
  const img = p.imagens[0]?.src.split('/').pop() ?? '';
  console.log(
    `${p.categoria} | ${p.slug} | ${p.codigo}${p.etiqueta ? ` (${p.etiqueta})` : ''} | ${p.tipo} | chips: ${p.specsChips.join('; ')} | img: ${img}${p.nome ? ` | nome: ${p.nome}` : ''}`,
  );
}
