'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 text-obsidian-400 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mx-auto text-obsidian-400 border border-stone-300">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <span className="font-mono text-sm uppercase tracking-superwide text-stone-500 block">
          404 — Page Not Found
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-editorial">
          LOOKS LIKE YOU'RE OFF THE GRID
        </h1>

        <p className="text-xs text-stone-600 font-light leading-relaxed">
          The product, vendor, or collection you are looking for may have moved or no longer exists.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-6 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto bg-cream-200 hover:bg-stone-300 text-obsidian-400 px-6 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
