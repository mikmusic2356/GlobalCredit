import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings2, Check, X } from 'lucide-react';
import { ArticleStoreService } from '../../data/articles/articleStore';
import { CookieConsentState } from '../../types/cms';
import { CookiePreferencesModal } from './CookiePreferencesModal';

interface CookieConsentBannerProps {
  onOpenPreferences?: () => void;
  onOpenPolicy?: () => void;
  onNavigateCookiePolicy?: () => void;
  onNavigatePrivacyPolicy?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPreferences,
  onOpenPolicy,
  onNavigateCookiePolicy,
  onNavigatePrivacyPolicy,
}) => {
  const [consent, setConsent] = useState<CookieConsentState>(() => ArticleStoreService.getCookieConsent());
  const [isInternalPreferencesOpen, setIsInternalPreferencesOpen] = useState(false);

  // If already consented, do not render banner
  if (consent.hasConsented) {
    return null;
  }

  const handleOpenPreferences = () => {
    if (onOpenPreferences) {
      onOpenPreferences();
    } else {
      setIsInternalPreferencesOpen(true);
    }
  };

  const handleOpenCookiePolicy = () => {
    if (onNavigateCookiePolicy) {
      onNavigateCookiePolicy();
    } else if (onOpenPolicy) {
      onOpenPolicy();
    }
  };

  const handleOpenPrivacyPolicy = () => {
    if (onNavigatePrivacyPolicy) {
      onNavigatePrivacyPolicy();
    } else if (onOpenPolicy) {
      onOpenPolicy();
    }
  };

  const handleAcceptAll = () => {
    const newConsent: CookieConsentState = {
      hasConsented: true,
      categories: {
        necessary: true,
        analytics: true,
        advertising: true,
        preferences: true,
      },
      timestamp: new Date().toISOString(),
    };
    ArticleStoreService.saveCookieConsent(newConsent);
    setConsent(newConsent);
  };

  const handleRejectNonEssential = () => {
    const newConsent: CookieConsentState = {
      hasConsented: true,
      categories: {
        necessary: true,
        analytics: false,
        advertising: false,
        preferences: false,
      },
      timestamp: new Date().toISOString(),
    };
    ArticleStoreService.saveCookieConsent(newConsent);
    setConsent(newConsent);
  };

  const handleSaveCustom = (updatedCategories: CookieConsentState['categories']) => {
    const newConsent: CookieConsentState = {
      hasConsented: true,
      categories: updatedCategories,
      timestamp: new Date().toISOString(),
    };
    ArticleStoreService.saveCookieConsent(newConsent);
    setConsent(newConsent);
  };

  return (
    <>
      <div
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-2xl space-y-4 font-['Plus_Jakarta_Sans',sans-serif] animate-in slide-in-from-bottom-5 duration-300"
        role="region"
        aria-label="Cookie and Privacy Consent Notice"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-900">
              We Respect Your Financial Data & Privacy
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              CardInsight Online uses strictly necessary cookies to operate calculator tools and maintain comparison state. We also utilize privacy-compliant analytics and non-intrusive AdSense units.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 border-t border-slate-100 pt-2.5">
          <button
            onClick={handleOpenCookiePolicy}
            className="hover:text-blue-600 hover:underline cursor-pointer"
          >
            Cookie Policy
          </button>
          <span>&bull;</span>
          <button
            onClick={handleOpenPrivacyPolicy}
            className="hover:text-blue-600 hover:underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>&bull;</span>
          <button
            onClick={handleOpenPreferences}
            className="hover:text-blue-600 hover:underline font-semibold text-slate-700 cursor-pointer flex items-center gap-1 ml-auto"
          >
            <Settings2 className="w-3.5 h-3.5" /> Manage Preferences
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button
            onClick={handleRejectNonEssential}
            className="w-full sm:w-auto flex-1 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
          >
            Accept All
          </button>
        </div>
      </div>

      <CookiePreferencesModal
        isOpen={isInternalPreferencesOpen}
        onClose={() => setIsInternalPreferencesOpen(false)}
        currentConsent={consent}
        onSavePreferences={handleSaveCustom}
      />
    </>
  );
};
