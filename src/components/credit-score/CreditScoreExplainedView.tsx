import React, { useState, useEffect } from 'react';
import { CountryCode } from '../../types';
import { CreditScoreSubRoute } from '../../lib/router';
import { COUNTRIES_DATA, COUNTRY_LIST } from '../../data/countries';
import { 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Award, 
  Clock, 
  PieChart, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  ArrowRight, 
  Sparkles,
  Search,
  Check,
  ChevronRight,
  Info,
  Calendar,
  Lock,
  Landmark,
  Scale
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotInContent, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';

interface CreditScoreExplainedViewProps {
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  subRoute?: CreditScoreSubRoute | null;
  onSelectSubRoute?: (subRoute: CreditScoreSubRoute) => void;
  onNavigateToCalculators?: () => void;
  onNavigateToCards?: () => void;
  openAiAssistant?: () => void;
}

export const CreditScoreExplainedView: React.FC<CreditScoreExplainedViewProps> = ({
  selectedCountry,
  setSelectedCountry,
  subRoute,
  onSelectSubRoute,
  onNavigateToCalculators,
  onNavigateToCards,
  openAiAssistant,
}) => {
  const validCountries: CountryCode[] = ['us', 'uk', 'ca', 'au', 'nz'];
  const safeCountry: CountryCode = validCountries.includes(selectedCountry) ? selectedCountry : 'us';
  const [activeFactor, setActiveFactor] = useState<number>(0);
  const [activeScoreBandCountry, setActiveScoreBandCountry] = useState<CountryCode>(safeCountry);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Sync with selectedCountry prop
  useEffect(() => {
    if (validCountries.includes(selectedCountry)) {
      setActiveScoreBandCountry(selectedCountry);
    }
  }, [selectedCountry]);

  // Sync with subRoute
  useEffect(() => {
    if (subRoute && validCountries.includes(subRoute as CountryCode)) {
      setActiveScoreBandCountry(subRoute as CountryCode);
      setSelectedCountry(subRoute as CountryCode);
    }
  }, [subRoute, setSelectedCountry]);

  const currentCountry = COUNTRIES_DATA[safeCountry] || COUNTRIES_DATA['us'];

  // 5 Core Scoring Factors Data
  const scoringFactors = [
    {
      id: 'payment-history',
      name: 'Payment History',
      weight: '35%',
      impact: 'Highest Impact',
      impactColor: 'text-red-600 bg-red-50 border-red-200',
      summary: 'Your track record of paying bills and credit accounts on or before the due date.',
      details: 'Payment history is the single largest component of most credit scoring models (such as FICO and VantageScore). It evaluates whether you have paid your accounts on time, any missed or late payments (30, 60, 90, 120+ days late), collections, charge-offs, defaults, County Court Judgments (CCJs in the UK), or insolvencies.',
      mathInsight: 'A single 30-day late payment can cause an immediate drop of 60 to 110 points on a pristine 780+ credit score because statistical models treat a first delinquency as a high risk of subsequent default.',
      keyRules: [
        'Late payments are generally reported only after a full 30 days past due (US/Canada).',
        'In Australia and New Zealand, Comprehensive Credit Reporting (CCR) records your 24-month Repayment History Information (RHI) showing exact payment timeliness monthly.',
        'Late payments remain on credit files for 6 years (UK/Canada/AU/NZ) to 7 years (US) from the date of initial delinquency.',
      ],
      actionItem: 'Set up automated direct debit or autopay for at least the minimum required payment on every account to guarantee a 100% on-time record.'
    },
    {
      id: 'credit-utilization',
      name: 'Credit Utilization / Amounts Owed',
      weight: '30%',
      impact: 'High Impact',
      impactColor: 'text-amber-600 bg-amber-50 border-amber-200',
      summary: 'The ratio of your reported credit card balances relative to your total available credit limits.',
      details: 'Calculated as: Total Balances ÷ Total Credit Limits × 100. Scoring models evaluate both your overall aggregate utilization ratio and your per-card utilization ratio. Higher balances signal cash flow distress, even if you make on-time payments every month.',
      mathInsight: 'The traditional "30% rule" is merely a maximum ceiling. Optimal credit scoring models award maximum points to consumers whose utilization sits between 1% and 9%. A 0% balance across every single card can sometimes lower a score slightly compared to having one card report a small 1% balance (known as the AZEO method: All Zero Except One).',
      keyRules: [
        'Issuers report your balance on your statement closing date, NOT your payment due date.',
        'Paying off your card on the due date does not prevent a high balance from being reported if the statement already closed with that balance.',
        'Credit utilization has no historical memory in standard FICO 8 / VantageScore 3.0: lowering your balance restores your score in the very next billing cycle.',
      ],
      actionItem: 'Make an interim payment 2–3 days before your statement closing date so a low balance is captured and sent to the credit bureaus.'
    },
    {
      id: 'length-of-history',
      name: 'Length of Credit History',
      weight: '15%',
      impact: 'Medium Impact',
      impactColor: 'text-blue-600 bg-blue-50 border-blue-200',
      summary: 'The age of your oldest account, the age of your newest account, and the average age of all your accounts (AAoA).',
      details: 'Lenders value long-term data over short bursts of good behavior. A seasoned credit profile spanning 5, 10, or 20 years provides statistical proof of resilience across various macroeconomic cycles.',
      mathInsight: 'Average Age of Accounts (AAoA) = Sum of all account ages ÷ Total number of open (and in FICO, closed) accounts. Opening 3 new cards in one month drastically dilutes your AAoA.',
      keyRules: [
        'In US FICO models, closed accounts in good standing continue to age and contribute to your AAoA for up to 10 years.',
        'Closing your oldest no-annual-fee credit card immediately hurts your total available credit limit (spiking utilization) and eventually reduces your history length.',
        'New immigrants and young adults start with a "thin file" and typically need 6 months of active reporting to generate a FICO score.',
      ],
      actionItem: 'Keep your oldest zero-annual-fee credit cards open and active by placing a small recurring subscription (e.g. $5 streaming) on autopay.'
    },
    {
      id: 'credit-mix',
      name: 'Credit Mix & Account Types',
      weight: '10%',
      impact: 'Moderate Impact',
      impactColor: 'text-purple-600 bg-purple-50 border-purple-200',
      summary: 'The portfolio diversity of revolving credit (credit cards, lines of credit) and installment credit (mortgages, auto loans, student loans).',
      details: 'Demonstrating that you can responsibly juggle different structures of credit—fixed monthly amortizing installment loans alongside variable revolving card balances—indicates sophisticated financial management.',
      mathInsight: 'You do not need to take out expensive loans or pay interest just to build credit mix. Credit cards alone can build scores above 750, but top-tier 800+ scores usually feature at least one paid-as-agreed installment loan.',
      keyRules: [
        'Revolving credit allows variable borrowing and repayment up to a limit.',
        'Installment credit involves a fixed borrowing sum repaid in equal monthly amounts over a predetermined term.',
        'Never take on loan debt solely to improve credit mix; the interest cost far outweighs the modest scoring benefit.',
      ],
      actionItem: 'Allow your credit mix to expand organically over time as your life milestones require (e.g., student loans, auto financing, or mortgages).'
    },
    {
      id: 'new-credit-inquiries',
      name: 'New Credit & Hard Inquiries',
      weight: '10%',
      impact: 'Low-to-Moderate Impact',
      impactColor: 'text-slate-600 bg-slate-100 border-slate-300',
      summary: 'The number of recent hard inquiries from credit applications and newly opened accounts in the past 6 to 12 months.',
      details: 'When you apply for a credit card or loan, the lender performs a "Hard Inquiry" (hard pull), which is logged on your credit file. Opening multiple accounts in a brief window signals potential financial strain or credit shopping risk.',
      mathInsight: 'A single hard inquiry typically costs 2 to 5 points on a FICO score and impacts scoring for 12 months, remaining on your report for 24 months. Checking your own score is always a "Soft Inquiry" and never affects your score.',
      keyRules: [
        'Rate-Shopping Deduplication: Most scoring models group multiple inquiries for auto loans or mortgages made within a 14 to 45 day window into a single inquiry to allow consumer price shopping.',
        'Credit card applications are NOT deduplicated; each credit card application generates a separate hard pull.',
        'Pre-approved offers and soft-pull pre-qualification tools do not impact your credit score.',
      ],
      actionItem: 'Space credit card applications by at least 6 months, and use issuer pre-qualification check tools before submitting formal applications.'
    },
  ];

  // Country-Specific Scoring Models Data
  const countryModelsData: Record<CountryCode, {
    modelName: string;
    scoreRange: string;
    tiers: { name: string; range: string; color: string; desc: string; approvalOdds: string }[];
    bureaus: { name: string; role: string; freeAccessUrl: string; accessMethod: string }[];
    uniqueLegalFeature: string;
    officialStatutoryRight: string;
  }> = {
    us: {
      modelName: 'FICO® Score 8/9/10 & VantageScore 3.0/4.0',
      scoreRange: '300 – 850',
      tiers: [
        { name: 'Exceptional', range: '800 – 850', color: 'bg-emerald-600 text-white', desc: 'Qualifies for best interest rates, highest limits, premium travel cards.', approvalOdds: 'Highest (95%+)' },
        { name: 'Very Good', range: '740 – 799', color: 'bg-emerald-500 text-white', desc: 'Above average. Competitive terms and widespread approval.', approvalOdds: 'Very High (85-90%)' },
        { name: 'Good', range: '670 – 739', color: 'bg-blue-600 text-white', desc: 'US median score (~715). Qualifies for standard rewards cards.', approvalOdds: 'Good (70-80%)' },
        { name: 'Fair', range: '580 – 669', color: 'bg-amber-500 text-white', desc: 'Subprime boundary. Higher APRs, lower credit limits, deposit cards.', approvalOdds: 'Moderate (40-60%)' },
        { name: 'Poor', range: '300 – 579', color: 'bg-red-500 text-white', desc: 'Significant delinquencies. Requires secured credit cards.', approvalOdds: 'Low (<25%)' },
      ],
      bureaus: [
        { name: 'Experian US', role: 'Major Credit Bureau', freeAccessUrl: 'https://www.annualcreditreport.com', accessMethod: 'Free weekly online credit reports via AnnualCreditReport.com' },
        { name: 'Equifax US', role: 'Major Credit Bureau', freeAccessUrl: 'https://www.annualcreditreport.com', accessMethod: 'Free weekly online credit reports via AnnualCreditReport.com' },
        { name: 'TransUnion US', role: 'Major Credit Bureau', freeAccessUrl: 'https://www.annualcreditreport.com', accessMethod: 'Free weekly online credit reports via AnnualCreditReport.com' },
      ],
      uniqueLegalFeature: 'Fair Credit Reporting Act (FCRA) gives consumers the federal right to dispute inaccuracies with a mandatory 30-day investigation window.',
      officialStatutoryRight: 'Federal law mandates free weekly credit reports from all 3 bureaus at AnnualCreditReport.com. Lenders must supply an Adverse Action Notice detailing exact scoring reasons if an application is denied.'
    },
    ca: {
      modelName: 'Equifax Canada & TransUnion Canada Risk Score',
      scoreRange: '300 – 900',
      tiers: [
        { name: 'Excellent', range: '760 – 900', color: 'bg-emerald-600 text-white', desc: 'Access to premium Canadian tier cards (Aeroplan, VIP, Cash Back).', approvalOdds: 'Highest (95%+)' },
        { name: 'Very Good', range: '725 – 759', color: 'bg-emerald-500 text-white', desc: 'Qualifies for prime rates at major chartered banks (RBC, TD, Scotiabank).', approvalOdds: 'Very High (85%)' },
        { name: 'Good', range: '660 – 724', color: 'bg-blue-600 text-white', desc: 'Canadian standard benchmark. Solid approval likelihood.', approvalOdds: 'Good (70-75%)' },
        { name: 'Fair', range: '560 – 659', color: 'bg-amber-500 text-white', desc: 'May require co-signer or security deposit with B-lenders.', approvalOdds: 'Moderate (45-55%)' },
        { name: 'Poor', range: '300 – 559', color: 'bg-red-500 text-white', desc: 'Credit rebuilding phase; secured cards recommended.', approvalOdds: 'Low (<20%)' },
      ],
      bureaus: [
        { name: 'Equifax Canada', role: 'Primary National Bureau', freeAccessUrl: 'https://www.consumer.equifax.ca', accessMethod: 'Free online monthly Consumer Disclosure' },
        { name: 'TransUnion Canada', role: 'Primary National Bureau', freeAccessUrl: 'https://www.transunion.ca', accessMethod: 'Free online monthly Consumer Disclosure' },
      ],
      uniqueLegalFeature: 'Canadian reporting uses "R-Ratings" (R1 on-time to R9 bad debt/bankruptcy) alongside the numerical score. FCAC oversees statutory banking disclosure rules.',
      officialStatutoryRight: 'Under federal Canadian rules, every resident is entitled to free, ongoing online access to their full credit file directly from Equifax Canada and TransUnion Canada without paying for subscriptions.'
    },
    uk: {
      modelName: 'UK Three-Agency Independent Scoring Framework',
      scoreRange: 'Experian (0–999) • Equifax (0–1000) • TransUnion (0–710)',
      tiers: [
        { name: 'Excellent', range: 'Exp: 961+ | Eq: 811+ | TU: 628+', color: 'bg-emerald-600 text-white', desc: 'Qualifies for market-leading 0% balance transfers and low APRs.', approvalOdds: 'Highest (90%+)' },
        { name: 'Good', range: 'Exp: 881-960 | Eq: 671-810 | TU: 604-627', color: 'bg-blue-600 text-white', desc: 'Eligible for Representative APR offers under FCA rules.', approvalOdds: 'High (75-85%)' },
        { name: 'Fair', range: 'Exp: 721-880 | Eq: 566-670 | TU: 566-603', color: 'bg-amber-500 text-white', desc: 'Standard cards; personal APR may exceed advertised representative rate.', approvalOdds: 'Moderate (50-60%)' },
        { name: 'Poor / Very Poor', range: 'Exp: 0-720 | Eq: 0-565 | TU: 0-565', color: 'bg-red-500 text-white', desc: 'Credit builder cards with higher APRs and initial limits.', approvalOdds: 'Low (<30%)' },
      ],
      bureaus: [
        { name: 'Experian UK', role: 'Major Credit Reference Agency', freeAccessUrl: 'https://www.moneysavingexpert.com/creditclub', accessMethod: 'Free via MSE Credit Club or Experian Free Account' },
        { name: 'Equifax UK', role: 'Major Credit Reference Agency', freeAccessUrl: 'https://www.clearscore.com', accessMethod: 'Free real-time score and report via ClearScore' },
        { name: 'TransUnion UK', role: 'Major Credit Reference Agency', freeAccessUrl: 'https://www.creditkarma.co.uk', accessMethod: 'Free weekly updates via Credit Karma UK' },
      ],
      uniqueLegalFeature: 'Electoral Roll Registration is crucial in the UK: being registered to vote at your current address validates your identity and provides an instant 30-50 point boost.',
      officialStatutoryRight: 'Under the Consumer Credit Act 1974 & UK GDPR, you have a statutory right to view your Statutory Credit Report for free directly from each CRA at any time.'
    },
    au: {
      modelName: 'Comprehensive Credit Reporting (CCR / Positive Reporting)',
      scoreRange: 'Equifax (0–1,200) • Experian (0–1,000) • illion (0–1,000)',
      tiers: [
        { name: 'Excellent', range: 'Eq: 853+ | Exp: 800+ | ill: 800+', color: 'bg-emerald-600 text-white', desc: 'Premium rewards and high credit limits with major Australian banks.', approvalOdds: 'Highest (95%)' },
        { name: 'Very Good', range: 'Eq: 735-852 | Exp: 700-799 | ill: 700-799', color: 'bg-emerald-500 text-white', desc: 'Competitive credit card terms and fast automated approval.', approvalOdds: 'High (80-85%)' },
        { name: 'Good', range: 'Eq: 661-734 | Exp: 625-699 | ill: 625-699', color: 'bg-blue-600 text-white', desc: 'Qualifies for standard consumer cards across Big 4 banks.', approvalOdds: 'Good (65-75%)' },
        { name: 'Average / Fair', range: 'Eq: 460-660 | Exp: 500-624 | ill: 500-624', color: 'bg-amber-500 text-white', desc: 'Subject to strict 3-year capacity tests under ASIC responsible lending.', approvalOdds: 'Moderate (40-50%)' },
        { name: 'Below Average', range: 'Eq: 0-459 | Exp: 0-499 | ill: 0-499', color: 'bg-red-500 text-white', desc: 'Focus on clearing defaults and maintaining 24-month on-time RHI.', approvalOdds: 'Low (<20%)' },
      ],
      bureaus: [
        { name: 'Equifax Australia', role: 'National Credit Reporting Body', freeAccessUrl: 'https://www.equifax.com.au', accessMethod: 'Free statutory credit report every 3 months' },
        { name: 'Experian Australia', role: 'National Credit Reporting Body', freeAccessUrl: 'https://www.experian.com.au', accessMethod: 'Free statutory credit report every 3 months' },
        { name: 'illion Australia', role: 'National Credit Reporting Body', freeAccessUrl: 'https://www.illion.com.au', accessMethod: 'Free statutory credit report every 3 months' },
      ],
      uniqueLegalFeature: 'National Consumer Credit Protection Act (NCCP) mandates that lenders assess your ability to repay the ENTIRE credit limit within 3 years, not just minimum payments.',
      officialStatutoryRight: 'Under the Privacy Act 1988, Australians are entitled to one free credit report every 3 months (or within 90 days of an application refusal) from each credit bureau.'
    },
    nz: {
      modelName: 'New Zealand Comprehensive Reporting Framework (Centrix, Equifax, illion)',
      scoreRange: '0 – 1,000 (Centrix & illion) • 0 – 1,200 (Equifax NZ)',
      tiers: [
        { name: 'Excellent', range: '800 – 1,000', color: 'bg-emerald-600 text-white', desc: 'Top tier approval for Airpoints cards, low rates, and high credit limits.', approvalOdds: 'Highest (95%)' },
        { name: 'Very Good', range: '700 – 799', color: 'bg-emerald-500 text-white', desc: 'Smooth approval with major registered banks (ANZ NZ, ASB, BNZ, Westpac).', approvalOdds: 'High (80-85%)' },
        { name: 'Good', range: '500 – 699', color: 'bg-blue-600 text-white', desc: 'Average NZ credit profile. Meets standard CCCFA affordability checks.', approvalOdds: 'Good (65-75%)' },
        { name: 'Fair', range: '300 – 499', color: 'bg-amber-500 text-white', desc: 'Higher scrutiny under NZ Credit Contracts and Consumer Finance Act.', approvalOdds: 'Moderate (40-50%)' },
        { name: 'Poor', range: '0 – 299', color: 'bg-red-500 text-white', desc: 'Rebuilding needed; avoid high-cost short-term credit.', approvalOdds: 'Low (<20%)' },
      ],
      bureaus: [
        { name: 'Centrix NZ', role: 'Leading New Zealand Bureau', freeAccessUrl: 'https://www.centrix.co.nz', accessMethod: 'Free online credit report within 48 hours' },
        { name: 'Equifax New Zealand', role: 'Credit Reporting Agency', freeAccessUrl: 'https://www.equifax.co.nz', accessMethod: 'Free statutory credit file within 10-20 working days' },
        { name: 'illion New Zealand', role: 'Credit Reporting Agency', freeAccessUrl: 'https://www.illion.co.nz', accessMethod: 'Free statutory credit file access' },
      ],
      uniqueLegalFeature: 'Credit Contracts and Consumer Finance Act 2003 (CCCFA) requires stringent responsible lending inquiries into past bank statement transaction records.',
      officialStatutoryRight: 'Under the Credit Reporting Privacy Code 2020, every New Zealand individual has the legal right to inspect their complete credit reporting file free of charge.'
    }
  };

  // Actionable Tips by Phase
  const improvementPhases = [
    {
      phase: 'Immediate Impact (0 – 30 Days)',
      badge: 'Fastest Results',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      tips: [
        {
          title: 'Pay Down Balances Before the Statement Closing Date',
          text: 'Credit card companies report your balance to bureaus when your monthly statement is generated, NOT when your payment is due. By making an extra payment 2 to 3 days before your statement closes, you lock in an ultra-low reported balance, dropping your utilization ratio and boosting your score on the next update.',
        },
        {
          title: 'Request a Credit Limit Increase (Without a Hard Pull)',
          text: 'If your income has increased or you have 6+ months of clean payment history with an issuer, request a credit limit increase. Higher credit limits with unchanged spending instantly lowers your utilization ratio. Always confirm with the representative beforehand that it is a "Soft Inquiry".',
        },
        {
          title: 'Dispute Inaccuracies and Outdated Errors on Credit Reports',
          text: 'One in five consumers has an error on their credit report (e.g., incorrect late payment status, outdated address, accounts that belong to another individual with a similar name). Filing an online dispute with supporting bank statements requires bureaus to investigate and delete unverified marks within 30 days.',
        },
        {
          title: 'Become an Authorized User on a Seasoned Account (US & Canada)',
          text: 'If a trusted family member has a credit card with 5+ years of perfect on-time payments and low utilization, being added as an Authorized User (or Supplementary Cardholder) imports the account\'s positive payment history and credit limit onto your credit report.',
        }
      ]
    },
    {
      phase: 'Medium-Term Momentum (1 – 6 Months)',
      badge: 'Structural Building',
      badgeColor: 'bg-blue-100 text-blue-700',
      tips: [
        {
          title: 'Register on the Electoral Roll (UK Specific Rule)',
          text: 'In the United Kingdom, credit reference agencies cross-reference public voter registration to verify your residential address and identity. Registering on the Electoral Roll can add 30 to 50 points to your UK credit score within 1 to 2 months.',
        },
        {
          title: 'Automate 100% On-Time Minimum Payments via Direct Debit',
          text: 'Never rely on memory. Set up automatic bank direct debits for at least the minimum monthly payment on every credit card. Missing a single payment by 30 days causes immediate damage that takes up to 2 years of clean history to substantially recover.',
        },
        {
          title: 'Open a Secured Credit Card or Credit Builder Account',
          text: 'If you have a thin credit file or are recovering from past defaults, a secured credit card (where your refundable cash deposit acts as your credit limit) reports monthly on-time activity to all major bureaus with near-guaranteed approval.',
        },
        {
          title: 'Practice the "AZEO" Method (All Zero Except One)',
          text: 'When preparing for a major mortgage or auto loan application, pay all your credit cards down to $0 balance except for one card, which you leave reporting a balance between 1% and 3% of its limit. This avoids both high utilization penalties and the "all zero" inactivity penalty.',
        }
      ]
    },
    {
      phase: 'Long-Term Mastery (6 – 24 Months)',
      badge: 'Tier-1 Elite Scores (750+ / 800+)',
      badgeColor: 'bg-purple-100 text-purple-700',
      tips: [
        {
          title: 'Space Out Credit Card Applications by at Least 6 Months',
          text: 'Hard inquiries trigger a small score reduction for 12 months. Submitting multiple applications within a brief timeframe signals financial desperation to automated underwriting algorithms. Space applications strategically and only apply when pre-approved.',
        },
        {
          title: 'Keep Oldest No-Fee Accounts Open Indefinitely',
          text: 'The length of your credit history comprises 15% of your score. Preserve your earliest opened credit cards to anchor your Average Age of Accounts (AAoA) and maintain your total available borrowing capacity.',
        },
        {
          title: 'Allow Negative Marks to Age and Naturally Fall Off',
          text: 'Late payments, collections, and defaults lose their mathematical scoring impact significantly after 24 months, and legally expire completely after 6 years (UK/CA/AU/NZ) or 7 years (US). Consistent on-time payments will naturally push your score into prime territory as older blemishes age out.',
        }
      ]
    }
  ];

  // Credit Myths & Truths
  const creditMyths = [
    {
      myth: 'Carrying a small balance from month to month builds your credit score.',
      truth: 'FALSE. This is one of the most widespread and expensive personal finance myths. Credit scoring algorithms look at your reported statement balance, NOT whether you pay interest. Paying your balance in full by the due date gives you 100% of the credit score benefit without paying a single penny in compounding APR interest charges.',
    },
    {
      myth: 'Checking your own credit score or pulling your credit report hurts your score.',
      truth: 'FALSE. Checking your own credit report or using consumer score monitoring tools is strictly classified as a "Soft Inquiry" (soft pull). Soft inquiries are completely invisible to lenders and have zero mathematical impact on your credit score. Only formal credit applications submitted to a lender trigger a "Hard Inquiry".',
    },
    {
      myth: 'Closing an unused credit card improves your credit score.',
      truth: 'FALSE. In fact, closing a credit card usually LOWERS your score because it immediately reduces your total available credit limit (which spikes your overall credit utilization ratio) and will eventually shorten your average age of accounts once the closed account falls off your report.',
    },
    {
      myth: 'Your salary, cash savings, and bank account balance directly determine your credit score.',
      truth: 'FALSE. Credit reference agencies do not track your income, bank account balance, or investment portfolio on your credit report. A person earning $30,000 with a clean 10-year repayment record can have an 800 credit score, while a person earning $300,000 who misses card payments can have a 580 score.',
    },
    {
      myth: 'Using a debit card builds credit history.',
      truth: 'FALSE. Debit card transactions draw money directly from your checking account and are not reported to credit bureaus. Only credit accounts (credit cards, mortgages, auto loans, personal loans, and formal credit builder programs) build your credit report ledger.',
    }
  ];

  const currentCountryModel = countryModelsData[activeScoreBandCountry];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* HEADER SECTION */}
      <header className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Factual & Unbiased Financial Education</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Credit Scores Explained
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          Master how credit scores work mathematically, understand scoring models (FICO, VantageScore, CCR), unpack the 5 core factors that dictate your score, and learn how to pull your official free reports across the <strong>US, Canada, UK, Australia, and New Zealand</strong>.
        </p>

        {/* Sub-Route SEO Navigation Pills */}
        <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'overview', label: '📊 General Hub' },
            { id: 'us', label: '🇺🇸 US FICO & Bureaus' },
            { id: 'uk', label: '🇬🇧 UK Experian & Equifax' },
            { id: 'ca', label: '🇨🇦 Canada TransUnion & Equifax' },
            { id: 'au', label: '🇦🇺 Australia CCR' },
            { id: 'nz', label: '🇳🇿 New Zealand CCCFA' },
            { id: 'factors', label: '⚖️ 5 Core Factors' },
            { id: 'simulator', label: '🚀 Score Simulator' },
          ].map((item) => {
            const isActive =
              (subRoute === item.id) ||
              (!subRoute && item.id === 'overview') ||
              (subRoute === null && item.id === activeScoreBandCountry);
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onSelectSubRoute) {
                    onSelectSubRoute(item.id as CreditScoreSubRoute);
                  }
                  if (['us', 'uk', 'ca', 'au', 'nz'].includes(item.id)) {
                    setSelectedCountry(item.id as CountryCode);
                    setActiveScoreBandCountry(item.id as CountryCode);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Top AdSense Banner */}
      <AdSlotTop slotId="credit-score-top-leaderboard" label="Sponsored Credit Education & Score Monitoring" />

      {/* SECTION 1: WHAT IS A CREDIT SCORE VS REPORT */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase font-semibold text-blue-600">
          <Info className="w-4 h-4" />
          <span>Foundation Concept</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            What is a Credit Score?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
            A <strong>credit score</strong> is a three-digit numerical summary calculated by statistical algorithms to predict the likelihood that a borrower will become 90+ days delinquent on a debt within the subsequent 24 months. It transforms hundreds of data points in your credit history into a standardized risk metric for lenders.
          </p>
        </div>

        {/* Credit Report vs Credit Score Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3>The Credit Report (The Historical Ledger)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your credit report is a detailed, itemized record of your borrowing history maintained by credit reference bureaus. It lists every credit account opened, credit limits, historical balances, payment timeliness, public records (bankruptcies, liens, court judgments), and recent credit inquiries.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-semibold text-slate-900 block">Contains:</span>
              <p>• Full payment timestamps for up to 6–7 years</p>
              <p>• Registered addresses & identity verification data</p>
              <p>• Historical credit limits and high balances</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3>The Credit Score (The Mathematical Rating)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your credit score is the proprietary mathematical formula (such as FICO, VantageScore, or Equifax Risk Score) that reads the raw data in your credit report at a specific second in time and outputs a numerical rating of your creditworthiness.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-semibold text-slate-900 block">Determines:</span>
              <p>• Credit card approval odds and credit line limits</p>
              <p>• Mortgage, auto loan, and personal loan interest rates</p>
              <p>• Rental lease approvals and mobile phone contract terms</p>
            </div>
          </div>
        </div>
      </section>

      {/* AD BANNER */}
      <AdSlotBetweenSections slotId="credit-score-section-break" label="Sponsored Scoring Tools & Credit Monitoring" />

      {/* SECTION 2: 5 CORE FACTORS BREAKDOWN */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-blue-600 mb-1">
            <PieChart className="w-4 h-4" />
            <span>Mathematical Formula Weightings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            The 5 Core Factors That Impact Your Credit Score
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
            While specific algorithms vary by jurisdiction and bureau, the vast majority of international credit models derive their calculations from five foundational pillars. Click any factor below to explore its mechanics, mathematical impact, and actionable rules:
          </p>
        </div>

        {/* Factor Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {scoringFactors.map((factor, idx) => (
            <button
              key={factor.id}
              onClick={() => setActiveFactor(idx)}
              className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                activeFactor === idx
                  ? 'bg-blue-50 border-blue-500 shadow-xs ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-mono font-bold text-blue-600">0{idx + 1}.</span>
                  <span className="text-xs font-bold text-slate-900">{factor.weight}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{factor.name}</h3>
              </div>
              <span className={`text-[10px] font-semibold mt-2 px-1.5 py-0.5 rounded border inline-block w-fit ${factor.impactColor}`}>
                {factor.impact}
              </span>
            </button>
          ))}
        </div>

        {/* Active Factor Deep Dive Card */}
        {scoringFactors[activeFactor] && (
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {scoringFactors[activeFactor].name}
                  </h3>
                  <span className="text-sm font-bold text-blue-600">
                    ({scoringFactors[activeFactor].weight} of Total Score)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  {scoringFactors[activeFactor].summary}
                </p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto ${scoringFactors[activeFactor].impactColor}`}>
                {scoringFactors[activeFactor].impact}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {scoringFactors[activeFactor].details}
            </p>

            {/* Mathematical Insight Callout */}
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-blue-800 uppercase tracking-wider text-[11px]">
                <Sparkles className="w-4 h-4 text-blue-600" /> Mathematical Scoring Insight:
              </span>
              <p className="leading-relaxed">{scoringFactors[activeFactor].mathInsight}</p>
            </div>

            {/* Key Rules Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-900">Key Rules & Regulatory Mechanics:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {scoringFactors[activeFactor].keyRules.map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Golden Rule */}
            <div className="p-3.5 bg-white rounded-lg border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Actionable Implementation Strategy: </strong>
                <span>{scoringFactors[activeFactor].actionItem}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3: SCORING MODELS & JURISDICTION BANDS */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-semibold text-blue-600 mb-1">
              <Landmark className="w-4 h-4" />
              <span>International Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Credit Scoring Models Across 5 Countries
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Explore the exact scoring scales, approval tier odds, and reporting agencies for your chosen territory.
            </p>
          </div>

          {/* Mini Country Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {COUNTRY_LIST.map((c) => (
              <button
                key={c.code}
                onClick={() => setActiveScoreBandCountry(c.code)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  activeScoreBandCountry === c.code
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.code ? c.code.toUpperCase() : ''}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Country Scoring Architecture Card */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{COUNTRIES_DATA[activeScoreBandCountry].flag}</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {COUNTRIES_DATA[activeScoreBandCountry].name}: {currentCountryModel.modelName}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Standard Range Scale: {currentCountryModel.scoreRange}
              </p>
            </div>
            <div className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
              Primary Regulator: {COUNTRIES_DATA[activeScoreBandCountry].regulator.abbreviation}
            </div>
          </div>

          {/* Score Tiers Visual Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-900">
              {COUNTRIES_DATA[activeScoreBandCountry].name} Credit Rating Tiers & Approval Odds:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {currentCountryModel.tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-3 shadow-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${tier.color}`}>
                        {tier.name}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 font-mono">
                      {tier.range}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-500 block">Approval Odds:</span>
                    <span className="font-semibold text-slate-900">{tier.approvalOdds}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory and Legal Feature */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>Sovereign Consumer Rights & Regulatory Context:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {currentCountryModel.uniqueLegalFeature}
            </p>
            <p className="text-slate-500 text-[11px] border-t border-slate-100 pt-2 leading-relaxed">
              <strong>Statutory Right:</strong> {currentCountryModel.officialStatutoryRight}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW TO OBTAIN FREE OFFICIAL CREDIT REPORTS & SCORES */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-blue-600 mb-1">
            <Lock className="w-4 h-4" />
            <span>Official & 100% Free Portals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How to Obtain Your Credit Reports & Scores Officially
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
            Never pay for deceptive monthly credit monitoring trials. In all five sovereign markets, statutory legislation guarantees consumers free access to their official credit disclosures directly from authorized reference bodies.
          </p>
        </div>

        {/* 5 Countries Official Bureau Directories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNTRY_LIST.map((c) => {
            const data = countryModelsData[c.code];
            const isSelected = selectedCountry === c.code;
            return (
              <div
                key={c.code}
                className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                  isSelected
                    ? 'bg-blue-50/40 border-blue-400 ring-1 ring-blue-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Selected Region
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {data.bureaus.map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{b.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{b.role}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{b.accessMethod}</p>
                        <a
                          href={b.freeAccessUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 pt-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                  <span>Enforced by: {c.regulator.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Adverse Action Notice / Dispute Process Walkthrough */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3>Statutory Dispute Rights & Adverse Action Protections</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            If you are rejected for a credit card, loan, or offered an elevated interest rate, consumer protection laws mandate that the lender provide a formal <strong>Adverse Action Notice</strong> (US: FCRA, UK: FCA rules, CA: FCAC, AU: Privacy Act, NZ: Privacy Code). This notice must disclose the exact credit bureau used, the credit score pulled, and the top 4 key factors that negatively affected your score.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">1. Identify the Discrepancy</span>
              <p className="text-slate-600">Review all 3 bureau reports for incorrect late marks, incorrect balances, or unauthorized accounts.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">2. File an Online Dispute</span>
              <p className="text-slate-600">Submit a dispute directly on the bureau portal with supporting bank receipts and statement PDFs.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block mb-0.5">3. 30-Day Resolution</span>
              <p className="text-slate-600">By law, bureaus must verify the debt with the furnisher within 30 days or delete the unverified item.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ACTIONABLE TIPS FOR IMPROVING CREDIT SCORES */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-blue-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Evidence-Based Strategy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Actionable Roadmap: How to Improve Your Credit Score
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
            Follow this chronological, evidence-based roadmap to optimize your credit profile from rapid short-term score jumps to long-term prime tier stability:
          </p>
        </div>

        {/* 3 Phased Cards */}
        <div className="space-y-6">
          {improvementPhases.map((phase, pIdx) => (
            <div
              key={pIdx}
              className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    0{pIdx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {phase.phase}
                  </h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${phase.badgeColor}`}>
                  {phase.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.tips.map((tip, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs"
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip.title}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed pl-6">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CREDIT MYTHBUSTERS & FAQ */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-blue-600 mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Debunking Common Misconceptions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Credit Score Mythbusters
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
            Financial folklore causes millions of consumers to unnecessarily pay interest or damage their credit standing. Here are the facts backed by credit bureau algorithms:
          </p>
        </div>

        <div className="space-y-3">
          {creditMyths.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase text-red-700 tracking-wide">Myth:</span>
                  <p className="text-sm font-bold text-slate-900">{item.myth}</p>
                </div>
              </div>
              <div className="pl-6 border-l-2 border-emerald-500 ml-2 py-1 text-xs text-slate-700 leading-relaxed bg-emerald-50/40 p-3 rounded-r-lg">
                <strong className="text-emerald-800 font-semibold block mb-0.5">The Factual Reality:</strong>
                <span>{item.truth}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE CTA BAR */}
      <section className="bg-blue-600 text-white rounded-xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold">
            Simulate Your Payoff & Utilization Math
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Use our interactive, mathematical calculators to calculate exact utilization ratios, optimize 0% balance transfers, and map out your fastest debt payoff timeline.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          {onNavigateToCalculators && (
            <button
              onClick={onNavigateToCalculators}
              className="px-5 py-2.5 rounded-lg bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-xs transition-colors"
            >
              Open Financial Calculators →
            </button>
          )}
          {openAiAssistant && (
            <button
              onClick={openAiAssistant}
              className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs border border-blue-500 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask AI About Your Country's Scoring</span>
            </button>
          )}
        </div>
      </section>
      {/* Mid-Page Ad Slot */}
      <AdSlotBetweenSections slotId="credit-score-mid-billboard" label="Sponsored Credit Repair & Monitoring Tools" />

      {/* Trust & Transparency Disclosure */}
      <TrustDisclosureBox
        publishedDate="2026-06-01"
        lastUpdatedDate="2026-09-01"
        lastVerifiedDate="2026-09-01"
        verificationStatus="VERIFIED"
        regulatoryBody="Statutory Consumer Reporting Oversight Authorities (US CFPB, UK FCA/ICO, CA FCAC, AU OAIC/ASIC, NZ Privacy Commissioner)"
        sources={[
          {
            title: 'Official Fair Credit Reporting Act (FCRA 15 U.S.C. § 1681) & CFPB Supervisory Guidance',
            isOfficial: true,
          },
          {
            title: 'UK Consumer Credit Act 1974 & FCA Handbook Sourcebook CONC',
            isOfficial: true,
          },
          {
            title: 'Australian Privacy (Credit Reporting) Code & National Consumer Credit Protection Act 2009',
            isOfficial: true,
          },
          {
            title: 'New Zealand Credit Reporting Privacy Code 2020 & CCCFA 2003',
            isOfficial: true,
          },
          {
            title: 'Canadian Bank Act & Financial Consumer Agency of Canada (FCAC) Credit Assessment Rules',
            isOfficial: true,
          },
        ]}
      />

      {/* Bottom AdSense Banner */}
      <AdSlotBottom slotId="credit-score-bottom-leaderboard" label="Sponsored Educational Resources" />
    </div>
  );
};
