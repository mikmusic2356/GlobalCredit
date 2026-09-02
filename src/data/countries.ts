import { CountryCode, CountryInfo } from '../types';

export const COUNTRIES_DATA: Record<CountryCode, CountryInfo> = {
  us: {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    currency: {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
    },
    regulator: {
      name: 'Consumer Financial Protection Bureau',
      abbreviation: 'CFPB',
      website: 'https://www.consumerfinance.gov',
      description: 'The primary federal agency enforcing federal consumer financial laws including the CARD Act and Truth in Lending Act (TILA).',
    },
    creditScoreSystem: {
      name: 'FICO & VantageScore (300–850)',
      range: '300–850',
      bureaus: ['Experian', 'Equifax', 'TransUnion'],
      excellentThreshold: '740–850',
      goodThreshold: '670–739',
      averageThreshold: '580–669',
    },
    keyRegulations: [
      'Credit CARD Act of 2009 (protects against retroactive rate hikes and unfair fee schedules)',
      'Truth in Lending Act / Regulation Z (requires standardized Schumer box disclosures)',
      'Fair Credit Billing Act (FCBA - limits unauthorized consumer charge liability to $50 max)',
      'Equal Credit Opportunity Act (ECOA - prohibits discriminatory lending practices)',
    ],
    terminology: {
      interestRateLabel: 'Annual Percentage Rate (APR)',
      balanceTransferLabel: '0% Intro Balance Transfer',
      foreignFeeLabel: 'Foreign Transaction Fee',
      representativeNotice: 'Rates variable based on the U.S. Prime Rate.',
    },
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    currency: {
      code: 'CAD',
      symbol: '$',
      name: 'Canadian Dollar',
    },
    regulator: {
      name: 'Financial Consumer Agency of Canada',
      abbreviation: 'FCAC',
      website: 'https://www.canada.ca/en/financial-consumer-agency.html',
      description: 'Federal regulator overseeing federally regulated financial institutions and consumer rights under the Bank Act.',
    },
    creditScoreSystem: {
      name: 'Equifax & TransUnion Canada (300–900)',
      range: '300–900',
      bureaus: ['Equifax Canada', 'TransUnion Canada'],
      excellentThreshold: '760–900',
      goodThreshold: '660–759',
      averageThreshold: '560–659',
    },
    keyRegulations: [
      'Bank Act Regulations on Credit Card Disclosures (mandatory 21-day grace period for new purchases)',
      'Code of Conduct for the Credit and Debit Card Industry in Canada',
      'Mandatory clear fee summaries and minimum payment warning calculators on monthly statements',
    ],
    terminology: {
      interestRateLabel: 'Annual Interest Rate / Purchase APR',
      balanceTransferLabel: 'Promotional Balance Transfer Rate',
      foreignFeeLabel: 'Foreign Currency Conversion Fee (typ. 2.5%)',
    },
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: {
      code: 'GBP',
      symbol: '£',
      name: 'British Pound',
    },
    regulator: {
      name: 'Financial Conduct Authority',
      abbreviation: 'FCA',
      website: 'https://www.fca.org.uk',
      description: 'Statutory body regulating consumer credit, enforcing the Consumer Credit Act and Consumer Duty standards.',
    },
    creditScoreSystem: {
      name: 'Credit Reference Agencies (Experian 0–999, Equifax 0–1000, TransUnion 0–710)',
      range: 'Varies by Agency (0–710 / 0–999 / 0–1000)',
      bureaus: ['Experian UK', 'Equifax UK', 'TransUnion UK'],
      excellentThreshold: 'Experian 961–999 / Equifax 811–1000',
      goodThreshold: 'Experian 881–960 / Equifax 671–810',
      averageThreshold: 'Experian 721–880 / Equifax 531–670',
    },
    keyRegulations: [
      'Section 75 Consumer Credit Act 1974 (joint liability for purchases between £100 and £30,000)',
      'Representative APR Rule (at least 51% of successful applicants must receive the advertised rate)',
      'FCA Persistent Debt Rules (mandates issuer intervention after 18 & 36 months of minimum payments)',
      'Statutory 14-day cooling off period for all credit agreements',
    ],
    terminology: {
      interestRateLabel: 'Representative APR (Variable)',
      balanceTransferLabel: '0% Balance Transfer Offer',
      foreignFeeLabel: 'Non-Sterling Transaction Fee (typ. 2.75%–2.99%)',
      representativeNotice: 'Representative example: Advertised rate must be given to at least 51% of approved applicants.',
    },
  },
  au: {
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    currency: {
      code: 'AUD',
      symbol: '$',
      name: 'Australian Dollar',
    },
    regulator: {
      name: 'Australian Securities and Investments Commission',
      abbreviation: 'ASIC',
      website: 'https://asic.gov.au',
      description: 'Corporate and credit regulator enforcing the National Consumer Credit Protection Act (NCCP) and administering the ePayments Code.',
    },
    creditScoreSystem: {
      name: 'Comprehensive Credit Reporting (CCR / 0–1000 or 0–1200)',
      range: '0–1000 (Experian/Illion) or 0–1200 (Equifax)',
      bureaus: ['Equifax Australia', 'Experian Australia', 'Illion'],
      excellentThreshold: '800–1000+ (Equifax 853–1200)',
      goodThreshold: '622–799 (Equifax 661–852)',
      averageThreshold: '510–621 (Equifax 510–660)',
    },
    keyRegulations: [
      'National Consumer Credit Protection Act (NCCP) - Responsible lending assessments and 3-year capacity test',
      'Ban on unsolicited credit limit increase offers without explicit consumer opt-in',
      'Mandatory allocation of repayments to the highest interest rate balance first',
      'Reserve Bank of Australia (RBA) Interchange Fee Standards & Surcharging Rules',
    ],
    terminology: {
      interestRateLabel: 'Standard Purchase Rate (p.a.)',
      balanceTransferLabel: 'Balance Transfer Promotional Rate',
      foreignFeeLabel: 'International Transaction Fee',
    },
  },
  nz: {
    code: 'nz',
    name: 'New Zealand',
    flag: '🇳🇿',
    currency: {
      code: 'NZD',
      symbol: '$',
      name: 'New Zealand Dollar',
    },
    regulator: {
      name: 'Commerce Commission New Zealand',
      abbreviation: 'ComCom',
      website: 'https://comcom.govt.nz',
      description: 'Enforces the Credit Contracts and Consumer Finance Act (CCCFA) and Fair Trading Act for fair lending across New Zealand.',
    },
    creditScoreSystem: {
      name: 'Comprehensive Credit Reporting (Centrix 0–1000 / Equifax NZ)',
      range: '0–1000',
      bureaus: ['Centrix NZ', 'Equifax New Zealand', 'Illion NZ'],
      excellentThreshold: '700–1000',
      goodThreshold: '500–699',
      averageThreshold: '300–499',
    },
    keyRegulations: [
      'Credit Contracts and Consumer Finance Act 2003 (CCCFA) - Strict lender suitability and affordability checks',
      'Retail Payment System Act 2022 (caps on interchange fees for Mastercard and Visa credit transactions)',
      'Mandatory disclosure of initial credit costs, annual interest rates, and dispute resolution schemes',
    ],
    terminology: {
      interestRateLabel: 'Annual Purchase Interest Rate (p.a.)',
      balanceTransferLabel: 'Special Balance Transfer Rate',
      foreignFeeLabel: 'Foreign Currency Fee (typ. 1.85%–2.5%)',
    },
  },
};

export const COUNTRY_LIST = Object.values(COUNTRIES_DATA);
