import React, { useState, useEffect } from 'react';
import { ArticleStoreService } from '../../data/articles/articleStore';
import { AdPlacementConfig } from '../../types/cms';

export interface AdSlotProps {
  slotId?: string;
  adClient?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

// Helper hook to check ad visibility
function useAdConfig() {
  const [config, setConfig] = useState<AdPlacementConfig>(() => ArticleStoreService.getAdPlacementConfig());

  useEffect(() => {
    const handleStorage = () => {
      setConfig(ArticleStoreService.getAdPlacementConfig());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return config;
}

/**
 * AdSlotTop: Placed near the top of pages (below page header or above main content).
 */
export const AdSlotTop: React.FC<AdSlotProps> = ({
  slotId = 'top-leaderboard',
  adClient,
  className = '',
  label = 'Sponsored Header Placement',
}) => {
  const config = useAdConfig();
  if (!config.adSlotTop) return null;

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/90 bg-slate-50/90 text-slate-500 text-xs min-h-[90px] md:min-h-[105px] max-w-5xl mx-auto select-none transition-all ${className}`}
      id={`ad-slot-top-${slotId}`}
      aria-label="Top Advertisement Placement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">Google AdSense (Top Leaderboard)</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-3 border border-dashed border-slate-300 rounded-lg bg-white/70">
        <p className="text-slate-700 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5 max-w-lg">
          Google AdSense responsive banner slot. Reserved bounds eliminate Cumulative Layout Shift (CLS).
        </p>
      </div>
    </div>
  );
};

/**
 * AdSlotAfterIntro: Placed immediately beneath the article introduction / subtitle before the first heading.
 */
export const AdSlotAfterIntro: React.FC<AdSlotProps> = ({
  slotId = 'after-intro',
  adClient,
  className = '',
  label = 'Sponsored Financial Context',
}) => {
  const config = useAdConfig();
  if (!config.adSlotAfterIntro) return null;

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/90 bg-slate-50 text-slate-500 text-xs min-h-[95px] max-w-3xl mx-auto select-none transition-all ${className}`}
      id={`ad-slot-after-intro-${slotId}`}
      aria-label="After-Introduction Advertisement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">Contextual Ad Placement</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-3 border border-dashed border-slate-300 rounded-lg bg-white/80">
        <p className="text-slate-700 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Non-disruptive responsive sponsor slot positioned beneath the editorial introduction.
        </p>
      </div>
    </div>
  );
};

/**
 * AdSlotInContent: Placed inside long editorial articles, guides, or list feeds.
 */
export const AdSlotInContent: React.FC<AdSlotProps> = ({
  slotId = 'in-content',
  adClient,
  className = '',
  label = 'In-Article Sponsored Ad Placement',
}) => {
  const config = useAdConfig();
  if (!config.adSlotInContent) return null;

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/90 bg-slate-50 text-slate-500 text-xs min-h-[110px] max-w-3xl mx-auto select-none transition-all ${className}`}
      id={`ad-slot-incontent-${slotId}`}
      aria-label="In-Content Advertisement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">In-Content AdSense Unit</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-3.5 border border-dashed border-slate-300 rounded-lg bg-white/80">
        <p className="text-slate-700 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5 max-w-md">
          Compliant in-flow native display unit. Editorial integrity remains completely uninfluenced by advertisers.
        </p>
      </div>
    </div>
  );
};

/**
 * AdSlotMidArticle: Placed midway down the article body between major heading sections.
 */
export const AdSlotMidArticle: React.FC<AdSlotProps> = ({
  slotId = 'mid-article',
  adClient,
  className = '',
  label = 'Sponsored Educational Partner Placement',
}) => {
  const config = useAdConfig();
  if (!config.adSlotMidArticle) return null;

  return (
    <div
      className={`w-full my-8 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/90 bg-slate-50 text-slate-500 text-xs min-h-[110px] max-w-3xl mx-auto select-none transition-all ${className}`}
      id={`ad-slot-mid-article-${slotId}`}
      aria-label="Mid-Article Advertisement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">Mid-Article AdSense Banner (728x90)</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-3.5 border border-dashed border-slate-300 rounded-lg bg-white/80">
        <p className="text-slate-700 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Clean interstitial ad unit inserted between distinct editorial subject headings.
        </p>
      </div>
    </div>
  );
};

/**
 * AdSlotBeforeSources: Placed immediately above the authoritative sources & verification footnotes.
 */
export const AdSlotBeforeSources: React.FC<AdSlotProps> = ({
  slotId = 'before-sources',
  adClient,
  className = '',
  label = 'Sponsored Market Intelligence',
}) => {
  const config = useAdConfig();
  if (!config.adSlotBeforeSources) return null;

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/90 bg-slate-50 text-slate-500 text-xs min-h-[90px] max-w-3xl mx-auto select-none transition-all ${className}`}
      id={`ad-slot-before-sources-${slotId}`}
      aria-label="Pre-Sources Advertisement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">Pre-Footnote Ad Placement</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-3 border border-dashed border-slate-300 rounded-lg bg-white/80">
        <p className="text-slate-700 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Targeted AdSense placement positioned before regulatory verification footnotes.
        </p>
      </div>
    </div>
  );
};

/**
 * AdSlotBetweenSections: Placed between major view modules, calculators, and category switches.
 */
export const AdSlotBetweenSections: React.FC<AdSlotProps> = ({
  slotId = 'between-sections',
  adClient,
  className = '',
  label = 'Mid-Page Financial Showcase',
}) => {
  const config = useAdConfig();
  if (!config.adSlotInContent && !config.adSlotMidArticle) return null;

  return (
    <div
      className={`w-full my-8 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-500 text-xs min-h-[90px] max-w-5xl mx-auto select-none transition-all ${className}`}
      id={`ad-slot-between-sections-${slotId}`}
      aria-label="Section Divider Advertisement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">Interstitial Banner (728x90 / 970x90)</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-3 border border-dashed border-slate-300 rounded-lg bg-white/70">
        <p className="text-slate-700 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Contextual AdSense placement dividing high-utility modules.
        </p>
      </div>
    </div>
  );
};

/**
 * AdSlotSidebar: Placed in sticky or column sidebars beside directories or comparison engines.
 */
export const AdSlotSidebar: React.FC<AdSlotProps> = ({
  slotId = 'sidebar-banner',
  adClient,
  className = '',
  label = 'Sidebar Ad Placement',
}) => {
  const config = useAdConfig();
  if (!config.adSlotSidebar) return null;

  return (
    <div
      className={`w-full my-4 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs min-h-[250px] md:min-h-[300px] select-none transition-all ${className}`}
      id={`ad-slot-sidebar-${slotId}`}
      aria-label="Sidebar Advertisement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">300x250 / 300x600</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 rounded-lg bg-white/90">
        <p className="text-slate-800 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">
          Targeted AdSense sidebar slot positioned alongside navigational filters.
        </p>
      </div>
    </div>
  );
};

/**
 * AdSlotBottom: Placed at the footer of articles, calculators, and card reviews prior to legal disclaimers.
 */
export const AdSlotBottom: React.FC<AdSlotProps> = ({
  slotId = 'bottom-footer-banner',
  adClient,
  className = '',
  label = 'Related Advertiser Recommendations',
}) => {
  const config = useAdConfig();
  if (!config.adSlotBottom) return null;

  return (
    <div
      className={`w-full my-8 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs min-h-[90px] max-w-5xl mx-auto select-none transition-all ${className}`}
      id={`ad-slot-bottom-${slotId}`}
      aria-label="Bottom Page Advertisement"
      data-ad-slot={slotId}
      data-ad-client={adClient || config.globalClientCode}
    >
      <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-1 pb-1 border-b border-slate-200">
        <span>Advertisement</span>
        <span className="font-mono text-[9px]">Bottom AdSense Placement</span>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-3 border border-dashed border-slate-300 rounded-lg bg-white/70">
        <p className="text-slate-700 font-semibold text-xs">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          End-of-page Google AdSense placement complying with Core Web Vitals layout stability.
        </p>
      </div>
    </div>
  );
};
