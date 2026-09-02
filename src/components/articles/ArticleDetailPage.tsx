import React from 'react';
import { CmsArticle } from '../../types/cms';
import { PublicArticleTemplate } from './PublicArticleTemplate';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface ArticleDetailPageProps {
  article: CmsArticle | null;
  onBack: () => void;
  onNavigateHome: () => void;
  onSelectArticle: (article: CmsArticle) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onNavigateHome,
  onSelectArticle,
}) => {
  if (!article) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Article Not Found</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            The requested financial guide or news article could not be located or may have been archived.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition-all cursor-pointer"
          >
            Browse All Content
          </button>
        </div>
      </div>
    );
  }

  return (
    <PublicArticleTemplate
      article={article}
      onNavigateHome={onNavigateHome}
      onNavigateCategory={onBack}
      onSelectArticle={onSelectArticle}
      isPreview={false}
    />
  );
};
