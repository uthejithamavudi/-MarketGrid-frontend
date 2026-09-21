'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { registerVendorApi } from '@/lib/authService';
import {
  Building2,
  UserCheck,
  ShieldCheck,
  CreditCard,
  MapPin,
  FileCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Mail,
  AlertCircle
} from 'lucide-react';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  const { registerVendor, initiateOtpAuth, login, showToast } = useApp();
  const [accountType, setAccountType] = useState<'customer' | 'vendor'>(roleParam === 'vendor' ? 'vendor' : 'customer');

  // Customer State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [isCustomerSubmitting, setIsCustomerSubmitting] = useState(false);

  // Amazon-Style Legal Vendor State
  const [vendorName, setVendorName] = useState('');
  const [businessType, setBusinessType] = useState<'Sole Proprietorship' | 'Private Limited' | 'Partnership' | 'LLP'>('Sole Proprietorship');
  const [gstin, setGstin] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [bankAccountHolder, setBankAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');

  const [submittedVendor, setSubmittedVendor] = useState(false);

  useEffect(() => {
    if (roleParam === 'vendor') {
      setAccountType('vendor');
    }
  }, [roleParam]);

  // Customer Signup -> Triggers OTP Verification
  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail) return;

    setIsCustomerSubmitting(true);
    const sent = await initiateOtpAuth(customerEmail, 'customer');
    setIsCustomerSubmitting(false);

    if (sent) {
      showToast('OTP Verification Sent', 'Check your email for the 6-digit verification code.', 'info');
      router.push(`/verify-otp?role=customer&email=${encodeURIComponent(customerEmail)}&purpose=registration`);
    }
  };

  // Vendor Registration -> Legal Amazon-Style Onboarding Submission
  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vendorPayload = {
      name: vendorName || 'Artisanal Craft Studio',
      ownerName: ownerName || 'Studio Founder',
      ownerEmail: ownerEmail || 'vendor@techverse.io',
      password: vendorPassword,
      phone: phone || '+91 98765 43210',
      businessType,
      gstin: gstin || '36AAAAA0000A1Z5',
      panNumber: panNumber || 'ABCDE1234F',
      aadhaarNumber: aadhaarNumber || '1234 5678 9012',
      addressStreet: street || '12 Industrial Craft Zone',
      city: city || 'Hyderabad',
      state: state || 'Telangana',
      zipCode: zipCode || '500033',
      bankAccountHolder: bankAccountHolder || ownerName || 'Studio Owner',
      bankName: bankName || 'HDFC Bank',
      accountNumber: accountNumber || '50100239481029',
      ifscCode: ifscCode || 'HDFC0000123',
      tagline: tagline || 'Handcrafted specialty goods',
      description: description || 'Artisanal product creator registered for MarketGrid verification.',
    };

    // 1. Send to Backend
    const res = await registerVendorApi(vendorPayload);
    
    if (res.success) {
      showToast('Registration Received', res.message, 'success');
      // 2. Also register in frontend state for UI mock fallback if needed
      registerVendor(vendorPayload);
      setSubmittedVendor(true);
    } else {
      showToast('Registration Error', res.message, 'error');
      // If backend is entirely missing this endpoint, fallback to UI state so it doesn't hard block
      console.warn("Backend failed, falling back to UI state only.");
      registerVendor(vendorPayload);
      setSubmittedVendor(true);
    }
  };

  // VENDOR PENDING REVIEW CONFIRMATION SCREEN (2-3 Business Days)
  if (submittedVendor) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-cream-50 rounded-xl p-8 shadow-elevated border border-amber-300 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center mx-auto shadow-inner">
            <Clock className="w-10 h-10 text-amber-700 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-superwide text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              KYC & Legal Documents Submitted
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-editorial text-obsidian-400">
              APPLICATION UNDER REVIEW
            </h2>
            <p className="text-xs text-stone-600 font-light leading-relaxed max-w-md mx-auto">
              Your vendor registration application for <strong className="text-obsidian-400">{vendorName}</strong> has been received by MarketGrid Admin Governance.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-left text-xs space-y-2.5 font-mono">
            <div className="flex justify-between border-b border-amber-200 pb-1.5 text-amber-950 font-bold">
              <span>Verification Status:</span>
              <span className="text-amber-700">PENDING REVIEW</span>
            </div>
            <div className="flex justify-between text-[11px] text-amber-900">
              <span>GSTIN Tax ID:</span>
              <span className="font-semibold">{gstin || '36AAAAA0000A1Z5'}</span>
            </div>
            <div className="flex justify-between text-[11px] text-amber-900">
              <span>PAN Card Number:</span>
              <span className="font-semibold">{panNumber || 'ABCDE1234F'}</span>
            </div>
            <div className="flex justify-between text-[11px] text-amber-900">
              <span>Notification Channel:</span>
              <span className="font-semibold">{ownerEmail}</span>
            </div>
          </div>

          <div className="bg-stone-100 p-3.5 rounded-lg border border-stone-200 text-left text-[11px] text-stone-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-obsidian-400">
              <Mail className="w-3.5 h-3.5 text-amber-800" />
              <span>Email Status Notifications:</span>
            </div>
            <p className="font-light">
              Once an admin reviews your GSTIN, PAN, and Bank details, an automatic status email will be sent to <strong className="text-obsidian-400">{ownerEmail}</strong> informing you whether your store has been <strong className="text-emerald-800">APPROVED</strong> or <strong className="text-red-700">REJECTED</strong>.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/admin/vendors"
              onClick={() => login('admin@marketgrid.io', 'demo123', 'admin')}
              className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-colors block text-center shadow-soft"
            >
              Open Admin Portal (Inspect & Approve Vendor Application)
            </Link>

            <Link
              href="/"
              className="w-full bg-cream-200 hover:bg-stone-300 text-obsidian-400 py-2.5 rounded text-xs uppercase tracking-editorial font-semibold transition-colors block text-center"
            >
              Return to MarketGrid Storefront Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 py-12">
      <div className={`w-full ${accountType === 'vendor' ? 'max-w-3xl' : 'max-w-md'} bg-cream-50 rounded-xl p-8 shadow-elevated border border-stone-200 space-y-6 transition-all`}>
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400 block">
            MARKETGRID
          </Link>

          {/* Account Type Toggle */}
          <div className="flex justify-center max-w-sm mx-auto bg-cream-200/70 p-1 rounded-lg border border-stone-300 gap-1 text-xs">
            <button
              type="button"
              onClick={() => setAccountType('customer')}
              className={`flex-1 py-1.5 rounded transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'customer'
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-obsidian-400'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Customer Signup
            </button>
            <button
              type="button"
              onClick={() => setAccountType('vendor')}
              className={`flex-1 py-1.5 rounded transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'vendor'
                  ? 'bg-amber-700 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-obsidian-400'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Vendor Partner
            </button>
          </div>

          {accountType === 'customer' ? (
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-1 border border-emerald-200">
                Customer Storefront Signup
              </span>
              <h2 className="font-serif text-xl font-bold text-obsidian-400">Create Shopper Account</h2>
              <p className="text-xs text-stone-500 font-light">An OTP verification code will be sent to your email</p>
            </div>
          ) : (
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-amber-900 bg-amber-100 px-3 py-1 rounded-full inline-block mb-1 border border-amber-300">
                Vendor Partner Application
              </span>
              <h2 className="font-serif text-2xl font-bold text-obsidian-400">Vendor Partner Registration</h2>
              <p className="text-xs text-stone-500 font-light">Submit business credentials, GSTIN, PAN, and Bank details for review</p>
            </div>
          )}
        </div>

        {/* CUSTOMER REGISTRATION FORM (Triggers OTP verification) */}
        {accountType === 'customer' && (
          <form onSubmit={handleCustomerSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Sai Vardhan"
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="sai@example.com"
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Mobile Phone</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-editorial text-stone-600 mb-1">Account Password</label>
              <input
                type="password"
                required
                value={customerPassword}
                onChange={(e) => setCustomerPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-cream-100/70 p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
              />
            </div>

            <button
              type="submit"
              disabled={isCustomerSubmitting}
              className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft disabled:opacity-50"
            >
              <span>{isCustomerSubmitting ? 'Sending Code...' : 'Create Customer Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* VENDOR LEGAL ONBOARDING FORM (Amazon Seller Central Style) */}
        {accountType === 'vendor' && (
          <form onSubmit={handleVendorSubmit} className="space-y-6 text-xs">
            
            {/* SECTION 1: BUSINESS & TAX VERIFICATION */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold text-amber-900 border-b border-stone-200 pb-2">
                <FileCheck className="w-4 h-4 text-amber-700" />
                <span>01. Business Legal & Tax Identification (GSTIN & PAN)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Legal Studio / Store Name *</label>
                  <input
                    type="text"
                    required
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="TechVerse Craft Atelier"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Business Entity Type *</label>
                  <select
                    value={businessType}
                    onChange={(e: any) => setBusinessType(e.target.value)}
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400 font-medium"
                  >
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Private Limited">Private Limited (Pvt Ltd)</option>
                    <option value="Partnership">Partnership Firm</option>
                    <option value="LLP">Limited Liability Partnership (LLP)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">GSTIN Tax Registration No. *</label>
                  <input
                    type="text"
                    required
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="36AAAAA0000A1Z5"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 font-mono text-[11px] font-bold tracking-wide"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Business PAN Card Number *</label>
                  <input
                    type="text"
                    required
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 font-mono text-[11px] font-bold tracking-wide"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: OWNER IDENTITY & CONTACT */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold text-amber-900 border-b border-stone-200 pb-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>02. Primary Owner Identity (Aadhaar & Contact)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Owner Full Name *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Sai Vardhan"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Owner Aadhaar No. *</label>
                  <input
                    type="text"
                    required
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    placeholder="1234 5678 9012"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="vendor@techverse.io"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Login Password *</label>
                  <input
                    type="password"
                    required
                    value={vendorPassword}
                    onChange={(e) => setVendorPassword(e.target.value)}
                    placeholder="Set account password"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: PICKUP & BUSINESS LOCATION */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold text-amber-900 border-b border-stone-200 pb-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>03. Pickup Warehouse / Business Location</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="12 Industrial Craft Estate, Road No. 4"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Hyderabad"
                      className="w-full bg-cream-50 p-2.5 rounded border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Telangana"
                      className="w-full bg-cream-50 p-2.5 rounded border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-600 mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="500033"
                      className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: BANK PAYOUT ACCOUNT DETAILS */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase font-bold text-amber-900 border-b border-stone-200 pb-2">
                <CreditCard className="w-4 h-4 text-amber-700" />
                <span>04. Payout Bank Account Details (For Revenue Disbursements)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Bank Account Holder Name *</label>
                  <input
                    type="text"
                    required
                    value={bankAccountHolder}
                    onChange={(e) => setBankAccountHolder(e.target.value)}
                    placeholder="TechVerse Craft Studio"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Bank Name *</label>
                  <input
                    type="text"
                    required
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="HDFC Bank"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="50100239481029"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-600 mb-1">IFSC Code *</label>
                  <input
                    type="text"
                    required
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    placeholder="HDFC0000123"
                    className="w-full bg-cream-50 p-2.5 rounded border border-stone-300 font-mono text-[11px] uppercase font-bold"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: TAGLINE & DESCRIPTION */}
            <div className="space-y-3">
              <div>
                <label className="block font-semibold uppercase text-stone-600 mb-1">Store Tagline / Craft Focus</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Handcrafted premium desk accessories & stationery"
                  className="w-full bg-cream-100/70 p-2.5 rounded border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-600 mb-1">Studio Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief overview of your brand catalog and production methods..."
                  className="w-full bg-cream-100/70 p-2.5 rounded border border-stone-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-cream-50 py-3.5 rounded-lg text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-soft flex items-center justify-center gap-2"
            >
              <span>Submit Vendor Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="space-y-3 pt-2 border-t border-stone-200 text-xs text-center text-stone-500">
          <div>
            Already have an account?{' '}
            <Link href={accountType === 'vendor' ? '/login?role=vendor' : '/login'} className="font-semibold text-obsidian-400 underline">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-100 flex items-center justify-center text-stone-400 font-mono text-xs">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
