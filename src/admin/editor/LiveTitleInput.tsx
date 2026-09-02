import React from 'react';
import { Smile, Sparkles, Type } from 'lucide-react';

interface LiveTitleInputProps {
  title: string;
  onChange: (val: string) => void;
  subtitle: string;
  onSubtitleChange: (val: string) => void;
}

const POPULAR_FINANCIAL_EMOJIS = ['💳', '📊', '📈', '📉', '🏦', '🔄', '🛍️', '🌱', '⚖️', '✈️', '💰', '🛡️', '⚡', '💡', '🔍', '📋'];

export const LiveTitleInput: React.FC<LiveTitleInputProps> = ({
  title,
  onChange,
  subtitle,
  onSubtitleChange,
}) => {
  const insertEmoji = (emoji: string) => {
    onChange(`${emoji} ${title}`.trim());
  };

  return (
    <div className="space-y-4">
      {/* Title Field with Quick Emoji Inserter */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-blue-600" />
            <span>Article Title (Full Unicode, Symbols & Emoji Supported)</span>
            <span className="text-rose-500">*</span>
          </label>
          <span className="text-[11px] text-slate-400">
            {title.length} characters
          </span>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 💳 How Does Credit Card APR Work? Complete Calculation Guide"
          className="w-full px-4 py-2.5 bg-white border border-slate-300 focus:border-blue-500 rounded-xl text-slate-900 font-bold text-base focus:outline-hidden shadow-2xs transition-all"
        />

        {/* Quick Emoji Bar */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mr-1">
            <Smile className="w-3.5 h-3.5 text-slate-400" /> Quick Emojis:
          </span>
          {POPULAR_FINANCIAL_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => insertEmoji(emoji)}
              className="p-1 px-1.5 text-sm hover:bg-slate-100 rounded-md border border-slate-200/70 transition-colors cursor-pointer"
              title={`Prepend ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Subtitle / Intro Summary */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900">
            Subtitle / Introductory Summary
            <span className="text-rose-500">*</span>
          </label>
          <span className="text-[11px] text-slate-400">
            {subtitle.length} characters
          </span>
        </div>
        <textarea
          rows={3}
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          placeholder="Concise educational summary placed beneath the headline before the body content..."
          className="w-full px-4 py-2 bg-white border border-slate-300 focus:border-blue-500 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-hidden shadow-2xs transition-all leading-relaxed"
        />
      </div>

      {/* Live Preview of Headline */}
      <div className="p-4 rounded-xl border border-dashed border-blue-200 bg-blue-50/40 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
          Live Public Title Preview:
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {title || <span className="text-slate-400 italic">Enter headline above...</span>}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-600 border-l-2 border-blue-500 pl-2.5 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
