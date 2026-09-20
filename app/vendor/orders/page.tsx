'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Check, Package, Truck, Clock } from 'lucide-react';

export default function VendorOrdersPage() {
  const { orders, updateSubOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered'>('All');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const vendorId = 'v1'; // TechVerse Vendor context

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-300 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">
          Sub-Order Fulfillment Queue
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
          VENDOR ORDERS MANAGEMENT
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-semibold uppercase tracking-editorial">
        {['All', 'Processing', 'Shipped', 'Delivered'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2.5 transition-colors relative ${
              activeTab === tab ? 'text-obsidian-400 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {tab}
            {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-obsidian-400" />}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const techverseSubOrder = order.subOrders.find((s) => s.vendorId === vendorId) || order.subOrders[0];

          return (
            <div key={order.id} className="bg-cream-50 rounded-xl border border-stone-200 p-6 space-y-4 shadow-card">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-obsidian-400 text-base">{order.id}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Current Status: {techverseSubOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-light mt-0.5">
                    Customer: {order.customerName} ({order.shippingAddress.city}, {order.shippingAddress.state})
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-serif text-lg font-bold text-obsidian-400 block">
                    Subtotal: ₹{techverseSubOrder.subtotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">Tracking: {techverseSubOrder.trackingNumber}</span>
                </div>
              </div>

              {/* Items in Sub-order */}
              <div className="space-y-2">
                {techverseSubOrder.items.map((it) => (
                  <div key={it.product.id} className="flex items-center justify-between text-xs bg-stone-100/60 p-3 rounded border border-stone-200/60">
                    <div className="flex items-center gap-3">
                      <img src={it.product.images[0]} alt="" className="w-10 h-10 object-cover rounded bg-stone-200" />
                      <div>
                        <h4 className="font-bold text-obsidian-400">{it.product.name}</h4>
                        <p className="text-stone-500">Qty: {it.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-obsidian-400">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Fulfillment Actions Bar (Section 17 in prompt) */}
              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-stone-500 font-medium">Advance Fulfillment Workflow:</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSubOrderStatus(order.id, techverseSubOrder.vendorId, 'Confirmed')}
                    className="bg-cream-200 hover:bg-stone-300 text-obsidian-400 px-3 py-1.5 rounded font-bold uppercase text-[10px] tracking-wider"
                  >
                    [Accept Order]
                  </button>

                  <button
                    onClick={() => updateSubOrderStatus(order.id, techverseSubOrder.vendorId, 'Packed')}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded font-bold uppercase text-[10px] tracking-wider"
                  >
                    [Mark Packed]
                  </button>

                  <button
                    onClick={() => updateSubOrderStatus(order.id, techverseSubOrder.vendorId, 'Shipped')}
                    className="bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-3.5 py-1.5 rounded font-bold uppercase text-[10px] tracking-wider shadow-sm"
                  >
                    [Mark Shipped]
                  </button>

                  <button
                    onClick={() => updateSubOrderStatus(order.id, techverseSubOrder.vendorId, 'Delivered')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded font-bold uppercase text-[10px] tracking-wider shadow-sm"
                  >
                    [Mark Delivered]
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
