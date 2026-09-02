import { DebtCounselingResource } from '../types';

export interface RegulatoryAgencyInfo {
  id: string;
  country: string;
  countryName: string;
  abbreviation: string;
  name: string;
  website: string;
  description: string;
  statutoryMandate: string;
}

export const REGULATORY_AGENCIES: RegulatoryAgencyInfo[] = [
  {
    id: 'reg-us-cfpb',
    country: 'us',
    countryName: 'United States',
    abbreviation: 'CFPB',
    name: 'Consumer Financial Protection Bureau',
    website: 'https://www.consumerfinance.gov',
    description: 'Federal agency enforcing consumer financial laws, CARD Act requirements, and credit card fee transparency.',
    statutoryMandate: 'Enforces Dodd-Frank Wall Street Reform and Consumer Protection Act, CARD Act of 2009, Truth in Lending Act (TILA).',
  },
  {
    id: 'reg-uk-fca',
    country: 'uk',
    countryName: 'United Kingdom',
    abbreviation: 'FCA',
    name: 'Financial Conduct Authority',
    website: 'https://www.fca.org.uk',
    description: 'Statutory body regulating the conduct of retail banking and consumer credit firms in the UK.',
    statutoryMandate: 'Enforces Consumer Credit Act 1974/2006, CONC Sourcebook, Representative APR rules, and Persistent Debt guidelines.',
  },
  {
    id: 'reg-ca-fcac',
    country: 'ca',
    countryName: 'Canada',
    abbreviation: 'FCAC',
    name: 'Financial Consumer Agency of Canada',
    website: 'https://www.canada.ca/en/financial-consumer-agency.html',
    description: 'Federal watchdog ensuring federally regulated financial entities comply with consumer protection measures.',
    statutoryMandate: 'Enforces Canadian Bank Act (Cost of Borrowing Regulations) and Credit Card Minimum Payment disclosure mandates.',
  },
  {
    id: 'reg-au-asic',
    country: 'au',
    countryName: 'Australia',
    abbreviation: 'ASIC',
    name: 'Australian Securities and Investments Commission',
    website: 'https://asic.gov.au',
    description: 'National corporate and financial services regulator enforcing responsible lending obligations.',
    statutoryMandate: 'Enforces National Consumer Credit Protection Act 2009 (NCCP Act) and the 3-Year Credit Card Repayment Assessment Rule.',
  },
  {
    id: 'reg-nz-comcom',
    country: 'nz',
    countryName: 'New Zealand',
    abbreviation: 'Commerce Commission',
    name: 'Commerce Commission New Zealand',
    website: 'https://comcom.govt.nz',
    description: 'Primary competition and consumer regulatory agency administering credit contract legislation.',
    statutoryMandate: 'Enforces Credit Contracts and Consumer Finance Act 2003 (CCCFA) and Responsible Lending Code guidelines.',
  },
];

export const DEBT_COUNSELING_RESOURCES: DebtCounselingResource[] = [
  // UNITED STATES
  {
    id: 'res-us-nfcc',
    country: 'us',
    organization: 'National Foundation for Credit Counseling (NFCC)',
    serviceType: 'Non-Profit Debt Advice',
    phone: '1-800-388-2227',
    website: 'https://www.nfcc.org',
    cost: '100% Free & Confidential',
    description: 'The largest and longest-serving non-profit financial counseling organization in the US, providing certified credit card debt management and budget counseling.',
  },
  {
    id: 'res-us-cfpb',
    country: 'us',
    organization: 'Consumer Financial Protection Bureau (CFPB)',
    serviceType: 'Government Agency',
    phone: '1-855-411-2372',
    website: 'https://www.consumerfinance.gov',
    cost: '100% Free & Confidential',
    description: 'Official US federal government bureau where consumers can submit complaints against credit card issuers and access educational materials.',
  },

  // CANADA
  {
    id: 'res-ca-ccc',
    country: 'ca',
    organization: 'Credit Counselling Canada (Conseil en crédit du Canada)',
    serviceType: 'Non-Profit Debt Advice',
    phone: '1-866-398-5999',
    website: 'https://creditcounsellingcanada.ca',
    cost: '100% Free & Confidential',
    description: 'National association of non-profit credit counseling agencies across all Canadian provinces and territories providing free debt consolidation advice.',
  },
  {
    id: 'res-ca-fcac',
    country: 'ca',
    organization: 'Financial Consumer Agency of Canada (FCAC)',
    serviceType: 'Government Agency',
    phone: '1-866-461-3222',
    website: 'https://www.canada.ca/en/financial-consumer-agency.html',
    cost: '100% Free & Confidential',
    description: 'Federal government body protecting consumers of financial products and enforcing Bank Act compliance among Canadian card issuers.',
  },

  // UNITED KINGDOM
  {
    id: 'res-uk-stepchange',
    country: 'uk',
    organization: 'StepChange Debt Charity',
    serviceType: 'Non-Profit Debt Advice',
    phone: '0800 138 1111',
    website: 'https://www.stepchange.org',
    cost: '100% Free & Confidential',
    description: 'The UK’s leading debt advice charity providing free, expert, tailored debt advice and Debt Management Plans (DMPs).',
  },
  {
    id: 'res-uk-national-debtline',
    country: 'uk',
    organization: 'National Debtline',
    serviceType: 'Non-Profit Debt Advice',
    phone: '0808 808 4000',
    website: 'https://nationaldebtline.org',
    cost: '100% Free & Confidential',
    description: 'Free, independent, and confidential advice service run by the Money Advice Trust for residents in England, Scotland, and Wales.',
  },
  {
    id: 'res-uk-fos',
    country: 'uk',
    organization: 'Financial Ombudsman Service (FOS)',
    serviceType: 'Financial Ombudsman',
    phone: '0800 023 4567',
    website: 'https://www.financial-ombudsman.org.uk',
    cost: '100% Free & Confidential',
    description: 'Official independent UK service that settles disputes between consumers and credit card companies or banks.',
  },

  // AUSTRALIA
  {
    id: 'res-au-ndh',
    country: 'au',
    organization: 'National Debt Helpline (NDH Australia)',
    serviceType: 'Non-Profit Debt Advice',
    phone: '1800 007 007',
    website: 'https://ndh.org.au',
    cost: '100% Free & Confidential',
    description: 'Government-funded, not-for-profit financial counseling service helping Australians tackle credit card debt and financial hardship.',
  },
  {
    id: 'res-au-afca',
    country: 'au',
    organization: 'Australian Financial Complaints Authority (AFCA)',
    serviceType: 'Financial Ombudsman',
    phone: '1800 931 678',
    website: 'https://www.afca.org.au',
    cost: '100% Free & Confidential',
    description: 'Independent dispute resolution scheme for financial services complaints across Australia.',
  },

  // NEW ZEALAND
  {
    id: 'res-nz-moneytalks',
    country: 'nz',
    organization: 'MoneyTalks (FinCap New Zealand)',
    serviceType: 'Non-Profit Debt Advice',
    phone: '0800 345 123',
    website: 'https://www.moneytalks.co.nz',
    cost: '100% Free & Confidential',
    description: 'Free, confidential financial helpline connecting New Zealanders with local community budgeting and debt specialists.',
  },
  {
    id: 'res-nz-fscl',
    country: 'nz',
    organization: 'Financial Services Complaints Limited (FSCL)',
    serviceType: 'Financial Ombudsman',
    phone: '0800 347 257',
    website: 'https://www.fscl.org.nz',
    cost: '100% Free & Confidential',
    description: 'Approved independent dispute resolution scheme for consumer complaints regarding New Zealand credit and financial providers.',
  },
];
