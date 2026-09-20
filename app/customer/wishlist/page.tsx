'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, productsList } = useApp();
  const wishlistedProducts = productsList.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-4 space-y-1">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Saved Collections
        </span>
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          MY WISHLIST ({wishlistedProducts.length})
        </h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-stone-50 rounded-xl border border-stone-200">
          <Heart className="w-16 h-16 text-stone-300 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-obsidian-400">No saved items yet</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Click the heart icon on any product to save it to your personal collection.
          </p>
          <Link
            href="/products"
            className="inline-block bg-obsidian-400 text-cream-50 px-6 py-3 rounded text-xs uppercase tracking-editorial font-semibold"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
