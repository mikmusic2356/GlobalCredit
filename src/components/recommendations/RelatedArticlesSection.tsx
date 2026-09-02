import React from 'react';
import { CmsArticle } from '../../types/cms';
import { Sparkles, ArrowRight, Calendar, User, Clock, FileText } from 'lucide-react';
import { DataVerificationBadge } from '../common/DataVerificationBadge';

interface RelatedArticlesSectionProps {
  currentArticle: CmsArticle;
  relatedArticles: CmsArticle[];
  onSelectArticle: (article: CmsArticle) => void;
}

export const RelatedArticlesSection: React.FC<RelatedArticlesSectionProps> = ({
  currentArticle,
  relatedArticles,
  onSelectArticle,
}) => {
  if (!relatedArticles || relatedArticles.length === 0) return null;

  return (
    <section className="border-t border-slate-200 pt-10 mt-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Related Articles & Guides
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Carefully curated financial education for {(currentArticle.country || 'us').toUpperCase()} credit market dynamics.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-auto">
          {relatedArticles.length} Recommendations
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article) => {
          const itemCountry = (article.country || 'us').toUpperCase();
          return (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group flex flex-col bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/60 truncate">
                  {article.subcategory || article.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                  {itemCountry}
                </span>
              </div>

              {/* Title with Emoji support */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                {article.title}
              </h3>

              {/* Subtitle / Excerpt */}
              <p className="text-xs text-slate-600 line-clamp-2 mb-4 flex-1 leading-relaxed">
                {article.subtitle}
              </p>

              {/* Meta & Status */}
              <div className="border-t border-slate-100 pt-3 mt-auto space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.readingTimeMinutes || 5} min read</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.lastUpdatedDate || article.publishedDate}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <DataVerificationBadge
                    status={article.verificationStatus || 'VERIFIED'}
                    lastVerifiedDate={article.lastVerifiedDate}
                    size="sm"
                  />
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
