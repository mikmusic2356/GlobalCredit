import React, { useState, useEffect } from 'react';
import {
  CmsArticle,
  CountryCode,
  ArticleType,
  ArticleStatus,
  ArticleCategory
} from '../../types/cms';
import {
  Search,
  Filter,
  Plus,
  Eye,
  FileEdit,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  Globe,
  SlidersHorizontal,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { DataVerificationBadge } from '../../components/common/DataVerificationBadge';
import { DEFAULT_CMS_CATEGORIES } from '../../data/categories/cmsCategories';

interface AdminArticlesListPageProps {
  articles: CmsArticle[];
  initialTypeFilter?: 'all' | 'guide' | 'news' | 'draft' | 'published';
  onNewArticle: () => void;
  onEditArticle: (article: CmsArticle) => void;
  onPreviewArticle: (article: CmsArticle) => void;
  onDuplicateArticle: (article: CmsArticle) => void;
  onDeleteArticle: (id: string) => void;
  onTogglePublish: (article: CmsArticle) => void;
}

export const AdminArticlesListPage: React.FC<AdminArticlesListPageProps> = ({
  articles,
  initialTypeFilter = 'all',
  onNewArticle,
  onEditArticle,
  onPreviewArticle,
  onDuplicateArticle,
  onDeleteArticle,
  onTogglePublish,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>(
    initialTypeFilter === 'guide'
      ? 'guide'
      : initialTypeFilter === 'news'
      ? 'news'
      : 'all'
  );
  const [statusFilter, setStatusFilter] = useState<string>(
    initialTypeFilter === 'draft'
      ? 'draft'
      : initialTypeFilter === 'published'
      ? 'published'
      : 'all'
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Sincronizar filtros cuando se navega a una sección diferente del menú (e.g. Financial Guides, News, Drafts, Published, All Articles)
  useEffect(() => {
    if (initialTypeFilter === 'guide') {
      setTypeFilter('guide');
      setStatusFilter('all');
    } else if (initialTypeFilter === 'news') {
      setTypeFilter('news');
      setStatusFilter('all');
    } else if (initialTypeFilter === 'draft') {
      setStatusFilter('draft');
      setTypeFilter('all');
    } else if (initialTypeFilter === 'published') {
      setStatusFilter('published');
      setTypeFilter('all');
    } else {
      setTypeFilter('all');
      setStatusFilter('all');
    }
  }, [initialTypeFilter]);

  // Filter logic
  const filteredArticles = articles.filter((art) => {
    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchCategory = art.category.toLowerCase().includes(q);
      const matchAuthor = art.author.name.toLowerCase().includes(q);
      const matchTags = art.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCategory && !matchAuthor && !matchTags) return false;
    }

    // Country
    if (countryFilter !== 'all' && art.country.toLowerCase() !== countryFilter.toLowerCase()) return false;

    // Type
    const artType = (art.type || '').toLowerCase();
    if (typeFilter !== 'all') {
      if (typeFilter === 'guide') {
        const isGuideType =
          artType.includes('guide') ||
          artType.includes('explainer') ||
          artType.includes('educational') ||
          artType.includes('comparison');
        if (!isGuideType) return false;
      }
      if (typeFilter === 'news') {
        const isNewsType =
          artType.includes('news') ||
          artType.includes('trend') ||
          artType.includes('regulatory');
        if (!isNewsType) return false;
      }
    }

    // Status (case-insensitive check for 'published', 'draft', 'archived', etc.)
    const artStatus = (art.status || '').toLowerCase();
    if (statusFilter !== 'all') {
      if (statusFilter === 'published' && artStatus !== 'published') return false;
      if (statusFilter === 'draft' && artStatus !== 'draft') return false;
      if (statusFilter === 'archived' && artStatus !== 'archived') return false;
    }

    // Category
    if (categoryFilter !== 'all' && art.category !== categoryFilter) return false;

    return true;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredArticles.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Article Management & Publishing Control
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Filter, edit, verify, and publish credit card guides, APR calculation tutorials, and regulatory updates.
          </p>
        </div>

        <button
          onClick={onNewArticle}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Filter Matrix Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Search Box */}
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, keyword, or tag..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:bg-white focus:border-blue-500"
            />
          </div>

          {/* Country Filter */}
          <div>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-pointer"
            >
              <option value="all">All Countries</option>
              <option value="us">United States (US)</option>
              <option value="uk">United Kingdom (UK)</option>
              <option value="ca">Canada (CA)</option>
              <option value="au">Australia (AU)</option>
              <option value="global">Global Jurisdiction</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-pointer"
            >
              <option value="all">All Categories</option>
              {DEFAULT_CMS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts Only</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Selected batch summary */}
        {selectedIds.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <span className="font-bold">
              {selectedIds.length} Article(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  selectedIds.forEach((id) => {
                    const found = articles.find((a) => a.id === id);
                    if (found && found.status !== 'published') onTogglePublish(found);
                  });
                  setSelectedIds([]);
                }}
                className="px-3 py-1 bg-white border border-blue-200 text-blue-700 font-bold rounded-lg hover:bg-blue-100"
              >
                Publish Selected
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${selectedIds.length} selected articles?`)) {
                    selectedIds.forEach((id) => onDeleteArticle(id));
                    setSelectedIds([]);
                  }
                }}
                className="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[900px]">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5 pl-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredArticles.length > 0 &&
                      selectedIds.length === filteredArticles.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="p-3.5">Title & Excerpt</th>
                <th className="p-3.5">Country</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Published / Updated</th>
                <th className="p-3.5">Verification</th>
                <th className="p-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 text-xs">
                    No articles match the specified filters. Try adjusting your search query.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => {
                  const isChecked = selectedIds.includes(article.id);

                  return (
                    <tr
                      key={article.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isChecked ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-3.5 pl-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(article.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Title */}
                      <td className="p-3.5 max-w-sm">
                        <div className="space-y-0.5">
                          <p
                            onClick={() => onEditArticle(article)}
                            className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2 text-sm leading-snug"
                          >
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                            <span>/{article.slug}/</span>
                            <span>&bull;</span>
                            <span>{article.author.name}</span>
                          </div>
                        </div>
                      </td>

                      {/* Country */}
                      <td className="p-3.5">
                        <span className="font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                          {article.country}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="p-3.5">
                        <span className="text-[11px] text-slate-600 capitalize">
                          {article.type}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="p-3.5">
                        <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 text-[11px] whitespace-nowrap">
                          {article.subcategory || article.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <button
                          onClick={() => onTogglePublish(article)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                            article.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                          title="Click to toggle published status"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              article.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600'
                            }`}
                          />
                          {article.status}
                        </button>
                      </td>

                      {/* Published / Updated Date */}
                      <td className="p-3.5 text-slate-600 text-[11px] whitespace-nowrap">
                        <div>Pub: {article.publishedDate}</div>
                        <div className="text-slate-400">Upd: {article.lastUpdatedDate}</div>
                      </td>

                      {/* Verification */}
                      <td className="p-3.5 whitespace-nowrap">
                        <DataVerificationBadge
                          status={article.verificationStatus || 'VERIFIED'}
                          lastVerifiedDate={article.lastVerifiedDate}
                          size="sm"
                        />
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 pr-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
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
                            title="Edit"
                          >
                            <FileEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDuplicateArticle(article)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteArticle(article.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info in table */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Showing {filteredArticles.length} of {articles.length} articles</span>
          <span className="font-mono">CardInsight Online Publishing Engine</span>
        </div>
      </div>
    </div>
  );
};
