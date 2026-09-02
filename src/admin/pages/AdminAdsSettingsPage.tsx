import React, { useState } from 'react';
import { AdPlacementConfig } from '../../types/cms';
import { ArticleStoreService } from '../../data/articles/articleStore';
import {
  Megaphone,
  Save,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sliders,
  ShieldAlert,
  Info
} from 'lucide-react';

export const AdminAdsSettingsPage: React.FC = () => {
  const [adConfig, setAdConfig] = useState<AdPlacementConfig>(() =>
    ArticleStoreService.getAdPlacementConfig()
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggleSlot = (key: keyof Pick<AdPlacementConfig, 'adSlotTop' | 'adSlotAfterIntro' | 'adSlotInContent' | 'adSlotMidArticle' | 'adSlotBeforeSources' | 'adSlotBottom' | 'adSlotSidebar'>) => {
    setAdConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    ArticleStoreService.saveAdPlacementConfig(adConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const placementsList: {
    key: 'adSlotTop' | 'adSlotAfterIntro' | 'adSlotInContent' | 'adSlotMidArticle' | 'adSlotBeforeSources' | 'adSlotBottom' | 'adSlotSidebar';
    label: string;
    description: string;
    format: string;
  }[] = [
    {
      key: 'adSlotTop',
      label: 'Top Header Banner (Above Editorial Headline)',
      description: 'Leaderboard ad unit rendered above main article title and metadata.',
      format: 'Leaderboard (728x90 / 320x50)',
    },
    {
      key: 'adSlotAfterIntro',
      label: 'After Introduction Summary',
      description: 'Placed immediately below the subtitle and editorial author attribution.',
      format: 'Responsive Display (Responsive / In-article)',
    },
    {
      key: 'adSlotInContent',
      label: 'In-Content Unit (Early Body)',
      description: 'Placed seamlessly between initial explanatory paragraphs.',
      format: 'Native In-Feed / Fluid',
    },
    {
      key: 'adSlotMidArticle',
      label: 'Mid-Article Break',
      description: 'Appears at the halfway mark of content blocks without breaking sentences.',
      format: 'Large Rectangle (336x280 / 300x250)',
    },
    {
      key: 'adSlotBeforeSources',
      label: 'Before Verification Sources List',
      description: 'Positioned above statutory regulatory citations and disclosure boxes.',
      format: 'Responsive Display',
    },
    {
      key: 'adSlotBottom',
      label: 'Article Footer Banner',
      description: 'Appears above related recommendations at the base of the page.',
      format: 'Large Leaderboard (970x250 / 300x250)',
    },
    {
      key: 'adSlotSidebar',
      label: 'Sticky Sidebar Unit',
      description: 'Displays in desktop right-rail alongside author biography.',
      format: 'Half Page / Skyscraper (300x600)',
    },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-blue-600" />
            <span>Advertising & Google AdSense Placements</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure global advertising switches, individual slot visibility, and AdSense client credentials.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Ad Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold">Advertising configuration successfully persisted! Public views updated in real time.</span>
        </div>
      )}

      {/* Provider & Credentials */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-2 border-b border-slate-100">
          Google AdSense Network Credentials
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-800">AdSense Publisher Client ID:</label>
            <input
              type="text"
              value={adConfig.globalClientCode || ''}
              onChange={(e) =>
                setAdConfig({ ...adConfig, globalClientCode: e.target.value })
              }
              placeholder="ca-pub-9876543210123456"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800">Preview & Staging Mode:</label>
            <div className="flex items-center gap-3 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adConfig.testMode}
                  onChange={(e) =>
                    setAdConfig({ ...adConfig, testMode: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-0"
                />
                <span className="text-slate-700 font-semibold">
                  Enable Test Placeholder Boxes (No live billing calls)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Slot Placements */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Granular Slot Visibility Matrix
          </span>
          <span className="text-xs text-slate-500">
            {placementsList.filter((p) => adConfig[p.key]).length} of{' '}
            {placementsList.length} Slots Enabled
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {placementsList.map((slot) => {
            const isEnabled = Boolean(adConfig[slot.key]);

            return (
              <div
                key={slot.key}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{slot.label}</h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {slot.format}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{slot.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleSlot(slot.key)}
                    className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                      isEnabled ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`block w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                        isEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-bold text-slate-700 min-w-16">
                    {isEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

