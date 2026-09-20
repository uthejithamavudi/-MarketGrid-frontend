'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';
import { Store, Building2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, setRole, isAuthenticated, userEmail, login, logout } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const activePortal =
    (isAuthenticated && role === 'vendor') || pathname.startsWith('/vendor')
      ? 'vendor'
      : (isAuthenticated && role === 'admin') || pathname.startsWith('/admin')
      ? 'admin'
      : 'customer';

  const handleRoleSwitch = (targetRole: UserRole) => {
    if (targetRole === 'customer') {
      router.push('/');
    } else if (targetRole === 'vendor') {
      router.push('/vendor/dashboard');
    } else if (targetRole === 'admin') {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="bg-obsidian-400 text-cream-50 text-xs py-2 px-4 flex flex-wrap items-center justify-between border-b border-obsidian-200 z-50 relative gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold tracking-wide uppercase text-[10px] text-stone-300">
          Role Access Guard • Live Multi-Tenant Demo:
        </span>
      </div>

      <div className="flex items-center gap-1 bg-obsidian-300 p-1 rounded-full border border-stone-800">
        <button
          onClick={() => handleRoleSwitch('customer')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-medium ${
            activePortal === 'customer'
              ? 'bg-cream-50 text-obsidian-400 shadow-sm font-bold'
              : 'text-stone-400 hover:text-cream-50'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Customer Storefront</span>
        </button>

        <button
          onClick={() => handleRoleSwitch('vendor')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-medium ${
            activePortal === 'vendor'
              ? 'bg-cream-50 text-obsidian-400 shadow-sm font-bold'
              : 'text-stone-400 hover:text-cream-50'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Vendor Portal (Protected)</span>
        </button>

        <button
          onClick={() => handleRoleSwitch('admin')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-medium ${
            activePortal === 'admin'
              ? 'bg-cream-50 text-obsidian-400 shadow-sm font-bold'
              : 'text-stone-400 hover:text-cream-50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Portal (Protected)</span>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-3 text-[11px] text-stone-400">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-[10px]">AUTH: {userEmail} ({role.toUpperCase()})</span>
            <button onClick={logout} className="underline text-stone-300 hover:text-white text-[10px]">Logout</button>
          </div>
        ) : (
          <span className="text-stone-400 text-[10px]">Guest Session • Security Active</span>
        )}
      </div>
    </div>
  );
};
