// Popup/banner do site. Lê a tabela `popups` e escolhe qual aparece na URL atual.
//
// Regra: entre os popups ATIVOS, vale o primeiro (mais recente) cujo alcance
// case com o caminho da página. Tolerante a falha: se o banco não responder
// (ou a tabela ainda não existir), o site simplesmente não mostra popup.

import { desc, eq } from 'drizzle-orm';
import { db, tabelas } from '../db';

export type Popup = typeof tabelas.popups.$inferSelect;

/** Páginas oferecidas no admin quando o alcance é "só em páginas escolhidas". */
export const PAGINAS_DISPONIVEIS = [
  { valor: '/', rotulo: 'Home' },
  { valor: '/produtos', rotulo: 'Catálogo (/produtos)' },
  { valor: '/produtos/*', rotulo: 'Todas as páginas de produto' },
  { valor: '/servicos', rotulo: 'Serviços' },
  { valor: '/quem-somos', rotulo: 'Quem somos' },
];

const normalizar = (p: string) =>
  p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;

/** '/produtos/*' casa com qualquer caminho que comece com '/produtos/'. */
export function caminhoCasa(regra: string, caminho: string): boolean {
  const alvo = normalizar(caminho);
  if (regra.endsWith('*')) return alvo.startsWith(regra.slice(0, -1));
  return normalizar(regra) === alvo;
}

/**
 * @param caminho  URL da página (Astro.url.pathname)
 * @param previewId  id vindo de ?popup-preview=N — mostra aquele popup mesmo
 *   desativado e fora do alcance, para o admin conferir antes de publicar.
 */
export async function carregarPopupDaPagina(
  caminho: string,
  previewId?: number,
): Promise<Popup | null> {
  try {
    if (previewId) {
      const [p] = await db
        .select()
        .from(tabelas.popups)
        .where(eq(tabelas.popups.id, previewId))
        .limit(1);
      return p ?? null;
    }
  } catch {
    return null;
  }

  try {
    const linhas = await db
      .select()
      .from(tabelas.popups)
      .where(eq(tabelas.popups.ativo, true))
      .orderBy(desc(tabelas.popups.atualizadoEm));

    return (
      linhas.find(
        (p) =>
          p.alcance === 'todo-site' ||
          p.paginas.some((regra) => caminhoCasa(regra, caminho)),
      ) ?? null
    );
  } catch {
    return null;
  }
}
