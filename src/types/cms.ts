import type { CountryCode, DataVerificationStatus } from './index';

export type { CountryCode, DataVerificationStatus };

export type ArticleType = 'financial-guide' | 'educational' | 'news' | 'trend' | 'guide';

export type ArticleStatus =
  | 'DRAFT'
  | 'REVIEW'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'draft'
  | 'published'
  | 'review'
  | 'scheduled'
  | 'archived';

export type SourceType =
  | 'Official Government'
  | 'Regulator'
  | 'Card Issuer'
  | 'Financial Institution'
  | 'Research Organization'
  | 'Reputable Publication'
  | 'Other';

export interface ArticleSource {
  id: string;
  name: string;
  url?: string;
  type: SourceType;
  publicationDate?: string;
  accessDate?: string;
  lastVerifiedDate?: string;
}

export type BlockType = 'paragraph' | 'heading' | 'image' | 'quote' | 'callout' | 'list' | 'table';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  content: string; // Plain text or lightweight HTML
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level: 1 | 2 | 3;
  content: string;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  url: string;
  alt: string; // Mandatory for accessibility & SEO
  caption?: string;
  source?: string;
  sourceUrl?: string;
  credit?: string;
  width?: number;
  height?: number;
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  quote: string;
  author?: string;
}

export interface CalloutBlock extends BaseBlock {
  type: 'callout';
  variant: 'info' | 'warning' | 'legal' | 'tip';
  title: string;
  content: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  ordered: boolean;
  items: string[];
}

export interface TableBlock extends BaseBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
  caption?: string;
}

export type ArticleContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock
  | CalloutBlock
  | ListBlock
  | TableBlock;

export interface ArticleSeo {
  title: string;
  metaDescription: string;
  canonicalUrl?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface CmsArticle {
  id: string;
  slug: string; // URL-safe slug, e.g. "how-credit-card-apr-works"
  title: string; // Supports emojis like "💳 How Does APR Work?", unicode & symbols
  subtitle: string; // Introduction summary
  country: CountryCode | 'global';
  type: ArticleType;
  category: string; // Primary category, e.g. "Financial Guides & Educational Articles" or "Credit Card News & Trends"
  subcategory: string; // e.g. "APR & Interest", "Credit Scores", "New Cards", "Regulations"
  author: ArticleAuthor;
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
    credit?: string;
  };
  blocks: ArticleContentBlock[];
  tags: string[];
  status: ArticleStatus;
  publishedDate: string; // YYYY-MM-DD
  scheduledDate?: string;
  lastUpdatedDate: string;
  lastVerifiedDate: string;
  eventDate?: string; // For time-sensitive news/developments
  verificationStatus: DataVerificationStatus;
  sources: ArticleSource[];
  seo: ArticleSeo;
  manualRelatedArticleIds: string[]; // Manual priority recommendations
  viewCount: number;
  readingTimeMinutes: number;
}

export interface MediaItem {
  id: string;
  title?: string;
  filename: string;
  url: string;
  alt: string;
  caption?: string;
  source?: string;
  dimensions: {
    width: number;
    height: number;
  };
  fileSize: string;
  usageCount: number;
  uploadedAt: string;
}

export interface ArticleSubcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: ArticleSubcategory[];
}

export interface CmsCategory {
  id: string;
  name: string;
  type: 'financial-guides' | 'news-trends';
  description: string;
  subcategories: string[];
  articleCount?: number;
}

export interface AdPlacementConfig {
  adSlotTop: boolean;
  adSlotAfterIntro: boolean;
  adSlotInContent: boolean;
  adSlotMidArticle: boolean;
  adSlotBeforeSources: boolean;
  adSlotBottom: boolean;
  adSlotSidebar: boolean;
  globalClientCode: string;
  testMode: boolean;
  showLabels: boolean;
  placements?: Record<string, { enabled: boolean; slotId?: string }>;
}

export interface CookieCategoryConfig {
  id: 'necessary' | 'analytics' | 'advertising' | 'preferences';
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  cookies: Array<{
    name: string;
    provider: string;
    purpose: string;
    expiry: string;
  }>;
}

export interface CookieConsentConfig {
  categories: CookieCategoryConfig[];
  bannerTitle: string;
  bannerDescription: string;
  privacyPolicyUrl: string;
  cookiePolicyUrl: string;
}

export interface CookieConsentState {
  hasConsented: boolean;
  categories: {
    necessary: boolean;
    analytics: boolean;
    advertising: boolean;
    preferences: boolean;
  };
  timestamp: string;
}

export type AdminActiveSection =
  | 'dashboard'
  | 'articles-all'
  | 'articles-guides'
  | 'articles-news'
  | 'articles-drafts'
  | 'articles-published'
  | 'categories'
  | 'media'
  | 'recommendations'
  | 'advertising'
  | 'privacy'
  | 'seo'
  | 'settings';

