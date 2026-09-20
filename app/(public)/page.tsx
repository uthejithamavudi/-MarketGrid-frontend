'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { VendorCard } from '@/components/VendorCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export default function HomePage() {
  const { productsList, categoriesList, vendorsList, isLoadingData } = useApp();
  const featuredProducts = productsList.filter((p) => p.isFeatured);
  const newArrivals = productsList.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-cream-100/60 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Editorial Text */}
            <div className="lg:col-span-7 space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-50 border border-stone-300/80 text-xs font-medium text-stone-600">
                <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
                <span>Multi-Vendor Architectural Commerce</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-editorial leading-[1.05] text-obsidian-400">
                DISCOVER <br />
                <span className="italic font-normal text-stone-600">INDEPENDENT</span> <br />
                COMMERCE.
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-lg font-light leading-relaxed">
                Products worth finding. Connect directly with artisanal craftsmen, studio designers, and verified specialty vendors in one unified marketplace.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-8 py-4 rounded font-medium text-xs uppercase tracking-superwide transition-all shadow-soft flex items-center gap-3 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/vendors"
                  className="bg-transparent hover:bg-cream-200 text-obsidian-400 border border-stone-400 px-8 py-4 rounded font-medium text-xs uppercase tracking-superwide transition-colors"
                >
                  Explore Vendors
                </Link>
              </div>

              {/* Marketplace Trust Highlights */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-stone-300/60 text-xs text-stone-600">
                <div>
                  <span className="font-serif text-xl font-bold text-obsidian-400 block">380+</span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider">Independent Sellers</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-obsidian-400 block">100%</span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider">Verified Quality</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-obsidian-400 block">Unified</span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider">Multi-Vendor Cart</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Imagery Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Large Hero Image */}
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-elevated border border-stone-300 bg-stone-200 relative">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=80"
                    alt="Solace Studio Lounge Chair"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-500/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-cream-50 space-y-1">
                    <span className="text-[10px] uppercase tracking-superwide font-medium text-cream-300">
                      Featured Vendor Showcase
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Solace Studio</h3>
                    <p className="text-xs text-stone-300">Architectural natural cane and solid oak lounge seating.</p>
                  </div>
                </div>

                {/* Floating Product Card Badge */}
                <div className="absolute -bottom-6 -left-6 bg-cream-50 p-4 rounded-lg shadow-elevated border border-stone-200 hidden sm:flex items-center gap-3 max-w-xs animate-bounce-slow">
                  <img
                    src={productsList[0]?.images[0] ?? ''}
                    alt="Cowboy 4"
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-obsidian-400">Cowboy 4 Electric Bike</h4>
                    <p className="text-[11px] text-stone-500">TechVerse Studio • ₹1,49,999</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
              Curated Taxonomy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
              FEATURED COLLECTIONS
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs uppercase tracking-editorial font-semibold text-obsidian-400 hover:text-stone-600 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED / TRENDING PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
              Handpicked Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
              TRENDING PRODUCTS
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase tracking-editorial font-semibold text-obsidian-400 hover:text-stone-600 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED VENDOR SPOTLIGHT STORY SECTION */}
      <section className="bg-obsidian-400 text-cream-50 py-20 border-y border-obsidian-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-superwide text-accent-gold font-semibold">
                Vendor Spotlight
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-editorial text-cream-50 leading-tight">
                TECHVERSE <br />
                <span className="italic font-normal text-stone-400">STUDIO DESKWARE</span>
              </h2>

              <p className="text-stone-300 text-sm leading-relaxed font-light">
                "We believe technology should fit into the human habitat with elegance and tactile calm." Founded in 2024, TechVerse crafts E-Ink typewriters, wireless keyboards, and precision desk organizers.
              </p>

              <div className="pt-2 flex items-center gap-6 text-xs text-stone-400 border-t border-stone-800">
                <div>
                  <span className="text-cream-50 font-serif text-xl font-bold block">4.9 ★</span>
                  <span>Customer Rating</span>
                </div>
                <div>
                  <span className="text-cream-50 font-serif text-xl font-bold block">1,280+</span>
                  <span>Orders Fulfilled</span>
                </div>
              </div>

              <Link
                href="/vendors/techverse"
                className="inline-block bg-cream-50 text-obsidian-400 hover:bg-cream-200 px-6 py-3 rounded font-medium text-xs uppercase tracking-editorial transition-colors"
              >
                Visit TechVerse Storefront →
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <img
                src={productsList[2]?.images[0] ?? productsList[0]?.images[0] ?? ''}
                alt="TechVerse Typewriter"
                className="w-full h-64 object-cover rounded-lg border border-stone-800"
              />
              <img
                src={productsList[0]?.images[0] ?? ''}
                alt="TechVerse Bike"
                className="w-full h-64 object-cover rounded-lg border border-stone-800 mt-6"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. VENDORS DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
              Verified Studios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
              INDEPENDENT VENDORS
            </h2>
          </div>
          <Link
            href="/vendors"
            className="text-xs uppercase tracking-editorial font-semibold text-obsidian-400 hover:text-stone-600 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>Browse All Vendors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendorsList.slice(0, 3).map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* 6. WHY MARKETGRID (MULTI-VENDOR MARKETPLACE STORY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 rounded-xl p-8 sm:p-12 border border-stone-300/60">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <span className="text-xs uppercase tracking-superwide font-semibold text-stone-500">
              Architectural Marketplace Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
              WHY MARKETGRID?
            </h2>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Unlike traditional monolithic retailers, MarketGrid directly connects you with independent studios. Add items from multiple sellers into one cart, and track each vendor's fulfillment progress in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-cream-50 rounded-lg border border-stone-200 space-y-2">
              <ShieldCheck className="w-8 h-8 text-accent-emerald mx-auto" />
              <h4 className="font-serif font-bold text-lg text-obsidian-400">Verified Sellers</h4>
              <p className="text-xs text-stone-500 font-light">Every seller undergoes KYC and craftsmanship quality audits.</p>
            </div>

            <div className="p-6 bg-cream-50 rounded-lg border border-stone-200 space-y-2">
              <Truck className="w-8 h-8 text-accent-amber mx-auto" />
              <h4 className="font-serif font-bold text-lg text-obsidian-400">Multi-Vendor Cart</h4>
              <p className="text-xs text-stone-500 font-light">Combine products from separate vendors in a single effortless checkout.</p>
            </div>

            <div className="p-6 bg-cream-50 rounded-lg border border-stone-200 space-y-2">
              <RefreshCw className="w-8 h-8 text-accent-forest mx-auto" />
              <h4 className="font-serif font-bold text-lg text-obsidian-400">Live Delivery Timeline</h4>
              <p className="text-xs text-stone-500 font-light">Track independent vendor shipping and dispatch statuses transparently.</p>
            </div>

            <div className="p-6 bg-cream-50 rounded-lg border border-stone-200 space-y-2">
              <Award className="w-8 h-8 text-accent-terracotta mx-auto" />
              <h4 className="font-serif font-bold text-lg text-obsidian-400">Direct Support</h4>
              <p className="text-xs text-stone-500 font-light">Your order directly powers independent artisans and creators.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
