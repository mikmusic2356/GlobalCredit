import React, { useState } from 'react';
import { CookieConsentConfig, CookieCategoryConfig } from '../../types/cms';
import { ArticleStoreService, DEFAULT_COOKIE_CATEGORIES } from '../../data/articles/articleStore';
import { Shield, Cookie, Save, CheckCircle2, Lock, Plus, Trash2, ExternalLink } from 'lucide-react';

export const AdminPrivacySettingsPage: React.FC = () => {
  const [categories, setCategories] = useState<CookieCategoryConfig[]>(() => {
    const saved = localStorage.getItem('gc_cookie_config_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_COOKIE_CATEGORIES;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('gc_cookie_config_categories', JSON.stringify(categories));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const currentConsentRecord = ArticleStoreService.getCookieConsent();

  return (
    <form onSubmit={handleSave} className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Privacy & Cookie Consent Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure compliance categories, non-intrusive cookie banners, and statutory disclosures for global jurisdictions.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Privacy Config</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold">Cookie consent taxonomy saved! Public consent modal updated.</span>
        </div>
      )}

      {/* Compliance Overview Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-2 border-b border-slate-100">
          Regulatory Compliance Status
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800">US CCPA / GLBA</span>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zero Sensitive Data Stored
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800">UK GDPR / PECR</span>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Prior Consent Supported
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800">Canadian PIPEDA</span>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Meaningful Consent Modal
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800">Australian Privacy Act</span>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> App Privacy Statement
            </p>
          </div>
        </div>
      </div>

      {/* Cookie Category Definitions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Cookie Categories & Statutory Declarations
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {categories.length} Defined Categories
          </span>
        </div>

        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={cat.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                  {cat.required ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                      Optional
                    </span>
                  )}
                </div>
                <span className="font-mono text-slate-400 text-[11px]">ID: {cat.id}</span>
              </div>

              <textarea
                rows={2}
                value={cat.description}
                onChange={(e) => {
                  const next = [...categories];
                  next[idx] = { ...next[idx], description: e.target.value };
                  setCategories(next);
                }}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 text-xs"
              />

              {/* Cookies table */}
              <div className="bg-white rounded-lg border border-slate-200 p-2.5 space-y-1.5">
                <span className="font-semibold text-slate-700 text-[11px] block">
                  Declared Cookies in this Category:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.cookies.map((c, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded border border-slate-200/70 text-[11px]">
                      <span className="font-mono font-bold text-slate-800">{c.name}</span>
                      <span className="block text-slate-500 text-[10px]">{c.purpose} ({c.expiry})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
