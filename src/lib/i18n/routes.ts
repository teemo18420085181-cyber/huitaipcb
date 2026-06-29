export const siteUrl = 'https://huitaipcb.com';

export const locales = ['en', 'de'] as const;

export type Locale = (typeof locales)[number];

export const localizedRoutePairs = [
  { en: '/', de: '/de' },
  { en: '/turnkey-pcb-assembly', de: '/de/turnkey-pcb-assembly' },
  { en: '/china-pcb-assembly', de: '/de/china-pcb-assembly' },
  { en: '/bom-sourcing-pcb-assembly', de: '/de/bom-sourcing-pcb-assembly' },
  { en: '/prototype-pcb-assembly', de: '/de/prototype-pcb-assembly' },
  { en: '/contact', de: '/de/contact' },
] as const;

const enToDe = new Map<string, string>(localizedRoutePairs.map((route) => [route.en, route.de]));
const deToEn = new Map<string, string>(localizedRoutePairs.map((route) => [route.de, route.en]));

export function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  const normalized = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return normalized || '/';
}

export function getLocaleFromPathname(pathname: string): Locale {
  return normalizePathname(pathname).startsWith('/de') ? 'de' : 'en';
}

export function getLocalizedPathname(pathname: string, locale: Locale) {
  const normalized = normalizePathname(pathname);
  const englishPath = deToEn.get(normalized) || normalized;

  if (locale === 'en') {
    return englishPath === '/de' ? '/' : englishPath;
  }

  return enToDe.get(englishPath) || '/de';
}

export function absoluteUrl(pathname: string) {
  return `${siteUrl}${pathname === '/' ? '/' : normalizePathname(pathname)}`;
}

export function getLanguageAlternates(englishPathname: string) {
  const englishPath = normalizePathname(englishPathname);
  const germanPath = enToDe.get(englishPath);

  if (!germanPath) {
    return undefined;
  }

  return {
    en: absoluteUrl(englishPath),
    de: absoluteUrl(germanPath),
    'x-default': absoluteUrl(englishPath),
  };
}

export function getCanonicalPathname(pathname: string, locale: Locale) {
  return locale === 'de'
    ? getLocalizedPathname(pathname, 'de')
    : getLocalizedPathname(pathname, 'en');
}
