import React from 'react';
import { ArticleSource, SourceType } from '../../types/cms';
import { Building2, Plus, Trash2, ExternalLink, AlertTriangle, CheckCircle2, Shield } from 'lucide-react';

interface SourcesEditorProps {
  sources: ArticleSource[];
  onChange: (sources: ArticleSource[]) => void;
  lastVerifiedDate: string;
  onVerifiedDateChange: (date: string) => void;
}

const SOURCE_TYPES: SourceType[] = [
  'Official Government',
  'Regulator',
  'Card Issuer',
  'Financial Institution',
  'Research Organization',
  'Reputable Publication',
  'Other',
];

export const SourcesEditor: React.FC<SourcesEditorProps> = ({
  sources,
  onChange,
  lastVerifiedDate,
  onVerifiedDateChange,
}) => {
  const addSource = () => {
    const newSource: ArticleSource = {
      id: `src-${Date.now()}`,
      name: '',
      url: '',
      type: 'Regulator',
      publicationDate: new Date().toISOString().split('T')[0],
      lastVerifiedDate: new Date().toISOString().split('T')[0],
    };
    onChange([...sources, newSource]);
  };

  const updateSource = (index: number, updated: ArticleSource) => {
    const next = [...sources];
    next[index] = updated;
    onChange(next);
  };

  const deleteSource = (index: number) => {
    onChange(sources.filter((_, i) => i !== index));
  };

  const isSourcesValid = sources.length > 0 && sources.every((s) => s.name.trim().length > 0);
  const isVerifiedDateValid = !!lastVerifiedDate && lastVerifiedDate.trim().length > 0;

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Verification Health Alert */}
      {!isSourcesValid || !isVerifiedDateValid ? (
        <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-bold text-sm">Source Verification Warning</p>
            <p className="text-amber-800 leading-relaxed">
              GlobalCredit policy strictly mandates at least one validated statutory source and a current verification date before publishing. Outdated or unverified articles cannot imply official verification.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All Sources & Verification Timestamps Fully Compliant</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-700 font-semibold">
            {sources.length} Footnote Sources
          </span>
        </div>
      )}

      {/* Global Last Verified Date */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Article Data Last Verified Date</span>
              <span className="text-rose-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500">
              The date an editor cross-checked the card terms, APR, and legislation against official publications.
            </p>
          </div>
          <input
            type="date"
            value={lastVerifiedDate}
            onChange={(e) => onVerifiedDateChange(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800"
          />
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Authoritative Sources & Regulatory Citations ({sources.length})</span>
          </h3>
          <button
            type="button"
            onClick={addSource}
            className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Citation
          </button>
        </div>

        {sources.map((source, index) => (
          <div
            key={source.id || index}
            className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-800">
                Source Citation #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => deleteSource(index)}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              {/* Name */}
              <div className="sm:col-span-8 space-y-1">
                <label className="font-bold text-slate-800">
                  Source Title / Official Document Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={source.name}
                  onChange={(e) =>
                    updateSource(index, { ...source, name: e.target.value })
                  }
                  placeholder="e.g. Consumer Financial Protection Bureau (CFPB) – Regulation Z"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>

              {/* Type */}
              <div className="sm:col-span-4 space-y-1">
                <label className="font-bold text-slate-800">Source Type</label>
                <select
                  value={source.type}
                  onChange={(e) =>
                    updateSource(index, { ...source, type: e.target.value as SourceType })
                  }
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  {SOURCE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* URL */}
              <div className="sm:col-span-8 space-y-1">
                <label className="font-bold text-slate-800">Public Document URL (Optional but Recommended)</label>
                <input
                  type="url"
                  value={source.url || ''}
                  onChange={(e) =>
                    updateSource(index, { ...source, url: e.target.value })
                  }
                  placeholder="https://www.consumerfinance.gov/..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-[11px]"
                />
              </div>

              {/* Publication Date */}
              <div className="sm:col-span-4 space-y-1">
                <label className="font-bold text-slate-800">Publication / Release Date</label>
                <input
                  type="date"
                  value={source.publicationDate || ''}
                  onChange={(e) =>
                    updateSource(index, { ...source, publicationDate: e.target.value })
                  }
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
