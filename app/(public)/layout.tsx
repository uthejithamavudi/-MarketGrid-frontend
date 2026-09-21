'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-900 sm:p-3 md:p-6 transition-all duration-500 flex flex-col">
      <div className="flex-1 flex flex-col bg-cream-50 sm:rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden border border-stone-800">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
