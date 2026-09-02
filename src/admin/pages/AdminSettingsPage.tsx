import React, { useState } from 'react';
import { Settings, Download, Upload, RotateCcw, ShieldCheck, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import { ArticleStoreService } from '../../data/articles/articleStore';

interface AdminSettingsPageProps {
  onRefresh: () => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onRefresh }) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleExportJson = () => {
    const backup = {
      version: '3.0.0',
      exportedAt: new Date().toISOString(),
      articles: ArticleStoreService.getAllArticles(),
      adConfig: ArticleStoreService.getAdConfig(),
      categories: localStorage.getItem('gc_cms_categories')
        ? JSON.parse(localStorage.getItem('gc_cms_categories')!)
        : null,
      mediaLibrary: localStorage.getItem('gc_media_library')
        ? JSON.parse(localStorage.getItem('gc_media_library')!)
        : null,
      cookieConsent: ArticleStoreService.getCookieConsent(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cardinsight_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setStatusMessage('CMS Database successfully exported to JSON backup.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleResetSeedData = () => {
    if (confirm('Reset CMS database to verified initial seed state? Any custom articles created during this session will be replaced by the master verified editorial catalog.')) {
      ArticleStoreService.resetToSeed();
      localStorage.removeItem('gc_cms_categories');
      localStorage.removeItem('gc_media_library');
      onRefresh();
      setStatusMessage('CMS data restored to initial verified seed catalog.');
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <span>System & Editorial Governance Configuration</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage local storage data backups, import/export schema, and editorial compliance rules.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span className="font-bold">{statusMessage}</span>
        </div>
      )}

      {/* Editorial Mandate Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Publishing Standards & Truth-in-Lending Mandate
          </h3>
        </div>

        <ul className="space-y-2 text-xs text-slate-700">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
            <span>
              <strong>Zero Algorithmic Invention:</strong> The CMS serves strictly as an editorial authoring platform. Financial figures and terms must be verified against statutory sources (CFPB, FCA, FCAC, ASIC).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
            <span>
              <strong>No Fake Advertisements:</strong> All advertising units conform to standard Google AdSense responsive units or explicit test placement boxes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
            <span>
              <strong>Client-Side Durability:</strong> Local state persistence ensures seamless administration without external database lock-in.
            </span>
          </li>
        </ul>
      </div>

      {/* Data Backup & Restore */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-2 border-b border-slate-100">
          Data Export & Disaster Recovery
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Export */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Download className="w-4 h-4 text-blue-600" />
                <span>Export CMS Database</span>
              </span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Download a complete JSON snapshot containing all articles, media metadata, advertising rules, and category hierarchies.
              </p>
            </div>
            <button
              onClick={handleExportJson}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download JSON Backup
            </button>
          </div>

          {/* Reset */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Restore Seed Catalog</span>
              </span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Restore the comprehensive verified catalog of guides, APR explainers, and category fixtures.
              </p>
            </div>
            <button
              onClick={handleResetSeedData}
              className="w-full py-2 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-bold rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset to Initial Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
