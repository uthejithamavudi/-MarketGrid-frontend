'use client';

import React from 'react';
import { IndianRupee, TrendingUp, CreditCard, ArrowUpRight, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

export default function VendorRevenuePage() {
  const grossRevenue = 245890;
  const platformFee = Math.round(grossRevenue * 0.1); // 10% platform fee
  const netProfit = grossRevenue - platformFee; // 90% net profit
  const pendingPayout = 42890;

  return (
    <div className="space-y-8">
      <div className="border-b border-stone-300 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">
          Financial Governance & Earnings
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
          REVENUE & NET PROFIT ANALYTICS
        </h1>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 shadow-soft">
          <span className="text-xs uppercase tracking-editorial font-semibold text-stone-500">GROSS SALES REVENUE</span>
          <p className="font-serif text-3xl font-bold text-obsidian-400 mt-2">₹{grossRevenue.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-emerald-700 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% growth vs last month
          </span>
        </div>

        <div className="bg-emerald-50/80 p-6 rounded-xl border border-emerald-200 shadow-soft">
          <span className="text-xs uppercase tracking-editorial font-bold text-emerald-900">NET VENDOR PROFIT (90%)</span>
          <p className="font-serif text-3xl font-bold text-emerald-900 mt-2">₹{netProfit.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-emerald-800 mt-2 block">Direct earnings after platform fees</span>
        </div>

        <div className="bg-stone-100 p-6 rounded-xl border border-stone-300 shadow-soft">
          <span className="text-xs uppercase tracking-editorial font-semibold text-stone-600">MARKETPLACE FEE (10%)</span>
          <p className="font-serif text-3xl font-bold text-stone-700 mt-2">₹{platformFee.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-stone-500 mt-2 block">Platform hosting & payment processing</span>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-soft">
          <span className="text-xs uppercase tracking-editorial font-semibold text-amber-900">NEXT PAYOUT SETTLEMENT</span>
          <p className="font-serif text-3xl font-bold text-amber-900 mt-2">₹{pendingPayout.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-amber-800 font-medium mt-2 block">Scheduled for 25 Sep 2026</span>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold text-obsidian-400 border-b border-stone-200 pb-2">
            TOP SELLING PRODUCTS & MARGINS
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-stone-100 rounded flex justify-between items-center font-medium">
              <div>
                <p className="font-bold text-obsidian-400">01. Cowboy 4 Wireless Electric City Bike</p>
                <p className="text-[11px] text-stone-500 font-mono">14 Units Sold • Price: ₹1,49,999</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-800 block">Net: ₹1,34,999 / unit</span>
                <span className="text-[10px] text-stone-500 font-mono">Fee: ₹15,000</span>
              </div>
            </div>

            <div className="p-3 bg-stone-100 rounded flex justify-between items-center font-medium">
              <div>
                <p className="font-bold text-obsidian-400">02. Smart Typewriter Mechanical Terminal</p>
                <p className="text-[11px] text-stone-500 font-mono">22 Units Sold • Price: ₹49,999</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-800 block">Net: ₹44,999 / unit</span>
                <span className="text-[10px] text-stone-500 font-mono">Fee: ₹5,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl font-bold text-obsidian-400 border-b border-stone-200 pb-2">
            BANK PAYOUT DISBURSEMENTS
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-stone-100 rounded flex justify-between items-center">
              <div>
                <p className="font-bold text-obsidian-400 font-sans">Payout #PAY-88029</p>
                <p className="text-[10px] text-stone-500">15 Sep 2026 • HDFC Bank A/C **4901</p>
              </div>
              <span className="font-bold text-emerald-700">₹82,500 [SETTLED]</span>
            </div>

            <div className="p-3 bg-stone-100 rounded flex justify-between items-center">
              <div>
                <p className="font-bold text-obsidian-400 font-sans">Payout #PAY-87112</p>
                <p className="text-[10px] text-stone-500">01 Sep 2026 • HDFC Bank A/C **4901</p>
              </div>
              <span className="font-bold text-emerald-700">₹1,20,500 [SETTLED]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
