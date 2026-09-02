import React, { useState } from 'react';
import { MediaItem } from '../../types/cms';
import { INITIAL_MEDIA_LIBRARY } from '../../data/media/mediaStore';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Edit2,
  AlertCircle,
  FileText
} from 'lucide-react';

interface MediaLibraryPageProps {
  onSelectForArticle?: (media: MediaItem) => void;
}

export const MediaLibraryPage: React.FC<MediaLibraryPageProps> = ({ onSelectForArticle }) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('gc_media_library');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MEDIA_LIBRARY;
  });

  // Sync with Turso Database API on mount
  React.useEffect(() => {
    fetch('/api/media')
      .then((res) => (res.ok ? res.json() : null))
      .then((dbMedia) => {
        if (dbMedia && Array.isArray(dbMedia) && dbMedia.length > 0) {
          setMediaList(dbMedia);
          localStorage.setItem('gc_media_library', JSON.stringify(dbMedia));
        }
      })
      .catch(() => {});
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState(false);

  // New asset state
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newSource, setNewSource] = useState('Staff Archive');

  const saveToStorage = (items: MediaItem[], updatedOrCreatedItem?: MediaItem) => {
    setMediaList(items);
    localStorage.setItem('gc_media_library', JSON.stringify(items));

    if (updatedOrCreatedItem) {
      fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrCreatedItem),
      }).catch((e) => console.error('[Turso Media Sync Error]', e));
    }
  };

  const handleCopy = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this media asset from the CMS library?')) {
      const updated = mediaList.filter((m) => m.id !== id);
      saveToStorage(updated);
      fetch(`/api/media/${id}`, { method: 'DELETE' }).catch((e) => console.error(e));
    }
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newAlt) return;

    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      title: newTitle || 'Editorial Asset',
      filename: (newTitle || 'editorial-asset').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg',
      url: newUrl,
      alt: newAlt,
      caption: newCaption,
      source: newSource,
      dimensions: {
        width: 1200,
        height: 800,
      },
      fileSize: '142 KB',
      usageCount: 0,
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    saveToStorage([newItem, ...mediaList], newItem);
    setNewUrl('');
    setNewTitle('');
    setNewAlt('');
    setNewCaption('');
    setIsNewAssetModalOpen(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = mediaList.map((m) => (m.id === editingItem.id ? editingItem : m));
    saveToStorage(updated, editingItem);
    setEditingItem(null);
  };

  const filteredMedia = (mediaList || []).filter(
    (m) =>
      (m?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m?.alt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m?.caption && m.caption.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <span>Editorial Media & Image Library</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage high-resolution explanatory diagrams, regulatory infographics, and card photography with compliant alt tags.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewAssetModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Media Asset</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 shadow-2xs">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search media by title, alt text, caption, or regulatory source..."
          className="w-full text-xs text-slate-800 bg-transparent focus:outline-hidden"
        />
        <span className="text-xs font-mono text-slate-400 shrink-0">
          {filteredMedia.length} Assets
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item) => {
          const width = item.dimensions?.width || 1200;
          const height = item.dimensions?.height || 800;

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image Preview Container */}
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.alt || 'Editorial Media Asset'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold bg-slate-950/70 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                  {width}x{height}
                </span>
              </div>

              {/* Metadata Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.title || item.filename || 'Editorial Asset'}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    Alt: &ldquo;{item.alt || 'No alt tag'}&rdquo;
                  </p>
                  {item.caption && (
                    <p className="text-[10px] text-slate-400 line-clamp-1 italic">
                      Caption: {item.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1 cursor-pointer"
                  title="Copy image link"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy URL</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                    title="Edit metadata"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Asset Modal */}
      {isNewAssetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddNew}
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Media Asset</h3>
              <button
                type="button"
                onClick={() => setIsNewAssetModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">
                  Image URL / Asset Location <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">
                  Asset Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Credit Card Chip Payment POS Terminal"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">
                  Mandatory Alt Text <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  placeholder="Accessible description for screen readers and SEO..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Editorial Caption</label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Shown beneath image in public template..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Source / Attribution</label>
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="e.g. Unsplash Verified Financial Archive"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsNewAssetModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
              >
                Save to Library
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Existing Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleUpdate}
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Asset Metadata</h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Asset Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={editingItem.alt}
                  onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Caption</label>
                <input
                  type="text"
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Source / Attribution</label>
                <input
                  type="text"
                  value={editingItem.source || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, source: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
