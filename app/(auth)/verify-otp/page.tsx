'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';
import {
  ShieldCheck,
  Building2,
  UserCheck,
  ArrowRight,
  RefreshCw,
  Mail,
  Lock,
  CheckCircle2,
  Code2,
  Info,
  KeyRound,
  ArrowLeft
} from 'lucide-react';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roleParam = searchParams ? (searchParams.get('role') as UserRole | null) : null;
  const emailParam = searchParams ? searchParams.get('email') : null;

  const { pendingOtpUser, verifyOtpCode, resendOtpCode, showToast, initiateOtpAuth } = useApp();

  const [activeRole, setActiveRole] = useState<UserRole>(
    roleParam && ['customer', 'vendor', 'admin'].includes(roleParam)
      ? roleParam
      : pendingOtpUser?.role || 'customer'
  );

  const [email, setEmail] = useState<string>(
    emailParam ||
    pendingOtpUser?.email ||
    (activeRole === 'vendor'
      ? 'vendor@techverse.io'
      : activeRole === 'admin'
      ? 'admin@marketgrid.io'
      : 'sai@example.com')
  );

  const [otp, setOtp] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(60);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update email default when role changes
  useEffect(() => {
    if (roleParam && ['customer', 'vendor', 'admin'].includes(roleParam)) {
      setActiveRole(roleParam);
    }
  }, [roleParam]);

  useEffect(() => {
    if (!emailParam && !pendingOtpUser?.email) {
      if (activeRole === 'vendor') setEmail('vendor@techverse.io');
      else if (activeRole === 'admin') setEmail('admin@marketgrid.io');
      else setEmail('sai@example.com');
    }
  }, [activeRole, emailParam, pendingOtpUser]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Input navigation logic
  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const fillDemoOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    showToast('Demo OTP Applied', 'Preset code 123456 auto-filled.', 'info');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      showToast('Incomplete Code', 'Please enter all 6 digits of your OTP.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const success = await verifyOtpCode(otpCode, activeRole, email);
    setIsSubmitting(false);

    if (success) {
      if (activeRole === 'vendor') router.push('/vendor/dashboard');
      else if (activeRole === 'admin') router.push('/admin/dashboard');
      else router.push('/customer/account');
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(60);
    const sent = await initiateOtpAuth(email, activeRole);
    if (sent) {
      showToast('OTP Resent', `A new OTP code has been dispatched to ${email}`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center text-xs text-stone-500">
          <Link
            href={activeRole === 'admin' ? '/admin/login' : activeRole === 'vendor' ? '/vendor/login' : '/login'}
            className="inline-flex items-center gap-1 hover:text-obsidian-400 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {activeRole.toUpperCase()} Sign In
          </Link>
          <button
            type="button"
            onClick={() => setShowIntegrationGuide(!showIntegrationGuide)}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            Spring Boot Config
          </button>
        </div>

        {/* Spring Boot Mail Developer Modal */}
        {showIntegrationGuide && (
          <div className="bg-obsidian-400 text-cream-50 rounded-xl p-5 border border-stone-700 shadow-elevated text-xs space-y-3 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-stone-700 pb-2">
              <span className="font-mono text-amber-400 font-bold flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-amber-400" />
                Spring Boot Mail (JavaMailSender) Ready
              </span>
              <button onClick={() => setShowIntegrationGuide(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              This page is wired with <code className="bg-stone-800 px-1 py-0.5 rounded text-amber-300">lib/authService.ts</code>. When your Spring Boot backend with <code className="bg-stone-800 px-1 py-0.5 rounded text-amber-300">spring-boot-starter-mail</code> is running, set your API base URL in <code className="bg-stone-800 px-1 py-0.5 rounded text-amber-300">.env.local</code>:
            </p>
            <pre className="bg-stone-900 p-2.5 rounded font-mono text-[10px] text-emerald-400 overflow-x-auto">
{`NEXT_PUBLIC_SPRING_BOOT_API_URL=https://marketgrid-backend.onrender.com

// Spring Boot Mail REST Controller Endpoints:
POST /api/v1/auth/send-otp   { email, role, purpose }
POST /api/v1/auth/verify-otp { email, otpCode, role }`}
            </pre>
            <p className="text-[10px] text-stone-400 italic">
              Currently running in simulated demo mode. Use demo code <strong className="text-white font-mono">123456</strong> for testing.
            </p>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-cream-50 rounded-xl p-8 shadow-elevated border border-stone-200 space-y-6">
          
          {/* Logo & Role Header Banner */}
          <div className="text-center space-y-3">
            <Link href="/" className="font-serif text-3xl font-bold tracking-editorial text-obsidian-400 block">
              MARKETGRID
            </Link>

            {/* Role Specific Header Banner */}
            {activeRole === 'customer' && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                  Customer 2FA Verification
                </span>
                <h2 className="font-serif text-xl font-bold text-obsidian-400">Verify Customer OTP</h2>
                <p className="text-xs text-stone-500 font-light">
                  A 6-digit security passkey has been sent via email to:
                </p>
              </div>
            )}

            {activeRole === 'vendor' && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full inline-block">
                  Vendor Partner Studio Guard
                </span>
                <h2 className="font-serif text-xl font-bold text-obsidian-400">Vendor Portal Verification</h2>
                <p className="text-xs text-stone-500 font-light">
                  Enter authentication code dispatched to vendor account:
                </p>
              </div>
            )}

            {activeRole === 'admin' && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold tracking-superwide text-stone-200 bg-obsidian-400 px-3 py-1 rounded-full inline-block">
                  Admin Platform Governance 2FA
                </span>
                <h2 className="font-serif text-xl font-bold text-obsidian-400">MarketGrid Admin Authentication</h2>
                <p className="text-xs text-stone-500 font-light">
                  Enter master security passkey sent to admin credentials:
                </p>
              </div>
            )}

            {/* Target Email Banner */}
            <div className="bg-cream-100 p-2.5 rounded-lg border border-stone-300/70 flex items-center justify-center gap-2 text-xs font-mono font-semibold text-obsidian-400">
              <Mail className="w-4 h-4 text-stone-500" />
              <span>{email}</span>
            </div>
          </div>

          {/* OTP Verification Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            
            {/* 6 Digit Box Inputs */}
            <div>
              <label className="block text-center font-mono text-[10px] uppercase font-bold text-stone-500 mb-3 tracking-widest">
                ENTER 6-DIGIT VERIFICATION CODE
              </label>
              
              <div className="flex justify-center gap-2" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-11 h-12 text-center text-xl font-mono font-bold bg-cream-100 rounded-lg border border-stone-300 focus:outline-none focus:border-obsidian-400 focus:ring-2 focus:ring-obsidian-400/20 transition-all shadow-inner"
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons & Quick Demo Fill */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded-lg text-xs uppercase tracking-editorial font-semibold transition-all flex items-center justify-center gap-2 shadow-soft disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Verifying Passkey...</span>
                ) : (
                  <>
                    <span>Confirm & Proceed</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={fillDemoOtp}
                className="w-full bg-cream-200/60 hover:bg-cream-200 text-stone-700 py-2 rounded text-[11px] font-mono font-medium border border-stone-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Auto-Fill Demo Code
              </button>
            </div>
          </form>

          {/* Resend & Timer Info */}
          <div className="border-t border-stone-200 pt-4 text-center space-y-2 text-xs text-stone-500">
            <div>
              Didn't receive the email code?
            </div>
            {timer > 0 ? (
              <div className="font-mono text-[11px] text-stone-500 bg-cream-100 py-1.5 px-3 rounded inline-block border border-stone-200">
                Resend code available in <span className="font-bold text-obsidian-400">{timer}s</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 font-semibold text-obsidian-400 hover:underline text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Resend OTP to {email}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-100 flex items-center justify-center text-stone-400 font-mono text-xs">Loading Security Passkey Guard...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
