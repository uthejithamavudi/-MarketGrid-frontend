'use client';

import React from 'react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">Financial Reports</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">PLATFORM REPORTS & GMV AUDIT</h1>
      </div>

      <div className="bg-stone-900 p-6 rounded-xl border border-stone-800 text-stone-300 space-y-4">
        <h3 className="font-serif text-xl font-bold text-cream-50">Marketplace Commission Breakdown</h3>
        <p className="text-xs text-stone-400">Standard Platform Take Rate: <span className="font-mono text-emerald-400 font-bold">8.5% per completed order</span></p>
        <div className="p-4 bg-stone-950 rounded border border-stone-800 font-mono text-xs text-emerald-400">
          Estimated Platform Commission Earnings This Month: ₹3,64,200
        </div>
      </div>
    </div>
  );
}
