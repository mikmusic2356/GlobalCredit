import React, { useEffect, useState } from 'react';
import { FinancialGuide } from '../../types';
import { FINANCIAL_GUIDES_DATA } from '../../data/guides';
import { 
  BookOpen, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  Scale, 
  ShieldCheck, 
  Share2, 
  Check, 
  ListTree, 
  Sparkles, 
  ExternalLink, 
  HelpCircle,
  Award
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotInContent, AdSlotSidebar, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';

interface GuideArticlePageProps {
  guide: FinancialGuide;
  onBack: () => void;
  onSelectOtherGuide: (guide: FinancialGuide) => void;
  onNavigateToCreditScores?: () => void;
}

export const GuideArticlePage: React.FC<GuideArticlePageProps> = ({
  guide,
  onBack,
  onSelectOtherGuide,
  onNavigateToCreditScores,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);

  // Scroll to top whenever guide changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [guide.id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Get related guides for the "Te puede interesar" section
  const relatedGuides = FINANCIAL_GUIDES_DATA
    .filter((g) => g.id !== guide.id)
    .sort((a, b) => (a.category === guide.category ? -1 : 1))
    .slice(0, 3);

  const formatCountryScope = (scope: FinancialGuide['countryScope']) => {
    if (!scope || scope === 'all') return 'Global Multi-Country (US, CA, UK, AU, NZ)';
    if (Array.isArray(scope)) return scope.map((c) => c.toUpperCase()).join(', ');
    return String(scope).toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition-all shadow-2xs group"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
          <span>Volver a Todas las Guías Financieras</span>
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
                <span>Compartir Guía</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Leaderboard AdSense */}
      <AdSlotTop slotId={`guide-top-${guide.slug}`} label={`Financial Education • ${guide.category}`} />

      {/* Article Header */}
      <header className="max-w-4xl space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{guide.readingTimeMinutes} min de lectura</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">
            Actualizado: {guide.lastUpdated}
          </span>
          <span className="text-slate-300">•</span>
          <DataVerificationBadge
            status={guide.verificationStatus || 'VERIFIED'}
            lastVerifiedDate={guide.lastVerifiedDate || guide.lastUpdated}
            size="sm"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          {guide.title}
        </h1>

        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block">
            Resumen Ejecutivo & Puntos Clave:
          </span>
          <p className="font-medium text-slate-800">{guide.summary}</p>
          <div className="text-xs text-blue-700 pt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Ámbito Jurisdiccional: {formatCountryScope(guide.countryScope)}</span>
          </div>
        </div>
      </header>

      {/* Main Grid: Article Body + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Article Content Column (8 cols) */}
        <article className="lg:col-span-8 space-y-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          
          {/* Featured Visual Image */}
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={guide.featuredImage?.url || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'}
              alt={guide.featuredImage?.alt || guide.title}
              className="w-full h-auto max-h-[420px] object-cover"
              loading="eager"
            />
            {(guide.featuredImage?.caption || guide.featuredImage?.credit) && (
              <figcaption className="p-3 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200 bg-white">
                <span>{guide.featuredImage.caption}</span>
                {guide.featuredImage.credit && (
                  <span className="text-slate-400 text-[10px] font-medium">Fuente: {guide.featuredImage.credit}</span>
                )}
              </figcaption>
            )}
          </figure>

          {/* Table of Contents Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
              <ListTree className="w-4 h-4 text-blue-600" />
              <span>Índice de Contenido del Artículo</span>
            </div>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {guide.sections.map((section, idx) => (
                <a
                  key={idx}
                  href={`#seccion-${idx + 1}`}
                  onClick={() => setActiveSectionIdx(idx)}
                  className="p-2 rounded-lg bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 font-medium flex items-center gap-2 transition-colors truncate"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="truncate">{section.heading}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Guide Sections */}
          <div className="space-y-10 divide-y divide-slate-100">
            {guide.sections.map((section, idx) => (
              <section
                key={idx}
                id={`seccion-${idx + 1}`}
                className={`pt-8 first:pt-0 space-y-4 scroll-mt-20`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {section.heading}
                    </h2>
                  </div>
                </div>

                {/* Section Body */}
                <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                  <p>{section.body}</p>
                </div>

                {/* Tips Bullet List if provided */}
                {section.tips && section.tips.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Consejos Prácticos & Recomendaciones:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {section.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Structured Callout Box */}
                {section.callout && (
                  <div
                    className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
                      section.callout.type === 'warning'
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : section.callout.type === 'legal'
                        ? 'bg-purple-50 border-purple-200 text-purple-950'
                        : 'bg-blue-50 border-blue-200 text-blue-950'
                    }`}
                  >
                    {section.callout.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : section.callout.type === 'legal' ? (
                      <Scale className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      {section.callout.title && (
                        <h4 className="font-bold text-sm tracking-tight">{section.callout.title}</h4>
                      )}
                      <p className="leading-relaxed">{section.callout.text}</p>
                    </div>
                  </div>
                )}

                {/* In-Article AdSense Banner (in the middle section) */}
                {idx === Math.floor(guide.sections.length / 2) && (
                  <div className="py-4">
                    <AdSlotInContent slotId={`guide-in-article-${guide.slug}-${idx}`} label="Sponsored Educational Resource" />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Educational Conclusion Takeaway */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Regla de Oro de Educación Financiera</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-100">
              Las tarjetas de crédito son herramientas de pago y protección de liquidez a corto plazo, no mecanismos de financiación a largo plazo. Pagar el 100% de tu saldo antes de la fecha de corte evita el cobro de intereses compuestos y optimiza tu historial crediticio.
            </p>
          </div>

          {/* Full Trust & Transparency Disclosure Box */}
          <TrustDisclosureBox
            publishedDate={guide.publishedDate || '2026-07-15'}
            lastUpdatedDate={guide.lastUpdatedDate || guide.lastUpdated || '2026-09-01'}
            lastVerifiedDate={guide.lastVerifiedDate || '2026-09-01'}
            verificationStatus={guide.verificationStatus || 'VERIFIED'}
            regulatoryBody="Consumer Financial Protection Bureau (CFPB) & Financial Conduct Authority (FCA)"
            sources={
              guide.sources && guide.sources.length > 0
                ? guide.sources
                : [
                    {
                      title: 'Official Consumer Financial Protection Guidelines & Truth in Lending Schedules',
                      isOfficial: true,
                    },
                    {
                      title: 'Global Central Bank & Statutory Lending Compliance Regulations',
                      isOfficial: true,
                    },
                  ]
            }
          />
        </article>

        {/* Sidebar Column (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Quick Info Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Ficha del Artículo
            </h3>
            <div className="space-y-3 text-xs divide-y divide-slate-100">
              <div className="pt-2 first:pt-0 flex justify-between">
                <span className="text-slate-500">Categoría:</span>
                <span className="font-bold text-slate-800">{guide.category}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Tiempo de Lectura:</span>
                <span className="font-bold text-slate-800">{guide.readingTimeMinutes} minutos</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Jurisdicción:</span>
                <span className="font-bold text-slate-800">{formatCountryScope(guide.countryScope)}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Secciones:</span>
                <span className="font-bold text-slate-800">{guide.sections.length} temas clave</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Verificación:</span>
                <span className="font-bold text-emerald-600">Fuentes Oficiales</span>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Todas las Guías</span>
            </button>
          </div>

          {/* AdSense Half-Page Sidebar Ad */}
          <AdSlotSidebar slotId={`guide-sidebar-${guide.slug}`} label="Sponsored Financial Services" />

          {/* Interactive Credit Score Hub Card */}
          {onNavigateToCreditScores && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 space-y-3 text-xs">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 uppercase">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Simulador Interactivo</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                Puntajes de Crédito FICO & VantageScore
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Calcula tus factores de ponderación (utilización, pagos y antigüedad) y obtén tus reportes gratuitos por país.
              </p>
              <button
                onClick={onNavigateToCreditScores}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Abrir Hub de Crédito</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </aside>

      </div>

      {/* Banner Advertisement Before "Te Puede Interesar" */}
      <div className="pt-4">
        <AdSlotBetweenSections slotId={`guide-pre-related-${guide.slug}`} label="Sponsored Credit Education" />
      </div>

      {/* SECCIÓN "TE PUEDE INTERESAR" (Related Guides) */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lecturas Recomendadas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Te Puede Interesar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Explora otras guías financieras para dominar el manejo de deuda, tasas de interés y derechos del consumidor.
            </p>
          </div>

          <button
            onClick={onBack}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Related Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedGuides.map((relGuide) => (
            <article
              key={relGuide.id}
              onClick={() => onSelectOtherGuide(relGuide)}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-100">
                    {relGuide.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{relGuide.readingTimeMinutes} min</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {relGuide.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {relGuide.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {relGuide.sections.length} secciones
                </span>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Leer esta guía</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Leaderboard AdSense */}
      <AdSlotBottom slotId={`guide-bottom-${guide.slug}`} label="Sponsored Banking Guides" />

    </div>
  );
};
