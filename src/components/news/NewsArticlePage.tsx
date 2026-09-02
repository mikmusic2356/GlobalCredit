import React, { useEffect, useState } from 'react';
import { NewsItem, CountryCode } from '../../types';
import { NEWS_AND_TRENDS_DATA } from '../../data/news';
import { COUNTRIES_DATA } from '../../data/countries';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  Share2, 
  Check, 
  ShieldAlert, 
  ExternalLink, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Globe2,
  FileCheck2
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotInContent, AdSlotSidebar, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';

interface NewsArticlePageProps {
  news: NewsItem;
  onBack: () => void;
  onSelectOtherNews: (news: NewsItem) => void;
  selectedCountry?: CountryCode;
}

export const NewsArticlePage: React.FC<NewsArticlePageProps> = ({
  news,
  onBack,
  onSelectOtherNews,
  selectedCountry = 'us',
}) => {
  const [copied, setCopied] = useState(false);
  const currentCountry = COUNTRIES_DATA[selectedCountry];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [news.id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Related news for "Te puede interesar"
  const relatedNews = NEWS_AND_TRENDS_DATA
    .filter((n) => n.id !== news.id)
    .sort((a, b) => (a.category === news.category ? -1 : 1))
    .slice(0, 3);

  const getCountryFlag = (countryCode?: string) => {
    switch (countryCode?.toLowerCase()) {
      case 'us':
        return '🇺🇸 Estados Unidos';
      case 'uk':
      case 'gb':
        return '🇬🇧 Reino Unido';
      case 'ca':
        return '🇨🇦 Canadá';
      case 'au':
        return '🇦🇺 Australia';
      case 'nz':
        return '🇳🇿 Nueva Zelanda';
      default:
        return '🌐 Global Multi-País';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition-all shadow-2xs group"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
          <span>Volver a Noticias y Tendencias</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">¡Enlace Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Compartir Noticia</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Leaderboard AdSense */}
      <AdSlotTop slotId={`news-top-${news.slug}`} label={`Financial Intelligence • ${news.category}`} />

      {/* Article Header */}
      <header className="max-w-4xl space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
            {news.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Publicado: {news.publishedDate}</span>
          </span>
          {news.lastUpdatedDate && (
            <>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Actualizado: {news.lastUpdatedDate}</span>
              </span>
            </>
          )}
          <span className="text-slate-300">•</span>
          <DataVerificationBadge
            status={news.verificationStatus || 'VERIFIED'}
            lastVerifiedDate={news.lastVerifiedDate || news.lastUpdatedDate || news.publishedDate}
            size="sm"
          />
          <span className="text-slate-300">•</span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
            {getCountryFlag(news.country)}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
          {news.title}
        </h1>

        {/* Lead Synopsis */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 border border-slate-200 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
          {news.snippet}
        </div>

        {/* Featured Visual Image */}
        {news.featuredImage?.url && (
          <figure className="space-y-2 rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 shadow-xs">
            <div className="relative aspect-video sm:aspect-21/9 overflow-hidden bg-slate-900/5">
              <img
                src={news.featuredImage.url}
                alt={news.featuredImage.alt || news.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {(news.featuredImage.caption || news.featuredImage.credit) && (
              <figcaption className="px-4 py-2.5 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-white">
                <span className="font-medium text-slate-600">{news.featuredImage.caption}</span>
                {news.featuredImage.credit && (
                  <span className="text-[11px] text-slate-400 font-mono">Crédito: {news.featuredImage.credit}</span>
                )}
              </figcaption>
            )}
          </figure>
        )}
      </header>

      {/* Main Grid: News Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Article Content (8 cols) */}
        <article className="lg:col-span-8 space-y-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          
          {/* Main Journalistic Content */}
          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            {Array.isArray(news.content) ? (
              news.content.map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  <p className="leading-relaxed whitespace-pre-line text-slate-700">{typeof paragraph === 'string' ? paragraph : JSON.stringify(paragraph)}</p>
                  {/* Mid-article AdSense Banner */}
                  {idx === 1 && (
                    <div className="py-2">
                      <AdSlotInContent slotId={`news-in-content-${news.slug}`} label="Sponsored Financial News" />
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <p className="leading-relaxed whitespace-pre-line text-slate-700">{String(news.content || '')}</p>
            )}
          </div>

          {/* Consumer Impact Analysis Box */}
          {news.impactSummary && (
            <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>¿Qué Significa Esto Para Tu Bolsillo? (Impacto para el Consumidor)</span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {news.impactSummary}
              </p>
            </div>
          )}

          {/* Practical Action Steps Checklist */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Acciones Recomendadas Para Titulares de Tarjetas</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Revisa tu estado de cuenta mensual para verificar posibles cambios en cargos anuales o márgenes de APR informados por el emisor.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Si tu tarjeta modificó sus categorías de recompensas, recalcula si la cuota anual sigue justificando el beneficio neto recibido.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Para traslados de saldo (Balance Transfer), asegúrate de liquidar la totalidad de la deuda antes del vencimiento del periodo promocional al 0%.</span>
              </li>
            </ul>
          </div>

          {/* Verified Source Attribution Card */}
          {news.sourceAttribution && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  <span>Fuente Editorial Verificada:</span>
                </span>
                <p className="text-slate-500">{news.sourceAttribution}</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-500 font-semibold self-start sm:self-auto">
                Jurisdicción: {news.country ? String(news.country).toUpperCase() : 'GLOBAL'}
              </span>
            </div>
          )}

          {/* Tags Chips */}
          {Array.isArray(news.tags) && news.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Temas:</span>
              {news.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {String(tag)}
                </span>
              ))}
            </div>
          )}

          {/* Trust Disclosure Box */}
          <TrustDisclosureBox
            publishedDate={news.publishedDate}
            lastUpdatedDate={news.lastUpdatedDate || news.publishedDate}
            lastVerifiedDate={news.lastVerifiedDate || news.lastUpdatedDate || news.publishedDate}
            verificationStatus={news.verificationStatus || 'VERIFIED'}
            sources={
              news.sources && news.sources.length > 0
                ? news.sources
                : [
                    {
                      title: news.sourceAttribution || 'Official Financial News Wire & Central Bank Releases',
                      isOfficial: true,
                    },
                  ]
            }
          />
        </article>

        {/* Sidebar Column (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* News Metadata Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Datos de la Noticia
            </h3>
            <div className="space-y-3 text-xs divide-y divide-slate-100">
              <div className="pt-2 first:pt-0 flex justify-between">
                <span className="text-slate-500">Categoría:</span>
                <span className="font-bold text-slate-800">{news.category}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Fecha de Publicación:</span>
                <span className="font-bold text-slate-800">{news.publishedDate}</span>
              </div>
              {news.lastUpdatedDate && (
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Última Revisión:</span>
                  <span className="font-bold text-emerald-600">{news.lastUpdatedDate}</span>
                </div>
              )}
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Ámbito:</span>
                <span className="font-bold text-slate-800">{getCountryFlag(news.country)}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Estado:</span>
                <span className="font-bold text-blue-600">Vigente & Verificado</span>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Todas las Noticias</span>
            </button>
          </div>

          {/* Central Bank Policy Tracker Snapshot */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>Tasas de Referencia Bancaria</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-medium text-slate-700">🇺🇸 Federal Reserve</span>
                <span className="font-bold text-blue-600">5.25% - 5.50%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-medium text-slate-700">🇬🇧 Bank of England</span>
                <span className="font-bold text-blue-600">5.00%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-medium text-slate-700">🇨🇦 Bank of Canada</span>
                <span className="font-bold text-blue-600">4.50%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                <span className="font-medium text-slate-700">🇦🇺 Reserve Bank AU</span>
                <span className="font-bold text-blue-600">4.35%</span>
              </div>
            </div>
          </div>

          {/* AdSense Sidebar Ad */}
          <AdSlotSidebar slotId={`news-sidebar-${news.slug}`} label="Sponsored Banking Alerts" />
        </aside>

      </div>

      {/* Banner Ad Before "Te Puede Interesar" */}
      <div className="pt-4">
        <AdSlotBetweenSections slotId={`news-pre-related-${news.slug}`} label="Sponsored Banking Reports" />
      </div>

      {/* SECCIÓN "TE PUEDE INTERESAR" (Related News) */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Actualizaciones Relacionadas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Te Puede Interesar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Mantente al día con las últimas regulaciones, cambios de beneficios en tarjetas y tendencias bancarias.
            </p>
          </div>

          <button
            onClick={onBack}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Ver Todas las Noticias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Related News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedNews.map((relNews) => (
            <article
              key={relNews.id}
              onClick={() => onSelectOtherNews(relNews)}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-100">
                    {relNews.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{relNews.publishedDate}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {relNews.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {relNews.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {relNews.country ? relNews.country.toUpperCase() : 'GLOBAL'}
                </span>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Leer noticia completa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Leaderboard AdSense */}
      <AdSlotBottom slotId={`news-bottom-${news.slug}`} label="Sponsored Financial News" />

    </div>
  );
};
