// Ícones SVG por categoria (paths internos, viewBox 24, traço 2 — estilo dos ícones do site).
// Usados no megamenu (SiteNav) e na lista de filtros do catálogo (/produtos).

export const catIcons: Record<string, string> = {
  'compressores-eletricos':
    '<circle cx="12" cy="12" r="3"></circle><path d="M12 2v4M12 18v4M22 12h-4M6 12H2M19 5l-3 3M8 16l-3 3M19 19l-3-3M8 8 5 5"></path>',
  'compressores-portateis':
    '<circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle><path d="M5 18H3V8h13l4 5v5h-2M9 18h6"></path>',
  'geradores-de-energia': '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"></path>',
  'geradores-de-gas-nitrogenio': '<path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5z"></path><path d="M9 15V9l6 6V9"></path>',
  'torre-de-iluminacao': '<circle cx="12" cy="7" r="3"></circle><path d="M12 2v1M6.5 4.5l.7.7M17.5 4.5l-.7.7M12 10v9M8 22l4-3 4 3"></path>',
  'rompedores': '<path d="M9 2h6M12 2v4M8 6h8v6H8zM12 12v10M9 22h6"></path>',
  'perfuratriz': '<path d="M12 3v13M8 12l4 4 4-4M4 21h16"></path>',
  'pecas':
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
  'bombas-de-vacuo': '<circle cx="12" cy="12" r="9"></circle><path d="M12 12 7 7M12 3v3M12 18v3"></path>',
  'quality-air': '<path d="M9.5 5a2.5 2.5 0 1 1 2 4H2M13 19a2 2 0 1 0 2-3H2M17 8a2.5 2.5 0 1 1 2 4H10"></path>',
  'motobombas':
    '<path d="M12 3C12 3 6.5 9.2 6.5 13.5a5.5 5.5 0 0 0 11 0C17.5 9.2 12 3 12 3z"></path><path d="M9.5 14.5c.8.8 1.7.8 2.5 0s1.7-.8 2.5 0"></path>',
};

/** ícone "Todas as linhas" (grade 2×2) para a lista de filtros */
export const iconTodas =
  '<rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect>';
