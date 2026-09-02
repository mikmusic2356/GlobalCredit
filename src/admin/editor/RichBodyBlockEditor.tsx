import React from 'react';
import {
  ArticleContentBlock,
  ParagraphBlock,
  HeadingBlock,
  ImageBlock,
  QuoteBlock,
  CalloutBlock,
  ListBlock,
  TableBlock
} from '../../types/cms';
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Quote,
  AlertTriangle,
  List,
  Table as TableIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Info,
  CheckCircle2,
  Scale
} from 'lucide-react';
import { ImagePlacementEditor } from './ImagePlacementEditor';

interface RichBodyBlockEditorProps {
  blocks: ArticleContentBlock[];
  onChange: (updated: ArticleContentBlock[]) => void;
}

export const RichBodyBlockEditor: React.FC<RichBodyBlockEditorProps> = ({
  blocks,
  onChange,
}) => {
  const addBlock = (type: ArticleContentBlock['type'], extra?: any) => {
    const id = `b-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    let newBlock: ArticleContentBlock;

    switch (type) {
      case 'heading':
        newBlock = {
          id,
          type: 'heading',
          level: extra?.level || 2,
          content: '',
        };
        break;
      case 'image':
        newBlock = {
          id,
          type: 'image',
          url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
          alt: '',
          caption: '',
          source: 'Editorial Archive',
        };
        break;
      case 'quote':
        newBlock = {
          id,
          type: 'quote',
          quote: '',
          author: '',
        };
        break;
      case 'callout':
        newBlock = {
          id,
          type: 'callout',
          variant: extra?.variant || 'info',
          title: 'Financial Note',
          content: '',
        };
        break;
      case 'list':
        newBlock = {
          id,
          type: 'list',
          ordered: extra?.ordered || false,
          items: ['First key point', 'Second key point'],
        };
        break;
      case 'table':
        newBlock = {
          id,
          type: 'table',
          headers: ['Category / Tier', 'Value', 'Details'],
          rows: [
            ['Standard Tier', '0.00%', 'No annual charge'],
            ['Premium Tier', '19.99%', 'Applies to revolving balances'],
          ],
          caption: 'Representative breakdown table.',
        };
        break;
      case 'paragraph':
      default:
        newBlock = {
          id,
          type: 'paragraph',
          content: '',
        };
        break;
    }

    onChange([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updated: ArticleContentBlock) => {
    const next = [...blocks];
    next[index] = updated;
    onChange(next);
  };

  const deleteBlock = (index: number) => {
    const next = blocks.filter((_, i) => i !== index);
    onChange(next);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const next = [...blocks];
      const temp = next[index];
      next[index] = next[index - 1];
      next[index - 1] = temp;
      onChange(next);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const next = [...blocks];
      const temp = next[index];
      next[index] = next[index + 1];
      next[index + 1] = temp;
      onChange(next);
    }
  };

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Block List */}
      <div className="space-y-4">
        {blocks.map((block, index) => {
          const isFirst = index === 0;
          const isLast = index === blocks.length - 1;

          if (block.type === 'image') {
            return (
              <ImagePlacementEditor
                key={block.id}
                imageBlock={block}
                onUpdate={(upd) => updateBlock(index, upd)}
                onDelete={() => deleteBlock(index)}
                onMoveUp={() => moveBlock(index, 'up')}
                onMoveDown={() => moveBlock(index, 'down')}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          }

          return (
            <div
              key={block.id}
              className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs hover:border-slate-300 transition-colors"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {block.type === 'heading' ? `Heading (H${block.level})` : block.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Block #{index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => moveBlock(index, 'up')}
                    className={`p-1 rounded text-slate-500 hover:bg-slate-100 ${
                      isFirst ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => moveBlock(index, 'down')}
                    className={`p-1 rounded text-slate-500 hover:bg-slate-100 ${
                      isLast ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteBlock(index)}
                    className="p-1 rounded text-rose-500 hover:bg-rose-50 cursor-pointer"
                    title="Delete block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Block Content Inputs */}
              {block.type === 'paragraph' && (
                <textarea
                  rows={3}
                  value={block.content}
                  onChange={(e) =>
                    updateBlock(index, { ...block, content: e.target.value })
                  }
                  placeholder="Write clear, objective educational paragraph text..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg text-slate-800 text-xs sm:text-sm focus:outline-hidden focus:bg-white transition-all leading-relaxed"
                />
              )}

              {block.type === 'heading' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Level:</span>
                    {[1, 2, 3].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() =>
                          updateBlock(index, { ...block, level: lvl as 1 | 2 | 3 })
                        }
                        className={`px-2 py-0.5 text-xs font-bold rounded cursor-pointer ${
                          block.level === lvl
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        H{lvl}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) =>
                      updateBlock(index, { ...block, content: e.target.value })
                    }
                    placeholder="Enter section heading..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg text-slate-900 font-bold text-sm sm:text-base focus:outline-hidden focus:bg-white"
                  />
                </div>
              )}

              {block.type === 'quote' && (
                <div className="space-y-2 text-xs">
                  <textarea
                    rows={2}
                    value={block.quote}
                    onChange={(e) =>
                      updateBlock(index, { ...block, quote: e.target.value })
                    }
                    placeholder="Quotation text..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg italic text-slate-800"
                  />
                  <input
                    type="text"
                    value={block.author || ''}
                    onChange={(e) =>
                      updateBlock(index, { ...block, author: e.target.value })
                    }
                    placeholder="Attribution / Author / Regulatory Report..."
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold"
                  />
                </div>
              )}

              {block.type === 'callout' && (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500">Callout Variant:</span>
                    {(['info', 'warning', 'legal', 'tip'] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => updateBlock(index, { ...block, variant: v })}
                        className={`px-2 py-0.5 capitalize rounded font-bold cursor-pointer ${
                          block.variant === v
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) =>
                      updateBlock(index, { ...block, title: e.target.value })
                    }
                    placeholder="Callout Box Title..."
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                  <textarea
                    rows={2}
                    value={block.content}
                    onChange={(e) =>
                      updateBlock(index, { ...block, content: e.target.value })
                    }
                    placeholder="Key takeaway, legal warning or calculation advice..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                  />
                </div>
              )}

              {block.type === 'list' && (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-600">List Items (one per line):</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateBlock(index, { ...block, ordered: !block.ordered })
                      }
                      className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      {block.ordered ? 'Format: Numbered List' : 'Format: Bulleted List'}
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={block.items.join('\n')}
                    onChange={(e) =>
                      updateBlock(index, {
                        ...block,
                        items: e.target.value.split('\n'),
                      })
                    }
                    placeholder="Enter each list point on a new line..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-mono"
                  />
                </div>
              )}

              {block.type === 'table' && (
                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-slate-600 block">
                    Table Headers (comma separated):
                  </span>
                  <input
                    type="text"
                    value={block.headers.join(', ')}
                    onChange={(e) =>
                      updateBlock(index, {
                        ...block,
                        headers: e.target.value.split(',').map((h) => h.trim()),
                      })
                    }
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                  <span className="font-semibold text-slate-600 block pt-1">
                    Table Rows (comma-separated columns, new line per row):
                  </span>
                  <textarea
                    rows={3}
                    value={block.rows.map((r) => r.join(', ')).join('\n')}
                    onChange={(e) =>
                      updateBlock(index, {
                        ...block,
                        rows: e.target.value
                          .split('\n')
                          .map((line) => line.split(',').map((cell) => cell.trim())),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Block Toolbar */}
      <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-2">
        <span className="text-xs font-bold text-slate-700 block text-center">
          + Add Semantic Content Block to Article Body
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => addBlock('paragraph')}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Type className="w-3.5 h-3.5 text-blue-600" />
            <span>Paragraph</span>
          </button>

          <button
            type="button"
            onClick={() => addBlock('heading', { level: 2 })}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Heading2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Heading 2</span>
          </button>

          <button
            type="button"
            onClick={() => addBlock('heading', { level: 3 })}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Heading3 className="w-3.5 h-3.5 text-purple-600" />
            <span>Heading 3</span>
          </button>

          <button
            type="button"
            onClick={() => addBlock('image')}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>+ Add Image Block</span>
          </button>

          <button
            type="button"
            onClick={() => addBlock('callout', { variant: 'tip' })}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tip / Callout</span>
          </button>

          <button
            type="button"
            onClick={() => addBlock('quote')}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Quote className="w-3.5 h-3.5 text-amber-600" />
            <span>Quote</span>
          </button>

          <button
            type="button"
            onClick={() => addBlock('list')}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <List className="w-3.5 h-3.5 text-slate-600" />
            <span>List</span>
          </button>

          <button
            type="button"
            onClick={() => addBlock('table')}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <TableIcon className="w-3.5 h-3.5 text-slate-600" />
            <span>Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};
