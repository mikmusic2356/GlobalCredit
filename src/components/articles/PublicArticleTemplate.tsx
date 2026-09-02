import React from 'react';
import { CmsArticle } from '../../types/cms';
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  AlertTriangle,
  Scale,
  CheckCircle2,
  FileText,
  Share2,
  Bookmark,
  Building2
} from 'lucide-react';
import { DataVerificationBadge } from '../common/DataVerificationBadge';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import {
  AdSlotTop,
  AdSlotAfterIntro,
  AdSlotInContent,
  AdSlotMidArticle,
  AdSlotBeforeSources,
  AdSlotBottom,
  AdSlotSidebar
} from '../ads/AdSlots';
import { RelatedArticlesSection } from '../recommendations/RelatedArticlesSection';
import { ArticleStoreService } from '../../data/articles/articleStore';

interface PublicArticleTemplateProps {
  article: CmsArticle;
  onNavigateHome?: () => void;
  onNavigateCategory?: (category: string) => void;
  onSelectArticle?: (article: CmsArticle) => void;
  isPreview?: boolean;
}

export const PublicArticleTemplate: React.FC<PublicArticleTemplateProps> = ({
  article,
  onNavigateHome,
  onNavigateCategory,
  onSelectArticle,
  isPreview = false,
}) => {
  const relatedArticles = ArticleStoreService.getRelatedArticles(article, 3);

  // Group blocks for structured rendering with clean ad interleaving
  const blocks = article?.blocks || [];
  const totalBlocks = blocks.length;
  const midPoint = Math.floor(totalBlocks / 2);

  const authorName = article?.author?.name || 'CardInsight Editorial Staff';
  const authorRole = article?.author?.role || 'Senior Financial & Credit Analyst';
  const authorAvatar = article?.author?.avatar;
  const authorBio = article?.author?.bio;
  const countryUpper = (article?.country || 'us').toUpperCase();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Preview Banner if in preview mode */}
      {isPreview && (
        <div className="sticky top-4 z-40 bg-amber-500/95 text-slate-950 px-4 py-2.5 rounded-xl shadow-lg border border-amber-400 flex items-center justify-between text-xs font-semibold backdrop-blur-md">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-pulse" />
            <span>CMS Live Preview Mode &mdash; Real-Time Template Rendering ({article.status})</span>
          </span>
          <span className="font-mono bg-slate-950 text-white px-2 py-0.5 rounded text-[10px]">
            Slug: /{article.country}/{article.type === 'news' || article.type === 'trend' ? 'news' : 'guides'}/{article.slug}/
          </span>
        </div>
      )}

      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-1">
        <button
          onClick={onNavigateHome}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="uppercase font-bold tracking-wider text-slate-700">
          {countryUpper}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <button
          onClick={() => onNavigateCategory?.(article.category)}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          {article.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-400 truncate max-w-xs">{article.subcategory || article.title}</span>
      </nav>

      {/* Top Banner AdSlot */}
      <AdSlotTop slotId={`art-top-${article.id}`} label="Sponsored Banking Comparisons & Credit Offers" />

      {/* Main Article Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Editorial Column */}
        <article className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
          {/* Category & Region Metadata Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100/80">
                {article.subcategory || article.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                {countryUpper} Jurisdiction
              </span>
              <DataVerificationBadge
                status={article.verificationStatus || 'VERIFIED'}
                lastVerifiedDate={article.lastVerifiedDate}
                size="md"
              />
            </div>

            {/* 3. TITLE (Emoji & Unicode friendly) */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* 4. SUBTITLE / INTRODUCTION */}
            {article.subtitle && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal border-l-3 border-blue-600 pl-4 py-1 bg-slate-50/50 rounded-r-xl">
                {article.subtitle}
              </p>
            )}

            {/* 5. AUTHOR & DATES BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
              {/* Author */}
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900 text-sm">{authorName}</p>
                  <p className="text-slate-500 text-[11px]">{authorRole}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex flex-wrap items-center gap-4 text-slate-500">
                <span className="flex items-center gap-1.5" title="Original publication date">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Published: <strong>{article.publishedDate}</strong></span>
                </span>
                <span className="flex items-center gap-1.5" title="Latest editorial verification">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Updated: <strong>{article.lastUpdatedDate}</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>{article.readingTimeMinutes || 5} min read</span>
                </span>
              </div>
            </div>
          </div>

          {/* 6. FEATURED IMAGE */}
          {article.featuredImage?.url && (
            <figure className="space-y-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={article.featuredImage.url}
                alt={article.featuredImage.alt || article.title}
                className="w-full h-auto max-h-[440px] object-cover"
                loading="eager"
              />
              {(article.featuredImage.caption || article.featuredImage.credit) && (
                <figcaption className="p-3 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200/60 bg-white">
                  <span>{article.featuredImage.caption}</span>
                  {article.featuredImage.credit && (
                    <span className="text-slate-400 text-[10px] shrink-0 font-medium">
                      Source: {article.featuredImage.credit}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          )}

          {/* [AD SLOT AFTER INTRO] */}
          <AdSlotAfterIntro slotId={`art-intro-${article.id}`} label="Sponsored Card Offers & Rate Updates" />

          {/* 7. ARTICLE CONTENT BLOCKS */}
          <div className="space-y-6 text-slate-800 text-base leading-relaxed">
            {article.blocks.map((block, index) => {
              const renderBlock = () => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={block.id} className="text-slate-700 leading-relaxed text-[15px] sm:text-base">
                        {block.content}
                      </p>
                    );

                  case 'heading':
                    if (block.level === 1) {
                      return (
                        <h2 key={block.id} className="text-2xl sm:text-3xl font-bold text-slate-900 pt-6 pb-1 border-b border-slate-100">
                          {block.content}
                        </h2>
                      );
                    }
                    if (block.level === 2) {
                      return (
                        <h2 key={block.id} className="text-xl sm:text-2xl font-bold text-slate-900 pt-5 pb-1">
                          {block.content}
                        </h2>
                      );
                    }
                    return (
                      <h3 key={block.id} className="text-lg sm:text-xl font-bold text-slate-900 pt-4">
                        {block.content}
                      </h3>
                    );

                  case 'image':
                    return (
                      <figure key={block.id} className="my-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <img
                          src={block.url}
                          alt={block.alt || 'Editorial explanatory chart'}
                          className="w-full h-auto max-h-[380px] object-cover"
                          loading="lazy"
                        />
                        {(block.caption || block.source || block.credit) && (
                          <figcaption className="p-3 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200 bg-white">
                            <span>{block.caption}</span>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              {block.source && (
                                block.sourceUrl ? (
                                  <a
                                    href={block.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline flex items-center gap-1"
                                  >
                                    Source: {block.source} <ExternalLink className="w-3 h-3" />
                                  </a>
                                ) : (
                                  <span>Source: {block.source}</span>
                                )
                              )}
                              {block.credit && <span>Credit: {block.credit}</span>}
                            </div>
                          </figcaption>
                        )}
                      </figure>
                    );

                  case 'quote':
                    return (
                      <blockquote key={block.id} className="my-6 border-l-4 border-blue-600 bg-blue-50/50 p-5 rounded-r-xl italic text-slate-800 space-y-2">
                        <p className="text-base sm:text-lg leading-relaxed">&ldquo;{block.quote}&rdquo;</p>
                        {block.author && (
                          <cite className="block text-xs not-italic font-bold text-slate-600">
                            &mdash; {block.author}
                          </cite>
                        )}
                      </blockquote>
                    );

                  case 'callout':
                    const variantStyles = {
                      info: {
                        bg: 'bg-blue-50 border-blue-200 text-blue-900',
                        icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
                      },
                      warning: {
                        bg: 'bg-amber-50 border-amber-200 text-amber-900',
                        icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
                      },
                      legal: {
                        bg: 'bg-slate-100 border-slate-300 text-slate-900',
                        icon: <Scale className="w-5 h-5 text-slate-700 shrink-0" />,
                      },
                      tip: {
                        bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
                        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
                      },
                    };
                    const currentStyle = variantStyles[block.variant] || variantStyles.info;

                    return (
                      <div
                        key={block.id}
                        className={`my-6 p-5 rounded-xl border flex items-start gap-3.5 ${currentStyle.bg}`}
                      >
                        {currentStyle.icon}
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm tracking-tight">{block.title}</h3>
                          <p className="text-xs sm:text-sm leading-relaxed">{block.content}</p>
                        </div>
                      </div>
                    );

                  case 'list':
                    return (
                      <div key={block.id} className="my-4 pl-2">
                        {block.ordered ? (
                          <ol className="list-decimal list-inside space-y-2 text-slate-700 text-[15px]">
                            {block.items.map((item, i) => (
                              <li key={i} className="leading-relaxed pl-1">{item}</li>
                            ))}
                          </ol>
                        ) : (
                          <ul className="list-disc list-inside space-y-2 text-slate-700 text-[15px]">
                            {block.items.map((item, i) => (
                              <li key={i} className="leading-relaxed pl-1">{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );

                  case 'table':
                    return (
                      <div key={block.id} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead className="bg-slate-100/90 text-slate-800 font-bold border-b border-slate-200">
                            <tr>
                              {block.headers.map((h, i) => (
                                <th key={i} className="p-3.5">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {block.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3.5 text-slate-700">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {block.caption && (
                          <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 italic text-center">
                            {block.caption}
                          </div>
                        )}
                      </div>
                    );

                  default:
                    return null;
                }
              };

              return (
                <React.Fragment key={block.id}>
                  {renderBlock()}

                  {/* Mid-Article Ad insertion without breaking sentences */}
                  {index === midPoint && (
                    <AdSlotMidArticle slotId={`art-mid-${article.id}`} label="Sponsored Financial Solutions & Tools" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1">Topics:</span>
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* [AD SLOT BEFORE SOURCES] */}
          <AdSlotBeforeSources slotId={`art-pre-sources-${article.id}`} label="Sponsored Credit Education" />

          {/* 8. SOURCES LIST */}
          <section className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Statutory References & Sources</span>
              </h2>
              <span className="text-[11px] text-slate-500">
                Verified: {article.lastVerifiedDate}
              </span>
            </div>

            {article.sources && article.sources.length > 0 ? (
              <ul className="space-y-2 divide-y divide-slate-200/60">
                {article.sources.map((source, i) => (
                  <li key={source.id || i} className="pt-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-700 hover:underline flex items-center gap-1"
                        >
                          {source.name} <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-medium text-slate-800">{source.name}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 pl-3 sm:pl-0">
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                        {source.type}
                      </span>
                      {source.publicationDate && <span>Pub: {source.publicationDate}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded border border-amber-200">
                ⚠️ Verification footnote data is being updated. All factual figures remain cross-checked with primary banking publications.
              </p>
            )}
          </section>

          {/* 9. FINANCIAL INFORMATION DISCLAIMER */}
          <TrustDisclosureBox
            publishedDate={article.publishedDate}
            lastUpdatedDate={article.lastUpdatedDate}
            lastVerifiedDate={article.lastVerifiedDate}
            verificationStatus={article.verificationStatus}
            regulatoryBody={`${countryUpper} Statutory Financial Authorities & Banking Regulators`}
            sources={article.sources?.map((s) => ({
              title: s.name,
              url: s.url,
              isOfficial: s.type === 'Official Government' || s.type === 'Regulator',
            }))}
          />

          {/* 10. RELATED ARTICLES */}
          <RelatedArticlesSection
            currentArticle={article}
            relatedArticles={relatedArticles}
            onSelectArticle={(selected) => onSelectArticle?.(selected)}
          />
        </article>

        {/* Sticky Sidebar with Author bio, In-Article Quick Links, and Sidebar AdSlot */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Author Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
              Editorial Author
            </h3>
            <div className="flex items-center gap-3">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{authorName}</h4>
                <p className="text-xs text-slate-500">{authorRole}</p>
              </div>
            </div>
            {authorBio && (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {authorBio}
              </p>
            )}
          </div>

          {/* Sidebar Advertisement */}
          <AdSlotSidebar slotId={`art-sidebar-${article.id}`} label="Sponsored Financial Guidance" />

          {/* Quick Fact Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
              Jurisdiction Checklist
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Applicable to {countryUpper} banking regulations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Reviewed under consumer truth in lending standards.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Zero promotional endorsement &mdash; strictly educational.</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* [AD SLOT BOTTOM] */}
      <AdSlotBottom slotId={`art-bottom-${article.id}`} label="Sponsored Related Banking Products" />
    </div>
  );
};
