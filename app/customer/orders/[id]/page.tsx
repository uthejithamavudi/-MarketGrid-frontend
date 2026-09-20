'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BackButton } from '@/components/BackButton';
import { Package, ShieldCheck, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';

export default function OrderTrackingDetailPage() {
  const params = useParams();
  const { orders } = useApp();
  const orderId = params?.id as string;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const timelineSteps = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepIndex = (status: string) => {
    return timelineSteps.indexOf(status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
            Multi-Vendor Fulfillment Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
            ORDER TIMELINE #{order.id}
          </h1>
          <p className="text-xs text-stone-500 font-light mt-1">Placed on {order.orderDate} • {order.paymentMethod}</p>
        </div>

        <BackButton label="← All Orders" href="/customer/orders" />
      </div>

      {/* Shipping Address Box */}
      <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
        <div>
          <span className="font-bold text-obsidian-400 uppercase tracking-editorial block mb-1">Shipping Destination</span>
          <p className="font-medium text-obsidian-400">{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}</p>
        </div>
        <div>
          <span className="font-bold text-obsidian-400 uppercase tracking-editorial block mb-1">Payment Breakdown</span>
          <p>Total Paid: <span className="font-bold text-obsidian-400">₹{order.grandTotal.toLocaleString('en-IN')}</span></p>
          <p>Status: <span className="text-accent-emerald font-semibold">✓ {order.paymentStatus}</span></p>
        </div>
        <div>
          <span className="font-bold text-obsidian-400 uppercase tracking-editorial block mb-1">Delivery Estimate</span>
          <p className="font-serif text-base font-bold text-obsidian-400">24–28 September 2026</p>
        </div>
      </div>

      {/* MULTI-VENDOR GRANULAR FULFILLMENT BREAKDOWN (Section 10 in prompt) */}
      <div className="space-y-8">
        <h2 className="font-serif text-2xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-200 pb-2">
          INDEPENDENT VENDOR SHIPMENTS ({order.subOrders.length})
        </h2>

        {order.subOrders.map((subOrder) => {
          const currentStepIdx = getStepIndex(subOrder.status);

          return (
            <div key={subOrder.vendorId} className="bg-cream-50 p-6 rounded-xl border border-stone-300 space-y-6 shadow-card">
              
              {/* Vendor Sub-Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-obsidian-400" />
                  <h3 className="font-serif text-xl font-bold text-obsidian-400">{subOrder.vendorName}</h3>
                  <ShieldCheck className="w-4 h-4 text-accent-emerald" />
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">Verified Seller</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-stone-500 font-mono">Tracking: {subOrder.trackingNumber}</span>
                  <span className="font-bold text-obsidian-400 uppercase bg-cream-200 px-3 py-1 rounded">
                    Current Status: {subOrder.status}
                  </span>
                </div>
              </div>

              {/* Vendor Items */}
              <div className="space-y-2">
                {subOrder.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 text-xs">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover rounded bg-stone-200" />
                    <div>
                      <h4 className="font-semibold text-obsidian-400">{item.product.name}</h4>
                      <p className="text-stone-500 font-light">Qty: {item.quantity} • ₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Progress Stepper */}
              <div className="pt-4 border-t border-stone-200/80">
                <h4 className="text-xs font-semibold uppercase tracking-editorial text-stone-500 mb-4">
                  {subOrder.vendorName} Fulfillment Pipeline
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {timelineSteps.map((stepName, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div
                        key={stepName}
                        className={`p-3 rounded-lg border text-center space-y-1.5 transition-all ${
                          isCurrent
                            ? 'bg-obsidian-400 text-cream-50 border-obsidian-400 shadow'
                            : isPassed
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : 'bg-stone-100 text-stone-400 border-stone-200'
                        }`}
                      >
                        <div className="flex justify-center">
                          {isPassed ? (
                            <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-cream-50' : 'text-accent-emerald'}`} />
                          ) : (
                            <Clock className="w-4 h-4 text-stone-400" />
                          )}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider block">
                          {stepName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
