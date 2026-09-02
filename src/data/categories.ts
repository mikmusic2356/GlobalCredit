import { CardCategory, CategoryMeta } from '../types';

export const CATEGORIES_DATA: CategoryMeta[] = [
  {
    id: 'all',
    name: 'All Credit Cards',
    shortDesc: 'Comprehensive international overview across all verified card categories.',
    iconName: 'CreditCard',
  },
  {
    id: 'cash-back',
    name: 'Cash Back Cards',
    shortDesc: 'Cards offering direct statement credits or bank deposits on everyday purchases.',
    iconName: 'Coins',
    countryAliases: {
      uk: 'Cashback Credit Cards',
      au: 'Cashback & Rebate Cards',
    },
  },
  {
    id: 'travel',
    name: 'Travel Credit Cards',
    shortDesc: 'Cards earning airline miles, hotel perks, airport lounge access, and 0% foreign transaction fees.',
    iconName: 'Plane',
    countryAliases: {
      au: 'Frequent Flyer & Travel Cards',
      nz: 'Airpoints & Travel Cards',
    },
  },
  {
    id: 'rewards',
    name: 'Rewards & Points Cards',
    shortDesc: 'Flexible points programs redeemable for merchandise, gift cards, travel, and lifestyle benefits.',
    iconName: 'Gift',
  },
  {
    id: 'zero-intro-apr',
    name: '0% Intro APR / Purchase',
    shortDesc: 'Cards offering an interest-free introductory promotional window on new purchases.',
    iconName: 'Percent',
    countryAliases: {
      uk: '0% Purchase Cards',
      au: '0% Intro Interest Cards',
      nz: 'Interest-Free Promotional Cards',
    },
  },
  {
    id: 'balance-transfer',
    name: 'Balance Transfer Cards',
    shortDesc: 'Designed to consolidate existing high-interest card debt to a lower or 0% interest rate.',
    iconName: 'ArrowLeftRight',
  },
  {
    id: 'low-interest',
    name: 'Low Interest Rate Cards',
    shortDesc: 'Cards with consistently low ongoing standard purchase interest rates for carrying a balance.',
    iconName: 'TrendingDown',
    countryAliases: {
      uk: 'Low Rate Cards',
      au: 'Low Rate Credit Cards',
      nz: 'Low Rate Cards',
    },
  },
  {
    id: 'no-annual-fee',
    name: 'No Annual Fee Cards',
    shortDesc: 'Cards with $0 ongoing yearly maintenance charges, ideal for budget-conscious cardholders.',
    iconName: 'ShieldCheck',
    countryAliases: {
      uk: 'No Annual Fee Cards (£0 Fee)',
      au: 'No Annual Fee Cards ($0 Fee)',
    },
  },
  {
    id: 'student',
    name: 'Student Credit Cards',
    shortDesc: 'Accessible credit options tailored for young adults and university students building early credit history.',
    iconName: 'GraduationCap',
  },
  {
    id: 'business',
    name: 'Business & Commercial Cards',
    shortDesc: 'Built for enterprise cash flow, expense tracking, employee cards, and commercial rewards.',
    iconName: 'Building2',
  },
  {
    id: 'secured',
    name: 'Secured & Credit-Building',
    shortDesc: 'Cards requiring a refundable cash security deposit to build or rebuild payment history safely.',
    iconName: 'Lock',
    countryAliases: {
      uk: 'Credit Builder Cards',
      au: 'Credit Building Cards',
    },
  },
  {
    id: 'bad-fair-credit',
    name: 'Fair & Rebuilding Credit',
    shortDesc: 'Cards with more flexible eligibility thresholds designed for establishing a positive score track record.',
    iconName: 'Sparkles',
  },
];
