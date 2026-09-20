'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Search, Plus, Edit3, Eye, Trash2 } from 'lucide-react';

export default function VendorProductsPage() {
  const { productsList, toggleProductStatus } = useApp();
  const [search, setSearch] = useState('');

  const filtered = productsList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-300 pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">
            TechVerse Store Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
            PRODUCT MANAGEMENT
          </h1>
        </div>

        <Link
          href="/vendor/products/new"
          className="bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-5 py-2.5 rounded text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center gap-2 shadow-soft"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-cream-50 p-4 rounded-xl border border-stone-200 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream-100/70 text-xs pl-9 pr-4 py-2.5 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
          />
        </div>
        <span className="text-xs text-stone-500 font-medium">{filtered.length} Items</span>
      </div>

      {/* Data Table (Section 14 in prompt) */}
      <div className="bg-cream-50 rounded-xl border border-stone-200 overflow-hidden shadow-card">
        <table className="w-full text-xs text-left">
          <thead className="bg-stone-100 text-stone-600 uppercase tracking-editorial font-semibold border-b border-stone-200">
            <tr>
              <th className="p-4">Product Details</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-cream-100/60 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={prod.images[0]} alt="" className="w-12 h-12 object-cover rounded bg-stone-200" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-obsidian-400">{prod.name}</h4>
                      <span className="text-[11px] text-stone-400 font-mono">SKU: {prod.sku}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-stone-600 font-medium">{prod.categoryName}</td>
                <td className="p-4 font-bold text-obsidian-400">₹{prod.price.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${prod.stock <= 5 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {prod.stock} units
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleProductStatus(prod.id)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      prod.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {prod.status} (Toggle)
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/products/${prod.slug}`} className="p-1.5 text-stone-500 hover:text-obsidian-400">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => toggleProductStatus(prod.id)} className="p-1.5 text-stone-500 hover:text-accent-amber">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
