import { CmsArticle, AdPlacementConfig, CookieConsentState, CookieCategoryConfig } from '../../types/cms';
import { BATCH_1_ARTICLES } from './batch1Articles';
import { BATCH_2_ARTICLES } from './batch2Articles';
import { BATCH_3_ARTICLES } from './batch3Articles';
import { BATCH_4_ARTICLES } from './batch4Articles';
import { BATCH_5_ARTICLES } from './batch5Articles';

export const INITIAL_CMS_ARTICLES: CmsArticle[] = [
  {
    id: 'art-guide-1',
    slug: 'how-credit-card-apr-works',
    title: '💳 How Does Credit Card APR Work? Complete Interest Calculation Guide',
    subtitle: 'Understand how annual percentage rates compound daily, how grace periods prevent interest charges, and how to minimize borrowing costs.',
    country: 'us',
    type: 'financial-guide',
    category: 'Financial Guides & Educational Articles',
    subcategory: 'APR & Interest',
    author: {
      name: 'Elena Rostova, CFA',
      role: 'Senior Credit Market Analyst',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Chartered Financial Analyst specializing in retail credit mechanisms and consumer protection standards.'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Financial calculator and balance statement showing compounding interest calculation',
      caption: 'Credit card APR compounds daily based on average daily balance formulas across statement cycles.',
      credit: 'Financial Education Bureau'
    },
    blocks: [
      {
        id: 'b-1',
        type: 'paragraph',
        content: 'Annual Percentage Rate (APR) represents the annualized cost of borrowing money on a credit card. While quoted as an annual figure, credit card issuers calculate interest on a daily basis using your Daily Periodic Rate (DPR).'
      },
      {
        id: 'b-2',
        type: 'heading',
        level: 2,
        content: 'The Daily Periodic Rate (DPR) Formula'
      },
      {
        id: 'b-3',
        type: 'paragraph',
        content: 'To find your daily interest rate, your card issuer divides your APR by 365 (or 360 in some legacy bank calculations). For example, an APR of 24.99% corresponds to a DPR of approximately 0.06846% per day.'
      },
      {
        id: 'b-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Contactless chip card terminal illustrating transaction processing cycles',
        caption: 'Each transaction posted during your billing cycle is factored into the Average Daily Balance.',
        source: 'Global Payments Archive',
        sourceUrl: 'https://consumerfinance.gov',
        credit: 'Staff Photographer'
      },
      {
        id: 'b-5',
        type: 'heading',
        level: 2,
        content: 'The Power of the Interest-Free Grace Period'
      },
      {
        id: 'b-6',
        type: 'paragraph',
        content: 'Under federal Truth in Lending regulations (Regulation Z), if you pay your statement balance in full on or before the due date each month, issuers provide a grace period of at least 21 days where no interest is charged on new purchases.'
      },
      {
        id: 'b-7',
        type: 'callout',
        variant: 'tip',
        title: 'Zero Interest Rule',
        content: 'Paying your statement balance in full every 30 days reduces your effective APR to exactly 0.00%, allowing you to earn cash back and rewards entirely free of financing charges.'
      },
      {
        id: 'b-8',
        type: 'heading',
        level: 2,
        content: 'Fixed vs. Variable APR Indexes'
      },
      {
        id: 'b-9',
        type: 'paragraph',
        content: 'Over 95% of consumer credit cards feature a variable APR tied to the U.S. Prime Rate (which tracks the Federal Reserve Federal Funds rate). When the Federal Reserve raises benchmark rates by 25 basis points, cardholder APRs increase by the exact same amount.'
      },
      {
        id: 'b-10',
        type: 'table',
        headers: ['Credit Tier', 'Typical APR Range', 'Grace Period Standard'],
        rows: [
          ['Excellent (750+)', '16.99% – 21.99%', '21 to 25 Days'],
          ['Good (670–749)', '21.99% – 26.99%', '21 to 25 Days'],
          ['Fair / Rebuilding', '27.99% – 32.99%', '21 Days (Strict)']
        ],
        caption: 'Representative APR brackets across major national issuing banks.'
      }
    ],
    tags: ['APR', 'Interest Rates', 'Grace Period', 'Daily Periodic Rate', 'Financial Education'],
    status: 'PUBLISHED',
    publishedDate: '2026-08-10',
    lastUpdatedDate: '2026-09-01',
    lastVerifiedDate: '2026-09-01',
    verificationStatus: 'VERIFIED',
    sources: [
      {
        id: 's-1',
        name: 'Consumer Financial Protection Bureau (CFPB) – Truth in Lending (Regulation Z)',
        url: 'https://www.consumerfinance.gov/rules-policy/regulations/1026/',
        type: 'Regulator',
        publicationDate: '2026-01-15',
        lastVerifiedDate: '2026-09-01'
      },
      {
        id: 's-2',
        name: 'Federal Reserve Board – Consumer Credit G.19 Statistical Release',
        url: 'https://www.federalreserve.gov/releases/g19/',
        type: 'Official Government',
        publicationDate: '2026-08-01',
        lastVerifiedDate: '2026-09-01'
      }
    ],
    seo: {
      title: 'How Credit Card APR Works: Interest Calculation Guide (2026)',
      metaDescription: 'Learn how credit card APR works, how daily interest compounds on revolving balances, and how to utilize the 21-day grace period to pay zero interest.',
      canonicalUrl: 'https://globalcredit.info/us/guides/how-credit-card-apr-works/',
      primaryKeyword: 'how credit card APR works',
      secondaryKeywords: ['credit card interest calculation', 'daily periodic rate', 'grace period credit card'],
      ogTitle: 'How Credit Card APR Works: Full Calculation & Grace Period Guide',
      ogDescription: 'Authoritative financial breakdown of APR calculations, DPR formulas, and interest-avoidance strategies.',
      ogImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
    },
    manualRelatedArticleIds: ['art-guide-2', 'art-guide-3', 'art-news-1'],
    viewCount: 14200,
    readingTimeMinutes: 7
  },
  {
    id: 'art-guide-2',
    slug: 'what-is-credit-utilization-ratio',
    title: '📊 What Is Credit Utilization and How to Optimize It for Maximum Score',
    subtitle: 'Credit utilization accounts for 30% of your FICO score. Discover the under-10% threshold and statement date timing hacks.',
    country: 'us',
    type: 'financial-guide',
    category: 'Financial Guides & Educational Articles',
    subcategory: 'Credit Scores',
    author: {
      name: 'Marcus Vance',
      role: 'Credit Bureau & Scoring Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Former credit risk officer and credit repair compliance specialist.'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Credit score range charts and utilization analytics metrics display',
      caption: 'FICO and VantageScore models allocate 30% of their total scoring weight to credit utilization ratios.',
      credit: 'Global Bureau Metrics'
    },
    blocks: [
      {
        id: 'b-201',
        type: 'paragraph',
        content: 'Your credit utilization ratio is the percentage of your total revolving credit limit currently in use. It is calculated both on an individual card basis and across all open revolving accounts collectively.'
      },
      {
        id: 'b-202',
        type: 'heading',
        level: 2,
        content: 'Why Statement Closing Dates Matter More Than Due Dates'
      },
      {
        id: 'b-203',
        type: 'paragraph',
        content: 'Issuers report your balance to the three major bureaus (Experian, Equifax, and TransUnion) on your statement closing date, NOT your payment due date. If you pay off your card before the statement closes, your reported utilization will be 0%.'
      },
      {
        id: 'b-204',
        type: 'callout',
        variant: 'info',
        title: 'The AZEO Method (All Zero Except One)',
        content: 'Scoring algorithms award the highest score boost when all credit cards report a $0 balance except one card showing a minimal 1% to 3% utilization balance.'
      }
    ],
    tags: ['Credit Score', 'Credit Utilization', 'FICO', 'Credit Building'],
    status: 'PUBLISHED',
    publishedDate: '2026-08-14',
    lastUpdatedDate: '2026-09-01',
    lastVerifiedDate: '2026-09-01',
    verificationStatus: 'VERIFIED',
    sources: [
      {
        id: 's-201',
        name: 'Fair Isaac Corporation (FICO) Scoring Criteria Technical Paper',
        url: 'https://www.myfico.com/credit-education/whats-in-your-credit-score',
        type: 'Research Organization',
        publicationDate: '2026-01-10',
        lastVerifiedDate: '2026-09-01'
      }
    ],
    seo: {
      title: 'What Is Credit Utilization? The 10% Ratio Rule Explained (2026)',
      metaDescription: 'Discover how credit utilization impacts 30% of your credit score, how statement reporting dates work, and the exact AZEO strategy to maximize points.',
      canonicalUrl: 'https://globalcredit.info/us/guides/what-is-credit-utilization-ratio/',
      primaryKeyword: 'credit utilization ratio',
      secondaryKeywords: ['how to lower credit utilization', 'credit score factors', 'statement closing date balance'],
      ogTitle: 'What Is Credit Utilization Ratio? Complete Optimization Guide',
      ogDescription: 'Step-by-step scoring guide for optimizing revolving credit ratios and statement date reporting.',
      ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    },
    manualRelatedArticleIds: ['art-guide-1', 'art-guide-3'],
    viewCount: 11800,
    readingTimeMinutes: 6
  },
  {
    id: 'art-guide-3',
    slug: 'how-balance-transfers-work',
    title: '🔄 How 0% Intro APR Balance Transfers Work & Traps to Avoid',
    subtitle: 'Consolidate high-interest credit card debt into 0% interest terms for up to 21 months without damaging your credit profile.',
    country: 'us',
    type: 'financial-guide',
    category: 'Financial Guides & Educational Articles',
    subcategory: 'Balance Transfers',
    author: {
      name: 'Elena Rostova, CFA',
      role: 'Senior Credit Market Analyst',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Chartered Financial Analyst specializing in retail credit mechanisms and consumer protection standards.'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Savings and debt consolidation concept with financial planning ledger',
      caption: '0% Intro APR balance transfers stop compounding interest during the promotional relief window.',
      credit: 'Consumer Credit Studies'
    },
    blocks: [
      {
        id: 'b-301',
        type: 'paragraph',
        content: 'A balance transfer allows you to move high-interest debt from one credit card to a new or existing card that offers a 0% introductory APR promotional period (typically lasting between 12 to 21 months).'
      },
      {
        id: 'b-302',
        type: 'heading',
        level: 2,
        content: 'Understanding the Balance Transfer Fee'
      },
      {
        id: 'b-303',
        type: 'paragraph',
        content: 'Most 0% intro balance transfer cards charge an upfront fee between 3% and 5% of the transferred amount. For example, transferring $10,000 at a 3% fee adds an immediate $300 to your starting balance.'
      },
      {
        id: 'b-304',
        type: 'callout',
        variant: 'warning',
        title: 'The Retroactive APR Warning',
        content: 'If you fail to make minimum monthly payments on time, issuers reserve the statutory right to cancel the 0% promotion and revert to standard penalty APR rates immediately.'
      }
    ],
    tags: ['Balance Transfer', 'Debt Consolidation', '0% APR', 'Fee Calculations'],
    status: 'PUBLISHED',
    publishedDate: '2026-08-18',
    lastUpdatedDate: '2026-09-01',
    lastVerifiedDate: '2026-09-01',
    verificationStatus: 'VERIFIED',
    sources: [
      {
        id: 's-301',
        name: 'CFPB Supervisory Highlights on Credit Card Fee Practices',
        url: 'https://www.consumerfinance.gov/data-research/research-reports/',
        type: 'Regulator',
        publicationDate: '2026-03-01',
        lastVerifiedDate: '2026-09-01'
      }
    ],
    seo: {
      title: 'How Balance Transfers Work: 0% APR Rules & Hidden Fees (2026)',
      metaDescription: 'Complete guide on how 0% balance transfers work, how to calculate the transfer fee breakeven point, and how to pay off debt interest-free.',
      canonicalUrl: 'https://globalcredit.info/us/guides/how-balance-transfers-work/',
      primaryKeyword: 'how balance transfers work',
      secondaryKeywords: ['0% APR balance transfer', 'balance transfer fee calculation', 'credit card debt consolidation'],
      ogTitle: 'How 0% Intro APR Balance Transfers Work & Traps to Avoid',
      ogDescription: 'In-depth financial review of balance transfers, transfer fees, and repayment schedules.',
      ogImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80'
    },
    manualRelatedArticleIds: ['art-guide-1', 'art-guide-2'],
    viewCount: 9450,
    readingTimeMinutes: 5
  },
  {
    id: 'art-news-1',
    slug: 'central-banks-rate-decisions-credit-card-apr-impact',
    title: '🏦 Central Banks Update Interest Rate Policy: What It Means for Your Card APR',
    subtitle: 'Recent monetary policy shifts across the US Federal Reserve, Bank of England, and Bank of Canada affect variable credit card APRs within 1 to 2 billing cycles.',
    country: 'us',
    type: 'news',
    category: 'Credit Card News & Trends',
    subcategory: 'Central Bank Rates',
    author: {
      name: 'Elena Rostova, CFA',
      role: 'Senior Credit Market Analyst',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Chartered Financial Analyst specializing in retail credit mechanisms and consumer protection standards.'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Bank architecture pillar facade representing monetary policy and statutory lending benchmarks',
      caption: 'Central bank benchmark rates directly shift variable credit card APR indexes and prime rates.',
      credit: 'Regulatory News Wire'
    },
    blocks: [
      {
        id: 'nb-1',
        type: 'paragraph',
        content: 'As central banks review their monetary policy stances, credit card holders carrying a revolving balance will experience direct adjustments to their variable Annual Percentage Rates.'
      },
      {
        id: 'nb-2',
        type: 'heading',
        level: 2,
        content: 'Timeline for Issuer Rate Updates'
      },
      {
        id: 'nb-3',
        type: 'paragraph',
        content: 'Under standard cardholder agreements, issuing banks recalculate variable APRs based on the Wall Street Journal Prime Rate published on the first business day of the month or quarter.'
      },
      {
        id: 'nb-4',
        type: 'callout',
        variant: 'info',
        title: 'Actionable Consumer Step',
        content: 'Cardholders with existing debt should explore fixed-rate personal consolidation loans or 0% balance transfer cards to insulate themselves from variable rate fluctuations.'
      }
    ],
    tags: ['Interest Rates', 'Federal Reserve', 'Central Bank', 'Prime Rate', 'News'],
    status: 'PUBLISHED',
    publishedDate: '2026-08-28',
    lastUpdatedDate: '2026-09-01',
    lastVerifiedDate: '2026-09-01',
    eventDate: '2026-08-25',
    verificationStatus: 'VERIFIED',
    sources: [
      {
        id: 'ns-1',
        name: 'Federal Open Market Committee (FOMC) Official Statement',
        url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
        type: 'Official Government',
        publicationDate: '2026-08-25',
        lastVerifiedDate: '2026-09-01'
      }
    ],
    seo: {
      title: 'Central Bank Rate Decisions & Credit Card APR Impact (2026)',
      metaDescription: 'Analysis of recent central bank rate updates and how Prime Rate adjustments flow into consumer credit card variable interest rates.',
      canonicalUrl: 'https://globalcredit.info/us/news/central-banks-rate-decisions-credit-card-apr-impact/',
      primaryKeyword: 'credit card interest rate changes',
      secondaryKeywords: ['prime rate credit card APR', 'federal reserve card interest'],
      ogTitle: 'Central Bank Rate Decisions: Impact on Card APRs',
      ogDescription: 'Comprehensive financial news analysis on central bank interest rate developments.',
      ogImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80'
    },
    manualRelatedArticleIds: ['art-guide-1', 'art-news-2'],
    viewCount: 8200,
    readingTimeMinutes: 4
  },
  {
    id: 'art-news-2',
    slug: 'holiday-shopping-credit-card-rewards-promotions',
    title: '🛍️ Seasonal Shopping Trends: Maximize Q4 Credit Card Cash Back & Protection',
    subtitle: 'From 5% rotating merchant bonus categories to extended warranty purchase protections, here is how consumers maximize seasonal card utility.',
    country: 'us',
    type: 'trend',
    category: 'Credit Card News & Trends',
    subcategory: 'Seasonal Trends',
    author: {
      name: 'Marcus Vance',
      role: 'Credit Bureau & Scoring Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Former credit risk officer and credit repair compliance specialist.'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Close-up of a contactless credit card chip terminal with payment processing',
      caption: 'Modern EMV chip and NFC payments provide dynamic encryption for consumer card transactions.',
      credit: 'Unsplash Finance Archive'
    },
    blocks: [
      {
        id: 'nb-201',
        type: 'paragraph',
        content: 'As fourth-quarter retail events approach, major card issuers activate seasonal 5% rotating categories covering online wholesale clubs, department stores, and digital payment platforms.'
      },
      {
        id: 'nb-202',
        type: 'heading',
        level: 2,
        content: 'Overlooked Benefits: Purchase Protection & Return Guarantees'
      },
      {
        id: 'nb-203',
        type: 'paragraph',
        content: 'Beyond cash back rewards, premium cards provide secondary insurance covering damage or theft up to 90 days from purchase, as well as extended manufacturer warranty extensions of up to one additional year.'
      }
    ],
    tags: ['Seasonal Shopping', 'Cash Back', 'Purchase Protection', 'Holiday Shopping', 'Trends'],
    status: 'PUBLISHED',
    publishedDate: '2026-08-22',
    lastUpdatedDate: '2026-09-01',
    lastVerifiedDate: '2026-09-01',
    eventDate: '2026-08-20',
    verificationStatus: 'VERIFIED',
    sources: [
      {
        id: 'ns-201',
        name: 'National Retail Federation (NRF) Consumer Spending Insights',
        url: 'https://nrf.com/research-insights',
        type: 'Research Organization',
        publicationDate: '2026-08-15',
        lastVerifiedDate: '2026-09-01'
      }
    ],
    seo: {
      title: 'Holiday Shopping Card Strategies: 5% Cash Back & Purchase Protection',
      metaDescription: 'Guide to Q4 credit card promotions, 5% bonus activation, and purchase security protections for seasonal consumer purchases.',
      canonicalUrl: 'https://globalcredit.info/us/news/holiday-shopping-credit-card-rewards-promotions/',
      primaryKeyword: 'holiday credit card cash back',
      secondaryKeywords: ['purchase protection credit card', '5% cash back rotating categories'],
      ogTitle: 'Seasonal Shopping Credit Card Strategies',
      ogDescription: 'How to maximize card benefits and protections during retail shopping periods.',
      ogImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80'
    },
    manualRelatedArticleIds: ['art-guide-1', 'art-news-1'],
    viewCount: 6100,
    readingTimeMinutes: 4
  },
  {
    id: 'art-draft-1',
    slug: 'credit-building-for-beginners-secured-vs-unsecured',
    title: '🌱 Credit Building for Beginners: Secured vs. Unsecured Starter Cards',
    subtitle: 'A foundational roadmap for young adults, students, and new residents establishing their credit history from scratch.',
    country: 'us',
    type: 'educational',
    category: 'Financial Guides & Educational Articles',
    subcategory: 'Credit Building',
    author: {
      name: 'Marcus Vance',
      role: 'Credit Bureau & Scoring Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Former credit risk officer and credit repair compliance specialist.'
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Credit card held in hand demonstrating starter credit card setup',
      caption: 'Secured credit cards require a refundable security deposit that serves as the cardholder credit limit.',
      credit: 'GlobalCredit Team'
    },
    blocks: [
      {
        id: 'db-1',
        type: 'paragraph',
        content: 'Starting a credit profile without previous credit history can feel like a catch-22: you need credit to qualify for a card, but you need a card to build credit. Secured cards solve this puzzle by using a refundable cash deposit as collateral.'
      },
      {
        id: 'db-2',
        type: 'heading',
        level: 2,
        content: 'Secured Card Graduations'
      },
      {
        id: 'db-3',
        type: 'paragraph',
        content: 'Top-tier issuing banks conduct automatic monthly or semi-annual account reviews. After 6 to 12 months of consecutive on-time payments, the bank refunds the security deposit and upgrades the card to an unsecured line of credit.'
      }
    ],
    tags: ['Credit Building', 'Secured Cards', 'Students', 'Credit History', 'Draft'],
    status: 'DRAFT',
    publishedDate: '2026-09-01',
    lastUpdatedDate: '2026-09-01',
    lastVerifiedDate: '2026-09-01',
    verificationStatus: 'VERIFIED',
    sources: [
      {
        id: 'ds-1',
        name: 'CFPB Consumer Guide to Secured Credit Cards',
        url: 'https://www.consumerfinance.gov/consumer-tools/credit-cards/',
        type: 'Regulator',
        publicationDate: '2026-02-01',
        lastVerifiedDate: '2026-09-01'
      }
    ],
    seo: {
      title: 'Credit Building for Beginners: Secured vs Unsecured Cards',
      metaDescription: 'Learn how to build credit from zero using secured cards, how deposit graduation works, and steps to reach a 700+ score in 12 months.',
      canonicalUrl: 'https://globalcredit.info/us/guides/credit-building-for-beginners-secured-vs-unsecured/',
      primaryKeyword: 'how to build credit for beginners',
      secondaryKeywords: ['secured vs unsecured card', 'starter credit cards'],
      ogTitle: 'Credit Building for Beginners: Starter Cards Guide',
      ogDescription: 'Step-by-step roadmap for building credit with starter cards and deposits.',
      ogImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80'
    },
    manualRelatedArticleIds: ['art-guide-2'],
    viewCount: 120,
    readingTimeMinutes: 5
  },
  ...BATCH_1_ARTICLES,
  ...BATCH_2_ARTICLES,
  ...BATCH_3_ARTICLES,
  ...BATCH_4_ARTICLES,
  ...BATCH_5_ARTICLES
];

export const DEFAULT_AD_PLACEMENT_CONFIG: AdPlacementConfig = {
  adSlotTop: true,
  adSlotAfterIntro: true,
  adSlotInContent: true,
  adSlotMidArticle: true,
  adSlotBeforeSources: true,
  adSlotBottom: true,
  adSlotSidebar: true,
  globalClientCode: 'ca-pub-9876543210123456',
  testMode: true,
  showLabels: true
};

export const DEFAULT_COOKIE_CATEGORIES: CookieCategoryConfig[] = [
  {
    id: 'necessary',
    name: 'Strictly Necessary Cookies',
    description: 'Essential for the website to function, navigate secure pages, and maintain session security. These cannot be disabled.',
    required: true,
    enabled: true,
    cookies: [
      {
        name: 'gc_session_id',
        provider: 'GlobalCredit Platform',
        purpose: 'Maintains user UI states and chosen country preferences.',
        expiry: 'Session / 1 year'
      },
      {
        name: 'gc_cookie_consent',
        provider: 'GlobalCredit Platform',
        purpose: 'Stores user consent preferences for compliance auditing.',
        expiry: '12 months'
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Performance & Analytics',
    description: 'Helps us measure site traffic, understand popular financial guides, and improve tool responsiveness anonymously.',
    required: false,
    enabled: false,
    cookies: [
      {
        name: '_ga, _ga_*',
        provider: 'Google Analytics (Anonymized IP)',
        purpose: 'Aggregates anonymous user interaction statistics without personal identification.',
        expiry: '24 months'
      }
    ]
  },
  {
    id: 'advertising',
    name: 'Contextual Advertising & Partners',
    description: 'Enables compliant Google AdSense display advertisements supporting free access to financial education tools.',
    required: false,
    enabled: false,
    cookies: [
      {
        name: '__gads, __gpi',
        provider: 'Google AdSense / DoubleClick',
        purpose: 'Delivers non-personalized or personalized advertising according to regional regulatory guidelines.',
        expiry: '13 months'
      }
    ]
  },
  {
    id: 'preferences',
    name: 'Functional Preferences',
    description: 'Remembers comparison matrix cards, calculator default currency, and interactive filter preferences across sessions.',
    required: false,
    enabled: false,
    cookies: [
      {
        name: 'gc_compare_tray',
        provider: 'GlobalCredit Platform',
        purpose: 'Persists user-selected card comparison matrix items.',
        expiry: '6 months'
      }
    ]
  }
];

export const DEFAULT_COOKIE_CONSENT: CookieConsentState = {
  hasConsented: false,
  categories: {
    necessary: true,
    analytics: false,
    advertising: false,
    preferences: false
  },
  timestamp: new Date().toISOString()
};

// Storage keys
const ARTICLES_STORAGE_KEY = 'globalcredit_cms_articles_v1';
const ADS_CONFIG_STORAGE_KEY = 'globalcredit_cms_ads_config_v1';
const COOKIE_CONSENT_STORAGE_KEY = 'globalcredit_cookie_consent_v1';

export class ArticleStoreService {
  private static articles: CmsArticle[] = [];
  private static adsConfig: AdPlacementConfig = DEFAULT_AD_PLACEMENT_CONFIG;
  private static cookieConsent: CookieConsentState = DEFAULT_COOKIE_CONSENT;
  private static isInitialized = false;

  public static init() {
    if (this.isInitialized) return;

    // Load articles from localStorage or fallback
    try {
      const storedArticles = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (storedArticles) {
        this.articles = JSON.parse(storedArticles);
      } else {
        this.articles = [...INITIAL_CMS_ARTICLES];
        this.saveArticles();
      }
    } catch {
      this.articles = [...INITIAL_CMS_ARTICLES];
    }

    // Attempt background sync with Turso Database API
    if (typeof window !== 'undefined' && window.fetch) {
      fetch('/api/articles')
        .then((res) => (res.ok ? res.json() : null))
        .then((dbArticles) => {
          if (dbArticles && Array.isArray(dbArticles) && dbArticles.length > 0) {
            this.articles = dbArticles;
            this.saveArticles();
          }
        })
        .catch(() => {
          // Keep resilient local data if offline or error
        });
    }

    // Load ads config
    try {
      const storedAds = localStorage.getItem(ADS_CONFIG_STORAGE_KEY);
      if (storedAds) {
        this.adsConfig = { ...DEFAULT_AD_PLACEMENT_CONFIG, ...JSON.parse(storedAds) };
      } else {
        this.adsConfig = { ...DEFAULT_AD_PLACEMENT_CONFIG };
      }
    } catch {
      this.adsConfig = { ...DEFAULT_AD_PLACEMENT_CONFIG };
    }

    // Load cookie consent
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (storedConsent) {
        const parsed = JSON.parse(storedConsent);
        this.cookieConsent = {
          hasConsented: Boolean(parsed?.hasConsented),
          categories: {
            ...DEFAULT_COOKIE_CONSENT.categories,
            ...(parsed?.categories || {}),
          },
          timestamp: parsed?.timestamp || new Date().toISOString(),
        };
      } else {
        this.cookieConsent = { ...DEFAULT_COOKIE_CONSENT };
      }
    } catch {
      this.cookieConsent = { ...DEFAULT_COOKIE_CONSENT };
    }

    this.isInitialized = true;
  }

  // Articles CRUD
  public static getAllArticles(): CmsArticle[] {
    this.init();
    return [...this.articles];
  }

  public static getArticleById(id: string): CmsArticle | null {
    this.init();
    return this.articles.find((a) => a.id === id) || null;
  }

  public static getArticleBySlug(slug: string): CmsArticle | null {
    this.init();
    const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
    return this.articles.find((a) => a.slug.toLowerCase() === clean) || null;
  }

  public static getPublishedArticles(): CmsArticle[] {
    this.init();
    return this.articles.filter((a) => (a.status || '').toLowerCase() === 'published');
  }

  public static saveArticle(article: CmsArticle): CmsArticle {
    this.init();
    const existingIndex = this.articles.findIndex((a) => a.id === article.id);
    if (existingIndex >= 0) {
      this.articles[existingIndex] = {
        ...article,
        lastUpdatedDate: new Date().toISOString().split('T')[0]
      };
    } else {
      this.articles.unshift({
        ...article,
        lastUpdatedDate: new Date().toISOString().split('T')[0]
      });
    }
    this.saveArticles();

    // Async push to Turso DB API
    if (typeof window !== 'undefined' && window.fetch) {
      fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      }).catch((e) => console.error('[Turso Sync Error]', e));
    }

    return article;
  }

  public static duplicateArticle(id: string): CmsArticle | null {
    this.init();
    const original = this.getArticleById(id);
    if (!original) return null;

    const newId = `art-copy-${Date.now()}`;
    const newSlug = `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`;

    const duplicate: CmsArticle = {
      ...JSON.parse(JSON.stringify(original)),
      id: newId,
      slug: newSlug,
      title: `${original.title} (Copy)`,
      status: 'draft',
      publishedDate: new Date().toISOString().split('T')[0],
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      viewCount: 0
    };

    this.articles.unshift(duplicate);
    this.saveArticles();

    // Async push to Turso DB API
    if (typeof window !== 'undefined' && window.fetch) {
      fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicate),
      }).catch((e) => console.error('[Turso Sync Error]', e));
    }

    return duplicate;
  }

  public static deleteArticle(id: string): boolean {
    this.init();
    const initialLen = this.articles.length;
    this.articles = this.articles.filter((a) => a.id !== id);
    if (this.articles.length !== initialLen) {
      this.saveArticles();

      // Async delete from Turso DB API
      if (typeof window !== 'undefined' && window.fetch) {
        fetch(`/api/articles/${id}`, {
          method: 'DELETE',
        }).catch((e) => console.error('[Turso Delete Error]', e));
      }

      return true;
    }
    return false;
  }

  public static updateArticleStatus(id: string, status: CmsArticle['status']): boolean {
    this.init();
    const article = this.articles.find((a) => a.id === id);
    if (article) {
      article.status = status;
      article.lastUpdatedDate = new Date().toISOString().split('T')[0];
      if ((status || '').toLowerCase() === 'published' && !article.publishedDate) {
        article.publishedDate = new Date().toISOString().split('T')[0];
      }
      this.saveArticles();
      return true;
    }
    return false;
  }

  private static saveArticles() {
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(this.articles));
    } catch {
      // localStorage error fallback
    }
  }

  // Related Articles Recommendation Engine
  public static getRelatedArticles(article: CmsArticle, limit = 4): CmsArticle[] {
    this.init();
    const allPublished = this.articles.filter(
      (a) => a.id !== article.id && (a.status || '').toLowerCase() === 'published'
    );

    // 1. Manual selections take priority
    const manualArticles: CmsArticle[] = [];
    if (article.manualRelatedArticleIds && article.manualRelatedArticleIds.length > 0) {
      for (const id of article.manualRelatedArticleIds) {
        const found = allPublished.find((a) => a.id === id);
        if (found && !manualArticles.some((m) => m.id === found.id)) {
          manualArticles.push(found);
        }
      }
    }

    if (manualArticles.length >= limit) {
      return manualArticles.slice(0, limit);
    }

    // 2. Automatic scoring based on Country, Category, Subcategory, Tags, and Topic
    const scored = allPublished
      .filter((candidate) => !manualArticles.some((m) => m.id === candidate.id))
      .map((candidate) => {
        let score = 0;

        // Same country (High priority for jurisdiction accuracy)
        if (candidate.country === article.country || candidate.country === 'global' || article.country === 'global') {
          score += 15;
        }

        // Same category
        if (candidate.category === article.category) {
          score += 20;
        }

        // Same subcategory (Very high relevance)
        if (candidate.subcategory && article.subcategory && candidate.subcategory === article.subcategory) {
          score += 25;
        }

        // Same article type
        if (candidate.type === article.type) {
          score += 10;
        }

        // Shared tags
        if (candidate.tags && article.tags) {
          const sharedTags = candidate.tags.filter((t) => article.tags.includes(t));
          score += sharedTags.length * 8;
        }

        return { article: candidate, score };
      });

    scored.sort((a, b) => b.score - a.score);

    const automaticArticles = scored.map((s) => s.article);
    return [...manualArticles, ...automaticArticles].slice(0, limit);
  }

  // Ad Configuration
  public static getAdPlacementConfig(): AdPlacementConfig {
    this.init();
    return { ...this.adsConfig };
  }

  public static getAdConfig(): AdPlacementConfig {
    return this.getAdPlacementConfig();
  }

  public static saveAdPlacementConfig(config: AdPlacementConfig): AdPlacementConfig {
    this.init();
    this.adsConfig = { ...config };
    try {
      localStorage.setItem(ADS_CONFIG_STORAGE_KEY, JSON.stringify(this.adsConfig));
    } catch {}
    return this.adsConfig;
  }

  public static saveAdConfig(config: AdPlacementConfig): AdPlacementConfig {
    return this.saveAdPlacementConfig(config);
  }

  public static resetToSeed(): void {
    this.articles = [...INITIAL_CMS_ARTICLES];
    this.adsConfig = { ...DEFAULT_AD_PLACEMENT_CONFIG };
    this.cookieConsent = { ...DEFAULT_COOKIE_CONSENT };
    this.saveArticles();
    try {
      localStorage.setItem(ADS_CONFIG_STORAGE_KEY, JSON.stringify(this.adsConfig));
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(this.cookieConsent));
    } catch {}
  }

  // Cookie Consent
  public static getCookieConsent(): CookieConsentState {
    this.init();
    return { ...this.cookieConsent };
  }

  public static saveCookieConsent(consent: CookieConsentState): CookieConsentState {
    this.init();
    this.cookieConsent = { ...consent };
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(this.cookieConsent));
    } catch {}
    return this.cookieConsent;
  }
}
