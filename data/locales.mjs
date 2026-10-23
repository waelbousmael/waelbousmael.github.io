// Published URLs, independent of visible copy and of a visitor's device/location.
export const LANGUAGES = ['en', 'ar', 'de'];
export const DEFAULT_LANGUAGE = 'en';
export const OG_LOCALES = { en: 'en_US', ar: 'ar_SA', de: 'de_DE' };

export function createRoutes(site, projects) {
  const routes = new Map([
    ['/', { en: '/', ar: '/ar/', de: '/de/' }],
    ['/work/', { en: '/en/work/', ar: '/work/', de: '/de/projekte/' }],
    ['/services/', { en: '/en/services/', ar: '/services/', de: '/de/leistungen/' }],
    ['/approach/', { en: '/en/approach/', ar: '/approach/', de: '/de/ablauf/' }],
    ['/about/', { en: '/en/about/', ar: '/about/', de: '/de/ueber-uns/' }],
    ['/contact/', { en: '/en/contact/', ar: '/contact/', de: '/de/kontakt/' }],
    ['/credits/', { en: '/en/credits/', ar: '/credits/', de: '/de/bildnachweise/' }],
    ['/journal/', { en: '/en/journal/', ar: '/journal/' }]
  ]);
  for (const project of projects) {
    const logical = `/work/${project.slug}/`;
    routes.set(logical, { ar: logical, en: `/en${logical}`,
      ...(!project.placeholder ? { de: `/de/projekte/${project.slug}/` } : {}) });
  }
  for (const entry of [...site.landings, ...site.journal.map((a) => ({ slug: `journal/${a.slug}` }))]) {
    const logical = `/${entry.slug}/`;
    routes.set(logical, { ar: logical, en: `/en${logical}` });
  }
  for (const entry of [...(site.berlin?.landings || []), ...(site.berlin?.legal || [])]) {
    routes.set(`/${entry.slug}/`, { de: `/de/${entry.slug}/` });
  }
  const path = (lang, logical) => {
    const url = routes.get(logical)?.[lang];
    if (!url) throw new Error(`No published ${lang} page for ${logical}`);
    return url;
  };
  return { routes, path };
}
