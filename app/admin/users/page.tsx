'use client';

import React from 'react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400">User Identity Governance</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">PLATFORM USERS DIRECTORY</h1>
      </div>

      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-card">
        <table className="w-full text-xs text-left text-stone-300">
          <thead className="bg-stone-950 text-stone-400 uppercase font-mono border-b border-stone-800">
            <tr>
              <th className="p-4">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            <tr className="hover:bg-stone-850">
              <td className="p-4 font-bold text-cream-50">Sai Vardhan</td>
              <td className="p-4 font-mono">sai.customer@marketgrid.io</td>
              <td className="p-4"><span className="bg-blue-500/20 text-blue-400 font-mono px-2 py-0.5 rounded">CUSTOMER</span></td>
              <td className="p-4"><span className="text-emerald-400 font-mono">VERIFIED</span></td>
            </tr>
            <tr className="hover:bg-stone-850">
              <td className="p-4 font-bold text-cream-50">Elena Rostova</td>
              <td className="p-4 font-mono">elena@solacestudio.com</td>
              <td className="p-4"><span className="bg-amber-500/20 text-amber-400 font-mono px-2 py-0.5 rounded">VENDOR OWNER</span></td>
              <td className="p-4"><span className="text-emerald-400 font-mono">VERIFIED</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
