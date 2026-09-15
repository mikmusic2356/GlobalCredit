import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slotType: 'leaderboard' | 'rectangle' | 'billboard' | 'inline' | 'sidebar';
  className?: string;
  slotId?: string;
  client?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slotType, 
  className = '', 
  slotId,
  client = 'ca-pub-5108692655083046'
}) => {
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

  // If no explicit slot ID is assigned yet, keep the DOM clean without placeholder borders that trigger thin-content review flags
  if (!slotId) {
    return null;
  }

  const getSlotFormat = () => {
    switch (slotType) {
      case 'rectangle':
        return 'rectangle';
      case 'sidebar':
        return 'vertical';
      case 'billboard':
      case 'leaderboard':
        return 'horizontal';
      case 'inline':
      default:
        return 'auto';
    }
  };

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center min-h-[90px] w-full overflow-hidden ${className}`}
      id={`ad-container-${slotType}-${slotId}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format={getSlotFormat()}
        data-full-width-responsive="true"
      />
    </div>
  );
};

