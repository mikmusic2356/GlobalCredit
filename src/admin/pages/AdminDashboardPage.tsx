import React from 'react';
import { CmsArticle, AdminActiveSection } from '../../types/cms';
import {
  FileText,
  CheckCircle2,
  FileEdit,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Plus,
  ArrowRight,
  Eye,
  Trash2,
  Copy,
  Clock,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { AdminStatsCard } from '../components/AdminStatsCard';
import { DataVerificationBadge } from '../../components/common/DataVerificationBadge';

interface AdminDashboardPageProps {
  articles: CmsArticle[];
  onNewArticle: () => void;
  onEditArticle: (article: CmsArticle) => void;
  onPreviewArticle: (article: CmsArticle) => void;
  onDuplicateArticle: (article: CmsArticle) => void;
  onDeleteArticle: (id: string) => void;
  onTogglePublish: (article: CmsArticle) => void;
  onNavigateSection: (sec: AdminActiveSection) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  articles,
  onNewArticle,
  onEditArticle,
  onPreviewArticle,
  onDuplicateArticle,
  onDeleteArticle,
  onTogglePublish,
  onNavigateSection,
}) => {
  const total = articles.length;
  const published = articles.filter((a) => (a.status || '').toLowerCase() === 'published').length;
  const drafts = articles.filter((a) => (a.status || '').toLowerCase() === 'draft').length;
  const guides = articles.filter((a) => {
    const t = (a.type || '').toLowerCase();
    return t.includes('guide') || t.includes('explainer') || t.includes('educational') || t.includes('comparison');
  }).length;
  const news = articles.filter((a) => {
    const t = (a.type || '').toLowerCase();
    return t.includes('news') || t.includes('trend') || t.includes('regulatory');
  }).length;

  const verified = articles.filter((a) => a.verificationStatus === 'VERIFIED').length;
  const unverified = articles.filter((a) => a.verificationStatus !== 'VERIFIED').length;

  // Recent 5 articles
  const recentArticles = [...articles].slice(0, 5);

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>International Credit Card Editorial Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Financial Content & Publication Hub
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Manage educational guides, APR explainers, and credit news across US, UK, Canada, and Australia with strict source verification and privacy compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={onNewArticle}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </button>
          <button
            onClick={() => onNavigateSection('articles-all')}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/10 cursor-pointer"
          >
            Browse All ({total})
          </button>
        </div>
      </div>

      {/* Verification Warning Alert if any unverified */}
      {unverified > 0 && (
        <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50 text-amber-900 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold">
                {unverified} Article(s) Pending Regulatory Verification Check
              </p>
              <p className="text-[11px] text-amber-800">
                Ensure all interest rate benchmarks and fee schedules are cross-referenced before public release.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateSection('articles-drafts')}
            className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold shrink-0 cursor-pointer transition-colors"
          >
            Review Items
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AdminStatsCard
          title="Total Articles"
          value={total}
          subtitle="Across 4 Jurisdictions"
          icon={FileText}
          trend={`${guides} Guides &bull; ${news} News Items`}
          variant="blue"
          onClick={() => onNavigateSection('articles-all')}
        />

        <AdminStatsCard
          title="Live Published"
          value={published}
          subtitle="Accessible to Consumers"
          icon={CheckCircle2}
          trend={`${Math.round((published / (total || 1)) * 100)}% of Catalog Live`}
          variant="emerald"
          onClick={() => onNavigateSection('articles-published')}
        />

        <AdminStatsCard
          title="Editorial Drafts"
          value={drafts}
          subtitle="In Review / Pending"
          icon={FileEdit}
          trend={`${drafts} require editorial sign-off`}
          variant="amber"
          onClick={() => onNavigateSection('articles-drafts')}
        />

        <AdminStatsCard
          title="Verified Citations"
          value={verified}
          subtitle="Primary Source Checked"
          icon={ShieldCheck}
          trend="100% Truth in Lending standard"
          variant="purple"
          onClick={() => onNavigateSection('seo')}
        />
      </div>

      {/* Recent Articles Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Recently Edited Content
            </h3>
            <p className="text-xs text-slate-500">
              Latest financial publications and draft updates.
            </p>
          </div>
          <button
            onClick={() => onNavigateSection('articles-all')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Content</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5 pl-6 sm:pl-4">Article Title & Details</th>
                <th className="p-3.5">Country</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Verified</th>
                <th className="p-3.5 pr-6 sm:pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentArticles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Title */}
                  <td className="p-3.5 pl-6 sm:pl-4 max-w-xs">
                    <div className="space-y-0.5">
                      <p
                        onClick={() => onEditArticle(article)}
                        className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1 text-sm"
                      >
                        {article.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {article.subtitle}
                      </p>
                    </div>
                  </td>

                  {/* Country */}
                  <td className="p-3.5">
                    <span className="font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                      {article.country}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="p-3.5">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 text-[11px]">
                      {article.subcategory || article.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                        article.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          article.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600'
                        }`}
                      />
                      {article.status}
                    </span>
                  </td>

                  {/* Verification */}
                  <td className="p-3.5">
                    <DataVerificationBadge
                      status={article.verificationStatus || 'VERIFIED'}
                      lastVerifiedDate={article.lastVerifiedDate}
                      size="sm"
                    />
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 pr-6 sm:pr-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onPreviewArticle(article)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Live Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditArticle(article)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Article"
                      >
                        <FileEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDuplicateArticle(article)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Duplicate Article"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteArticle(article.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
