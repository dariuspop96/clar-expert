/**
 * Iconițe liniare, inline (fără request separat, colorabile prin currentColor).
 * Adaugă o intrare nouă în `paths` când ai nevoie de un simbol în plus.
 */
export const paths = {
  'shield-check': '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  'chart-line': '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>',
  building: '<path d="M4 7h16v13H4z"/><path d="M4 7l8-4 8 4M9 20v-6h6v6"/>',
  document: '<path d="M5 3h11l3 3v15H5z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0M16 4a3 3 0 010 6M18 20a6 6 0 00-3-5.2"/>',
  declaration: '<path d="M7 3h10v18l-5-3-5 3z"/><path d="M10 8h4M10 12h4"/>',
  'chart-bars': '<path d="M4 20V4M4 20h16"/><path d="M8 16l3-4 3 2 5-7"/>',
  advisory: '<path d="M12 3a9 9 0 100 18 9 9 0 000-18z"/><path d="M12 8v5l3 2"/>',
  'plus-circle': '<path d="M12 5v14M5 12h14"/><circle cx="12" cy="12" r="9"/>',
  home: '<path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/>',
  folder: '<path d="M6 3h9l3 3v15H6z"/><path d="M9 12h6M9 16h4"/><path d="M14 3v4h4"/>',
  star: '<path d="M12 2l2 5 5 .5-3.8 3.4 1.2 5.1L12 18l-4.6 2 1.2-5.1L4.8 11.5 9.8 11z"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>',
  briefcase: '<path d="M4 7h16v13H4z"/><path d="M9 7V5a3 3 0 016 0v2"/><path d="M12 12v3"/>',
  team: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0M17 20a5 5 0 00-3-4.6"/>',
  chat: '<path d="M8 10h8M8 14h5"/><path d="M4 5h16v12H9l-5 4z"/>',
  search: '<path d="M11 4a7 7 0 100 14 7 7 0 000-14zM16 16l4 4"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  'check-circle': '<path d="M12 3a9 9 0 100 18 9 9 0 000-18z"/><path d="M9 12l2 2 4-4"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  mail: '<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.3-7-11a7 7 0 0114 0c0 4.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18a15 15 0 010-18"/>',
  burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
} as const;

export type IconName = keyof typeof paths;
