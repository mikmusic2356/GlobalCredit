import { GlossaryTerm } from '../types';

export const GLOSSARY_DATA: GlossaryTerm[] = [
  {
    term: 'Annual Percentage Rate (APR)',
    category: 'Interest & Fees',
    definition: 'The annual cost of borrowing on a credit card, expressed as a percentage rate. It reflects the interest you will pay over a year if you carry a revolving balance.',
    example: 'A 24% APR equals approximately 0.06575% interest charged daily on unpaid balances.',
    countrySpecifics: {
      us: 'Regulated under the Truth in Lending Act. Must be displayed in Schumer Boxes.',
      uk: 'Known as Representative APR under FCA rules, where 51% of approved applicants must receive the advertised rate.',
      au: 'Referred to as the Annual Purchase Interest Rate (p.a.).',
      nz: 'Referred to as the Annual Purchase Rate (p.a.).',
    },
    relatedTerms: ['Daily Periodic Rate', 'Representative APR', 'Grace Period'],
  },
  {
    term: 'Balance Transfer',
    category: 'General',
    definition: 'The process of moving existing credit card debt from one card issuer to another, typically to take advantage of a lower interest rate or 0% promotional period.',
    example: 'Transferring £3,000 from a 25% APR card to a 0% balance transfer card for 24 months to save £1,000+ in interest.',
    relatedTerms: ['Balance Transfer Fee', 'Promotional APR', 'Grace Period'],
  },
  {
    term: 'Balance Transfer Fee',
    category: 'Interest & Fees',
    definition: 'A one-time upfront fee charged by the new card issuer when executing a balance transfer, calculated as a percentage of the transferred total.',
    example: 'A 3% fee on a $5,000 balance transfer costs $150 added directly to the new card balance.',
    relatedTerms: ['Balance Transfer', 'Intro APR'],
  },
  {
    term: 'Cash Advance',
    category: 'Interest & Fees',
    definition: 'Using your credit card to withdraw physical cash from an ATM, buy foreign currency, or purchase lottery/gambling tokens. Cash advances incur higher interest rates immediately with NO grace period, plus an upfront transaction fee.',
    example: 'Withdrawing $200 cash incurs an instant $10 fee plus immediate 29.99% interest from day one.',
    relatedTerms: ['Cash Advance APR', 'ATM Surcharge'],
  },
  {
    term: 'Credit Utilization Ratio',
    category: 'Credit Scoring',
    definition: 'The percentage of your total available revolving credit limits that you are actively using across all credit cards. Keeping this ratio below 30% (ideally under 10%) is vital for healthy credit scores.',
    example: 'Having a total balance of $1,000 across cards with a combined $10,000 credit limit equals a 10% credit utilization ratio.',
    countrySpecifics: {
      us: 'Accounts for 30% of your total FICO score.',
      ca: 'Key factor in Equifax & TransUnion Canada credit scoring models.',
    },
    relatedTerms: ['FICO Score', 'Credit Limit', 'Revolving Debt'],
  },
  {
    term: 'Foreign Transaction Fee (FX Fee)',
    category: 'Interest & Fees',
    definition: 'A surcharge applied by card issuers or payment networks on transactions processed in a foreign currency or through an overseas merchant bank.',
    example: 'Spending $1,000 abroad on a card with a 3% FX fee adds $30 in additional conversion fees.',
    countrySpecifics: {
      us: 'Standard fee is 3%. Many travel cards feature 0% FX fees.',
      ca: 'Standard Canadian markup is 2.5% on Visa/Mastercard exchange rates.',
      uk: 'Often called Non-Sterling Transaction Fee (standard 2.75%–2.99%).',
      au: 'Standard international transaction fee is 3.0% on Australian bank cards.',
      nz: 'Standard fee ranges from 1.30% to 2.50% in New Zealand.',
    },
    relatedTerms: ['Interchange Fee', 'Currency Conversion'],
  },
  {
    term: 'Grace Period',
    category: 'Interest & Fees',
    definition: 'The time period between the end of your billing cycle and the payment due date during which you are not charged interest on new purchases, provided you paid the previous statement balance in full.',
    countrySpecifics: {
      us: 'Mandated to be at least 21 days under the CARD Act.',
      ca: 'Mandated to be at least 21 days for federally regulated banks under FCAC rules.',
      uk: 'Typically up to 56 days (from start of billing period to due date).',
      au: 'Typically advertised as "up to 44 or 55 days interest-free".',
      nz: 'Typically advertised as "up to 44 or 55 days interest-free".',
    },
    relatedTerms: ['Billing Cycle', 'Statement Balance', 'Due Date'],
  },
  {
    term: 'Section 75 (UK)',
    category: 'Regulations',
    definition: 'A crucial clause in the UK Consumer Credit Act 1974 making credit card companies jointly liable with merchants for breach of contract or misrepresentation on purchases between £100 and £30,000.',
    example: 'If a UK airline collapses and cancels your flight booked on a credit card, the card issuer must legally refund you under Section 75.',
    countrySpecifics: {
      uk: 'Statutory UK consumer right that applies even if only a £1 deposit is charged to the credit card.',
    },
    relatedTerms: ['Chargeback', 'Consumer Credit Act'],
  },
  {
    term: 'Comprehensive Credit Reporting (CCR)',
    category: 'Credit Scoring',
    definition: 'A credit reporting system that records both negative data (defaults, bankruptcies) and positive repayment data (monthly on-time payment history, active account limits, account open dates).',
    countrySpecifics: {
      au: 'Mandated in Australia under the Privacy Act for major banks.',
      nz: 'Widely utilized across New Zealand financial institutions.',
    },
    relatedTerms: ['Equifax', 'Experian', 'Illion', 'Centrix'],
  },
  {
    term: 'Schumer Box',
    category: 'Regulations',
    definition: 'A standardized, easy-to-read table format mandated in the United States that clearly displays credit card interest rates, annual fees, grace periods, and penalty charges.',
    countrySpecifics: {
      us: 'Mandated by federal law and named after US Senator Chuck Schumer.',
    },
    relatedTerms: ['Truth in Lending Act', 'Disclosure Statement'],
  },
  {
    term: 'Representative APR',
    category: 'Regulations',
    definition: 'A UK regulatory requirement established by the Financial Conduct Authority (FCA) stating that the advertised headline APR must be offered to at least 51% of successfully approved applicants.',
    countrySpecifics: {
      uk: 'FCA statutory standard. If your credit profile is fair or poor, you may receive a higher rate.',
    },
    relatedTerms: ['APR', 'Financial Conduct Authority'],
  },
  {
    term: 'Secured Credit Card',
    category: 'General',
    definition: 'A type of credit card backed by a refundable cash security deposit from the cardholder, which typically acts as the card credit limit. Used to establish, build, or rebuild credit history.',
    example: 'Depositing $300 gets you a $300 credit line; on-time payments report to credit bureaus and deposit is refunded upon graduation.',
    relatedTerms: ['Unsecured Credit Card', 'Credit Building'],
  },
  {
    term: 'Chargeback',
    category: 'Regulations',
    definition: 'A card network process (Visa/Mastercard/Amex) where a bank reverses a disputed charge back to the merchant due to fraud, incorrect billing, non-receipt of goods, or defective merchandise.',
    relatedTerms: ['Section 75', 'Fraud Protection', 'Fair Credit Billing Act'],
  },
  {
    term: 'Interchange Fee',
    category: 'Interest & Fees',
    definition: 'The fee that the merchant bank pays to the cardholder issuing bank to cover handling costs, fraud risks, and transaction processing on every swipe or tap.',
    countrySpecifics: {
      us: 'Generally unregulated for credit cards (averages 1.5%–3.5%).',
      uk: 'Capped at 0.3% on consumer credit cards under UK/EU interchange fee regulations.',
      au: 'Capped under Reserve Bank of Australia (RBA) weighted average interchange standards (0.50% cap).',
      nz: 'Regulated under the Retail Payment System Act 2022 (capped at 0.80% for credit).',
    },
    relatedTerms: ['Foreign Transaction Fee', 'Merchant Fee'],
  },
];
