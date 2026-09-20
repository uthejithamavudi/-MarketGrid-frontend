'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { sendOtpApi, verifyOtpApi } from '@/lib/authService';
import {
  Package,
  Heart,
  MapPin,
  Settings,
  ShieldCheck,
  User,
  LogOut,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  Edit,
  KeyRound,
  X
} from 'lucide-react';

export default function CustomerAccountPage() {
  const { isAuthenticated, userEmail, role, logout, orders, wishlist, showToast } = useApp();
  
  // Password Reset States
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetStep, setResetStep] = useState<'initial' | 'otp_sent'>('initial');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If customer is NOT logged in
  if (!isAuthenticated || role !== 'customer') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-cream-200 text-obsidian-400 border border-stone-300 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8 text-stone-500" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-superwide font-bold text-stone-500 bg-cream-200 px-3 py-1 rounded-full border border-stone-300">
            Account Required
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400">
            SIGN IN TO VIEW PROFILE
          </h1>
          <p className="text-xs text-stone-500 font-light max-w-sm mx-auto leading-relaxed">
            Please sign in to access your orders, saved wishlist items, delivery address book, and customer profile details.
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-3 max-w-xs mx-auto">
          <Link href="/login?role=customer" className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded-lg text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft">
            <span>Customer Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/register" className="w-full bg-cream-200 hover:bg-stone-300 text-obsidian-400 py-2.5 rounded-lg text-xs font-mono uppercase font-bold tracking-wide transition-colors">
            Create Customer Account
          </Link>
        </div>
      </div>
    );
  }

  const displayEmail = userEmail || 'sai@example.com';
  const customerName = displayEmail.split('@')[0].toUpperCase();

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await sendOtpApi({ email: displayEmail, role: 'customer', purpose: 'password_reset' });
      if (res.success) {
        showToast('OTP Sent', res.message, 'success');
        setResetStep('otp_sent');
      } else {
        showToast('Error', res.message, 'error');
      }
    } catch (e) {
      showToast('Error', 'Failed to send OTP', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otpCode || !newPassword) {
      showToast('Validation Error', 'Please enter both OTP and new password.', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      // Step 1: Verify OTP
      const verifyRes = await verifyOtpApi({ email: displayEmail, otpCode, role: 'customer' });
      
      if (verifyRes.success) {
        // Step 2: In a real app, call resetPasswordApi here.
        // We will simulate success for now as requested.
        showToast('Password Changed!', 'Your password has been reset successfully.', 'success');
        setIsResetModalOpen(false);
        setResetStep('initial');
        setOtpCode('');
        setNewPassword('');
      } else {
        showToast('Verification Failed', verifyRes.message, 'error');
      }
    } catch (e) {
      showToast('Error', 'Failed to verify OTP', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      
      {/* Profile Header Card */}
      <div className="bg-cream-50 rounded-xl p-8 border border-stone-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-obsidian-400 text-cream-50 flex items-center justify-center font-serif text-2xl font-bold shadow-soft">
            {customerName.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-editorial text-obsidian-400">
                WELCOME, {customerName}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                Verified Customer
              </span>
            </div>
            <p className="text-xs text-stone-500 font-light flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>{displayEmail}</span>
            </p>
          </div>
        </div>

        <button onClick={logout} className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent-terracotta bg-cream-200 hover:bg-stone-300 px-4 py-2.5 rounded-lg transition-colors border border-stone-300">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Statistics Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/customer/orders" className="p-6 bg-cream-50 rounded-xl border border-stone-200 hover:border-obsidian-400 transition-all space-y-3 group">
          <div className="flex justify-between items-center">
            <Package className="w-8 h-8 text-obsidian-400 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-2xl font-bold text-obsidian-400">{orders.length}</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-obsidian-400">My Orders</h3>
            <p className="text-xs text-stone-500 font-light mt-1">View active multi-vendor shipments & delivery timelines.</p>
          </div>
        </Link>
        <Link href="/customer/wishlist" className="p-6 bg-cream-50 rounded-xl border border-stone-200 hover:border-obsidian-400 transition-all space-y-3 group">
          <div className="flex justify-between items-center">
            <Heart className="w-8 h-8 text-accent-terracotta group-hover:scale-110 transition-transform" />
            <span className="font-mono text-2xl font-bold text-accent-terracotta">{wishlist.length}</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-obsidian-400">Saved Wishlist</h3>
            <p className="text-xs text-stone-500 font-light mt-1">Manage your saved independent studio collections.</p>
          </div>
        </Link>
        <Link href="/customer/addresses" className="p-6 bg-cream-50 rounded-xl border border-stone-200 hover:border-obsidian-400 transition-all space-y-3 group">
          <div className="flex justify-between items-center">
            <MapPin className="w-8 h-8 text-accent-amber group-hover:scale-110 transition-transform" />
            <span className="font-mono text-2xl font-bold text-accent-amber">1</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-obsidian-400">Saved Addresses</h3>
            <p className="text-xs text-stone-500 font-light mt-1">Manage delivery addresses for multi-vendor checkout.</p>
          </div>
        </Link>
      </div>

      {/* Customer Profile Details Card */}
      <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-4">
        <h3 className="font-serif text-xl font-bold text-obsidian-400 border-b border-stone-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span>CUSTOMER PERSONAL INFORMATION</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => showToast('Edit Profile', 'Profile editing feature coming soon!', 'info')}
              className="flex items-center gap-1.5 text-[11px] font-sans font-bold text-obsidian-400 bg-stone-200 hover:bg-stone-300 px-3 py-1.5 rounded-full transition-colors uppercase tracking-wider"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit Profile
            </button>
            <button 
              onClick={() => setIsResetModalOpen(true)}
              className="flex items-center gap-1.5 text-[11px] font-sans font-bold text-cream-50 bg-obsidian-400 hover:bg-obsidian-300 px-3 py-1.5 rounded-full transition-colors uppercase tracking-wider"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Reset Password
            </button>
          </div>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-cream-50 p-4 rounded-lg border border-stone-200 space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold">Account Holder Name</span>
            <p className="text-sm font-semibold text-obsidian-400">{customerName}</p>
          </div>
          <div className="bg-cream-50 p-4 rounded-lg border border-stone-200 space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold">Primary Contact Email</span>
            <p className="text-sm font-semibold text-obsidian-400">{displayEmail}</p>
          </div>
          <div className="bg-cream-50 p-4 rounded-lg border border-stone-200 space-y-1 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold">Account Authentication Type</span>
              <p className="text-sm font-semibold text-emerald-800">Email & Password Verified</p>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-700 opacity-20" />
          </div>
          <div className="bg-cream-50 p-4 rounded-lg border border-stone-200 space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold">Default Delivery Address</span>
            <p className="text-sm font-semibold text-obsidian-400">42 Jubilee Hills, Road No. 36, Hyderabad</p>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-400/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-cream-50 w-full max-w-md rounded-2xl shadow-xl border border-stone-200 overflow-hidden relative">
            
            <button 
              onClick={() => { setIsResetModalOpen(false); setResetStep('initial'); }}
              className="absolute top-4 right-4 text-stone-400 hover:text-obsidian-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-300">
                  <KeyRound className="w-6 h-6 text-obsidian-400" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-obsidian-400 tracking-editorial">
                  RESET PASSWORD
                </h2>
                <p className="text-xs text-stone-500 font-light max-w-[250px] mx-auto">
                  {resetStep === 'initial' 
                    ? `We will send a secure verification code to ${displayEmail}.` 
                    : `Enter the code sent to ${displayEmail} along with your new password.`}
                </p>
              </div>

              {resetStep === 'initial' ? (
                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded-lg text-xs font-mono uppercase font-bold tracking-wider transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Sending Code...' : 'Send Verification Code'}
                </button>
              ) : (
                <div className="space-y-4 animate-slide-up">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 ml-1">Verification Code (OTP)</label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full bg-cream-50 border border-stone-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-obsidian-400 focus:ring-1 focus:ring-obsidian-400 transition-all text-center tracking-widest font-mono"
                      maxLength={6}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 ml-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-cream-50 border border-stone-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-obsidian-400 focus:ring-1 focus:ring-obsidian-400 transition-all font-mono"
                    />
                  </div>

                  <button
                    onClick={handleResetPassword}
                    disabled={isLoading}
                    className="w-full bg-accent-terracotta hover:bg-[#b03d2b] text-cream-50 py-3 rounded-lg text-xs font-mono uppercase font-bold tracking-wider transition-colors disabled:opacity-50 mt-2"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Change Password'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
