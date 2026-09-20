'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Eye, Edit, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const { productsList, toggleProductStatus } = useApp();

  return (
    <div className="space-y-8">
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">
          Platform Moderation Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">
          GLOBAL PRODUCT MODERATION
        </h1>
      </div>

      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-card">
        <table className="w-full text-xs text-left text-stone-300">
          <thead className="bg-stone-950 text-stone-400 uppercase font-mono border-b border-stone-800">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">Vendor Studio</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Moderation Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {productsList.map((prod) => (
              <tr key={prod.id} className="hover:bg-stone-850">
                <td className="p-4 font-bold text-cream-50">{prod.name}</td>
                <td className="p-4 font-semibold text-emerald-400">{prod.vendorName}</td>
                <td className="p-4 text-stone-400">{prod.categoryName}</td>
                <td className="p-4 font-mono font-bold text-cream-50">₹{prod.price.toLocaleString('en-IN')}</td>
                <td className="p-4 font-mono">{prod.stock} units</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                    prod.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {prod.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/products/${prod.slug}`} className="p-1 text-stone-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => toggleProductStatus(prod.id)}
                      className="bg-stone-800 hover:bg-stone-700 text-cream-50 px-2.5 py-1 rounded font-mono font-bold text-[10px] uppercase"
                    >
                      [{prod.status === 'Active' ? 'Disable' : 'Enable'}]
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
