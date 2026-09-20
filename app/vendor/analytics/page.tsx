'use client';

import React from 'react';

export default function VendorAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-stone-300 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">Store Insights</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">ANALYTICS & CONVERSIONS</h1>
      </div>

      <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
        <h3 className="font-serif text-xl font-bold text-obsidian-400">Traffic & Storefront Conversion</h3>
        <p className="text-xs text-stone-600 font-light">Conversion Rate: <span className="font-bold text-emerald-800">4.2%</span> (Industry Avg: 2.1%)</p>
        <div className="h-40 bg-stone-100 rounded border flex items-center justify-center text-xs text-stone-400 font-mono">
          [Storefront Visitors Analytics Chart]
        </div>
      </div>
    </div>
  );
}
