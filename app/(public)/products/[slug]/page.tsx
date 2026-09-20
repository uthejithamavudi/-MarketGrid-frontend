'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { BackButton } from '@/components/BackButton';
import { Star, ShieldCheck, Heart, ShoppingBag, Truck, RotateCcw, Award, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted, setIsCartOpen, productsList, vendorsList } = useApp();

  const slug = params?.slug as string;
  const product = productsList.find((p) => p.slug === slug) || productsList[0];
  const vendor = product ? vendorsList.find((v) => v.id === product.vendorId) : undefined;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantOption, setSelectedVariantOption] = useState<string>(
    product?.variants?.[0]?.options[0] || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'seller'>('desc');

  const wishlisted = product ? isWishlisted(product.id) : false;
  const relatedProducts = product
    ? productsList.filter(
        (p) => p.categoryId === product.categoryId && p.id !== product.id
      ).slice(0, 4)
    : [];

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity, selectedVariantOption);
    setIsCartOpen(false);
    router.push('/customer/checkout');
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <BackButton label="← Back to Products" href="/products" />
        <p className="text-stone-500 text-sm">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <BackButton label="← Back to Products" href="/products" />
      </div>
      
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-obsidian-400">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-obsidian-400">Catalog</Link>
        <span>/</span>
        <Link href={`/categories/${product.categoryId}`} className="hover:text-obsidian-400">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-obsidian-400 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-soft relative group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover img-zoom"
            />
            
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full bg-cream-50/90 backdrop-blur-sm transition-transform active:scale-90 ${
                wishlisted ? 'text-accent-terracotta' : 'text-stone-400 hover:text-obsidian-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-accent-terracotta' : ''}`} />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-obsidian-400 opacity-100' : 'border-stone-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Product Information & Purchase Box */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Vendor Header */}
            <Link
              href={`/vendors/${product.vendorSlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-editorial text-stone-600 hover:text-obsidian-400 mb-2"
            >
              <span>{product.vendorName}</span>
              <ShieldCheck className="w-4 h-4 text-accent-emerald" />
              <span className="text-[10px] text-stone-400 font-normal">Verified Independent Seller</span>
            </Link>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mt-2 text-xs text-stone-600 font-medium">
              <div className="flex items-center text-accent-amber">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-stone-100 rounded-lg border border-stone-200/80 flex items-baseline justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-sans text-obsidian-400">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through font-light ml-3">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {product.discountPercentage && (
              <span className="bg-obsidian-400 text-cream-50 text-xs font-semibold px-2.5 py-1 rounded tracking-wide uppercase">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-editorial text-stone-600">
                {product.variants[0].name}: <span className="text-obsidian-400">{selectedVariantOption}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants[0].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariantOption(opt)}
                    className={`px-4 py-2 rounded text-xs font-medium border transition-all ${
                      selectedVariantOption === opt
                        ? 'border-obsidian-400 bg-obsidian-400 text-cream-50 shadow-sm'
                        : 'border-stone-300 bg-cream-50 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded bg-cream-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 font-semibold text-xs text-obsidian-400">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  +
                </button>
              </div>

              <span className="text-xs font-medium text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded">
                ✓ In Stock ({product.stock} units available)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart(product, quantity, selectedVariantOption)}
                className="bg-cream-50 hover:bg-cream-200 text-obsidian-400 border border-obsidian-400 py-3.5 px-4 rounded text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3.5 px-4 rounded text-xs uppercase tracking-editorial font-semibold transition-colors shadow-soft"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Shipping & Return Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-200 text-[11px] text-stone-600 text-center">
            <div className="p-2 space-y-1">
              <Truck className="w-4 h-4 mx-auto text-obsidian-400" />
              <p className="font-medium">Direct Seller Dispatch</p>
            </div>
            <div className="p-2 space-y-1 border-x border-stone-200">
              <RotateCcw className="w-4 h-4 mx-auto text-obsidian-400" />
              <p className="font-medium">14-Day Easy Return</p>
            </div>
            <div className="p-2 space-y-1">
              <Award className="w-4 h-4 mx-auto text-obsidian-400" />
              <p className="font-medium">Authenticity Guarantee</p>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Section: Description, Specifications, Reviews, Seller Info */}
      <div className="pt-12 border-t border-stone-200 space-y-8">
        
        {/* Tabs Bar */}
        <div className="flex border-b border-stone-200 gap-8 overflow-x-auto">
          {[
            { id: 'desc', label: 'Description' },
            { id: 'specs', label: 'Specifications' },
            { id: 'reviews', label: `Reviews (${product.reviewCount})` },
            { id: 'seller', label: 'Seller Information' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs uppercase tracking-editorial font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-obsidian-400' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-obsidian-400" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activeTab === 'desc' && (
            <div className="space-y-4 text-stone-600 text-sm leading-relaxed font-light">
              <p>{product.description}</p>
              <p>
                Every piece from {product.vendorName} undergoes individual inspection prior to packaging. Crafted with precision standards to integrate seamlessly into modern workspaces and homes.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-cream-100/60' : 'bg-cream-50'}>
                      <td className="px-4 py-3 font-semibold text-stone-700 w-1/3 border-r border-stone-200">{key}</td>
                      <td className="px-4 py-3 text-stone-600">{val}</td>
                    </tr>
                  ))}
                  <tr className="bg-cream-50">
                    <td className="px-4 py-3 font-semibold text-stone-700 border-r border-stone-200">SKU Code</td>
                    <td className="px-4 py-3 text-stone-600 font-mono">{product.sku}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-stone-100 rounded border border-stone-200">
                <span className="font-serif text-4xl font-bold text-obsidian-400">{product.rating}</span>
                <div>
                  <div className="flex text-accent-amber">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs text-stone-500 font-light mt-0.5">Based on {product.reviewCount} verified buyer ratings</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-cream-50 rounded border border-stone-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-obsidian-400">Vikram S.</span>
                    <span className="text-stone-400">12 Sep 2026</span>
                  </div>
                  <div className="flex text-accent-amber"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                  <p className="text-stone-600 font-light">"Sensational craft quality. Packaged exceptionally well directly from {product.vendorName}."</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seller' && vendor && (
            <div className="p-6 bg-cream-100/70 rounded-lg border border-stone-200 space-y-4">
              <div className="flex items-center gap-3">
                <img src={vendor.logo} alt="" className="w-12 h-12 rounded-full object-cover border" />
                <div>
                  <h4 className="font-serif text-xl font-bold text-obsidian-400">{vendor.name}</h4>
                  <span className="text-xs text-stone-500">{vendor.tagline}</span>
                </div>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed">{vendor.description}</p>
              <Link
                href={`/vendors/${vendor.slug}`}
                className="inline-block text-xs uppercase tracking-editorial font-semibold text-obsidian-400 border-b border-obsidian-400 pb-0.5"
              >
                Visit Vendor Storefront →
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold tracking-editorial text-obsidian-400">
            YOU MAY ALSO INTEREST IN
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
