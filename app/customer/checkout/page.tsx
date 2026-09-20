'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, CheckCircle2, ArrowRight, Truck, CreditCard, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { isAuthenticated, role, cartByVendor, cartSubtotal, cartDeliveryFee, cartGrandTotal, clearCart, showToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  const [address, setAddress] = useState({
    fullName: 'Sai Vardhan',
    street: '42 Jubilee Hills, Road No. 36',
    city: 'Hyderabad',
    state: 'Telangana',
    zipCode: '500033',
    phone: '+91 98765 43210'
  });

  // CHECKOUT GUARD: Require Customer Login
  if (!isAuthenticated || role !== 'customer') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8 text-amber-700" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-superwide font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Customer Login Guard
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400">
            PLEASE SIGN IN TO ORDER
          </h1>
          <p className="text-xs text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
            MarketGrid requires customers to be logged in before placing multi-vendor orders. Without signing in, you cannot proceed to checkout.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3 max-w-xs mx-auto">
          <Link
            href="/login?role=customer&redirect=/customer/checkout"
            className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded-lg text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft"
          >
            <span>Sign In to Continue Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/register"
            className="w-full bg-cream-200 hover:bg-stone-300 text-obsidian-400 py-2.5 rounded-lg text-xs font-mono uppercase font-bold tracking-wide transition-colors"
          >
            Create Customer Account
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const orderId = `MG-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    clearCart();
    setStep(5); // Order Confirmed Success State
    showToast('Order Placed Successfully!', `Order #${orderId} generated.`, 'success');
  };

  // STEP 5: ORDER CONFIRMED SUCCESS SCREEN (Section 9 in user prompt)
  if (step === 5) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-accent-emerald flex items-center justify-center mx-auto border border-emerald-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-superwide font-bold text-accent-emerald">
            Payment Verified & Dispatching
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-editorial text-obsidian-400">
            ORDER CONFIRMED
          </h1>
          <p className="font-mono text-base font-semibold text-stone-600">
            #{confirmedOrderId}
          </p>
        </div>

        <p className="text-xs text-stone-600 max-w-md mx-auto font-light leading-relaxed">
          Your order has been split into independent sub-orders and transmitted to respective vendors. Estimated delivery: <span className="font-semibold text-obsidian-400">24–28 September</span>.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/customer/orders/MG-104829"
            className="w-full sm:w-auto bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-8 py-3.5 rounded text-xs uppercase tracking-editorial font-semibold transition-colors shadow-soft"
          >
            Track Order Status →
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto bg-cream-200 hover:bg-stone-300 text-obsidian-400 px-8 py-3.5 rounded text-xs uppercase tracking-editorial font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Checkout Stepper Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex justify-between items-center max-w-2xl mx-auto text-xs font-semibold uppercase tracking-editorial text-stone-500">
          <span className={step >= 1 ? 'text-obsidian-400 font-bold' : ''}>01 Address</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-obsidian-400 font-bold' : ''}>02 Delivery</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-obsidian-400 font-bold' : ''}>03 Payment</span>
          <span>→</span>
          <span className={step >= 4 ? 'text-obsidian-400 font-bold' : ''}>04 Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Interactive Form Steps */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 01: ADDRESS */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 flex items-center justify-between">
              <span>01 DELIVERY ADDRESS</span>
              {step > 1 && <button onClick={() => setStep(1)} className="text-xs text-stone-500 underline font-sans font-normal">Edit</button>}
            </h3>

            {step === 1 ? (
              <div className="space-y-4 text-xs pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">Full Name</label>
                    <input type="text" value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} className="w-full bg-cream-50 p-3 rounded border border-stone-300" />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">Phone Number</label>
                    <input type="text" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} className="w-full bg-cream-50 p-3 rounded border border-stone-300" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Street Address</label>
                  <input type="text" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} className="w-full bg-cream-50 p-3 rounded border border-stone-300" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">City</label>
                    <input type="text" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full bg-cream-50 p-3 rounded border border-stone-300" />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">State</label>
                    <input type="text" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} className="w-full bg-cream-50 p-3 rounded border border-stone-300" />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">ZIP Code</label>
                    <input type="text" value={address.zipCode} onChange={(e) => setAddress({...address, zipCode: e.target.value})} className="w-full bg-cream-50 p-3 rounded border border-stone-300" />
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="bg-obsidian-400 text-cream-50 px-6 py-2.5 rounded uppercase tracking-editorial font-semibold">
                  Continue to Delivery →
                </button>
              </div>
            ) : (
              <p className="text-xs text-stone-600 font-light">{address.fullName}, {address.street}, {address.city}, {address.state} - {address.zipCode}</p>
            )}
          </div>

          {/* STEP 02: DELIVERY OPTION */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 flex items-center justify-between">
              <span>02 MULTI-VENDOR DISPATCH METHOD</span>
              {step > 2 && <button onClick={() => setStep(2)} className="text-xs text-stone-500 underline font-sans font-normal">Edit</button>}
            </h3>

            {step === 2 && (
              <div className="space-y-3 text-xs pt-2">
                <div className="p-4 bg-cream-50 rounded border-2 border-obsidian-400 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-obsidian-400" />
                    <div>
                      <h4 className="font-bold text-obsidian-400">Standard Direct Studio Express</h4>
                      <p className="text-[11px] text-stone-500">Independent vendors dispatch via courier within 24 hours.</p>
                    </div>
                  </div>
                  <span className="font-semibold text-obsidian-400">₹100 Total</span>
                </div>

                <button onClick={() => setStep(3)} className="bg-obsidian-400 text-cream-50 px-6 py-2.5 rounded uppercase tracking-editorial font-semibold">
                  Continue to Payment →
                </button>
              </div>
            )}
          </div>

          {/* STEP 03: PAYMENT */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 flex items-center justify-between">
              <span>03 PAYMENT METHOD</span>
              {step > 3 && <button onClick={() => setStep(3)} className="text-xs text-stone-500 underline font-sans font-normal">Edit</button>}
            </h3>

            {step === 3 && (
              <div className="space-y-4 text-xs pt-2">
                <div className="p-4 bg-cream-50 rounded border border-stone-300 space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-obsidian-400" />
                    <span className="font-bold text-obsidian-400">Razorpay / Credit Card / UPI / NetBanking</span>
                  </div>
                  <p className="text-[11px] text-stone-500">256-bit encrypted secure transaction gateway.</p>
                </div>

                <button onClick={() => setStep(4)} className="bg-obsidian-400 text-cream-50 px-6 py-2.5 rounded uppercase tracking-editorial font-semibold">
                  Review Order →
                </button>
              </div>
            )}
          </div>

          {/* STEP 04: REVIEW & PLACE ORDER */}
          {step === 4 && (
            <div className="bg-cream-100 p-6 rounded-xl border border-stone-300 space-y-4">
              <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400">
                04 CONFIRM MULTI-VENDOR ORDER
              </h3>
              <p className="text-xs text-stone-600 font-light">
                By clicking "Place Order", your selection will be processed and independent sub-orders generated for each vendor.
              </p>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-accent-emerald hover:bg-emerald-700 text-white py-4 rounded text-xs uppercase tracking-superwide font-bold shadow-soft transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order (₹{cartGrandTotal.toLocaleString('en-IN')})</span>
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Multi-Vendor Order Breakdown Summary */}
        <div className="lg:col-span-4">
          <div className="bg-cream-100/70 p-6 rounded-xl border border-stone-200 space-y-6 sticky top-24">
            <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-300 pb-3">
              ORDER ITEMS ({cartByVendor.length} Vendors)
            </h3>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {cartByVendor.map((vg) => (
                <div key={vg.vendorId} className="space-y-2 border-b border-stone-200 pb-3 last:border-none text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-obsidian-400">
                    <span>{vg.vendorName}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
                  </div>
                  {vg.items.map((it) => (
                    <div key={it.product.id} className="flex justify-between text-stone-600">
                      <span>{it.quantity}x {it.product.name}</span>
                      <span>₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-stone-600 font-light pt-3 border-t border-stone-300">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{cartSubtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Multi-Vendor Delivery</span><span>₹{cartDeliveryFee.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-sm font-bold text-obsidian-400 pt-2 border-t border-stone-300">
                <span>TOTAL</span>
                <span>₹{cartGrandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
