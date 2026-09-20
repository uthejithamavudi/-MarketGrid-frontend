'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Vendor } from '@/lib/types';
import {
  ShieldCheck,
  Search,
  Eye,
  X,
  CheckCircle,
  AlertTriangle,
  Building,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  MapPin,
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

export default function AdminVendorsPage() {
  const { vendorsList, approveVendor, rejectVendor, suspendVendor } = useApp();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED'>('ALL');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const pendingCount = vendorsList.filter((v) => v.status === 'PENDING').length;

  const filtered = vendorsList.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      v.ownerEmail.toLowerCase().includes(search.toLowerCase()) ||
      (v.gstin && v.gstin.toLowerCase().includes(search.toLowerCase())) ||
      (v.panNumber && v.panNumber.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = activeFilter === 'ALL' || v.status === activeFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-superwide font-mono text-emerald-400 font-bold">
            Legal Seller Verification Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-editorial text-stone-900">
            VENDOR KYC GOVERNANCE
          </h1>
        </div>

        {pendingCount > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/40 text-amber-400 px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{pendingCount} Vendor Application{pendingCount > 1 ? 's' : ''} Pending Review</span>
          </div>
        )}
      </div>

      {/* Filter & Search */}
      <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search studio, owner, email, GSTIN or PAN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-stone-950 text-cream-50 text-xs pl-9 pr-4 py-2 rounded border border-stone-800 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {(['ALL', 'PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED'] as const).map((tab) => {
            const count = tab === 'ALL' ? vendorsList.length : vendorsList.filter((v) => v.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeFilter === tab
                    ? tab === 'PENDING'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : tab === 'REJECTED'
                      ? 'bg-red-500 text-white font-bold'
                      : 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-stone-950 text-stone-400 hover:text-white'
                }`}
              >
                <span>{tab}</span>
                <span className="text-[10px] opacity-80 font-bold">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vendor Table */}
      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-card">
        <table className="w-full text-xs text-left text-stone-300">
          <thead className="bg-stone-950 text-stone-400 uppercase font-mono border-b border-stone-800">
            <tr>
              <th className="p-4">Vendor Studio & Legal Entity</th>
              <th className="p-4">Owner & Contact Email</th>
              <th className="p-4">GSTIN & PAN Number</th>
              <th className="p-4">Payout Bank & IFSC</th>
              <th className="p-4">KYC Review Status</th>
              <th className="p-4 text-right">Approval Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone-500 font-mono">
                  No vendor applications found matching filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-stone-850">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={vendor.logo} alt="" className="w-10 h-10 rounded-full object-cover border border-stone-700" />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-cream-50">
                          <span>{vendor.name}</span>
                          {vendor.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {vendor.businessType || 'Sole Proprietorship'} • Joined {vendor.joinedDate}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-cream-50">{vendor.ownerName}</p>
                    <p className="text-[11px] text-stone-400 font-mono">{vendor.ownerEmail}</p>
                  </td>

                  <td className="p-4 font-mono text-[11px]">
                    <div className="text-emerald-400 font-bold">GST: {vendor.gstin || '36AAAAA0000A1Z5'}</div>
                    <div className="text-stone-400">PAN: {vendor.panNumber || 'ABCDE1234F'}</div>
                  </td>

                  <td className="p-4 font-mono text-[11px]">
                    <div className="text-stone-200 font-semibold">{vendor.bankName || 'HDFC Bank'}</div>
                    <div className="text-stone-400">IFSC: {vendor.ifscCode || 'HDFC0000123'}</div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded font-mono font-bold text-[10px] uppercase inline-flex items-center gap-1 ${
                      vendor.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : vendor.status === 'PENDING'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}>
                      {vendor.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedVendor(vendor)}
                        className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1.5 rounded font-bold text-[10px] uppercase flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Inspect KYC</span>
                      </button>

                      {vendor.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => approveVendor(vendor.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded font-bold text-[10px] uppercase shadow flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approve</span>
                          </button>

                          <button
                            onClick={() => rejectVendor(vendor.id)}
                            className="bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 px-2.5 py-1.5 rounded font-bold text-[10px] uppercase flex items-center gap-1"
                          >
                            <XCircle className="w-3 h-3" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}

                      {vendor.status === 'ACTIVE' && (
                        <button
                          onClick={() => suspendVendor(vendor.id)}
                          className="bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1.5 rounded font-bold text-[10px] uppercase"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detailed Legal Inspection Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-3xl w-full p-6 space-y-6 text-stone-200 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedVendor(null)}
              className="absolute right-4 top-4 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 border-b border-stone-800 pb-4">
              <img src={selectedVendor.logo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-serif font-bold text-white">{selectedVendor.name}</h2>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    selectedVendor.status === 'ACTIVE'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : selectedVendor.status === 'PENDING'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    {selectedVendor.status}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">{selectedVendor.tagline}</p>
                <p className="text-[11px] font-mono text-stone-500 mt-1">Vendor ID: {selectedVendor.id} • Entity: {selectedVendor.businessType || 'Sole Proprietorship'}</p>
              </div>
            </div>

            {/* Grid Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              
              {/* Section 1: Legal Tax IDs */}
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-[10px] text-amber-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>GSTIN, PAN & Aadhaar</span>
                  </h4>
                  {selectedVendor.status === 'ACTIVE' ? (
                    <span className="text-[9px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      VERIFIED BY ADMIN
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                      PENDING ADMIN VERIFICATION
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 font-mono text-stone-300 pt-1">
                  <div className="flex justify-between border-b border-stone-900 pb-1">
                    <span className="text-stone-500">GSTIN No:</span>
                    <strong className="text-emerald-400">{selectedVendor.gstin || '36AAAAA0000A1Z5'}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-900 pb-1">
                    <span className="text-stone-500">PAN Card:</span>
                    <strong className="text-white">{selectedVendor.panNumber || 'ABCDE1234F'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Aadhaar Govt ID:</span>
                    <strong className="text-white">{selectedVendor.aadhaarNumber || '1234 5678 9012'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Payout Bank Account */}
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
                <h4 className="font-mono text-[10px] text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Payout Bank Account Details</span>
                </h4>
                <div className="space-y-1.5 font-mono text-stone-300">
                  <div className="flex justify-between border-b border-stone-900 pb-1">
                    <span className="text-stone-500">Account Holder:</span>
                    <strong className="text-white">{selectedVendor.bankAccountHolder || selectedVendor.ownerName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-900 pb-1">
                    <span className="text-stone-500">Bank Name:</span>
                    <strong className="text-white">{selectedVendor.bankName || 'HDFC Bank'}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-900 pb-1">
                    <span className="text-stone-500">Account No:</span>
                    <strong className="text-white">{selectedVendor.accountNumber || '50100239481029'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">IFSC Code:</span>
                    <strong className="text-emerald-400">{selectedVendor.ifscCode || 'HDFC0000123'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 3: Owner Contact */}
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
                <h4 className="font-mono text-[10px] text-amber-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>Owner Contact & Email Address</span>
                </h4>
                <div className="space-y-1 text-stone-300">
                  <div>Owner Name: <strong className="text-white">{selectedVendor.ownerName}</strong></div>
                  <div>Email (Spring Boot Mail Target): <strong className="text-white font-mono">{selectedVendor.ownerEmail}</strong></div>
                  <div>Mobile Phone: <strong className="text-white font-mono">{selectedVendor.phone || '+91 98765 43210'}</strong></div>
                </div>
              </div>

              {/* Section 4: Location */}
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 space-y-2">
                <h4 className="font-mono text-[10px] text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Pickup Warehouse Location</span>
                </h4>
                <div className="space-y-1 text-stone-300">
                  <div>Street: <strong className="text-white">{selectedVendor.addressStreet || '12 Industrial Craft Zone'}</strong></div>
                  <div>City/State: <strong className="text-white">{selectedVendor.city || 'Hyderabad'}, {selectedVendor.state || 'Telangana'}</strong></div>
                  <div>Pincode: <strong className="text-white font-mono">{selectedVendor.zipCode || '500033'}</strong></div>
                </div>
              </div>

            </div>

            {/* Approval Action Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              <button
                onClick={() => setSelectedVendor(null)}
                className="text-stone-400 hover:text-white text-xs font-mono"
              >
                Close Modal
              </button>

              <div className="flex gap-3">
                {selectedVendor.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => {
                        approveVendor(selectedVendor.id);
                        setSelectedVendor(null);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-mono px-5 py-2.5 rounded text-xs uppercase shadow flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Application</span>
                    </button>

                    <button
                      onClick={() => {
                        rejectVendor(selectedVendor.id);
                        setSelectedVendor(null);
                      }}
                      className="bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 font-bold font-mono px-4 py-2.5 rounded text-xs uppercase flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Application</span>
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
