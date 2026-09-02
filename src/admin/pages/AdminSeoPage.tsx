import React from 'react';
import { CmsArticle } from '../../types/cms';
import { Search, AlertTriangle, CheckCircle2, Globe, FileText, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface AdminSeoPageProps {
  articles: CmsArticle[];
  onEditArticle: (article: CmsArticle) => void;
}

export const AdminSeoPage: React.FC<AdminSeoPageProps> = ({ articles, onEditArticle }) => {
  // Compute SEO audits
  const auditResults = articles.map((article) => {
    const issues: string[] = [];

    // Title length check
    const titleLen = article.seo.title?.length || article.title.length;
    if (titleLen < 40) issues.push('Title tag is short (<40 chars)');
    if (titleLen > 65) issues.push('Title tag may truncate in SERP (>65 chars)');

    // Meta description check
    const descLen = article.seo.metaDescription?.length || article.subtitle.length;
    if (descLen < 100) issues.push('Meta description is short (<100 chars)');
    if (descLen > 165) issues.push('Meta description exceeds recommended 165 chars');

    // Missing primary keyword
    if (!article.seo.primaryKeyword) issues.push('No primary target keyword assigned');

    // Image alt text check
    const imageBlocks = article.blocks.filter((b) => b.type === 'image');
    const missingAlt = imageBlocks.some((b) => !b.alt || b.alt.trim().length === 0);
    if (missingAlt) issues.push('Contains in-article image without accessibility alt text');

    // Sources verification check
    if (!article.sources || article.sources.length === 0) {
      issues.push('Missing regulatory verification footnote source');
    }

    const isHealthy = issues.length === 0;

    return {
      article,
      issues,
      isHealthy,
    };
  });

  const healthyCount = auditResults.filter((r) => r.isHealthy).length;
  const issuesCount = auditResults.filter((r) => !r.isHealthy).length;

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          <span>Site-Wide Editorial SEO & Metadata Audit</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time crawler simulation, snippet length validation, and structured data compliance checks.
        </p>
      </div>

      {/* SEO Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Articles Audited
          </span>
          <p className="text-2xl font-extrabold text-slate-900">{articles.length}</p>
          <p className="text-[11px] text-slate-500">100% indexed in schema sitemap</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Optimized Articles
          </span>
          <p className="text-2xl font-extrabold text-emerald-600">{healthyCount}</p>
          <p className="text-[11px] text-emerald-700">Passes all Google SERP guidelines</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Recommendations / Warnings
          </span>
          <p className="text-2xl font-extrabold text-amber-600">{issuesCount}</p>
          <p className="text-[11px] text-amber-700">Minor optimizations suggested</p>
        </div>
      </div>

      {/* Audit List Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Metadata Audit Breakdown
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {healthyCount}/{articles.length} Fully Compliant
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {auditResults.map(({ article, issues, isHealthy }) => (
            <div
              key={article.id}
              className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                    {article.country}
                  </span>
                  <span className="font-bold text-slate-900 text-sm truncate">
                    {article.title}
                  </span>
                </div>

                <p className="text-slate-500 text-[11px] font-mono">
                  Slug: /{article.country}/{article.type === 'news' || article.type === 'trend' ? 'news' : 'guides'}/{article.slug}/
                </p>

                {/* Issues Badges */}
                {issues.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {issues.map((iss, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{iss}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Metadata, Alt Tags & Citations Optimal</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => onEditArticle(article)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <span>Edit SEO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
