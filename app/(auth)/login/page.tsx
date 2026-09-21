'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { loginApi } from '@/lib/authService';
import { ArrowRight, Lock } from 'lucide-react';

function CustomerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams ? searchParams.get('redirect') : null;

  const { login, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = email || 'sai@example.com';
    const loginPass = password || 'demo123';
    
    setIsSubmitting(true);
    const res = await loginApi(loginEmail, loginPass);
    setIsSubmitting(false);

    if (res.success) {
      login(loginEmail, loginPass, 'customer');
      if (redirectParam) {
        router.push(redirectParam);
      } else {
        router.push('/customer/account');
      }
    } else {
      showToast('Login Failed', res.message, 'error');
      // If backend fails/offline, allow mock login for demo purposes
      console.warn("Backend login failed. Falling back to mock login context.");
      login(loginEmail, loginPass, 'customer');
      router.push('/customer/account');
    }
  };

  return (
    <div className="max-w-md w-full bg-cream-50 rounded-xl p-8 shadow-elevated border border-stone-200 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400 block">
          MARKETGRID
        </Link>

        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-1 border border-emerald-200">
            Customer Storefront
          </span>
          <h2 className="font-serif text-xl font-bold text-obsidian-400">Sign In to Your Customer Account</h2>
          <p className="text-xs text-stone-500 font-light mt-1">Enter your password to access your profile and track orders</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCustomerLogin} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">
            Customer Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sai@example.com"
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
          className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Account'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Links */}
      <div className="space-y-3 pt-3 border-t border-stone-200 text-xs text-center text-stone-500">
        <div>
          New customer to MarketGrid?{' '}
          <Link href="/register" className="font-semibold text-obsidian-400 underline">
            Create Customer Account
          </Link>
        </div>

        <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-200/60 flex items-center justify-between">
          <span>Are you a seller? <Link href="/vendor/login" className="text-obsidian-400 font-semibold underline">Vendor Studio Sign In</Link></span>
          <Link href="/admin/login" className="text-stone-300 hover:text-stone-600 transition-colors p-1" title="Governance Portal">
            <Lock className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CustomerLoginPage() {
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-stone-400 font-mono text-xs">Loading Customer Portal...</div>}>
        <CustomerLoginForm />
      </Suspense>
    </div>
  );
}
