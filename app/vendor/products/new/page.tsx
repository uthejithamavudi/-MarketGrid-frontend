'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Upload, Check, Sparkles } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useApp();

  const [form, setForm] = useState<{
    name: string;
    description: string;
    categoryId: string;
    categoryName: string;
    subcategory: string;
    price: number;
    originalPrice: number;
    sku: string;
    stock: number;
    lowStockThreshold: number;
    variantType: string;
    variantOptions: string;
    weight: string;
    dimensions: string;
    visibility: 'Active' | 'Draft';
    imageUrl: string;
  }>({
    name: '',
    description: '',
    categoryId: 'c1',
    categoryName: 'Electronics & Audio',
    subcategory: 'Keyboards',
    price: 12999,
    originalPrice: 15999,
    sku: `TV-${Math.floor(100 + Math.random() * 900)}`,
    stock: 25,
    lowStockThreshold: 5,
    variantType: 'Color',
    variantOptions: 'Obsidian, Cream, Terracotta',
    weight: '1.2 kg',
    dimensions: '30 x 15 x 4 cm',
    visibility: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&q=80'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: form.name || 'Custom Mechanical Desk Keyboard',
      slug: (form.name || 'custom-keyboard').toLowerCase().replace(/\s+/g, '-'),
      vendorId: 'v1',
      vendorName: 'TechVerse',
      vendorSlug: 'techverse',
      categoryId: form.categoryId,
      categoryName: form.categoryName,
      subcategory: form.subcategory,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      rating: 5.0,
      reviewCount: 1,
      images: [form.imageUrl],
      description: form.description || 'Precision crafted custom keyboard designed for modern creator workspaces.',
      specifications: {
        'Weight': form.weight,
        'Dimensions': form.dimensions,
        'SKU': form.sku,
      },
      stock: Number(form.stock),
      sku: form.sku,
      status: form.visibility as any,
      isNew: true,
      variants: [
        { id: 'v1', name: form.variantType, options: form.variantOptions.split(',').map(s => s.trim()) }
      ]
    });

    router.push('/vendor/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="border-b border-stone-300 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">
          Studio Product Publishing Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
          ADD NEW PRODUCT
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        
        {/* 01 BASIC INFORMATION */}
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-200 pb-2">
            01 BASIC INFORMATION
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Product Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Smart Typewriter Terminal"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Description</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your product's craftsmanship, materials, and features..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value, categoryName: e.target.options[e.target.selectedIndex].text })}
                  className="w-full bg-cream-100/70 p-3 rounded border border-stone-300"
                >
                  <option value="c1">Electronics & Audio</option>
                  <option value="c2">Furniture & Living</option>
                  <option value="c3">Leather Goods & Carry</option>
                  <option value="c4">Apparel & Objects</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Subcategory</label>
                <input
                  type="text"
                  value={form.subcategory}
                  onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                  className="w-full bg-cream-100/70 p-3 rounded border border-stone-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 02 MEDIA */}
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-200 pb-2">
            02 MEDIA & PHOTOGRAPHY
          </h3>
          
          <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center space-y-3 bg-stone-100/50 hover:bg-stone-100 transition-colors">
            <Upload className="w-10 h-10 text-stone-400 mx-auto" />
            <div className="space-y-1">
              <p className="font-semibold text-obsidian-400">Drag & Drop Product Photography</p>
              <p className="text-[11px] text-stone-500 font-light">PNG, JPG, WEBP up to 10MB (High Resolution Studio Shot Recommended)</p>
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Or Direct Image URL</label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full bg-cream-100/70 p-3 rounded border border-stone-300"
            />
          </div>
        </div>

        {/* 03 PRICING */}
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-200 pb-2">
            03 PRICING & DISCOUNTS
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Original Price (₹)</label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300"
              />
            </div>
          </div>
        </div>

        {/* 04 INVENTORY */}
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-200 pb-2">
            04 INVENTORY & SKU
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">SKU Code</label>
              <input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 font-mono" />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Initial Stock Qty</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="w-full bg-cream-100/70 p-3 rounded border border-stone-300" />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Low Stock Warning Threshold</label>
              <input type="number" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })} className="w-full bg-cream-100/70 p-3 rounded border border-stone-300" />
            </div>
          </div>
        </div>

        {/* 05 VARIANTS */}
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-200 pb-2">
            05 VARIANTS
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Variant Name (e.g. Color, Finish, Size)</label>
              <input type="text" value={form.variantType} onChange={(e) => setForm({ ...form, variantType: e.target.value })} className="w-full bg-cream-100/70 p-3 rounded border border-stone-300" />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Options (Comma Separated)</label>
              <input type="text" value={form.variantOptions} onChange={(e) => setForm({ ...form, variantOptions: e.target.value })} className="w-full bg-cream-100/70 p-3 rounded border border-stone-300" />
            </div>
          </div>
        </div>

        {/* 06 SHIPPING */}
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-200 pb-2">
            06 SHIPPING SPECIFICATIONS
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Package Weight</label>
              <input type="text" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="w-full bg-cream-100/70 p-3 rounded border border-stone-300" />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Package Dimensions</label>
              <input type="text" value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} className="w-full bg-cream-100/70 p-3 rounded border border-stone-300" />
            </div>
          </div>
        </div>

        {/* 07 VISIBILITY & PUBLISH */}
        <div className="bg-stone-900 text-cream-50 p-6 rounded-xl space-y-4">
          <h3 className="font-serif text-xl font-bold tracking-editorial border-b border-stone-800 pb-2">
            07 VISIBILITY & PUBLISH CONTROL
          </h3>

          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                checked={form.visibility === 'Active'}
                onChange={() => setForm({ ...form, visibility: 'Active' })}
              />
              <span>Publish Active</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                checked={form.visibility === 'Draft'}
                onChange={() => setForm({ ...form, visibility: 'Draft' })}
              />
              <span>Save as Draft</span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/vendor/products')}
              className="px-6 py-3 rounded border border-stone-700 text-stone-300 hover:text-cream-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-accent-emerald hover:bg-emerald-600 text-white px-8 py-3 rounded uppercase tracking-editorial font-bold shadow transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Publish Product Now</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
