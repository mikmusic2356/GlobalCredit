import React, { useState } from 'react';
import { ActiveTab, CountryCode } from '../../types';
import { COUNTRIES_DATA, COUNTRY_LIST } from '../../data/countries';
import { 
  CreditCard, 
  Globe2, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Calculator, 
  BookOpen, 
  Layers, 
  Newspaper, 
  FolderArchive, 
  Info,
  ShieldCheck,
  Award
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  openSearch: () => void;
  openAiAssistant: () => void;
  openCountryModal: () => void;
  selectedCategory?: string;
  setSelectedCategory?: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
  openSearch,
  openAiAssistant,
  openCountryModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const currentCountry = COUNTRIES_DATA[selectedCountry];

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'cards', label: 'Credit Cards', icon: <Layers className="w-4 h-4" /> },
    { id: 'compare', label: 'Compare', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'credit-score', label: 'Credit Scores', icon: <Award className="w-4 h-4" /> },
    { id: 'calculators', label: 'Calculators', icon: <Calculator className="w-4 h-4" /> },
    { id: 'guides', label: 'Finance Guides', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'news', label: 'News & Trends', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <FolderArchive className="w-4 h-4" /> },
    { id: 'countries', label: 'Territories', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 transition-colors shadow-xs">
      {/* Sleek Top Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              id="header-logo-btn"
            >
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs group-hover:bg-blue-500 transition-colors">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  Card<span className="text-blue-600">Insight</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  Online
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm transition-colors py-1 ${
                    isActive
                      ? 'text-blue-600 font-semibold border-b-2 border-blue-600 -mb-0.5'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                  id={`desktop-nav-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Search, AI Assistant, Country Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 text-sm font-semibold px-3 sm:px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              id="header-search-btn"
              title="Search directory"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Search Index</span>
              <kbd className="hidden xl:inline text-[10px] font-mono bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={openAiAssistant}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              id="header-ai-explainer-btn"
              title="Ask factual credit questions powered by Gemini AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden sm:inline">Credit AI</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
              id="header-mobile-menu-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sleek Sub-Bar: Territory Selector */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-8 py-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mr-1 sm:mr-2 shrink-0">
          Select Territory
        </span>
        {COUNTRY_LIST.map((c) => {
          const isSelected = selectedCountry === c.code;
          return (
            <button
              key={c.code}
              onClick={() => setSelectedCountry(c.code)}
              className={`flex items-center gap-1.5 text-xs py-1 px-3 rounded-full transition-colors shrink-0 ${
                isSelected
                  ? 'font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs'
                  : 'font-medium text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="py-2 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
              Territory Selector:
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {COUNTRY_LIST.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setSelectedCountry(c.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-center text-xs font-medium border transition-colors ${
                    selectedCountry === c.code
                      ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-base leading-tight">{c.flag}</div>
                  <div className="text-[10px] uppercase font-mono mt-0.5">{c.code}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Verified Financial Directory</span>
            <span className="text-emerald-600 font-semibold">● Live Data</span>
          </div>
        </div>
      )}
    </header>
  );
};
