// Migração: cria a tabela `popups` (banner/popup do site, gerido em /admin/popup).
//
// Idempotente: CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS.
// Pode rodar quantas vezes quiser.
// Uso: npx tsx scripts/create-popups-table.ts   (exige DATABASE_URL no .env)

import 'dotenv/config';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url || url.includes('[SENHA-DO-BANCO]')) {
  console.error('✖ DATABASE_URL ausente ou com placeholder — preencha o .env.');
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1 });

async function main() {
  await sql.begin(async (tx) => {
    await tx`SET LOCAL statement_timeout = 0`;
    await tx`SET LOCAL lock_timeout = '20s'`;

    await tx`
      CREATE TABLE IF NOT EXISTS popups (
        id serial PRIMARY KEY,
        nome_interno text NOT NULL DEFAULT 'Popup',
        rotulo text,
        titulo text NOT NULL,
        titulo_destaque text,
        texto text,
        imagem_src text,
        imagem_alt text,
        botao_texto text NOT NULL DEFAULT 'SOLICITAR ORÇAMENTO',
        botao_link text NOT NULL DEFAULT '/#contato',
        gatilho text NOT NULL DEFAULT 'atraso',
        atraso_segundos integer NOT NULL DEFAULT 5,
        rolagem_percentual integer NOT NULL DEFAULT 40,
        alcance text NOT NULL DEFAULT 'todo-site',
        paginas text[] NOT NULL DEFAULT '{}',
        reexibir_horas integer NOT NULL DEFAULT 24,
        ativo boolean NOT NULL DEFAULT false,
        criado_em timestamp NOT NULL DEFAULT now(),
        atualizado_em timestamp NOT NULL DEFAULT now()
      )
    `;

    // colunas adicionadas depois da 1ª versão entram aqui (idempotente)
    await tx`ALTER TABLE popups ADD COLUMN IF NOT EXISTS reexibir_horas integer NOT NULL DEFAULT 24`;
  });

  console.log('✔ Tabela popups garantida.');
}

main()
  .catch((e) => {
    console.error('✖ Migração falhou:', e);
    process.exitCode = 1;
  })
  .finally(() => sql.end());
