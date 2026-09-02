export type CountryCode = 'us' | 'ca' | 'uk' | 'au' | 'nz';

export type DataVerificationStatus = 'VERIFIED' | 'UNVERIFIED' | 'MISSING' | 'OUTDATED';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  regulator: {
    name: string;
    abbreviation: string;
    website: string;
    description: string;
  };
  creditScoreSystem: {
    name: string;
    range: string;
    bureaus: string[];
    excellentThreshold: string;
    goodThreshold: string;
    averageThreshold: string;
  };
  keyRegulations: string[];
  terminology: {
    interestRateLabel: string;
    balanceTransferLabel: string;
    foreignFeeLabel: string;
    representativeNotice?: string;
  };
}

export type CardCategory =
  | 'all'
  | 'cash-back'
  | 'rewards'
  | 'travel'
  | 'zero-intro-apr'
  | 'balance-transfer'
  | 'low-interest'
  | 'no-annual-fee'
  | 'student'
  | 'business'
  | 'secured'
  | 'bad-fair-credit';

export interface CategoryMeta {
  id: CardCategory;
  name: string;
  shortDesc: string;
  iconName: string;
  countryAliases?: Partial<Record<CountryCode, string>>;
}

export interface VerificationMeta {
  status: DataVerificationStatus;
  publishedDate: string;
  lastUpdatedDate: string;
  lastVerifiedDate: string;
  verifiedBy?: string;
  sources: {
    title: string;
    url?: string;
    isOfficial: boolean;
  }[];
}

export interface CreditCardItem {
  id: string;
  name: string;
  cardName?: string;
  issuer: string;
  network: 'Visa' | 'Mastercard' | 'American Express' | 'Discover' | 'Eftpos';
  country: CountryCode;
  categories: CardCategory[];
  featured?: boolean;
  ratingScore: number; // Editorial completeness rating (1 to 5)
  verificationStatus?: DataVerificationStatus;
  annualFee: number;
  annualFeePromo?: string;
  regularApr: {
    min: number;
    max: number;
    type: 'Variable' | 'Fixed' | 'Representative' | 'Standard Purchase';
    rateDisplay: string;
  };
  introApr?: {
    rate: number;
    durationMonths: number;
    appliesTo: 'Purchases' | 'Balance Transfers' | 'Both';
    feePercent?: number;
    termsNotice: string;
  };
  introductoryPeriod?: string;
  balanceTransferFee?: {
    percent: number;
    minimumAmount: number;
  };
  balanceTransferInfo?: {
    introRate?: number;
    durationMonths?: number;
    feePercent?: number;
    feeMinAmount?: number;
    notes?: string;
  };
  foreignTransactionFee: {
    percent: number;
    isZero: boolean;
    details?: string;
  };
  rewardsStructure: {
    type: 'Cashback' | 'Points' | 'Miles' | 'Airpoints' | 'None';
    headline: string;
    baseRate: string;
    categoryRates?: string[];
  };
  cashBackRate?: string;
  welcomeOffer?: string;
  otherFees?: {
    latePayment?: string;
    cashAdvance?: string;
    penaltyApr?: string;
    returnedPayment?: string;
    overLimit?: string;
  };
  benefits?: string[];
  eligibilityInfo?: {
    minAge?: number;
    minIncome?: string;
    residency?: string;
    creditRating?: string;
    studentStatus?: string;
    otherNotes?: string;
  };
  importantConditions?: string[];
  creditScoreRequirement: 'Excellent (720+)' | 'Good (670-719)' | 'Fair (580-669)' | 'Building/Poor (<580)' | 'No Credit History Required';
  keyPerks: string[];
  pros: string[];
  cons: string[];
  editorialSummary: string;
  officialSource?: {
    name: string;
    url?: string;
    documentType?: string;
  };
  sourceUrl?: string;
  representativeExample?: string; // Required for UK market
  publishedDate?: string;
  lastUpdatedDate?: string;
  lastVerifiedDate: string;
  applyRequirementNotes?: string;
}

export interface FinancialGuide {
  id: string;
  slug: string;
  title: string;
  countryScope: CountryCode[] | 'all';
  category: 'Fundamentals' | 'Interest & APR' | 'Balance Transfers' | 'Debt Payoff' | 'Fees & Charges' | 'Consumer Protection' | 'Credit Scores' | 'Credit Building' | 'Cards vs Debit';
  readingTimeMinutes: number;
  publishedDate?: string;
  lastUpdated: string;
  lastVerifiedDate?: string;
  verificationStatus?: DataVerificationStatus;
  sources?: { title: string; url?: string; isOfficial?: boolean }[];
  summary: string;
  featuredImage?: {
    url: string;
    alt?: string;
    caption?: string;
    credit?: string;
  };
  sections: {
    heading: string;
    body: string;
    tips?: string[];
    callout?: {
      title: string;
      text: string;
      type: 'info' | 'warning' | 'legal';
    };
  }[];
  relatedCalculators?: string[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  publishedDate: string;
  lastUpdatedDate?: string;
  lastVerifiedDate?: string;
  verificationStatus?: DataVerificationStatus;
  country: CountryCode | 'global';
  category: 'New Card Launches' | 'Card Benefits' | 'Rewards Updates' | 'Fee Changes' | 'Intro Offers' | 'Regulatory' | 'Issuer Changes' | 'Seasonal & Shopping' | 'Interest Rates' | 'Market Trends';
  readTime: string;
  snippet: string;
  content: string[];
  sourceAttribution: string;
  sourceUrl?: string;
  impactSummary: string;
  tags?: string[];
  featuredImage?: {
    url: string;
    alt?: string;
    caption?: string;
    credit?: string;
  };
}

export interface GlossaryTerm {
  term: string;
  countrySpecifics?: Partial<Record<CountryCode, string>>;
  definition: string;
  example?: string;
  relatedTerms: string[];
  category: 'General' | 'Interest & Fees' | 'Credit Scoring' | 'Regulations' | 'Rewards';
}

export interface DebtCounselingResource {
  id: string;
  country: CountryCode;
  organization: string;
  serviceType: 'Non-Profit Debt Advice' | 'Government Agency' | 'Financial Ombudsman' | 'Consumer Protection';
  phone: string;
  website: string;
  cost: '100% Free & Confidential';
  description: string;
}

export type ActiveTab =
  | 'home'
  | 'countries'
  | 'cards'
  | 'compare'
  | 'calculators'
  | 'credit-score'
  | 'guides'
  | 'news'
  | 'resources'
  | 'about'
  | 'admin'
  | 'cookie-policy'
  | 'privacy-policy'
  | 'terms';

export * from './cms';

