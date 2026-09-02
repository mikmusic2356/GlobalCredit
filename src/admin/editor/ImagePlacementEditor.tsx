import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  ExternalLink,
  UploadCloud,
  Check
} from 'lucide-react';
import { ImageBlock } from '../../types/cms';
import { INITIAL_MEDIA_LIBRARY } from '../../data/media/mediaStore';

interface ImagePlacementEditorProps {
  imageBlock: ImageBlock;
  onUpdate: (updated: ImageBlock) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const ImagePlacementEditor: React.FC<ImagePlacementEditorProps> = ({
  imageBlock,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const [showPresets, setShowPresets] = useState(false);

  const hasAlt = !!imageBlock.alt && imageBlock.alt.trim().length > 0;

  return (
    <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header & Controls */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
            <ImageIcon className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            In-Article Image Block
          </span>
          {!hasAlt && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Alt Text Required
            </span>
          )}
        </div>

        {/* Reordering and Delete */}
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <button
              type="button"
              disabled={isFirst}
              onClick={onMoveUp}
              className={`p-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer ${
                isFirst ? 'text-slate-300 bg-slate-100 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
              title="Move image up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              disabled={isLast}
              onClick={onMoveDown}
              className={`p-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer ${
                isLast ? 'text-slate-300 bg-slate-100 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
              title="Move image down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
            title="Remove image block"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Preview on Left, Fields on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Image Preview */}
        <div className="md:col-span-4 space-y-2">
          <div className="aspect-video rounded-xl bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center relative">
            {imageBlock.url ? (
              <img
                src={imageBlock.url}
                alt={imageBlock.alt || 'Preview'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-4 text-slate-400 text-xs">
                <UploadCloud className="w-8 h-8 mx-auto mb-1 text-slate-400" />
                <span>No image URL specified</span>
              </div>
            )}
          </div>

          {/* Quick Select Preset */}
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="w-full py-1 px-2 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer text-center"
          >
            {showPresets ? 'Hide Media Library Presets' : 'Choose from Media Library...'}
          </button>

          {showPresets && (
            <div className="p-2 bg-white rounded-xl border border-slate-200 space-y-2 max-h-48 overflow-y-auto shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Select Library Asset:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {INITIAL_MEDIA_LIBRARY.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onUpdate({
                        ...imageBlock,
                        url: item.url,
                        alt: item.alt,
                        caption: item.caption,
                        source: item.source,
                      });
                      setShowPresets(false);
                    }}
                    className="group relative rounded-lg overflow-hidden border border-slate-200 hover:border-blue-500 aspect-video text-left cursor-pointer"
                  >
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
                      Select
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Fields */}
        <div className="md:col-span-8 space-y-3 text-xs">
          {/* URL */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span>Image URL / Asset Path:</span>
            </label>
            <input
              type="text"
              value={imageBlock.url}
              onChange={(e) => onUpdate({ ...imageBlock, url: e.target.value })}
              placeholder="https://images.unsplash.com/... or /assets/..."
              className="w-full px-3 py-1.5 bg-white border border-slate-300 focus:border-blue-500 rounded-lg text-slate-800 font-mono text-xs focus:outline-hidden"
            />
          </div>

          {/* Alt Text (Mandatory for SEO & Accessibility) */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span>Accessibility Alt Text (Mandatory):</span>
                <span className="text-rose-500">*</span>
              </span>
              <span className={`text-[10px] ${hasAlt ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-bold'}`}>
                {hasAlt ? '✓ Complete' : '⚠️ Required for SEO'}
              </span>
            </label>
            <input
              type="text"
              value={imageBlock.alt}
              onChange={(e) => onUpdate({ ...imageBlock, alt: e.target.value })}
              placeholder="Descriptive explanation of the visual for screen readers & SEO..."
              className={`w-full px-3 py-1.5 bg-white border rounded-lg text-slate-800 text-xs focus:outline-hidden ${
                hasAlt ? 'border-slate-300 focus:border-blue-500' : 'border-rose-300 focus:border-rose-500 bg-rose-50/30'
              }`}
            />
          </div>

          {/* Caption & Source in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Public Caption:</label>
              <input
                type="text"
                value={imageBlock.caption || ''}
                onChange={(e) => onUpdate({ ...imageBlock, caption: e.target.value })}
                placeholder="Explanatory caption shown below photo..."
                className="w-full px-3 py-1.5 bg-white border border-slate-300 focus:border-blue-500 rounded-lg text-slate-800 text-xs focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Source Organization / Credit:</label>
              <input
                type="text"
                value={imageBlock.source || ''}
                onChange={(e) => onUpdate({ ...imageBlock, source: e.target.value })}
                placeholder="e.g. Federal Reserve Archives, Staff Photo..."
                className="w-full px-3 py-1.5 bg-white border border-slate-300 focus:border-blue-500 rounded-lg text-slate-800 text-xs focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
