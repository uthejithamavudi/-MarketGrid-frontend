'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { VendorCard } from '@/components/VendorCard';

export default function VendorsDirectoryPage() {
  const { vendorsList, isLoadingData } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Independent Studios & Artisans
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-editorial text-obsidian-400">
          VENDOR DIRECTORY
        </h1>
        <p className="text-stone-600 text-sm font-light max-w-xl">
          Discover independent sellers, specialty studios, and verified artisan brands operating on MarketGrid.
        </p>
      </div>

      {isLoadingData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-stone-100 rounded-xl animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vendorsList.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
}
