'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Vendors', href: '/vendors' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-50/90 backdrop-blur-md shadow-soft border-b border-stone-200/50 py-3.5'
          : 'bg-cream-50 border-b border-stone-200/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-obsidian-400 hover:text-stone-600 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-editorial text-obsidian-400">
            MARKETGRID
          </span>
          <span className="text-[10px] tracking-superwide font-sans text-stone-500 uppercase border-l border-stone-300 pl-2 hidden sm:inline-block">
            Curated Independent Commerce
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-editorial font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-obsidian-400 font-semibold'
                    : 'text-stone-600 hover:text-obsidian-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-obsidian-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link
            href="/search"
            className="p-2 text-obsidian-400 hover:text-stone-600 transition-colors"
            aria-label="Search products"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>

          <Link
            href="/customer/wishlist"
            className="p-2 text-obsidian-400 hover:text-stone-600 transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-amber rounded-full" />
            )}
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-obsidian-400 hover:text-stone-600 transition-colors relative flex items-center gap-1.5"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="bg-obsidian-400 text-cream-50 text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            href="/customer/account"
            className="p-2 text-obsidian-400 hover:text-stone-600 transition-colors hidden sm:block"
            aria-label="Account"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-cream-50 px-6 py-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-editorial font-medium text-obsidian-400 py-2 border-b border-stone-200/50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/customer/account"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-editorial font-medium text-stone-600 py-2"
          >
            My Account
          </Link>
        </div>
      )}
    </header>
  );
};

