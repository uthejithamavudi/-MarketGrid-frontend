'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function ProductsPage() {
  const { productsList, vendorsList } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(200000);

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory;

      const matchesVendor =
        selectedVendor === 'all' || product.vendorId === selectedVendor;

      const matchesPrice = product.price <= priceMax;

      return matchesSearch && matchesCategory && matchesVendor && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured/default
    });
  }, [productsList, searchQuery, selectedCategory, selectedVendor, priceMax, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedVendor('all');
    setPriceMax(200000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-[11px] uppercase tracking-superwide font-semibold text-stone-500">
          Independent Marketplace Catalog
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-editorial text-obsidian-400">
          ALL PRODUCTS
        </h1>
        <p className="text-stone-600 text-sm font-light max-w-xl">
          Browse curated objects, electronics, furniture, and hand-stitched leather goods from independent studios.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-stone-100 rounded-lg p-4 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products or vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream-50 text-xs pl-9 pr-4 py-2.5 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-obsidian-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-cream-50 text-xs px-3 py-2.5 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
          >
            <option value="all">All Categories</option>
            <option value="c1">Electronics & Audio</option>
            <option value="c2">Furniture & Living</option>
            <option value="c3">Leather Goods & Carry</option>
            <option value="c4">Apparel & Objects</option>
          </select>

          {/* Vendor Filter */}
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="bg-cream-50 text-xs px-3 py-2.5 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
          >
            <option value="all">All Vendors</option>
            {vendorsList.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-cream-50 text-xs px-3 py-2.5 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {(selectedCategory !== 'all' || selectedVendor !== 'all' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-xs text-accent-terracotta hover:underline font-medium px-2 py-1"
            >
              Clear Filters
            </button>
          )}
        </div>

      </div>

      {/* Showing Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
        <span>Showing {filteredProducts.length} of {productsList.length} products</span>
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-stone-50 rounded-lg border border-stone-200">
          <SlidersHorizontal className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-obsidian-400">No products found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing category filters.
          </p>
          <button
            onClick={clearFilters}
            className="bg-obsidian-400 text-cream-50 px-5 py-2.5 rounded text-xs uppercase tracking-editorial font-medium hover:bg-obsidian-300"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
