'use client';

import React from 'react';
import Link from 'next/link';
import { Vendor } from '@/lib/types';
import { ShieldCheck, Star, Package, ArrowUpRight } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <div className="editorial-card rounded-lg overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Cover Image */}
        <div className="relative h-28 w-full bg-stone-200 overflow-hidden">
          <img
            src={vendor.coverImage}
            alt={vendor.name}
            className="w-full h-full object-cover img-zoom"
          />
          <div className="absolute inset-0 bg-obsidian-400/20" />
        </div>

        {/* Logo & Header Info */}
        <div className="px-5 pt-0 relative pb-4 border-b border-stone-200/60">
          <div className="-mt-7 mb-3 flex items-end justify-between">
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="w-14 h-14 rounded-full border-2 border-cream-50 object-cover shadow"
            />
            <Link
              href={`/vendors/${vendor.slug}`}
              className="p-1.5 rounded-full bg-cream-100 hover:bg-obsidian-400 hover:text-cream-50 text-obsidian-400 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <h3 className="font-serif text-xl font-bold text-obsidian-400">
              {vendor.name}
            </h3>
            {vendor.verified && (
              <ShieldCheck className="w-4 h-4 text-accent-emerald shrink-0" />
            )}
          </div>

          <p className="text-xs text-stone-500 font-light mt-1 line-clamp-2 leading-relaxed">
            {vendor.tagline}
          </p>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="px-5 py-3 bg-cream-100/50 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-1 font-medium">
          <Star className="w-3.5 h-3.5 fill-accent-amber text-accent-amber" />
          <span>{vendor.rating}</span>
          <span className="text-stone-400">({vendor.reviewsCount})</span>
        </div>

        <div className="flex items-center gap-1 text-stone-500 text-[11px]">
          <Package className="w-3.5 h-3.5" />
          <span>{vendor.totalProducts} Products</span>
        </div>
      </div>
    </div>
  );
};
