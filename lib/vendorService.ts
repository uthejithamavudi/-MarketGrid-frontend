/**
 * Vendor Service
 *
 * Fetches vendor data from the Spring Boot vendor-service
 * via the API Gateway. Throws on failure — no mock fallback.
 */

import { apiFetch } from './api';
import { Vendor } from './types';

// ---------------------------------------------------------------------------
// Response shape mapper (backend → frontend type)
// ---------------------------------------------------------------------------

function mapVendor(raw: any): Vendor {
  return {
    id: raw.id ?? raw._id ?? '',
    name: raw.name ?? '',
    slug: raw.slug ?? raw.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? '',
    logo: raw.logo ?? raw.logoUrl ?? 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=300&q=80',
    coverImage: raw.coverImage ?? raw.coverImageUrl ?? 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&q=80',
    rating: raw.rating ?? 0,
    reviewsCount: raw.reviewsCount ?? raw.reviewCount ?? 0,
    verified: raw.verified ?? false,
    tagline: raw.tagline ?? '',
    description: raw.description ?? '',
    joinedDate: raw.joinedDate ?? raw.createdAt ?? '',
    totalProducts: raw.totalProducts ?? 0,
    totalOrders: raw.totalOrders ?? 0,
    totalRevenue: raw.totalRevenue ?? '₹0',
    ownerName: raw.ownerName ?? '',
    ownerEmail: raw.ownerEmail ?? '',
    phone: raw.phone,
    businessType: raw.businessType,
    gstin: raw.gstin,
    panNumber: raw.panNumber,
    aadhaarNumber: raw.aadhaarNumber,
    addressStreet: raw.addressStreet,
    city: raw.city,
    state: raw.state,
    zipCode: raw.zipCode,
    bankAccountHolder: raw.bankAccountHolder,
    bankName: raw.bankName,
    accountNumber: raw.accountNumber,
    ifscCode: raw.ifscCode,
    status: raw.status ?? 'PENDING',
  };
}

// ---------------------------------------------------------------------------
// API functions — no mock fallback
// ---------------------------------------------------------------------------

/**
 * Fetch all vendors from the backend.
 * Throws if backend is unreachable.
 */
export async function fetchVendors(): Promise<Vendor[]> {
  const data = await apiFetch<any>('/api/v1/vendors', { skipAuth: true });
  const list = Array.isArray(data) ? data : data?.content ?? data?.vendors ?? [];
  return list.map(mapVendor);
}

/**
 * Fetch a single vendor by slug.
 * Throws if backend is unreachable or vendor not found.
 */
export async function fetchVendorBySlug(slug: string): Promise<Vendor | null> {
  const data = await apiFetch<any>(`/api/v1/vendors/slug/${slug}`, { skipAuth: true });
  return mapVendor(data);
}

/**
 * Register a new vendor application.
 * Returns failure status if backend is down.
 */
export async function registerVendorApi(vendorData: Partial<Vendor>): Promise<{ success: boolean; message: string }> {
  try {
    await apiFetch<any>('/api/v1/vendors/register', {
      method: 'POST',
      body: JSON.stringify(vendorData),
    });
    return { success: true, message: 'Vendor application submitted to MarketGrid.' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to submit vendor application. Backend unavailable.' };
  }
}

/**
 * Approve or reject a vendor (admin action).
 * Returns failure status if backend is down.
 */
export async function updateVendorStatusApi(
  vendorId: string,
  status: 'APPROVED' | 'REJECTED' | 'SUSPENDED'
): Promise<{ success: boolean }> {
  try {
    await apiFetch<any>(`/api/v1/vendors/${vendorId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return { success: true };
  } catch (error) {
    console.error('[vendorService] Status update failed:', error);
    return { success: false };
  }
}
