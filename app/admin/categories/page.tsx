'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { categoriesList } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-stone-800 pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">Taxonomy Control</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">PLATFORM CATEGORIES</h1>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-4 py-2 rounded text-xs uppercase font-mono flex items-center gap-1">
          <Plus className="w-4 h-4" />
          <span>+ Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoriesList.map((cat) => (
          <div key={cat.id} className="bg-stone-900 p-6 rounded-xl border border-stone-800 text-stone-300 space-y-2">
            <h3 className="font-serif text-xl font-bold text-cream-50">{cat.name}</h3>
            <p className="text-xs text-stone-400">{cat.description}</p>
            <p className="text-xs font-mono text-emerald-400">{cat.productCount} Active Items</p>
          </div>
        ))}
      </div>
    </div>
  );
}
