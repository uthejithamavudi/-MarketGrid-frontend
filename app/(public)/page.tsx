'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { VendorCard } from '@/components/VendorCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Award, AlertTriangle, RotateCcw } from 'lucide-react';

// ---------------------------------------------------------------------------
// Framer Motion Variants
// ---------------------------------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const heroTextVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const sectionHeadingVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ---------------------------------------------------------------------------
// Skeleton Components
// ---------------------------------------------------------------------------

const ProductSkeleton = () => (
  <div className="card-premium rounded-card p-3 space-y-3">
    <div className="skeleton aspect-square w-full rounded-xl" />
    <div className="skeleton h-3 w-2/3 rounded" />
    <div className="skeleton h-4 w-full rounded" />
    <div className="skeleton h-4 w-4/5 rounded" />
    <div className="flex justify-between pt-2 border-t border-stone-200/50">
      <div className="skeleton h-4 w-20 rounded" />
      <div className="skeleton h-4 w-14 rounded-full" />
    </div>
  </div>
);

const CategorySkeleton = () => (
  <div className="skeleton h-80 w-full rounded-card-lg" />
);

const VendorSkeleton = () => (
  <div className="card-premium rounded-card-lg overflow-hidden">
    <div className="skeleton h-28 w-full" />
    <div className="p-5 space-y-3">
      <div className="flex items-end gap-3 -mt-10">
        <div className="skeleton w-14 h-14 rounded-full" />
      </div>
      <div className="skeleton h-5 w-1/2 rounded" />
      <div className="skeleton h-3 w-full rounded" />
    </div>
    <div className="px-5 py-3 border-t border-stone-200/50 flex justify-between">
      <div className="skeleton h-3 w-16 rounded" />
      <div className="skeleton h-3 w-20 rounded" />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Error Section
// ---------------------------------------------------------------------------

const ErrorSection: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <motion.section
    className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center"
      animate={{ rotate: [0, -5, 5, -5, 0] }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <AlertTriangle className="w-8 h-8 text-red-500" />
    </motion.div>
    <h2 className="font-serif text-3xl font-bold text-obsidian-400">
      Unable to Connect
    </h2>
    <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto">
      {message || 'We couldn\'t reach the MarketGrid backend. Please check your connection and try again.'}
    </p>
    <motion.button
      onClick={onRetry}
      className="inline-flex items-center gap-2 bg-obsidian-400 text-cream-50 px-8 py-3.5 rounded-full font-medium text-xs uppercase tracking-superwide hover:bg-obsidian-300 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <RotateCcw className="w-4 h-4" />
      <span>Retry Connection</span>
    </motion.button>
  </motion.section>
);

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

const EmptyState: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <motion.div
    className="text-center py-16 space-y-3"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <p className="font-serif text-xl text-stone-400">{title}</p>
    <p className="text-xs text-stone-400">{description}</p>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------

export default function HomePage() {
  const { productsList, categoriesList, vendorsList, isLoadingData, hasError, errorMessage, retryLoadData } = useApp();
  const featuredProducts = productsList.filter((p) => p.isFeatured);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : productsList.slice(0, 4);

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 1], ["0rem", "3rem"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentPullUp = useTransform(scrollYProgress, [0, 0.5], [0, -180]);
  // No full-page error blocker — hero and static content always render.
  // Each data section handles its own empty state inline.

  return (
    <div className="space-y-0 pb-20">

      {/* ============================================================ */}
      {/* 1. EDITORIAL HERO SECTION — Framer Motion orchestrated entry */}
      {/* ============================================================ */}
      <motion.section
        ref={heroRef}
        className="sticky top-0 z-0 pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-cream-100/60 border-b border-stone-200/50 min-h-[85vh] flex items-center origin-top"
        style={{ 
          opacity: heroOpacity, 
          scale: heroScale, 
          borderRadius: heroBorderRadius 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Hero Editorial Text */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50 border border-stone-300/80 text-xs font-medium text-stone-600"
                custom={0}
                variants={heroTextVariants}
                initial="hidden"
                animate="visible"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
                <span>Multi-Vendor Architectural Commerce</span>
              </motion.div>

              <motion.h1
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tightest leading-[1.05] text-obsidian-400"
                custom={1}
                variants={heroTextVariants}
                initial="hidden"
                animate="visible"
              >
                DISCOVER <br />
                <span className="italic font-normal text-stone-500">INDEPENDENT</span> <br />
                COMMERCE.
              </motion.h1>

              <motion.p
                className="text-stone-600 text-base sm:text-lg max-w-lg font-light leading-relaxed"
                custom={2}
                variants={heroTextVariants}
                initial="hidden"
                animate="visible"
              >
                Products worth finding. Connect directly with artisanal craftsmen, studio designers, and verified specialty vendors in one unified marketplace.
              </motion.p>

              <motion.div
                className="pt-4 flex flex-wrap items-center gap-4"
                custom={3}
                variants={heroTextVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/products"
                  className="bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 px-8 py-4 rounded-full font-medium text-xs uppercase tracking-superwide transition-all shadow-soft flex items-center gap-3 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/vendors"
                  className="bg-transparent hover:bg-cream-200 text-obsidian-400 border border-stone-400 px-8 py-4 rounded-full font-medium text-xs uppercase tracking-superwide transition-colors"
                >
                  Explore Vendors
                </Link>
              </motion.div>

              {/* Marketplace Trust Highlights */}
              <motion.div
                className="pt-8 grid grid-cols-3 gap-4 border-t border-stone-300/60 text-xs text-stone-600"
                custom={4}
                variants={heroTextVariants}
                initial="hidden"
                animate="visible"
              >
                <div>
                  <span className="font-serif text-2xl font-bold text-obsidian-400 block">380+</span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider">Independent Sellers</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-obsidian-400 block">100%</span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider">Verified Quality</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-obsidian-400 block">Unified</span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider">Multi-Vendor Cart</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Imagery */}
            <motion.div
              className="lg:col-span-5 relative"
              style={{ y: heroParallaxY }}
              custom={2}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Large Hero Image */}
                <div className="aspect-[4/5] rounded-card-lg overflow-hidden shadow-elevated border border-stone-300 bg-stone-200 relative">
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
                {productsList.length > 0 && (
                  <motion.div
                    className="absolute -bottom-6 -left-6 bg-cream-50 p-4 rounded-card shadow-elevated border border-stone-200 hidden sm:flex items-center gap-3 max-w-xs"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img
                      src={productsList[0]?.images[0] ?? ''}
                      alt={productsList[0]?.name ?? 'Featured Product'}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-obsidian-400 line-clamp-1">{productsList[0]?.name ?? 'Featured Product'}</h4>
                      <p className="text-[11px] text-stone-500">{productsList[0]?.vendorName ?? 'MarketGrid'} • ₹{productsList[0]?.price?.toLocaleString('en-IN') ?? '0'}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* HERO → SECTION 2 TRANSITION (PREMIUM MARQUEE) */}
      {/* ============================================================ */}
      <motion.div style={{ y: contentPullUp }} className="relative z-10 flex flex-col">
        <div className="w-full overflow-hidden bg-obsidian-400 py-4 border-y border-stone-300 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {Array(8).fill("CURATED INDEPENDENT COMMERCE • ARCHITECTURAL DESIGN • VERIFIED ARTISANS • PREMIUM MATERIALS • ").map((text, i) => (
            <span key={i} className="text-cream-50 font-sans text-xs uppercase tracking-superwide px-4">
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. FEATURED CATEGORIES SECTION (INNER CARD) */}
      {/* ============================================================ */}
      <div className="bg-[#F5E6D3] rounded-t-[3rem] sm:rounded-t-[4rem] -mt-2 relative z-10 pt-10 pb-4">
        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-stone-200 pb-4"
          variants={sectionHeadingVariant}
        >
          <div>
            <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
              Curated Taxonomy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tightest text-obsidian-400">
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
        </motion.div>

        {isLoadingData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => <CategorySkeleton key={i} />)}
          </div>
        ) : categoriesList.length > 0 ? (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer}>
            {categoriesList.map((cat) => (
              <motion.div key={cat.id} variants={staggerItem}>
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState title="No categories yet" description="Categories will appear here once available from the backend." />
        )}
      </motion.section>

      {/* ============================================================ */}
      {/* 3. FEATURED / TRENDING PRODUCTS GRID */}
      {/* ============================================================ */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-20 border-t border-stone-200/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-stone-200 pb-4"
          variants={sectionHeadingVariant}
        >
          <div>
            <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
              Handpicked Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tightest text-obsidian-400">
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
        </motion.div>

        {isLoadingData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => <ProductSkeleton key={i} />)}
          </div>
        ) : displayProducts.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer}>
            {displayProducts.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState title="No products available yet" description="Products will appear here once your backend serves them." />
        )}
      </motion.section>

      {/* ============================================================ */}
      {/* 4. FEATURED VENDOR SPOTLIGHT STORY SECTION */}
      {/* ============================================================ */}
      {vendorsList.length > 0 && (
        <motion.section
          className="bg-obsidian-400 text-cream-50 py-20 border-y border-obsidian-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <motion.div className="lg:col-span-5 space-y-6" variants={fadeInUp}>
                <span className="text-xs uppercase tracking-superwide text-accent-gold font-semibold">
                  Vendor Spotlight
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tightest text-cream-50 leading-tight">
                  {vendorsList[0]?.name?.toUpperCase() ?? 'VENDOR'} <br />
                  <span className="italic font-normal text-stone-400">STUDIO SPOTLIGHT</span>
                </h2>

                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  {vendorsList[0]?.description ?? 'Discover curated products from our featured vendor.'}
                </p>

                <div className="pt-2 flex items-center gap-6 text-xs text-stone-400 border-t border-stone-800">
                  <div>
                    <span className="text-cream-50 font-serif text-xl font-bold block">{vendorsList[0]?.rating ?? '—'} ★</span>
                    <span>Customer Rating</span>
                  </div>
                  <div>
                    <span className="text-cream-50 font-serif text-xl font-bold block">{vendorsList[0]?.totalOrders?.toLocaleString() ?? '—'}+</span>
                    <span>Orders Fulfilled</span>
                  </div>
                </div>

                <Link
                  href={`/vendors/${vendorsList[0]?.slug ?? ''}`}
                  className="inline-block bg-cream-50 text-obsidian-400 hover:bg-cream-200 px-6 py-3 rounded-full font-medium text-xs uppercase tracking-editorial transition-colors"
                >
                  Visit Storefront →
                </Link>
              </motion.div>

              <motion.div
                className="lg:col-span-7 grid grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                {productsList.slice(0, 2).map((product, idx) => (
                  <motion.img
                    key={product.id}
                    src={product.images[0]}
                    alt={product.name}
                    className={`w-full h-64 object-cover rounded-card-lg border border-stone-800 ${idx === 1 ? 'mt-6' : ''}`}
                    variants={staggerItem}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </motion.div>

            </div>
          </div>
        </motion.section>
      )}

      {/* ============================================================ */}
      {/* 5. VENDORS DIRECTORY PREVIEW */}
      {/* ============================================================ */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-stone-200 pb-4"
          variants={sectionHeadingVariant}
        >
          <div>
            <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
              Verified Studios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tightest text-obsidian-400">
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
        </motion.div>

        {isLoadingData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <VendorSkeleton key={i} />)}
          </div>
        ) : vendorsList.length > 0 ? (
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerContainer}>
            {vendorsList.slice(0, 3).map((vendor) => (
              <motion.div key={vendor.id} variants={staggerItem}>
                <VendorCard vendor={vendor} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState title="No vendors registered yet" description="Vendors will appear here once available from the backend." />
        )}
      </motion.section>

      {/* ============================================================ */}
      {/* 6. WHY MARKETGRID */}
      {/* ============================================================ */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeInUp}
      >
        <div className="bg-stone-100 rounded-card-lg p-8 sm:p-12 border border-stone-300/60">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <span className="text-xs uppercase tracking-superwide font-semibold text-stone-500">
              Architectural Marketplace Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tightest text-obsidian-400">
              WHY MARKETGRID?
            </h2>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Unlike traditional monolithic retailers, MarketGrid directly connects you with independent studios. Add items from multiple sellers into one cart, and track each vendor's fulfillment progress in real-time.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: ShieldCheck, color: 'text-accent-emerald', title: 'Verified Sellers', desc: 'Every seller undergoes KYC and craftsmanship quality audits.' },
              { icon: Truck, color: 'text-accent-amber', title: 'Multi-Vendor Cart', desc: 'Combine products from separate vendors in a single effortless checkout.' },
              { icon: RefreshCw, color: 'text-accent-forest', title: 'Live Delivery Timeline', desc: 'Track independent vendor shipping and dispatch statuses transparently.' },
              { icon: Award, color: 'text-accent-terracotta', title: 'Direct Support', desc: 'Your order directly powers independent artisans and creators.' },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="p-6 bg-cream-50 rounded-card border border-stone-200 space-y-2 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                variants={staggerItem}
              >
                <item.icon className={`w-8 h-8 ${item.color} mx-auto`} />
                <h4 className="font-serif font-bold text-lg text-obsidian-400">{item.title}</h4>
                <p className="text-xs text-stone-500 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      </div>
      </motion.div>

    </div>
  );
}
