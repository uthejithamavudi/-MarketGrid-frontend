'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { showToast } = useApp();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Password Updated', 'Your password has been changed successfully.', 'success');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-cream-50 rounded-xl p-8 shadow-elevated border border-stone-200 space-y-6">
        <h1 className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400 text-center">RESET PASSWORD</h1>
        <form onSubmit={handleReset} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">New Password</label>
            <input type="password" required placeholder="••••••••" className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400" />
          </div>
          <div>
            <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Confirm New Password</label>
            <input type="password" required placeholder="••••••••" className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400" />
          </div>
          <button type="submit" className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded uppercase tracking-editorial font-semibold transition-colors">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
