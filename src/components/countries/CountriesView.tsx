import React, { useState } from 'react';
import { CountryCode } from '../../types';
import { COUNTRY_LIST, COUNTRIES_DATA } from '../../data/countries';
import { CREDIT_CARDS_DATA } from '../../data/cards';
import { 
  Globe2, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight,
  Landmark,
  Scale
} from 'lucide-react';
import { AdBanner } from '../common/AdBanner';

interface CountriesViewProps {
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  onNavigateToCards: () => void;
}

export const CountriesView: React.FC<CountriesViewProps> = ({
  selectedCountry,
  setSelectedCountry,
  onNavigateToCards,
}) => {
  const [activeTabCountry, setActiveTabCountry] = useState<CountryCode>(selectedCountry);
  const current = COUNTRIES_DATA[activeTabCountry];

  const countryCards = CREDIT_CARDS_DATA.filter((c) => c.country === activeTabCountry);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
            <Globe2 className="w-4 h-4" />
            <span>Sovereign Jurisdiction Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            International Credit Card Regulatory Frameworks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Financial systems differ drastically by country. Learn the sovereign laws, statutory regulators, credit bureau systems, and mandatory disclosure metrics governing each market.
          </p>
        </div>

        {/* Country Selector Tabs */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {COUNTRY_LIST.map((c) => (
            <button
              key={c.code}
              onClick={() => setActiveTabCountry(c.code)}
              className={`p-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTabCountry === c.code
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="text-base">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Country In-Depth Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-8">
        {/* Country Summary Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{current.flag}</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {current.name} Credit System
              </h2>
              <p className="text-xs text-slate-500">
                Currency: {current.currency.name} ({current.currency.code} - {current.currency.symbol})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedCountry(activeTabCountry);
                onNavigateToCards();
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Browse {current.name} Cards ({countryCards.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Regulator */}
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold">
              <Landmark className="w-4 h-4" />
              <span>PRIMARY REGULATOR</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{current.regulator.name}</h3>
            <p className="text-xs text-slate-600 font-medium">({current.regulator.abbreviation})</p>
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
              Oversees consumer credit disclosures, fair lending, and bank enforcement.
            </p>
            <a
              href={current.regulator.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1 pt-1 font-medium"
            >
              <span>Regulator Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Credit Scoring */}
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>SCORING MODEL</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{current.creditScoreSystem.name}</h3>
            <p className="text-xs text-slate-600 font-semibold">
              Standard Range: {current.creditScoreSystem.range}
            </p>
            <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 block mb-0.5">Bureaus:</span>
              <p>{current.creditScoreSystem.bureaus.join(', ')}</p>
            </div>
          </div>

          {/* Terminology Standard */}
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
              <Scale className="w-4 h-4" />
              <span>MANDATED RATE LABEL</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {current.terminology.interestRateLabel}
            </h3>
            <p className="text-xs text-slate-600">
              Mandated Disclosures: <strong className="text-slate-800">{current.code === 'us' ? 'Schumer Box (TILA)' : current.code === 'uk' ? 'Standard Summary Box' : current.code === 'ca' ? 'Cost of Borrowing Box' : 'Key Facts Sheet'}</strong>
            </p>
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
              Lenders must legally provide standardized fee matrices prior to card signing.
            </p>
          </div>

          {/* Statutory Dispute Board */}
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>DISPUTE ARBITRATION</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Free Ombudsman Service
            </h3>
            <p className="text-xs text-slate-600">
              Statutory consumer dispute resolution body
            </p>
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
              Binding resolution if bank fails to resolve complaints within statutory time limits.
            </p>
          </div>
        </div>

        {/* Key Statutory Regulations List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Key Sovereign Consumer Protection Legislation in {current.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {current.keyRegulations.map((reg, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5"
              >
                <span className="font-bold text-blue-600">0{idx + 1}. Law Provision:</span>
                <p className="font-medium text-slate-800">{reg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-Country Comparison Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          5-Country International Regulatory Comparison Matrix
        </h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="p-3">Country</th>
                <th className="p-3">Currency</th>
                <th className="p-3">Primary Regulator</th>
                <th className="p-3">Score Model</th>
                <th className="p-3">Legal APR Label</th>
                <th className="p-3">Mandatory Disclosure Box</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {COUNTRY_LIST.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/80">
                  <td className="p-3 font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </td>
                  <td className="p-3">{c.currency.code} ({c.currency.symbol})</td>
                  <td className="p-3 font-medium text-blue-600">{c.regulator.abbreviation}</td>
                  <td className="p-3">{c.creditScoreSystem.name} ({c.creditScoreSystem.range})</td>
                  <td className="p-3">{c.terminology.interestRateLabel}</td>
                  <td className="p-3 text-[11px] font-medium text-slate-600">
                    {c.code === 'us' ? 'Schumer Box' : c.code === 'uk' ? 'Summary Box' : c.code === 'ca' ? 'Cost of Borrowing Box' : 'Key Facts Sheet'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdBanner slotType="leaderboard" slotId="countries-bottom" />
    </div>
  );
};
