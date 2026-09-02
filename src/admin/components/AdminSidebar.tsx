import React from 'react';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  TrendingUp,
  FolderTree,
  FileEdit,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Megaphone,
  Shield,
  Search,
  Settings,
  X,
  CreditCard,
  ChevronDown,
  Globe
} from 'lucide-react';
import { AdminActiveSection } from '../../types/cms';

interface AdminSidebarProps {
  activeSection: AdminActiveSection;
  onSelectSection: (section: AdminActiveSection) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  articleCounts: {
    all: number;
    guides: number;
    news: number;
    drafts: number;
    published: number;
  };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSelectSection,
  isMobileOpen,
  onCloseMobile,
  articleCounts,
}) => {
  const navItemClass = (section: AdminActiveSection) => {
    const isActive = activeSection === section;
    return `w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      isActive
        ? 'bg-blue-600 text-white shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;
  };

  const subNavItemClass = (section: AdminActiveSection) => {
    const isActive = activeSection === section;
    return `w-full flex items-center justify-between pl-8 pr-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
      isActive
        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
    }`;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out font-['Plus_Jakarta_Sans',sans-serif] ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand & Logo Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight block">
                GlobalCredit
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">
                Editorial CMS
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Tree */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Dashboard */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectSection('dashboard');
                onCloseMobile();
              }}
              className={navItemClass('dashboard')}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </span>
            </button>
          </div>

          {/* CONTENT SECTION */}
          <div className="space-y-1">
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Content
            </div>

            <button
              onClick={() => {
                onSelectSection('articles-guides');
                onCloseMobile();
              }}
              className={subNavItemClass('articles-guides')}
            >
              <span className="flex items-center gap-2 truncate">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">Financial Guides</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                {articleCounts.guides}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectSection('articles-news');
                onCloseMobile();
              }}
              className={subNavItemClass('articles-news')}
            >
              <span className="flex items-center gap-2 truncate">
                <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">News & Trends</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                {articleCounts.news}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectSection('articles-all');
                onCloseMobile();
              }}
              className={subNavItemClass('articles-all')}
            >
              <span className="flex items-center gap-2 truncate">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>All Articles</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                {articleCounts.all}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectSection('articles-drafts');
                onCloseMobile();
              }}
              className={subNavItemClass('articles-drafts')}
            >
              <span className="flex items-center gap-2 truncate">
                <FileEdit className="w-3.5 h-3.5 text-slate-400" />
                <span>Drafts</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-mono">
                {articleCounts.drafts}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectSection('articles-published');
                onCloseMobile();
              }}
              className={subNavItemClass('articles-published')}
            >
              <span className="flex items-center gap-2 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Published</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono">
                {articleCounts.published}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectSection('categories');
                onCloseMobile();
              }}
              className={subNavItemClass('categories')}
            >
              <span className="flex items-center gap-2 truncate">
                <FolderTree className="w-3.5 h-3.5 text-slate-400" />
                <span>Categories</span>
              </span>
            </button>
          </div>

          {/* MEDIA SECTION */}
          <div className="space-y-1">
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Media
            </div>
            <button
              onClick={() => {
                onSelectSection('media');
                onCloseMobile();
              }}
              className={navItemClass('media')}
            >
              <span className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>Image Library</span>
              </span>
            </button>
          </div>

          {/* RECOMMENDATIONS SECTION */}
          <div className="space-y-1">
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Recommendations
            </div>
            <button
              onClick={() => {
                onSelectSection('recommendations');
                onCloseMobile();
              }}
              className={navItemClass('recommendations')}
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Related Articles</span>
              </span>
            </button>
          </div>

          {/* ADVERTISING SECTION */}
          <div className="space-y-1">
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Advertising
            </div>
            <button
              onClick={() => {
                onSelectSection('advertising');
                onCloseMobile();
              }}
              className={navItemClass('advertising')}
            >
              <span className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4" />
                <span>Ad Placements</span>
              </span>
            </button>
          </div>

          {/* PRIVACY SECTION */}
          <div className="space-y-1">
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Privacy
            </div>
            <button
              onClick={() => {
                onSelectSection('privacy');
                onCloseMobile();
              }}
              className={navItemClass('privacy')}
            >
              <span className="flex items-center gap-2.5">
                <Shield className="w-4 h-4" />
                <span>Cookie Settings</span>
              </span>
            </button>
          </div>

          {/* SEO SECTION */}
          <div className="space-y-1">
            <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              SEO
            </div>
            <button
              onClick={() => {
                onSelectSection('seo');
                onCloseMobile();
              }}
              className={navItemClass('seo')}
            >
              <span className="flex items-center gap-2.5">
                <Search className="w-4 h-4" />
                <span>Article SEO</span>
              </span>
            </button>
          </div>

          {/* SETTINGS */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onSelectSection('settings');
                onCloseMobile();
              }}
              className={navItemClass('settings')}
            >
              <span className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </span>
            </button>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <span>v3.0.0 &bull; Phase 3</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">
            Ready
          </span>
        </div>
      </aside>
    </>
  );
};
