'use client';

import React from 'react';
import { MapPin, Plus } from 'lucide-react';

export default function CustomerAddressesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
            Fulfillment Destination
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
            SAVED ADDRESSES
          </h1>
        </div>
        <button className="bg-obsidian-400 text-cream-50 px-4 py-2 rounded text-xs uppercase tracking-editorial font-semibold flex items-center gap-1">
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-cream-50 rounded-xl border-2 border-obsidian-400 space-y-2 relative">
          <span className="bg-obsidian-400 text-cream-50 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Default Address
          </span>
          <h3 className="font-serif text-lg font-bold text-obsidian-400">Sai Vardhan</h3>
          <p className="text-xs text-stone-600 font-light">42 Jubilee Hills, Road No. 36</p>
          <p className="text-xs text-stone-600 font-light">Hyderabad, Telangana - 500033</p>
          <p className="text-xs text-stone-600 font-light">Mobile: +91 98765 43210</p>
        </div>
      </div>
    </div>
  );
}
