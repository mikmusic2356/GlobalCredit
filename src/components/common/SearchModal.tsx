import React, { useState, useMemo, useEffect } from 'react';
import { 
  ActiveTab, 
  CountryCode, 
  CreditCardItem, 
  FinancialGuide, 
  NewsItem,
  CardCategory 
} from '../../types';
import { CREDIT_CARDS_DATA } from '../../data/cards';
import { FINANCIAL_GUIDES_DATA } from '../../data/guides';
import { NEWS_AND_TRENDS_DATA } from '../../data/news';
import { COUNTRIES_DATA } from '../../data/countries';
import { 
  Search, 
  X, 
  CreditCard, 
  BookOpen, 
  Calculator, 
  Globe2, 
  Layers, 
  Newspaper, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryCode;
  onSelectCountry: (country: CountryCode) => void;
  onSelectCard: (card: CreditCardItem) => void;
  onSelectGuide: (guide: FinancialGuide) => void;
  onSelectNews?: (news: NewsItem) => void;
  onSelectCalculator?: (calcId: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectCategory?: (cat: CardCategory) => void;
}

export type SearchContentType = 
  | 'all' 
  | 'card' 
  | 'guide' 
  | 'calculator' 
  | 'country' 
  | 'category' 
  | 'news';

interface SearchResultItem {
  id: string;
  type: 'card' | 'guide' | 'calculator' | 'country' | 'category' | 'news';
  typeLabel: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  metadata?: string;
  action: () => void;
}

const CALCULATORS_INDEX = [
  {
    id: 'payoff',
    name: 'Debt Payoff & Compound Interest Calculator',
    desc: 'Simulate repayment timelines, compound interest costs, and debt avalanche vs snowball methods.',
    keywords: ['debt payoff', 'interest', 'compound interest', 'avalanche', 'snowball', 'minimum payment', 'repayment schedule'],
  },
  {
    id: 'balance-transfer',
    name: '0% Balance Transfer Savings Calculator',
    desc: 'Calculate exact net interest savings minus upfront transfer fees across 0% promo periods.',
    keywords: ['balance transfer', '0% apr', 'transfer fee', 'debt consolidation', 'promo period', 'interest savings'],
  },
  {
    id: 'utilization',
    name: 'Credit Utilization Ratio Health Gauge',
    desc: 'Measure per-card and aggregate credit utilization against the optimal 1%–9% scoring threshold.',
    keywords: ['credit utilization', 'utilization ratio', 'credit score', 'fico', 'available limit', 'statement balance'],
  },
  {
    id: 'intro-plan',
    name: '0% Intro Purchase APR Planning Calculator',
    desc: 'Plan large upcoming purchases with zero interest and determine the exact monthly repayment needed.',
    keywords: ['intro purchase apr', '0% intro', 'large purchase', 'zero percent', 'installment planning'],
  },
  {
    id: 'foreign-fee',
    name: 'Foreign Transaction Fee (FX) Surcharge Calculator',
    desc: 'Calculate foreign currency transaction markups and compare 0% FX cards against standard 3% fees.',
    keywords: ['foreign transaction fee', 'fx fee', 'overseas currency', 'travel fee', 'exchange rate markup', 'dcc'],
  },
  {
    id: 'rewards',
    name: 'Rewards & Cash Back Value Estimator',
    desc: 'Estimate annual net cash back earnings across groceries, dining, travel, and gas spending.',
    keywords: ['rewards value', 'cash back estimator', 'points value', 'annual fee offset', 'spend categories'],
  },
];

const CATEGORIES_INDEX: { id: CardCategory; name: string; desc: string; keywords: string[] }[] = [
  { id: 'cash-back', name: 'Cash Back Cards', desc: 'Cards offering direct statement credits on everyday spending categories.', keywords: ['cash back', 'cashback', 'statement credit', 'rebate'] },
  { id: 'travel', name: 'Travel & Airline Cards', desc: 'Cards featuring zero foreign transaction fees, travel protections, and points.', keywords: ['travel', 'airlines', 'flights', 'points', 'miles', 'hotels', 'zero fx'] },
  { id: 'zero-intro-apr', name: '0% Intro APR Cards', desc: 'Cards offering 0% introductory interest on new purchases and balance transfers.', keywords: ['0% apr', 'zero apr', 'introductory rate', 'no interest'] },
  { id: 'balance-transfer', name: 'Balance Transfer Cards', desc: 'Consolidate high-interest debt with promotional 0% balance transfer offers.', keywords: ['balance transfer', 'debt consolidation', 'transfer debt'] },
  { id: 'no-annual-fee', name: 'No Annual Fee Cards', desc: 'Build credit and earn rewards with $0 yearly account maintenance charges.', keywords: ['no fee', 'no annual fee', '$0 fee', 'free card'] },
  { id: 'student', name: 'Student Credit Cards', desc: 'Accessible credit cards designed for university students building first credit.', keywords: ['student', 'college', 'young adult', 'starter card'] },
  { id: 'business', name: 'Small Business Cards', desc: 'Cards with high limits, employee cards, and business expense categorization.', keywords: ['business', 'commercial', 'corporate', 'small business'] },
  { id: 'secured', name: 'Secured & Credit Builder Cards', desc: 'Cards backed by a security deposit for establishing or rebuilding credit scores.', keywords: ['secured card', 'credit builder', 'deposit', 'rebuild credit', 'poor credit'] },
  { id: 'low-interest', name: 'Low Interest Rate Cards', desc: 'Standard credit cards with lowest ongoing fixed or variable purchase APRs.', keywords: ['low apr', 'low interest', 'cheap borrowing'] },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry,
  onSelectCard,
  onSelectGuide,
  onSelectNews,
  onSelectCalculator,
  onNavigateTab,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<SearchContentType>('all');
  const [filterCountry, setFilterCountry] = useState<CountryCode | 'all'>(selectedCountry);

  // Sync default filter country
  useEffect(() => {
    setFilterCountry(selectedCountry);
  }, [selectedCountry]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo<SearchResultItem[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const items: SearchResultItem[] = [];

    // 1. CARDS
    if (selectedType === 'all' || selectedType === 'card') {
      CREDIT_CARDS_DATA.forEach((card) => {
        const matchCountry = filterCountry === 'all' || card.country === filterCountry;
        const matchText =
          card.name.toLowerCase().includes(q) ||
          card.issuer.toLowerCase().includes(q) ||
          card.editorialSummary?.toLowerCase().includes(q) ||
          card.categories?.some((cat) => cat.toLowerCase().includes(q)) ||
          card.keyPerks?.some((p) => p.toLowerCase().includes(q));

        if (matchCountry && matchText) {
          const cardCountry = COUNTRIES_DATA[card.country];
          items.push({
            id: card.id,
            type: 'card',
            typeLabel: 'Credit Card',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            title: `${card.name} ${cardCountry.flag}`,
            subtitle: `${card.issuer} • Annual Fee: ${card.annualFee === 0 ? 'No Fee' : `${cardCountry.currency.symbol}${card.annualFee}`} • ${card.regularApr.rateDisplay}`,
            metadata: card.editorialSummary,
            action: () => {
              onSelectCard(card);
              onClose();
            },
          });
        }
      });
    }

    // 2. GUIDES
    if (selectedType === 'all' || selectedType === 'guide') {
      FINANCIAL_GUIDES_DATA.forEach((guide) => {
        const matchText =
          guide.title.toLowerCase().includes(q) ||
          guide.summary.toLowerCase().includes(q) ||
          guide.category.toLowerCase().includes(q) ||
          guide.sections.some((s) => s.heading.toLowerCase().includes(q) || s.body.toLowerCase().includes(q));

        if (matchText) {
          items.push({
            id: guide.id,
            type: 'guide',
            typeLabel: 'Finance Guide',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            title: guide.title,
            subtitle: `${guide.category} • ${guide.readingTimeMinutes} min read`,
            metadata: guide.summary,
            action: () => {
              onSelectGuide(guide);
              onClose();
            },
          });
        }
      });
    }

    // 3. CALCULATORS
    if (selectedType === 'all' || selectedType === 'calculator') {
      CALCULATORS_INDEX.forEach((calc) => {
        const matchText =
          calc.name.toLowerCase().includes(q) ||
          calc.desc.toLowerCase().includes(q) ||
          calc.keywords.some((kw) => kw.toLowerCase().includes(q));

        if (matchText) {
          items.push({
            id: `calc-${calc.id}`,
            type: 'calculator',
            typeLabel: 'Financial Calculator',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            title: calc.name,
            subtitle: calc.desc,
            metadata: 'Interactive Financial Simulation Tool',
            action: () => {
              if (onSelectCalculator) {
                onSelectCalculator(calc.id);
              } else {
                onNavigateTab('calculators');
              }
              onClose();
            },
          });
        }
      });
    }

    // 4. COUNTRIES
    if (selectedType === 'all' || selectedType === 'country') {
      (Object.keys(COUNTRIES_DATA) as CountryCode[]).forEach((code) => {
        const c = COUNTRIES_DATA[code];
        const matchText =
          c.name.toLowerCase().includes(q) ||
          c.regulator.name.toLowerCase().includes(q) ||
          c.creditScoreSystem.name.toLowerCase().includes(q) ||
          c.currency.name.toLowerCase().includes(q) ||
          code.toLowerCase() === q;

        if (matchText) {
          items.push({
            id: `country-${code}`,
            type: 'country',
            typeLabel: 'Country Hub',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            title: `${c.flag} ${c.name} Financial Hub`,
            subtitle: `Regulator: ${c.regulator.name} • Scoring: ${c.creditScoreSystem.name} • Currency: ${c.currency.code}`,
            metadata: `Explore sovereign card data, regulations, and credit score guidelines for ${c.name}.`,
            action: () => {
              onSelectCountry(code);
              onNavigateTab('countries');
              onClose();
            },
          });
        }
      });
    }

    // 5. CATEGORIES
    if (selectedType === 'all' || selectedType === 'category') {
      CATEGORIES_INDEX.forEach((cat) => {
        const matchText =
          cat.name.toLowerCase().includes(q) ||
          cat.desc.toLowerCase().includes(q) ||
          cat.keywords.some((kw) => kw.toLowerCase().includes(q));

        if (matchText) {
          items.push({
            id: `cat-${cat.id}`,
            type: 'category',
            typeLabel: 'Card Category',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            title: cat.name,
            subtitle: cat.desc,
            metadata: 'Verified category index and card comparisons.',
            action: () => {
              if (onSelectCategory) onSelectCategory(cat.id);
              onNavigateTab('cards');
              onClose();
            },
          });
        }
      });
    }

    // 6. NEWS
    if (selectedType === 'all' || selectedType === 'news') {
      NEWS_AND_TRENDS_DATA.forEach((news) => {
        const matchText =
          news.title.toLowerCase().includes(q) ||
          news.snippet.toLowerCase().includes(q) ||
          news.category.toLowerCase().includes(q) ||
          (news.tags && news.tags.some((t) => t.toLowerCase().includes(q)));

        if (matchText) {
          items.push({
            id: news.id,
            type: 'news',
            typeLabel: 'News & Trends',
            badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
            title: news.title,
            subtitle: `${news.category} • Published: ${news.publishedDate} ${news.lastUpdatedDate ? `• Updated: ${news.lastUpdatedDate}` : ''}`,
            metadata: news.snippet,
            action: () => {
              if (onSelectNews) {
                onSelectNews(news);
              } else {
                onNavigateTab('news');
              }
              onClose();
            },
          });
        }
      });
    }

    return items;
  }, [query, selectedType, filterCountry, onSelectCard, onSelectGuide, onSelectNews, onSelectCountry, onNavigateTab, onSelectCategory, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across Cards, Guides, Calculators, Countries, Categories, News..."
            className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded bg-slate-100 transition-colors shrink-0"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Type Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto text-xs no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold uppercase text-slate-400 mr-1">Type:</span>
            {[
              { id: 'all', label: 'All Types' },
              { id: 'card', label: 'Cards' },
              { id: 'guide', label: 'Guides' },
              { id: 'calculator', label: 'Calculators' },
              { id: 'country', label: 'Countries' },
              { id: 'category', label: 'Categories' },
              { id: 'news', label: 'News' },
            ].map((tab) => {
              const active = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id as SearchContentType)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold uppercase text-slate-400 mr-0.5">Region:</span>
            {(['all', 'us', 'ca', 'uk', 'au', 'nz'] as const).map((cc) => (
              <button
                key={cc}
                onClick={() => setFilterCountry(cc)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase transition-colors ${
                  filterCountry === cc
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cc === 'all' ? 'All' : COUNTRIES_DATA[cc].flag}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 bg-slate-50/50">
          {!query.trim() ? (
            <div className="py-10 text-center space-y-4">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Popular Inquiries & Quick Discovery
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
                {[
                  '0% Balance Transfer',
                  'What Is APR?',
                  'Credit Utilization Ratio',
                  'Debt Payoff Calculator',
                  'Cash Back vs Points',
                  'FICO vs VantageScore',
                  'UK Section 75 Protection',
                  'Zero Foreign Transaction Fees',
                  'Holiday Shopping Protections',
                  'New Card Launches',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 text-slate-700 text-xs font-medium border border-slate-200 shadow-2xs transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <p className="text-sm font-semibold text-slate-700">No verified results found for "{query}"</p>
              <p className="text-xs text-slate-400">
                Try searching for specific topics like "APR", "Chase", "Balance Transfer", or "Debt Calculator".
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Found <strong>{results.length}</strong> matching verified results</span>
                <span className="text-[11px] text-slate-400">Click any result to view details</span>
              </div>

              <div className="space-y-2">
                {results.map((item) => (
                  <div
                    key={item.id}
                    onClick={item.action}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${item.badgeColor}`}>
                          {item.typeLabel}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1">
                        {item.subtitle}
                      </p>

                      {item.metadata && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {item.metadata}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 pt-1 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px]">ESC</kbd> to close</span>
          <span>100% Independent & Verified Data</span>
        </div>

      </div>
    </div>
  );
};
