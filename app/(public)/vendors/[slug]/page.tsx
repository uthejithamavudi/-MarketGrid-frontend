'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { BackButton } from '@/components/BackButton';
import { ShieldCheck, Star } from 'lucide-react';

export default function VendorPublicPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { showToast, vendorsList, productsList } = useApp();

  const vendor = vendorsList.find((v) => v.slug === slug) || vendorsList[0];
  const vendorProducts = vendor ? productsList.filter((p) => p.vendorId === vendor.id) : [];
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    showToast(
      isFollowing ? `Unfollowed ${vendor?.name}` : `Following ${vendor?.name}`,
      isFollowing ? undefined : `You will now receive updates from ${vendor?.name}.`,
      'info'
    );
  };

  if (!vendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <BackButton label="← All Vendors" href="/vendors" />
        <p className="text-stone-500 text-sm">Vendor not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <BackButton label="← All Vendors" href="/vendors" />
      </div>

      {/* 1. VENDOR COVER & HERO BANNER */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 sm:h-80 w-full bg-stone-300 relative overflow-hidden border-b border-stone-300">
          <img
            src={vendor.coverImage}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-obsidian-400/30" />
        </div>

        {/* Vendor Header Box Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 bg-cream-50 rounded-xl p-6 sm:p-8 shadow-elevated border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-cream-50 object-cover shadow-md shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-editorial text-obsidian-400">
                    {vendor.name}
                  </h1>
                  {vendor.verified && (
                    <ShieldCheck className="w-5 h-5 text-accent-emerald shrink-0" />
                  )}
                </div>

                <p className="text-xs text-stone-600 font-light max-w-md">
                  {vendor.tagline}
                </p>

                <div className="flex items-center gap-4 text-xs text-stone-500 font-medium pt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-accent-amber text-accent-amber" />
                    <span className="font-bold text-obsidian-400">{vendor.rating}</span>
                    <span>({vendor.reviewsCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>Joined {vendor.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleFollowToggle}
                className={`flex-1 sm:flex-none px-6 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-all ${
                  isFollowing
                    ? 'bg-stone-200 text-stone-700 border border-stone-300'
                    : 'bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 shadow-soft'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow Studio'}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. ABOUT VENDOR & PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Vendor Bio */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-stone-100 rounded-lg border border-stone-200 space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-editorial text-obsidian-400 border-b border-stone-300 pb-2">
              ABOUT THE VENDOR
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              {vendor.description}
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-600 border-t border-stone-200">
              <div className="flex justify-between">
                <span className="font-medium text-stone-500">Studio Founder</span>
                <span className="font-semibold text-obsidian-400">{vendor.ownerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-500">Total Products</span>
                <span className="font-semibold text-obsidian-400">{vendor.totalProducts} Items</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-500">Fulfilled Orders</span>
                <span className="font-semibold text-obsidian-400">{vendor.totalOrders}+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Vendor Product Showcase */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl font-bold tracking-editorial text-obsidian-400">
              PRODUCTS BY {vendor.name.toUpperCase()} ({vendorProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
