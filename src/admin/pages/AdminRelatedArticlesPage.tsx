import React from 'react';
import { CmsArticle } from '../../types/cms';
import { ArticleStoreService } from '../../data/articles/articleStore';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Sliders, ExternalLink } from 'lucide-react';

interface AdminRelatedArticlesPageProps {
  articles: CmsArticle[];
  onEditArticle: (article: CmsArticle) => void;
}

export const AdminRelatedArticlesPage: React.FC<AdminRelatedArticlesPageProps> = ({
  articles,
  onEditArticle,
}) => {
  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span>Cross-Article Recommendation Engine</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Review automated scoring algorithms and manually curated article clusters.
        </p>
      </div>

      {/* Scoring weights rule box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Automated Weighted Scoring Matrix</span>
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Active in Public Templates
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Subcategory Match</span>
            <p className="text-xl font-extrabold text-blue-600">+25 Pts</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Category Match</span>
            <p className="text-xl font-extrabold text-blue-600">+20 Pts</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Same Country</span>
            <p className="text-xl font-extrabold text-blue-600">+15 Pts</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Content Type</span>
            <p className="text-xl font-extrabold text-blue-600">+10 Pts</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Shared Tag</span>
            <p className="text-xl font-extrabold text-blue-600">+8 Pts/tag</p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          Manual related article IDs pinned by an editor immediately take priority over automatic scores.
        </p>
      </div>

      {/* Article Recommendation Map Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Current Article Recommendation Output ({articles.length})
          </h3>
          <span className="text-xs text-slate-400">Top 3 recommendations per article</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {articles.map((article) => {
            const related = ArticleStoreService.getRelatedArticles(article, 3);
            const isManual = article.manualRelatedArticleIds && article.manualRelatedArticleIds.length > 0;

            return (
              <div key={article.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
                      {article.country}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{article.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isManual
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {isManual ? 'Manual Curated' : 'Algorithmic'}
                    </span>
                    <button
                      onClick={() => onEditArticle(article)}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Configure
                    </button>
                  </div>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-2 sm:pl-4 border-l-2 border-slate-200">
                  {related.map((rel) => (
                    <div key={rel.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-blue-700 truncate">{rel.subcategory || rel.category}</span>
                        <span className="uppercase text-slate-400 font-mono">{rel.country}</span>
                      </div>
                      <p className="font-bold text-slate-800 line-clamp-2 text-[11px]">{rel.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
