'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/vendor/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="text-stone-600 font-mono text-xs flex items-center gap-2">
        <div className="w-3 h-3 rounded-full border-2 border-amber-600 border-t-transparent animate-spin"></div>
        <span>Navigating to Vendor Studio...</span>
      </div>
    </div>
  );
}
