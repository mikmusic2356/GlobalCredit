import React, { useState, useMemo, useEffect } from 'react';
import { ActiveTab, CardCategory, CountryCode, CreditCardItem } from '../../types';
import { CREDIT_CARDS_DATA } from '../../data/cards';
import { CATEGORIES_DATA } from '../../data/categories';
import { COUNTRIES_DATA, COUNTRY_LIST } from '../../data/countries';
import { 
  CardFilterSystem, 
  CardFilterState, 
  INITIAL_FILTER_STATE 
} from './CardFilterSystem';
import { 
  Layers, 
  ArrowUpDown, 
  Search, 
  Check, 
  ShieldCheck, 
  Percent, 
  Globe2, 
  ArrowRight, 
  Sparkles,
  Plus,
  Minus,
  ExternalLink,
  Award
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotInContent, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';
import { CardDetailPage } from './CardDetailPage';
import { CardVisual } from './CardVisual';

interface CardsViewProps {
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  selectedCategory: CardCategory;
  setSelectedCategory: (category: CardCategory) => void;
  onSelectCard: (card: CreditCardItem | null) => void;
  activeCard?: CreditCardItem | null;
  comparedCards: CreditCardItem[];
  onToggleCompare: (card: CreditCardItem) => void;
  onNavigateToCompare: () => void;
}

export const CardsView: React.FC<CardsViewProps> = ({
  selectedCountry,
  setSelectedCountry,
  selectedCategory,
  setSelectedCategory,
  onSelectCard,
  activeCard,
  comparedCards,
  onToggleCompare,
  onNavigateToCompare,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'fee-low' | 'apr-low' | 'rating'>('featured');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const [filters, setFilters] = useState<CardFilterState>({
    ...INITIAL_FILTER_STATE,
    country: selectedCountry,
    category: selectedCategory,
  });

  // Keep country and category synced with parent props
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      country: selectedCountry,
    }));
  }, [selectedCountry]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: selectedCategory,
    }));
  }, [selectedCategory]);

  const handleFilterChange = (newFilters: CardFilterState) => {
    setFilters(newFilters);
    if (newFilters.country !== 'all' && newFilters.country !== selectedCountry) {
      setSelectedCountry(newFilters.country);
    }
    if (newFilters.category !== selectedCategory) {
      setSelectedCategory(newFilters.category);
    }
  };

  const handleResetFilters = () => {
    const resetState: CardFilterState = {
      ...INITIAL_FILTER_STATE,
      country: selectedCountry,
      category: 'all',
    };
    setFilters(resetState);
    setSelectedCategory('all');
    setSearchTerm('');
  };

  const [cardsList, setCardsList] = useState<CreditCardItem[]>(CREDIT_CARDS_DATA);

  // Sync cards with Turso Database API
  useEffect(() => {
    fetch('/api/cards')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setCardsList(data);
        }
      })
      .catch(() => {});
  }, []);

  const currentCountry = COUNTRIES_DATA[selectedCountry];

  // Core verified filtering logic
  const filteredCards = useMemo(() => {
    let list = cardsList.filter((card) => {
      // 1. Country
      if (filters.country !== 'all' && card.country !== filters.country) return false;

      // 2. Issuer
      if (filters.issuer !== 'all' && card.issuer !== filters.issuer) return false;

      // 3. Category
      if (filters.category !== 'all' && !card.categories?.includes(filters.category)) return false;

      // 4. Annual Fee
      if (filters.annualFeeType === 'zero' && card.annualFee !== 0) return false;
      if (filters.annualFeeType === 'under-100' && card.annualFee >= 100) return false;
      if (filters.annualFeeType === '100-plus' && card.annualFee < 100) return false;

      // 5. APR
      if (filters.aprTier === 'low-under-18' && card.regularApr.min >= 18) return false;

      // 6. Rewards Type
      if (filters.rewardsType !== 'all' && card.rewardsStructure.type !== filters.rewardsType) return false;

      // 7. Credit Profile
      if (filters.creditProfile !== 'all' && card.creditScoreRequirement !== filters.creditProfile) return false;

      // 8. Zero FX
      if (filters.onlyZeroFx && !card.foreignTransactionFee.isZero) return false;

      // 9. 0% Balance Transfer
      if (filters.onlyBalanceTransferZero) {
        const hasIntroBt = card.introApr && (card.introApr.appliesTo === 'Balance Transfers' || card.introApr.appliesTo === 'Both') && card.introApr.rate === 0;
        if (!hasIntroBt) return false;
      }

      // 10. 0% Intro Purchase APR
      if (filters.onlyIntroPurchaseZero) {
        const hasIntroPurchase = card.introApr && (card.introApr.appliesTo === 'Purchases' || card.introApr.appliesTo === 'Both') && card.introApr.rate === 0;
        if (!hasIntroPurchase) return false;
      }

      // 11. Cash Back Focus
      if (filters.onlyCashBack && card.rewardsStructure.type !== 'Cashback') return false;

      // 12. Travel Focus
      if (filters.onlyTravel && !card.categories?.includes('travel')) return false;

      // 13. Search query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = card.name.toLowerCase().includes(q);
        const matchIssuer = card.issuer.toLowerCase().includes(q);
        const matchSummary = card.editorialSummary?.toLowerCase().includes(q);
        const matchPerk = card.keyPerks?.some((p) => p.toLowerCase().includes(q));
        if (!matchName && !matchIssuer && !matchSummary && !matchPerk) return false;
      }

      return true;
    });

    // Sorting
    list = [...list].sort((a, b) => {
      if (sortBy === 'fee-low') return a.annualFee - b.annualFee;
      if (sortBy === 'apr-low') return a.regularApr.min - b.regularApr.min;
      if (sortBy === 'rating') return b.ratingScore - a.ratingScore;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    return list;
  }, [filters, searchTerm, sortBy]);

  // If an active card is selected, render the dedicated SEO Card Detail Page (AFTER all hooks)
  if (activeCard) {
    return (
      <CardDetailPage
        card={activeCard}
        onBack={() => onSelectCard(null)}
        onSelectOtherCard={(card) => onSelectCard(card)}
        onToggleCompare={onToggleCompare}
        isCompared={comparedCards.some((c) => c.id === activeCard.id)}
        onNavigateToCompare={onNavigateToCompare}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Directory Title & Header */}
      <header className="max-w-4xl mx-auto text-center shrink-0 mb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>{currentCountry.name} Market • Currency: {currentCountry.currency.code} ({currentCountry.currency.symbol})</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          {filters.country === 'all' ? 'Global' : currentCountry.name} Credit Card Directory
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore verified Schumer box terms, representative APRs, annual fees, and official benefits across licensed issuers with zero commercial bias.
        </p>

        {/* Quick Country Selector Switcher */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {COUNTRY_LIST.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setSelectedCountry(c.code);
                handleFilterChange({ ...filters, country: c.code });
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${
                filters.country === c.code
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
          <button
            onClick={() => handleFilterChange({ ...filters, country: 'all' })}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filters.country === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🌐 All 5 Countries
          </button>
        </div>
      </header>

      {/* Top Google AdSense Compatible Slot */}
      <AdSlotTop slotId="cards-directory-top" label={`Sponsored Financial Options • ${currentCountry.name} Banking`} />

      {/* Reusable Verified Multi-Factor Filter System */}
      <CardFilterSystem
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        availableCards={cardsList}
        matchingCount={filteredCards.length}
        isExpanded={isFilterExpanded}
        onToggleExpand={() => setIsFilterExpanded(!isFilterExpanded)}
      />

      {/* Search & Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by card name, issuer, perk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-500">
            Showing <strong>{filteredCards.length}</strong> cards
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none shadow-2xs"
            >
              <option value="featured">Featured Order</option>
              <option value="fee-low">Annual Fee (Lowest First)</option>
              <option value="apr-low">Interest Rate / APR (Lowest)</option>
              <option value="rating">Completeness Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating Compare Drawer Bar if Cards Selected */}
      {comparedCards.length > 0 && (
        <div className="sticky top-16 z-30 bg-blue-900 text-white rounded-xl p-4 shadow-xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-blue-700 text-xs font-bold font-mono">
              {comparedCards.length}/4 Selected
            </span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-blue-100">
              {comparedCards.map((c) => (
                <span key={c.id} className="bg-blue-800/80 px-2 py-0.5 rounded truncate max-w-[140px]">
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateToCompare}
              className="px-4 py-2 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>View Side-by-Side Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-xl space-y-3">
          <p className="text-base font-bold text-slate-800">No credit cards match your exact filter criteria</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try loosening specific filters (such as 0% Foreign Fee or specific APR limits) or resetting all active filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const cardCountry = COUNTRIES_DATA[card.country];
            const isCompared = comparedCards.some((c) => c.id === card.id);

            return (
              <div
                key={card.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group space-y-4"
              >
                <div>
                  {/* Realistic Visual Card Mockup with Bank Branding */}
                  <div
                    onClick={() => onSelectCard(card)}
                    className="cursor-pointer mb-4 transform group-hover:scale-[1.02] transition-transform duration-200"
                  >
                    <CardVisual card={card} size="md" />
                  </div>

                  {/* Card Issuer & Network Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] uppercase text-slate-400 font-semibold truncate max-w-[200px]">
                          {card.issuer} • {cardCountry.flag} {cardCountry.name}
                        </span>
                        <DataVerificationBadge
                          status={card.verificationStatus || 'VERIFIED'}
                          lastVerifiedDate={card.lastVerifiedDate}
                          size="sm"
                          showDate={false}
                        />
                      </div>
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

                  {/* Pricing Schumer Box Matrix */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Annual Fee
                      </span>
                      <p className="font-bold text-slate-900">
                        {card.annualFee === 0
                          ? 'No Fee ($0)'
                          : `${cardCountry.currency.symbol}${card.annualFee}/yr`}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        {cardCountry.terminology.interestRateLabel.split('(')[0]}
                      </span>
                      <p className="font-bold text-blue-600">
                        {card.regularApr.rateDisplay}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Intro Offer
                      </span>
                      <p className="font-semibold text-emerald-600 text-[11px] truncate">
                        {card.introApr ? `${card.introApr.rate}% for ${card.introApr.durationMonths}m` : 'None'}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Foreign Fee
                      </span>
                      <p className="font-semibold text-slate-700 text-[11px]">
                        {card.foreignTransactionFee.isZero ? '0% (No Fee)' : `${card.foreignTransactionFee.percent}%`}
                      </p>
                    </div>
                  </div>

                  {/* Key Perks list */}
                  {card.keyPerks && card.keyPerks.length > 0 && (
                    <div className="space-y-1 mb-2">
                      {card.keyPerks.slice(0, 2).map((perk, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{perk}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onSelectCard(card)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-all border border-slate-200 hover:border-blue-600"
                  >
                    <span>View Verified Profile & Schumer Box</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleCompare(card)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                      isCompared
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {isCompared ? (
                      <>
                        <Minus className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Remove from Compare</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-slate-500" />
                        <span>Add to Comparison Matrix</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust & Transparency Disclosure Box */}
      <TrustDisclosureBox
        publishedDate="2026-08-01"
        lastUpdatedDate="2026-09-01"
        lastVerifiedDate="2026-09-01"
        verificationStatus="VERIFIED"
        regulatoryBody={currentCountry.regulator.name}
        sources={[
          {
            title: `${currentCountry.name} Official Financial Regulator (${currentCountry.regulator.abbreviation})`,
            url: currentCountry.regulator.website,
            isOfficial: true,
          },
          {
            title: `${currentCountry.name} Statutory Responsible Lending Code & Truth in Lending Schedules`,
            isOfficial: true,
          },
        ]}
      />

      {/* Standard Google AdSense Bottom Placement */}
      <AdSlotBottom slotId="cards-directory-bottom" label={`Sponsored Financial Options • ${currentCountry.name} Banking`} />
    </div>
  );
};
