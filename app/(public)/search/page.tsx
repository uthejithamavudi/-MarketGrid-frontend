'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const { productsList } = useApp();
  const [query, setQuery] = useState('');

  const results = query
    ? productsList.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.vendorName.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          SEARCH MARKETGRID
        </h1>
        <p className="text-xs text-stone-500 font-light">
          Search across products, artisanal creators, and categories.
        </p>

        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type a product name, e.g., Typewriter, Bike, Leather..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-cream-50 text-sm pl-12 pr-4 py-4 rounded-lg border border-stone-300 focus:outline-none focus:border-obsidian-400 shadow-soft"
            autoFocus
          />
        </div>
      </div>

      {query && (
        <div className="space-y-4">
          <p className="text-xs text-stone-500 font-medium">
            Found {results.length} results for "{query}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
