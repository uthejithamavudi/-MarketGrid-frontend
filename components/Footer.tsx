'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian-400 text-cream-100 pt-16 pb-12 border-t border-obsidian-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-obsidian-300">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-3xl font-bold tracking-editorial text-cream-50">
              MARKETGRID
            </h3>
            <p className="text-stone-400 text-sm max-w-sm leading-relaxed font-sans font-light">
              MarketGrid is a multi-tenant architectural commerce platform empowering independent creators, artisan studios, and specialty sellers.
            </p>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-superwide text-stone-500 font-medium">
                © 2026 MarketGrid Marketplace Inc. All rights reserved.
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-editorial text-cream-50 mb-4">
              Storefront
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/products" className="hover:text-cream-50 transition-colors">Catalog</Link></li>
              <li><Link href="/categories" className="hover:text-cream-50 transition-colors">Featured Categories</Link></li>
              <li><Link href="/vendors" className="hover:text-cream-50 transition-colors">Vendor Directory</Link></li>
              <li><Link href="/customer/wishlist" className="hover:text-cream-50 transition-colors">Wishlist</Link></li>
              <li><Link href="/customer/orders" className="hover:text-cream-50 transition-colors">Track Orders</Link></li>
            </ul>
          </div>

          {/* Vendors & Partners */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-editorial text-cream-50 mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/vendor/dashboard" className="hover:text-cream-50 transition-colors">Vendor Studio Portal</Link></li>
              <li><Link href="/register?role=vendor" className="hover:text-cream-50 transition-colors">Apply as Vendor Partner</Link></li>
              <li><Link href="/about" className="hover:text-cream-50 transition-colors">Seller Onboarding</Link></li>
              <li><Link href="/contact" className="hover:text-cream-50 transition-colors">Help & Inquiries</Link></li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-editorial text-cream-50 mb-4">
              Policies & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/privacy" className="hover:text-cream-50 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cream-50 transition-colors">Terms & Conditions</Link></li>
              <li><span className="text-stone-500">Security Standard HTTPS</span></li>
              <li><span className="text-stone-500">Multi-Vendor Dispatch</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms</Link>
            <span>Cookie Preferences</span>
          </div>
          <div className="flex items-center gap-3">
            <p>Designed for Multi-Vendor Independent Sellers.</p>
            <Link href="/admin/login" className="text-stone-600 hover:text-stone-300 transition-colors p-1" title="Governance Desk">
              <svg className="w-3 h-3 opacity-30 hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
