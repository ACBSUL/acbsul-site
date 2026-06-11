// Armazenamento de imagens do admin — Supabase Storage (bucket "produtos",
// público). Módulo isolado de propósito: se o projeto migrar para Cloudflare
// R2, troca-se só este arquivo (a interface enviarImagemProduto fica igual).

const env = (k: string): string | undefined =>
  (typeof import.meta !== 'undefined' && import.meta.env?.[k]) || process.env[k];

const TIPOS_PERMITIDOS = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);

export const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5 MB

export function validarImagem(arquivo: File): string | null {
  if (!TIPOS_PERMITIDOS.has(arquivo.type)) {
    return 'Formato inválido — use JPG, PNG, WebP ou AVIF.';
  }
  if (arquivo.size > TAMANHO_MAXIMO) {
    return 'Arquivo acima de 5 MB.';
  }
  return null;
}

/** Envia a imagem e retorna a URL pública. */
export async function enviarImagemProduto(
  nomeBase: string,
  dados: ArrayBuffer,
  contentType: string,
): Promise<string> {
  const base = env('SUPABASE_URL');
  const chave = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!base || !chave) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configurados');
  }

  // prefixo temporal evita colisão e cache antigo ao re-enviar mesmo nome
  const caminho = `${Date.now().toString(36)}-${nomeBase}`;

  const res = await fetch(`${base}/storage/v1/object/produtos/${caminho}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${chave}`,
      'Content-Type': contentType,
      'x-upsert': 'true',
      'cache-control': 'max-age=31536000',
    },
    body: dados,
  });
  if (!res.ok) {
    throw new Error(`Upload falhou (${res.status}): ${await res.text()}`);
  }
  return `${base}/storage/v1/object/public/produtos/${caminho}`;
}
