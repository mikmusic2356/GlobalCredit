import React, { useState } from 'react';
import { CmsArticle } from '../../types/cms';
import { Sparkles, Plus, Trash2, ArrowUp, ArrowDown, Check, Search } from 'lucide-react';
import { ArticleStoreService } from '../../data/articles/articleStore';

interface RelatedArticlesSelectorProps {
  currentArticle: Partial<CmsArticle>;
  manualRelatedIds: string[];
  onChangeManualRelatedIds: (ids: string[]) => void;
  allArticles: CmsArticle[];
}

export const RelatedArticlesSelector: React.FC<RelatedArticlesSelectorProps> = ({
  currentArticle,
  manualRelatedIds,
  onChangeManualRelatedIds,
  allArticles,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  // Filter out current article
  const candidateArticles = allArticles.filter(
    (a) => a.id !== currentArticle.id && !manualRelatedIds.includes(a.id)
  );

  const filteredCandidates = candidateArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute what automatic recommendation would pick if manual is empty
  const dummyArticle = currentArticle as CmsArticle;
  const autoRecommended = ArticleStoreService.getRelatedArticles(
    { ...dummyArticle, manualRelatedArticleIds: [] },
    3
  );

  const handleAddId = (id: string) => {
    onChangeManualRelatedIds([...manualRelatedIds, id]);
    setSearchTerm('');
    setShowPicker(false);
  };

  const handleRemoveId = (id: string) => {
    onChangeManualRelatedIds(manualRelatedIds.filter((item) => item !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const next = [...manualRelatedIds];
    if (direction === 'up' && index > 0) {
      const temp = next[index];
      next[index] = next[index - 1];
      next[index - 1] = temp;
      onChangeManualRelatedIds(next);
    } else if (direction === 'down' && index < next.length - 1) {
      const temp = next[index];
      next[index] = next[index + 1];
      next[index + 1] = temp;
      onChangeManualRelatedIds(next);
    }
  };

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Mode Status Header */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Cross-Content Recommendation Engine
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
            {manualRelatedIds.length > 0
              ? `Curated Manual Selection (${manualRelatedIds.length})`
              : 'Automatic Weighted Scoring Active'}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          When manual related articles are specified below, they override the automated semantic scoring. If no manual articles are assigned, the system recommends based on: Country (15 pts) &gt; Category (20 pts) &gt; Subcategory (25 pts) &gt; Tags (8 pts).
        </p>
      </div>

      {/* Manual Selection List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Manually Pinned Related Articles ({manualRelatedIds.length})
          </h4>
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showPicker ? 'Close Picker' : '+ Pin Related Article'}</span>
          </button>
        </div>

        {/* Picker Dropdown */}
        {showPicker && (
          <div className="p-4 bg-white border border-blue-200 rounded-xl space-y-3 shadow-md animate-in fade-in duration-150">
            <div className="flex items-center gap-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title, category, or country..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:bg-white"
                autoFocus
              />
            </div>

            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-lg">
              {filteredCandidates.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching unselected articles found.
                </div>
              ) : (
                filteredCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => handleAddId(cand.id)}
                    className="p-2.5 hover:bg-blue-50/70 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          {cand.country}
                        </span>
                        <span className="text-[11px] font-semibold text-blue-700 truncate">
                          {cand.category}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {cand.title}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Select
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Selected List */}
        {manualRelatedIds.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400 bg-slate-50/50">
            No manual articles pinned. The automated recommendation engine will select relevant content dynamically.
          </div>
        ) : (
          <div className="space-y-2">
            {manualRelatedIds.map((id, index) => {
              const art = allArticles.find((a) => a.id === id);
              if (!art) return null;

              return (
                <div
                  key={id}
                  className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                      #{index + 1}
                    </span>
                    <div className="space-y-0.5 truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          {art.country}
                        </span>
                        <span className="text-[11px] font-semibold text-blue-700">
                          {art.category}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {art.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === manualRelatedIds.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveId(id)}
                      className="p-1 rounded text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Automatic Recommendation Preview (Fallback Preview) */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
          Algorithmic Recommendation Engine Match Preview (if manual list is empty):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {autoRecommended.map((art) => (
            <div key={art.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                {art.subcategory || art.category}
              </span>
              <p className="font-bold text-slate-800 line-clamp-2">{art.title}</p>
              <span className="text-[10px] text-slate-400 block uppercase">{art.country}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
