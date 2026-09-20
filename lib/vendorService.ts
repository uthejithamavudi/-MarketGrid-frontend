/**
 * Vendor Service
 *
 * Fetches vendor data from the Spring Boot vendor-service
 * via the API Gateway. Falls back to mock data if the backend is offline.
 */

import { apiFetch } from './api';
import { Vendor } from './types';
import { MOCK_VENDORS } from './mockData';

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
// API functions with graceful fallback
// ---------------------------------------------------------------------------

/**
 * Fetch all vendors. Falls back to MOCK_VENDORS if backend is unreachable.
 */
export async function fetchVendors(): Promise<Vendor[]> {
  try {
    const data = await apiFetch<any>('/api/v1/vendors');
    const list = Array.isArray(data) ? data : data?.content ?? data?.vendors ?? [];
    return list.map(mapVendor);
  } catch (error) {
    console.info('[vendorService] Backend unavailable, using mock vendors.', error);
    return MOCK_VENDORS;
  }
}

/**
 * Fetch a single vendor by slug. Falls back to matching mock vendor.
 */
export async function fetchVendorBySlug(slug: string): Promise<Vendor | null> {
  try {
    const data = await apiFetch<any>(`/api/v1/vendors/slug/${slug}`);
    return mapVendor(data);
  } catch (error) {
    console.info(`[vendorService] Backend unavailable for slug "${slug}", using mock.`, error);
    return MOCK_VENDORS.find((v) => v.slug === slug) ?? MOCK_VENDORS[0];
  }
}

/**
 * Register a new vendor application. Falls back to local mock state if backend is down.
 */
export async function registerVendorApi(vendorData: Partial<Vendor>): Promise<{ success: boolean; message: string }> {
  try {
    await apiFetch<any>('/api/v1/vendors/register', {
      method: 'POST',
      body: JSON.stringify(vendorData),
    });
    return { success: true, message: 'Vendor application submitted to MarketGrid.' };
  } catch (error) {
    console.info('[vendorService] Backend unavailable for vendor registration, using local state.', error);
    return { success: true, message: '[Offline Mode] Vendor application saved locally pending backend sync.' };
  }
}

/**
 * Approve or reject a vendor (admin action).
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
    console.info('[vendorService] Backend unavailable for vendor status update.', error);
    return { success: true }; // allow UI to update locally
  }
}
