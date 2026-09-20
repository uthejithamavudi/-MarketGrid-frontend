/**
 * Product & Category Service
 *
 * Fetches products and categories from the Spring Boot product-service
 * via the API Gateway. Falls back to mock data if the backend is offline.
 */

import { apiFetch } from './api';
import { Product, Category } from './types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './mockData';

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
// API functions with graceful fallback
// ---------------------------------------------------------------------------

/**
 * Fetch all products. Falls back to MOCK_PRODUCTS if backend is unreachable.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = await apiFetch<any>('/api/v1/products');
    const list = Array.isArray(data) ? data : data?.content ?? data?.products ?? [];
    return list.map(mapProduct);
  } catch (error) {
    console.info('[productService] Backend unavailable, using mock products.', error);
    return MOCK_PRODUCTS;
  }
}

/**
 * Fetch a single product by slug. Falls back to matching mock product.
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await apiFetch<any>(`/api/v1/products/slug/${slug}`);
    return mapProduct(data);
  } catch (error) {
    console.info(`[productService] Backend unavailable for slug "${slug}", using mock.`, error);
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? MOCK_PRODUCTS[0];
  }
}

/**
 * Fetch all categories. Falls back to MOCK_CATEGORIES if backend is unreachable.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await apiFetch<any>('/api/v1/categories');
    const list = Array.isArray(data) ? data : data?.content ?? data?.categories ?? [];
    return list.map(mapCategory);
  } catch (error) {
    console.info('[productService] Backend unavailable, using mock categories.', error);
    return MOCK_CATEGORIES;
  }
}

/**
 * Fetch products for a specific category by slug.
 */
export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const data = await apiFetch<any>(`/api/v1/products?category=${categorySlug}`);
    const list = Array.isArray(data) ? data : data?.content ?? data?.products ?? [];
    return list.map(mapProduct);
  } catch (error) {
    console.info('[productService] Backend unavailable for category products, using mock.', error);
    const cat = MOCK_CATEGORIES.find((c) => c.slug === categorySlug);
    return cat ? MOCK_PRODUCTS.filter((p) => p.categoryId === cat.id) : MOCK_PRODUCTS;
  }
}
