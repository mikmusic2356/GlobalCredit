import React, { useState } from 'react';
import { ArticleCategory } from '../../types/cms';
import { DEFAULT_CMS_CATEGORIES } from '../../data/categories/cmsCategories';
import { FolderTree, Plus, Trash2, Edit2, Check, BookOpen, Layers } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<ArticleCategory[]>(() => {
    const saved = localStorage.getItem('gc_cms_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_CMS_CATEGORIES;
  });

  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [selectedCatId, setSelectedCatId] = useState<string>(categories[0]?.id || '');
  const [newSubName, setNewSubName] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');

  const saveCategories = (cats: ArticleCategory[]) => {
    setCategories(cats);
    localStorage.setItem('gc_cms_categories', JSON.stringify(cats));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: ArticleCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug,
      description: newCatDesc.trim() || 'Credit card editorial taxonomy classification.',
      subcategories: [],
    };

    const updated = [...categories, newCat];
    saveCategories(updated);
    setSelectedCatId(newCat.id);
    setNewCatName('');
    setNewCatDesc('');
    setIsAddingCategory(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Delete category and all nested subcategories?')) {
      const updated = categories.filter((c) => c.id !== id);
      saveCategories(updated);
      if (selectedCatId === id && updated.length > 0) {
        setSelectedCatId(updated[0].id);
      }
    }
  };

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim() || !selectedCatId) return;

    const slug = newSubName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updated = categories.map((cat) => {
      if (cat.id === selectedCatId) {
        return {
          ...cat,
          subcategories: [
            ...cat.subcategories,
            {
              id: `sub-${Date.now()}`,
              name: newSubName.trim(),
              slug,
              description: newSubDesc.trim(),
            },
          ],
        };
      }
      return cat;
    });

    saveCategories(updated);
    setNewSubName('');
    setNewSubDesc('');
  };

  const handleDeleteSubcategory = (catId: string, subId: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter((s) => s.id !== subId),
        };
      }
      return cat;
    });
    saveCategories(updated);
  };

  const selectedCategory = categories.find((c) => c.id === selectedCatId);

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-blue-600" />
            <span>Editorial Categories & Taxonomy</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize articles into structured financial topics and hierarchical subcategories.
          </p>
        </div>

        <button
          onClick={() => setIsAddingCategory(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Primary Category</span>
        </button>
      </div>

      {/* Add New Category Form */}
      {isAddingCategory && (
        <form
          onSubmit={handleAddCategory}
          className="p-5 bg-white border border-blue-200 rounded-2xl space-y-4 shadow-sm animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Create Primary Editorial Category
            </span>
            <button
              type="button"
              onClick={() => setIsAddingCategory(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Category Name *</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Credit Score Optimization"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Description</label>
              <input
                type="text"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Explanatory scope for this category..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 text-xs">
            <button
              type="button"
              onClick={() => setIsAddingCategory(false)}
              className="px-4 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-xs"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* 2-Column Taxonomy Explorer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Primary Categories */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-2 border-b border-slate-100">
            Primary Categories ({categories.length})
          </span>

          <div className="space-y-1.5">
            {categories.map((cat) => {
              const isSelected = cat.id === selectedCatId;

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`p-3 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-bold text-xs block truncate">{cat.name}</span>
                    <span
                      className={`text-[11px] block truncate ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {cat.subcategories.length} Subcategories &bull; /{cat.slug}/
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(cat.id);
                    }}
                    className={`p-1 rounded hover:bg-black/10 transition-colors ${
                      isSelected ? 'text-white' : 'text-slate-400 hover:text-rose-600'
                    }`}
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Subcategories for Selected Category */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          {selectedCategory ? (
            <>
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Subcategories for: <span className="text-blue-600">{selectedCategory.name}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedCategory.description}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  /{selectedCategory.slug}/
                </span>
              </div>

              {/* Subcategories list */}
              <div className="space-y-2">
                {selectedCategory.subcategories.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                    No subcategories yet. Add one below.
                  </div>
                ) : (
                  selectedCategory.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{sub.name}</span>
                        {sub.description && (
                          <span className="text-slate-500 text-[11px] block">{sub.description}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteSubcategory(selectedCategory.id, sub.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Remove subcategory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Subcategory Form */}
              <form
                onSubmit={handleAddSubcategory}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 pt-3"
              >
                <span className="text-xs font-bold text-slate-800 block">
                  + Add Subcategory to {selectedCategory.name}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    required
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    placeholder="Subcategory Name..."
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                  />
                  <input
                    type="text"
                    value={newSubDesc}
                    onChange={(e) => setNewSubDesc(e.target.value)}
                    placeholder="Description (optional)..."
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                  >
                    Add Subcategory
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              Select a primary category on the left to view subcategories.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
