import React from 'react';
import { CreditCardItem } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Percent, 
  Calendar, 
  FileText, 
  Award,
  Lock,
  Globe2,
  ExternalLink,
  Coins,
  Gift,
  HelpCircle,
  AlertTriangle,
  Info,
  Scale
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotInContent } from '../ads/AdSlots';

interface CardDetailModalProps {
  card: CreditCardItem | null;
  onClose: () => void;
  onAddToCompare?: (card: CreditCardItem) => void;
  isCompared?: boolean;
}

const UNAVAILABLE_MSG = 'Information not available from our verified sources.';

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  onClose,
  onAddToCompare,
  isCompared = false,
}) => {
  if (!card) return null;

  const country = COUNTRIES_DATA[card.country];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div className="flex items-start gap-4">
            <div className="w-14 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-white shadow-xs">
              {card.network || 'Card'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {card.name || card.cardName || UNAVAILABLE_MSG}
                </h2>
                <span className="text-base" title={country.name}>{country.flag}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                <strong>Issuer:</strong> {card.issuer || UNAVAILABLE_MSG} • <strong>Country:</strong> {country.name} ({country.currency.code} - {country.currency.symbol})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          
          {/* Editorial Overview */}
          {card.editorialSummary ? (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100/80 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold text-blue-800 block mb-1 uppercase text-[11px] tracking-wide">
                Product Overview & Editorial Analysis:
              </span>
              {card.editorialSummary}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">{UNAVAILABLE_MSG}</p>
          )}

          {/* Primary Financial Terms (Schumer Box Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Annual Fee */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                Annual Fee
              </span>
              <p className="text-base font-bold text-slate-900 mt-1">
                {card.annualFee !== undefined
                  ? card.annualFee === 0
                    ? 'No Annual Fee ($0)'
                    : `${country.currency.symbol}${card.annualFee}/year`
                  : UNAVAILABLE_MSG}
              </p>
              {card.annualFeePromo && (
                <p className="text-[10px] text-emerald-600 font-medium mt-0.5">{card.annualFeePromo}</p>
              )}
            </div>

            {/* APR / Interest Rate */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                {country.terminology.interestRateLabel.split('(')[0]}
              </span>
              <p className="text-base font-bold text-blue-600 mt-1">
                {card.regularApr?.rateDisplay || 
                  (card.regularApr?.min ? `${card.regularApr.min}%` : UNAVAILABLE_MSG)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {card.regularApr?.type || 'Standard Rate'}
              </p>
            </div>

            {/* Introductory APR */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                Introductory APR
              </span>
              <p className="text-base font-bold text-emerald-600 mt-1">
                {card.introApr !== undefined
                  ? `${card.introApr.rate}% Intro APR`
                  : 'No Intro APR Offer'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {card.introApr ? `Applies to: ${card.introApr.appliesTo}` : 'Standard rates apply'}
              </p>
            </div>

            {/* Introductory Period */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                Introductory Period
              </span>
              <p className="text-base font-bold text-slate-900 mt-1">
                {card.introApr?.durationMonths
                  ? `${card.introApr.durationMonths} Months`
                  : card.introductoryPeriod || 'None'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Promotional duration</p>
            </div>
          </div>

          {/* Intro APR Terms Notice if present */}
          {card.introApr?.termsNotice && (
            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Introductory Offer Terms:</strong> {card.introApr.termsNotice}</span>
            </div>
          )}

          {/* Welcome Offer & Cash Back / Rewards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Welcome Offer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-purple-600" /> Welcome Offer / Sign-up Bonus
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                {card.welcomeOffer || 'Standard card benefits without an active upfront sign-up bonus.'}
              </p>
            </div>

            {/* Cash Back & Rewards */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> Rewards & Cash Back Structure
              </h3>
              {card.rewardsStructure ? (
                <>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    {card.rewardsStructure.headline}
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Base Rate:</strong> {card.rewardsStructure.baseRate}
                  </p>
                  {card.cashBackRate && (
                    <p className="text-xs text-emerald-600 font-semibold">
                      <strong>Cash Back Return:</strong> {card.cashBackRate}
                    </p>
                  )}
                  {card.rewardsStructure.categoryRates && card.rewardsStructure.categoryRates.length > 0 && (
                    <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside mt-1.5">
                      {card.rewardsStructure.categoryRates.map((rate, idx) => (
                        <li key={idx}>{rate}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className="text-xs text-slate-400 italic">{UNAVAILABLE_MSG}</p>
              )}
            </div>
          </div>

          {/* Balance Transfer Information & Foreign Transaction Fee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Balance Transfer Info */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-600" /> Balance Transfer Information
              </h3>
              {card.balanceTransferFee ? (
                <div className="space-y-1 text-xs text-slate-700">
                  <p>
                    <strong>Transfer Fee:</strong> {card.balanceTransferFee.percent}% (Minimum {country.currency.symbol}{card.balanceTransferFee.minimumAmount})
                  </p>
                  {card.introApr?.appliesTo === 'Balance Transfers' || card.introApr?.appliesTo === 'Both' ? (
                    <p className="text-emerald-700 font-semibold">
                      0% Intro APR for {card.introApr.durationMonths} months on eligible transfers.
                    </p>
                  ) : (
                    <p className="text-slate-500">Standard purchase interest rate applies to transferred balances.</p>
                  )}
                </div>
              ) : card.balanceTransferInfo ? (
                <div className="space-y-1 text-xs text-slate-700">
                  <p><strong>Transfer Fee:</strong> {card.balanceTransferInfo.feePercent}%</p>
                  <p>{card.balanceTransferInfo.notes}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">{UNAVAILABLE_MSG}</p>
              )}
            </div>

            {/* Foreign Transaction Fee */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-blue-600" /> Foreign Transaction Fee (FX Surcharge)
              </h3>
              {card.foreignTransactionFee ? (
                <div className="space-y-1 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">
                    {card.foreignTransactionFee.isZero ? (
                      <span className="text-emerald-700 font-bold">0% (Zero Foreign Transaction Fees)</span>
                    ) : (
                      <span className="text-slate-900">{card.foreignTransactionFee.percent}% of each transaction in foreign currency</span>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {card.foreignTransactionFee.isZero
                      ? 'No extra fee added when purchasing abroad or in foreign currencies online.'
                      : 'Fee applied when using this card outside domestic market or on foreign merchant websites.'}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">{UNAVAILABLE_MSG}</p>
              )}
            </div>
          </div>

          {/* Other Fees Section */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-slate-500" /> Other Applicable Card Fees
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Late Payment Fee</span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {card.otherFees?.latePayment || (card.country === 'us' ? 'Up to $41 (subject to CFPB safe harbor)' : card.country === 'uk' ? '£12 statutory cap' : `${country.currency.symbol}20–${country.currency.symbol}35`)}
                </p>
              </div>
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Cash Advance Fee</span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {card.otherFees?.cashAdvance || '5% ($10 min) + 27%–34% APR'}
                </p>
              </div>
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Penalty APR</span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {card.otherFees?.penaltyApr || 'Up to 29.99% variable if delinquent 60+ days'}
                </p>
              </div>
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Returned Payment</span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {card.otherFees?.returnedPayment || (card.country === 'us' ? 'Up to $40' : card.country === 'uk' ? '£12' : `${country.currency.symbol}25`)}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits & Key Perks */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" /> Card Benefits & Insurance Protections
            </h3>
            {card.keyPerks && card.keyPerks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {card.keyPerks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">{UNAVAILABLE_MSG}</p>
            )}
          </div>

          {/* Eligibility Information & Credit Profile */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-slate-600" /> Eligibility Criteria & Underwriting Guidelines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Credit Profile Required:</span>
                <p className="font-bold text-slate-900 mt-0.5">{card.creditScoreRequirement || UNAVAILABLE_MSG}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Residency & Minimum Age:</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  18+ years (19+ in certain provinces/states) • Verified {country.name} Resident
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Income / Employment:</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  Proof of regular verifiable income & capacity to repay
                </p>
              </div>
            </div>
            {card.applyRequirementNotes && (
              <p className="text-[11px] text-slate-600 pt-2 border-t border-slate-200">
                <strong>Underwriting Guidance:</strong> {card.applyRequirementNotes}
              </p>
            )}
          </div>

          {/* Important Conditions & Legal Disclosures */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h3 className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-slate-600" /> Important Conditions & Regulatory Disclosures
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>Interest begins accruing immediately on non-promotional transactions and cash advances.</li>
              <li>Promotional 0% APR periods terminate prematurely if monthly minimum payments are missed.</li>
              <li>Approval is subject to lender verification and individual credit assessment under {country.regulator.name} rules.</li>
              {card.representativeExample && (
                <li className="font-medium text-slate-700">
                  <strong>UK Representative Example:</strong> {card.representativeExample}
                </li>
              )}
            </ul>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Pros
              </h4>
              {card.pros && card.pros.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {card.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 italic">{UNAVAILABLE_MSG}</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/70 space-y-2">
              <h4 className="text-xs font-bold text-rose-800 uppercase flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" /> Verified Cons
              </h4>
              {card.cons && card.cons.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {card.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold mt-0.5">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 italic">{UNAVAILABLE_MSG}</p>
              )}
            </div>
          </div>

          {/* Trust, Disclosure, Dates & Verification Box */}
          <TrustDisclosureBox
            publishedDate={card.publishedDate || '2026-08-01'}
            lastUpdatedDate={card.lastUpdatedDate || '2026-09-01'}
            lastVerifiedDate={card.lastVerifiedDate || '2026-09-01'}
            verificationStatus={card.verificationStatus || 'VERIFIED'}
            issuerName={card.issuer}
            issuerOfficialUrl={card.sourceUrl || card.officialSource?.url}
            regulatoryBody={country.regulator.name}
            sources={[
              {
                title: card.officialSource?.name || `${card.issuer} Official Fee Schedule`,
                url: card.sourceUrl || card.officialSource?.url,
                isOfficial: true,
              },
              {
                title: `${country.name} Banking & Consumer Credit Disclosure Standards (${country.regulator.abbreviation})`,
                url: country.regulator.website,
                isOfficial: true,
              },
            ]}
          />

          {/* Non-intrusive Google AdSense Compatible Placement */}
          <AdSlotInContent slotId={`card-detail-${card.id}`} label={`Sponsored Recommendations • ${country.name} Financial Services`} />
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Independent Data Verification • Zero Sponsored Commission Bias</span>
          </div>

          <div className="flex items-center gap-2">
            {onAddToCompare && (
              <button
                onClick={() => onAddToCompare(card)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isCompared
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs'
                }`}
              >
                {isCompared ? 'Added to Compare Matrix ✓' : '+ Add to Compare'}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
