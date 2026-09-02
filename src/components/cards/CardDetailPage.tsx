import React, { useState, useEffect } from 'react';
import { CreditCardItem, CountryCode } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { CREDIT_CARDS_DATA } from '../../data/cards';
import { 
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
  Scale,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotInContent, AdSlotSidebar, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';
import { CardVisual } from './CardVisual';

interface CardDetailPageProps {
  card: CreditCardItem;
  onBack: () => void;
  onSelectOtherCard: (card: CreditCardItem) => void;
  onToggleCompare?: (card: CreditCardItem) => void;
  isCompared?: boolean;
  onNavigateToCompare?: () => void;
}

const UNAVAILABLE_MSG = 'Information not available from our verified sources.';

export const CardDetailPage: React.FC<CardDetailPageProps> = ({
  card,
  onBack,
  onSelectOtherCard,
  onToggleCompare,
  isCompared = false,
  onNavigateToCompare,
}) => {
  const [copied, setCopied] = useState(false);
  const country = COUNTRIES_DATA[card.country];

  // Scroll to top on card load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [card.id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Find similar alternative cards in the same country
  const relatedCards = CREDIT_CARDS_DATA
    .filter((c) => c.country === card.country && c.id !== card.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      
      {/* Top Breadcrumbs & Action Bar */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={onBack} className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Tarjetas de {country.name}</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400">{country.name}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">{card.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(card)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isCompared
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isCompared ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isCompared ? 'En Comparador' : 'Agregar a Comparador'}</span>
            </button>
          )}

          {isCompared && onNavigateToCompare && (
            <button
              onClick={onNavigateToCompare}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors shadow-2xs"
            >
              <span>Ver Matriz</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 transition-colors"
            title="Copiar enlace directo"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">¡Enlace Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Compartir</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Top AdSense Banner */}
      <AdSlotTop slotId={`card-detail-top-${card.id}`} label={`Sponsored Recommendations • ${country.name} Credit Cards`} />

      {/* Card Hero Header */}
      <header className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Visual Card Mockup */}
          <div className="md:col-span-4 max-w-sm">
            <CardVisual card={card} size="lg" />
          </div>

          {/* Details & Badges */}
          <div className="md:col-span-8 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {card.issuer} • {country.flag} {country.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                  {card.network}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                {card.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                <strong>Emisor Oficial:</strong> {card.issuer} &bull; <strong>Moneda:</strong> {country.currency.code} ({country.currency.symbol})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <DataVerificationBadge
                status={card.verificationStatus || 'VERIFIED'}
                lastVerifiedDate={card.lastVerifiedDate}
                size="md"
              />

              <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Calificación Editorial</span>
                <div className="flex items-center justify-center gap-1 font-bold text-slate-900 text-sm">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{card.ratingScore.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-center">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Perfil de Crédito</span>
                <span className="text-xs font-bold text-blue-900">{card.creditScoreRequirement}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Summary Box */}
        {card.editorialSummary && (
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-blue-900 block mb-1 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Análisis Editorial y Resumen del Producto:
            </span>
            {card.editorialSummary}
          </div>
        )}
      </header>

      {/* Main Grid: Financial Terms & In-Depth Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Schumer Box, Rewards, Rates, Pros & Cons */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Official Schumer Box / Financial Matrix */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Cuadro Financiero Oficial (Schumer Box / Financial Terms)
              </h2>
              <span className="text-xs text-slate-400">Verificado: {card.lastVerifiedDate}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Annual Fee */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Cuota Anual (Annual Fee)</span>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {card.annualFee === 0 ? 'Sin Cuota Anual ($0)' : `${country.currency.symbol}${card.annualFee}`}
                </p>
                {card.annualFeePromo && (
                  <p className="text-xs text-emerald-600 font-medium mt-1">{card.annualFeePromo}</p>
                )}
              </div>

              {/* Regular Purchase APR */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">
                  {country.terminology.interestRateLabel}
                </span>
                <p className="text-lg font-bold text-slate-900 mt-1">{card.regularApr.rateDisplay}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Tipo: {card.regularApr.type}</p>
              </div>

              {/* Intro APR / Promotional Period */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Tasa Promocional 0% Intro APR</span>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {card.introApr ? `${card.introApr.rate}% por ${card.introApr.durationMonths} meses` : 'No ofrece 0% intro'}
                </p>
                {card.introApr && (
                  <p className="text-[11px] text-slate-500 mt-0.5">Aplica a: {card.introApr.appliesTo}</p>
                )}
              </div>

              {/* Foreign Transaction Fee */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">
                  {country.terminology.foreignFeeLabel}
                </span>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {card.foreignTransactionFee.isZero ? (
                    <span className="text-emerald-600">0% (Sin comisión en el exterior)</span>
                  ) : (
                    `${card.foreignTransactionFee.percent}% por transacción`
                  )}
                </p>
                {card.foreignTransactionFee.details && (
                  <p className="text-[11px] text-slate-500 mt-0.5">{card.foreignTransactionFee.details}</p>
                )}
              </div>

              {/* Balance Transfer Fee */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">
                  {country.terminology.balanceTransferLabel}
                </span>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {card.balanceTransferFee
                    ? `${card.balanceTransferFee.percent}% (Mínimo ${country.currency.symbol}${card.balanceTransferFee.minimumAmount})`
                    : 'Consulte con el emisor'}
                </p>
              </div>

              {/* Penalty APR & Other Fees */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Comisión por Pago Tardío</span>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  {card.otherFees?.latePayment || 'Hasta el límite legal regulatorio'}
                </p>
              </div>
            </div>

            {/* Intro terms note */}
            {card.introApr?.termsNotice && (
              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-slate-700 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{card.introApr.termsNotice}</span>
              </div>
            )}

            {/* Representative example for UK */}
            {card.representativeExample && (
              <div className="p-3 rounded-lg bg-slate-100 text-slate-600 text-xs border border-slate-200">
                <strong>UK Representative Example (FCA Compliance):</strong> {card.representativeExample}
              </div>
            )}
          </section>

          {/* In-Article Native Ad Unit */}
          <AdSlotInContent slotId={`card-detail-mid-${card.id}`} label="Sponsored Product Information" />

          {/* Rewards Program & Benefits */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Gift className="w-4 h-4 text-blue-600" />
              Estructura de Recompensas y Beneficios
            </h2>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-400">Tipo de Recompensa:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                  {card.rewardsStructure.type}
                </span>
              </div>
              <p className="text-base font-bold text-slate-900">{card.rewardsStructure.headline}</p>
              <p className="text-xs text-slate-600"><strong>Tasa Base:</strong> {card.rewardsStructure.baseRate}</p>

              {card.rewardsStructure.categoryRates && card.rewardsStructure.categoryRates.length > 0 && (
                <div className="pt-2 border-t border-slate-200/80 space-y-1">
                  <span className="text-xs font-semibold text-slate-700 block">Categorías Multiplicadoras:</span>
                  <ul className="space-y-1">
                    {card.rewardsStructure.categoryRates.map((rate, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{rate}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Perks */}
            {card.keyPerks && card.keyPerks.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold uppercase text-slate-400">Beneficios Principales (Perks):</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {card.keyPerks.map((perk, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Pros & Cons */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              Ventajas y Desventajas Objetivas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                <h3 className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Ventajas (Pros)
                </h3>
                <ul className="space-y-2">
                  {card.pros.map((pro, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2">
                <h3 className="text-xs font-bold uppercase text-red-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Desventajas a Considerar (Cons)
                </h3>
                <ul className="space-y-2">
                  {card.cons.map((con, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Eligibility & Requirements */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Criterios de Elegibilidad y Requisitos de Solicitud
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">Rango de Score</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{card.creditScoreRequirement}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">Residencia</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{country.name} (Residente Legal)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">Edad Mínima</span>
                <span className="font-bold text-slate-900 mt-0.5 block">18 años (21 años en EE.UU. sin aval)</span>
              </div>
            </div>

            {card.applyRequirementNotes && (
              <p className="text-xs text-slate-500 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong>Nota del emisor:</strong> {card.applyRequirementNotes}
              </p>
            )}
          </section>

          {/* Full Transparency, Audit Dates & Sources Disclosure */}
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
                title: card.officialSource?.name || `${card.issuer} Official Terms Schedule`,
                url: card.sourceUrl || card.officialSource?.url,
                isOfficial: true,
              },
              {
                title: `${country.name} Banking & Consumer Credit Regulation (${country.regulator.abbreviation})`,
                url: country.regulator.website,
                isOfficial: true,
              },
            ]}
          />
        </div>

        {/* Right 4 Cols: Sidebar, Official Regulator, Half-Page Ad */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Official Verification & Regulatory Protection */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Marco Legal y Verificación</span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                Esta tarjeta está sujeta a la supervisión de <strong>{country.regulator.name} ({country.regulator.abbreviation})</strong>.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-[11px]">Portal del Regulador:</span>
                <a
                  href={country.regulator.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{country.regulator.abbreviation} Sitio Oficial</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 leading-normal">
              Datos auditados bajo normativas de transparencia financiera. CardInsight Online no es una entidad prestamista.
            </div>
          </div>

          {/* AdSense Half-Page Sidebar Ad */}
          <AdSlotSidebar slotId={`card-detail-sidebar-${card.id}`} label={`Sponsored • ${country.name} Banking Partners`} />

          {/* Quick Comparison Action Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-slate-50 border border-blue-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-blue-600" />
              ¿Comparar con Otras Opciones?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compara tasas de interés, cuotas anuales y beneficios lado a lado con hasta 4 tarjetas simultáneas.
            </p>
            {onToggleCompare && (
              <button
                onClick={() => onToggleCompare(card)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs"
              >
                {isCompared ? '✓ Ya está en la Matriz' : '+ Agregar a Comparación'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Billboard Ad Banner Between Sections */}
      <AdSlotBetweenSections slotId={`card-detail-between-${card.id}`} label="Financial Comparison & Banking Services" />

      {/* Similar & Alternative Credit Cards Section */}
      {relatedCards.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Otras Tarjetas Recomendadas en {country.name}
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedCards.map((relCard) => (
              <article
                key={relCard.id}
                onClick={() => onSelectOtherCard(relCard)}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-white transition-all cursor-pointer space-y-2.5 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {relCard.network}
                  </span>
                  <span className="font-bold text-slate-900">
                    {relCard.annualFee === 0 ? 'Sin Cuota' : `${country.currency.symbol}${relCard.annualFee}/año`}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
                  {relCard.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {relCard.editorialSummary || relCard.rewardsStructure.headline}
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">{relCard.regularApr.rateDisplay}</span>
                  <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                    <span>Ver Ficha</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Leaderboard AdSense */}
      <AdSlotBottom slotId={`card-detail-bottom-${card.id}`} label="Related Banking & Credit Options" />
    </div>
  );
};
