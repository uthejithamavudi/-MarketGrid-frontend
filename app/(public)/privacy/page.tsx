'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-stone-200 pb-4 space-y-2">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Legal Compliance
        </span>
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-stone-500">Last updated: September 19, 2026</p>
      </div>

      <div className="space-y-6 text-xs text-stone-600 leading-relaxed font-light">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-obsidian-400">1. Data Collection & Multi-Vendor Sharing</h3>
          <p>
            MarketGrid respects your privacy. When you place an order containing items from multiple independent vendors, we only share necessary fulfillment details (shipping name, delivery address, contact telephone) with the specific vendors fulfilling your selected items.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-obsidian-400">2. Cookie & Tracking Policy</h3>
          <p>
            We use essential session storage to maintain your multi-vendor cart items, wishlist state, and active portal session. No secret API tokens or payment keys are stored in client cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-obsidian-400">3. Security Standards</h3>
          <p>
            All communications across MarketGrid operate strictly over encrypted HTTPS protocols. Payment operations use tokenized gateway channels.
          </p>
        </section>
      </div>
    </div>
  );
}
