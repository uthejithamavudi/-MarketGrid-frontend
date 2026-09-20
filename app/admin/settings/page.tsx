'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function AdminSettingsPage() {
  const { showToast } = useApp();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">Global Configuration</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">PLATFORM GOVERNANCE SETTINGS</h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); showToast('Platform Settings Updated', undefined, 'success'); }} className="bg-stone-900 p-6 rounded-xl border border-stone-800 space-y-4 text-xs text-stone-300">
        <div>
          <label className="block font-semibold uppercase font-mono text-stone-400 mb-1">Platform Marketplace Take Rate (%)</label>
          <input type="number" defaultValue={8.5} className="w-full bg-stone-950 p-3 rounded border border-stone-800 font-mono text-cream-50" />
        </div>
        <div>
          <label className="block font-semibold uppercase font-mono text-stone-400 mb-1">KYC Approval Mode</label>
          <select className="w-full bg-stone-950 p-3 rounded border border-stone-800 text-cream-50">
            <option>Strict Admin Manual Verification</option>
            <option>Automated Instant Verification</option>
          </select>
        </div>
        <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-6 py-2.5 rounded font-mono uppercase">
          Save Admin Controls
        </button>
      </form>
    </div>
  );
}
