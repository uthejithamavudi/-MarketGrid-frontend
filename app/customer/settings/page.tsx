'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function CustomerSettingsPage() {
  const { showToast } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Preferences & Security
        </span>
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          ACCOUNT SETTINGS
        </h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); showToast('Settings Saved', undefined, 'success'); }} className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4 text-xs">
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Email Address</label>
          <input type="email" defaultValue="sai.customer@marketgrid.io" className="w-full bg-cream-100 p-3 rounded border border-stone-300" />
        </div>
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Notification Preferences</label>
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>Email notification when vendor ships sub-order</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>SMS delivery status updates</span>
            </label>
          </div>
        </div>
        <button type="submit" className="bg-obsidian-400 text-cream-50 px-6 py-2.5 rounded font-semibold uppercase tracking-editorial">
          Save Settings
        </button>
      </form>
    </div>
  );
}
