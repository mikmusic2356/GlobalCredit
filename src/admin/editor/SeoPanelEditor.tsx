import React from 'react';
import { ArticleSeo, CountryCode, ArticleType } from '../../types/cms';
import { Search, Globe, Share2, Tag, CheckCircle2, AlertCircle } from 'lucide-react';

interface SeoPanelEditorProps {
  seo: ArticleSeo;
  onChange: (seo: ArticleSeo) => void;
  slug: string;
  onSlugChange: (slug: string) => void;
  country: CountryCode | 'global';
  type: ArticleType;
  featuredImageUrl?: string;
}

export const SeoPanelEditor: React.FC<SeoPanelEditorProps> = ({
  seo,
  onChange,
  slug,
  onSlugChange,
  country,
  type,
  featuredImageUrl,
}) => {
  const cleanSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const fullUrl = `https://cardinsight.online/${country}/${type === 'news' || type === 'trend' ? 'news' : 'guides'}/${slug}/`;

  // Character lengths & health checks
  const titleLen = seo.title?.length || 0;
  const isTitleIdeal = titleLen >= 40 && titleLen <= 65;

  const descLen = seo.metaDescription?.length || 0;
  const isDescIdeal = descLen >= 120 && descLen <= 165;

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. URL Slug Config */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-900 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Canonical URL Path & Slug Structure</span>
            <span className="text-rose-500">*</span>
          </label>
          <span className="text-slate-400 font-mono">Country: {country.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-2 bg-slate-200/80 rounded-lg text-slate-600 font-mono text-xs select-none">
            /{country}/{type === 'news' || type === 'trend' ? 'news' : 'guides'}/
          </span>
          <input
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(cleanSlug(e.target.value))}
            placeholder="how-credit-card-apr-works"
            className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <p className="text-[11px] text-slate-500">
          Clean URLs automatically reflect the national financial jurisdiction and content category.
        </p>
      </div>

      {/* 2. Google SERP Snippet Preview */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Search className="w-3.5 h-3.5 text-blue-600" />
          <span>Google Search SERP Result Simulation</span>
        </span>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-sans">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
              G
            </span>
            <span>cardinsight.online</span>
            <span className="text-slate-400">&rsaquo;</span>
            <span>{country}</span>
            <span className="text-slate-400">&rsaquo;</span>
            <span className="truncate max-w-xs">{slug}</span>
          </div>
          <h3 className="text-base text-blue-800 font-medium hover:underline cursor-pointer line-clamp-1">
            {seo.title || 'Please enter an SEO title below...'}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {seo.metaDescription || 'Please provide a clear meta description explaining the financial guide...'}
          </p>
        </div>
      </div>

      {/* 3. SEO Title & Description */}
      <div className="space-y-4">
        {/* SEO Title */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-800">
              SEO Title Tag <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-[11px] font-semibold ${
                isTitleIdeal ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {titleLen}/60 chars ({isTitleIdeal ? 'Optimal Length' : 'Aim for 50-60'})
            </span>
          </div>
          <input
            type="text"
            value={seo.title}
            onChange={(e) => onChange({ ...seo, title: e.target.value })}
            placeholder="e.g. How Credit Card APR Works: Interest Calculation Guide (2026)"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-bold focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-800">
              Meta Description <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-[11px] font-semibold ${
                isDescIdeal ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {descLen}/160 chars ({isDescIdeal ? 'Optimal Length' : 'Aim for 140-160'})
            </span>
          </div>
          <textarea
            rows={3}
            value={seo.metaDescription}
            onChange={(e) => onChange({ ...seo, metaDescription: e.target.value })}
            placeholder="Engaging summary under 160 characters describing the card analysis, APR calculations, or trends..."
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:border-blue-500 focus:outline-hidden leading-relaxed"
          />
        </div>
      </div>

      {/* 4. Target Keywords */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-800 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>Primary Focus Keyword:</span>
          </label>
          <input
            type="text"
            value={seo.primaryKeyword || ''}
            onChange={(e) => onChange({ ...seo, primaryKeyword: e.target.value })}
            placeholder="e.g. credit card APR"
            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-800 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>Secondary Keywords (comma separated):</span>
          </label>
          <input
            type="text"
            value={seo.secondaryKeywords?.join(', ') || ''}
            onChange={(e) =>
              onChange({
                ...seo,
                secondaryKeywords: e.target.value.split(',').map((k) => k.trim()),
              })
            }
            placeholder="daily periodic rate, grace period"
            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
          />
        </div>
      </div>

      {/* 5. Open Graph / Social Sharing */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <Share2 className="w-4 h-4 text-purple-600" />
          <span>Open Graph & Social Share Metadata</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">OG Share Title (defaults to SEO title):</label>
            <input
              type="text"
              value={seo.ogTitle || ''}
              onChange={(e) => onChange({ ...seo, ogTitle: e.target.value })}
              placeholder={seo.title || 'Social share title...'}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">OG Social Image URL:</label>
            <input
              type="text"
              value={seo.ogImage || featuredImageUrl || ''}
              onChange={(e) => onChange({ ...seo, ogImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-[11px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
