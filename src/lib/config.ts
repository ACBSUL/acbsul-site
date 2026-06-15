// Dados de contato efetivos do site. Lê a linha única (id=1) de `configuracoes`
// e mescla sobre os padrões de src/data/empresa.ts. Campo vazio no banco = usa
// o padrão. Tolerante a falha: no build sem DATABASE_URL (ou antes da tabela
// existir), a query lança e caímos nos defaults — o build de páginas SSG segue.

import { eq } from 'drizzle-orm';
import { db, tabelas } from '../db';
import { empresa } from '../data/empresa';

export interface ConfigContato {
  /** só dígitos (DDI+DDD+número), para links wa.me */
  whatsapp: string;
  /** telefone formatado para exibição, ex.: (51) 3377-3626 */
  telefone: string;
  /** telefone para href="tel:", ex.: +555133773626 */
  telefoneTel: string;
  email: string;
}

const soDigitos = (s: string) => s.replace(/\D/g, '');

const padrao = (): ConfigContato => ({
  whatsapp: empresa.whatsapp,
  telefone: empresa.telefone,
  telefoneTel: empresa.telefoneTel,
  email: empresa.email,
});

export async function carregarConfig(): Promise<ConfigContato> {
  try {
    const [row] = await db
      .select()
      .from(tabelas.configuracoes)
      .where(eq(tabelas.configuracoes.id, 1))
      .limit(1);
    if (!row) return padrao();

    const tel = row.telefone?.trim();
    const wa = soDigitos(row.whatsappGeral ?? '');
    return {
      whatsapp: wa || empresa.whatsapp,
      telefone: tel || empresa.telefone,
      telefoneTel: tel ? '+55' + soDigitos(tel) : empresa.telefoneTel,
      email: row.email?.trim() || empresa.email,
    };
  } catch {
    return padrao();
  }
}
