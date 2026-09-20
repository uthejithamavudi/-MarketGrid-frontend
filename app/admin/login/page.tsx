'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { initiateOtpAuth, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = email || 'admin@marketgrid.io';

    setIsSubmitting(true);
    const sent = await initiateOtpAuth(adminEmail, 'admin');
    setIsSubmitting(false);

    if (sent) {
      showToast('Admin 2FA Security Passkey Sent', `2FA OTP code sent to ${adminEmail}`, 'info');
      router.push(`/verify-otp?role=admin&email=${encodeURIComponent(adminEmail)}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-stone-900 rounded-xl p-8 shadow-2xl border border-stone-800 space-y-6 text-stone-200">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="font-serif text-3xl font-bold tracking-editorial text-cream-50 block">
            MARKETGRID
          </Link>

          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full inline-block mb-1 border border-emerald-800">
              Admin Governance Portal
            </span>
            <h2 className="font-serif text-xl font-bold text-white">Admin Portal Sign In</h2>
            <p className="text-xs text-stone-400 font-light mt-1">Platform governance & seller KYC verification desk</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-stone-400 mb-1">
              Admin Master Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@marketgrid.io"
              className="w-full bg-stone-950 p-3 rounded border border-stone-800 text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-mono text-[11px] uppercase tracking-wider text-stone-400">Master Password</label>
              <Link href="/forgot-password" className="text-stone-500 hover:text-stone-300">Forgot?</Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-stone-950 p-3 rounded border border-stone-800 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-mono font-bold uppercase py-3 rounded text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-soft disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Proceed to Verification</span>
                <KeyRound className="w-4 h-4 text-stone-950" />
              </>
            )}
          </button>
        </form>

        {/* Links */}
        <div className="pt-3 border-t border-stone-800 text-[11px] text-center text-stone-500 font-mono">
          <span>MarketGrid Governance Console • Restricted Admin System</span>
        </div>

      </div>
    </div>
  );
}
