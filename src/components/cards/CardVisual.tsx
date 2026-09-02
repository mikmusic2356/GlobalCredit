import React from 'react';
import { CreditCardItem } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { Wifi, Building2 } from 'lucide-react';

interface CardVisualProps {
  card: CreditCardItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Brand gradient & aesthetic themes based on issuer/card type
export function getCardDesign(card: CreditCardItem) {
  const name = (card.name || '').toLowerCase();
  const issuer = (card.issuer || '').toLowerCase();
  const categories = card.categories || [];

  // 1. Premium / Luxury / Sapphire Reserve / Platinum / Black / World Elite
  if (
    name.includes('sapphire reserve') ||
    name.includes('platinum') ||
    name.includes('black') ||
    name.includes('centurion') ||
    name.includes('world elite') ||
    name.includes('infinite')
  ) {
    return {
      gradient: 'from-slate-900 via-neutral-800 to-zinc-950',
      accent: 'border-amber-400/40 shadow-slate-950/40 text-amber-200',
      badgeBg: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      chipColor: 'from-amber-200 to-yellow-500',
      tagline: 'PREMIUM TRAVEL & ELITE',
      pattern: 'radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
    };
  }

  // 2. Chase Sapphire Preferred / Blue Sapphire / Chase Freedom
  if (name.includes('sapphire') || issuer.includes('chase') || issuer.includes('jpmorgan')) {
    return {
      gradient: 'from-blue-950 via-indigo-900 to-slate-950',
      accent: 'border-blue-400/30 shadow-blue-950/40 text-blue-200',
      badgeBg: 'bg-blue-400/20 text-blue-300 border-blue-400/30',
      chipColor: 'from-amber-200 to-yellow-500',
      tagline: 'CHASE FREEDOM & REWARDS',
      pattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
    };
  }

  // 3. Citi / Citibank
  if (issuer.includes('citi') || issuer.includes('citibank')) {
    return {
      gradient: 'from-cyan-950 via-blue-900 to-slate-950',
      accent: 'border-cyan-400/30 shadow-cyan-950/30 text-cyan-200',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
      chipColor: 'from-amber-200 to-yellow-400',
      tagline: 'CITIBANK THANKYOU®',
      pattern: 'radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 60%)',
    };
  }

  // 4. Capital One
  if (issuer.includes('capital one')) {
    return {
      gradient: 'from-red-950 via-slate-900 to-slate-950',
      accent: 'border-red-500/30 shadow-red-950/30 text-red-200',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-400/30',
      chipColor: 'from-amber-100 to-yellow-500',
      tagline: 'CAPITAL ONE VENTURE',
      pattern: 'radial-gradient(circle at 90% 10%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)',
    };
  }

  // 5. American Express / Amex
  if (issuer.includes('american express') || card.network === 'American Express') {
    return {
      gradient: 'from-sky-950 via-slate-800 to-blue-950',
      accent: 'border-sky-300/30 shadow-sky-950/30 text-sky-200',
      badgeBg: 'bg-sky-400/20 text-sky-200 border-sky-300/30',
      chipColor: 'from-amber-100 to-amber-400',
      tagline: 'MEMBERSHIP REWARDS®',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
    };
  }

  // 6. Discover
  if (issuer.includes('discover') || card.network === 'Discover') {
    return {
      gradient: 'from-orange-950 via-amber-950 to-slate-950',
      accent: 'border-orange-500/30 shadow-orange-950/30 text-orange-200',
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
      chipColor: 'from-amber-200 to-yellow-400',
      tagline: 'DISCOVER CASHBACK MATCH™',
      pattern: 'radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.2) 0%, transparent 60%)',
    };
  }

  // 7. UK Banks (Barclays, HSBC, Lloyds, NatWest, Santander, Virgin)
  if (issuer.includes('barclays') || issuer.includes('barclaycard')) {
    return {
      gradient: 'from-sky-950 via-cyan-950 to-slate-950',
      accent: 'border-sky-400/30 shadow-sky-950/30 text-sky-200',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
      chipColor: 'from-amber-100 to-yellow-400',
      tagline: 'BARCLAYS UK',
      pattern: 'radial-gradient(circle at 30% 20%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
    };
  }

  if (issuer.includes('hsbc')) {
    return {
      gradient: 'from-rose-950 via-slate-900 to-slate-950',
      accent: 'border-rose-500/30 shadow-rose-950/30 text-rose-200',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
      chipColor: 'from-amber-100 to-yellow-500',
      tagline: 'HSBC GLOBAL BANKING',
      pattern: 'radial-gradient(circle at 75% 25%, rgba(244, 63, 94, 0.2) 0%, transparent 50%)',
    };
  }

  // 8. Canadian Banks (RBC, TD, Scotiabank, BMO, CIBC)
  if (issuer.includes('royal bank') || issuer.includes('rbc')) {
    return {
      gradient: 'from-blue-950 via-amber-950/60 to-slate-950',
      accent: 'border-blue-400/30 shadow-blue-950/30 text-blue-200',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      chipColor: 'from-amber-200 to-yellow-400',
      tagline: 'RBC AVION & REWARDS',
      pattern: 'radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.2) 0%, transparent 60%)',
    };
  }

  if (issuer.includes('td') || issuer.includes('toronto-dominion')) {
    return {
      gradient: 'from-emerald-950 via-teal-950 to-slate-950',
      accent: 'border-emerald-400/30 shadow-emerald-950/30 text-emerald-200',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      chipColor: 'from-amber-100 to-yellow-400',
      tagline: 'TD CANADA TRUST',
      pattern: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
    };
  }

  if (issuer.includes('scotia') || issuer.includes('scotiabank')) {
    return {
      gradient: 'from-red-950 via-zinc-900 to-slate-950',
      accent: 'border-red-500/30 shadow-red-950/30 text-red-200',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-400/30',
      chipColor: 'from-amber-200 to-yellow-500',
      tagline: 'SCOTIABANK SCENE+®',
      pattern: 'radial-gradient(circle at 70% 30%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)',
    };
  }

  // 9. Australian Banks (Commonwealth, ANZ, Westpac, NAB)
  if (issuer.includes('commonwealth') || issuer.includes('commbank')) {
    return {
      gradient: 'from-yellow-950 via-slate-900 to-slate-950',
      accent: 'border-yellow-400/30 shadow-yellow-950/30 text-yellow-200',
      badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
      chipColor: 'from-yellow-100 to-yellow-500',
      tagline: 'COMMBANK AWARDS',
      pattern: 'radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.2) 0%, transparent 50%)',
    };
  }

  if (issuer.includes('anz')) {
    return {
      gradient: 'from-blue-950 via-cyan-950 to-slate-950',
      accent: 'border-blue-400/30 shadow-blue-950/30 text-blue-200',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      chipColor: 'from-amber-100 to-yellow-400',
      tagline: 'ANZ REWARDS & QANTAS',
      pattern: 'radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
    };
  }

  // 10. Default / Fallback by Category
  if (categories.includes('cash-back') || categories.includes('zero-intro-apr')) {
    return {
      gradient: 'from-emerald-950 via-slate-900 to-slate-950',
      accent: 'border-emerald-500/30 shadow-emerald-950/30 text-emerald-200',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      chipColor: 'from-amber-100 to-yellow-500',
      tagline: 'CASH REWARDS & SAVINGS',
      pattern: 'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
    };
  }

  return {
    gradient: 'from-slate-900 via-indigo-950 to-slate-950',
    accent: 'border-slate-600/30 shadow-slate-950/30 text-slate-200',
    badgeBg: 'bg-slate-700/40 text-slate-200 border-slate-600/40',
    chipColor: 'from-amber-100 to-amber-400',
    tagline: 'VERIFIED REVOLVING CREDIT',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
  };
}

export const CardVisual: React.FC<CardVisualProps> = ({ card, className = '', size = 'md' }) => {
  const design = getCardDesign(card);
  const country = COUNTRIES_DATA[card.country] || { flag: '🌐', name: 'Global' };

  const sizeClasses = {
    sm: 'h-36 p-3.5 text-xs',
    md: 'h-44 p-4 text-xs',
    lg: 'h-52 sm:h-56 p-5 sm:p-6 text-sm',
  };

  const simplifiedIssuer = card.issuer
    .replace(/Bank/gi, '')
    .replace(/, N\.A\./gi, '')
    .replace(/\(USA\)/gi, '')
    .replace(/Group/gi, '')
    .trim();

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden text-white shadow-lg border transition-all duration-300 select-none bg-gradient-to-br ${design.gradient} ${design.accent} ${sizeClasses[size]} ${className}`}
      style={{
        backgroundImage: design.pattern,
      }}
    >
      {/* Background Hologram / Wave shimmer lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 180 C 100 80, 250 280, 450 120"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <path
            d="M-50 210 C 120 110, 280 300, 450 150"
            stroke="white"
            strokeWidth="2"
            opacity="0.4"
          />
          <circle cx="340" cy="50" r="80" stroke="white" strokeWidth="1" opacity="0.15" />
          <circle cx="340" cy="50" r="50" stroke="white" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* Top Bar: Bank Issuer Logo + Territory Flag & Contactless Icon */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-md bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold tracking-wider uppercase block text-[11px] leading-tight truncate text-white/95">
              {simplifiedIssuer || card.issuer}
            </span>
            <span className="text-[9px] font-semibold text-white/70 tracking-wider uppercase flex items-center gap-1">
              <span>{country.flag}</span>
              <span className="truncate">{country.name}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Wifi className="w-3.5 h-3.5 text-white/70 rotate-90" />
          <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-white/90">
            {card.network}
          </span>
        </div>
      </div>

      {/* Middle Bar: Gold/Metallic EMV Chip */}
      <div className="relative z-10 my-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5">
          {/* EMV Chip graphic */}
          <div
            className={`w-9 h-6.5 rounded-md bg-gradient-to-tr ${design.chipColor} border border-amber-300/60 shadow-xs relative overflow-hidden flex items-center justify-center`}
          >
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5 p-0.5 opacity-60">
              <div className="border border-black/30 rounded-xs" />
              <div className="border border-black/30 rounded-xs" />
              <div className="border border-black/30 rounded-xs" />
              <div className="border border-black/30 rounded-xs" />
              <div className="border border-black/30 rounded-xs" />
              <div className="border border-black/30 rounded-xs" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600/30 border border-amber-700/40 z-10" />
          </div>

          <span className="text-[9px] font-mono tracking-widest text-white/60 uppercase">
            •••• {card.id.slice(-4).toUpperCase() || '8842'}
          </span>
        </div>

        {/* Tagline / Rewards category pill */}
        <span
          className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border backdrop-blur-md ${design.badgeBg}`}
        >
          {card.rewardsStructure?.type || 'Credit'}
        </span>
      </div>

      {/* Bottom Bar: Card Product Name + Security Hologram */}
      <div className="relative z-10 flex items-end justify-between gap-3 pt-2 mt-auto">
        <div className="min-w-0 flex-1">
          <p className="font-extrabold text-sm tracking-tight text-white line-clamp-1 drop-shadow-xs">
            {card.name}
          </p>
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/65 block mt-0.5 truncate">
            {design.tagline}
          </span>
        </div>

        {/* Network Logo styling */}
        <div className="text-right shrink-0">
          {card.network === 'Visa' && (
            <span className="font-black italic tracking-tighter text-lg text-white font-serif drop-shadow-xs">
              VISA
            </span>
          )}
          {card.network === 'Mastercard' && (
            <div className="flex items-center -space-x-2">
              <div className="w-5 h-5 rounded-full bg-red-500/90 shadow-xs" />
              <div className="w-5 h-5 rounded-full bg-amber-400/90 shadow-xs" />
            </div>
          )}
          {card.network === 'American Express' && (
            <span className="font-black tracking-widest text-[10px] px-1.5 py-0.5 rounded bg-sky-500/80 text-white border border-sky-300 shadow-xs">
              AMEX
            </span>
          )}
          {card.network === 'Discover' && (
            <div className="flex items-center gap-0.5 font-black text-xs text-orange-400 drop-shadow-xs">
              <span>DISC</span>
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span>VER</span>
            </div>
          )}
          {card.network === 'Eftpos' && (
            <span className="font-bold text-[10px] bg-emerald-600 px-1.5 py-0.5 rounded text-white font-mono shadow-xs">
              eftpos
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
