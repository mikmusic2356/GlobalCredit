import React from 'react';
import { ActiveTab, CountryCode } from '../../types';
import { COUNTRY_LIST, COUNTRIES_DATA } from '../../data/countries';
import { DEBT_COUNSELING_RESOURCES } from '../../data/resources';
import { ShieldCheck, PhoneCall, Globe2, AlertCircle, HeartHandshake } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  openCountryModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
  openCountryModal,
}) => {
  const currentCountry = COUNTRIES_DATA[selectedCountry];
  const hotlines = DEBT_COUNSELING_RESOURCES.filter((r) => r.country === selectedCountry);

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-sm mt-16 transition-colors shadow-xs">
      {/* Free Debt Counseling Banner */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-slate-900 font-semibold text-sm sm:text-base flex items-center gap-2">
                Experiencing Credit Card Debt or Financial Hardship in {currentCountry.name}?
              </p>
              <p className="text-xs text-slate-500">
                100% free, confidential, non-profit financial counseling is available. No commercial sales.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {hotlines.slice(0, 2).map((h) => (
              <a
                key={h.id}
                href={`tel:${h.phone.replace(/[^0-9+]/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{h.organization.split('(')[0].trim()}: {h.phone}</span>
              </a>
            ))}
            <button
              onClick={() => setActiveTab('resources')}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 shadow-xs"
            >
              All Helplines →
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                CI
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Card<span className="text-blue-600">Insight</span> <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">online</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 pr-4">
              <strong>CardInsight Online</strong> (<code>cardinsight.online</code>) es una plataforma internacional independiente de inteligencia e información sobre tarjetas de crédito y educación financiera. Ofrecemos datos verificados, estructurados y accesibles para Estados Unidos, Canadá, Reino Unido, Australia y Nueva Zelanda.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Independent Editorial Charter • Zero Fake Data Policy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-3">
              Explore Platform
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => setActiveTab('cards')} className="hover:text-blue-600 transition-colors">
                  Browse Credit Cards
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-blue-600 transition-colors">
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('credit-score')} className="hover:text-blue-600 transition-colors">
                  Credit Scores Explained
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculators')} className="hover:text-blue-600 transition-colors">
                  Financial Calculators
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('guides')} className="hover:text-blue-600 transition-colors">
                  Credit & Finance Guides
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('news')} className="hover:text-blue-600 transition-colors">
                  News & Rate Trends
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-blue-600 transition-colors">
                  Glossary & Regulators
                </button>
              </li>
            </ul>
          </div>

          {/* Jurisdictions / Country Hubs */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-3">
              Country Directories
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {COUNTRY_LIST.map((c) => (
                <li key={c.code}>
                  <button
                    onClick={() => {
                      setSelectedCountry(c.code);
                      setActiveTab('countries');
                    }}
                    className={`flex items-center gap-1.5 hover:text-blue-600 transition-colors ${
                      selectedCountry === c.code ? 'text-blue-600 font-semibold' : ''
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name} ({c.currency.code})</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={openCountryModal}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Country Architecture Overview</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & AdSense Policy */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-3">
              Transparency & Legal
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-600 transition-colors">
                  Editorial Independence
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy-policy')} className="hover:text-blue-600 transition-colors">
                  Privacy Policy (CCPA/GDPR)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cookie-policy')} className="hover:text-blue-600 transition-colors">
                  Cookie Policy & Preferences
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms' as any)} className="hover:text-blue-600 transition-colors">
                  Términos y Condiciones de Uso
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-600 transition-colors">
                  Google AdSense Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-blue-600 transition-colors">
                  Methodology & Sources
                </button>
              </li>
              <li className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setActiveTab('admin')}
                  className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  <span>Admin CMS Portal →</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers & Not a Lender Notice */}
        <div className="mt-10 pt-8 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed space-y-3">
          <div className="flex items-start gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-slate-900 font-semibold">
                AVISO REGULATORIO Y LEGAL IMPORTANTE (NO SOMOS BANCO, PRESTAMISTA NI ASESOR FINANCIERO):
              </p>
              <p>
                <strong>CardInsight Online</strong> (<code>cardinsight.online</code>) es un directorio y portal informativo independiente. No somos emisores de tarjetas, intermediarios ni entidades de reparación crediticia. No otorgamos crédito, no procesamos solicitudes ni prestamos asesoramiento financiero personalizado.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 pt-2 gap-2">
            <p>© {new Date().getFullYear()} CardInsight Online (cardinsight.online). Todos los derechos reservados.</p>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Dominio Oficial: cardinsight.online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
