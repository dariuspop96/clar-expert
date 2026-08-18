import ro from './ro.json';
import en from './en.json';
import fr from './fr.json';

export const locales = ['ro', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ro';

export const localeNames: Record<Locale, string> = {
  ro: 'Română',
  en: 'English',
  fr: 'Français',
};

/** Etichetă BCP-47 pentru <html lang> și hreflang */
export const localeTags: Record<Locale, string> = {
  ro: 'ro-RO',
  en: 'en-US',
  fr: 'fr-FR',
};

const dictionaries = { ro, en, fr } as const;

/** Structura dicționarului este dedusă din ro.json — cheile lipsă din en/fr dau eroare de tip. */
export type Dictionary = typeof ro;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return first && isLocale(first) ? first : defaultLocale;
}

/** Dicționarul complet, tipat. Preferă-l lui t() când treci obiecte spre componente. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}

/**
 * Traducere pe cheie punctată: t('hero.title').
 * Aruncă în dev dacă cheia lipsește, ca să nu ajungă goluri în producție.
 */
export function useTranslations(locale: Locale) {
  const dict = getDictionary(locale);
  return function t(key: string): string {
    const value = key.split('.').reduce<unknown>(
      (acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined),
      dict,
    );
    if (typeof value !== 'string') {
      if (import.meta.env.DEV) throw new Error(`[i18n] Cheie lipsă sau non-string: "${key}" (${locale})`);
      return '';
    }
    return value;
  };
}

/** Prefixează o cale cu limba curentă (ro rămâne fără prefix). */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean === '/' ? '' : clean}`;
}

/** Toate variantele de limbă ale unei căi — pentru hreflang și comutatorul de limbă. */
export function alternates(path: string) {
  return locales.map((locale) => ({ locale, path: localizePath(path, locale) }));
}

/** Scoate prefixul de limbă dintr-un pathname, pentru a păstra pagina la comutare. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (first && isLocale(first)) return `/${rest.join('/')}`.replace(/\/$/, '') || '/';
  return pathname;
}
