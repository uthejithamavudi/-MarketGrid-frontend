'use client';

import React from 'react';
import Link from 'next/link';
import { IndianRupee, ShoppingBag, Package, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function VendorDashboardPage() {
  const { orders } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-300 pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">
            TechVerse Store Dashboard
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
            VENDOR OVERVIEW
          </h1>
        </div>

        <Link
          href="/vendor/products/new"
          className="bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-5 py-2.5 rounded text-xs uppercase tracking-editorial font-semibold transition-colors shadow-soft"
        >
          + Add New Product
        </Link>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-cream-50 p-5 rounded-xl border border-stone-200 shadow-card space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs uppercase tracking-editorial font-semibold">TOTAL SALES</span>
            <IndianRupee className="w-4 h-4 text-accent-emerald" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-obsidian-400">₹1,24,500</span>
            <span className="text-[11px] font-bold text-accent-emerald flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
        </div>

        <div className="bg-cream-50 p-5 rounded-xl border border-stone-200 shadow-card space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs uppercase tracking-editorial font-semibold">TOTAL ORDERS</span>
            <ShoppingBag className="w-4 h-4 text-accent-amber" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-obsidian-400">186</span>
            <span className="text-[11px] text-stone-500">22 pending dispatch</span>
          </div>
        </div>

        <div className="bg-cream-50 p-5 rounded-xl border border-stone-200 shadow-card space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs uppercase tracking-editorial font-semibold">ACTIVE PRODUCTS</span>
            <Package className="w-4 h-4 text-accent-forest" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-obsidian-400">128</span>
            <span className="text-[11px] text-stone-500">4 categories</span>
          </div>
        </div>

        <div className="bg-cream-50 p-5 rounded-xl border border-stone-200 shadow-card space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs uppercase tracking-editorial font-semibold">LOW STOCK</span>
            <AlertTriangle className="w-4 h-4 text-accent-terracotta" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-accent-terracotta">7</span>
            <span className="text-[11px] text-stone-500">Needs restock</span>
          </div>
        </div>

      </div>

      {/* Chart & Low Stock Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Sales Performance Overview */}
        <div className="lg:col-span-8 bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-200 pb-3">
            <h3 className="font-serif text-xl font-bold text-obsidian-400">Sales Overview (Last 30 Days)</h3>
            <span className="text-xs text-stone-500">Daily Revenue Trajectory</span>
          </div>

          {/* Clean SVG Performance Chart */}
          <div className="h-56 w-full pt-4 flex items-end gap-3 px-2 border-b border-stone-300 pb-2">
            {[35, 42, 28, 55, 68, 74, 60, 82, 95, 88, 100, 78, 86, 92].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  style={{ height: `${val}%` }}
                  className="w-full bg-obsidian-400 group-hover:bg-accent-amber rounded-t transition-all"
                />
                <span className="text-[9px] text-stone-400 font-mono">D{idx + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-stone-500 font-medium">
            <span>₹0.00</span>
            <span>Peak Day Revenue: ₹48,200</span>
          </div>
        </div>

        {/* Right: Low Stock Alert Card */}
        <div className="lg:col-span-4 bg-cream-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-200 pb-3">
            <h3 className="font-serif text-xl font-bold text-obsidian-400">Low Stock Warning</h3>
            <Link href="/vendor/inventory" className="text-xs text-accent-terracotta hover:underline font-semibold">
              Manage All →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-red-50 rounded border border-red-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-stone-800">Cowboy 4 Smart Cockpit</h4>
                <p className="text-[11px] text-stone-500">SKU: CB-401</p>
              </div>
              <span className="bg-red-200 text-red-800 font-bold px-2 py-1 rounded">4 Left</span>
            </div>

            <div className="p-3 bg-amber-50 rounded border border-amber-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-stone-800">Planar Reference Headphones</h4>
                <p className="text-[11px] text-stone-500">SKU: LA-HP-500</p>
              </div>
              <span className="bg-amber-200 text-amber-900 font-bold px-2 py-1 rounded">3 Left</span>
            </div>

            <div className="p-3 bg-amber-50 rounded border border-amber-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-stone-800">Mechanical Keycaps Set</h4>
                <p className="text-[11px] text-stone-500">SKU: TV-KC-200</p>
              </div>
              <span className="bg-amber-200 text-amber-900 font-bold px-2 py-1 rounded">2 Left</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders Data Table */}
      <div className="bg-cream-50 rounded-xl border border-stone-200 p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-stone-200 pb-3">
          <h3 className="font-serif text-xl font-bold text-obsidian-400">Recent Vendor Orders</h3>
          <Link href="/vendor/orders" className="text-xs uppercase tracking-editorial font-bold text-obsidian-400 hover:text-stone-600">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 text-stone-600 uppercase tracking-editorial font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Item</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Fulfillment Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr className="hover:bg-cream-100/60">
                <td className="p-3 font-mono font-bold text-obsidian-400">#MG-104829</td>
                <td className="p-3">Sai Vardhan</td>
                <td className="p-3">Smart Typewriter Terminal</td>
                <td className="p-3 font-semibold">₹49,999</td>
                <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">Shipped</span></td>
                <td className="p-3"><Link href="/vendor/orders" className="text-accent-emerald font-bold hover:underline">Manage</Link></td>
              </tr>
              <tr className="hover:bg-cream-100/60">
                <td className="p-3 font-mono font-bold text-obsidian-400">#MG-104820</td>
                <td className="p-3">Rahul Sharma</td>
                <td className="p-3">Cowboy 4 Electric Bike</td>
                <td className="p-3 font-semibold">₹1,49,999</td>
                <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">Processing</span></td>
                <td className="p-3"><Link href="/vendor/orders" className="text-accent-emerald font-bold hover:underline">Manage</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
