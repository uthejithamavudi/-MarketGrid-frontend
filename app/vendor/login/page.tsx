'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { KeyRound, Building2, ArrowRight } from 'lucide-react';

export default function VendorLoginPage() {
  const router = useRouter();
  const { initiateOtpAuth, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVendorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const vendorEmail = email || 'vendor@techverse.io';

    setIsSubmitting(true);
    const sent = await initiateOtpAuth(vendorEmail, 'vendor');
    setIsSubmitting(false);

    if (sent) {
      showToast('2FA Passkey Dispatched', `OTP code sent to ${vendorEmail}`, 'info');
      router.push(`/verify-otp?role=vendor&email=${encodeURIComponent(vendorEmail)}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-cream-50 rounded-xl p-8 shadow-elevated border border-amber-300 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400 block">
            MARKETGRID
          </Link>

          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-amber-900 bg-amber-100 px-3 py-1 rounded-full inline-block mb-1 border border-amber-300">
              Vendor Studio Portal
            </span>
            <h2 className="font-serif text-xl font-bold text-obsidian-400">Vendor Partner Sign In</h2>
            <p className="text-xs text-stone-500 font-light mt-1">Manage catalog listings, customer orders, and payouts</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleVendorLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">
              Vendor Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vendor@techverse.io"
              className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400 font-medium"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold uppercase tracking-editorial text-stone-600">Password</label>
              <Link href="/forgot-password" className="text-stone-400 hover:text-obsidian-400">Forgot?</Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-800 hover:bg-amber-900 text-cream-50 py-3 rounded uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Sending Code...</span>
            ) : (
              <>
                <span>Proceed to Verification</span>
                <KeyRound className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>
        </form>

        {/* Links */}
        <div className="pt-3 border-t border-stone-200 text-xs text-center text-stone-500 font-sans">
          <div>
            Want to sell on MarketGrid?{' '}
            <Link href="/register?role=vendor" className="font-semibold text-amber-900 underline">
              Apply for Vendor Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
