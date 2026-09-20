'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartByVendor, removeFromCart, updateCartQuantity, cartSubtotal, cartDeliveryFee, cartGrandTotal, cartCount } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-200 pb-4 space-y-1">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Independent Multi-Vendor Selection
        </span>
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          YOUR CART ({cartCount})
        </h1>
      </div>

      {cartByVendor.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-stone-50 rounded-xl border border-stone-200">
          <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-obsidian-400">Your cart is empty</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">
            Discover curated items from independent studios and artisan sellers.
          </p>
          <Link
            href="/products"
            className="inline-block bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-6 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-colors"
          >
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Vendor Grouped Items */}
          <div className="lg:col-span-8 space-y-6">
            {cartByVendor.map((group) => (
              <div key={group.vendorId} className="bg-stone-50 rounded-xl border border-stone-200 p-6 space-y-4">
                
                {/* Vendor Header */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-obsidian-400">{group.vendorName}</h3>
                    <ShieldCheck className="w-4 h-4 text-accent-emerald" />
                    <span className="text-[10px] text-stone-500 font-medium">Verified Seller</span>
                  </div>
                  <span className="text-xs font-serif text-stone-600 font-semibold">
                    Subtotal: ₹{group.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 py-3 border-b border-stone-200/50 last:border-none items-center">
                      <img src={item.product.images[0]} alt="" className="w-20 h-20 object-cover rounded bg-stone-200" />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-semibold text-obsidian-400">{item.product.name}</h4>
                        {item.selectedVariant && (
                          <p className="text-xs text-stone-500 font-light">Variant: {item.selectedVariant}</p>
                        )}
                        <p className="text-xs font-semibold text-obsidian-400 mt-1">₹{item.product.price.toLocaleString('en-IN')}</p>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-stone-300 rounded bg-cream-50 text-xs">
                          <button onClick={() => updateCartQuantity(item.product.id, -1)} className="px-2.5 py-1 hover:bg-stone-200">-</button>
                          <span className="px-3 font-semibold text-obsidian-400">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.product.id, 1)} className="px-2.5 py-1 hover:bg-stone-200">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-stone-400 hover:text-accent-terracotta">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-cream-100/70 p-6 rounded-xl border border-stone-200 space-y-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-300 pb-3">
                ORDER SUMMARY
              </h3>

              <div className="space-y-3 text-xs text-stone-600 font-light">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-obsidian-400">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Multi-Vendor Shipping</span>
                  <span className="font-semibold text-obsidian-400">₹{cartDeliveryFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-obsidian-400 pt-3 border-t border-stone-300">
                  <span>GRAND TOTAL</span>
                  <span>₹{cartGrandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/customer/checkout"
                className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3.5 px-4 rounded text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
