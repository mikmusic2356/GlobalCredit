import { CountryCode, CardCategory, ActiveTab, CreditCardItem, FinancialGuide, NewsItem, CmsArticle } from '../types';
import { COUNTRIES_DATA, COUNTRY_LIST } from '../data/countries';
import { CATEGORIES_DATA } from '../data/categories';
import { CREDIT_CARDS_DATA } from '../data/cards';
import { FINANCIAL_GUIDES_DATA } from '../data/guides';
import { NEWS_AND_TRENDS_DATA } from '../data/news';
import { ArticleStoreService } from '../data/articles/articleStore';

export type CalculatorSlug =
  | 'payoff'
  | 'balance-transfer'
  | 'rewards'
  | 'intro-plan'
  | 'utilization'
  | 'foreign-fee';

export type CreditScoreSubRoute =
  | 'overview'
  | 'us'
  | 'uk'
  | 'ca'
  | 'au'
  | 'nz'
  | 'factors'
  | 'simulator';

export type ResourcesSubRoute =
  | 'overview'
  | 'glossary'
  | 'regulators'
  | 'rights'
  | 'counseling';

export interface RouteState {
  tab: ActiveTab;
  country: CountryCode;
  category: CardCategory;
  cardSlug: string | null;
  activeCard: CreditCardItem | null;
  guideSlug: string | null;
  activeGuide: FinancialGuide | null;
  newsSlug: string | null;
  activeNews: NewsItem | null;
  articleSlug: string | null;
  activeArticle: CmsArticle | null;
  calculatorSlug: CalculatorSlug | null;
  creditScoreSubRoute: CreditScoreSubRoute | null;
  resourcesSubRoute: ResourcesSubRoute | null;
  compareCountry: CountryCode | null;
  path: string;
}

// Convert any path into structured RouteState
export function parsePath(pathname: string, search: string = ''): RouteState {
  // Clean pathname
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath ? cleanPath.split('/') : [];
  const searchParams = new URLSearchParams(search);

  // Default state
  const state: RouteState = {
    tab: 'home',
    country: 'us',
    category: 'all',
    cardSlug: null,
    activeCard: null,
    guideSlug: null,
    activeGuide: null,
    newsSlug: null,
    activeNews: null,
    articleSlug: null,
    activeArticle: null,
    calculatorSlug: null,
    creditScoreSubRoute: null,
    resourcesSubRoute: null,
    compareCountry: null,
    path: pathname || '/',
  };

  if (segments.length === 0 || segments[0] === 'home') {
    state.tab = 'home';
    return state;
  }

  const root = segments[0].toLowerCase();

  // 0. ADMIN DASHBOARD: /admin, /admin/*
  if (root === 'admin') {
    state.tab = 'admin';
    return state;
  }

  // 0.1 STATUTORY PRIVACY & COOKIE POLICIES
  if (root === 'cookie-policy' || root === 'cookies' || root === 'cookie-preferences') {
    state.tab = 'cookie-policy';
    return state;
  }

  if (root === 'privacy-policy' || root === 'privacy' || root === 'privacy-statement') {
    state.tab = 'privacy-policy';
    return state;
  }

  if (root === 'terms' || root === 'terms-of-service' || root === 'terms-and-conditions') {
    state.tab = 'terms';
    return state;
  }

  // 0.2 CMS ARTICLE DETAIL & CANONICAL REGIONAL GUIDES: /article/:slug, /articles/:slug, /:country/guides/:slug, /:country/news/:slug
  if (['us', 'uk', 'ca', 'au', 'nz', 'global'].includes(root) && segments.length >= 3) {
    const section = segments[1].toLowerCase();
    const slug = segments[2].toLowerCase();
    if (section === 'guides' || section === 'guide' || section === 'news' || section === 'trends') {
      const matched = ArticleStoreService.getArticleBySlug(slug) || ArticleStoreService.getArticleById(slug);
      if (matched) {
        state.tab = matched.type === 'news' || matched.type === 'trend' ? 'news' : 'guides';
        state.articleSlug = matched.slug;
        state.activeArticle = matched;
        state.country = root === 'global' ? 'us' : (root as CountryCode);
        return state;
      }
    }
  }

  if (root === 'article' || root === 'articles' || root === 'read') {
    if (segments.length >= 2) {
      const slug = segments[1].toLowerCase();
      const matched = ArticleStoreService.getArticleBySlug(slug) || ArticleStoreService.getArticleById(slug);
      if (matched) {
        state.tab = matched.type === 'news' || matched.type === 'trend' ? 'news' : 'guides';
        state.articleSlug = matched.slug;
        state.activeArticle = matched;
        state.country = matched.country === 'global' ? 'us' : (matched.country as CountryCode);
        return state;
      }
    }
  }

  // 1. CREDIT CARDS: /cards, /cards/:country, /cards/:country/:category, /cards/:country/card/:slug, /cards/:country/:cardId
  if (root === 'cards' || root === 'credit-cards') {
    state.tab = 'cards';
    if (segments.length >= 2) {
      const countryCandidate = segments[1].toLowerCase() as CountryCode;
      if (COUNTRIES_DATA[countryCandidate]) {
        state.country = countryCandidate;
      }
    }

    if (segments.length === 3) {
      const seg2 = segments[2].toLowerCase();
      // Check if it's a category
      const matchedCategory = CATEGORIES_DATA.find((c) => c.id === seg2 || c.id.replace(/-/g, '') === seg2.replace(/-/g, ''));
      if (matchedCategory) {
        state.category = matchedCategory.id;
      } else {
        // Might be a card ID or slug directly: /cards/us/chase-freedom-unlimited
        const matchedCard = CREDIT_CARDS_DATA.find(
          (c) => c.id.toLowerCase() === seg2 || c.id.replace(/^[a-z]{2}-/, '') === seg2
        );
        if (matchedCard) {
          state.cardSlug = matchedCard.id;
          state.activeCard = matchedCard;
          state.country = matchedCard.country;
        }
      }
    } else if (segments.length >= 4 && (segments[2] === 'card' || segments[2] === 'review')) {
      // /cards/us/card/chase-freedom-unlimited
      const cardSlug = segments[3].toLowerCase();
      const matchedCard = CREDIT_CARDS_DATA.find(
        (c) => c.id.toLowerCase() === cardSlug || c.id.replace(/^[a-z]{2}-/, '') === cardSlug
      );
      if (matchedCard) {
        state.cardSlug = matchedCard.id;
        state.activeCard = matchedCard;
        state.country = matchedCard.country;
      }
    }
    return state;
  }

  // 2. CREDIT SCORES: /credit-scores, /credit-scores/us, /credit-scores/uk, /credit-scores/factors, /credit-scores/simulator
  if (root === 'credit-scores' || root === 'credit-score' || root === 'creditscore') {
    state.tab = 'credit-score';
    if (segments.length >= 2) {
      const sub = segments[1].toLowerCase();
      if (['us', 'uk', 'ca', 'au', 'nz'].includes(sub)) {
        state.creditScoreSubRoute = sub as CreditScoreSubRoute;
        state.country = sub as CountryCode;
      } else if (sub === 'factors' || sub === 'scoring-factors') {
        state.creditScoreSubRoute = 'factors';
      } else if (sub === 'simulator' || sub === 'score-simulator') {
        state.creditScoreSubRoute = 'simulator';
      } else {
        state.creditScoreSubRoute = 'overview';
      }
    } else {
      state.creditScoreSubRoute = 'overview';
    }
    return state;
  }

  // 3. CALCULATORS: /calculators, /calculators/payoff, /calculators/balance-transfer, etc.
  if (root === 'calculators' || root === 'calculator') {
    state.tab = 'calculators';
    if (segments.length >= 2) {
      const calc = segments[1].toLowerCase() as CalculatorSlug;
      const validCalcs: CalculatorSlug[] = [
        'payoff',
        'balance-transfer',
        'rewards',
        'intro-plan',
        'utilization',
        'foreign-fee',
      ];
      if (validCalcs.includes(calc)) {
        state.calculatorSlug = calc;
      }
    }
    return state;
  }

  // 4. FINANCIAL GUIDES: /guides, /guides/:slug, /guides/category/:cat
  if (root === 'guides' || root === 'guide' || root === 'finance-guides') {
    state.tab = 'guides';
    if (segments.length === 2) {
      const slug = segments[1].toLowerCase();
      // 1. First check in full CMS articles
      const matchedCms = ArticleStoreService.getArticleBySlug(slug) || ArticleStoreService.getArticleById(slug);
      if (matchedCms) {
        state.articleSlug = matchedCms.slug;
        state.activeArticle = matchedCms;
        state.country = matchedCms.country === 'global' ? 'us' : (matchedCms.country as CountryCode);
        return state;
      }

      // 2. Fallback to legacy guides data
      const matchedGuide = FINANCIAL_GUIDES_DATA.find(
        (g) => g.slug.toLowerCase() === slug || g.id.toLowerCase() === slug
      );
      if (matchedGuide) {
        state.guideSlug = matchedGuide.slug;
        state.activeGuide = matchedGuide;
      }
    } else if (segments.length >= 3 && segments[1] === 'category') {
      // /guides/category/balance-transfers
    }
    return state;
  }

  // 5. NEWS & TRENDS: /news, /news/:slug, /news/category/:cat
  if (root === 'news' || root === 'trends' || root === 'news-and-trends') {
    state.tab = 'news';
    if (segments.length === 2) {
      const slug = segments[1].toLowerCase();
      const matchedNews = NEWS_AND_TRENDS_DATA.find(
        (n) => n.slug.toLowerCase() === slug || n.id.toLowerCase() === slug
      );
      if (matchedNews) {
        state.newsSlug = matchedNews.slug;
        state.activeNews = matchedNews;
      }
    }
    return state;
  }

  // 6. COMPARE: /compare, /compare/:country, /compare?cards=...
  if (root === 'compare') {
    state.tab = 'compare';
    if (segments.length >= 2) {
      const countryCandidate = segments[1].toLowerCase() as CountryCode;
      if (COUNTRIES_DATA[countryCandidate]) {
        state.compareCountry = countryCandidate;
        state.country = countryCandidate;
      }
    }
    return state;
  }

  // 7. COUNTRIES: /countries, /countries/:code
  if (root === 'countries' || root === 'territories') {
    state.tab = 'countries';
    if (segments.length >= 2) {
      const countryCandidate = segments[1].toLowerCase() as CountryCode;
      if (COUNTRIES_DATA[countryCandidate]) {
        state.country = countryCandidate;
      }
    }
    return state;
  }

  // 8. RESOURCES: /resources, /resources/glossary, /resources/regulators, /resources/rights, /resources/counseling
  if (root === 'resources' || root === 'glossary') {
    state.tab = 'resources';
    if (segments.length >= 2) {
      const sub = segments[1].toLowerCase();
      if (['glossary', 'regulators', 'rights', 'counseling', 'helplines'].includes(sub)) {
        state.resourcesSubRoute = sub === 'helplines' ? 'counseling' : (sub as ResourcesSubRoute);
      }
    }
    return state;
  }

  // 9. ABOUT: /about, /about-us, /disclaimer
  if (root === 'about' || root === 'about-us' || root === 'methodology') {
    state.tab = 'about';
    return state;
  }

  return state;
}

// Generate canonical SEO URL paths
export const RouteUrls = {
  home: () => '/',
  admin: () => '/admin',
  cookiePolicy: () => '/cookie-policy',
  privacyPolicy: () => '/privacy-policy',
  terms: () => '/terms',
  articleDetail: (slug: string) => `/article/${slug}`,
  cards: (country: CountryCode = 'us', category?: CardCategory) => {
    if (!category || category === 'all') {
      return `/cards/${country}`;
    }
    return `/cards/${country}/${category}`;
  },
  cardDetail: (country: CountryCode, cardIdOrSlug: string) => {
    const cleanSlug = cardIdOrSlug.toLowerCase();
    return `/cards/${country}/${cleanSlug}`;
  },
  creditScores: (subRoute?: CreditScoreSubRoute) => {
    if (!subRoute || subRoute === 'overview') {
      return '/credit-scores';
    }
    return `/credit-scores/${subRoute}`;
  },
  calculators: (calc?: CalculatorSlug) => {
    if (!calc) return '/calculators';
    return `/calculators/${calc}`;
  },
  guides: () => '/guides',
  guideDetail: (slug: string) => `/guides/${slug}`,
  news: () => '/news',
  newsDetail: (slug: string) => `/news/${slug}`,
  compare: (country?: CountryCode, cardIds?: string[]) => {
    let url = country ? `/compare/${country}` : '/compare';
    if (cardIds && cardIds.length > 0) {
      url += `?cards=${cardIds.join(',')}`;
    }
    return url;
  },
  countries: (code?: CountryCode) => {
    if (!code) return '/countries';
    return `/countries/${code}`;
  },
  resources: (sub?: ResourcesSubRoute) => {
    if (!sub || sub === 'overview') return '/resources';
    return `/resources/${sub}`;
  },
  about: () => '/about',
};

// Update Document Meta for SEO
export function updateDocumentSeo(state: RouteState): void {
  const countryName = COUNTRIES_DATA[state.country]?.name || 'Global';
  let title = 'CardInsight Online — International Credit Card & Financial Intelligence';
  let description = 'Compare credit cards, understand APR & credit scores, calculate debt payoff and learn consumer rights across US, UK, Canada, Australia and New Zealand.';

  if (state.tab === 'home') {
    title = 'CardInsight Online — International Credit Card Intelligence, Rates & Scores';
    description = 'Authoritative credit card directory, APR and balance transfer calculators, FICO and credit score guides, and statutory rights across 5 sovereign jurisdictions.';
  } else if (state.tab === 'cards') {
    if (state.activeCard) {
      title = `${state.activeCard.name} Review & Schumer Box (${countryName}) | CardInsight Online`;
      description = `Complete financial review for ${state.activeCard.name} by ${state.activeCard.issuer}. Regular APR ${state.activeCard.regularApr.rateDisplay}, Annual fee $${state.activeCard.annualFee}, rewards structure, perks, pros & cons.`;
    } else if (state.category && state.category !== 'all') {
      const catMeta = CATEGORIES_DATA.find((c) => c.id === state.category);
      const catName = catMeta ? catMeta.name : state.category;
      title = `Best ${catName} Credit Cards in ${countryName} (2026) | CardInsight Online`;
      description = `Compare verified ${catName} credit cards in ${countryName}. Filter by APR, annual fee, rewards multipliers, and introductory balance transfer promotions.`;
    } else {
      title = `Credit Cards in ${countryName} — Compare Rates, Fees & Rewards | CardInsight Online`;
      description = `Explore all verified credit cards available in ${countryName}. Objective Schumer box data, introductory rates, rewards comparison, and issuer disclosures.`;
    }
  } else if (state.tab === 'credit-score') {
    if (state.creditScoreSubRoute && state.creditScoreSubRoute !== 'overview') {
      const subLabels: Record<CreditScoreSubRoute, string> = {
        overview: 'Overview',
        us: 'United States FICO & VantageScore System',
        uk: 'United Kingdom Experian, Equifax & TransUnion Guide',
        ca: 'Canada Equifax & TransUnion Score System',
        au: 'Australia Comprehensive Credit Reporting (CCR) Guide',
        nz: 'New Zealand Centrix & Equifax Credit System',
        factors: '5 Core Credit Scoring Factors & Math Formulas',
        simulator: 'Interactive Credit Score Simulator & Strategy Roadmap',
      };
      title = `${subLabels[state.creditScoreSubRoute]} | CardInsight Online`;
      description = `In-depth educational breakdown of credit scores in ${countryName}. Calculation formulas, bureau dispute rights, score ranges, and actionable credit building steps.`;
    } else {
      title = 'Credit Scores Explained — FICO, VantageScore & International Bureaus | CardInsight Online';
      description = 'Understand how credit scores work worldwide. 5 core factors, free legal statutory reports, dispute rights with CFPB, FCA, FCAC, ASIC, and score simulator.';
    }
  } else if (state.tab === 'calculators') {
    const calcLabels: Record<CalculatorSlug, string> = {
      payoff: 'Debt Payoff & Compound Interest Calculator',
      'balance-transfer': '0% Balance Transfer Net Savings Calculator',
      rewards: 'Credit Card Rewards & Cash Back Estimator',
      'intro-plan': '0% Intro APR Payoff & Purchase Planner',
      utilization: 'Credit Card Utilization Impact Gauge',
      'foreign-fee': 'Foreign Currency Transaction Fee Calculator',
    };
    if (state.calculatorSlug) {
      title = `${calcLabels[state.calculatorSlug]} | CardInsight Online`;
      description = `Use our free, mathematically verified ${calcLabels[state.calculatorSlug].toLowerCase()} to make optimized financial decisions for your cards in ${countryName}.`;
    } else {
      title = 'Credit & Debt Financial Calculators Suite | CardInsight Online';
      description = 'Free interactive calculators for credit card payoff, balance transfers, rewards estimation, utilization impact, and foreign transaction fees.';
    }
  } else if (state.tab === 'guides') {
    if (state.activeGuide) {
      title = `${state.activeGuide.title} | CardInsight Online`;
      description = state.activeGuide.summary;
    } else {
      title = 'Financial Guides & Credit Literacy Articles | CardInsight Online';
      description = 'Rigorous, non-commercial financial education on APR math, balance transfers, debt snowball vs avalanche, and consumer credit protection laws.';
    }
  } else if (state.tab === 'news') {
    if (state.activeNews) {
      title = `${state.activeNews.title} | CardInsight Online`;
      description = state.activeNews.snippet;
    } else {
      title = 'Credit Card News, APR Trends & Central Bank Rates | CardInsight Online';
      description = 'Track new credit card launches, reward program refreshes, regulatory fee rulings from CFPB/FCA, and interest rate benchmark changes.';
    }
  } else if (state.tab === 'compare') {
    title = `Compare Credit Cards Side-by-Side (${countryName}) | CardInsight Online`;
    description = 'Side-by-side comparison matrix of credit cards: annual fees, regular APR, 0% intro offers, balance transfer terms, foreign fees, and rewards.';
  } else if (state.tab === 'countries') {
    title = `International Financial Regulatory Frameworks (${countryName}) | CardInsight Online`;
    description = 'Explore statutory financial regulators, consumer rights legislation, and credit card market characteristics across the US, UK, Canada, Australia, and New Zealand.';
  } else if (state.tab === 'resources') {
    title = 'Financial Glossary, Statutory Regulators & Free Helplines | CardInsight Online';
    description = 'Access verified directory of government financial regulators (CFPB, FCA, FCAC, ASIC), free non-profit debt counseling, and an A-Z financial glossary.';
  } else if (state.tab === 'about') {
    title = 'About CardInsight Online — Editorial Standards & Methodology';
    description = 'Learn about CardInsight Online (cardinsight.online), our strict independence standards, data verification methodology, and transparent advertising policies.';
  } else if (state.tab === 'terms') {
    title = 'Términos y Condiciones de Uso | CardInsight Online';
    description = 'Términos legales, exención de responsabilidad no financiera y condiciones de uso de la plataforma CardInsight Online (cardinsight.online).';
  } else if (state.tab === 'privacy-policy') {
    title = 'Política de Privacidad y Protección de Datos | CardInsight Online';
    description = 'Gobernanza de datos, cumplimiento CCPA/GDPR y privacidad en CardInsight Online.';
  } else if (state.tab === 'cookie-policy') {
    title = 'Política de Cookies y Preferencias | CardInsight Online';
    description = 'Políticas de tecnologías de almacenamiento local y cookies en CardInsight Online.';
  }

  // Apply Document Head updates
  document.title = title;
  
  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Open Graph Title, Description, Site Name
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', description);

  let ogSiteName = document.querySelector('meta[property="og:site_name"]');
  if (!ogSiteName) {
    ogSiteName = document.createElement('meta');
    ogSiteName.setAttribute('property', 'og:site_name');
    document.head.appendChild(ogSiteName);
  }
  ogSiteName.setAttribute('content', 'CardInsight Online');

  // Canonical Link: strictly canonical cardinsight.online
  const canonicalBase = 'https://cardinsight.online';
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `${canonicalBase}${state.path}`);

  // Structured Data Schema.org (WebSite + Organization)
  let schemaScript = document.querySelector('#schema-cardinsight-jsonld') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'schema-cardinsight-jsonld';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://cardinsight.online/#organization',
        'name': 'CardInsight Online',
        'url': 'https://cardinsight.online',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://cardinsight.online/favicon.svg',
          'width': 512,
          'height': 512
        },
        'description': 'Independent credit card information platform and financial intelligence hub across the US, UK, Canada, Australia, and New Zealand.'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://cardinsight.online/#website',
        'url': 'https://cardinsight.online',
        'name': 'CardInsight Online',
        'publisher': {
          '@id': 'https://cardinsight.online/#organization'
        }
      }
    ]
  };
  schemaScript.textContent = JSON.stringify(structuredData);
}
