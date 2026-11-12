// Filtro de leads falsos (robôs) do formulário do site.
//
// Padrão dos robôs que chegaram até 11/2026: nome com letras aleatórias
// misturando maiúsculas/minúsculas sem espaço ("CybhicBmhcZmhVaKvt"), Gmail
// cheio de pontos e telefone de 10 dígitos com DDD inexistente.
//
// Camadas (qualquer uma marca como spam):
//  1. armadilha: campo "website" escondido — pessoa não vê, robô preenche;
//  2. tempo: o site-v2.js manda "_t" (ms desde que a página abriu). Sem ele =
//     POST direto na API (sem passar pelo site); menos de 3s = robô;
//  3. nome aleatório.
// Telefone inválido NÃO é spam: volta erro para a pessoa corrigir.

const DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/** Telefone brasileiro com DDD (fixo 10 dígitos ou celular 11 começando com 9). */
export function telefoneValido(tel: string): boolean {
  let n = tel.replace(/\D/g, '');
  if ((n.length === 12 || n.length === 13) && n.startsWith('55')) n = n.slice(2);
  if (n.length === 11 && n.startsWith('0')) n = n.slice(1);
  if (n.length !== 10 && n.length !== 11) return false;
  if (!DDDS.has(Number(n.slice(0, 2)))) return false;
  if (n.length === 11 && n[2] !== '9') return false;
  return true;
}

/** Nome tipo "lddjMpQNrygMGVVouFTuJW": uma palavra só, 10+ letras, 4+ maiúsculas no meio. */
export function nomeAleatorio(nome: string): boolean {
  const s = nome.trim();
  if (!/^[A-Za-z]{10,}$/.test(s)) return false;
  const maiusculasNoMeio = (s.slice(1).match(/[A-Z]/g) || []).length;
  return maiusculasNoMeio >= 4;
}

/** Devolve o motivo se parecer robô; null se parecer pessoa. */
export function motivoSpam(dados: Record<string, unknown>, nome: string): string | null {
  if (String(dados.website ?? '').trim()) return 'armadilha';
  const t = Number(dados._t);
  if (!Number.isFinite(t) || t <= 0) return 'sem-tempo';
  if (t < 3000) return 'rapido-demais';
  if (nomeAleatorio(nome)) return 'nome-aleatorio';
  return null;
}
