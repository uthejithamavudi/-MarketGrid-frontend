'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { VendorSidebar } from '@/components/VendorSidebar';
import { AuthGuard } from '@/components/AuthGuard';

export default function VendorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/vendor/login') {
    return <>{children}</>;
  }

  return (
    <AuthGuard requiredRole="vendor">
      <VendorSidebar>{children}</VendorSidebar>
    </AuthGuard>
  );
}
