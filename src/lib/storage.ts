// Armazenamento de imagens do admin — Supabase Storage (bucket "produtos",
// público). Módulo isolado de propósito: se o projeto migrar para Cloudflare
// R2, troca-se só este arquivo (a interface enviarImagemProduto fica igual).
//
// Toda imagem enviada é TRATADA antes de subir: orientada pelo EXIF, limitada
// a 530px de largura (proporção mantida, sem ampliar) e convertida para WebP 85%.

import sharp from 'sharp';

const env = (k: string): string | undefined =>
  (typeof import.meta !== 'undefined' && import.meta.env?.[k]) || process.env[k];

const TIPOS_PERMITIDOS = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);

export const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5 MB
export const LARGURA_MAXIMA = 530; // px (proporção mantida)
export const QUALIDADE_WEBP = 85; // %

export function validarImagem(arquivo: File): string | null {
  if (!TIPOS_PERMITIDOS.has(arquivo.type)) {
    return 'Formato inválido — use JPG, PNG, WebP ou AVIF.';
  }
  if (arquivo.size > TAMANHO_MAXIMO) {
    return 'Arquivo acima de 5 MB.';
  }
  return null;
}

/**
 * Trata e envia a imagem; retorna a URL pública (.webp).
 * `nomeBase` é o nome sem extensão (a saída é sempre .webp).
 */
export async function enviarImagemProduto(
  nomeBase: string,
  dados: ArrayBuffer | Buffer,
): Promise<string> {
  const base = env('SUPABASE_URL');
  const chave = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!base || !chave) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configurados');
  }

  // Tratamento: orienta pelo EXIF, no máx. 530px de largura (sem ampliar) → WebP 85%.
  const entrada = Buffer.isBuffer(dados) ? dados : Buffer.from(dados);
  const webp = await sharp(entrada)
    .rotate()
    .resize({ width: LARGURA_MAXIMA, withoutEnlargement: true })
    .webp({ quality: QUALIDADE_WEBP })
    .toBuffer();

  // nome final = o que o chamador passou + .webp (ex.: slug-do-produto-1.webp)
  const nome = nomeBase.replace(/\.[^.]+$/, '') || 'imagem';
  const caminho = `${nome}.webp`;

  const res = await fetch(`${base}/storage/v1/object/produtos/${caminho}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${chave}`,
      'Content-Type': 'image/webp',
      'x-upsert': 'true',
      'cache-control': 'max-age=31536000',
    },
    body: new Uint8Array(webp),
  });
  if (!res.ok) {
    throw new Error(`Upload falhou (${res.status}): ${await res.text()}`);
  }
  return `${base}/storage/v1/object/public/produtos/${caminho}`;
}
