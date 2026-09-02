import React, { useState } from 'react';
import {
  CmsArticle,
  CountryCode,
  ArticleType,
  ArticleStatus,
  DataVerificationStatus,
  ArticleCategory
} from '../../types/cms';
import {
  X,
  Save,
  Eye,
  CheckCircle2,
  FileText,
  Search,
  Building2,
  Sparkles,
  Image as ImageIcon,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Tag,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { LiveTitleInput } from './LiveTitleInput';
import { RichBodyBlockEditor } from './RichBodyBlockEditor';
import { SourcesEditor } from './SourcesEditor';
import { SeoPanelEditor } from './SeoPanelEditor';
import { RelatedArticlesSelector } from './RelatedArticlesSelector';
import { PublicArticleTemplate } from '../../components/articles/PublicArticleTemplate';
import { DEFAULT_CMS_CATEGORIES } from '../../data/categories/cmsCategories';
import { INITIAL_MEDIA_LIBRARY } from '../../data/media/mediaStore';

interface ArticleEditorModalProps {
  article: CmsArticle;
  allArticles: CmsArticle[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: CmsArticle) => void;
}

type EditorTab = 'content' | 'blocks' | 'sources' | 'seo' | 'related' | 'preview';

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  article: initialArticle,
  allArticles,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CmsArticle>({ ...initialArticle });
  const [activeTab, setActiveTab] = useState<EditorTab>('content');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategoryObj = DEFAULT_CMS_CATEGORIES.find(
    (c) => c.name === formData.category
  );

  const handleSave = (statusToApply?: ArticleStatus) => {
    // Validation
    if (!formData.title.trim()) {
      setValidationError('Article title is mandatory.');
      setActiveTab('content');
      return;
    }
    if (!formData.subtitle.trim()) {
      setValidationError('Article subtitle / introduction is mandatory.');
      setActiveTab('content');
      return;
    }
    if (!formData.slug.trim()) {
      setValidationError('URL slug is mandatory.');
      setActiveTab('seo');
      return;
    }
    if (formData.blocks.length === 0) {
      setValidationError('Article must contain at least one content block.');
      setActiveTab('blocks');
      return;
    }
    if (!formData.sources || formData.sources.length === 0) {
      setValidationError('At least one statutory verification source citation is required by editorial standards.');
      setActiveTab('sources');
      return;
    }

    setValidationError(null);

    const updated: CmsArticle = {
      ...formData,
      status: statusToApply || formData.status,
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      seo: {
        ...formData.seo,
        title: formData.seo.title || formData.title,
        metaDescription: formData.seo.metaDescription || formData.subtitle,
      },
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-6xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
        role="dialog"
        aria-labelledby="article-editor-title"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 id="article-editor-title" className="text-base font-bold text-slate-900 leading-tight">
                {formData.id.startsWith('art-') && !formData.title ? 'Create New Article' : 'Edit Editorial Article'}
              </h2>
              <p className="text-[11px] text-slate-500">
                Jurisdiction: <span className="font-bold text-slate-700 uppercase">{formData.country}</span> &bull; Status:{' '}
                <span
                  className={`font-bold ${
                    formData.status === 'published' ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {formData.status.toUpperCase()}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Full Preview</span>
            </button>

            <button
              onClick={() => handleSave('draft')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
            >
              Save Draft
            </button>

            <button
              onClick={() => handleSave('published')}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Article</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'content'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. Headline & Metadata</span>
          </button>

          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-4 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'blocks'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>2. Body & Images ({formData.blocks.length} blocks)</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>3. Sources & Verification ({formData.sources?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'seo'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>4. SEO & Canonical URL</span>
          </button>

          <button
            onClick={() => setActiveTab('related')}
            className={`px-4 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'related'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>5. Related Recommendations</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ml-auto ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Article Preview</span>
          </button>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{validationError}</span>
            </span>
            <button
              onClick={() => setValidationError(null)}
              className="text-rose-500 hover:text-rose-700 font-bold"
            >
              &times;
            </button>
          </div>
        )}

        {/* Body Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: CONTENT & METADATA */}
          {activeTab === 'content' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <LiveTitleInput
                title={formData.title}
                onChange={(title) => {
                  setFormData((prev) => ({
                    ...prev,
                    title,
                    seo: { ...prev.seo, title: prev.seo.title || title },
                  }));
                }}
                subtitle={formData.subtitle}
                onSubtitleChange={(subtitle) => {
                  setFormData((prev) => ({
                    ...prev,
                    subtitle,
                    seo: { ...prev.seo, metaDescription: prev.seo.metaDescription || subtitle },
                  }));
                }}
              />

              {/* Taxonomy & Configuration Matrix */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Taxonomy & Governance Classification
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {/* Country */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Target Country:</label>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          country: e.target.value as CountryCode | 'global',
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold uppercase"
                    >
                      <option value="us">United States (US)</option>
                      <option value="uk">United Kingdom (UK)</option>
                      <option value="ca">Canada (CA)</option>
                      <option value="au">Australia (AU)</option>
                      <option value="global">Global Jurisdiction</option>
                    </select>
                  </div>

                  {/* Content Type */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Content Type:</label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as ArticleType,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl capitalize"
                    >
                      <option value="guide">Financial Guide</option>
                      <option value="news">Market News</option>
                      <option value="trend">Industry Trend</option>
                      <option value="explainer">Financial Explainer</option>
                      <option value="comparison-analysis">Comparison Analysis</option>
                      <option value="regulatory-update">Regulatory Update</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Primary Category:</label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const newCat = e.target.value;
                        const catObj = DEFAULT_CMS_CATEGORIES.find((c) => c.name === newCat);
                        setFormData({
                          ...formData,
                          category: newCat,
                          subcategory: catObj?.subcategories[0]?.name || '',
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    >
                      {DEFAULT_CMS_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Subcategory:</label>
                    <select
                      value={formData.subcategory || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, subcategory: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    >
                      <option value="">-- General Category --</option>
                      {currentCategoryObj?.subcategories.map((sub) => (
                        <option key={sub.id} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status & Verification Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Publishing Status:</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as ArticleStatus })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold capitalize"
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="published">Published (Public)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Verification Status:</label>
                    <select
                      value={formData.verificationStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          verificationStatus: e.target.value as DataVerificationStatus,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold"
                    >
                      <option value="VERIFIED">VERIFIED (Full Primary Data Checked)</option>
                      <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                      <option value="REGULATORY_ALIGNED">REGULATORY_ALIGNED</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Est. Reading Time (Mins):</label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formData.readingTimeMinutes || 5}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          readingTimeMinutes: parseInt(e.target.value) || 5,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Author & Featured Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author Card */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Editorial Author</span>
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.author.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, name: e.target.value },
                        })
                      }
                      placeholder="Author name..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                    />
                    <input
                      type="text"
                      value={formData.author.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: { ...formData.author, role: e.target.value },
                        })
                      }
                      placeholder="Role (e.g. Senior Financial Analyst)..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-600"
                    />
                  </div>
                </div>

                {/* Featured Image */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    <span>Header Featured Image</span>
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.featuredImage?.url || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredImage: {
                            url: e.target.value,
                            alt: formData.featuredImage?.alt || formData.title,
                            caption: formData.featuredImage?.caption || '',
                            credit: formData.featuredImage?.credit || '',
                          },
                        })
                      }
                      placeholder="Image URL https://images.unsplash.com/..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-[11px]"
                    />
                    <input
                      type="text"
                      value={formData.featuredImage?.alt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredImage: {
                            ...formData.featuredImage,
                            url: formData.featuredImage?.url || '',
                            alt: e.target.value,
                          },
                        })
                      }
                      placeholder="Accessibility Alt description..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RICH BLOCKS & IMAGES */}
          {activeTab === 'blocks' && (
            <div className="max-w-4xl mx-auto">
              <RichBodyBlockEditor
                blocks={formData.blocks}
                onChange={(blocks) => setFormData({ ...formData, blocks })}
              />
            </div>
          )}

          {/* TAB 3: SOURCES & VERIFICATION */}
          {activeTab === 'sources' && (
            <div className="max-w-4xl mx-auto">
              <SourcesEditor
                sources={formData.sources || []}
                onChange={(sources) => setFormData({ ...formData, sources })}
                lastVerifiedDate={formData.lastVerifiedDate}
                onVerifiedDateChange={(lastVerifiedDate) =>
                  setFormData({ ...formData, lastVerifiedDate })
                }
              />
            </div>
          )}

          {/* TAB 4: SEO & URL SLUG */}
          {activeTab === 'seo' && (
            <div className="max-w-4xl mx-auto">
              <SeoPanelEditor
                seo={formData.seo}
                onChange={(seo) => setFormData({ ...formData, seo })}
                slug={formData.slug}
                onSlugChange={(slug) => setFormData({ ...formData, slug })}
                country={formData.country}
                type={formData.type}
                featuredImageUrl={formData.featuredImage?.url}
              />
            </div>
          )}

          {/* TAB 5: RELATED ARTICLES */}
          {activeTab === 'related' && (
            <div className="max-w-4xl mx-auto">
              <RelatedArticlesSelector
                currentArticle={formData}
                manualRelatedIds={formData.manualRelatedArticleIds || []}
                onChangeManualRelatedIds={(manualRelatedArticleIds) =>
                  setFormData({ ...formData, manualRelatedArticleIds })
                }
                allArticles={allArticles}
              />
            </div>
          )}

          {/* TAB 6: FULL LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="bg-slate-100 rounded-2xl p-2 sm:p-6 border border-slate-300">
              <PublicArticleTemplate
                article={formData}
                isPreview={true}
                onNavigateHome={() => {}}
                onNavigateCategory={() => {}}
                onSelectArticle={() => {}}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel & Discard
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave('draft')}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave('published')}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Publish Live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
