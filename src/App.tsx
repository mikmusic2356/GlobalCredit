import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, CardCategory, CountryCode, CreditCardItem, FinancialGuide, NewsItem, CmsArticle } from './types';
import { 
  parsePath, 
  RouteState, 
  RouteUrls, 
  updateDocumentSeo, 
  CalculatorSlug, 
  CreditScoreSubRoute, 
  ResourcesSubRoute 
} from './lib/router';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { CountrySelectorModal } from './components/common/CountrySelectorModal';
import { AiCreditAssistantModal } from './components/ai/AiCreditAssistantModal';
import { CardDetailModal } from './components/cards/CardDetailModal';
import { HomeView } from './components/home/HomeView';
import { CardsView } from './components/cards/CardsView';
import { CompareView } from './components/compare/CompareView';
import { CalculatorsView } from './components/calculators/CalculatorsView';
import { GuidesView } from './components/guides/GuidesView';
import { NewsView } from './components/news/NewsView';
import { ResourcesView } from './components/resources/ResourcesView';
import { AboutView } from './components/about/AboutView';
import { CountriesView } from './components/countries/CountriesView';
import { CreditScoreExplainedView } from './components/credit-score/CreditScoreExplainedView';
import { ArticleDetailPage } from './components/articles/ArticleDetailPage';
import { CookieConsentBanner } from './components/cookies/CookieConsentBanner';
import { CookiePreferencesModal } from './components/cookies/CookiePreferencesModal';
import { CookiePolicyView } from './components/cookies/CookiePolicyView';
import { PrivacyPolicyView } from './components/cookies/PrivacyPolicyView';
import { TermsOfServiceView } from './components/legal/TermsOfServiceView';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AdminLayout } from './admin/AdminLayout';
import { CREDIT_CARDS_DATA } from './data/cards';

export function App() {
  // Parse initial route directly from window.location
  const [routeState, setRouteState] = useState<RouteState>(() => {
    return parsePath(window.location.pathname, window.location.search);
  });

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [selectedCardForModal, setSelectedCardForModal] = useState<CreditCardItem | null>(null);
  const [isCookiePreferencesOpen, setIsCookiePreferencesOpen] = useState(false);

  // Comparison Matrix state (default 2 cards preloaded for instantaneous demonstration)
  const [comparedCards, setComparedCards] = useState<CreditCardItem[]>([
    CREDIT_CARDS_DATA[0], // US Chase Sapphire Preferred
    CREDIT_CARDS_DATA[1], // US Citi Custom Cash
  ]);

  // Master Navigation Function: Updates browser URL, updates state, and updates SEO metadata
  const navigate = useCallback((url: string, replace = false) => {
    if (replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
    const newState = parsePath(url);
    setRouteState(newState);
    updateDocumentSeo(newState);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update SEO metadata on initial mount and route changes
  useEffect(() => {
    updateDocumentSeo(routeState);
  }, [routeState]);

  // Listen for browser Back & Forward popstate events
  useEffect(() => {
    const handlePopState = () => {
      const newState = parsePath(window.location.pathname, window.location.search);
      setRouteState(newState);
      updateDocumentSeo(newState);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K to open Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleCompare = (card: CreditCardItem) => {
    if (comparedCards.some((c) => c.id === card.id)) {
      setComparedCards(comparedCards.filter((c) => c.id !== card.id));
    } else {
      if (comparedCards.length >= 4) {
        alert('You can compare a maximum of 4 credit cards at a time.');
        return;
      }
      setComparedCards([...comparedCards, card]);
    }
  };

  const handleRemoveFromCompare = (cardId: string) => {
    setComparedCards(comparedCards.filter((c) => c.id !== cardId));
  };

  const handleAddCardToCompare = (card: CreditCardItem) => {
    if (!comparedCards.some((c) => c.id === card.id) && comparedCards.length < 4) {
      setComparedCards([...comparedCards, card]);
    }
  };

  // If Admin route is active, render full-screen Admin Layout
  if (routeState.tab === 'admin') {
    return (
      <AdminLayout
        onNavigatePublicSite={() => navigate(RouteUrls.home())}
        onViewPublicArticle={(art) => navigate(RouteUrls.articleDetail(art.slug))}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-blue-600 selection:text-white">
      {/* Universal Top Header */}
      <Header
        activeTab={routeState.tab}
        setActiveTab={(tab) => {
          if (tab === 'home') navigate(RouteUrls.home());
          else if (tab === 'cards') navigate(RouteUrls.cards(routeState.country, routeState.category));
          else if (tab === 'compare') navigate(RouteUrls.compare(routeState.country));
          else if (tab === 'credit-score') navigate(RouteUrls.creditScores(routeState.creditScoreSubRoute || undefined));
          else if (tab === 'calculators') navigate(RouteUrls.calculators(routeState.calculatorSlug || undefined));
          else if (tab === 'guides') navigate(RouteUrls.guides());
          else if (tab === 'news') navigate(RouteUrls.news());
          else if (tab === 'resources') navigate(RouteUrls.resources(routeState.resourcesSubRoute || undefined));
          else if (tab === 'countries') navigate(RouteUrls.countries(routeState.country));
          else if (tab === 'about') navigate(RouteUrls.about());
          else if (tab === 'admin') navigate(RouteUrls.admin());
          else if (tab === 'cookie-policy') navigate(RouteUrls.cookiePolicy());
          else if (tab === 'privacy-policy') navigate(RouteUrls.privacyPolicy());
        }}
        selectedCountry={routeState.country}
        setSelectedCountry={(country) => {
          if (routeState.tab === 'cards') {
            navigate(RouteUrls.cards(country, routeState.category));
          } else if (routeState.tab === 'compare') {
            navigate(RouteUrls.compare(country));
          } else if (routeState.tab === 'countries') {
            navigate(RouteUrls.countries(country));
          } else {
            navigate(RouteUrls.cards(country));
          }
        }}
        openSearch={() => setIsSearchOpen(true)}
        openAiAssistant={() => setIsAiAssistantOpen(true)}
        openCountryModal={() => setIsCountryModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        <ErrorBoundary>
          {/* Article Detail View */}
          {routeState.activeArticle ? (
            <ArticleDetailPage
              article={routeState.activeArticle}
              onBack={() => navigate(RouteUrls.guides())}
              onNavigateHome={() => navigate(RouteUrls.home())}
              onNavigateCategory={() => navigate(RouteUrls.guides())}
              onSelectArticle={(selected) => navigate(RouteUrls.articleDetail(selected.slug))}
            />
          ) : (
            <>
              {routeState.tab === 'home' && (
                <HomeView
                  selectedCountry={routeState.country}
                  setSelectedCountry={(country) => navigate(RouteUrls.cards(country))}
                  setActiveTab={(tab) => {
                    if (tab === 'home') navigate(RouteUrls.home());
                    else if (tab === 'cards') navigate(RouteUrls.cards(routeState.country));
                    else if (tab === 'compare') navigate(RouteUrls.compare(routeState.country));
                    else if (tab === 'credit-score') navigate(RouteUrls.creditScores());
                    else if (tab === 'calculators') navigate(RouteUrls.calculators());
                    else if (tab === 'guides') navigate(RouteUrls.guides());
                    else if (tab === 'news') navigate(RouteUrls.news());
                    else if (tab === 'resources') navigate(RouteUrls.resources());
                    else if (tab === 'countries') navigate(RouteUrls.countries(routeState.country));
                    else if (tab === 'about') navigate(RouteUrls.about());
                  }}
                  onSelectCategory={(cat) => navigate(RouteUrls.cards(routeState.country, cat))}
                  onSelectCard={(card) => navigate(RouteUrls.cardDetail(card.country, card.id))}
                  onSelectGuide={(guide) => navigate(RouteUrls.guideDetail(guide.slug))}
                  onSelectNews={(news) => navigate(RouteUrls.newsDetail(news.slug))}
                  onSelectCalculator={(calcId) => navigate(RouteUrls.calculators(calcId as CalculatorSlug))}
                  openSearch={() => setIsSearchOpen(true)}
                  openAiAssistant={() => setIsAiAssistantOpen(true)}
                  openCountryModal={() => setIsCountryModalOpen(true)}
                />
              )}

              {routeState.tab === 'cards' && (
                <CardsView
                  selectedCountry={routeState.country}
                  setSelectedCountry={(country) => navigate(RouteUrls.cards(country, routeState.category))}
                  selectedCategory={routeState.category}
                  setSelectedCategory={(category) => navigate(RouteUrls.cards(routeState.country, category))}
                  activeCard={routeState.activeCard}
                  onSelectCard={(card) => {
                    if (card) {
                      navigate(RouteUrls.cardDetail(card.country, card.id));
                    } else {
                      navigate(RouteUrls.cards(routeState.country, routeState.category));
                    }
                  }}
                  comparedCards={comparedCards}
                  onToggleCompare={handleToggleCompare}
                  onNavigateToCompare={() => navigate(RouteUrls.compare(routeState.country))}
                />
              )}

              {routeState.tab === 'compare' && (
                <CompareView
                  selectedCountry={routeState.country}
                  comparedCards={comparedCards}
                  onRemoveFromCompare={handleRemoveFromCompare}
                  onAddCardToCompare={handleAddCardToCompare}
                  onClearCompare={() => setComparedCards([])}
                  onOpenCardDetail={(card) => navigate(RouteUrls.cardDetail(card.country, card.id))}
                />
              )}

              {routeState.tab === 'calculators' && (
                <CalculatorsView 
                  selectedCountry={routeState.country}
                  activeCalculatorSlug={routeState.calculatorSlug}
                  onSelectCalculatorSlug={(slug) => navigate(RouteUrls.calculators(slug))}
                />
              )}

              {routeState.tab === 'credit-score' && (
                <CreditScoreExplainedView
                  selectedCountry={routeState.country}
                  setSelectedCountry={(country) => navigate(RouteUrls.creditScores(country as CreditScoreSubRoute))}
                  subRoute={routeState.creditScoreSubRoute}
                  onSelectSubRoute={(sub) => navigate(RouteUrls.creditScores(sub))}
                  onNavigateToCalculators={() => navigate(RouteUrls.calculators())}
                  onNavigateToCards={() => navigate(RouteUrls.cards(routeState.country))}
                  openAiAssistant={() => setIsAiAssistantOpen(true)}
                />
              )}

              {routeState.tab === 'guides' && (
                <GuidesView
                  selectedCountry={routeState.country}
                  activeGuide={routeState.activeGuide}
                  onSelectGuide={(guide) => {
                    if (guide) {
                      navigate(RouteUrls.guideDetail(guide.slug));
                    } else {
                      navigate(RouteUrls.guides());
                    }
                  }}
                  onSelectCmsArticle={(art) => navigate(RouteUrls.articleDetail(art.slug))}
                  onNavigateToCreditScores={() => navigate(RouteUrls.creditScores())}
                />
              )}

              {routeState.tab === 'news' && (
                <NewsView
                  selectedCountry={routeState.country}
                  activeNews={routeState.activeNews}
                  onSelectNews={(news) => {
                    if (news) {
                      navigate(RouteUrls.newsDetail(news.slug));
                    } else {
                      navigate(RouteUrls.news());
                    }
                  }}
                />
              )}

              {routeState.tab === 'resources' && (
                <ResourcesView 
                  selectedCountry={routeState.country}
                  activeSectionSubRoute={routeState.resourcesSubRoute}
                  onSelectSectionSubRoute={(sub) => navigate(RouteUrls.resources(sub))}
                />
              )}

              {routeState.tab === 'countries' && (
                <CountriesView
                  selectedCountry={routeState.country}
                  setSelectedCountry={(country) => navigate(RouteUrls.countries(country))}
                  onNavigateToCards={() => navigate(RouteUrls.cards(routeState.country))}
                />
              )}

              {routeState.tab === 'about' && (
                <AboutView />
              )}

              {routeState.tab === 'cookie-policy' && (
                <CookiePolicyView
                  onBackHome={() => navigate(RouteUrls.home())}
                  onOpenPreferences={() => setIsCookiePreferencesOpen(true)}
                />
              )}

              {routeState.tab === 'privacy-policy' && (
                <PrivacyPolicyView onBackHome={() => navigate(RouteUrls.home())} />
              )}

              {routeState.tab === 'terms' && (
                <TermsOfServiceView onBackHome={() => navigate(RouteUrls.home())} />
              )}
            </>
          )}
        </ErrorBoundary>
      </main>

      {/* Universal Footer */}
      <Footer
        setActiveTab={(tab) => {
          if (tab === 'home') navigate(RouteUrls.home());
          else if (tab === 'cards') navigate(RouteUrls.cards(routeState.country));
          else if (tab === 'compare') navigate(RouteUrls.compare(routeState.country));
          else if (tab === 'credit-score') navigate(RouteUrls.creditScores());
          else if (tab === 'calculators') navigate(RouteUrls.calculators());
          else if (tab === 'guides') navigate(RouteUrls.guides());
          else if (tab === 'news') navigate(RouteUrls.news());
          else if (tab === 'resources') navigate(RouteUrls.resources());
          else if (tab === 'countries') navigate(RouteUrls.countries(routeState.country));
          else if (tab === 'about') navigate(RouteUrls.about());
          else if (tab === 'admin') navigate(RouteUrls.admin());
          else if (tab === 'cookie-policy') navigate(RouteUrls.cookiePolicy());
          else if (tab === 'privacy-policy') navigate(RouteUrls.privacyPolicy());
          else if (tab === 'terms') navigate(RouteUrls.terms());
        }}
        selectedCountry={routeState.country}
        setSelectedCountry={(country) => navigate(RouteUrls.cards(country))}
        openCountryModal={() => setIsCountryModalOpen(true)}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPreferences={() => setIsCookiePreferencesOpen(true)}
        onOpenPolicy={() => navigate(RouteUrls.cookiePolicy())}
      />

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        isOpen={isCookiePreferencesOpen}
        onClose={() => setIsCookiePreferencesOpen(false)}
        onOpenPolicy={() => {
          setIsCookiePreferencesOpen(false);
          navigate(RouteUrls.cookiePolicy());
        }}
      />

      {/* Modals & Dialogs */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        selectedCountry={routeState.country}
        onSelectCountry={(country) => {
          navigate(RouteUrls.cards(country));
          setIsSearchOpen(false);
        }}
        onSelectCategory={(cat) => {
          navigate(RouteUrls.cards(routeState.country, cat));
          setIsSearchOpen(false);
        }}
        onSelectCard={(card) => {
          navigate(RouteUrls.cardDetail(card.country, card.id));
          setIsSearchOpen(false);
        }}
        onSelectGuide={(guide) => {
          navigate(RouteUrls.guideDetail(guide.slug));
          setIsSearchOpen(false);
        }}
        onSelectNews={(news) => {
          navigate(RouteUrls.newsDetail(news.slug));
          setIsSearchOpen(false);
        }}
        onSelectCalculator={(calcId) => {
          navigate(RouteUrls.calculators(calcId as CalculatorSlug));
          setIsSearchOpen(false);
        }}
        onNavigateTab={(tab) => {
          if (tab === 'home') navigate(RouteUrls.home());
          else if (tab === 'cards') navigate(RouteUrls.cards(routeState.country));
          else if (tab === 'compare') navigate(RouteUrls.compare(routeState.country));
          else if (tab === 'credit-score') navigate(RouteUrls.creditScores());
          else if (tab === 'calculators') navigate(RouteUrls.calculators());
          else if (tab === 'guides') navigate(RouteUrls.guides());
          else if (tab === 'news') navigate(RouteUrls.news());
          else if (tab === 'resources') navigate(RouteUrls.resources());
          else if (tab === 'countries') navigate(RouteUrls.countries(routeState.country));
          else if (tab === 'about') navigate(RouteUrls.about());
          else if (tab === 'admin') navigate(RouteUrls.admin());
          else if (tab === 'cookie-policy') navigate(RouteUrls.cookiePolicy());
          else if (tab === 'privacy-policy') navigate(RouteUrls.privacyPolicy());
          else if (tab === 'terms') navigate(RouteUrls.terms());
          setIsSearchOpen(false);
        }}
      />

      <CountrySelectorModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        selectedCountry={routeState.country}
        onSelectCountry={(country) => {
          if (routeState.tab === 'cards') {
            navigate(RouteUrls.cards(country, routeState.category));
          } else {
            navigate(RouteUrls.cards(country));
          }
          setIsCountryModalOpen(false);
        }}
      />

      <AiCreditAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        selectedCountry={routeState.country}
      />

      <CardDetailModal
        card={selectedCardForModal}
        onClose={() => setSelectedCardForModal(null)}
        onAddToCompare={handleAddCardToCompare}
        isCompared={
          selectedCardForModal
            ? comparedCards.some((c) => c.id === selectedCardForModal.id)
            : false
        }
      />
    </div>
  );
}
export default App;

