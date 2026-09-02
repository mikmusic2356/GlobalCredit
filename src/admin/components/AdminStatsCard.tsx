import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminStatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  variant?: 'blue' | 'emerald' | 'amber' | 'purple' | 'slate' | 'rose';
  onClick?: () => void;
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'blue',
  onClick,
}) => {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs transition-all ${
        onClick ? 'hover:border-slate-300 hover:shadow-md cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <span className={`p-2.5 rounded-xl border ${variantStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </span>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
