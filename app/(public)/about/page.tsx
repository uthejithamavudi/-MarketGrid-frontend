'use client';

import React from 'react';
import { ShieldCheck, Truck, Store, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-superwide font-semibold text-stone-500">
          Our Architectural Philosophy
        </span>
        <h1 className="font-serif text-5xl font-bold tracking-editorial text-obsidian-400">
          ABOUT MARKETGRID
        </h1>
        <p className="text-stone-600 text-base font-light leading-relaxed max-w-2xl mx-auto">
          MarketGrid is a multi-tenant e-commerce platform built to elevate independent creators, artisanal ateliers, and specialty product studios.
        </p>
      </div>

      <div className="p-8 bg-cream-100/70 rounded-xl border border-stone-200 space-y-4 text-stone-600 text-sm leading-relaxed font-light">
        <h3 className="font-serif text-2xl font-bold text-obsidian-400">The Multi-Vendor Vision</h3>
        <p>
          Conventional marketplaces clutter the shopping experience with algorithmically boosted commodity goods. MarketGrid restores editorial art-direction, craftsmanship transparency, and seller autonomy.
        </p>
        <p>
          Every vendor on MarketGrid operates their own storefront shell, handles independent inventory, and dispatches orders with custom packaging — while customers enjoy unified checkout and consolidated order tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-cream-50 rounded-lg border border-stone-200 space-y-2">
          <Store className="w-8 h-8 text-obsidian-400 mx-auto" />
          <h4 className="font-serif font-bold text-lg text-obsidian-400">Independent Stores</h4>
          <p className="text-xs text-stone-500 font-light">Empowering sellers with direct brand autonomy.</p>
        </div>
        <div className="p-6 bg-cream-50 rounded-lg border border-stone-200 space-y-2">
          <ShieldCheck className="w-8 h-8 text-accent-emerald mx-auto" />
          <h4 className="font-serif font-bold text-lg text-obsidian-400">Audited Quality</h4>
          <p className="text-xs text-stone-500 font-light">100% verified KYC & material standards.</p>
        </div>
        <div className="p-6 bg-cream-50 rounded-lg border border-stone-200 space-y-2">
          <Truck className="w-8 h-8 text-accent-amber mx-auto" />
          <h4 className="font-serif font-bold text-lg text-obsidian-400">Multi-Vendor Cart</h4>
          <p className="text-xs text-stone-500 font-light">Seamless checkout across multiple independent stores.</p>
        </div>
      </div>
    </div>
  );
}
