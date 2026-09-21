'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { Heart, Star, ShoppingBag, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      className="group relative flex flex-col justify-between card-premium p-3"
      whileHover={{ y: -12, boxShadow: "0px 30px 60px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-100 mb-3">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Discount / Tag Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.discountPercentage && (
              <motion.span
                className="bg-obsidian-400 text-cream-50 text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                -{product.discountPercentage}%
              </motion.span>
            )}
            {product.isNew && (
              <motion.span
                className="bg-accent-amber text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                New
              </motion.span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2.5 rounded-full bg-cream-50/90 backdrop-blur-sm ${
              wishlisted ? 'text-accent-terracotta' : 'text-stone-400 hover:text-obsidian-400'
            }`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-accent-terracotta' : ''}`} />
          </motion.button>

          {/* Quick Add Overlay on Hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-obsidian-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-full bg-cream-50 hover:bg-cream-100 text-obsidian-400 text-xs font-semibold py-2.5 px-3 rounded-full shadow flex items-center justify-center gap-1.5 uppercase tracking-editorial transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </motion.button>
          </div>
        </div>

        {/* Vendor & Rating */}
        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5 px-0.5">
          <Link
            href={`/vendors/${product.vendorSlug}`}
            className="hover:text-obsidian-400 flex items-center gap-1 font-medium tracking-wide uppercase text-[10px]"
          >
            <span>{product.vendorName}</span>
            <ShieldCheck className="w-3 h-3 text-accent-emerald inline" />
          </Link>

          <div className="flex items-center gap-1 text-stone-600 font-medium">
            <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <Link href={`/products/${product.slug}`} className="block group-hover:text-obsidian-300 px-0.5">
          <h3 className="font-serif text-lg font-semibold text-obsidian-400 leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
      </div>

      {/* Price & Stock Indicator */}
      <div className="pt-2.5 border-t border-stone-200/50 flex items-center justify-between px-0.5">
        <div className="flex items-baseline gap-2">
          <span className="font-sans text-sm font-bold text-obsidian-400">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through font-light">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Stock Badge */}
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
            product.stock <= 5
              ? 'bg-red-100 text-red-700'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {product.stock <= 5 ? `${product.stock} left` : 'In Stock'}
        </span>
      </div>
    </motion.div>
  );
};
