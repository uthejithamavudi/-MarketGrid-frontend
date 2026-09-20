'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  Building2,
  PackageCheck,
  FolderTree,
  ShoppingBag,
  BarChart3,
  Bell,
  SlidersHorizontal,
  ShieldCheck,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AdminSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { logout, userEmail } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Vendors', href: '/admin/vendors', icon: Building2 },
    { label: 'Products', href: '/admin/products', icon: PackageCheck },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Notifications', href: '/admin/notifications', icon: Bell },
    { label: 'Settings', href: '/admin/settings', icon: SlidersHorizontal },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Mobile Top Header Bar */}
      <div className="md:hidden bg-stone-900 text-cream-50 p-4 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="font-serif font-bold text-lg tracking-editorial">
            MarketGrid Admin
          </span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-1 text-stone-300 hover:text-white">
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Collapsible Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-30 h-screen bg-stone-900 text-cream-100 flex flex-col justify-between border-r border-stone-800 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Admin Header Banner with Toggle Button */}
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-10 h-10 shrink-0 rounded bg-emerald-950 border border-emerald-700/50 flex items-center justify-center font-bold text-emerald-400 font-serif">
                MG
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden transition-all duration-300">
                  <h2 className="font-serif font-bold text-cream-50 text-sm leading-tight whitespace-nowrap">
                    ADMIN CONTROL
                  </h2>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-wider block">
                    Governance Desk
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
                      ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-cream-50 hover:bg-stone-800/80'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer & Logout Section */}
        <div className="p-3 border-t border-stone-800 space-y-2">
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

          {!isCollapsed && (
            <div className="px-1 text-[10px] text-stone-500 font-mono overflow-hidden whitespace-nowrap">
              <p>Session: {userEmail || 'admin@marketgrid.io'}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
