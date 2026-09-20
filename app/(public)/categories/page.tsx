'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CategoryCard } from '@/components/CategoryCard';

export default function CategoriesPage() {
  const { categoriesList, isLoadingData } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Taxonomy & Collections
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-editorial text-obsidian-400">
          FEATURED CATEGORIES
        </h1>
        <p className="text-stone-600 text-sm font-light max-w-xl">
          Explore MarketGrid collections curated by category, function, and aesthetic design language.
        </p>
      </div>

      {isLoadingData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-stone-100 rounded-xl animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoriesList.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
