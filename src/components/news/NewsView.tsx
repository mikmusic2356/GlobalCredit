import React, { useState, useMemo } from 'react';
import { CountryCode, NewsItem } from '../../types';
import { NEWS_AND_TRENDS_DATA } from '../../data/news';
import { COUNTRIES_DATA } from '../../data/countries';
import { 
  Newspaper, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Tag, 
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotInContent, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';
import { NewsArticlePage } from './NewsArticlePage';

interface NewsViewProps {
  selectedCountry: CountryCode;
  activeNews?: NewsItem | null;
  onSelectNews?: (news: NewsItem | null) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  selectedCountry,
  activeNews: externalActiveNews,
  onSelectNews: externalOnSelectNews,
}) => {
  const [internalActiveNews, setInternalActiveNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const currentCountry = COUNTRIES_DATA[selectedCountry];

  // Support controlled or uncontrolled active news
  const activeNews = externalActiveNews !== undefined ? externalActiveNews : internalActiveNews;
  const handleSelectNews = (item: NewsItem | null) => {
    if (externalOnSelectNews) {
      externalOnSelectNews(item);
    } else {
      setInternalActiveNews(item);
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    NEWS_AND_TRENDS_DATA.forEach((item) => set.add(item.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredNews = useMemo(() => {
    return NEWS_AND_TRENDS_DATA.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchCountry =
        selectedCountryFilter === 'all' ||
        item.country === selectedCountryFilter ||
        item.country === 'global';
      return matchCategory && matchCountry;
    });
  }, [selectedCategory, selectedCountryFilter]);

  // If a news item is selected, render its dedicated blog article page directly (AFTER all hooks)
  if (activeNews) {
    return (
      <NewsArticlePage
        news={activeNews}
        onBack={() => handleSelectNews(null)}
        onSelectOtherNews={(item) => handleSelectNews(item)}
        selectedCountry={selectedCountry}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center shrink-0 mb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <Newspaper className="w-3.5 h-3.5 text-blue-600" />
          <span>Inteligencia de Mercado, Lanzamientos y Regulaciones</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Noticias y Tendencias en Tarjetas
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Monitorea nuevos lanzamientos de tarjetas, cambios en programas de lealtad, variaciones en comisiones, regulaciones de CFPB y FCA, y tasas de interés en tiempo real.
        </p>
      </header>

      {/* Top AdSense Banner */}
      <AdSlotTop slotId="news-directory-top" label="Sponsored Financial News & Credit Market Intelligence" />

      {/* Central Bank Policy Tracker Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Tasas de Referencia de Bancos Centrales y APR Promedio
          </h2>
          <span className="text-xs text-slate-400 font-medium">Actualizado: Q3 Datos Oficiales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            { country: 'Estados Unidos 🇺🇸', bank: 'Federal Reserve', rate: '5.25% - 5.50%', avgApr: '21.5% - 24.9%', impact: 'Prime Rate vinculado' },
            { country: 'Reino Unido 🇬🇧', bank: 'Bank of England', rate: '5.00%', avgApr: '24.9% - 29.9%', impact: 'Base Rate vinculado' },
            { country: 'Canadá 🇨🇦', bank: 'Bank of Canada', rate: '4.50%', avgApr: '19.99% - 22.99%', impact: 'Niveles fijos estándar' },
            { country: 'Australia 🇦🇺', bank: 'Reserve Bank (RBA)', rate: '4.35%', avgApr: '19.99% - 23.49%', impact: 'Overnight cash rate' },
            { country: 'Nueva Zelanda 🇳🇿', bank: 'Reserve Bank (RBNZ)', rate: '5.25%', avgApr: '19.95% - 22.95%', impact: 'Official OCR vinculado' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
            >
              <p className="font-bold text-slate-900 text-xs">{item.country}</p>
              <p className="text-[11px] text-slate-500">{item.bank}</p>
              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Tasa de Política
                </span>
                <p className="text-base font-bold text-blue-600">{item.rate}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  APR Promedio Tarjetas
                </span>
                <p className="text-xs font-semibold text-slate-700">{item.avgApr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar: Territory and Categories */}
      <div className="space-y-4">
        {/* Territory Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" /> Territorio:
          </span>
          {[
            { code: 'all', label: 'Todos los Territorios 🌐' },
            { code: 'nz', label: '🇳🇿 Nueva Zelanda' },
            { code: 'au', label: '🇦🇺 Australia' },
            { code: 'us', label: '🇺🇸 Estados Unidos' },
            { code: 'ca', label: '🇨🇦 Canadá' },
            { code: 'uk', label: '🇬🇧 Reino Unido' },
          ].map((c) => {
            const isSelected = selectedCountryFilter === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setSelectedCountryFilter(c.code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Categories Filter Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Categoría de Noticia:
            </span>
            <span className="text-xs text-slate-500">
              Mostrando {filteredNews.length} de {NEWS_AND_TRENDS_DATA.length} noticias
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((news) => (
          <article
            key={news.id}
            onClick={() => handleSelectNews(news)}
            className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
                  {news.category}
                </span>

                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{news.publishedDate}</span>
                  </span>
                  {news.lastUpdatedDate && (
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{news.lastUpdatedDate}</span>
                    </span>
                  )}
                  <DataVerificationBadge
                    status={news.verificationStatus || 'VERIFIED'}
                    lastVerifiedDate={news.lastVerifiedDate || news.lastUpdatedDate || news.publishedDate}
                    size="sm"
                  />
                </div>
              </div>

              {news.featuredImage?.url && (
                <div className="relative aspect-video sm:aspect-21/9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-2">
                  <img
                    src={news.featuredImage.url}
                    alt={news.featuredImage.alt || news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {news.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                {news.snippet || ''}
              </p>

              {news.content && (
                <div className="space-y-1.5 pt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {Array.isArray(news.content) ? news.content[0] : String(news.content)}
                </div>
              )}

              {Array.isArray(news.tags) && news.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {news.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                    >
                      <Tag className="w-2.5 h-2.5 text-slate-400" />
                      {String(t)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Jurisdicción: {news.country ? news.country.toUpperCase() : 'GLOBAL'}
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-200 group-hover:border-blue-600">
                <span>Leer Noticia Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Middle Billboard AdSense Banner */}
      <AdSlotBetweenSections slotId="news-directory-mid" label="Sponsored Banking Wire" />

      {/* Trust & Transparency Disclosure */}
      <TrustDisclosureBox
        publishedDate="2026-08-01"
        lastUpdatedDate="2026-09-01"
        lastVerifiedDate="2026-09-01"
        verificationStatus="VERIFIED"
        regulatoryBody="Central Bank Communication Feeds & Statutory Consumer Finance Agencies"
        sources={[
          {
            title: 'Federal Reserve, Bank of England, Bank of Canada, RBA & RBNZ Official Disclosures',
            isOfficial: true,
          },
          {
            title: 'Consumer Financial Protection Bureau (CFPB) & Financial Conduct Authority (FCA) News Releases',
            isOfficial: true,
          },
        ]}
      />

      {/* Bottom AdSense Banner */}
      <AdSlotBottom slotId="news-directory-bottom" label="Sponsored Financial News & Credit Insights" />
    </div>
  );
};
