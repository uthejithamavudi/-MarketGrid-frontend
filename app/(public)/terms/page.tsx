'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-stone-200 pb-4 space-y-2">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Marketplace Governance
        </span>
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          TERMS & CONDITIONS
        </h1>
        <p className="text-xs text-stone-500">Effective Date: September 19, 2026</p>
      </div>

      <div className="space-y-6 text-xs text-stone-600 leading-relaxed font-light">
        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-obsidian-400">1. Marketplace Structure</h3>
          <p>
            MarketGrid is a multi-tenant platform facilitating transactions between customers and independent third-party vendors. Each vendor is independently responsible for product authenticity, inventory accuracy, and packaging standards.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-obsidian-400">2. Customer Obligations</h3>
          <p>
            Customers must provide accurate shipping addresses and contact information during checkout. Orders placed containing multiple vendors will generate separate sub-orders fulfilled individually.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-obsidian-400">3. Vendor Obligations</h3>
          <p>
            Vendors must maintain accurate stock counts, process orders within agreed SLAs, and comply with platform quality standards. Failure to meet SLAs may result in store suspension by platform administrators.
          </p>
        </section>
      </div>
    </div>
  );
}
