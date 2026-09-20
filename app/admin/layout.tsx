'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AuthGuard } from '@/components/AuthGuard';

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <AuthGuard requiredRole="admin">
      <AdminSidebar>{children}</AdminSidebar>
    </AuthGuard>
  );
}
