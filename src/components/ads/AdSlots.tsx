import React, { useState, useEffect, useRef } from 'react';
import { ArticleStoreService } from '../../data/articles/articleStore';
import { AdPlacementConfig } from '../../types/cms';

export interface AdSlotProps {
  slotId?: string;
  adClient?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

// Helper hook to check ad visibility
function useAdConfig() {
  const [config, setConfig] = useState<AdPlacementConfig>(() => ArticleStoreService.getAdPlacementConfig());

  useEffect(() => {
    const handleStorage = () => {
      setConfig(ArticleStoreService.getAdPlacementConfig());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return config;
}

const AdSenseUnit: React.FC<{
  slotId?: string;
  adClient?: string;
  format?: string;
  className?: string;
  id?: string;
}> = ({ slotId, adClient = 'ca-pub-5108692655083046', format = 'auto', className = '', id }) => {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && slotId) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense initialization error or adblocker
    }
  }, [slotId]);

  if (!slotId) return null;

  return (
    <div className={`w-full my-6 flex justify-center items-center overflow-hidden min-h-[90px] ${className}`} id={id}>
      <ins
        ref={adRef}
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export const AdSlotTop: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if (!config.adSlotTop || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="horizontal" className={className} id="ad-slot-top" />;
};

export const AdSlotAfterIntro: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if (!config.adSlotAfterIntro || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="auto" className={className} id="ad-slot-after-intro" />;
};

export const AdSlotInContent: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if (!config.adSlotInContent || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="auto" className={className} id="ad-slot-incontent" />;
};

export const AdSlotMidArticle: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if (!config.adSlotMidArticle || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="horizontal" className={className} id="ad-slot-mid-article" />;
};

export const AdSlotBeforeSources: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if (!config.adSlotBeforeSources || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="auto" className={className} id="ad-slot-before-sources" />;
};

export const AdSlotBetweenSections: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if ((!config.adSlotInContent && !config.adSlotMidArticle) || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="horizontal" className={className} id="ad-slot-between-sections" />;
};

export const AdSlotSidebar: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if (!config.adSlotSidebar || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="vertical" className={className} id="ad-slot-sidebar" />;
};

export const AdSlotBottom: React.FC<AdSlotProps> = ({ slotId, adClient, className = '' }) => {
  const config = useAdConfig();
  if (!config.adSlotBottom || !slotId) return null;
  return <AdSenseUnit slotId={slotId} adClient={adClient || config.globalClientCode} format="horizontal" className={className} id="ad-slot-bottom" />;
};

