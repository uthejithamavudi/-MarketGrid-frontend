'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="text-stone-400 font-mono text-xs flex items-center gap-2">
        <div className="w-3 h-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin"></div>
        <span>Navigating to Admin Portal...</span>
      </div>
    </div>
  );
}
