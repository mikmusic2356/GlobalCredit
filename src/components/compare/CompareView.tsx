import React, { useState } from 'react';
import { CountryCode, CreditCardItem } from '../../types';
import { CREDIT_CARDS_DATA } from '../../data/cards';
import { COUNTRIES_DATA } from '../../data/countries';
import { 
  ShieldCheck, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Percent, 
  Award, 
  Calendar, 
  Globe2, 
  ArrowRight,
  Calculator
} from 'lucide-react';
import { AdBanner } from '../common/AdBanner';
import { CardVisual } from '../cards/CardVisual';

interface CompareViewProps {
  selectedCountry: CountryCode;
  comparedCards: CreditCardItem[];
  onRemoveFromCompare: (cardId: string) => void;
  onAddCardToCompare: (card: CreditCardItem) => void;
  onClearCompare: () => void;
  onOpenCardDetail: (card: CreditCardItem) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  selectedCountry,
  comparedCards,
  onRemoveFromCompare,
  onAddCardToCompare,
  onClearCompare,
  onOpenCardDetail,
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [modalCountryFilter, setModalCountryFilter] = useState<string>(selectedCountry);
  const [simulationBalance, setSimulationBalance] = useState<number>(3000);
  const [simulationMonths, setSimulationMonths] = useState<number>(12);

  const availableCards = CREDIT_CARDS_DATA.filter((c) => {
    const notCompared = !comparedCards.some((comp) => comp.id === c.id);
    const matchesCountry = modalCountryFilter === 'all' || c.country === modalCountryFilter;
    return notCompared && matchesCountry;
  });

  const countryCards = CREDIT_CARDS_DATA.filter((c) => c.country === selectedCountry);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center shrink-0 mb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Factual Side-by-Side Matrix Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          Credit Card Comparison Matrix
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Compare annual fees, purchase APRs, balance transfer promo periods, and reward multipliers side-by-side with zero affiliate bias.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          {comparedCards.length > 0 && (
            <button
              onClick={onClearCompare}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Clear Matrix
            </button>
          )}
          {comparedCards.length < 4 && (
            <button
              onClick={() => setSelectorOpen(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Card ({comparedCards.length}/4)</span>
            </button>
          )}
        </div>
      </header>

      {/* Card Selector Modal if Open */}
      {selectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-6 shadow-xl space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Select Card to Add to Comparison
                </h3>
                <p className="text-xs text-slate-500">Filter by territory or select from your active region</p>
              </div>
              <button
                onClick={() => setSelectorOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Territory Tabs in Modal */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-100">
              {[
                { code: 'all', label: 'All 🌐' },
                { code: 'nz', label: '🇳🇿 NZ' },
                { code: 'au', label: '🇦🇺 AU' },
                { code: 'us', label: '🇺🇸 US' },
                { code: 'ca', label: '🇨🇦 CA' },
                { code: 'uk', label: '🇬🇧 UK' },
              ].map((c) => (
                <button
                  key={c.code}
                  onClick={() => setModalCountryFilter(c.code)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    modalCountryFilter === c.code
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {availableCards.length === 0 ? (
                <p className="text-center py-8 text-xs text-slate-500">No cards found matching the filter.</p>
              ) : (
                availableCards.map((c) => {
                  const cCountry = COUNTRIES_DATA[c.country];
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        onAddCardToCompare(c);
                        setSelectorOpen(false);
                      }}
                      className="w-full text-left p-3.5 rounded-lg bg-slate-50 hover:bg-blue-50/50 border border-slate-200 flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{cCountry.flag}</span>
                          <span className="font-semibold text-slate-900 group-hover:text-blue-600">
                            {c.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {c.issuer} • Fee: {c.annualFee === 0 ? 'No Fee' : `${cCountry.currency.symbol}${c.annualFee}`} • {c.regularApr.rateDisplay}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                        + Add
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Comparison Matrix */}
      {comparedCards.length === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-xl p-8 space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Your Comparison Matrix is Empty</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Select 2 to 4 credit cards from our directory to compare fees, interest rates, introductory windows, and rewards side-by-side.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {(countryCards.length > 0 ? countryCards : CREDIT_CARDS_DATA).slice(0, 3).map((sample) => (
              <button
                key={sample.id}
                onClick={() => onAddCardToCompare(sample)}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              >
                + Add {sample.name.split('®')[0]} ({sample.country ? sample.country.toUpperCase() : ''})
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-900 divide-x divide-slate-200 border-b border-slate-200">
                  <th className="p-4 w-48 min-w-[180px] text-xs uppercase tracking-wider font-bold text-slate-400">
                    Product Specification
                  </th>
                  {comparedCards.map((card) => {
                    const cCountry = COUNTRIES_DATA[card.country];
                    return (
                      <th
                        key={card.id}
                        className="p-4 min-w-[260px] align-top relative bg-slate-50"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <span>{cCountry.flag}</span>
                              <span className="font-semibold">{cCountry.name}</span>
                            </div>
                            <button
                              onClick={() => onRemoveFromCompare(card.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
                              title="Remove card from matrix"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Visual Card representation */}
                          <div
                            onClick={() => onOpenCardDetail(card)}
                            className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
                          >
                            <CardVisual card={card} size="sm" />
                          </div>

                          <div>
                            <h3
                              onClick={() => onOpenCardDetail(card)}
                              className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer leading-tight line-clamp-1"
                            >
                              {card.name}
                            </h3>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">{card.issuer}</p>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {/* Annual Fee Row */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Annual Fee
                  </td>
                  {comparedCards.map((card) => {
                    const cCountry = COUNTRIES_DATA[card.country];
                    return (
                      <td key={card.id} className="p-4">
                        <span className="font-bold text-slate-900 text-base">
                          {card.annualFee === 0
                            ? 'No Annual Fee ($0)'
                            : `${cCountry.currency.symbol}${card.annualFee}`}
                        </span>
                        {card.annualFeePromo && (
                          <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">
                            {card.annualFeePromo}
                          </p>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Purchase Rate / APR */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Standard Purchase APR
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4">
                      <span className="font-bold text-slate-900">
                        {card.regularApr.rateDisplay}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                        {card.regularApr.type}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Introductory APR */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Introductory 0% / Promo Term
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4">
                      {card.introApr ? (
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                            {card.introApr.rate}% for {card.introApr.durationMonths} Months
                          </span>
                          <p className="text-xs text-slate-500">
                            Applies to: <span className="font-medium text-slate-700">{card.introApr.appliesTo}</span>
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">
                          No introductory promo rate
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Balance Transfer Fee */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Balance Transfer Upfront Fee
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4 text-xs">
                      {card.balanceTransferFee ? (
                        <span className="font-semibold text-slate-800">
                          {card.balanceTransferFee.percent}% upfront
                          {card.balanceTransferFee.minimumAmount > 0 &&
                            ` ($${card.balanceTransferFee.minimumAmount} min)`}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Standard cash advance fee / N/A</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Foreign Transaction Fee */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Foreign Currency Fee
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4 text-xs">
                      {card.foreignTransactionFee.isZero ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <Check className="w-3.5 h-3.5" /> 0% (No Foreign Surcharge)
                        </span>
                      ) : (
                        <span className="text-slate-700 font-medium">
                          {card.foreignTransactionFee.percent}% per transaction
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Rewards Program */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Rewards & Points Rate
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4 space-y-1 text-xs">
                      <p className="font-bold text-slate-900">{card.rewardsStructure.headline}</p>
                      <p className="text-slate-500">Base: {card.rewardsStructure.baseRate}</p>
                    </td>
                  ))}
                </tr>

                {/* Credit Score Requirement */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Credit Rating Profile Needed
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4 text-xs font-mono text-slate-800 font-medium">
                      {card.creditScoreRequirement}
                    </td>
                  ))}
                </tr>

                {/* Pros & Key Perks */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Key Strengths & Perks
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4 text-xs space-y-1">
                      {card.pros.map((pro, i) => (
                        <div key={i} className="flex items-start gap-1 text-slate-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{pro}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Cons & Drawbacks */}
                <tr className="divide-x divide-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/50">
                    Important Drawbacks
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4 text-xs space-y-1">
                      {card.cons.map((con, i) => (
                        <div key={i} className="flex items-start gap-1 text-slate-700">
                          <span className="text-rose-500 font-bold">✗</span>
                          <span>{con}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Action Row */}
                <tr className="divide-x divide-slate-200 bg-slate-50/80">
                  <td className="p-4 font-semibold text-slate-900">
                    Detailed Specifications
                  </td>
                  {comparedCards.map((card) => (
                    <td key={card.id} className="p-4">
                      <button
                        onClick={() => onOpenCardDetail(card)}
                        className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center transition-colors"
                      >
                        View Full Specs →
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Live Payoff Cost Simulation Across Matrix */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Live Carrying Cost Simulator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculate the estimated interest cost across your selected cards if carrying a balance.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Assumed Balance:</span>
                  <input
                    type="number"
                    value={simulationBalance}
                    onChange={(e) => setSimulationBalance(Math.max(100, Number(e.target.value)))}
                    className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Months:</span>
                  <select
                    value={simulationMonths}
                    onChange={(e) => setSimulationMonths(Number(e.target.value))}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold"
                  >
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months (1 Year)</option>
                    <option value={18}>18 Months</option>
                    <option value={24}>24 Months (2 Years)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simulation Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparedCards.map((card) => {
                const cCountry = COUNTRIES_DATA[card.country];
                const annualFeeTotal = card.annualFee * (simulationMonths / 12);
                
                // If card has 0% intro covering this period
                const isPromoActive = card.introApr && card.introApr.durationMonths >= simulationMonths;
                const effectiveApr = isPromoActive ? card.introApr!.rate : card.regularApr.min;
                
                // Simple approximate monthly compound interest on balance
                const monthlyRate = effectiveApr / 100 / 12;
                const estimatedInterest = isPromoActive 
                  ? 0 
                  : simulationBalance * (Math.pow(1 + monthlyRate, simulationMonths) - 1);
                
                const totalCost = estimatedInterest + annualFeeTotal;

                return (
                  <div
                    key={card.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>{cCountry.flag} {card.issuer}</span>
                        {isPromoActive && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            0% Promo Active
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{card.name}</h4>
                    </div>

                    <div className="pt-3 border-t border-slate-200 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Estimated Interest:</span>
                        <span className="font-mono font-bold text-slate-900">
                          {cCountry.currency.symbol}{estimatedInterest.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Card Fees ({simulationMonths}mo):</span>
                        <span className="font-mono font-bold text-slate-900">
                          {cCountry.currency.symbol}{annualFeeTotal.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-sm">
                        <span className="text-slate-900">Total Cost:</span>
                        <span className={isPromoActive ? 'text-emerald-600' : 'text-blue-600'}>
                          {cCountry.currency.symbol}{totalCost.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* AdSense slot */}
      <AdBanner slotType="leaderboard" slotId="compare-bottom" />
    </div>
  );
};
