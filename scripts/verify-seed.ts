// Confere contagens do catálogo no banco (uso: npx tsx scripts/verify-seed.ts)
import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
const [r] = await sql`
  select
    (select count(*)::int from categorias)      as categorias,
    (select count(*)::int from produtos)        as produtos,
    (select count(*)::int from produto_imagens) as imagens,
    (select count(*)::int from produto_specs)   as specs
`;
console.log(r);
await sql.end();
