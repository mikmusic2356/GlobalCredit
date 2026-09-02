import React, { useState, useMemo } from 'react';
import { CountryCode, FinancialGuide } from '../../types';
import { CmsArticle } from '../../types/cms';
import { COUNTRIES_DATA } from '../../data/countries';
import { FINANCIAL_GUIDES_DATA } from '../../data/guides';
import { ArticleStoreService } from '../../data/articles/articleStore';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Search,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileText
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { AdSlotTop, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';
import { GuideArticlePage } from './GuideArticlePage';

interface UnifiedGuideItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  summary: string;
  readingTimeMinutes: number;
  publishedDate?: string;
  lastUpdated?: string;
  imageUrl?: string;
  imageAlt?: string;
  sectionsCount: number;
  isCms: boolean;
  rawCms?: CmsArticle;
  rawLegacy?: FinancialGuide;
}

interface GuidesViewProps {
  selectedCountry: CountryCode;
  activeGuide: FinancialGuide | null;
  onSelectGuide: (guide: FinancialGuide | null) => void;
  onSelectCmsArticle?: (article: CmsArticle) => void;
  onNavigateToCreditScores?: () => void;
}

const ITEMS_PER_PAGE = 9;

export const GuidesView: React.FC<GuidesViewProps> = ({
  selectedCountry,
  activeGuide,
  onSelectGuide,
  onSelectCmsArticle,
  onNavigateToCreditScores,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const country = COUNTRIES_DATA[selectedCountry] || COUNTRIES_DATA['us'];

  // Load all published CMS articles + legacy guides
  const unifiedGuides: UnifiedGuideItem[] = useMemo(() => {
    const cmsArticles = ArticleStoreService.getPublishedArticles().filter(
      (a) => a.type === 'financial-guide' || a.type === 'guide' || a.type === 'educational'
    );

    const cmsItems: UnifiedGuideItem[] = cmsArticles.map((art) => ({
      id: art.id,
      slug: art.slug,
      title: art.title,
      category: art.subcategory || art.category || 'Financial Guides',
      subcategory: art.subcategory,
      summary: art.subtitle || art.seo?.metaDescription || 'Complete consumer guide and regulatory facts.',
      readingTimeMinutes: art.readingTimeMinutes || 5,
      publishedDate: art.publishedDate,
      lastUpdated: art.lastUpdatedDate,
      imageUrl: art.featuredImage?.url || 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
      imageAlt: art.featuredImage?.alt || art.title,
      sectionsCount: art.blocks?.length || 4,
      isCms: true,
      rawCms: art,
    }));

    const legacyItems: UnifiedGuideItem[] = FINANCIAL_GUIDES_DATA.map((g) => ({
      id: g.id,
      slug: g.slug,
      title: g.title,
      category: g.category,
      summary: g.summary,
      readingTimeMinutes: g.readingTimeMinutes,
      publishedDate: g.publishedDate || '2026-08-01',
      lastUpdated: g.lastUpdated,
      imageUrl: g.featuredImage?.url || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      imageAlt: g.featuredImage?.alt || g.title,
      sectionsCount: g.sections.length,
      isCms: false,
      rawLegacy: g,
    }));

    // Deduplicate by slug
    const seen = new Set<string>();
    const list: UnifiedGuideItem[] = [];
    for (const item of [...cmsItems, ...legacyItems]) {
      if (!seen.has(item.slug)) {
        seen.add(item.slug);
        list.push(item);
      }
    }
    return list;
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>(['All']);
    unifiedGuides.forEach((g) => {
      if (g.category) cats.add(g.category);
    });
    return Array.from(cats);
  }, [unifiedGuides]);

  const filteredGuides = useMemo(() => {
    return unifiedGuides.filter((g) => {
      const matchCat = selectedCategory === 'All' || g.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        searchQuery.trim() === '' ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [unifiedGuides, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGuides = filteredGuides.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // If a legacy guide is selected, render its dedicated page (AFTER all hooks)
  if (activeGuide) {
    return (
      <GuideArticlePage
        guide={activeGuide}
        onBack={() => onSelectGuide(null)}
        onSelectOtherGuide={(g) => onSelectGuide(g)}
        onNavigateToCreditScores={onNavigateToCreditScores}
      />
    );
  }

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleItemClick = (item: UnifiedGuideItem) => {
    if (item.isCms && item.rawCms) {
      if (onSelectCmsArticle) {
        onSelectCmsArticle(item.rawCms);
      } else {
        window.history.pushState({}, '', `/article/${item.slug}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else if (item.rawLegacy) {
      onSelectGuide(item.rawLegacy);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center shrink-0 mb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Guías Financieras y Educación de Crédito</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Biblioteca de Educación Financiera
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Artículos explicativos e imparciales respaldados por reguladores (CFPB, FCA, FCAC, ASIC). Aprende sobre APRs, traslados de balance al 0%, puntajes FICO y leyes de protección al consumidor.
        </p>

        {/* Search & Category Filter Toolbar */}
        <div className="pt-4 max-w-xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar en guías por tema, interés, FICO o derechos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <AdSlotTop slotId="guides-directory-top" label="Sponsored Educational Resources & Financial Literacy" />

      {/* Featured Interactive Credit Score Hub Banner */}
      {onNavigateToCreditScores && (
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-indigo-50/40 border border-blue-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Simulador y Factores Interactivos</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Puntajes de Crédito Explicados al Detalle
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Analiza los modelos FICO y VantageScore, los 5 factores de cálculo, reportes legales gratuitos y hojas de ruta para optimizar tu score.
            </p>
          </div>
          <button
            onClick={onNavigateToCreditScores}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shrink-0 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Abrir Simulador de Crédito →</span>
          </button>
        </div>
      )}

      {/* Result Count Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3">
        <span className="font-semibold text-slate-700">
          Mostrando {paginatedGuides.length} de {filteredGuides.length} artículos disponibles
        </span>
        <span>Página {currentPage} de {totalPages}</span>
      </div>

      {/* Guides Grid with Featured Images */}
      {paginatedGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => handleItemClick(guide)}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={guide.imageUrl}
                    alt={guide.imageAlt || guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs font-bold text-blue-800 text-[11px] shadow-xs border border-white/60">
                      {guide.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      {guide.readingTimeMinutes} min de lectura
                    </span>
                    <span className="text-[11px] text-slate-400">{guide.publishedDate}</span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {guide.title}
                  </h2>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  {guide.sectionsCount} secciones
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-200 group-hover:border-blue-600">
                  <span>Leer Guía</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-white border border-slate-200 rounded-2xl">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-base font-bold text-slate-800">No se encontraron artículos con estos criterios</p>
          <p className="text-xs text-slate-500">Prueba cambiando la categoría o limpiando el texto del buscador.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
          >
            Ver Todas las Guías
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Middle Billboard AdSense Banner */}
      <AdSlotBetweenSections slotId="guides-directory-mid" label="Financial Planning & Banking Partners" />

      {/* Trust & Transparency Disclosure */}
      <TrustDisclosureBox
        publishedDate="2026-07-01"
        lastUpdatedDate="2026-09-01"
        lastVerifiedDate="2026-09-01"
        verificationStatus="VERIFIED"
        regulatoryBody="International Financial Consumer Protection Organization (FinCoNet)"
        sources={[
          {
            title: 'Statutory Consumer Credit Compliance Guidelines (US CFPB, UK FCA, AU ASIC, CA FCAC, NZ Commerce Commission)',
            isOfficial: true,
          },
          {
            title: 'Independent Financial Literacy Standards and Truth in Lending Model Regulations',
            isOfficial: true,
          },
        ]}
      />

      {/* Bottom AdSense Banner */}
      <AdSlotBottom slotId="guides-directory-bottom" label="Sponsored Educational Resources" />
    </div>
  );
};

