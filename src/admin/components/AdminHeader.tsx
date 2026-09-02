import React from 'react';
import {
  Menu,
  Plus,
  Globe,
  Search,
  ShieldCheck,
  Bell,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { AdminActiveSection } from '../../types/cms';

interface AdminHeaderProps {
  activeSection: AdminActiveSection;
  onToggleMobileSidebar: () => void;
  onNewArticle: () => void;
  onNavigatePublicSite: () => void;
  onLogout?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeSection,
  onToggleMobileSidebar,
  onNewArticle,
  onNavigatePublicSite,
  onLogout,
  searchQuery,
  onSearchChange,
}) => {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Editorial Overview';
      case 'articles-all':
        return 'All Content Repository';
      case 'articles-guides':
        return 'Financial Guides & Educational Content';
      case 'articles-news':
        return 'Credit Card News & Market Trends';
      case 'articles-drafts':
        return 'Editorial Drafts & Revisions';
      case 'articles-published':
        return 'Live Published Articles';
      case 'categories':
        return 'Taxonomy & Subcategories';
      case 'media':
        return 'Media & Asset Library';
      case 'recommendations':
        return 'Related Articles Engine';
      case 'advertising':
        return 'Google AdSense Placements';
      case 'privacy':
        return 'Privacy & Cookie Consent Settings';
      case 'seo':
        return 'SEO Health & Metadata Audit';
      case 'settings':
        return 'CMS System Configuration';
      default:
        return 'Administration';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Left: Mobile Menu Trigger & Section Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-none">
            {getSectionTitle()}
          </h1>
          <p className="text-[11px] text-slate-400 font-medium hidden sm:block mt-0.5">
            CardInsight Online CMS &bull; International Publishing Engine
          </p>
        </div>
      </div>

      {/* Center: Quick Search */}
      <div className="hidden md:flex items-center flex-1 max-w-xs relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles, tags, authors..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-900 text-xs rounded-xl border border-transparent focus:border-blue-500 transition-all focus:outline-hidden"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Create Article Button */}
        <button
          onClick={onNewArticle}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Article</span>
          <span className="sm:hidden">New</span>
        </button>

        {/* Public Site Button */}
        <button
          onClick={onNavigatePublicSite}
          className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Switch to public live website"
        >
          <Globe className="w-4 h-4 text-slate-500" />
          <span className="hidden md:inline">View Public Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>

        {/* User / Session Avatar & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            CI
          </div>
          <div className="hidden xl:block text-left leading-tight">
            <span className="text-xs font-bold text-slate-800 block">Master Admin</span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 3-Factor Verified
            </span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="ml-2 px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
              title="Cerrar sesión de administrador"
            >
              Salir
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
