'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function VendorProfilePage() {
  const { showToast } = useApp();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="border-b border-stone-300 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">Public Branding</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">VENDOR PROFILE</h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); showToast('Profile Saved', undefined, 'success'); }} className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs">
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Store Name</label>
          <input type="text" defaultValue="TechVerse Studio" className="w-full bg-cream-100 p-3 rounded border border-stone-300" />
        </div>
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Tagline</label>
          <input type="text" defaultValue="Precision crafted minimalist electronics & desk essentials." className="w-full bg-cream-100 p-3 rounded border border-stone-300" />
        </div>
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Store Description</label>
          <textarea rows={4} defaultValue="TechVerse creates thoughtful, high-performance technology accessories designed for modern digital creators." className="w-full bg-cream-100 p-3 rounded border border-stone-300" />
        </div>
        <button type="submit" className="bg-obsidian-400 text-cream-50 px-6 py-2.5 rounded font-semibold uppercase tracking-editorial">Save Storefront Profile</button>
      </form>
    </div>
  );
}
