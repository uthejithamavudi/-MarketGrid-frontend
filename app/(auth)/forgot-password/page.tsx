'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ForgotPasswordPage() {
  const { showToast } = useApp();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Reset Instructions Sent', 'Check your email inbox.', 'info');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-cream-50 rounded-xl p-8 shadow-elevated border border-stone-200 space-y-6">
        <h1 className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400 text-center">FORGOT PASSWORD</h1>
        {sent ? (
          <div className="text-center space-y-3 text-xs text-stone-600">
            <p>Password reset link has been dispatched to your email address.</p>
            <Link href="/login" className="inline-block text-obsidian-400 font-semibold underline">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Email Address</label>
              <input type="email" required placeholder="name@example.com" className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400" />
            </div>
            <button type="submit" className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded uppercase tracking-editorial font-semibold transition-colors">
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
