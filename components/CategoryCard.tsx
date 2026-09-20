'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative h-80 rounded-lg overflow-hidden flex flex-col justify-end p-6 border border-stone-300/40 shadow-card hover:shadow-elevated transition-all duration-500"
    >
      {/* Background Image with Dark Vignette */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover img-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-500 via-obsidian-400/40 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 text-cream-50 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-superwide font-medium text-cream-300">
            {category.productCount} Collections
          </span>
          <div className="w-8 h-8 rounded-full bg-cream-50/20 backdrop-blur-sm group-hover:bg-cream-50 group-hover:text-obsidian-400 text-cream-50 flex items-center justify-center transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
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
              className="text-[10px] bg-cream-50/10 backdrop-blur-xs px-2 py-0.5 rounded text-cream-200"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
