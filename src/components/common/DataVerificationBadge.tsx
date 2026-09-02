import React from 'react';
import { DataVerificationStatus } from '../../types';
import { ShieldCheck, AlertTriangle, HelpCircle, Clock } from 'lucide-react';

interface DataVerificationBadgeProps {
  status?: DataVerificationStatus;
  lastVerifiedDate?: string;
  size?: 'sm' | 'md' | 'lg';
  showDate?: boolean;
  className?: string;
}

export const DataVerificationBadge: React.FC<DataVerificationBadgeProps> = ({
  status = 'VERIFIED',
  lastVerifiedDate,
  size = 'md',
  showDate = true,
  className = '',
}) => {
  const getBadgeDetails = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          label: 'VERIFIED DATA',
          subLabel: 'Issuer terms cross-checked',
          icon: ShieldCheck,
          bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dotClass: 'bg-emerald-500',
          iconClass: 'text-emerald-600',
        };
      case 'UNVERIFIED':
        return {
          label: 'UNVERIFIED DATA',
          subLabel: 'Preliminary submission under review',
          icon: HelpCircle,
          bgClass: 'bg-amber-50 text-amber-800 border-amber-300',
          dotClass: 'bg-amber-500',
          iconClass: 'text-amber-600',
        };
      case 'OUTDATED':
        return {
          label: 'OUTDATED DATA',
          subLabel: 'Historical rates, update pending',
          icon: Clock,
          bgClass: 'bg-rose-50 text-rose-800 border-rose-300',
          dotClass: 'bg-rose-500',
          iconClass: 'text-rose-600',
        };
      case 'MISSING':
      default:
        return {
          label: 'MISSING DATA',
          subLabel: 'Field not disclosed by issuer',
          icon: AlertTriangle,
          bgClass: 'bg-slate-100 text-slate-700 border-slate-300',
          dotClass: 'bg-slate-400',
          iconClass: 'text-slate-500',
        };
    }
  };

  const details = getBadgeDetails();
  const IconComponent = details.icon;

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${details.bgClass} ${className}`}
        title={`Verification Status: ${details.label}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${details.dotClass} animate-pulse`} />
        {details.label}
        {showDate && lastVerifiedDate && (
          <span className="font-normal text-[9px] opacity-80 pl-1 border-l border-current">
            {lastVerifiedDate}
          </span>
        )}
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${details.bgClass} text-xs font-semibold ${className}`}
      id={`data-verification-badge-${status.toLowerCase()}`}
    >
      <IconComponent className={`w-4 h-4 shrink-0 ${details.iconClass}`} />
      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="tracking-wide uppercase text-[11px] font-bold">{details.label}</span>
          {showDate && lastVerifiedDate && (
            <span className="text-[10px] font-normal opacity-80">
              • Verified {lastVerifiedDate}
            </span>
          )}
        </div>
        <span className="text-[10px] font-normal opacity-90">{details.subLabel}</span>
      </div>
    </div>
  );
};
