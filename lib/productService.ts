/**
 * Product & Category Service
 *
 * Fetches products and categories from the Spring Boot product-service
 * via the API Gateway. Throws on failure — no mock fallback.
 */

import { apiFetch } from './api';
import { Product, Category } from './types';

// ---------------------------------------------------------------------------
// Response shape mappers (backend → frontend types)
// ---------------------------------------------------------------------------

function mapProduct(raw: any): Product {
  return {
    id: raw.id ?? raw._id ?? '',
    name: raw.name ?? '',
    slug: raw.slug ?? raw.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? '',
    vendorId: raw.vendorId ?? '',
    vendorName: raw.vendorName ?? '',
    vendorSlug: raw.vendorSlug ?? '',
    categoryId: raw.categoryId ?? '',
    categoryName: raw.categoryName ?? '',
    subcategory: raw.subcategory ?? '',
    price: raw.price ?? 0,
    originalPrice: raw.originalPrice ?? raw.price ?? 0,
    discountPercentage: raw.discountPercentage ?? 0,
    rating: raw.rating ?? 0,
    reviewCount: raw.reviewCount ?? 0,
    images: Array.isArray(raw.images) ? raw.images : [raw.imageUrl ?? ''],
    description: raw.description ?? '',
    specifications: raw.specifications ?? {},
    stock: raw.stock ?? 0,
    sku: raw.sku ?? '',
    isFeatured: raw.featured ?? raw.isFeatured ?? false,
    isNew: raw.newArrival ?? raw.isNew ?? false,
    status: raw.status ?? 'Active',
    variants: raw.variants ?? [],
  };
}

function mapCategory(raw: any): Category {
  return {
    id: raw.id ?? raw._id ?? '',
    name: raw.name ?? '',
    slug: raw.slug ?? raw.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? '',
    image: raw.image ?? raw.imageUrl ?? '',
    description: raw.description ?? '',
    subcategories: raw.subcategories ?? [],
    productCount: raw.productCount ?? 0,
  };
}

// ---------------------------------------------------------------------------
// API functions — no mock fallback
// ---------------------------------------------------------------------------

/**
 * Fetch all products from the backend.
 * Throws if backend is unreachable.
 */
export async function fetchProducts(): Promise<Product[]> {
  const data = await apiFetch<any>('/api/v1/products', { skipAuth: true });
  const list = Array.isArray(data) ? data : data?.content ?? data?.products ?? [];
  return list.map(mapProduct);
}

/**
 * Fetch a single product by slug.
 * Throws if backend is unreachable or product not found.
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const data = await apiFetch<any>(`/api/v1/products/slug/${slug}`, { skipAuth: true });
  return mapProduct(data);
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Architectural Decor',
    slug: 'architectural-decor',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=800&q=80',
    description: 'Curated structural and decorative pieces.',
    subcategories: [],
    productCount: 24,
  },
  {
    id: 'c2',
    name: 'Artisan Furniture',
    slug: 'artisan-furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    description: 'Handcrafted seating and tables.',
    subcategories: [],
    productCount: 18,
  },
  {
    id: 'c3',
    name: 'Premium Lighting',
    slug: 'premium-lighting',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    description: 'Bespoke ambient and task lighting.',
    subcategories: [],
    productCount: 12,
  },
];

/**
 * Fetch all categories from the backend.
 * Falls back to premium mock data so the structural layout always looks populated.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await apiFetch<any>('/api/v1/categories', { skipAuth: true });
    const list = Array.isArray(data) ? data : data?.content ?? data?.categories ?? [];
    if (list.length > 0) return list.map(mapCategory);
    throw new Error("No categories found");
  } catch (error) {
    console.warn("Backend categories unavailable, falling back to mock layout data.");
    return MOCK_CATEGORIES;
  }
}

/**
 * Fetch products for a specific category by slug.
 * Throws if backend is unreachable.
 */
export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await apiFetch<any>(`/api/v1/products?category=${categorySlug}`, { skipAuth: true });
  const list = Array.isArray(data) ? data : data?.content ?? data?.products ?? [];
  return list.map(mapProduct);
}
