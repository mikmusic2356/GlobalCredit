import { CmsCategory, ArticleCategory } from '../../types/cms';

export const DEFAULT_CMS_CATEGORIES: ArticleCategory[] = [
  {
    id: 'cat-credit-education',
    name: 'Credit Building & Education',
    slug: 'credit-building-education',
    description: 'Foundational articles on credit scores, APR compounding mechanics, and debt management.',
    subcategories: [
      { id: 'sub-apr', name: 'APR Fundamentals', slug: 'apr-fundamentals', description: 'Schumer boxes, variable APR calculations and daily compounding.' },
      { id: 'sub-scores', name: 'Credit Score Math', slug: 'credit-score-math', description: 'FICO vs VantageScore scoring algorithms and payment history.' },
      { id: 'sub-building', name: 'Credit Building Roadmaps', slug: 'credit-building-roadmaps', description: 'Secured card ladders and thin-file optimization.' },
    ],
  },
  {
    id: 'cat-cards-rewards',
    name: 'Cards & Rewards Optimization',
    slug: 'cards-rewards-optimization',
    description: 'Detailed analysis of cash back tiers, travel points valuation, and 0% intro balance transfer rules.',
    subcategories: [
      { id: 'sub-cashback', name: 'Cash Back Strategies', slug: 'cash-back-strategies', description: 'Flat-rate vs rotating quarterly bonus categories.' },
      { id: 'sub-travel', name: 'Travel & Airline Points', slug: 'travel-airline-points', description: 'Point transfer partners, lounges, and travel insurance protections.' },
      { id: 'sub-transfers', name: '0% Balance Transfers', slug: 'zero-balance-transfers', description: 'Transfer fees, payback schedules, and grace period traps.' },
    ],
  },
  {
    id: 'cat-news-regulations',
    name: 'Regulatory Updates & News',
    slug: 'regulatory-updates-news',
    description: 'Time-sensitive central bank decisions, CFPB/FCA rulings, and card program refreshes.',
    subcategories: [
      { id: 'sub-launches', name: 'New Card Launches', slug: 'new-card-launches', description: 'Newly unveiled credit cards and welcome offer terms.' },
      { id: 'sub-regulations', name: 'Statutory Protections', slug: 'statutory-protections', description: 'Credit CARD Act, Section 75 UK, and consumer caps.' },
      { id: 'sub-rates', name: 'Central Bank Rates', slug: 'central-bank-rates', description: 'Prime rate adjustments and market benchmark impacts.' },
    ],
  },
];

export const INITIAL_CMS_CATEGORIES: CmsCategory[] = [
  {
    id: 'financial-guides',
    name: 'Financial Guides & Educational Articles',
    type: 'financial-guides',
    description: 'Evergreen, authoritative educational content on credit mechanisms, consumer rights, interest calculations, and debt payoff strategies.',
    subcategories: [
      'Credit Cards',
      'APR & Interest',
      'Credit Scores',
      'Rewards',
      'Cash Back',
      'Travel',
      'Balance Transfers',
      'Fees',
      'Credit Building',
      'Personal Finance',
      'Consumer Rights'
    ],
    articleCount: 12
  },
  {
    id: 'news-trends',
    name: 'Credit Card News & Trends',
    type: 'news-trends',
    description: 'Time-sensitive market reports, official issuer announcements, central bank policy adjustments, and seasonal payment trends.',
    subcategories: [
      'New Cards',
      'Rewards Changes',
      'Benefits Changes',
      'Fees & APR Changes',
      'Regulations',
      'Industry News',
      'Seasonal Trends',
      'Market Trends',
      'Central Bank Rates'
    ],
    articleCount: 8
  }
];
