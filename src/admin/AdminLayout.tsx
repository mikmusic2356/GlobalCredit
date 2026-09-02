import React, { useState, useEffect } from 'react';
import {
  AdminActiveSection,
  CmsArticle,
  CountryCode,
  ArticleType,
  ArticleStatus,
  DataVerificationStatus
} from '../types/cms';
import { ArticleStoreService } from '../data/articles/articleStore';
import { AdminHeader } from './components/AdminHeader';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminArticlesListPage } from './pages/AdminArticlesListPage';
import { AdminCategoriesPage } from './pages/AdminCategoriesPage';
import { AdminRelatedArticlesPage } from './pages/AdminRelatedArticlesPage';
import { AdminAdsSettingsPage } from './pages/AdminAdsSettingsPage';
import { AdminPrivacySettingsPage } from './pages/AdminPrivacySettingsPage';
import { AdminSeoPage } from './pages/AdminSeoPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { MediaLibraryPage } from './media/MediaLibraryPage';
import { ArticleEditorModal } from './editor/ArticleEditorModal';
import { PublicArticleTemplate } from '../components/articles/PublicArticleTemplate';
import { AdminLoginModal } from './auth/AdminLoginModal';
import { AdminAuthService } from './auth/authService';
import { X } from 'lucide-react';

interface AdminLayoutProps {
  onNavigatePublicSite: () => void;
  onViewPublicArticle?: (article: CmsArticle) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  onNavigatePublicSite,
  onViewPublicArticle,
}) => {
  // 3-Factor Authentication Session Guard
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    AdminAuthService.isAuthenticated()
  );

  const [activeSection, setActiveSection] = useState<AdminActiveSection>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Articles state from store
  const [articles, setArticles] = useState<CmsArticle[]>(() =>
    ArticleStoreService.getAllArticles()
  );

  const handleLogout = () => {
    AdminAuthService.logout();
    setIsAuthenticated(false);
  };

  // If not authenticated, force the 3-factor security modal
  if (!isAuthenticated) {
    return (
      <AdminLoginModal
        onSuccess={() => setIsAuthenticated(true)}
        onCancel={onNavigatePublicSite}
      />
    );
  }

  // Editor Modal state
  const [editingArticle, setEditingArticle] = useState<CmsArticle | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Preview Modal state
  const [previewArticle, setPreviewArticle] = useState<CmsArticle | null>(null);

  const refreshArticles = () => {
    setArticles(ArticleStoreService.getAllArticles());
  };

  const handleNewArticle = () => {
    const freshArticle: CmsArticle = {
      id: `art-${Date.now()}`,
      slug: 'new-financial-guide',
      title: '',
      subtitle: '',
      country: 'us',
      category: 'Credit Building & Education',
      subcategory: 'APR Fundamentals',
      type: 'guide',
      status: 'draft',
      publishedDate: new Date().toISOString().split('T')[0],
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'VERIFIED',
      readingTimeMinutes: 5,
      author: {
        name: 'Sarah Jenkins, CFA',
        role: 'Senior Credit & Banking Analyst',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
        bio: 'Over 12 years of experience analyzing consumer credit portfolios and statutory APR disclosure regulations.',
      },
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Credit card payment terminal and calculations',
        caption: 'Primary banking education overview.',
        credit: 'Editorial Staff',
      },
      blocks: [
        {
          id: 'b-init-1',
          type: 'paragraph',
          content:
            'Credit cards are among the most versatile financial tools available, but understanding how interest rates, compounding frequencies, and fee structures operate is essential to avoiding unnecessary costs.',
        },
        {
          id: 'b-init-2',
          type: 'heading',
          level: 2,
          content: 'Key Principles and Framework',
        },
        {
          id: 'b-init-3',
          type: 'paragraph',
          content:
            'Before submitting an application, evaluate the annual percentage rate (APR), the duration of the interest-free grace period, and any applicable international transaction fees.',
        },
      ],
      sources: [
        {
          id: 'src-1',
          name: 'Consumer Financial Protection Bureau (CFPB) – Truth in Lending (Regulation Z)',
          url: 'https://www.consumerfinance.gov/rules-policy/regulations/1026/',
          type: 'Regulator',
          publicationDate: '2026-01-15',
          lastVerifiedDate: new Date().toISOString().split('T')[0],
        },
      ],
      seo: {
        title: '',
        metaDescription: '',
        primaryKeyword: 'credit card guide',
        secondaryKeywords: ['APR calculation', 'credit terms'],
      },
      tags: ['Credit Education', 'Financial Guide'],
      viewCount: 0,
      manualRelatedArticleIds: [],
    };

    setEditingArticle(freshArticle);
    setIsEditorOpen(true);
  };

  const handleEditArticle = (art: CmsArticle) => {
    setEditingArticle(art);
    setIsEditorOpen(true);
  };

  const handleSaveArticle = (updated: CmsArticle) => {
    ArticleStoreService.saveArticle(updated);
    refreshArticles();
    setIsEditorOpen(false);
  };

  const handleDuplicateArticle = (art: CmsArticle) => {
    const duplicated: CmsArticle = {
      ...art,
      id: `art-${Date.now()}`,
      title: `${art.title} (Copy)`,
      slug: `${art.slug}-copy`,
      status: 'draft',
      publishedDate: new Date().toISOString().split('T')[0],
      lastUpdatedDate: new Date().toISOString().split('T')[0],
    };
    ArticleStoreService.saveArticle(duplicated);
    refreshArticles();
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this article?')) {
      ArticleStoreService.deleteArticle(id);
      refreshArticles();
    }
  };

  const handleTogglePublish = (art: CmsArticle) => {
    const nextStatus: ArticleStatus =
      art.status === 'published' ? 'draft' : 'published';
    const updated: CmsArticle = {
      ...art,
      status: nextStatus,
      lastUpdatedDate: new Date().toISOString().split('T')[0],
    };
    ArticleStoreService.saveArticle(updated);
    refreshArticles();
  };

  const counts = {
    all: articles.length,
    guides: articles.filter((a) => {
      const t = (a.type || '').toLowerCase();
      return t.includes('guide') || t.includes('explainer') || t.includes('educational') || t.includes('comparison');
    }).length,
    news: articles.filter((a) => {
      const t = (a.type || '').toLowerCase();
      return t.includes('news') || t.includes('trend') || t.includes('regulatory');
    }).length,
    drafts: articles.filter((a) => (a.status || '').toLowerCase() === 'draft').length,
    published: articles.filter((a) => (a.status || '').toLowerCase() === 'published').length,
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <AdminDashboardPage
            articles={articles}
            onNewArticle={handleNewArticle}
            onEditArticle={handleEditArticle}
            onPreviewArticle={(art) => setPreviewArticle(art)}
            onDuplicateArticle={handleDuplicateArticle}
            onDeleteArticle={handleDeleteArticle}
            onTogglePublish={handleTogglePublish}
            onNavigateSection={(sec) => setActiveSection(sec)}
          />
        );

      case 'articles-all':
        return (
          <AdminArticlesListPage
            articles={articles}
            initialTypeFilter="all"
            onNewArticle={handleNewArticle}
            onEditArticle={handleEditArticle}
            onPreviewArticle={(art) => setPreviewArticle(art)}
            onDuplicateArticle={handleDuplicateArticle}
            onDeleteArticle={handleDeleteArticle}
            onTogglePublish={handleTogglePublish}
          />
        );

      case 'articles-guides':
        return (
          <AdminArticlesListPage
            articles={articles}
            initialTypeFilter="guide"
            onNewArticle={handleNewArticle}
            onEditArticle={handleEditArticle}
            onPreviewArticle={(art) => setPreviewArticle(art)}
            onDuplicateArticle={handleDuplicateArticle}
            onDeleteArticle={handleDeleteArticle}
            onTogglePublish={handleTogglePublish}
          />
        );

      case 'articles-news':
        return (
          <AdminArticlesListPage
            articles={articles}
            initialTypeFilter="news"
            onNewArticle={handleNewArticle}
            onEditArticle={handleEditArticle}
            onPreviewArticle={(art) => setPreviewArticle(art)}
            onDuplicateArticle={handleDuplicateArticle}
            onDeleteArticle={handleDeleteArticle}
            onTogglePublish={handleTogglePublish}
          />
        );

      case 'articles-drafts':
        return (
          <AdminArticlesListPage
            articles={articles}
            initialTypeFilter="draft"
            onNewArticle={handleNewArticle}
            onEditArticle={handleEditArticle}
            onPreviewArticle={(art) => setPreviewArticle(art)}
            onDuplicateArticle={handleDuplicateArticle}
            onDeleteArticle={handleDeleteArticle}
            onTogglePublish={handleTogglePublish}
          />
        );

      case 'articles-published':
        return (
          <AdminArticlesListPage
            articles={articles}
            initialTypeFilter="published"
            onNewArticle={handleNewArticle}
            onEditArticle={handleEditArticle}
            onPreviewArticle={(art) => setPreviewArticle(art)}
            onDuplicateArticle={handleDuplicateArticle}
            onDeleteArticle={handleDeleteArticle}
            onTogglePublish={handleTogglePublish}
          />
        );

      case 'categories':
        return <AdminCategoriesPage />;

      case 'media':
        return <MediaLibraryPage />;

      case 'recommendations':
        return (
          <AdminRelatedArticlesPage
            articles={articles}
            onEditArticle={handleEditArticle}
          />
        );

      case 'advertising':
        return <AdminAdsSettingsPage />;

      case 'privacy':
        return <AdminPrivacySettingsPage />;

      case 'seo':
        return (
          <AdminSeoPage
            articles={articles}
            onEditArticle={handleEditArticle}
          />
        );

      case 'settings':
        return <AdminSettingsPage onRefresh={refreshArticles} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <AdminHeader
        activeSection={activeSection}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onNewArticle={handleNewArticle}
        onNavigatePublicSite={onNavigatePublicSite}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main App Layout Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          articleCounts={counts}
        />

        {/* Content Main Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
          {renderActiveSection()}
        </main>
      </div>

      {/* Article Editor Modal */}
      {isEditorOpen && editingArticle && (
        <ArticleEditorModal
          article={editingArticle}
          allArticles={articles}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveArticle}
        />
      )}

      {/* Live Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-100 border border-slate-300 rounded-3xl w-full max-w-6xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Live Public Preview Mode &bull; {previewArticle.title}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const art = previewArticle;
                    setPreviewArticle(null);
                    handleEditArticle(art);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Open in Editor
                </button>
                <button
                  onClick={() => setPreviewArticle(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <PublicArticleTemplate
                article={previewArticle}
                isPreview={true}
                onNavigateHome={() => setPreviewArticle(null)}
                onNavigateCategory={() => {}}
                onSelectArticle={(selected) => setPreviewArticle(selected)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
