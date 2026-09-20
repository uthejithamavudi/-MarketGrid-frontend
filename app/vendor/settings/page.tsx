'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function VendorSettingsPage() {
  const { showToast } = useApp();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="border-b border-stone-300 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">Payout & Fulfillment Preferences</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">VENDOR SETTINGS</h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); showToast('Settings Updated', undefined, 'success'); }} className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs">
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Payout Bank Account (IFS Code)</label>
          <input type="text" defaultValue="HDFC0000128" className="w-full bg-cream-100 p-3 rounded border border-stone-300 font-mono" />
        </div>
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Courier Partner Integration</label>
          <select className="w-full bg-cream-100 p-3 rounded border border-stone-300">
            <option>Delhivery Express Direct</option>
            <option>Bluedart Air</option>
          </select>
        </div>
        <button type="submit" className="bg-obsidian-400 text-cream-50 px-6 py-2.5 rounded font-semibold uppercase tracking-editorial">Save Vendor Settings</button>
      </form>
    </div>
  );
}
