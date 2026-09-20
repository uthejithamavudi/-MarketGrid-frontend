'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Package, ShieldCheck, Layers } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">
          Platform Transaction Audit
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">
          ALL MULTI-VENDOR ORDERS
        </h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-stone-900 rounded-xl border border-stone-800 p-6 space-y-4 text-stone-300">
            
            {/* Parent Order Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-cream-50 text-base">{order.id}</span>
                  <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    Parent Order Status: {order.globalStatus}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Customer: <span className="text-cream-50 font-semibold">{order.customerName}</span> ({order.customerEmail})
                </p>
              </div>

              <div className="text-right">
                <span className="font-serif text-2xl font-bold text-emerald-400 block">
                  ₹{order.grandTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400 font-mono">Paid via {order.paymentMethod}</span>
              </div>
            </div>

            {/* Parent Order Split into Vendor Sub-Orders (Section 23 in prompt) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase font-mono text-stone-400">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Parent Order Vendor Split Tree ({order.subOrders.length} Vendors):</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-emerald-500/40">
                {order.subOrders.map((sub) => (
                  <div key={sub.vendorId} className="bg-stone-950 p-4 rounded border border-stone-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-cream-50 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Sub-Order: {sub.vendorName}</span>
                      </span>
                      <span className="font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-[10px]">
                        {sub.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-stone-400 pt-1">
                      {sub.items.map((it) => (
                        <div key={it.product.id} className="flex justify-between text-[11px]">
                          <span>{it.quantity}x {it.product.name}</span>
                          <span className="font-mono text-stone-300">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex justify-between text-[10px] text-stone-500 font-mono">
                      <span>Tracking: {sub.trackingNumber}</span>
                      <span>Subtotal: ₹{sub.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
