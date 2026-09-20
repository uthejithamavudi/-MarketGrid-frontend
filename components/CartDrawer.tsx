'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartByVendor,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDeliveryFee,
    cartGrandTotal,
    cartCount,
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian-400/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 text-obsidian-400 shadow-elevated flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-obsidian-400" />
              <h2 className="font-serif text-xl font-bold tracking-editorial">
                YOUR CART ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-obsidian-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body: Multi-Vendor Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cartByVendor.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="font-serif text-lg text-stone-600">
                  Your cart is waiting for something good.
                </p>
                <Link
                  href="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block text-xs uppercase tracking-editorial font-semibold text-obsidian-400 border-b border-obsidian-400 pb-1 hover:opacity-75"
                >
                  Explore Catalog →
                </Link>
              </div>
            ) : (
              cartByVendor.map((vendorGroup) => (
                <div
                  key={vendorGroup.vendorId}
                  className="bg-stone-50 border border-stone-200/80 rounded-lg p-4 space-y-3"
                >
                  {/* Vendor Group Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-obsidian-400 uppercase tracking-wide">
                        {vendorGroup.vendorName}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
                      <span className="text-[10px] text-stone-500 font-medium">Verified Seller</span>
                    </div>
                    <span className="text-xs font-serif text-stone-600">
                      Subtotal: ₹{vendorGroup.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Vendor Products */}
                  <div className="space-y-3">
                    {vendorGroup.items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-3 py-2 border-b border-stone-200/40 last:border-none"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded bg-stone-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-obsidian-400 truncate">
                            {item.product.name}
                          </h4>
                          {item.selectedVariant && (
                            <p className="text-[11px] text-stone-500 font-light">
                              {item.selectedVariant}
                            </p>
                          )}
                          <p className="text-xs font-medium text-obsidian-400 mt-1">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-stone-300 rounded text-xs">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, -1)}
                                className="px-2 py-0.5 hover:bg-stone-200"
                              >
                                -
                              </button>
                              <span className="px-2 font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, 1)}
                                className="px-2 py-0.5 hover:bg-stone-200"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-stone-400 hover:text-accent-terracotta text-xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cartByVendor.length > 0 && (
            <div className="px-6 py-5 border-t border-stone-200 bg-cream-100/50 space-y-3">
              <div className="space-y-1 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Multi-Vendor Delivery</span>
                  <span>₹{cartDeliveryFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-obsidian-400 text-sm pt-2 border-t border-stone-200">
                  <span>TOTAL</span>
                  <span>₹{cartGrandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/customer/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 font-medium py-3 px-4 rounded flex items-center justify-center gap-2 text-xs uppercase tracking-editorial transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
