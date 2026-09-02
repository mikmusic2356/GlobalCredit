import React from 'react';
import { CountryCode, CardCategory, CreditCardItem } from '../../types';
import { CATEGORIES_DATA } from '../../data/categories';
import { COUNTRIES_DATA, COUNTRY_LIST } from '../../data/countries';
import { 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  Percent, 
  Globe2, 
  Award, 
  ShieldCheck, 
  CheckSquare, 
  Square,
  Sparkles,
  Search
} from 'lucide-react';

export interface CardFilterState {
  country: CountryCode | 'all';
  issuer: string;
  category: CardCategory;
  annualFeeType: 'all' | 'zero' | 'under-100' | '100-plus';
  aprTier: 'all' | 'low-under-18' | 'standard';
  rewardsType: 'all' | 'Cashback' | 'Points' | 'Miles' | 'Airpoints' | 'None';
  creditProfile: 'all' | 'Excellent (720+)' | 'Good (670-719)' | 'Fair (580-669)' | 'Building/Poor (<580)' | 'No Credit History Required';
  onlyZeroFx: boolean;
  onlyBalanceTransferZero: boolean;
  onlyIntroPurchaseZero: boolean;
  onlyCashBack: boolean;
  onlyTravel: boolean;
}

export const INITIAL_FILTER_STATE: CardFilterState = {
  country: 'all',
  issuer: 'all',
  category: 'all',
  annualFeeType: 'all',
  aprTier: 'all',
  rewardsType: 'all',
  creditProfile: 'all',
  onlyZeroFx: false,
  onlyBalanceTransferZero: false,
  onlyIntroPurchaseZero: false,
  onlyCashBack: false,
  onlyTravel: false,
};

interface CardFilterSystemProps {
  filters: CardFilterState;
  onFilterChange: (newFilters: CardFilterState) => void;
  onResetFilters: () => void;
  availableCards: CreditCardItem[];
  matchingCount: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const CardFilterSystem: React.FC<CardFilterSystemProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableCards,
  matchingCount,
  isExpanded,
  onToggleExpand,
}) => {
  // Extract unique verified issuers based on selected country
  const uniqueIssuers = React.useMemo(() => {
    const list = availableCards
      .filter((c) => filters.country === 'all' || c.country === filters.country)
      .map((c) => c.issuer);
    return ['all', ...Array.from(new Set(list))];
  }, [availableCards, filters.country]);

  // Count active filters
  const activeCount = React.useMemo(() => {
    let count = 0;
    if (filters.country !== 'all') count++;
    if (filters.issuer !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.annualFeeType !== 'all') count++;
    if (filters.aprTier !== 'all') count++;
    if (filters.rewardsType !== 'all') count++;
    if (filters.creditProfile !== 'all') count++;
    if (filters.onlyZeroFx) count++;
    if (filters.onlyBalanceTransferZero) count++;
    if (filters.onlyIntroPurchaseZero) count++;
    if (filters.onlyCashBack) count++;
    if (filters.onlyTravel) count++;
    return count;
  }, [filters]);

  const update = <K extends keyof CardFilterState>(key: K, val: CardFilterState[K]) => {
    onFilterChange({ ...filters, [key]: val });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden transition-all">
      {/* Filter Toggle Summary Bar */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-600 text-white shadow-2xs">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Verified Multi-Factor Filter Engine
              </h3>
              {activeCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">
                  {activeCount} Active {activeCount === 1 ? 'Filter' : 'Filters'}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Only verified parameters supported by sovereign disclosures. Showing <strong>{matchingCount}</strong> matched cards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={onResetFilters}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

          <button
            onClick={onToggleExpand}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <span>{isExpanded ? 'Collapse Filters' : 'Refine Search & Filters'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Filter Grid */}
      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* 1. Country Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Country / Region
              </label>
              <select
                value={filters.country}
                onChange={(e) => update('country', e.target.value as CountryCode | 'all')}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All 5 Sovereign Markets</option>
                {COUNTRY_LIST.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.currency.code})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Issuer Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Licensed Issuer
              </label>
              <select
                value={filters.issuer}
                onChange={(e) => update('issuer', e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Issuers ({uniqueIssuers.length - 1} Verified)</option>
                {uniqueIssuers.filter((i) => i !== 'all').map((iss) => (
                  <option key={iss} value={iss}>
                    {iss}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Card Type / Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Card Type & Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => update('category', e.target.value as CardCategory)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES_DATA.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Annual Fee Tier */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Annual Fee
              </label>
              <select
                value={filters.annualFeeType}
                onChange={(e) => update('annualFeeType', e.target.value as CardFilterState['annualFeeType'])}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Annual Fees</option>
                <option value="zero">$0 No Annual Fee</option>
                <option value="under-100">Under $100 / year</option>
                <option value="100-plus">$100+ Premium Tier</option>
              </select>
            </div>

            {/* 5. Purchase APR Tier */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Purchase APR / Interest
              </label>
              <select
                value={filters.aprTier}
                onChange={(e) => update('aprTier', e.target.value as CardFilterState['aprTier'])}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All APR Ranges</option>
                <option value="low-under-18">Low APR (Under 18% Min)</option>
                <option value="standard">Standard Purchase Tiers</option>
              </select>
            </div>

            {/* 6. Rewards Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Rewards Structure
              </label>
              <select
                value={filters.rewardsType}
                onChange={(e) => update('rewardsType', e.target.value as CardFilterState['rewardsType'])}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Reward Structures</option>
                <option value="Cashback">Cash Back (Direct Statement Credit)</option>
                <option value="Points">Points Programs</option>
                <option value="Miles">Airline Miles & Airpoints</option>
                <option value="None">No Rewards (Plain Low-Rate)</option>
              </select>
            </div>

            {/* 7. Credit Profile Requirement */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Required Credit Profile
              </label>
              <select
                value={filters.creditProfile}
                onChange={(e) => update('creditProfile', e.target.value as CardFilterState['creditProfile'])}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Credit Levels</option>
                <option value="Excellent (720+)">Excellent (720+)</option>
                <option value="Good (670-719)">Good (670–719)</option>
                <option value="Fair (580-669)">Fair (580–669)</option>
                <option value="Building/Poor (<580)">Building / Poor (&lt;580)</option>
                <option value="No Credit History Required">No Credit History Required (Secured/Student)</option>
              </select>
            </div>

            {/* 8. Quick Reset / Info */}
            <div className="flex flex-col justify-end">
              <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Filters auto-update against verified issuer datasets.</span>
              </div>
            </div>

          </div>

          {/* Feature Quick-Toggles */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Verified Feature Checkboxes
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              
              {/* Toggle 1: 0% FX Fee */}
              <button
                type="button"
                onClick={() => update('onlyZeroFx', !filters.onlyZeroFx)}
                className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                  filters.onlyZeroFx
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {filters.onlyZeroFx ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold leading-none">0% Foreign Fee</p>
                  <p className="text-[10px] text-slate-500 mt-1">Zero FX surcharge abroad</p>
                </div>
              </button>

              {/* Toggle 2: 0% Balance Transfer Offer */}
              <button
                type="button"
                onClick={() => update('onlyBalanceTransferZero', !filters.onlyBalanceTransferZero)}
                className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                  filters.onlyBalanceTransferZero
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {filters.onlyBalanceTransferZero ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold leading-none">0% Balance Transfer</p>
                  <p className="text-[10px] text-slate-500 mt-1">Intro 0% on transferred debt</p>
                </div>
              </button>

              {/* Toggle 3: 0% Intro Purchase APR */}
              <button
                type="button"
                onClick={() => update('onlyIntroPurchaseZero', !filters.onlyIntroPurchaseZero)}
                className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                  filters.onlyIntroPurchaseZero
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {filters.onlyIntroPurchaseZero ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold leading-none">0% Purchase APR</p>
                  <p className="text-[10px] text-slate-500 mt-1">Intro 0% on new spending</p>
                </div>
              </button>

              {/* Toggle 4: Cash Back Focus */}
              <button
                type="button"
                onClick={() => update('onlyCashBack', !filters.onlyCashBack)}
                className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                  filters.onlyCashBack
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {filters.onlyCashBack ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold leading-none">Cash Back Focus</p>
                  <p className="text-[10px] text-slate-500 mt-1">Direct statement rebate</p>
                </div>
              </button>

              {/* Toggle 5: Travel Perks */}
              <button
                type="button"
                onClick={() => update('onlyTravel', !filters.onlyTravel)}
                className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                  filters.onlyTravel
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {filters.onlyTravel ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold leading-none">Travel Perks</p>
                  <p className="text-[10px] text-slate-500 mt-1">Insurance & travel credits</p>
                </div>
              </button>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};
