// Cria o bucket público "produtos" no Supabase Storage (imagens do admin).
// Idempotente. Uso: npx tsx scripts/create-storage-bucket.ts

import 'dotenv/config';

const base = process.env.SUPABASE_URL!;
const chave = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const res = await fetch(`${base}/storage/v1/bucket`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${chave}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 'produtos', name: 'produtos', public: true }),
});

if (res.ok) {
  console.log('✔ Bucket "produtos" criado (público).');
} else {
  const corpo = await res.text();
  if (corpo.includes('already exists') || res.status === 409) {
    console.log('✔ Bucket "produtos" já existia.');
  } else {
    console.error(`✖ Falhou (${res.status}): ${corpo}`);
    process.exitCode = 1;
  }
}
