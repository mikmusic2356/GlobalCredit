import React from 'react';

interface AdBannerProps {
  slotType: 'leaderboard' | 'rectangle' | 'billboard' | 'inline' | 'sidebar';
  className?: string;
  slotId?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slotType, className = '', slotId = 'default' }) => {
  // Configured dimensions adhering to official Google AdSense IAB standard specifications
  const getSlotConfig = () => {
    switch (slotType) {
      case 'billboard':
        return {
          dimensions: '970x250 / 970x90',
          styleClass: 'min-h-[90px] md:min-h-[140px] max-w-5xl',
          label: 'Billboard Ad Placement',
        };
      case 'leaderboard':
        return {
          dimensions: '728x90',
          styleClass: 'min-h-[90px] max-w-3xl',
          label: 'Leaderboard Ad Placement',
        };
      case 'rectangle':
        return {
          dimensions: '300x250 / 336x280',
          styleClass: 'min-h-[250px] w-full max-w-[336px]',
          label: 'Medium Rectangle Ad Placement',
        };
      case 'sidebar':
        return {
          dimensions: '300x600 Half Page',
          styleClass: 'min-h-[400px] w-full',
          label: 'Sidebar Half-Page Ad Placement',
        };
      case 'inline':
      default:
        return {
          dimensions: 'Responsive In-Content',
          styleClass: 'min-h-[100px] w-full',
          label: 'In-Article Ad Placement',
        };
    }
  };

  const config = getSlotConfig();

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-100/70 text-slate-500 text-xs transition-all select-none ${config.styleClass} ${className}`}
      id={`ad-container-${slotType}-${slotId}`}
      aria-label="Advertisement Container"
    >
      <div className="w-full flex items-center justify-between text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-1.5 px-1 border-b border-slate-200/60 pb-1">
        <span>Advertisement</span>
        <span className="text-[9px] font-mono text-slate-400">AdSense Space ({config.dimensions})</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 rounded-lg bg-white/60">
        <p className="text-slate-600 font-medium text-xs">
          Sponsored Financial Content & Advertiser Links
        </p>
        <p className="text-[11px] text-slate-400 mt-1 max-w-md">
          Non-intrusive Google AdSense compliant ad slot. Editorial content on CardInsight Online is strictly independent and never gated behind advertisements.
        </p>
      </div>
    </div>
  );
};
