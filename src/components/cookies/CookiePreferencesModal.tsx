import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Lock, Cookie, Info } from 'lucide-react';
import { DEFAULT_COOKIE_CATEGORIES, ArticleStoreService } from '../../data/articles/articleStore';
import { CookieConsentState } from '../../types/cms';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConsent?: CookieConsentState | null;
  onSavePreferences?: (updated: CookieConsentState['categories']) => void;
  onOpenPolicy?: () => void;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
  currentConsent,
  onSavePreferences,
  onOpenPolicy,
}) => {
  const getInitialCategories = () => {
    const activeConsent = currentConsent || ArticleStoreService.getCookieConsent();
    return {
      necessary: true,
      analytics: activeConsent?.categories?.analytics ?? true,
      advertising: activeConsent?.categories?.advertising ?? false,
      preferences: activeConsent?.categories?.preferences ?? true,
    };
  };

  const [categories, setCategories] = useState(getInitialCategories);

  useEffect(() => {
    if (isOpen) {
      setCategories(getInitialCategories());
    }
  }, [isOpen, currentConsent]);

  if (!isOpen) return null;

  const handleToggle = (key: 'analytics' | 'advertising' | 'preferences') => {
    setCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    if (onSavePreferences) {
      onSavePreferences(categories);
    } else {
      const newConsent: CookieConsentState = {
        hasConsented: true,
        categories,
        timestamp: new Date().toISOString(),
      };
      ArticleStoreService.saveCookieConsent(newConsent);
    }
    onClose();
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      advertising: true,
      preferences: true,
    };
    setCategories(allEnabled);
    if (onSavePreferences) {
      onSavePreferences(allEnabled);
    } else {
      const newConsent: CookieConsentState = {
        hasConsented: true,
        categories: allEnabled,
        timestamp: new Date().toISOString(),
      };
      ArticleStoreService.saveCookieConsent(newConsent);
    }
    onClose();
  };

  const handleRejectNonEssential = () => {
    const nonEssentialDisabled = {
      necessary: true,
      analytics: false,
      advertising: false,
      preferences: false,
    };
    setCategories(nonEssentialDisabled);
    if (onSavePreferences) {
      onSavePreferences(nonEssentialDisabled);
    } else {
      const newConsent: CookieConsentState = {
        hasConsented: true,
        categories: nonEssentialDisabled,
        timestamp: new Date().toISOString(),
      };
      ArticleStoreService.saveCookieConsent(newConsent);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
        role="dialog"
        aria-labelledby="cookie-preferences-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <Cookie className="w-5 h-5" />
            </span>
            <div>
              <h2 id="cookie-preferences-title" className="text-base font-bold text-slate-900">
                Privacy & Cookie Preferences
              </h2>
              <p className="text-xs text-slate-500">
                Control how CardInsight Online stores preferences and loads analytics or advertising units.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 divide-y divide-slate-100">
          {DEFAULT_COOKIE_CATEGORIES.map((cat) => {
            const isChecked = cat.id === 'necessary' ? true : categories[cat.id as 'analytics' | 'advertising' | 'preferences'];

            return (
              <div key={cat.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                      {cat.required && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Always Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <div className="shrink-0 pt-0.5">
                    {cat.required ? (
                      <div className="w-11 h-6 rounded-full bg-blue-600 flex items-center justify-end px-1 opacity-70 cursor-not-allowed">
                        <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggle(cat.id as 'analytics' | 'advertising' | 'preferences')}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-hidden ${
                          isChecked ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                        aria-pressed={isChecked}
                      >
                        <span
                          className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                            isChecked ? 'right-1' : 'left-1'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub cookies details */}
                <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 space-y-1 border border-slate-100">
                  <span className="font-semibold text-slate-700">Associated Cookies & Tokens:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {cat.cookies.map((c, i) => (
                      <div key={i} className="bg-white p-2 rounded border border-slate-200/70">
                        <span className="font-mono font-bold text-slate-800">{c.name}</span>
                        <span className="block text-slate-400 text-[10px]">Provider: {c.provider} ({c.expiry})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleRejectNonEssential}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer text-center"
          >
            Reject Non-Essential
          </button>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer text-center"
            >
              Accept All
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs cursor-pointer text-center"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
