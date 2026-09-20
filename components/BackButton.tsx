'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

/**
 * BackButton — Reusable navigation back button.
 * Uses router.back() by default for browser-native back navigation.
 * Optionally accepts an explicit href fallback for direct links.
 */
export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Go Back',
  href,
  className = '',
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-stone-600 hover:text-obsidian-400 border border-stone-300 hover:border-obsidian-400 px-4 py-2 rounded transition-all hover:shadow-sm active:scale-95 ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      {label}
    </button>
  );
};
