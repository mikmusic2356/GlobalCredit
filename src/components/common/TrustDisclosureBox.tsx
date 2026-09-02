import React from 'react';
import { DataVerificationStatus } from '../../types';
import { DataVerificationBadge } from './DataVerificationBadge';
import { ShieldAlert, ExternalLink, Calendar, CheckCircle2, FileText, Info } from 'lucide-react';

export interface SourceLink {
  title: string;
  url?: string;
  isOfficial?: boolean;
}

interface TrustDisclosureBoxProps {
  publishedDate?: string;
  lastUpdatedDate?: string;
  lastVerifiedDate?: string;
  verificationStatus?: DataVerificationStatus;
  sources?: SourceLink[];
  issuerOfficialUrl?: string;
  issuerName?: string;
  regulatoryBody?: string;
  showFullDisclaimer?: boolean;
  className?: string;
  compact?: boolean;
}

export const TrustDisclosureBox: React.FC<TrustDisclosureBoxProps> = ({
  publishedDate = '2026-08-15',
  lastUpdatedDate = '2026-09-01',
  lastVerifiedDate = '2026-09-01',
  verificationStatus = 'VERIFIED',
  sources = [],
  issuerOfficialUrl,
  issuerName,
  regulatoryBody,
  showFullDisclaimer = true,
  className = '',
  compact = false,
}) => {
  return (
    <section
      className={`rounded-xl border border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-slate-50 to-amber-50/30 p-5 md:p-6 text-slate-800 shadow-xs ${className}`}
      id="financial-trust-transparency-disclosure"
      aria-label="Trust, Verification & Disclosure Metadata"
    >
      {/* Top Banner: Verification and Timestamp Matrix */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <DataVerificationBadge status={verificationStatus} lastVerifiedDate={lastVerifiedDate} size="md" />
          {regulatoryBody && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
              <FileText className="w-3 h-3 text-slate-500" />
              Regulated: {regulatoryBody}
            </span>
          )}
        </div>

        {/* Audit Dates */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
          {publishedDate && (
            <span className="flex items-center gap-1" title="Initial Publication Date">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Published: <strong className="text-slate-700">{publishedDate}</strong>
            </span>
          )}
          {lastUpdatedDate && (
            <span className="flex items-center gap-1" title="Last Editorial Revision">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              Updated: <strong className="text-slate-700">{lastUpdatedDate}</strong>
            </span>
          )}
          {lastVerifiedDate && (
            <span className="flex items-center gap-1" title="Last Verified against Issuer Schedule">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Verified: <strong className="text-emerald-800">{lastVerifiedDate}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Mandatory Regulatory Warning Box */}
      <div className="my-4 p-4 rounded-lg bg-amber-500/10 border border-amber-300 text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Important Consumer Transparency Disclaimer
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
            Financial information can change. Always verify current terms with the card issuer or official source before applying.
          </p>
        </div>
      </div>

      {/* Sources & Official Citations */}
      {(sources.length > 0 || issuerOfficialUrl) && (
        <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-2">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            Official Sources & Regulatory Reference Documents:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {issuerOfficialUrl && (
              <a
                href={issuerOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-blue-700 font-semibold text-xs shadow-2xs transition-colors"
                id="issuer-direct-terms-link"
              >
                <span>Direct {issuerName || 'Issuer'} Rates & Fee Disclosure</span>
                <ExternalLink className="w-3 h-3 text-blue-500" />
              </a>
            )}

            {sources.map((src, index) => (
              <span key={index} className="inline-flex items-center">
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs transition-colors"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ) : (
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs border border-slate-200">
                    {src.title}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Extended Editorial Statement */}
      {showFullDisclaimer && !compact && (
        <p className="mt-3 text-[11px] text-slate-500 leading-normal">
          GlobalCredit editorial reviews are independent. We do not fabricate, simulate, or alter APR tables, intro durations, or annual fees. Credit approval and final representative APR are determined exclusively by the respective issuing bank according to statutory affordability criteria.
        </p>
      )}
    </section>
  );
};
