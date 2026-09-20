'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

interface AuthGuardProps {
  requiredRole: 'vendor' | 'admin';
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ requiredRole, children }) => {
  const router = useRouter();
  const { role, isAuthenticated, userEmail, vendorsList } = useApp();

  const isAllowed = isAuthenticated && role === requiredRole;

  // Find vendor details if user is attempting vendor access
  const currentVendor = requiredRole === 'vendor' ? vendorsList.find((v) => v.ownerEmail === userEmail || v.status === 'ACTIVE') : null;
  const isPendingVendor = requiredRole === 'vendor' && isAuthenticated && currentVendor?.status === 'PENDING';

  useEffect(() => {
    if (!isAuthenticated || role !== requiredRole) {
      if (!isPendingVendor) {
        const targetPath = requiredRole === 'admin' ? '/admin/login' : '/vendor/login';
        router.push(targetPath);
      }
    }
  }, [isAuthenticated, role, requiredRole, isPendingVendor, router]);

  if (isPendingVendor) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-stone-100">
        <div className="max-w-md w-full bg-cream-50 rounded-xl p-8 shadow-elevated border border-amber-300 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center mx-auto animate-pulse">
            <ShieldAlert className="w-8 h-8 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-superwide font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Registration Status: Pending Approval
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-editorial text-obsidian-400">
              VENDOR APPROVAL IN PROGRESS
            </h2>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Your vendor registration application for <span className="font-semibold text-obsidian-400">{currentVendor?.name || 'your store'}</span> has been received and is currently under review by MarketGrid Administrators.
            </p>
          </div>

          <div className="bg-amber-50/80 p-4 rounded-lg border border-amber-200 text-left text-xs space-y-1 text-amber-900">
            <p className="font-semibold">What happens next?</p>
            <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-1">
              <li>Admins verify your business credentials and catalog details.</li>
              <li>Once accepted, your store will be activated automatically.</li>
              <li>You can log in to the Admin Portal to approve this account in demo mode.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/admin/login"
              className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft"
            >
              <span>Go to Admin Governance Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="text-stone-400 font-mono text-xs flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin"></div>
          <span>Redirecting to {requiredRole.toUpperCase()} Portal Login...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

