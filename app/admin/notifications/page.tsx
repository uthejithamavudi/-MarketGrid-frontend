'use client';

import React from 'react';
import { Bell, ShieldCheck } from 'lucide-react';

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">System Logs</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">SYSTEM NOTIFICATIONS</h1>
      </div>

      <div className="space-y-3 text-xs">
        <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 text-stone-300 flex items-center gap-3">
          <Bell className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-bold text-cream-50">New Vendor Application Received</h4>
            <p className="text-stone-400 text-[11px]">Lumina Audio submitted KYC verification documents for platform review.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
