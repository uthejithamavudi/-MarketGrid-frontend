'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  TrendingUp,
  CreditCard,
  UserCheck,
  Settings,
  Store,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const VendorSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { logout, userEmail } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/vendor/products', icon: Package },
    { label: 'Inventory', href: '/vendor/inventory', icon: Boxes },
    { label: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
    { label: 'Analytics', href: '/vendor/analytics', icon: TrendingUp },
    { label: 'Revenue', href: '/vendor/revenue', icon: CreditCard },
    { label: 'Profile', href: '/vendor/profile', icon: UserCheck },
    { label: 'Settings', href: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Mobile Top Header Bar */}
      <div className="md:hidden bg-obsidian-400 text-cream-50 p-4 flex items-center justify-between border-b border-obsidian-300">
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5 text-amber-400" />
          <span className="font-serif font-bold text-lg tracking-editorial">
            Vendor Portal
          </span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-1 text-stone-300 hover:text-white">
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Vendor Collapsible Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-30 h-screen bg-obsidian-400 text-cream-100 flex flex-col justify-between border-r border-obsidian-300 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Vendor Header Banner with Collapse Button */}
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-10 h-10 shrink-0 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-amber-400 font-serif">
                TV
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden transition-all duration-300">
                  <h2 className="font-serif font-bold text-cream-50 text-sm leading-tight whitespace-nowrap">
                    TechVerse
                  </h2>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-wider block">
                    Verified Studio
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse / Expand Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cream-50 text-obsidian-400 font-semibold shadow-sm'
                      : 'text-stone-400 hover:text-cream-50 hover:bg-stone-800/60'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link to Public Storefront & Logout */}
        <div className="p-3 border-t border-stone-800 space-y-1">
          <Link
            href="/vendors/techverse"
            title={isCollapsed ? 'View Storefront' : undefined}
            className={`flex items-center gap-3 text-xs text-stone-400 hover:text-cream-50 px-3 py-2 rounded hover:bg-stone-800/40 ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Public Storefront</span>}
          </Link>

          <button
            onClick={logout}
            title={isCollapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center gap-3 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 px-3 py-2 rounded transition-colors ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Vendor Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
