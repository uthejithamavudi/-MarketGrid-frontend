'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Users, Building2, ShoppingBag, IndianRupee, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const { vendorsList, approveVendor, rejectVendor } = useApp();

  const pendingVendors = vendorsList.filter((v) => v.status === 'PENDING');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">
          Governance & Operations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">
          MARKETGRID PLATFORM OVERVIEW
        </h1>
      </div>

      {/* Top 4 Metrics Cards (Section 20 in prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-stone-900 text-cream-50 p-5 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-mono">PLATFORM USERS</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-serif text-3xl font-bold block">12,420</span>
          <span className="text-[10px] text-emerald-400 font-mono">+340 this week</span>
        </div>

        <div className="bg-stone-900 text-cream-50 p-5 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-mono">ACTIVE VENDORS</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-serif text-3xl font-bold block">382</span>
          <span className="text-[10px] text-amber-400 font-mono">4 pending review</span>
        </div>

        <div className="bg-stone-900 text-cream-50 p-5 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-mono">TOTAL ORDERS</span>
            <ShoppingBag className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-serif text-3xl font-bold block">8,921</span>
          <span className="text-[10px] text-stone-400 font-mono">Across all vendors</span>
        </div>

        <div className="bg-stone-900 text-cream-50 p-5 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-mono">PLATFORM GMV</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-serif text-3xl font-bold block">₹42.8L</span>
          <span className="text-[10px] text-emerald-400 font-mono">+12% MoM growth</span>
        </div>

      </div>

      {/* Split Grid: Vendor Applications Desk & Platform Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Pending Vendor Applications Queue */}
        <div className="lg:col-span-6 bg-stone-900 text-cream-50 p-6 rounded-xl border border-stone-800 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-800 pb-3">
            <h3 className="font-serif text-xl font-bold text-cream-50">Pending Vendor Applications</h3>
            <Link href="/admin/vendors" className="text-xs text-emerald-400 hover:underline font-mono">
              View All Vendors →
            </Link>
          </div>

          {pendingVendors.length === 0 ? (
            <p className="text-xs text-stone-400 py-6 text-center font-mono">No pending applications at this time.</p>
          ) : (
            <div className="space-y-3 text-xs">
              {pendingVendors.map((vendor) => (
                <div key={vendor.id} className="p-4 bg-stone-950 rounded border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-cream-50">{vendor.name}</h4>
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono">PENDING KYC</span>
                    </div>
                    <p className="text-[11px] text-stone-400">Owner: {vendor.ownerName} ({vendor.ownerEmail})</p>
                    <p className="text-[11px] text-stone-500 italic">"{vendor.tagline}"</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => approveVendor(vendor.id)}
                      className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => rejectVendor(vendor.id)}
                      className="flex-1 sm:flex-none bg-stone-800 hover:bg-red-900 text-stone-300 hover:text-white px-3 py-1.5 rounded font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Platform Volume Growth */}
        <div className="lg:col-span-6 bg-stone-900 text-cream-50 p-6 rounded-xl border border-stone-800 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-800 pb-3">
            <h3 className="font-serif text-xl font-bold text-cream-50">Platform Order Volume</h3>
            <span className="text-xs text-stone-400 font-mono">Multi-Vendor Analytics</span>
          </div>

          <div className="h-56 w-full pt-4 flex items-end gap-3 px-2 border-b border-stone-800 pb-2">
            {[45, 52, 60, 58, 72, 85, 90, 84, 98, 110, 105, 120].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  style={{ height: `${val}%` }}
                  className="w-full bg-emerald-500 group-hover:bg-emerald-400 rounded-t transition-all"
                />
                <span className="text-[9px] text-stone-500 font-mono">M{idx + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-stone-400 font-mono">
            <span>Quarterly Scale</span>
            <span>Monthly Active Sellers: 382</span>
          </div>
        </div>

      </div>

    </div>
  );
}
