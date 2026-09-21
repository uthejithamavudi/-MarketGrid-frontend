'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}`} className="block">
      <motion.div
        className="group relative h-80 rounded-card-lg overflow-hidden flex flex-col justify-end p-6 card-accent-border"
        whileHover={{ scale: 1.02, y: -12, boxShadow: "0px 30px 60px rgba(0,0,0,0.15)" }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        {/* Background Image with Parallax */}
        <motion.img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-500 via-obsidian-400/40 to-transparent" />

        {/* Content Overlay */}
        <div className="relative z-10 text-cream-50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-superwide font-medium text-cream-300">
              {category.productCount} Collections
            </span>
            <motion.div
              className="w-9 h-9 rounded-full bg-cream-50/20 backdrop-blur-sm group-hover:bg-cream-50 group-hover:text-obsidian-400 text-cream-50 flex items-center justify-center transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-editorial">
            {category.name}
          </h3>

          <p className="text-xs text-stone-300 font-light line-clamp-1">
            {category.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {category.subcategories.slice(0, 3).map((sub) => (
              <span
                key={sub}
                className="text-[10px] bg-cream-50/10 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-cream-200"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
