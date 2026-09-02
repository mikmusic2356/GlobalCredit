import React, { useState, useEffect } from 'react';
import { CountryCode } from '../../types';
import { ResourcesSubRoute } from '../../lib/router';
import { GLOSSARY_DATA } from '../../data/glossary';
import { REGULATORY_AGENCIES, DEBT_COUNSELING_RESOURCES } from '../../data/resources';
import { COUNTRIES_DATA } from '../../data/countries';
import { 
  FolderArchive, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  PhoneCall, 
  Globe2, 
  ExternalLink,
  HelpCircle,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { AdBanner } from '../common/AdBanner';

interface ResourcesViewProps {
  selectedCountry: CountryCode;
  activeSectionSubRoute?: ResourcesSubRoute | null;
  onSelectSectionSubRoute?: (section: ResourcesSubRoute) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  selectedCountry,
  activeSectionSubRoute,
  onSelectSectionSubRoute,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<'glossary' | 'regulators' | 'helplines'>('glossary');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('All');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>(selectedCountry);

  // Sync country filter with selectedCountry prop
  useEffect(() => {
    setSelectedCountryFilter(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    if (activeSectionSubRoute) {
      if (activeSectionSubRoute === 'regulators' || activeSectionSubRoute === 'rights') {
        setActiveSection('regulators');
      } else if (activeSectionSubRoute === 'counseling') {
        setActiveSection('helplines');
      } else {
        setActiveSection('glossary');
      }
    }
  }, [activeSectionSubRoute]);

  const handleSwitchSection = (section: 'glossary' | 'regulators' | 'helplines') => {
    setActiveSection(section);
    if (onSelectSectionSubRoute) {
      const mappedSub: ResourcesSubRoute =
        section === 'helplines' ? 'counseling' : (section as ResourcesSubRoute);
      onSelectSectionSubRoute(mappedSub);
    }
  };

  const currentCountry = COUNTRIES_DATA[selectedCountry];

  const glossaryCategories = ['All', 'Interest & Fees', 'Protection & Legal', 'Scores & Underwriting', 'Rewards & Terms'];

  const filteredGlossary = GLOSSARY_DATA.filter((item) => {
    const matchesCategory =
      selectedGlossaryCategory === 'All' || item.category === selectedGlossaryCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center shrink-0 mb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <FolderArchive className="w-3.5 h-3.5 text-blue-600" />
          <span>Financial Literacy & Official Resources</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          Glossary, Regulators & Helplines
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Direct access to official government regulatory portals, statutory ombudsman dispute boards, 100% free non-profit debt counseling services, and an exhaustive A-Z financial glossary.
        </p>

        {/* Section Navigation Tabs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleSwitchSection('glossary')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSection === 'glossary'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Financial Terms Glossary ({GLOSSARY_DATA.length})</span>
          </button>

          <button
            onClick={() => handleSwitchSection('regulators')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSection === 'regulators'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Government Regulators ({REGULATORY_AGENCIES.length})</span>
          </button>

          <button
            onClick={() => handleSwitchSection('helplines')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSection === 'helplines'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Debt Counseling Hotlines ({DEBT_COUNSELING_RESOURCES.length})</span>
          </button>
        </div>
      </header>

      {/* SECTION 1: Glossary A-Z */}
      {activeSection === 'glossary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search financial terms (APR, Section 75)..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {glossaryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGlossaryCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedGlossaryCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900">
                      {item.term}
                    </h3>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                {item.countrySpecifics && (
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px] text-blue-600">
                    <span className="font-bold">💡 Sovereign Notes:</span>
                    <div className="text-slate-500 space-y-0.5">
                      {Object.entries(item.countrySpecifics).map(([cCode, note]) => (
                        <p key={cCode}>
                          <strong className="uppercase text-slate-700">{cCode}:</strong> {note}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Official Regulators & Ombudsman Services */}
      {activeSection === 'regulators' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Official Statutory Authorities</p>
              <p className="mt-0.5 text-blue-800 leading-relaxed">
                These are official sovereign government agencies and independent ombudsman services responsible for enforcing consumer credit law, regulating card issuers, and arbitrating customer disputes free of charge.
              </p>
            </div>
          </div>

          {/* Country Filter for Regulators */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Territorio:</span>
            {[
              { code: 'all', label: 'Todos 🌐' },
              { code: 'nz', label: '🇳🇿 Nueva Zelanda' },
              { code: 'au', label: '🇦🇺 Australia' },
              { code: 'us', label: '🇺🇸 Estados Unidos' },
              { code: 'ca', label: '🇨🇦 Canadá' },
              { code: 'uk', label: '🇬🇧 Reino Unido' },
            ].map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountryFilter(c.code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCountryFilter === c.code
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGULATORY_AGENCIES
              .filter((agency) => selectedCountryFilter === 'all' || agency.country === selectedCountryFilter)
              .map((agency) => {
              const agencyCountry = COUNTRIES_DATA[agency.country as CountryCode];
              return (
                <div
                  key={agency.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{agencyCountry?.flag || '🌐'}</span>
                        <div>
                          <span className="text-[11px] text-slate-400 block uppercase font-medium">
                            {agency.countryName}
                          </span>
                          <span className="text-xs font-bold text-blue-600">
                            {agency.abbreviation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {agency.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {agency.description}
                    </p>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <span className="font-semibold text-slate-900 block text-[10px] uppercase mb-0.5">
                        Statutory Mandate:
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{agency.statutoryMandate}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-200 hover:border-blue-600"
                    >
                      <span>Visit Official Government Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: 100% Free & Confidential Debt Counseling Hotlines */}
      {activeSection === 'helplines' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">100% Non-Profit Financial Counseling Services</p>
              <p className="mt-0.5 text-emerald-800 leading-relaxed">
                If you are struggling with minimum payments, persistent debt, or collector harassment, reach out to these certified non-profit organizations. They will never charge you upfront fees or sell commercial loan products.
              </p>
            </div>
          </div>

          {/* Country Filter for Helplines */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Territorio:</span>
            {[
              { code: 'all', label: 'Todos 🌐' },
              { code: 'nz', label: '🇳🇿 Nueva Zelanda' },
              { code: 'au', label: '🇦🇺 Australia' },
              { code: 'us', label: '🇺🇸 Estados Unidos' },
              { code: 'ca', label: '🇨🇦 Canadá' },
              { code: 'uk', label: '🇬🇧 Reino Unido' },
            ].map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCountryFilter(c.code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCountryFilter === c.code
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEBT_COUNSELING_RESOURCES
              .filter((helpline) => selectedCountryFilter === 'all' || helpline.country === selectedCountryFilter)
              .map((helpline) => {
              const helplineCountry = COUNTRIES_DATA[helpline.country];
              return (
                <div
                  key={helpline.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{helplineCountry?.flag || '🌐'}</span>
                        <div>
                          <span className="text-[11px] text-slate-400 block uppercase font-medium">
                            {helplineCountry?.name || helpline.country}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            100% Free & Non-Profit
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {helpline.organization}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {helpline.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                    <a
                      href={`tel:${helpline.phone.replace(/[^0-9+]/g, '')}`}
                      className="w-full sm:w-auto flex-1 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call: {helpline.phone}</span>
                    </a>

                    <a
                      href={helpline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 border border-slate-200 transition-colors"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AdSense Placement */}
      <AdBanner slotType="leaderboard" slotId="resources-bottom" />
    </div>
  );
};
