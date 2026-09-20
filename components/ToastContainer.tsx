'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-lg shadow-elevated border bg-cream-50 text-obsidian-400 transition-all animate-fade-in ${
            toast.type === 'success'
              ? 'border-accent-emerald/40'
              : toast.type === 'error'
              ? 'border-accent-terracotta/40'
              : 'border-stone-300'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-accent-emerald shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-accent-terracotta shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-obsidian-400">{toast.title}</h4>
            {toast.description && (
              <p className="text-[11px] text-stone-600 font-light mt-0.5 leading-snug">
                {toast.description}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-obsidian-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
