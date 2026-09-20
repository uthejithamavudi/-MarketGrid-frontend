'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { BackButton } from '@/components/BackButton';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { categoriesList, productsList } = useApp();

  const category = categoriesList.find((c) => c.slug === slug) || categoriesList[0];
  const categoryProducts = category
    ? productsList.filter((p) => p.categoryId === category.id)
    : [];

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <BackButton label="← All Categories" href="/categories" />
        <p className="text-stone-500 text-sm">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      {/* Back Navigation */}
      <div>
        <BackButton label="← All Categories" href="/categories" />
      </div>

      {/* Category Hero Header */}
      <div className="relative h-64 rounded-xl overflow-hidden p-8 flex flex-col justify-end text-cream-50 border border-stone-300">
        <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover img-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-500 via-obsidian-400/50 to-transparent" />
        
        <div className="relative z-10 space-y-2">
          <span className="text-[11px] uppercase tracking-superwide font-medium text-cream-300">
            Category Collection • {categoryProducts.length} Items
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-editorial">
            {category.name}
          </h1>
          <p className="text-stone-300 text-sm font-light max-w-lg">
            {category.description}
          </p>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="flex flex-wrap gap-2 pt-2 border-b border-stone-200 pb-4">
        <span className="text-xs font-bold text-obsidian-400 uppercase tracking-editorial self-center mr-2">
          Subcategories:
        </span>
        {category.subcategories.map((sub) => (
          <span
            key={sub}
            className="text-xs bg-stone-100 border border-stone-300 px-3.5 py-1.5 rounded-full text-stone-700 font-medium hover:border-obsidian-400 transition-colors cursor-pointer"
          >
            {sub}
          </span>
        ))}
      </div>

      {/* Product Grid */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold tracking-editorial text-obsidian-400">
          PRODUCTS IN THIS COLLECTION
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

    </div>
  );
}
