'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message Sent', 'Thank you for reaching out to MarketGrid Support.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-superwide font-semibold text-stone-500">
          Concierge & Seller Inquiries
        </span>
        <h1 className="font-serif text-4xl font-bold tracking-editorial text-obsidian-400">
          GET IN TOUCH
        </h1>
        <p className="text-stone-600 text-sm font-light">
          Have a question about an order, vendor partnership, or platform feature?
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
          <h3 className="font-serif text-2xl font-bold text-emerald-900">Message Received</h3>
          <p className="text-xs text-emerald-700">Our concierge team will respond within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-cream-50 p-8 rounded-xl border border-stone-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-editorial text-stone-600 mb-1">Full Name</label>
              <input type="text" required placeholder="Sai Vardhan" className="w-full bg-cream-100/60 text-xs p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-editorial text-stone-600 mb-1">Email Address</label>
              <input type="email" required placeholder="sai@example.com" className="w-full bg-cream-100/60 text-xs p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-editorial text-stone-600 mb-1">Subject</label>
            <input type="text" required placeholder="Order inquiry or Vendor application" className="w-full bg-cream-100/60 text-xs p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-editorial text-stone-600 mb-1">Message</label>
            <textarea rows={5} required placeholder="Write your message here..." className="w-full bg-cream-100/60 text-xs p-3 rounded border border-stone-300 focus:outline-none focus:border-obsidian-400" />
          </div>
          <button type="submit" className="w-full bg-obsidian-400 hover:bg-obsidian-300 text-cream-50 py-3 rounded text-xs uppercase tracking-editorial font-semibold transition-colors">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
