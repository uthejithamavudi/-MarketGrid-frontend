import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from '@/components/ToastContainer';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'MarketGrid — Premium Multi-Tenant E-Commerce Marketplace',
  description: 'Discover independent sellers, artisanal creators, and curated product collections on MarketGrid.',
  keywords: ['marketplace', 'multi-tenant', 'independent sellers', 'artisan products', 'e-commerce'],
  authors: [{ name: 'MarketGrid Team' }],
  openGraph: {
    title: 'MarketGrid — Independent Commerce Platform',
    description: 'Products worth finding from independent creators and specialty sellers.',
    url: 'https://marketgrid.io',
    siteName: 'MarketGrid',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'MarketGrid Editorial E-Commerce Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarketGrid — Independent Commerce Platform',
    description: 'Discover curated collections from verified independent vendors.',
    images: ['https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&q=80'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-cream-50 text-obsidian-400 font-sans antialiased flex flex-col">
        <AppProvider>
          {/* Page Contents */}
          {children}

          {/* Global Multi-Vendor Cart Drawer */}
          <CartDrawer />

          {/* Global Toast Feedback Container */}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
