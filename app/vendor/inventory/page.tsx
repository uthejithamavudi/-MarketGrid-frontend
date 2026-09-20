'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Boxes, Edit2, AlertCircle } from 'lucide-react';

export default function VendorInventoryPage() {
  const { productsList, showToast } = useApp();
  const [stocks, setStocks] = useState<Record<string, number>>(
    productsList.reduce((acc, p) => ({ ...acc, [p.id]: p.stock }), {})
  );

  const handleStockUpdate = (id: string, name: string) => {
    showToast('Stock Updated', `Inventory for ${name} set to ${stocks[id]} units.`, 'success');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-stone-300 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-bold text-stone-500">
          Stock Level Monitor
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-obsidian-400">
          INVENTORY CONTROL
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cream-50 p-5 rounded-xl border border-stone-200">
          <span className="text-xs uppercase tracking-editorial font-semibold text-stone-500">Total Items in Catalog</span>
          <p className="font-serif text-3xl font-bold text-obsidian-400 mt-1">{productsList.length} SKUs</p>
        </div>
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
          <span className="text-xs uppercase tracking-editorial font-semibold text-amber-900">Low Stock SKUs</span>
          <p className="font-serif text-3xl font-bold text-amber-900 mt-1">2 Items</p>
        </div>
        <div className="bg-cream-50 p-5 rounded-xl border border-stone-200">
          <span className="text-xs uppercase tracking-editorial font-semibold text-stone-500">Out of Stock</span>
          <p className="font-serif text-3xl font-bold text-stone-400 mt-1">0 Items</p>
        </div>
      </div>

      <div className="bg-cream-50 rounded-xl border border-stone-200 overflow-hidden shadow-card">
        <table className="w-full text-xs text-left">
          <thead className="bg-stone-100 text-stone-600 uppercase tracking-editorial font-semibold border-b border-stone-200">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Stock Quantity</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {productsList.map((prod) => (
              <tr key={prod.id} className="hover:bg-cream-100/60">
                <td className="p-4 font-bold text-obsidian-400">{prod.name}</td>
                <td className="p-4 font-mono text-stone-500">{prod.sku}</td>
                <td className="p-4">
                  <input
                    type="number"
                    value={stocks[prod.id] ?? prod.stock}
                    onChange={(e) => setStocks({ ...stocks, [prod.id]: Number(e.target.value) })}
                    className="w-20 bg-cream-100 p-1.5 rounded border border-stone-300 font-bold"
                  />
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                    (stocks[prod.id] ?? prod.stock) <= 5 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {(stocks[prod.id] ?? prod.stock) <= 5 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleStockUpdate(prod.id, prod.name)}
                    className="bg-obsidian-400 text-cream-50 px-3 py-1.5 rounded text-[11px] uppercase tracking-editorial font-bold hover:bg-obsidian-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
