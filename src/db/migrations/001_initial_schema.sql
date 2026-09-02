-- ==============================================================================
-- 001_initial_schema.sql - GlobalCredit Comprehensive Relational Schema (Turso / libSQL)
-- ==============================================================================

-- 1. COUNTRIES
CREATE TABLE IF NOT EXISTS countries (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  currency_code TEXT NOT NULL,
  currency_symbol TEXT NOT NULL,
  locale TEXT NOT NULL,
  language TEXT NOT NULL,
  regulator_name TEXT,
  regulator_abbr TEXT,
  regulator_website TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now'))
);

-- 2. ISSUERS
CREATE TABLE IF NOT EXISTS issuers (
  id TEXT PRIMARY KEY,
  country_id TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  description TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  UNIQUE(country_id, slug)
);

-- 3. SOURCES (Financial Traceability & Verification)
CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  source_type TEXT NOT NULL CHECK(source_type IN ('GOVERNMENT', 'REGULATOR', 'ISSUER', 'FINANCIAL_INSTITUTION', 'RESEARCH', 'REPUTABLE_PUBLICATION', 'OTHER')),
  organization TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  description TEXT,
  published_at TEXT,
  accessed_at TEXT,
  verified_at TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now'))
);

-- 4. CREDIT CARDS
CREATE TABLE IF NOT EXISTS credit_cards (
  id TEXT PRIMARY KEY,
  issuer_id TEXT NOT NULL,
  country_id TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  card_type TEXT NOT NULL DEFAULT 'Standard',
  network TEXT NOT NULL CHECK(network IN ('Visa', 'Mastercard', 'American Express', 'Discover', 'Eftpos', 'Other')),
  annual_fee REAL,
  annual_fee_promo TEXT,
  regular_apr_min REAL,
  regular_apr_max REAL,
  regular_apr_type TEXT DEFAULT 'Variable',
  regular_apr_display TEXT,
  intro_apr REAL,
  intro_apr_period_months INTEGER,
  intro_apr_applies_to TEXT,
  intro_apr_terms_notice TEXT,
  balance_transfer_apr REAL,
  balance_transfer_period_months INTEGER,
  balance_transfer_fee REAL,
  balance_transfer_fee_min REAL,
  balance_transfer_notes TEXT,
  foreign_transaction_fee REAL,
  foreign_transaction_is_zero INTEGER DEFAULT 0,
  foreign_transaction_details TEXT,
  rewards_type TEXT CHECK(rewards_type IN ('Cashback', 'Points', 'Miles', 'Airpoints', 'None')),
  rewards_headline TEXT,
  rewards_base_rate TEXT,
  rewards_category_rates_json TEXT,
  welcome_offer TEXT,
  minimum_credit_score INTEGER,
  credit_profile TEXT,
  student_card INTEGER NOT NULL DEFAULT 0,
  business_card INTEGER NOT NULL DEFAULT 0,
  secured_card INTEGER NOT NULL DEFAULT 0,
  cash_back INTEGER NOT NULL DEFAULT 0,
  travel_rewards INTEGER NOT NULL DEFAULT 0,
  no_annual_fee INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'VERIFIED' CHECK(status IN ('VERIFIED', 'DEMO', 'MISSING_DATA', 'NEEDS_REVIEW', 'OUTDATED', 'ARCHIVED')),
  featured INTEGER NOT NULL DEFAULT 0,
  rating_score REAL DEFAULT 4.5,
  editorial_summary TEXT,
  official_url TEXT,
  image_url TEXT,
  representative_example TEXT,
  apply_requirement_notes TEXT,
  published_date TEXT,
  last_verified_date TEXT NOT NULL DEFAULT (DATETIME('now')),
  last_updated_date TEXT NOT NULL DEFAULT (DATETIME('now')),
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (issuer_id) REFERENCES issuers(id) ON DELETE CASCADE,
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  UNIQUE(country_id, slug)
);

-- 5. CARD BENEFITS
CREATE TABLE IF NOT EXISTS card_benefits (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  benefit_type TEXT DEFAULT 'PERK',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (card_id) REFERENCES credit_cards(id) ON DELETE CASCADE
);

-- 6. CARD FEES
CREATE TABLE IF NOT EXISTS card_fees (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  fee_name TEXT NOT NULL,
  amount REAL,
  currency TEXT,
  frequency TEXT,
  description TEXT,
  source_id TEXT,
  verified_at TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (card_id) REFERENCES credit_cards(id) ON DELETE CASCADE,
  FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE SET NULL
);

-- 7. CARD REQUIREMENTS
CREATE TABLE IF NOT EXISTS card_requirements (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  description TEXT,
  value TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (card_id) REFERENCES credit_cards(id) ON DELETE CASCADE
);

-- 8. CARD SOURCES
CREATE TABLE IF NOT EXISTS card_sources (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  field_reference TEXT,
  verified_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (card_id) REFERENCES credit_cards(id) ON DELETE CASCADE,
  FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE
);

-- 9. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  country_id TEXT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  parent_id TEXT,
  type TEXT DEFAULT 'cards',
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(country_id, slug)
);

-- 10. TAGS
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now'))
);

CREATE TABLE IF NOT EXISTS card_tags (
  card_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (card_id, tag_id),
  FOREIGN KEY (card_id) REFERENCES credit_cards(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 11. ARTICLES & GUIDES & NEWS
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  country_id TEXT,
  category_id TEXT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'GUIDE' CHECK(content_type IN ('GUIDE', 'EDUCATIONAL', 'COMPARISON', 'EXPLAINER', 'REVIEW', 'NEWS', 'TREND', 'OTHER')),
  status TEXT NOT NULL DEFAULT 'PUBLISHED' CHECK(status IN ('DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED')),
  featured_image_url TEXT,
  featured_image_alt TEXT,
  author_name TEXT NOT NULL DEFAULT 'GlobalCredit Editorial Staff',
  author_role TEXT,
  published_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  allow_indexing INTEGER NOT NULL DEFAULT 1,
  allow_follow INTEGER NOT NULL DEFAULT 1,
  reading_time_minutes INTEGER DEFAULT 5,
  event_date TEXT,
  news_source TEXT,
  source_id TEXT,
  verification_status TEXT NOT NULL DEFAULT 'VERIFIED' CHECK(verification_status IN ('VERIFIED', 'DEMO', 'NEEDS_REVIEW', 'OUTDATED')),
  created_by TEXT,
  updated_by TEXT,
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE SET NULL,
  UNIQUE(country_id, slug)
);

CREATE TABLE IF NOT EXISTS article_tags (
  article_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 12. ARTICLE IMAGES
CREATE TABLE IF NOT EXISTS article_images (
  id TEXT PRIMARY KEY,
  article_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  credit TEXT,
  source_url TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  placement_type TEXT NOT NULL DEFAULT 'INLINE' CHECK(placement_type IN ('FEATURED', 'INLINE', 'AFTER_PARAGRAPH', 'BEFORE_SECTION', 'AFTER_SECTION')),
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- 13. ARTICLE RECOMMENDATIONS
CREATE TABLE IF NOT EXISTS article_recommendations (
  id TEXT PRIMARY KEY,
  article_id TEXT NOT NULL,
  recommended_article_id TEXT NOT NULL,
  recommendation_type TEXT NOT NULL DEFAULT 'AUTOMATIC' CHECK(recommendation_type IN ('AUTOMATIC', 'MANUAL')),
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (recommended_article_id) REFERENCES articles(id) ON DELETE CASCADE,
  UNIQUE(article_id, recommended_article_id)
);

-- 14. SEO METADATA
CREATE TABLE IF NOT EXISTS seo_metadata (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('article', 'category', 'card', 'country', 'calculator', 'page')),
  entity_id TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  robots TEXT DEFAULT 'index, follow',
  schema_type TEXT DEFAULT 'Article',
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  UNIQUE(entity_type, entity_id)
);

-- 15. MEDIA LIBRARY
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  credit TEXT,
  source_url TEXT,
  mime_type TEXT DEFAULT 'image/jpeg',
  width INTEGER DEFAULT 1200,
  height INTEGER DEFAULT 800,
  file_size TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now'))
);

-- 16. ADVERTISING (AD SLOTS)
CREATE TABLE IF NOT EXISTS ad_slots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL CHECK(location IN ('TOP', 'AFTER_INTRO', 'IN_CONTENT', 'MID_ARTICLE', 'BEFORE_SOURCES', 'SIDEBAR', 'BOTTOM')),
  active INTEGER NOT NULL DEFAULT 1,
  format TEXT DEFAULT 'RESPONSIVE',
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now'))
);

-- 17. COOKIE CONSENT
CREATE TABLE IF NOT EXISTS cookie_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  required INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS cookie_settings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  purpose TEXT NOT NULL,
  category_id TEXT NOT NULL,
  duration TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (category_id) REFERENCES cookie_categories(id) ON DELETE CASCADE
);

-- 18. ADMIN USERS
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'EDITOR' CHECK(role IN ('ADMIN', 'EDITOR', 'AUTHOR')),
  password_hash TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now'))
);

-- 19. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  admin_user_id TEXT,
  action TEXT NOT NULL CHECK(action IN ('CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH', 'ARCHIVE')),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
  FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- 20. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'string',
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now'))
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY EFFICIENCY
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_issuers_country ON issuers(country_id);
CREATE INDEX IF NOT EXISTS idx_cards_country ON credit_cards(country_id);
CREATE INDEX IF NOT EXISTS idx_cards_issuer ON credit_cards(issuer_id);
CREATE INDEX IF NOT EXISTS idx_cards_status ON credit_cards(status);
CREATE INDEX IF NOT EXISTS idx_cards_network ON credit_cards(network);
CREATE INDEX IF NOT EXISTS idx_cards_annual_fee ON credit_cards(annual_fee);
CREATE INDEX IF NOT EXISTS idx_articles_country ON articles(country_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_type ON articles(content_type);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_categories_country ON categories(country_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
