import React, { useMemo } from 'react';
import { ActiveTab, CardCategory, CountryCode, CreditCardItem, FinancialGuide, NewsItem } from '../../types';
import { COUNTRY_LIST, COUNTRIES_DATA } from '../../data/countries';
import { CATEGORIES_DATA } from '../../data/categories';
import { CREDIT_CARDS_DATA } from '../../data/cards';
import { FINANCIAL_GUIDES_DATA } from '../../data/guides';
import { NEWS_AND_TRENDS_DATA } from '../../data/news';
import { 
  CreditCard, 
  Globe2, 
  ShieldCheck, 
  Calculator, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  TrendingDown, 
  Layers, 
  CheckCircle2, 
  Percent,
  Search,
  Award,
  Newspaper,
  Calendar,
  Tag,
  Scale,
  Clock
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotInContent, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';
import { CardVisual } from '../cards/CardVisual';

interface HomeViewProps {
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCategory: (category: CardCategory) => void;
  onSelectCard: (card: CreditCardItem) => void;
  onSelectGuide: (guide: FinancialGuide) => void;
  onSelectNews?: (news: NewsItem) => void;
  onSelectCalculator?: (calcId: string) => void;
  openSearch: () => void;
  openAiAssistant: () => void;
  openCountryModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedCountry,
  setSelectedCountry,
  setActiveTab,
  onSelectCategory,
  onSelectCard,
  onSelectGuide,
  onSelectNews,
  onSelectCalculator,
  openSearch,
  openAiAssistant,
  openCountryModal,
}) => {
  const currentCountry = COUNTRIES_DATA[selectedCountry];
  const featuredCards = CREDIT_CARDS_DATA.filter((c) => c.country === selectedCountry).slice(0, 3);
  const topGuides = FINANCIAL_GUIDES_DATA.slice(0, 3);
  
  const latestNews = useMemo(() => {
    const countrySpecific = NEWS_AND_TRENDS_DATA.filter(
      (n) => n.country === selectedCountry || n.country === 'global'
    );
    return (countrySpecific.length > 0 ? countrySpecific : NEWS_AND_TRENDS_DATA).slice(0, 3);
  }, [selectedCountry]);

  const POPULAR_TOPICS = [
    { label: '0% Balance Transfers', tab: 'calculators' as ActiveTab, category: 'balance-transfer' as CardCategory },
    { label: 'How Credit Card Interest Works', tab: 'guides' as ActiveTab, guideSlug: 'how-credit-card-interest-works' },
    { label: 'What Is APR?', tab: 'guides' as ActiveTab, guideSlug: 'what-is-apr-annual-percentage-rate' },
    { label: 'Credit Utilization Ratio (1%–9%)', tab: 'calculators' as ActiveTab },
    { label: 'FICO vs VantageScore vs CCR', tab: 'credit-score' as ActiveTab },
    { label: 'Section 75 & Chargeback Rights', tab: 'guides' as ActiveTab, guideSlug: 'international-credit-card-consumer-rights-laws' },
    { label: 'No Annual Fee Cards', tab: 'cards' as ActiveTab, category: 'no-annual-fee' as CardCategory },
    { label: 'Zero Foreign Transaction Fee', tab: 'cards' as ActiveTab, category: 'travel' as CardCategory },
    { label: 'Holiday Shopping Strategies', tab: 'news' as ActiveTab },
  ];

  return (
    <div className="space-y-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Free Independent Information, Comparisons & Financial Tools</span>
            </div>

            {/* Main Headline (Section 7 specification) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Understand Credit Cards. <br className="hidden sm:inline" />
              <span className="text-blue-600">Compare Your Options.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              We provide free, independent financial education, factual side-by-side card matrix comparisons, and mathematical calculators across 5 sovereign jurisdictions with zero commercial bias.
            </p>

            {/* Primary Action Buttons (Section 7 specification) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('compare')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Compare Credit Cards</span>
              </button>

              <button
                onClick={() => setActiveTab('calculators')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-2xs transition-colors flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-slate-600" />
                <span>Use a Calculator</span>
              </button>

              <button
                onClick={() => setActiveTab('guides')}
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>Explore Guides</span>
              </button>
            </div>

            {/* Search Trigger Bar */}
            <div className="pt-2">
              <button
                onClick={openSearch}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 flex items-center gap-3 text-xs sm:text-sm font-medium transition-all group"
              >
                <Search className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Search cards, interest rules, balance transfers, calculators, and news...</span>
                <kbd className="hidden sm:inline px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400">
                  Ctrl+K
                </kbd>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner AdSlot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlotTop slotId="home-top-leaderboard" label="Sponsored Financial Comparisons & Banking Products" />
      </div>

      {/* 2. COUNTRY SELECTOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 block mb-0.5">
              Sovereign Market Selector
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Select Your Country Jurisdiction
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('countries')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <span>Compare Sovereign Regulations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {COUNTRY_LIST.map((c) => {
            const isSelected = selectedCountry === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.flag}</span>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      Active
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {c.currency.code} ({c.currency.symbol}) • {c.regulator.abbreviation}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 block mb-0.5">
              Verified Product Types
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Featured Credit Card Categories
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('cards')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES_DATA.filter((cat) => cat.id !== 'all').slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                setActiveTab('cards');
              }}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {cat.shortDesc}
                </p>
              </div>
              <span className="mt-3 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                <span>Browse Category</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. POPULAR CALCULATORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-blue-600 block mb-0.5">
              Financial Simulation Tools
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Popular Financial Calculators
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('calculators')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <span>Launch All 6 Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calc 1 */}
          <div
            onClick={() => {
              if (onSelectCalculator) onSelectCalculator('payoff');
              else setActiveTab('calculators');
            }}
            className="p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Debt Payoff & Compound Interest
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Model exact payoff timelines, compound interest expenses, and compare Debt Avalanche vs Debt Snowball strategies.
              </p>
            </div>
            <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
              <span>Open Payoff Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Calc 2 */}
          <div
            onClick={() => {
              if (onSelectCalculator) onSelectCalculator('balance-transfer');
              else setActiveTab('calculators');
            }}
            className="p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                0% Balance Transfer Net Savings
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Determine if transferring a balance makes financial sense after deducting 3% upfront transfer fees across 12–28 months.
              </p>
            </div>
            <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
              <span>Open Transfer Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Calc 3 */}
          <div
            onClick={() => {
              if (onSelectCalculator) onSelectCalculator('utilization');
              else setActiveTab('calculators');
            }}
            className="p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Credit Utilization Health Gauge
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Assess per-card and total credit line utilization against the 1%–9% optimal score optimization threshold.
              </p>
            </div>
            <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
              <span>Open Utilization Gauge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* 5. FEATURED COMPARISONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
              <span>{currentCountry.flag}</span>
              <span>{currentCountry.name} Featured Comparison</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Side-by-Side Product Profiles in {currentCountry.name}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('compare')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <span>Open Custom Comparison Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group space-y-4"
            >
              <div>
                {/* Visual Realistic Card Mockup */}
                <div
                  onClick={() => onSelectCard(card)}
                  className="cursor-pointer mb-3.5 transform group-hover:scale-[1.02] transition-transform duration-200"
                >
                  <CardVisual card={card} size="sm" />
                </div>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-semibold truncate block max-w-[180px]">
                      {card.issuer}
                    </span>
                    <h3
                      onClick={() => onSelectCard(card)}
                      className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {card.name}
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600 uppercase shrink-0">
                    {card.network}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {card.editorialSummary}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Annual Fee
                    </span>
                    <p className="font-bold text-slate-900">
                      {card.annualFee === 0
                        ? 'No Annual Fee'
                        : `${currentCountry.currency.symbol}${card.annualFee}`}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      {currentCountry.terminology.interestRateLabel.split('(')[0]}
                    </span>
                    <p className="font-bold text-blue-600">{card.regularApr.rateDisplay}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCard(card)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-200 hover:border-blue-600 shadow-2xs"
              >
                <span>View Full Profile Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST FINANCIAL GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-blue-600 block mb-0.5">
              Evergreen Financial Literacy
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Essential Credit & Debt Guides
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('guides')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <span>Read All Evergreen Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onSelectGuide(guide)}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                  {guide.category} • {guide.readingTimeMinutes} min read
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LATEST NEWS / TRENDS (With Publication & Update Dates) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-amber-700 block mb-0.5">
              Market Intelligence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Latest Card News, Benefit Changes & Regulatory Watch
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('news')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <span>View All News & Trends</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <article
              key={news.id}
              onClick={() => {
                if (onSelectNews) {
                  onSelectNews(news);
                } else {
                  setActiveTab('news');
                }
              }}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200/60">
                    {news.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{news.publishedDate}</span>
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {news.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {news.snippet}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                <span>Read Coverage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mid Section Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlotBetweenSections slotId="home-mid-billboard" label="Sponsored Banking Comparison Features" />
      </div>

      {/* 8. POPULAR CREDIT-CARD TOPICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="border-t border-slate-200 pt-8">
          <span className="text-xs uppercase font-bold text-slate-400 block mb-2">
            Popular Credit Card Inquiries & Discovery Topics
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {POPULAR_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (topic.category) onSelectCategory(topic.category);
                  if (topic.guideSlug) {
                    const g = FINANCIAL_GUIDES_DATA.find((item) => item.slug === topic.guideSlug);
                    if (g) onSelectGuide(g);
                  }
                  setActiveTab(topic.tab);
                }}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 text-slate-700 text-xs font-medium border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Disclosure Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustDisclosureBox
          publishedDate="2026-05-01"
          lastUpdatedDate="2026-09-01"
          lastVerifiedDate="2026-09-01"
          verificationStatus="VERIFIED"
          regulatoryBody={`${currentCountry.regulator.name} (${currentCountry.regulator.abbreviation})`}
          sources={[
            {
              title: `${currentCountry.regulator.name} Consumer Guidance Portal`,
              url: currentCountry.regulator.officialPortal,
              isOfficial: true,
            },
            {
              title: 'Central Bank Statutory Policy Announcements',
              isOfficial: true,
            },
          ]}
        />
      </div>

      {/* 9. EDUCATIONAL DISCLAIMER (No promises of approval/savings) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
            <Scale className="w-4 h-4 text-slate-600" />
            <span>Independent Educational Notice & Regulatory Disclosure</span>
          </div>
          <p>
            This platform provides independent educational information, computational simulation tools, and factual credit card product disclosures. <strong>We do not provide personalized financial, legal, or credit advice, and we make no representations, warranties, or promises of credit card approval, specific interest savings, or financial outcomes.</strong> Credit card terms, interest rates (APRs), fees, and promotional offers are subject to individual applicant credit evaluation and underwriting criteria established solely by licensed card issuers.
          </p>
        </div>
      </section>

      {/* AdSense Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlotBottom slotId="home-bottom-leaderboard" label="Sponsored Financial Services" />
      </div>
    </div>
  );
};
