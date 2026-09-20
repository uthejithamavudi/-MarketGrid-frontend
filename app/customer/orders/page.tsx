'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Package, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export default function CustomerOrdersPage() {
  const { orders } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-4 space-y-1">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Customer Account History
        </span>
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          MY ORDERS
        </h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-stone-50 rounded-xl border border-stone-200 p-6 space-y-4">
            
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-base text-obsidian-400">{order.id}</span>
                  <span className="bg-accent-amber/10 text-accent-amber text-[10px] font-semibold px-2.5 py-0.5 rounded uppercase">
                    {order.globalStatus}
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-light mt-1">Placed on {order.orderDate}</p>
              </div>

              <div className="text-right">
                <span className="font-serif text-xl font-bold text-obsidian-400 block">
                  ₹{order.grandTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-500 font-light">{order.subOrders.length} Independent Sellers</span>
              </div>
            </div>

            {/* Sub-Orders Breakdown */}
            <div className="space-y-3">
              {order.subOrders.map((sub) => (
                <div key={sub.vendorId} className="bg-cream-50 p-4 rounded-lg border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-obsidian-400" />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-obsidian-400">
                        <span>Vendor: {sub.vendorName}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
                      </div>
                      <p className="text-[11px] text-stone-500">{sub.items[0]?.product.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-medium">
                      Status: {sub.status}
                    </span>
                    <span className="text-stone-500 font-mono text-[11px]">{sub.trackingNumber}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Track Button Link */}
            <div className="pt-2 flex justify-end">
              <Link
                href={`/customer/orders/${order.id}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial font-bold text-obsidian-400 hover:text-stone-600"
              >
                <span>View Granular Live Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
