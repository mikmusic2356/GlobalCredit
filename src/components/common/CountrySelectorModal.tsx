import React from 'react';
import { CountryCode } from '../../types';
import { COUNTRY_LIST, COUNTRIES_DATA } from '../../data/countries';
import { Globe2, X, Check, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryCode;
  onSelectCountry: (country: CountryCode) => void;
}

export const CountrySelectorModal: React.FC<CountrySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Select Country & Regulatory Framework
              </h2>
              <p className="text-xs text-slate-500">
                CardInsight Online keeps financial rules, terminology, and legal protections strictly isolated by jurisdiction.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COUNTRY_LIST.map((c) => {
              const isSelected = selectedCountry === c.code;
              return (
                <div
                  key={c.code}
                  className={`p-5 rounded-xl border transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-xs ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Top row */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{c.flag}</span>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            {c.name}
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {c.currency.code} ({c.currency.symbol})
                            </span>
                          </h3>
                          <p className="text-xs text-blue-600 font-medium">
                            {c.regulator.abbreviation} • {c.regulator.name}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div>
                        <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                          Credit Score System & Bureaus:
                        </span>
                        <p className="font-medium text-slate-800 mt-0.5">
                          {c.creditScoreSystem.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Bureaus: {c.creditScoreSystem.bureaus.join(', ')}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                          Primary Interest Metric:
                        </span>
                        <p className="font-semibold text-blue-600 mt-0.5">
                          {c.terminology.interestRateLabel}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px] uppercase font-semibold">
                          Key Legal Framework:
                        </span>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                          {c.keyRegulations[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Switch Action */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={c.regulator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium"
                    >
                      <span>Regulator Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => {
                        onSelectCountry(c.code);
                        onClose();
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                        isSelected
                          ? 'bg-blue-600 text-white cursor-default'
                          : 'bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Currently Selected' : `Switch to ${c.name}`}</span>
                      {!isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Architecture Extensibility Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">
                Extensible International Data Schema
              </p>
              <p className="mt-0.5">
                Our modular architecture supports adding additional sovereign markets (e.g. Ireland, Singapore, New EU states) dynamically without rewriting application routes or data engines.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>Active Jurisdiction: {COUNTRIES_DATA[selectedCountry].name}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
