import { MetadataRoute } from 'next';
import { aiInsights } from '@/lib/data';
import { ROUTES } from '@/lib/routes';

const BASE_URL = 'https://www.mirb.investments';

/**
 * Elite SEO Priority Map: Directing Google's focus with precision.
 * Values are calibrated to ensure the main brand pillars receive maximum Crawl Budget.
 * Optimized for 24h indexing of new guides.
 */
const routePriorities: { [key: string]: number } = {
  [ROUTES.HOME]: 1.0,
  [ROUTES.INVESTMENT_GUIDE]: 1.0,
  [ROUTES.INVEST]: 0.9,
  [ROUTES.CRYPTO_SHOP]: 0.9,
  [ROUTES.CLUB]: 0.9,
  [ROUTES.EXCHANGE]: 0.9,
  [ROUTES.ABOUT]: 0.9,
  [ROUTES.NEURAL_DIAGNOSTICS]: 0.9,
  [ROUTES.ACADEMY]: 0.9,
  [ROUTES.AI_INSIGHTS]: 0.9,
  [ROUTES.TRUSTED_PARTNERS]: 0.6,
  [ROUTES.SUPPORT]: 0.5,
  [ROUTES.NEWSLETTER]: 0.5,
  [ROUTES.TERMS]: 0.3,
  [ROUTES.PRIVACY]: 0.3,
  [ROUTES.SECURITY]: 0.3,
};

const jahorinaSlugs = {
    'en': '/ai-insights/strategic-convergence-jahorina-2026-ai-real-estate-tourism',
    'de': '/ai-insights/de-strategische-konvergenz-jahorina-2026',
    'tr': '/ai-insights/tr-stratejik-yakinlasma-jahorina-2026',
    'bs': '/ai-insights/bhs-strateska-konvergencija-jahorina-2026',
    'ar': '/ai-insights/ar-strategic-convergence-jahorina-2026',
    'es': '/ai-insights/es-convergencia-estrategica-jahorina-2026',
};

const jahorinaDefault = '/ai-insights/bhs-strateska-konvergencija-jahorina-2026';
const jahorinaSlugSet = new Set(Object.values(jahorinaSlugs).map(slug => slug.replace('/ai-insights/', '')));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const privateRoutes = new Set([
    ROUTES.DASHBOARD,
    ROUTES.DEPOSIT,
    ROUTES.WITHDRAWALS,
    ROUTES.MESSAGES,
    ROUTES.SETTINGS,
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.REGISTER_THANK_YOU,
    ...Object.values(jahorinaSlugs)
  ]);

  const staticRoutes = Object.values(ROUTES).filter(
    (route) => !privateRoutes.has(route as any)
  );

  const staticPages = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === ROUTES.HOME || route === ROUTES.INVESTMENT_GUIDE ? ('daily' as const) : ('weekly' as const),
    priority: routePriorities[route as keyof typeof routePriorities] || 0.4,
  }));

  const insightPages = aiInsights
    .filter(insight => !jahorinaSlugSet.has(insight.slug))
    .map((insight) => ({
      url: `${BASE_URL}/ai-insights/${insight.slug}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));
    
  const jahorinaPages = Object.entries(jahorinaSlugs).map(([lang, slug]) => ({
    url: `${BASE_URL}${slug}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.9,
    alternates: {
      languages: {
        ...Object.fromEntries(
          Object.entries(jahorinaSlugs).map(([l, s]) => [l, `${BASE_URL}${s}`])
        ),
        'x-default': `${BASE_URL}${jahorinaDefault}`
      }
    }
  }));

  return [...staticPages, ...insightPages, ...jahorinaPages];
}
